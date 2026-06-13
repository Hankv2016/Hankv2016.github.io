export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API：文章列表
    if (url.pathname === "/api/posts") {
      const { results } = await env.DB.prepare(`
        SELECT id, title, slug, excerpt, created_at
        FROM posts
        WHERE status = 'published'
        ORDER BY created_at DESC
      `).all();

      return Response.json(results);
    }

    // 兜底：交给静态资源（HTML/CSS/JS）
    return env.ASSETS.fetch(request);
  }
};