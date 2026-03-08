// pages/api/webhook.js
// Razorpay calls this automatically for payment events (captured, failed, refund).
// Register URL in: Razorpay Dashboard → Settings → Webhooks
//   URL: https://your-vercel-domain.vercel.app/api/webhook

import crypto from "crypto";

// Raw body needed for signature verification — disable Next.js body parser
export const config = { api: { bodyParser: false } };

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end",  () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const rawBody  = await getRawBody(req);
  const received = req.headers["x-razorpay-signature"];

  if (!received) {
    return res.status(400).json({ error: "Missing Razorpay signature header" });
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (expected !== received) {
    console.warn("[webhook] ❌ Invalid signature");
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  const event   = JSON.parse(rawBody.toString());
  const payment = event.payload?.payment?.entity;

  console.log(`[webhook] Event: ${event.event}`, { id: payment?.id, order: payment?.order_id });

  switch (event.event) {
    case "payment.captured":
      // ✅ Fulfil order, send confirmation email, reduce inventory
      // await fulfillOrder(payment.order_id, payment.id);
      break;
    case "payment.failed":
      // ❌ Notify customer, release held inventory
      // await markFailed(payment.order_id, payment.error_description);
      break;
    case "refund.processed":
      // 💸 Update refund status in DB
      break;
    default:
      console.log(`[webhook] Unhandled: ${event.event}`);
  }

  // Always 200 — Razorpay retries on non-200
  return res.status(200).json({ received: true });
}
