// pages/api/verify-payment.js
import crypto from 'crypto';
import { getDb } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, customer, items, amount } = req.body;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing payment verification parameters' });
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ error: 'Payment verification failed — invalid signature' });
  }

  try {
    const sql = getDb();

    // Update order status to processing + store payment ID
    await sql`
      UPDATE orders
      SET status = 'processing', razorpay_payment_id = ${razorpay_payment_id}, updated_at = NOW()
      WHERE razorpay_order_id = ${razorpay_order_id}
    `;

    // Decrease stock for each item
    if (items && items.length > 0) {
      for (const item of items) {
        await sql`
          UPDATE products SET stock = GREATEST(0, stock - ${item.qty}), updated_at = NOW()
          WHERE id = ${item.id}
        `;
      }
    }

    return res.status(200).json({ success: true, paymentId: razorpay_payment_id });
  } catch (err) {
    console.error('verify-payment DB error:', err);
    // Payment was valid even if DB write fails — still return success
    return res.status(200).json({ success: true, paymentId: razorpay_payment_id, warning: 'DB update failed' });
  }
}
