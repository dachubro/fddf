export async function onRequestPost({ request, env }) {
  const { id } = await request.json();
  const query = `DELETE FROM users WHERE id = ?`;

  await env.DB.prepare(query).bind(id).run();
  return new Response("User deleted");
}
