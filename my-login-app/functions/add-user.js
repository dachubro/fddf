export async function onRequestPost({ request, env }) {
  const { id, password, expiry } = await request.json();
  const query = `INSERT INTO users (id, password, membership_expiry) VALUES (?, ?, ?)`;

  try {
    await env.DB.prepare(query).bind(id, password, expiry).run();
    return new Response("User added");
  } catch (e) {
    return new Response("Error adding user: " + e.message, { status: 400 });
  }
}
