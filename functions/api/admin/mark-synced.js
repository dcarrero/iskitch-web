// Cloudflare Pages Function · POST /api/admin/mark-synced
// Marca uno o varios suscriptores como ya sincronizados a Acumbamail.
// Usado por el GitHub Action `.github/workflows/sync-acumbamail.yml`.
//
// Body JSON: { "emails": ["a@b.com", "c@d.com"] }
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
  const emails = Array.isArray(body && body.emails) ? body.emails : [];
  if (emails.length === 0) {
    return jsonResponse({ ok: false, error: "no_emails" }, 400);
  }

  const now = new Date().toISOString();
  const marked = [];
  const failed = [];

  for (const raw of emails) {
    const email = String(raw || "").trim().toLowerCase();
    if (!email) continue;
    const k = "subscriber:" + email;
    try {
      const cur = await env.SUBSCRIBERS.get(k);
      if (!cur) { failed.push({ email, error: "not_found" }); continue; }
      const rec = JSON.parse(cur);
      rec.synced_at = now;
      await env.SUBSCRIBERS.put(k, JSON.stringify(rec));
      marked.push(email);
    } catch (e) {
      failed.push({ email, error: String((e && e.message) || e).slice(0, 200) });
    }
  }

  return jsonResponse({ ok: true, marked_count: marked.length, marked, failed });
}
