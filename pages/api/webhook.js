// pages/api/webhook.js
// Razorpay server-to-server webhook for async payment events.
// Register in Razorpay Dashboard → Settings → Webhooks
// §2.19 — All events logged for 10-year transaction record retention.
// §Part I §4 — Required for handling fraudulent transaction notifications.

import crypto from "crypto";

export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => { data += chunk; });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const rawBody = await getRawBody(req);
  const webhookSignature = req.headers["x-razorpay-signature"];

  // Verify webhook authenticity using HMAC-SHA256
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (expectedSignature !== webhookSignature) {
    console.error("Invalid webhook signature — ignoring event");
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const { event: eventType, payload } = event;
  const timestamp = new Date().toISOString();

  // §2.19 — Log all events for compliance audit trail
  console.log(`=== WEBHOOK: ${eventType} ===`, { timestamp, eventType });

  switch (eventType) {
    case "payment.captured":
      // Payment successfully captured — safe to fulfil order
      console.log("Payment captured:", {
        paymentId: payload?.payment?.entity?.id,
        orderId: payload?.payment?.entity?.order_id,
        amount: payload?.payment?.entity?.amount,
        method: payload?.payment?.entity?.method, // card/upi/wallet/etc
        timestamp,
      });
      // TODO: Mark order as paid in DB, trigger fulfilment
      break;

    case "payment.failed":
      // Payment failed — do NOT fulfil order
      console.log("Payment failed:", {
        paymentId: payload?.payment?.entity?.id,
        orderId: payload?.payment?.entity?.order_id,
        errorCode: payload?.payment?.entity?.error_code,
        errorDescription: payload?.payment?.entity?.error_description,
        timestamp,
      });
      // TODO: Mark order as failed in DB, notify customer if needed
      break;

    case "refund.processed":
      // §Part I §3 — Refund successfully processed back to customer
      console.log("Refund processed:", {
        refundId: payload?.refund?.entity?.id,
        paymentId: payload?.refund?.entity?.payment_id,
        amount: payload?.refund?.entity?.amount,
        timestamp,
      });
      // TODO: Update order status to refunded in DB
      break;

    case "payment.dispute.created":
      // §Part I §2 — Chargeback/dispute raised — must respond within 3 calendar days
      console.log("CHARGEBACK CREATED — respond within 3 days:", {
        disputeId: payload?.dispute?.entity?.id,
        paymentId: payload?.dispute?.entity?.payment_id,
        amount: payload?.dispute?.entity?.amount,
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp,
      });
      // TODO: Alert merchant immediately, set 3-day SLA reminder
      break;

    default:
      console.log(`Unhandled webhook event: ${eventType}`, { timestamp });
  }

  // Always return 200 to acknowledge receipt
  return res.status(200).json({ received: true });
}
