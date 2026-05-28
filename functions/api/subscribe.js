// Cloudflare Pages Function · /api/subscribe (JS puro, sin tipos)
// POST: añade un email a la lista de Acumbamail (double opt-in).
// GET:  diagnóstico — muestra si las env vars están configuradas.

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
      auth_token: !!(env && env.ACUMBAMAIL_AUTH_TOKEN),
      list_id: !!(env && env.ACUMBAMAIL_LIST_ID),
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

    if (!env || !env.ACUMBAMAIL_AUTH_TOKEN || !env.ACUMBAMAIL_LIST_ID) {
      return jsonResponse({ ok: false, error: "server_not_configured" }, 500);
    }

    const params = new URLSearchParams();
    params.set("auth_token", env.ACUMBAMAIL_AUTH_TOKEN);
    params.set("list_id", env.ACUMBAMAIL_LIST_ID);
    params.set("merge_fields", JSON.stringify({
      email,
      language: String((body && body.lang) || "en"),
    }));
    params.set("double_optin", "1");
    params.set("update_subscriber", "0");

    const r = await fetch("https://acumbamail.com/api/1/addSubscriber/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const text = await r.text();
    if (!r.ok) {
      return jsonResponse({
        ok: false, error: "acumbamail_error",
        status: r.status, detail: text.slice(0, 300),
      }, 502);
    }

    return jsonResponse({ ok: true });
  } catch (e) {
    const msg = (e && e.message) ? e.message : String(e);
    return jsonResponse({ ok: false, error: "handler_exception", detail: msg.slice(0, 300) }, 500);
  }
}
