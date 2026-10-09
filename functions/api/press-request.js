// Cloudflare Pages Function · /api/press-request
// POST: guarda en KV una petición de código de prueba del formulario de /press.
// Usa el mismo namespace que la lista (binding SUBSCRIBERS) con el prefijo
// "press:", que el sync de Acumbamail no lee (solo lista "subscriber:").
// Se consultan con /api/admin/press o `mac/tools/iskitch-ops.sh press`.
//
// Además avisa por correo a hello@iskitch.com con Cloudflare Email Sending.
// Las Pages Functions no admiten el binding send_email, así que va por la API
// REST. Variables en Pages ▸ Settings ▸ Variables and Secrets (y redesplegar):
//   CF_ACCOUNT_ID    id de la cuenta de Cloudflare
//   CF_EMAIL_TOKEN   token de API con permiso de Email Sending (secreto)
// Sin ellas la petición se guarda igual y solo falta el aviso.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

const NOTIFY_TO = "hello@iskitch.com";
const NOTIFY_FROM = { address: "web@iskitch.com", name: "iSkitch web" };

function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Devuelve "sent", "skipped" (sin configurar) o "error:<detalle>". Nunca lanza:
// si el aviso falla, la petición ya está guardada en KV.
async function notify(env, r) {
  if (!env.CF_ACCOUNT_ID || !env.CF_EMAIL_TOKEN) return "skipped";
  const lines = [
    `Name: ${r.name}`,
    `Email: ${r.email}`,
    `URL: ${r.url}`,
    `Language: ${r.lang} · Country: ${r.country || "?"}`,
    "",
    r.message || "(no message)",
  ];
  try {
    const resp = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${env.CF_EMAIL_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        to: NOTIFY_TO,
        from: NOTIFY_FROM,
        // Responder al aviso contesta directamente a quien pide el código.
        reply_to: { address: r.email, name: r.name },
        subject: `Review code request: ${r.name} (${new URL(r.url).hostname})`,
        text: lines.join("\n"),
        html: `<p>${lines.slice(0, 4).map(escapeHtml).join("<br>")}</p><p style="white-space:pre-wrap">${escapeHtml(r.message || "(no message)")}</p>`,
      }),
    });
    if (resp.ok) return "sent";
    return `error:${resp.status} ${(await resp.text()).slice(0, 200)}`;
  } catch (e) {
    return `error:${String((e && e.message) || e).slice(0, 200)}`;
  }
}

function clean(v, max) {
  return String(v == null ? "" : v).trim().slice(0, max);
}

export async function onRequestPost({ request, env }) {
  try {
    let body = {};
    try { body = await request.json(); } catch (_) {}

    // Honeypot anti-spam: fingimos éxito.
    if (body && body.honeypot && String(body.honeypot).length > 0) {
      return jsonResponse({ ok: true });
    }

    const name = clean(body.name, 120);
    const email = clean(body.email, 200).toLowerCase();
    let url = clean(body.url, 300);
    const message = clean(body.message, 3000);

    if (!name) return jsonResponse({ ok: false, error: "name_required" }, 400);
    if (!EMAIL_RE.test(email)) return jsonResponse({ ok: false, error: "invalid_email" }, 400);
    if (url && !/^https?:\/\//i.test(url)) url = "https://" + url;
    try { new URL(url); } catch (_) { return jsonResponse({ ok: false, error: "invalid_url" }, 400); }

    // Sin consentimiento no hay base para guardar los datos.
    if (body.consent !== true) {
      return jsonResponse({ ok: false, error: "consent_required" }, 400);
    }
    if (!env || !env.SUBSCRIBERS) {
      return jsonResponse({ ok: false, error: "kv_not_configured" }, 500);
    }

    const now = new Date().toISOString();
    const record = {
      name, email, url, message,
      lang: clean(body.lang || "en", 8),
      consent: true,
      ts: now,
      country: (request.cf && request.cf.country) || "",
      ua: request.headers.get("user-agent") || "",
      ip: request.headers.get("cf-connecting-ip") || "",
    };

    // Clave con fecha delante: el listado sale en orden cronológico y una
    // segunda petición del mismo medio no pisa la primera.
    const key = `press:${now}:${email}`;
    await env.SUBSCRIBERS.put(key, JSON.stringify(record));

    // El resultado del aviso queda en el registro, para ver en `iskitch-ops.sh
    // press` si alguna petición no llegó por correo.
    record.notified = await notify(env, record);
    try { await env.SUBSCRIBERS.put(key, JSON.stringify(record)); } catch (_) {}

    return jsonResponse({ ok: true });
  } catch (e) {
    const msg = (e && e.message) ? e.message : String(e);
    return jsonResponse({ ok: false, error: "handler_exception", detail: msg.slice(0, 300) }, 500);
  }
}
