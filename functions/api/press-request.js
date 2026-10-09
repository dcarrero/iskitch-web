// Cloudflare Pages Function · /api/press-request
// POST: petición de código de prueba del formulario de /press.
// Se guarda en KV con el prefijo "press:" y avisa por correo (ver
// functions-lib/contact.js). Se consultan con `mac/tools/iskitch-ops.sh press`.

import { EMAIL_RE, jsonResponse, clean, cleanLine, guard, connectionInfo, storeAndNotify } from "../../functions-lib/contact.js";

export async function onRequestPost({ request, env }) {
  try {
    const g = await guard(request, env);
    if (g instanceof Response) return g;
    const body = g.body;

    // Honeypot anti-spam: fingimos éxito.
    if (body && body.honeypot && String(body.honeypot).length > 0) {
      return jsonResponse({ ok: true });
    }

    const name = cleanLine(body.name, 120);
    const email = cleanLine(body.email, 200).toLowerCase();
    let url = cleanLine(body.url, 300);
    const message = clean(body.message, 3000);

    if (!name) return jsonResponse({ ok: false, error: "name_required" }, 400);
    if (!EMAIL_RE.test(email)) return jsonResponse({ ok: false, error: "invalid_email" }, 400);
    if (url && !/^https?:\/\//i.test(url)) url = "https://" + url;
    let host;
    try {
      const u = new URL(url);
      if (!/^https?:$/.test(u.protocol) || !u.hostname.includes(".")) throw new Error();
      host = u.hostname;
    } catch (_) { return jsonResponse({ ok: false, error: "invalid_url" }, 400); }

    // Sin consentimiento no hay base para guardar los datos.
    if (body.consent !== true) return jsonResponse({ ok: false, error: "consent_required" }, 400);
    if (!env || !env.SUBSCRIBERS) return jsonResponse({ ok: false, error: "kv_not_configured" }, 500);

    const conn = connectionInfo(request);
    const record = {
      name, email, url, message,
      lang: cleanLine(body.lang || "en", 8),
      consent: true,
      ts: new Date().toISOString(),
      country: conn.country,
      conn,
    };
    await storeAndNotify(env, {
      prefix: "press",
      record,
      subject: `Review code request: ${name} (${host})`,
      fields: [["Name", name], ["Email", email], ["URL", url]],
      message,
    });
    return jsonResponse({ ok: true });
  } catch (e) {
    const msg = (e && e.message) ? e.message : String(e);
    return jsonResponse({ ok: false, error: "handler_exception", detail: msg.slice(0, 300) }, 500);
  }
}
