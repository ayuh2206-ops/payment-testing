// pages/api/verify-payment.js
// STEP 2: Cryptographically verifies the payment signature.
// Without this check, a hacker could fake a successful payment.

import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, error: "Missing verification fields." });
  }

  try {
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      console.warn("[verify-payment] Signature MISMATCH", { razorpay_order_id });
      return res.status(400).json({ success: false, error: "Signature verification failed." });
    }

    // ✅ Payment is genuine — mark order as PAID in your database here:
    //
    //   await db.orders.update({
    //     where: { razorpay_order_id },
    //     data: { status: "PAID", razorpay_payment_id, paid_at: new Date() },
    //   });

    console.log("[verify-payment] ✅ Verified:", razorpay_payment_id);
    return res.status(200).json({
      success:    true,
      payment_id: razorpay_payment_id,
      order_id:   razorpay_order_id,
    });
  } catch (err) {
    console.error("[verify-payment]", err);
    return res.status(500).json({ success: false, error: "Server error during verification." });
  }
}
