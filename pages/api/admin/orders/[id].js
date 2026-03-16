// pages/api/admin/orders/[id].js
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

async function handler(req, res) {
  const { id } = req.query; // order_ref e.g. ORD-14001
  const sql = getDb();

  if (req.method === 'PUT') {
    const { status } = req.body;
    const validStatuses = ['pending','processing','shipped','delivered','cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    try {
      const result = await sql`
        UPDATE orders SET status = ${status}, updated_at = NOW()
        WHERE order_ref = ${id}
        RETURNING order_ref, status, updated_at
      `;
      if (result.length === 0) return res.status(404).json({ error: 'Order not found' });
      return res.status(200).json({ success: true, order: result[0] });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const [order, items] = await Promise.all([
        sql`SELECT * FROM orders WHERE order_ref = ${id}`,
        sql`SELECT oi.*, p.emoji FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id WHERE oi.order_ref = ${id}`,
      ]);
      if (order.length === 0) return res.status(404).json({ error: 'Order not found' });
      return res.status(200).json({ order: order[0], items });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default requireAdmin(handler);
