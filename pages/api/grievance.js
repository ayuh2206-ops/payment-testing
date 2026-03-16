// pages/api/grievance.js
// Receives grievance form submissions and logs them for compliance records.
// In production: replace console.log with email (Nodemailer/SendGrid) + DB write.
// §6.2 — Must respond within 5 business days. Logging here creates the audit trail.

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, phone, orderId, type, message } = req.body;

  if (!name || !email || !type || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const grievanceId = `GRV-${Date.now()}`;
  const timestamp = new Date().toISOString();

  // §2.19 — Log for audit trail (replace with DB insert in production)
  console.log("=== GRIEVANCE RECEIVED ===", {
    grievanceId,
    timestamp,
    name,
    email,
    phone,
    orderId,
    type,
    message,
  });

  // TODO in production:
  // 1. INSERT into your database (grievances table)
  // 2. Send acknowledgement email to customer (confirm receipt within 24hr)
  // 3. Alert your Grievance Officer via email/Slack
  // 4. Track SLA: must respond within 5 business days per Razorpay ToU §6.2

  return res.status(200).json({
    success: true,
    grievanceId,
    message: "Grievance received. You will be contacted within 5 business days.",
  });
}
