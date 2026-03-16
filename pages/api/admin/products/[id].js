// pages/api/admin/products/[id].js
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

async function handler(req, res) {
  const { id } = req.query;
  const sql = getDb();

  if (req.method === 'PUT') {
    const { name, description, category, price, stock, rating, reviews, emoji, is_new, is_active } = req.body;
    try {
      const result = await sql`
        UPDATE products SET
          name        = COALESCE(${name}, name),
          description = COALESCE(${description}, description),
          category    = COALESCE(${category}, category),
          price       = COALESCE(${price ? parseInt(price) : null}, price),
          stock       = COALESCE(${stock !== undefined ? parseInt(stock) : null}, stock),
          rating      = COALESCE(${rating ? parseFloat(rating) : null}, rating),
          reviews     = COALESCE(${reviews ? parseInt(reviews) : null}, reviews),
          emoji       = COALESCE(${emoji}, emoji),
          is_new      = COALESCE(${is_new !== undefined ? is_new : null}, is_new),
          is_active   = COALESCE(${is_active !== undefined ? is_active : null}, is_active),
          updated_at  = NOW()
        WHERE id = ${parseInt(id)}
        RETURNING *
      `;
      if (result.length === 0) return res.status(404).json({ error: 'Product not found' });
      return res.status(200).json({ product: result[0] });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      // Soft delete — set is_active = false
      const result = await sql`
        UPDATE products SET is_active = false, updated_at = NOW()
        WHERE id = ${parseInt(id)}
        RETURNING id, name
      `;
      if (result.length === 0) return res.status(404).json({ error: 'Product not found' });
      return res.status(200).json({ success: true, deleted: result[0] });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default requireAdmin(handler);
