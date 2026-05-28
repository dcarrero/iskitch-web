#!/usr/bin/env node
// Lee los suscriptores pendientes del KV de Cloudflare (vía endpoint admin)
// y los añade a Acumbamail (double opt-in). Luego marca los que han ido bien.
//
// Variables de entorno requeridas:
//   ISKITCH_BASE_URL      (p. ej. https://iskitch.com)
//   ADMIN_KEY             (el mismo que en Cloudflare Pages env)
//   ACUMBAMAIL_AUTH_TOKEN
//   ACUMBAMAIL_LIST_ID

const BASE = process.env.ISKITCH_BASE_URL || "https://iskitch.com";
const ADMIN_KEY = process.env.ADMIN_KEY;
const TOKEN = process.env.ACUMBAMAIL_AUTH_TOKEN;
const LIST = process.env.ACUMBAMAIL_LIST_ID;

if (!ADMIN_KEY || !TOKEN || !LIST) {
  console.error("Faltan variables de entorno: ADMIN_KEY, ACUMBAMAIL_AUTH_TOKEN, ACUMBAMAIL_LIST_ID");
  process.exit(1);
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function fetchPending() {
  const url = `${BASE}/api/admin/subscribers?key=${encodeURIComponent(ADMIN_KEY)}&only=pending`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Pending fetch failed: ${r.status} ${await r.text()}`);
  const json = await r.json();
  return json.subscribers || [];
}

async function addToAcumbamail({ email, lang }) {
  const params = new URLSearchParams();
  params.set("auth_token", TOKEN);
  params.set("list_id", String(LIST));
  params.set("merge_fields[email]", email);
  params.set("double_optin", "1");
  params.set("update_subscriber", "0");
  params.set("response_type", "json");

  const r = await fetch("https://acumbamail.com/api/1/addSubscriber/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
    body: params.toString(),
  });
  const text = await r.text();
  // Éxito real: status 2xx Y la respuesta es un entero (subscriber_id) o un objeto sin "error".
  let parsed = null;
  try { parsed = JSON.parse(text); } catch (_) {}
  const hasErrorField = parsed && typeof parsed === "object" && (parsed.error !== undefined || parsed.errors !== undefined);
  const ok = r.ok && !hasErrorField && !/\berror\b/i.test(text);
  return { ok, status: r.status, body: text.slice(0, 300) };
}

async function markSynced(emails) {
  if (emails.length === 0) return;
  const url = `${BASE}/api/admin/mark-synced?key=${encodeURIComponent(ADMIN_KEY)}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emails }),
  });
  if (!r.ok) console.error("mark-synced failed:", r.status, await r.text());
  else console.log(`Marcados como sincronizados: ${emails.length}`);
}

async function main() {
  const pending = await fetchPending();
  console.log(`Pendientes: ${pending.length}`);
  if (pending.length === 0) return;

  const synced = [];
  const failed = [];
  for (const s of pending) {
    try {
      const r = await addToAcumbamail(s);
      // Siempre logueamos el body para inspección.
      console.log(`→ ${s.email}  HTTP ${r.status}  body=${r.body}`);
      if (r.ok) {
        synced.push(s.email);
      } else {
        failed.push({ email: s.email, status: r.status, body: r.body });
      }
    } catch (e) {
      failed.push({ email: s.email, error: String(e?.message || e) });
      console.error(`✗ ${s.email} → ${e}`);
    }
    await sleep(400); // pequeño respiro entre llamadas
  }
  await markSynced(synced);
  console.log(`Sincronizados ${synced.length} · Fallidos ${failed.length}`);
  if (failed.length > 0) process.exitCode = 1;
}

main().catch((e) => { console.error(e); process.exit(1); });
