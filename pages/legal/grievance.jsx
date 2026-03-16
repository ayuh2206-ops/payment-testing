// pages/legal/grievance.jsx
// MANDATORY under Razorpay ToU Part I §6.2:
// "set up a comprehensive customer grievance redressal mechanism"
// "respond within 5 business days"
// "facility for registering complaints over phone, email, or any other electronic means"

import LegalLayout from "@/components/LegalLayout";
import { useState } from "react";

export default function GrievancePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", orderId: "", type: "", message: "" });

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  // In production: wire this to your email/CRM (Nodemailer, SendGrid, etc.)
  // Every grievance MUST be responded to within 5 business days per Razorpay ToU §6.2
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: POST to /api/grievance which emails your Grievance Officer
    setSubmitted(true);
  }

  return (
    <LegalLayout title="Grievance Redressal" lastUpdated="March 2026">

      <div className="highlight-box">
        <strong>Response Commitment:</strong> All grievances are acknowledged within
        24 hours and resolved within <strong>5 business days</strong> as per the
        Payment Aggregator Guidelines issued by the Reserve Bank of India.
      </div>

      <h2>Our Grievance Officer</h2>
      <p>
        As required under the Information Technology Act, 2000 and the Payment Aggregator
        Guidelines, we have designated a Grievance Officer to handle all customer complaints.
      </p>
      <div className="contact-card">
        <strong>Grievance Officer</strong>
        Name: [Full Name of Designated Officer]<br />
        Designation: [e.g., Customer Experience Manager]<br />
        Email: <a href="mailto:grievance@yourdomain.com">grievance@yourdomain.com</a><br />
        Phone: [Your Support Phone Number]<br />
        Address: [Your Full Business Address]<br />
        <br />
        <strong>Working hours:</strong> Monday – Saturday, 10:00 AM – 6:00 PM IST<br />
        <strong>Response time:</strong> Within 5 business days
      </div>

      <h2>What Can You Raise a Grievance About?</h2>
      <ul>
        <li>Payment deducted but order not confirmed</li>
        <li>Refund not received after return</li>
        <li>Wrong or damaged item delivered</li>
        <li>Unauthorized or duplicate charge</li>
        <li>Privacy or data-related concerns</li>
        <li>Any other complaint related to your transaction or our service</li>
      </ul>

      <h2>How to File a Grievance</h2>
      <p>You can reach us through any of the following channels:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:grievance@yourdomain.com">grievance@yourdomain.com</a></li>
        <li><strong>Phone:</strong> [Your Support Number] (Mon–Sat, 10am–6pm IST)</li>
        <li><strong>Online form:</strong> Fill out the form below</li>
      </ul>

      {/* Grievance submission form */}
      {!submitted ? (
        <div className="grievance-form">
          <h2>Submit a Grievance</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px" }}>
            Please provide as much detail as possible so we can resolve your issue quickly.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label>Order ID / Payment ID</label>
                <input name="orderId" value={form.orderId} onChange={handleChange} placeholder="ORD-... or pay_..." />
              </div>
            </div>
            <div className="form-group">
              <label>Grievance Type *</label>
              <select name="type" value={form.type} onChange={handleChange} required>
                <option value="">Select type...</option>
                <option value="payment">Payment Issue</option>
                <option value="refund">Refund Not Received</option>
                <option value="delivery">Delivery / Order Issue</option>
                <option value="privacy">Privacy / Data Concern</option>
                <option value="unauthorized">Unauthorized Charge</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Describe Your Grievance *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Please describe your issue in detail..."
              />
            </div>
            <button type="submit" className="submit-btn">Submit Grievance</button>
          </form>
        </div>
      ) : (
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h3>Grievance Submitted</h3>
          <p>
            We've received your complaint and will respond within <strong>5 business days</strong>.
            A confirmation has been sent to <strong>{form.email}</strong>.
          </p>
          <p style={{ fontSize: "13px", color: "var(--muted)" }}>
            Reference ID: GRV-{Date.now().toString().slice(-8)}
          </p>
        </div>
      )}

      <h2>Escalation</h2>
      <p>
        If your grievance is not resolved within 5 business days or you are unsatisfied
        with the resolution, you may escalate to:
      </p>
      <div className="contact-card">
        <strong>Payment-Related Escalations — Razorpay Nodal Officer</strong>
        Mr. Vijay Thakral, Razorpay Software Private Limited<br />
        Email: <a href="mailto:nodal-officer@razorpay.com">nodal-officer@razorpay.com</a><br />
        Grievances Portal: <a href="https://razorpay.com/grievances/" target="_blank" rel="noreferrer">razorpay.com/grievances</a>
      </div>

      <style jsx>{`
        .grievance-form {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 28px;
          margin: 28px 0;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }
        .form-group label {
          font-size: 12px;
          font-weight: 600;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 14px;
          color: var(--text);
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s;
          outline: none;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--accent);
        }
        .form-group select option { background: #1a1f2e; }
        .submit-btn {
          background: var(--accent);
          color: #000;
          border: none;
          border-radius: 10px;
          padding: 12px 28px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .submit-btn:hover { opacity: 0.85; }
        .success-card {
          background: rgba(0,229,176,0.06);
          border: 1px solid rgba(0,229,176,0.3);
          border-radius: 14px;
          padding: 32px;
          text-align: center;
          margin: 28px 0;
        }
        .success-icon {
          width: 52px; height: 52px;
          background: var(--accent);
          color: #000;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; font-weight: 700;
          margin: 0 auto 16px;
        }
        .success-card h3 {
          font-family: 'Syne', sans-serif;
          color: var(--text);
          margin-bottom: 10px;
        }
      `}</style>
    </LegalLayout>
  );
}
