// pages/order-success.jsx
// §2.19 — Transaction records must be retained for 10 years.
// Displaying the Payment ID gives customers their reference for disputes/refunds.
// Server-side verify-payment.js must also log this to your database/records.

import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrderSuccess() {
  const router = useRouter();
  const { paymentId, orderId } = router.query;

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Head>
        <title>Order Confirmed | YourStore</title>
      </Head>
      <div className="page-wrap">
        <Navbar />

        <main className="success-page">
          <div className="success-card">
            <div className="checkmark">✓</div>
            <h1>Payment Successful!</h1>
            <p className="sub">Your order has been placed and confirmed.</p>

            {/* §2.19 — Display IDs so customer has their transaction reference */}
            {paymentId && (
              <div className="ids-block">
                <div className="id-row">
                  <span className="id-label">Payment ID</span>
                  <span className="id-value">{paymentId}</span>
                </div>
                {orderId && (
                  <div className="id-row">
                    <span className="id-label">Order ID</span>
                    <span className="id-value">{orderId}</span>
                  </div>
                )}
                <p className="id-note">
                  Save these IDs. You'll need them for any refund or dispute queries.
                </p>
              </div>
            )}

            <div className="next-steps">
              <p>✉ A confirmation email has been sent to your registered email address.</p>
              <p>
                📦 Your order will be processed and dispatched within 1–2 business days.
              </p>
              <p>
                ↩ Need to return something? See our{" "}
                <a href="/legal/refund-policy">Refund &amp; Return Policy</a> (7-day window).
              </p>
            </div>

            {/* Grievance link — §6.2 must be accessible */}
            <div className="support-note">
              <p>
                Having an issue with your order?{" "}
                <a href="/legal/grievance">File a grievance</a> or email{" "}
                <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
                We respond within 5 business days.
              </p>
            </div>

            <Link href="/" className="back-btn">Continue Shopping</Link>
          </div>
        </main>

        <Footer />
      </div>

      <style jsx>{`
        .page-wrap { display: flex; flex-direction: column; min-height: 100vh; }
        .success-page {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          position: relative; z-index: 1;
        }
        .success-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 48px 40px;
          max-width: 520px;
          width: 100%;
          text-align: center;
        }
        .checkmark {
          width: 72px; height: 72px;
          background: var(--accent);
          color: #000;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 32px; font-weight: 800;
          margin: 0 auto 24px;
        }
        h1 {
          font-family: 'Syne', sans-serif;
          font-size: 28px; font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }
        .sub { color: var(--muted); font-size: 15px; margin-bottom: 28px; }

        .ids-block {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px 20px;
          margin-bottom: 28px;
          text-align: left;
        }
        .id-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
        }
        .id-row:last-of-type { border-bottom: none; }
        .id-label { font-size: 12px; color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .id-value { font-size: 13px; font-family: monospace; color: var(--accent); font-weight: 600; }
        .id-note { font-size: 12px; color: var(--muted); margin-top: 12px; line-height: 1.5; }

        .next-steps {
          text-align: left;
          margin-bottom: 24px;
        }
        .next-steps p {
          font-size: 14px;
          color: #8892a4;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          line-height: 1.6;
        }
        .next-steps p:last-child { border-bottom: none; }
        .next-steps a { color: var(--accent); text-decoration: underline; }

        .support-note {
          background: rgba(0,229,176,0.05);
          border: 1px solid rgba(0,229,176,0.15);
          border-radius: 10px;
          padding: 14px 18px;
          margin-bottom: 28px;
        }
        .support-note p { font-size: 13px; color: var(--muted); line-height: 1.6; }
        .support-note a { color: var(--accent); text-decoration: underline; }

        .back-btn {
          display: inline-block;
          background: var(--accent);
          color: #000;
          border-radius: 12px;
          padding: 14px 32px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          transition: opacity 0.2s;
          text-decoration: none;
        }
        .back-btn:hover { opacity: 0.85; }
      `}</style>
    </>
  );
}
