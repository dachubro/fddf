export async function onRequestGet({ env }) {
  const now = new Date().toISOString();
  const query = `DELETE FROM users WHERE membership_expiry < ?`;
  await env.DB.prepare(query).bind(now).run();
  return new Response("Expired users cleaned up");
}
