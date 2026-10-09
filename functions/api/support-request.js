// Cloudflare Pages Function · /api/support-request
// POST: consulta del formulario de /support (nombre, correo, versión de
// iSkitch y mensaje). Se guarda en KV con el prefijo "support:" y avisa por
// correo (ver functions-lib/contact.js). Se consultan con
// `mac/tools/iskitch-ops.sh support`.

import { EMAIL_RE, jsonResponse, clean, connectionInfo, storeAndNotify } from "../../functions-lib/contact.js";

export async function onRequestPost({ request, env }) {
  try {
    let body = {};
    try { body = await request.json(); } catch (_) {}

    if (body && body.honeypot && String(body.honeypot).length > 0) {
      return jsonResponse({ ok: true });
    }

    const name = clean(body.name, 120);
    const email = clean(body.email, 200).toLowerCase();
    const version = clean(body.version, 60);
    const message = clean(body.message, 5000);

    if (!name) return jsonResponse({ ok: false, error: "name_required" }, 400);
    if (!EMAIL_RE.test(email)) return jsonResponse({ ok: false, error: "invalid_email" }, 400);
    if (!message) return jsonResponse({ ok: false, error: "message_required" }, 400);
    if (body.consent !== true) return jsonResponse({ ok: false, error: "consent_required" }, 400);
    if (!env || !env.SUBSCRIBERS) return jsonResponse({ ok: false, error: "kv_not_configured" }, 500);

    const conn = connectionInfo(request);
    const record = {
      name, email, version, message,
      lang: clean(body.lang || "en", 8),
      consent: true,
      ts: new Date().toISOString(),
      country: conn.country,
      conn,
    };
    await storeAndNotify(env, {
      prefix: "support",
      record,
      subject: `Support: ${name}${version ? ` (iSkitch ${version})` : ""}`,
      fields: [["Name", name], ["Email", email], ["iSkitch version", version]],
      message,
    });
    return jsonResponse({ ok: true });
  } catch (e) {
    const msg = (e && e.message) ? e.message : String(e);
    return jsonResponse({ ok: false, error: "handler_exception", detail: msg.slice(0, 300) }, 500);
  }
}
