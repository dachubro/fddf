export async function onRequestPost({ request, env }) {
  const { id, password } = await request.json();

  const now = new Date().toISOString();
  const query = `
    SELECT * FROM users WHERE id = ? AND password = ? AND membership_expiry > ?
  `;
  const { results } = await env.DB.prepare(query).bind(id, password, now).all();

  if (results.length > 0) {
    return new Response("Login successful");
  } else {
    return new Response("Invalid credentials or membership expired", { status: 401 });
  }
}
