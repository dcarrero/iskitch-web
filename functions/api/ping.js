// Test endpoint mínimo. Si este 502s también → las Pages Functions no se están
// deployando. Si responde "pong" → el problema está en /api/subscribe.
export function onRequest() {
  return new Response("pong", {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
