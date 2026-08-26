// Cloudflare Pages Function · /api/subscribe
// POST: guarda el email del formulario beta en Cloudflare KV.
// GET:  diagnóstico — devuelve si el binding KV está configurado.
//
// Binding necesario en Pages → Settings → Functions → KV namespace bindings:
//   SUBSCRIBERS  →  (namespace KV creado en Workers KV)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function onRequestGet({ env }) {
  return jsonResponse({
    ok: true,
    endpoint: "/api/subscribe",
    method_required: "POST",
    configured: {
      kv_subscribers: !!(env && env.SUBSCRIBERS),
    },
  });
}

export async function onRequestPost({ request, env }) {
  try {
    let body = {};
    try { body = await request.json(); } catch (_) {}

    // Honeypot anti-spam: fingimos éxito.
    if (body && body.honeypot && String(body.honeypot).length > 0) {
      return jsonResponse({ ok: true });
    }

    const email = String((body && body.email) || "").trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return jsonResponse({ ok: false, error: "invalid_email" }, 400);
    }

    // Consentimiento explícito obligatorio. Sin él no hay base legal para
    // guardar el correo, así que se rechaza en vez de aceptarlo a medias.
    if (body.consent !== true) {
      return jsonResponse({ ok: false, error: "consent_required" }, 400);
    }

    if (!env || !env.SUBSCRIBERS) {
      return jsonResponse({ ok: false, error: "kv_not_configured" }, 500);
    }

    const now = new Date().toISOString();
    const record = {
      email,
      lang: String((body && body.lang) || "en"),
      // "web" (formulario del sitio) o "app" (modal de novedades de iSkitch).
      // Sirve para saber por dónde entra la gente; el resto del flujo es idéntico.
      source: String((body && body.source) || "web").slice(0, 16),
      // Prueba del consentimiento: cuándo lo dio y desde qué versión del texto.
      consent: true,
      consent_ts: String((body && body.consent_ts) || now).slice(0, 40),
      ts: now,
      ua: request.headers.get("user-agent") || "",
      ip: request.headers.get("cf-connecting-ip") || "",
      country: (request.cf && request.cf.country) || "",
      referer: request.headers.get("referer") || "",
    };

    // Clave por email → re-suscripciones sobrescriben en vez de duplicar.
    await env.SUBSCRIBERS.put("subscriber:" + email, JSON.stringify(record));

    // Contador total (best-effort, no bloquea si falla).
    try {
      const current = await env.SUBSCRIBERS.get("__meta:count");
      const n = current ? parseInt(current, 10) || 0 : 0;
      await env.SUBSCRIBERS.put("__meta:count", String(n + 1));
      await env.SUBSCRIBERS.put("__meta:last", now);
    } catch (_) {}

    return jsonResponse({ ok: true });
  } catch (e) {
    const msg = (e && e.message) ? e.message : String(e);
    return jsonResponse({ ok: false, error: "handler_exception", detail: msg.slice(0, 300) }, 500);
  }
}
