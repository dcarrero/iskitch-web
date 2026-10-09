// Código común de los formularios de la web (/press y /support).
// Vive fuera de functions/ para que Pages no lo publique como ruta.
//
// Cada envío se guarda en KV (binding SUBSCRIBERS) con un prefijo propio
// ("press:", "support:"), que el sync de Acumbamail no lee porque solo lista
// "subscriber:", y se avisa por correo a hello@iskitch.com con Cloudflare
// Email Sending. Las Pages Functions no admiten el binding send_email, así que
// va por la API REST. Variables en Pages ▸ Settings ▸ Variables and Secrets
// (y redesplegar):
//   CF_ACCOUNT_ID    id de la cuenta de Cloudflare
//   CF_EMAIL_TOKEN   token de API con permiso de Email Sending (secreto)
// Sin ellas el envío se guarda igual y queda notified: "skipped".

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NOTIFY_TO = "hello@iskitch.com";
const NOTIFY_FROM = { address: "web@iskitch.com", name: "iSkitch web" };

export function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export function clean(v, max) {
  return String(v == null ? "" : v).trim().slice(0, max);
}

function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Todo lo que Cloudflare sabe de la conexión. Sirve para distinguir un medio
// real de spam y para responder en el idioma y la hora adecuados.
export function connectionInfo(request) {
  const cf = request.cf || {};
  const h = (n) => request.headers.get(n) || "";
  return {
    ip: h("cf-connecting-ip"),
    country: cf.country || "",
    region: cf.region || "",
    city: cf.city || "",
    timezone: cf.timezone || "",
    asn: cf.asn ? String(cf.asn) : "",
    as_org: cf.asOrganization || "",
    colo: cf.colo || "",
    ua: h("user-agent"),
    accept_language: h("accept-language"),
    referer: h("referer"),
  };
}

// Guarda el registro y avisa por correo. `fields` son pares [etiqueta, valor]
// para la cabecera del correo; `message` va aparte, respetando saltos de línea.
export async function storeAndNotify(env, { prefix, record, subject, fields, message }) {
  const key = `${prefix}:${record.ts}:${record.email}`;
  await env.SUBSCRIBERS.put(key, JSON.stringify(record));
  // El resultado del aviso queda en el registro, para ver en iskitch-ops.sh
  // si alguno no llegó por correo.
  record.notified = await notify(env, { record, subject, fields, message });
  try { await env.SUBSCRIBERS.put(key, JSON.stringify(record)); } catch (_) {}
}

// Devuelve "sent", "skipped" (sin configurar) o "error:<detalle>". Nunca lanza:
// si el aviso falla, el envío ya está guardado en KV.
async function notify(env, { record: r, subject, fields, message }) {
  if (!env.CF_ACCOUNT_ID || !env.CF_EMAIL_TOKEN) return "skipped";
  const c = r.conn || {};
  const place = [c.city, c.region, c.country].filter(Boolean).join(", ");
  const conn = [
    ["IP", c.ip],
    ["Location", place + (c.timezone ? ` (${c.timezone})` : "")],
    ["Network", [c.as_org, c.asn && `AS${c.asn}`].filter(Boolean).join(" · ")],
    ["Cloudflare PoP", c.colo],
    ["Page language", r.lang],
    ["Browser languages", c.accept_language],
    ["Sent from", c.referer],
    ["User agent", c.ua],
    ["Date (UTC)", r.ts],
  ].filter(([, v]) => v);
  const msg = message || "(no message)";
  const text = [
    ...fields.map(([k, v]) => `${k}: ${v || "-"}`),
    "", msg, "",
    "— Connection —",
    ...conn.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");
  const rows = (pairs) => pairs.map(([k, v]) =>
    `<tr><td style="padding:2px 12px 2px 0;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:2px 0">${escapeHtml(v || "-")}</td></tr>`).join("");
  const html = `<table style="border-collapse:collapse;font:14px/1.5 -apple-system,sans-serif">${rows(fields)}</table>`
    + `<p style="white-space:pre-wrap;font:15px/1.55 -apple-system,sans-serif;border-left:3px solid #FF3366;padding-left:12px">${escapeHtml(msg)}</p>`
    + `<p style="font:600 13px -apple-system,sans-serif;color:#666;margin:20px 0 4px">Connection</p>`
    + `<table style="border-collapse:collapse;font:13px/1.5 -apple-system,sans-serif;color:#333">${rows(conn)}</table>`;
  try {
    const resp = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${env.CF_EMAIL_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        to: NOTIFY_TO,
        from: NOTIFY_FROM,
        // Responder al aviso contesta directamente a quien escribió.
        reply_to: { address: r.email, name: r.name },
        subject, text, html,
      }),
    });
    if (resp.ok) return "sent";
    return `error:${resp.status} ${(await resp.text()).slice(0, 200)}`;
  } catch (e) {
    return `error:${String((e && e.message) || e).slice(0, 200)}`;
  }
}
