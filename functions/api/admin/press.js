// Cloudflare Pages Function · /api/admin/press
// Lista los envíos de los formularios de la web. Protegido con env var
// ADMIN_KEY, como /api/admin/subscribers.
//
//   GET /api/admin/press?key=TU_ADMIN_KEY               → peticiones de /press
//   GET /api/admin/press?kind=support&key=TU_ADMIN_KEY  → consultas de /support
// JSON, más recientes primero.

const PREFIXES = { press: "press:", support: "support:" };

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key") || "";
  if (!env || !env.ADMIN_KEY || key.length === 0 || key !== env.ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }
  if (!env.SUBSCRIBERS) {
    return new Response("KV not configured", { status: 500 });
  }

  const prefix = PREFIXES[(url.searchParams.get("kind") || "press").toLowerCase()];
  if (!prefix) return new Response("Unknown kind", { status: 400 });

  const requests = [];
  let cursor;
  while (true) {
    const list = await env.SUBSCRIBERS.list({ prefix, cursor });
    for (const { name } of list.keys) {
      const v = await env.SUBSCRIBERS.get(name);
      if (!v) continue;
      try { requests.push({ key: name, ...JSON.parse(v) }); } catch (_) {}
    }
    if (list.list_complete) break;
    cursor = list.cursor;
  }
  requests.sort((a, b) => String(b.ts).localeCompare(String(a.ts)));

  return new Response(JSON.stringify({ ok: true, count: requests.length, requests }, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}
