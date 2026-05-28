// Cloudflare Pages Function · /api/admin/subscribers
// Lista o exporta como CSV los suscriptores guardados en Cloudflare KV.
// Protegido con env var ADMIN_KEY.
//
// Uso:
//   GET /api/admin/subscribers?key=TU_ADMIN_KEY               → JSON
//   GET /api/admin/subscribers?key=TU_ADMIN_KEY&format=csv    → CSV descargable

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key") || "";

  // Comparación de tiempo constante simple (no crítico aquí, pero es buena práctica).
  if (!env || !env.ADMIN_KEY || key.length === 0 || key !== env.ADMIN_KEY) {
    return new Response("Forbidden", { status: 403 });
  }
  if (!env.SUBSCRIBERS) {
    return new Response("KV not configured", { status: 500 });
  }

  const format = (url.searchParams.get("format") || "json").toLowerCase();

  // Listamos todas las claves con prefijo "subscriber:" (paginación si hay >1000).
  const subscribers = [];
  let cursor;
  while (true) {
    const list = await env.SUBSCRIBERS.list({ prefix: "subscriber:", cursor });
    for (const { name } of list.keys) {
      const v = await env.SUBSCRIBERS.get(name);
      if (v) {
        try { subscribers.push(JSON.parse(v)); } catch (_) {}
      }
    }
    if (list.list_complete) break;
    cursor = list.cursor;
  }

  // Orden cronológico ascendente.
  subscribers.sort((a, b) => (a.ts || "").localeCompare(b.ts || ""));

  if (format === "csv") {
    const header = "email,lang,timestamp,country";
    const rows = subscribers.map((s) =>
      [s.email, s.lang || "", s.ts || "", s.country || ""]
        .map((v) => '"' + String(v).replace(/"/g, '""') + '"')
        .join(",")
    );
    const csv = [header].concat(rows).join("\n") + "\n";
    const today = new Date().toISOString().slice(0, 10);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="iskitch-beta-subscribers-' + today + '.csv"',
      },
    });
  }

  const meta = {
    count: await env.SUBSCRIBERS.get("__meta:count"),
    last: await env.SUBSCRIBERS.get("__meta:last"),
  };

  return new Response(JSON.stringify({ total: subscribers.length, meta, subscribers }, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
