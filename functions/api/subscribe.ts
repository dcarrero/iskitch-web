// Cloudflare Pages Function · /api/subscribe
// POST: añade un email a la lista de Acumbamail (double opt-in).
// GET:  endpoint de diagnóstico — devuelve si las env vars están configuradas.
//
// Env vars (configurar en Cloudflare Pages → Settings → Environment variables):
//   ACUMBAMAIL_AUTH_TOKEN  (Secret, encrypt)
//   ACUMBAMAIL_LIST_ID

interface Env {
  ACUMBAMAIL_AUTH_TOKEN: string;
  ACUMBAMAIL_LIST_ID: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// Diagnóstico — visita /api/subscribe en el navegador para ver el estado.
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  return json({
    ok: true,
    endpoint: "/api/subscribe",
    method_required: "POST",
    configured: {
      auth_token: !!env?.ACUMBAMAIL_AUTH_TOKEN,
      list_id: !!env?.ACUMBAMAIL_LIST_ID,
    },
  });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    let body: any = {};
    try { body = await request.json(); }
    catch { return json({ ok: false, error: "invalid_json" }, 400); }

    // Honeypot anti-spam: fingimos éxito sin enviar nada a Acumbamail.
    if (body && body.honeypot && String(body.honeypot).length > 0) {
      return json({ ok: true });
    }

    const email = String(body?.email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return json({ ok: false, error: "invalid_email" }, 400);
    }

    if (!env?.ACUMBAMAIL_AUTH_TOKEN || !env?.ACUMBAMAIL_LIST_ID) {
      return json({ ok: false, error: "server_not_configured" }, 500);
    }

    const params = new URLSearchParams();
    params.set("auth_token", env.ACUMBAMAIL_AUTH_TOKEN);
    params.set("list_id", env.ACUMBAMAIL_LIST_ID);
    params.set("merge_fields", JSON.stringify({ email, language: String(body?.lang ?? "en") }));
    params.set("double_optin", "1");
    params.set("update_subscriber", "0");

    const r = await fetch("https://acumbamail.com/api/1/addSubscriber/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const text = await r.text();
    if (!r.ok) {
      return json(
        { ok: false, error: "acumbamail_error", status: r.status, detail: text.slice(0, 300) },
        502
      );
    }
    return json({ ok: true });
  } catch (e: any) {
    // Cualquier excepción no prevista cae aquí en lugar de generar un 502 de Cloudflare.
    return json({ ok: false, error: "handler_exception", detail: String(e?.message ?? e).slice(0, 300) }, 500);
  }
};
