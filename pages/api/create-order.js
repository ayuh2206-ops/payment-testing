// pages/api/create-order.js
// STEP 1 of payment: Creates a Razorpay order server-side.
// Amount is ALWAYS set here — never trust amount from the client.

import razorpay from "@/lib/razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { amount, currency = "INR", receipt, notes = {} } = req.body;

  if (!amount || typeof amount !== "number" || amount < 100) {
    return res.status(400).json({ error: "Invalid amount. Minimum ₹1 (100 paise)." });
  }
  if (!receipt) {
    return res.status(400).json({ error: "receipt is required." });
  }

  try {
    const order = await razorpay.orders.create({ amount, currency, receipt, notes });
    return res.status(200).json({
      id:       order.id,
      amount:   order.amount,
      currency: order.currency,
      receipt:  order.receipt,
    });
  } catch (err) {
    console.error("[create-order]", err);
    return res.status(500).json({
      error: err?.error?.description || "Failed to create order. Try again.",
    });
  }
}
