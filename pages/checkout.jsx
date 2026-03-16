// pages/checkout.jsx
//
// COMPLIANCE MAP (Razorpay ToU):
// §2.16  — Explicit customer consent checkbox before payment (BLOCKING — cannot pay without it)
// §6.1(iii)(iv) — We NEVER store card/payment data; Razorpay handles it exclusively
// §6.1(b) — Policy links shown in footer and in consent text
// §2.19  — Payment ID logged server-side for 10-year record retention
// §6.2   — Grievance link present in footer
//
import { useState, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { useCart } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Checkout() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // §2.16 — REQUIRED: Explicit informed consent before payment
  // Must NOT be pre-checked. Must be an affirmative action by the customer.
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  // Redirect to home if cart is empty
  useEffect(() => {
    if (items.length === 0) router.replace("/");
  }, [items]);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = "Valid 10-digit Indian mobile number required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handlePay() {
    // Validate form
    if (!validate()) return;

    // §2.16 — BLOCK payment if consent not given
    if (!consentGiven) {
      setConsentError(true);
      document.getElementById("consent-section").scrollIntoView({ behavior: "smooth" });
      return;
    }
    setConsentError(false);

    if (!window.Razorpay) {
      alert("Payment gateway not loaded. Please refresh and try again.");
      return;
    }

    setLoading(true);
    try {
      // Server sets amount — client cannot tamper with price
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          // Pass customer info for Razorpay prefill
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
        }),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");
      const { orderId, amount, currency } = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "[Your Business Name]",
        description: `Order – ${items.length} item(s)`,
        order_id: orderId,
        // §6.1(iii)(iv) — Razorpay Standard Checkout handles all card data
        // We never receive or store card numbers, CVV, or UPI PINs
        prefill: {
          name: form.name,
          email: form.email,
          contact: `+91${form.phone}`,
        },
        config: {
          display: {
            blocks: {
              banks: { name: "Pay via UPI / Cards / Wallets", instruments: [
                { method: "upi" },
                { method: "card" },
                { method: "wallet" },
                { method: "netbanking" },
              ]},
            },
            sequence: ["block.banks"],
            preferences: { show_default_blocks: false },
          },
        },
        theme: { color: "#00E5B0" },
        modal: {
          ondismiss: () => setLoading(false),
          escape: true,
          animation: true,
        },
        handler: async function (response) {
          // response contains: razorpay_payment_id, razorpay_order_id, razorpay_signature
          // §2.19 — These IDs must be stored server-side for 10-year record retention
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                // Pass customer info for server-side order record
                customer: form,
                items,
                amount: total,
              }),
            });

            if (!verifyRes.ok) throw new Error("Payment verification failed");
            const { paymentId } = await verifyRes.json();

            clearCart();
            router.push(`/order-success?paymentId=${paymentId}&orderId=${orderId}`);
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment received but verification failed. Please contact support with your Order ID: " + orderId);
            setLoading(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description}. Please try again.`);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (items.length === 0) return null;

  return (
    <>
      <Head>
        <title>Checkout | YourStore</title>
      </Head>

      {/* §checkout timing fix — load after interactive, not lazyOnload */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="page-wrap">
        <Navbar />

        <main className="checkout-page">
          <div className="checkout-container">

            {/* ── LEFT: Customer Details ── */}
            <div className="checkout-left">
              <h2 className="section-title">Delivery Details</h2>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="As on your ID"
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="err">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="For order confirmation"
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="err">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Mobile Number * <small>(10 digits, no country code)</small></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                  placeholder="9XXXXXXXXX"
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="err">{errors.phone}</span>}
              </div>

              {/* ─────────────────────────────────────────────────────────
                  COMPLIANCE SECTION — Razorpay ToU §2.16
                  Explicit informed consent REQUIRED before payment.
                  Cannot be pre-checked. Must be a deliberate user action.
                  Payment button is blocked until this is checked.
              ───────────────────────────────────────────────────────── */}
              <div
                id="consent-section"
                className={`consent-block ${consentError ? "consent-error" : ""}`}
              >
                <label className="consent-label">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={e => {
                      setConsentGiven(e.target.checked);
                      if (e.target.checked) setConsentError(false);
                    }}
                  />
                  <span>
                    I have read and agree to the{" "}
                    <a href="/legal/terms" target="_blank">Terms of Use</a>,{" "}
                    <a href="/legal/privacy-policy" target="_blank">Privacy Policy</a>, and{" "}
                    <a href="/legal/refund-policy" target="_blank">Refund Policy</a>.
                    I consent to my name, email, and phone number being shared with{" "}
                    <strong>Razorpay Software Pvt. Ltd.</strong> and its affiliated financial
                    institutions for payment processing, fraud prevention, and regulatory
                    compliance as required under applicable RBI guidelines.
                  </span>
                </label>
                {consentError && (
                  <p className="consent-err-msg">
                    ⚠ You must accept the terms to proceed with payment.
                  </p>
                )}
              </div>

              {/* Security note — reassures customer, consistent with §6.1(iii)(iv) */}
              <div className="security-note">
                <span>🔒</span>
                <span>
                  Your card details are entered directly into Razorpay's secure,
                  PCI DSS Level 1 certified gateway. We never see or store your
                  card number, CVV, or UPI PIN.
                </span>
              </div>
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="checkout-right">
              <h2 className="section-title">Order Summary</h2>

              <div className="order-items">
                {items.map(item => (
                  <div key={item.id} className="order-item">
                    <div>
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Qty: {item.qty}</p>
                    </div>
                    <p className="item-price">₹{(item.price * item.qty).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <button
                className={`pay-btn ${loading ? "loading" : ""} ${!consentGiven ? "disabled" : ""}`}
                onClick={handlePay}
                disabled={loading}
                title={!consentGiven ? "Please accept the terms above to continue" : ""}
              >
                {loading ? (
                  <span className="spinner" />
                ) : (
                  <>
                    <span>Pay ₹{total.toLocaleString("en-IN")}</span>
                    <span className="pay-sub">via Razorpay · Cards / UPI / Wallets</span>
                  </>
                )}
              </button>

              {/* Policy links in summary — reinforces visibility per §6.1(b) */}
              <div className="summary-policies">
                <a href="/legal/refund-policy" target="_blank">7-day returns</a>
                <span>·</span>
                <a href="/legal/terms" target="_blank">T&amp;C</a>
                <span>·</span>
                <a href="/legal/grievance" target="_blank">Grievances</a>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>

      <style jsx>{`
        .page-wrap { display: flex; flex-direction: column; min-height: 100vh; }
        .checkout-page {
          flex: 1;
          padding: 40px 24px 80px;
          position: relative; z-index: 1;
        }
        .checkout-container {
          max-width: 980px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 800px) {
          .checkout-container { grid-template-columns: 1fr; }
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 24px;
          letter-spacing: -0.5px;
        }
        .form-group {
          display: flex; flex-direction: column; gap: 6px;
          margin-bottom: 18px;
        }
        .form-group label {
          font-size: 12px; font-weight: 600;
          color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px;
        }
        .form-group small { font-weight: 400; text-transform: none; }
        .form-group input {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 16px;
          color: var(--text);
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-group input:focus { border-color: var(--accent); }
        .form-group input.error { border-color: #ff4d4d; }
        .err { font-size: 12px; color: #ff4d4d; }

        /* Consent block */
        .consent-block {
          background: rgba(0,229,176,0.04);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px 18px;
          margin: 24px 0 20px;
          transition: border-color 0.2s;
        }
        .consent-block.consent-error {
          border-color: #ff4d4d;
          background: rgba(255,77,77,0.05);
        }
        .consent-label {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          cursor: pointer;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
        }
        .consent-label input[type="checkbox"] {
          margin-top: 3px;
          flex-shrink: 0;
          width: 16px; height: 16px;
          accent-color: var(--accent);
          cursor: pointer;
        }
        .consent-label a { color: var(--accent); text-decoration: underline; }
        .consent-err-msg {
          margin-top: 10px;
          font-size: 12px;
          color: #ff4d4d;
          font-weight: 600;
        }

        .security-note {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 12px;
          color: var(--muted);
          line-height: 1.6;
          padding: 12px 16px;
          background: var(--surface);
          border-radius: 10px;
        }

        /* Right panel */
        .checkout-right {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
          position: sticky;
          top: 24px;
        }
        .order-items { margin-bottom: 20px; }
        .order-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }
        .item-name { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
        .item-qty { font-size: 12px; color: var(--muted); }
        .item-price { font-size: 15px; font-weight: 700; color: var(--accent); }
        .order-total {
          display: flex;
          justify-content: space-between;
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          padding: 16px 0;
          border-top: 2px solid var(--border);
          margin-bottom: 20px;
        }

        .pay-btn {
          width: 100%;
          background: var(--accent);
          color: #000;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          transition: opacity 0.2s, transform 0.1s;
        }
        .pay-btn:hover:not(.disabled):not(.loading) {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .pay-btn.disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .pay-sub { font-size: 11px; font-weight: 500; opacity: 0.7; }
        .pay-btn.loading { pointer-events: none; opacity: 0.6; }
        .spinner {
          width: 22px; height: 22px;
          border: 3px solid rgba(0,0,0,0.2);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .summary-policies {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 14px;
          font-size: 12px;
          color: var(--muted);
        }
        .summary-policies a { color: var(--muted); text-decoration: underline; }
        .summary-policies a:hover { color: var(--accent); }
      `}</style>
    </>
  );
}
