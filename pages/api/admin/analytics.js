// pages/api/admin/analytics.js
import { getDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const sql = getDb();

  try {
    const [
      revenueResult,
      orderStats,
      productStats,
      dailyRevenue,
      topProducts,
    ] = await Promise.all([
      // Total revenue from delivered orders
      sql`SELECT COALESCE(SUM(amount), 0) as total FROM orders WHERE status = 'delivered'`,

      // Orders by status
      sql`SELECT status, COUNT(*) as count FROM orders GROUP BY status ORDER BY count DESC`,

      // Product stats
      sql`SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE stock = 0) as out_of_stock,
        COUNT(*) FILTER (WHERE stock < 10 AND stock > 0) as low_stock
      FROM products WHERE is_active = true`,

      // Daily revenue — last 30 days
      sql`SELECT
        TO_CHAR(created_at AT TIME ZONE 'Asia/Kolkata', 'DD Mon') as day,
        DATE(created_at AT TIME ZONE 'Asia/Kolkata') as date,
        COUNT(*) as orders,
        COALESCE(SUM(amount), 0) as revenue
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '30 days'
        AND status != 'cancelled'
      GROUP BY DATE(created_at AT TIME ZONE 'Asia/Kolkata'), TO_CHAR(created_at AT TIME ZONE 'Asia/Kolkata', 'DD Mon')
      ORDER BY date ASC`,

      // Top 5 products by order count (from order_items)
      sql`SELECT
        p.name, p.category, p.price, p.emoji,
        COALESCE(SUM(oi.quantity), 0) as units_sold,
        COUNT(DISTINCT oi.order_ref) as order_count
      FROM products p
      LEFT JOIN order_items oi ON p.id = oi.product_id
      WHERE p.is_active = true
      GROUP BY p.id, p.name, p.category, p.price, p.emoji
      ORDER BY units_sold DESC
      LIMIT 5`,
    ]);

    const totalOrders = orderStats.reduce((s, r) => s + parseInt(r.count), 0);
    const pending     = orderStats.find(r => r.status === 'pending')?.count || 0;
    const processing  = orderStats.find(r => r.status === 'processing')?.count || 0;

    return res.status(200).json({
      totalRevenue:   parseInt(revenueResult[0].total),
      totalOrders,
      pendingOrders:  parseInt(pending) + parseInt(processing),
      ordersByStatus: orderStats,
      products:       productStats[0],
      dailyRevenue,
      topProducts,
    });
  } catch (err) {
    console.error('Analytics error:', err);
    return res.status(500).json({ error: err.message });
  }
}

export default requireAdmin(handler);
