// pages/api/verify-payment.js
// Critical security step: server verifies Razorpay signature before fulfilling order.
// §2.19 — Full transaction record logged here for 10-year retention requirement.
// §6.1(iii)(iv) — We receive payment IDs only, NEVER card data or payment credentials.

import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    customer,
    items,
    amount,
  } = req.body;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing payment verification parameters" });
  }

  // Verify HMAC-SHA256 signature — proves payment came from Razorpay, not tampered
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    console.error("Payment signature mismatch — possible tampering:", {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      timestamp: new Date().toISOString(),
    });
    return res.status(400).json({ error: "Payment verification failed — invalid signature" });
  }

  // §2.19 — Log complete transaction record for 10-year audit requirement
  // In production: INSERT this into your database transactions table
  const transactionRecord = {
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    amount,
    currency: "INR",
    status: "verified",
    customerName: customer?.name,
    customerEmail: customer?.email,
    customerPhone: customer?.phone,
    items: JSON.stringify(items),
    verifiedAt: new Date().toISOString(),
    // §6.1(iii)(iv) — Note: NO card data, CVV, or UPI PIN stored here.
    // Only the cryptographic payment IDs issued by Razorpay are stored.
  };

  console.log("=== PAYMENT VERIFIED & RECORDED ===", transactionRecord);

  // TODO in production:
  // 1. await db.transactions.insert(transactionRecord)
  // 2. await sendOrderConfirmationEmail(customer.email, transactionRecord)
  // 3. await updateInventory(items)

  return res.status(200).json({
    success: true,
    paymentId: razorpay_payment_id,
    message: "Payment verified successfully",
  });
}
