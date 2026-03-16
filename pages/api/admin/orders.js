// pages/api/admin/orders.js
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { status = '', search = '', sort = 'date-desc', page = 1, limit = 20 } = req.query;
  const pageNum  = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, parseInt(limit));
  const offset   = (pageNum - 1) * limitNum;

  const sql = getDb();

  try {
    const conditions = [];
    const params     = [];
    let idx = 1;

    if (status) { conditions.push(`status = $${idx}`); params.push(status); idx++; }
    if (search.trim()) {
      conditions.push(`(order_ref ILIKE $${idx} OR customer_name ILIKE $${idx} OR customer_email ILIKE $${idx})`);
      params.push(`%${search.trim()}%`); idx++;
    }

    const where   = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const orderBy = sort === 'amount-desc' ? 'amount DESC' : sort === 'amount-asc' ? 'amount ASC' : sort === 'date-asc' ? 'created_at ASC' : 'created_at DESC';

    const [countRes, orders] = await Promise.all([
      sql(`SELECT COUNT(*) as total FROM orders ${where}`, params),
      sql(`SELECT order_ref, customer_name, customer_email, customer_phone, amount, status, razorpay_payment_id, created_at
           FROM orders ${where} ORDER BY ${orderBy} LIMIT $${idx} OFFSET $${idx+1}`,
           [...params, limitNum, offset]),
    ]);

    return res.status(200).json({
      orders,
      total:      parseInt(countRes[0].total),
      page:       pageNum,
      totalPages: Math.ceil(countRes[0].total / limitNum),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export default requireAdmin(handler);
