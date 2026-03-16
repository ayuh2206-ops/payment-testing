// pages/api/create-order.js
import Razorpay from 'razorpay';
import { getDb } from '@/lib/db';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { amount, currency = 'INR', customerName, customerEmail, customerPhone, items } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

  const amountInPaise = Math.round(amount * 100);
  const orderRef = `ORD-${Date.now()}`;

  try {
    const rzpOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      receipt: orderRef,
      notes: { customerName, customerEmail, customerPhone },
    });

    // Save pending order to DB
    const sql = getDb();
    await sql`
      INSERT INTO orders (order_ref, customer_name, customer_email, customer_phone, razorpay_order_id, amount, status)
      VALUES (${orderRef}, ${customerName || 'Guest'}, ${customerEmail || ''}, ${customerPhone || ''}, ${rzpOrder.id}, ${amount}, 'pending')
      ON CONFLICT (order_ref) DO NOTHING
    `;

    // Save order items
    if (items && items.length > 0) {
      for (const item of items) {
        await sql`
          INSERT INTO order_items (order_ref, product_id, product_name, product_sku, quantity, unit_price)
          VALUES (${orderRef}, ${item.id}, ${item.name}, ${item.sku || ''}, ${item.qty}, ${item.price})
        `;
      }
    }

    return res.status(200).json({ orderId: rzpOrder.id, orderRef, amount: rzpOrder.amount, currency: rzpOrder.currency });
  } catch (err) {
    console.error('create-order error:', err);
    return res.status(500).json({ error: 'Failed to create order' });
  }
}
