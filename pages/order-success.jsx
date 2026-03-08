// pages/order-success.jsx
import { useRouter } from "next/router";
import Link from "next/link";

export default function OrderSuccess() {
  const { query } = useRouter();
  const { payment_id, order_id } = query;

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon-wrap">✓</div>
        <h1>Payment Confirmed!</h1>
        <p>
          Your order has been placed and is being prepared.<br />
          A confirmation has been sent to your email.
        </p>

        {payment_id && (
          <div className="txn-pill">
            Payment ID: <span>{payment_id}</span>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          <Link href="/" className="back-btn" style={{ justifyContent: "center" }}>
            ← Continue Shopping
          </Link>
        </div>

        <div style={{ marginTop: 24, padding: "16px", background: "var(--surface2)", borderRadius: 12, fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
          🔐 Transaction secured by Razorpay · PCI DSS Level 1 · All data encrypted
        </div>
      </div>
    </div>
  );
}
