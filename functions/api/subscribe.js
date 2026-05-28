// Cloudflare Pages Function · /api/subscribe
// POST: añade email a Acumbamail (double opt-in).
// GET:  diagnóstico.

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
    const url = new URL(request.url);
    const debug = url.searchParams.get("debug") === "1";

    let body = {};
    try { body = await request.json(); } catch (_) {}

    // Honeypot.
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

    // Modo debug: saltamos Acumbamail.
    if (debug) {
      return jsonResponse({ ok: true, debug: true, email_received: email });
    }

    // Construimos el cuerpo en formato Acumbamail con merge_fields como objeto plano.
    // Probamos primero el formato con merge_fields[email] (array notation).
    const params = new URLSearchParams();
    params.append("auth_token", env.ACUMBAMAIL_AUTH_TOKEN);
    params.append("list_id", String(env.ACUMBAMAIL_LIST_ID));
    params.append("merge_fields[email]", email);
    params.append("double_optin", "1");
    params.append("update_subscriber", "0");

    let acumStatus = 0;
    let acumText = "";
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const r = await fetch("https://acumbamail.com/api/1/addSubscriber/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
          "User-Agent": "iSkitchBetaForm/1.0",
        },
        body: params.toString(),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      acumStatus = r.status;
      acumText = await r.text();
    } catch (fetchErr) {
      return jsonResponse({
        ok: false,
        error: "acumbamail_fetch_failed",
        detail: String((fetchErr && fetchErr.message) || fetchErr).slice(0, 300),
      }, 502);
    }

    if (acumStatus < 200 || acumStatus >= 300) {
      return jsonResponse({
        ok: false,
        error: "acumbamail_error",
        status: acumStatus,
        detail: acumText.slice(0, 300),
      }, 502);
    }

    return jsonResponse({ ok: true });
  } catch (e) {
    const msg = (e && e.message) ? e.message : String(e);
    return jsonResponse({ ok: false, error: "handler_exception", detail: msg.slice(0, 300) }, 500);
  }
}
