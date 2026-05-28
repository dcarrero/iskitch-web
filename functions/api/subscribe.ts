// Cloudflare Pages Function · POST /api/subscribe
// Recibe el email del formulario beta y lo añade a la lista de Acumbamail.
//
// Variables de entorno necesarias en Cloudflare Pages (Settings → Environment variables):
//   ACUMBAMAIL_AUTH_TOKEN  → tu auth_token de Acumbamail
//   ACUMBAMAIL_LIST_ID     → ID de la lista de iSkitch Beta
//
// (Opcional) producción vs preview: define ambas y Cloudflare las inyecta automáticamente.

interface Env {
  ACUMBAMAIL_AUTH_TOKEN: string;
  ACUMBAMAIL_LIST_ID: string;
}

interface SubscribePayload {
  email?: string;
  honeypot?: string;
  lang?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: SubscribePayload;
  try { body = await request.json(); }
  catch { return json({ ok: false, error: "Invalid JSON" }, 400); }

  // Honeypot anti-spam: si está relleno, fingimos éxito (no avisamos al bot).
  if (body.honeypot && body.honeypot.length > 0) {
    return json({ ok: true });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  if (!env.ACUMBAMAIL_AUTH_TOKEN || !env.ACUMBAMAIL_LIST_ID) {
    return json({ ok: false, error: "server_not_configured" }, 500);
  }

  // Acumbamail: POST application/x-www-form-urlencoded a /api/1/addSubscriber/
  const params = new URLSearchParams();
  params.set("auth_token", env.ACUMBAMAIL_AUTH_TOKEN);
  params.set("list_id", env.ACUMBAMAIL_LIST_ID);
  params.set("merge_fields", JSON.stringify({ email, language: body.lang ?? "en" }));
  params.set("double_optin", "1");
  params.set("update_subscriber", "0");

  try {
    const r = await fetch("https://acumbamail.com/api/1/addSubscriber/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    if (!r.ok) {
      const text = await r.text();
      return json({ ok: false, error: "acumbamail_error", detail: text.slice(0, 200) }, 502);
    }
    return json({ ok: true });
  } catch (e) {
    return json({ ok: false, error: "network", detail: String(e).slice(0, 200) }, 502);
  }
};
