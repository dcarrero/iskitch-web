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

    // Test: fetch a la home de Acumbamail (sin API) para ver si bloquean Cloudflare.
    if (url.searchParams.get("test") === "acumba-home") {
      try {
        const r = await fetch("https://acumbamail.com/", {
          method: "GET",
          headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15" },
        });
        return jsonResponse({ ok: true, status: r.status, ct: r.headers.get("content-type") });
      } catch (e) {
        return jsonResponse({ ok: false, error: "home_fetch_failed", detail: String(e?.message ?? e).slice(0, 300) }, 502);
      }
    }
    // Test de control: fetch a httpbin para confirmar si el problema es general o solo Acumbamail.
    if (url.searchParams.get("test") === "httpbin") {
      try {
        const r = await fetch("https://httpbin.org/post", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "hello=world",
        });
        const t = await r.text();
        return jsonResponse({ ok: true, httpbin_status: r.status, body_length: t.length });
      } catch (e) {
        return jsonResponse({ ok: false, error: "httpbin_fetch_failed", detail: String(e?.message ?? e).slice(0, 300) }, 502);
      }
    }

    // Cuerpo form-encoded, construido a mano para minimizar dependencias.
    // Acumbamail acepta merge_fields[email] (notación PHP dict).
    const payload =
      "auth_token=" + encodeURIComponent(env.ACUMBAMAIL_AUTH_TOKEN) +
      "&list_id=" + encodeURIComponent(env.ACUMBAMAIL_LIST_ID) +
      "&merge_fields%5Bemail%5D=" + encodeURIComponent(email) +
      "&double_optin=1" +
      "&update_subscriber=0";

    let acumStatus = 0;
    let acumText = "";
    try {
      const r = await fetch("https://acumbamail.com/api/1/addSubscriber/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload,
      });
      acumStatus = r.status;
      acumText = await r.text();
    } catch (fetchErr) {
      return jsonResponse({
        ok: false, error: "fetch_failed",
        detail: String((fetchErr && fetchErr.message) || fetchErr).slice(0, 300),
      }, 502);
    }

    // Acumbamail: 2xx con cuerpo no-error = OK. Cuerpos "error", "Unauthorized", etc = fallo.
    const lc = acumText.toLowerCase();
    const looksLikeError =
      acumStatus < 200 || acumStatus >= 300 ||
      lc.includes("\"error\"") ||
      lc.startsWith("unauthorized") ||
      lc.startsWith("error");

    if (looksLikeError) {
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
