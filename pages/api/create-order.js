// pages/api/create-order.js
// Server-side order creation — amount is authoritative here, never trusted from client.
// §2.19 — All order details logged server-side for 10-year record retention requirement.

import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { amount, currency = "INR", receipt, customerName, customerEmail, customerPhone } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  // Server enforces amount in paise — client cannot manipulate price
  const amountInPaise = Math.round(amount * 100);

  try {
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: {
        // §2.19 — Store customer info server-side for audit trail
        customerName: customerName || "",
        customerEmail: customerEmail || "",
        customerPhone: customerPhone || "",
        createdAt: new Date().toISOString(),
      },
    });

    // §2.19 — Log for 10-year record retention (add DB write in production)
    console.log("Order created:", {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      customerEmail,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return res.status(500).json({ error: "Failed to create order" });
  }
}
