// Cloudflare Pages Function · /api/subscribe
// POST: añade email a la lista de Acumbamail (double opt-in).
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
    const verbose = url.searchParams.get("verbose") === "1";

    let body = {};
    try { body = await request.json(); } catch (_) {}

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

    if (debug) {
      return jsonResponse({ ok: true, debug: true, email_received: email });
    }

    // Acumbamail acepta merge_fields como JSON string. La clave estándar es "email".
    const params = new URLSearchParams();
    params.append("auth_token", env.ACUMBAMAIL_AUTH_TOKEN);
    params.append("list_id", String(env.ACUMBAMAIL_LIST_ID));
    params.append("merge_fields", JSON.stringify({ email }));
    params.append("double_optin", "1");
    params.append("update_subscriber", "0");
    params.append("response_type", "json");

    let acumStatus = 0;
    let acumText = "";
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
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
      clearTimeout(timer);
      acumStatus = r.status;
      acumText = await r.text();
    } catch (fetchErr) {
      return jsonResponse({
        ok: false, error: "acumbamail_fetch_failed",
        detail: String((fetchErr && fetchErr.message) || fetchErr).slice(0, 300),
      }, 502);
    }

    // Si la respuesta contiene un mensaje de error JSON (Acumbamail a veces devuelve 200 + error).
    let acumParsed = null;
    try { acumParsed = JSON.parse(acumText); } catch (_) {}
    const hasError =
      acumStatus < 200 || acumStatus >= 300 ||
      (acumParsed && typeof acumParsed === "object" && (acumParsed.error || acumParsed.errors));

    if (hasError) {
      return jsonResponse({
        ok: false, error: "acumbamail_error",
        status: acumStatus,
        body: acumText.slice(0, 500),
      }, 502);
    }

    if (verbose) {
      return jsonResponse({
        ok: true,
        acumbamail_status: acumStatus,
        acumbamail_body: acumText.slice(0, 500),
      });
    }

    return jsonResponse({ ok: true });
  } catch (e) {
    const msg = (e && e.message) ? e.message : String(e);
    return jsonResponse({ ok: false, error: "handler_exception", detail: msg.slice(0, 300) }, 500);
  }
}
