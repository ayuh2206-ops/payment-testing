// pages/api/products.js
// GET /api/products?search=&category=&maxPrice=&sort=&page=&limit=
// All filtering/sorting/pagination runs as SQL — this is the production pattern.

import { getDb } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const {
    search    = '',
    category  = '',
    maxPrice  = 13000,
    sort      = 'default',
    page      = 1,
    limit     = 24,
  } = req.query;

  const pageNum   = Math.max(1, parseInt(page));
  const limitNum  = Math.min(48, Math.max(1, parseInt(limit)));
  const offset    = (pageNum - 1) * limitNum;
  const maxPriceN = parseInt(maxPrice) || 13000;

  const sql = getDb();

  try {
    // Build dynamic conditions
    const conditions = ['is_active = true'];
    const params     = [];
    let   idx        = 1;

    if (search.trim()) {
      conditions.push(`(name ILIKE $${idx} OR sku ILIKE $${idx} OR category ILIKE $${idx})`);
      params.push(`%${search.trim()}%`);
      idx++;
    }
    if (category.trim()) {
      conditions.push(`category = $${idx}`);
      params.push(category.trim());
      idx++;
    }
    conditions.push(`price <= $${idx}`);
    params.push(maxPriceN);
    idx++;

    const where = `WHERE ${conditions.join(' AND ')}`;

    const orderMap = {
      'price-asc':  'price ASC',
      'price-desc': 'price DESC',
      'rating':     'rating DESC',
      'reviews':    'reviews DESC',
      'name':       'name ASC',
      'new':        'is_new DESC, created_at DESC',
      'default':    'id ASC',
    };
    const orderBy = orderMap[sort] || 'id ASC';

    // Use tagged template literal approach — build raw query safely
    // Since Neon's tagged template doesn't support dynamic WHERE building,
    // we use a parameterised query approach via the http API
    const countQuery = `SELECT COUNT(*) as total FROM products ${where}`;
    const dataQuery  = `
      SELECT id, sku, name, category, price, stock, rating, reviews, emoji, is_new
      FROM products
      ${where}
      ORDER BY ${orderBy}
      LIMIT $${idx} OFFSET $${idx + 1}
    `;

    const [countResult, products] = await Promise.all([
      sql(countQuery, params),
      sql(dataQuery, [...params, limitNum, offset]),
    ]);

    const total      = parseInt(countResult[0].total);
    const totalPages = Math.ceil(total / limitNum);

    return res.status(200).json({
      products,
      total,
      page: pageNum,
      totalPages,
      limit: limitNum,
    });
  } catch (err) {
    console.error('Products API error:', err);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
}
