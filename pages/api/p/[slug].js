// pages/api/p/[slug].js
// Public API — fetch a single published page by slug (no auth required)
import { getDb } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { slug } = req.query;
  const sql = getDb();

  try {
    const result = await sql`
      SELECT id, title, slug, seo_title, seo_description, content, is_active, updated_at
      FROM site_pages
      WHERE slug = ${slug} AND is_active = true
    `;
    if (result.length === 0) return res.status(404).json({ error: 'Page not found' });
    return res.status(200).json({ page: result[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
