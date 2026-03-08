// pages/checkout.jsx
import { useState, useRef } from "react";
import Script from "next/script";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPaise, clearCart } = useCart();
  const router = useRouter();

  // Form state
  const [form, setForm] = useState({ name: "", email: "", phone: "", cardName: "" });
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("card");
  const [status, setStatus] = useState("idle"); // idle | processing | success | failed
  const [errMsg, setErrMsg] = useState("");
  const [procStep, setProcStep] = useState(0);  // 0-4
  const razorpayReady = useRef(false);

  const TAX_RATE  = 0.18;
  const subtotal  = totalPaise;
  const tax       = Math.round(subtotal * TAX_RATE);
  const grandTotal = subtotal + tax;

  // ── Validation ─────────────────────────────────────────────────
  function validate() {
    const e = {};
    if (!form.name.trim())               e.name  = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone))    e.phone = "10-digit mobile number required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Simulate processing steps animation ────────────────────────
  function runSteps() {
    return new Promise((resolve) => {
      let step = 0;
      const iv = setInterval(() => {
        step++;
        setProcStep(step);
        if (step >= 4) { clearInterval(iv); resolve(); }
      }, 600);
    });
  }

  // ── Main payment handler ────────────────────────────────────────
  async function handlePay() {
    if (!validate()) return;
    if (!razorpayReady.current) {
      setErrMsg("Razorpay SDK not loaded yet. Please wait a moment.");
      return;
    }
    if (items.length === 0) {
      router.push("/");
      return;
    }

    setStatus("processing");
    setProcStep(0);
    setErrMsg("");

    try {
      // STEP 1 — Create order server-side
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount:  grandTotal,
          receipt: `rcpt_${Date.now()}`,
          notes: { customer_name: form.name, customer_email: form.email },
        }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error(order.error);

      // STEP 2 — Open Razorpay popup
      const options = {
        key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:      order.amount,
        currency:    order.currency,
        name:        "SecurePay Store",
        description: `${items.length} item${items.length > 1 ? "s" : ""}`,
        order_id:    order.id,
        prefill: {
          name:    form.name,
          email:   form.email,
          contact: form.phone,
        },
        theme:  { color: "#00e5b0" },
        modal: {
          ondismiss: () => setStatus("idle"),
        },

        // STEP 3 — After user pays, verify server-side
        handler: async function (response) {
          await runSteps();

          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id:  response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const result = await verifyRes.json();

          if (result.success) {
            clearCart();
            router.push(`/order-success?payment_id=${result.payment_id}&order_id=${result.order_id}`);
          } else {
            throw new Error(result.error || "Verification failed.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp) => {
        setErrMsg(resp.error.description || "Payment failed. Please try again.");
        setStatus("failed");
      });
      rzp.open();

    } catch (err) {
      console.error(err);
      setErrMsg(err.message || "Something went wrong. Please try again.");
      setStatus("failed");
    }
  }

  if (items.length === 0 && status !== "processing") {
    return (
      <div className="page-wrap" style={{ padding: "80px 20px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, marginBottom: 12 }}>Your cart is empty</h2>
        <Link href="/" className="back-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", padding: "12px 24px", borderRadius: 12, fontSize: 14 }}>
          ← Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => { razorpayReady.current = true; }}
      />

      <div className="checkout-page page-wrap">
        <h1>Secure Checkout</h1>

        <div className="checkout-layout">

          {/* ── LEFT: Customer info + pay button ── */}
          <div className="payment-panel" style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -1, left: 30, right: 30, height: 2, background: "linear-gradient(90deg,transparent,var(--accent),var(--accent2),transparent)", borderRadius: 2 }} />

            {/* Payment method tabs */}
            <div className="tabs">
              {[
                { id: "card",   label: "Card",      icon: "💳" },
                { id: "upi",    label: "UPI / GPay", icon: "📲" },
                { id: "wallet", label: "Wallet",     icon: "👛" },
              ].map((t) => (
                <button
                  key={t.id}
                  className={`tab ${activeTab === t.id ? "active" : ""}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            {/* Status alerts */}
            {status === "failed" && errMsg && (
              <div className="alert error">❌ {errMsg}</div>
            )}

            {/* Customer details (shared across all tabs) */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>
                Your Details
              </div>

              <div className="form-row">
                <label>Full Name</label>
                <input
                  type="text" placeholder="Alex Morgan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={errors.name ? "error-field" : ""}
                />
                {errors.name && <div className="field-err show">⚠ {errors.name}</div>}
              </div>

              <div className="form-2col">
                <div>
                  <label>Email</label>
                  <input
                    type="text" placeholder="alex@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={errors.email ? "error-field" : ""}
                  />
                  {errors.email && <div className="field-err show">⚠ {errors.email}</div>}
                </div>
                <div>
                  <label>Phone</label>
                  <input
                    type="text" placeholder="9876543210" maxLength={10}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                    className={errors.phone ? "error-field" : ""}
                  />
                  {errors.phone && <div className="field-err show">⚠ {errors.phone}</div>}
                </div>
              </div>
            </div>

            {/* Tab-specific UI */}
            {activeTab === "card" && (
              <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, marginBottom: 20, fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
                🔒 Your card details are entered securely inside the Razorpay popup — we never see or store your card number.
              </div>
            )}
            {activeTab === "upi" && (
              <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, marginBottom: 20, fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
                📲 A Razorpay UPI popup will appear after clicking pay. Supports Google Pay, PhonePe, Paytm, and all UPI apps.
              </div>
            )}
            {activeTab === "wallet" && (
              <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, marginBottom: 20, fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
                👛 Paytm, Amazon Pay, Mobikwik, Freecharge, and more — all available in the Razorpay checkout.
              </div>
            )}

            {/* Pay button */}
            <button
              className="pay-btn"
              onClick={handlePay}
              disabled={status === "processing"}
            >
              <div className="shimmer" />
              {status === "processing" ? (
                <>
                  <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#041a12", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Processing…
                </>
              ) : (
                <>🔒 Pay ₹{(grandTotal / 100).toFixed(2)} Securely</>
              )}
            </button>

            {/* Processing steps overlay */}
            {status === "processing" && procStep > 0 && (
              <div style={{ marginTop: 20 }}>
                <div className="proc-steps">
                  {["Encrypting your data", "Contacting payment network", "Running fraud checks", "Authorising transaction"].map((s, i) => (
                    <div key={i} className={`proc-step ${procStep > i ? "done" : procStep === i ? "active" : ""}`}>
                      <div className="step-dot">{procStep > i ? "✓" : i + 1}</div>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Order summary ── */}
          <div className="order-panel">
            <div className="panel-title">Order Summary</div>

            {items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-item-emoji">{item.emoji}</div>
                <div className="order-item-info">
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-sub">Qty: {item.qty}</div>
                </div>
                <div className="order-item-price">₹{((item.price * item.qty) / 100).toFixed(0)}</div>
              </div>
            ))}

            <div className="divider" />
            <div className="line"><span>Subtotal</span><span>₹{(subtotal / 100).toFixed(2)}</span></div>
            <div className="line"><span>Shipping</span><span style={{ color: "var(--accent)" }}>Free</span></div>
            <div className="line"><span>GST (18%)</span><span>₹{(tax / 100).toFixed(2)}</span></div>
            <div className="divider" />
            <div className="line total"><span>Total</span><span>₹{(grandTotal / 100).toFixed(2)}</span></div>

            <div className="security-row">
              {[
                { icon: "🛡️", label: "SSL Secured" },
                { icon: "🔐", label: "256-bit Encrypted" },
                { icon: "✅", label: "PCI DSS Level 1" },
              ].map((b) => (
                <div key={b.label} className="sec-badge">
                  <span>{b.icon}</span> {b.label}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20 }}>
              <Link href="/" style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                ← Continue shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
