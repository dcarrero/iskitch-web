// Cloudflare Pages Function · /api/press-request
// POST: guarda en KV una petición de código de prueba del formulario de /press.
// Usa el mismo namespace que la lista (binding SUBSCRIBERS) con el prefijo
// "press:", que el sync de Acumbamail no lee (solo lista "subscriber:").
// Se consultan con /api/admin/press o `mac/tools/iskitch-ops.sh press`.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function clean(v, max) {
  return String(v == null ? "" : v).trim().slice(0, max);
}

export async function onRequestPost({ request, env }) {
  try {
    let body = {};
    try { body = await request.json(); } catch (_) {}

    // Honeypot anti-spam: fingimos éxito.
    if (body && body.honeypot && String(body.honeypot).length > 0) {
      return jsonResponse({ ok: true });
    }

    const name = clean(body.name, 120);
    const email = clean(body.email, 200).toLowerCase();
    let url = clean(body.url, 300);
    const message = clean(body.message, 3000);

    if (!name) return jsonResponse({ ok: false, error: "name_required" }, 400);
    if (!EMAIL_RE.test(email)) return jsonResponse({ ok: false, error: "invalid_email" }, 400);
    if (url && !/^https?:\/\//i.test(url)) url = "https://" + url;
    try { new URL(url); } catch (_) { return jsonResponse({ ok: false, error: "invalid_url" }, 400); }

    // Sin consentimiento no hay base para guardar los datos.
    if (body.consent !== true) {
      return jsonResponse({ ok: false, error: "consent_required" }, 400);
    }
    if (!env || !env.SUBSCRIBERS) {
      return jsonResponse({ ok: false, error: "kv_not_configured" }, 500);
    }

    const now = new Date().toISOString();
    const record = {
      name, email, url, message,
      lang: clean(body.lang || "en", 8),
      consent: true,
      ts: now,
      country: (request.cf && request.cf.country) || "",
      ua: request.headers.get("user-agent") || "",
      ip: request.headers.get("cf-connecting-ip") || "",
    };

    // Clave con fecha delante: el listado sale en orden cronológico y una
    // segunda petición del mismo medio no pisa la primera.
    await env.SUBSCRIBERS.put(`press:${now}:${email}`, JSON.stringify(record));

    return jsonResponse({ ok: true });
  } catch (e) {
    const msg = (e && e.message) ? e.message : String(e);
    return jsonResponse({ ok: false, error: "handler_exception", detail: msg.slice(0, 300) }, 500);
  }
}
