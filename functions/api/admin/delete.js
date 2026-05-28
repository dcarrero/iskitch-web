// Cloudflare Pages Function · POST /api/admin/delete
// Borra uno o varios suscriptores del KV.
//
// Body JSON: { "emails": ["a@b.com", ...] }   ó  { "all": true } para borrar todos.
// Auth:      ?key=ADMIN_KEY

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key") || "";

  if (!env || !env.ADMIN_KEY || key.length === 0 || key !== env.ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }
  if (!env.SUBSCRIBERS) {
    return new Response("KV not configured", { status: 500 });
  }

  let body = {};
  try { body = await request.json(); } catch (_) {}

  const deleted = [];
  const failed = [];

  if (body && body.all === true) {
    // Borrar TODOS los suscriptores (y resetear contador).
    let cursor;
    while (true) {
      const list = await env.SUBSCRIBERS.list({ prefix: "subscriber:", cursor });
      for (const { name } of list.keys) {
        try {
          await env.SUBSCRIBERS.delete(name);
          deleted.push(name.replace(/^subscriber:/, ""));
        } catch (e) {
          failed.push({ key: name, error: String(e?.message || e).slice(0, 200) });
        }
      }
      if (list.list_complete) break;
      cursor = list.cursor;
    }
    try {
      await env.SUBSCRIBERS.put("__meta:count", "0");
    } catch (_) {}
    return jsonResponse({ ok: true, mode: "all", deleted_count: deleted.length, deleted, failed });
  }

  const emails = Array.isArray(body && body.emails) ? body.emails : [];
  if (emails.length === 0) {
    return jsonResponse({ ok: false, error: "no_emails" }, 400);
  }

  for (const raw of emails) {
    const email = String(raw || "").trim().toLowerCase();
    if (!email) continue;
    try {
      await env.SUBSCRIBERS.delete("subscriber:" + email);
      deleted.push(email);
    } catch (e) {
      failed.push({ email, error: String(e?.message || e).slice(0, 200) });
    }
  }
  return jsonResponse({ ok: true, mode: "list", deleted_count: deleted.length, deleted, failed });
}
