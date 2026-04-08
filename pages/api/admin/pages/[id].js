// pages/api/admin/pages/[id].js
// Single page CRUD — GET (with content), PUT (update), DELETE (only non-core)
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

async function handler(req, res) {
  const { id } = req.query;
  const sql = getDb();

  if (req.method === 'GET') {
    try {
      const result = await sql`SELECT * FROM site_pages WHERE id = ${parseInt(id)}`;
      if (result.length === 0) return res.status(404).json({ error: 'Page not found' });
      return res.status(200).json({ page: result[0] });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'PUT') {
    const { title, slug, seo_title, seo_description, content, is_active, sort_order } = req.body;
    const cleanSlug = slug ? slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') : undefined;
    try {
      const result = await sql`
        UPDATE site_pages SET
          title           = COALESCE(${title || null}, title),
          slug            = COALESCE(${cleanSlug || null}, slug),
          seo_title       = COALESCE(${seo_title !== undefined ? seo_title : null}, seo_title),
          seo_description = COALESCE(${seo_description !== undefined ? seo_description : null}, seo_description),
          content         = COALESCE(${content !== undefined ? content : null}, content),
          is_active       = COALESCE(${is_active !== undefined ? is_active : null}, is_active),
          sort_order      = COALESCE(${sort_order !== undefined ? parseInt(sort_order) : null}, sort_order),
          updated_at      = NOW()
        WHERE id = ${parseInt(id)}
        RETURNING *
      `;
      if (result.length === 0) return res.status(404).json({ error: 'Page not found' });
      return res.status(200).json({ page: result[0] });
    } catch (err) {
      if (err.message.includes('unique') || err.message.includes('duplicate')) {
        return res.status(409).json({ error: 'A page with this slug already exists' });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      // Check if core page — cannot delete
      const check = await sql`SELECT is_core, title FROM site_pages WHERE id = ${parseInt(id)}`;
      if (check.length === 0) return res.status(404).json({ error: 'Page not found' });
      if (check[0].is_core) {
        return res.status(403).json({ error: `"${check[0].title}" is a core page and cannot be deleted` });
      }
      await sql`DELETE FROM site_pages WHERE id = ${parseInt(id)} AND is_core = false`;
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default requireAdmin(handler);
