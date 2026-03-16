// pages/api/admin/products.js
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

async function handler(req, res) {
  const sql = getDb();

  if (req.method === 'GET') {
    const { search = '', category = '', page = 1, limit = 24 } = req.query;
    const pageNum  = Math.max(1, parseInt(page));
    const limitNum = parseInt(limit);
    const offset   = (pageNum - 1) * limitNum;

    const conditions = [];
    const params     = [];
    let   idx        = 1;
    if (search.trim()) { conditions.push(`(name ILIKE $${idx} OR sku ILIKE $${idx})`); params.push(`%${search.trim()}%`); idx++; }
    if (category)      { conditions.push(`category = $${idx}`); params.push(category); idx++; }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    try {
      const [countRes, products] = await Promise.all([
        sql(`SELECT COUNT(*) as total FROM products ${where}`, params),
        sql(`SELECT * FROM products ${where} ORDER BY id ASC LIMIT $${idx} OFFSET $${idx+1}`, [...params, limitNum, offset]),
      ]);
      return res.status(200).json({
        products,
        total:      parseInt(countRes[0].total),
        page:       pageNum,
        totalPages: Math.ceil(countRes[0].total / limitNum),
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    const { sku, name, description = '', category, price, stock, rating = 4.0, reviews = 0, emoji = '📦', is_new = false } = req.body;
    if (!sku || !name || !category || !price) {
      return res.status(400).json({ error: 'sku, name, category, price are required' });
    }
    try {
      const result = await sql`
        INSERT INTO products (sku, name, description, category, price, stock, rating, reviews, emoji, is_new)
        VALUES (${sku}, ${name}, ${description}, ${category}, ${parseInt(price)}, ${parseInt(stock)||0}, ${parseFloat(rating)}, ${parseInt(reviews)}, ${emoji}, ${is_new})
        RETURNING *
      `;
      return res.status(201).json({ product: result[0] });
    } catch (err) {
      if (err.message.includes('unique')) return res.status(409).json({ error: 'SKU already exists' });
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default requireAdmin(handler);
