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

// Orígenes desde los que se aceptan envíos: la web y sus despliegues de Pages
// (producción y vistas previas). Bloquea que otra web use nuestros formularios.
const ALLOWED_ORIGIN = /^https:\/\/((www\.)?iskitch\.com|([a-z0-9-]+\.)?iskitch-web\.pages\.dev)$|^http:\/\/localhost(:\d+)?$/;
const MAX_BODY = 16 * 1024;          // bytes; el formulario más largo ronda 6 KB
const PER_IP_PER_HOUR = 5;           // envíos por IP y hora, sumando los dos formularios
const GLOBAL_PER_DAY = 100;          // tope diario de todos, para no agotar el envío de correo

export function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export function clean(v, max) {
  return String(v == null ? "" : v).trim().slice(0, max);
}

// Para campos de una línea (nombre, versión…): sin saltos ni caracteres de
// control, que acabarían en el asunto del correo.
export function cleanLine(v, max) {
  return clean(String(v == null ? "" : v).replace(/[\u0000-\u001f\u007f]+/g, " "), max);
}

// Defensas comunes antes de mirar el contenido. Devuelve una Response si hay
// que cortar, o { body } con el JSON ya leído.
//  - Solo JSON y como mucho MAX_BODY bytes.
//  - Solo desde iskitch.com (cabecera Origin): otra web no puede enviar con
//    el navegador de sus visitantes, y un script sin Origin tampoco pasa.
//  - Límite por IP y por día en KV, con caducidad automática.
// El honeypot y la validación de cada campo los hace cada endpoint.
export async function guard(request, env) {
  const origin = request.headers.get("origin") || "";
  if (!ALLOWED_ORIGIN.test(origin)) return jsonResponse({ ok: false, error: "forbidden_origin" }, 403);
  if (!(request.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) {
    return jsonResponse({ ok: false, error: "unsupported_media_type" }, 415);
  }
  const raw = await request.text();
  if (raw.length > MAX_BODY) return jsonResponse({ ok: false, error: "too_large" }, 413);
  let body;
  try { body = JSON.parse(raw); } catch (_) { return jsonResponse({ ok: false, error: "bad_json" }, 400); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return jsonResponse({ ok: false, error: "bad_json" }, 400);

  if (env && env.SUBSCRIBERS) {
    const now = new Date();
    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const hourKey = `rl:ip:${ip}:${now.toISOString().slice(0, 13)}`;
    const dayKey = `rl:day:${now.toISOString().slice(0, 10)}`;
    const [perIp, perDay] = await Promise.all([env.SUBSCRIBERS.get(hourKey), env.SUBSCRIBERS.get(dayKey)]);
    if ((parseInt(perIp, 10) || 0) >= PER_IP_PER_HOUR || (parseInt(perDay, 10) || 0) >= GLOBAL_PER_DAY) {
      return jsonResponse({ ok: false, error: "rate_limited" }, 429);
    }
    // KV no tiene incrementos atómicos: dos envíos simultáneos pueden contar
    // uno. Para este volumen da igual; el tope sigue frenando un abuso.
    await Promise.all([
      env.SUBSCRIBERS.put(hourKey, String((parseInt(perIp, 10) || 0) + 1), { expirationTtl: 3600 }),
      env.SUBSCRIBERS.put(dayKey, String((parseInt(perDay, 10) || 0) + 1), { expirationTtl: 172800 }),
    ]);
  }
  return { body };
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
// Cada envío caduca solo a los 12 meses: es lo que promete la política de
// privacidad, así que no depende de acordarse de borrar.
const KEEP_SECONDS = 365 * 24 * 3600;

export async function storeAndNotify(env, { prefix, record, subject, fields, message }) {
  const key = `${prefix}:${record.ts}:${record.email}`;
  const opts = { expirationTtl: KEEP_SECONDS };
  await env.SUBSCRIBERS.put(key, JSON.stringify(record), opts);
  // El resultado del aviso queda en el registro, para ver en iskitch-ops.sh
  // si alguno no llegó por correo.
  record.notified = await notify(env, { record, subject, fields, message });
  try { await env.SUBSCRIBERS.put(key, JSON.stringify(record), opts); } catch (_) {}
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
