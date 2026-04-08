// pages/api/admin/pages.js
// CRUD for site pages — GET (list + search) and POST (create)
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

async function handler(req, res) {
  const sql = getDb();

  if (req.method === 'GET') {
    const { search = '', status = '', page = 1, limit = 50 } = req.query;
    const pageNum  = Math.max(1, parseInt(page));
    const limitNum = parseInt(limit);
    const offset   = (pageNum - 1) * limitNum;

    const conditions = [];
    const params     = [];
    let   idx        = 1;

    if (search.trim()) {
      conditions.push(`(title ILIKE $${idx} OR slug ILIKE $${idx})`);
      params.push(`%${search.trim()}%`);
      idx++;
    }
    if (status === 'active')   { conditions.push(`is_active = true`); }
    if (status === 'draft')    { conditions.push(`is_active = false`); }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    try {
      const [countRes, pages] = await Promise.all([
        sql(`SELECT COUNT(*) as total FROM site_pages ${where}`, params),
        sql(`SELECT id, title, slug, seo_title, seo_description, is_active, is_core, updated_at, created_at FROM site_pages ${where} ORDER BY sort_order ASC, id ASC LIMIT $${idx} OFFSET $${idx + 1}`, [...params, limitNum, offset]),
      ]);
      return res.status(200).json({
        pages,
        total:      parseInt(countRes[0].total),
        page:       pageNum,
        totalPages: Math.ceil(countRes[0].total / limitNum),
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    const { title, slug, seo_title = '', seo_description = '', content = '', is_active = true } = req.body;
    if (!title || !slug) {
      return res.status(400).json({ error: 'title and slug are required' });
    }
    // Sanitise slug
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    try {
      const result = await sql`
        INSERT INTO site_pages (title, slug, seo_title, seo_description, content, is_active, is_core)
        VALUES (${title}, ${cleanSlug}, ${seo_title || title}, ${seo_description}, ${content}, ${is_active}, false)
        RETURNING *
      `;
      return res.status(201).json({ page: result[0] });
    } catch (err) {
      if (err.message.includes('unique') || err.message.includes('duplicate')) {
        return res.status(409).json({ error: 'A page with this slug already exists' });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default requireAdmin(handler);
