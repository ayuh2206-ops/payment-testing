// pages/checkout.jsx — Botanical Glass design
import { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

export default function Checkout() {
  const { items, clearCart } = useCart();
  const router               = useRouter();
  const [form, setForm]      = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentErr, setConsentErr] = useState(false);

  const total      = items.reduce((s, i) => s + i.price * i.qty, 0);
  const gst        = Math.round(total * 0.18);
  const shipping   = total >= 1999 ? 0 : 99;
  const grandTotal = total + gst + shipping;

  useEffect(() => { if (items.length === 0) router.replace('/'); }, [items]);

  function validate() {
    const e = {};
    if (!form.name.trim())                          e.name  = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.match(/^[6-9]\d{9}$/))          e.phone = 'Valid 10-digit mobile number';
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function handlePay() {
    if (!validate()) return;
    if (!consent) { setConsentErr(true); document.getElementById('consent-anchor')?.scrollIntoView({ behavior: 'smooth' }); return; }
    setConsentErr(false);
    if (!window.Razorpay) { alert('Payment gateway not loaded. Please refresh.'); return; }
    setLoading(true);
    try {
      const orderRes = await fetch('/api/create-order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, currency: 'INR', customerName: form.name, customerEmail: form.email, customerPhone: form.phone, items }),
      });
      if (!orderRes.ok) throw new Error('Order creation failed');
      const { orderId, orderRef, amount, currency } = await orderRes.json();

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount, currency,
        name: 'YourStore',
        description: `${items.length} item${items.length > 1 ? 's' : ''}`,
        order_id: orderId,
        prefill: { name: form.name, email: form.email, contact: `+91${form.phone}` },
        theme: { color: '#e9c349' },
        modal: { ondismiss: () => setLoading(false) },
        handler: async (response) => {
          try {
            const vRes = await fetch('/api/verify-payment', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...response, customer: form, items, amount: total }),
            });
            if (!vRes.ok) throw new Error('Verification failed');
            const { paymentId } = await vRes.json();
            clearCart();
            router.push(`/order-success?paymentId=${paymentId}&orderId=${orderRef}`);
          } catch {
            alert('Payment received but verification failed. Contact support with Order ID: ' + orderId);
            setLoading(false);
          }
        },
      });
      rzp.on('payment.failed', (r) => { alert(`Payment failed: ${r.error.description}`); setLoading(false); });
      rzp.open();
    } catch (err) {
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  if (!items.length) return null;

  return (
    <>
      <Head><title>Checkout — YourStore</title></Head>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="page">
        <div className="ambient1" /><div className="ambient2" />

        {/* Nav */}
        <header className="chead">
          <Link href="/" className="logo">YourStore</Link>
          <div className="steps">
            <span className="step active">
              <span className="step-n">1</span> Details
            </span>
            <span className="step-line" />
            <span className="step">
              <span className="step-n">2</span> Payment
            </span>
            <span className="step-line" />
            <span className="step">
              <span className="step-n">3</span> Confirm
            </span>
          </div>
        </header>

        <main className="main">
          <div className="grid">

            {/* ── Left: Form ── */}
            <div className="left">
              <div className="section-label">
                <span className="section-num">1</span>
                <h2>Delivery Details</h2>
              </div>

              <div className="fields">
                <Field label="Full Name" error={errors.name}>
                  <input
                    className={`input-minimal${errors.name ? ' err' : ''}`}
                    placeholder="As on your ID"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </Field>
                <Field label="Email Address" error={errors.email}>
                  <input
                    type="email"
                    className={`input-minimal${errors.email ? ' err' : ''}`}
                    placeholder="For order confirmation"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </Field>
                <Field label="Mobile Number (10 digits)" error={errors.phone}>
                  <input
                    type="tel"
                    className={`input-minimal${errors.phone ? ' err' : ''}`}
                    placeholder="9XXXXXXXXX"
                    value={form.phone}
                    maxLength={10}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                  />
                </Field>
              </div>

              {/* Consent */}
              <div id="consent-anchor" className={`consent${consentErr ? ' consent-err' : ''}`}>
                <label className="consent-label">
                  <div className={`cbox${consent ? ' checked' : ''}`} onClick={() => { setConsent(c => !c); setConsentErr(false); }}>
                    {consent && (
                      <svg viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="2.5" width="10" height="8">
                        <path d="M1 4l3 3 5-6"/>
                      </svg>
                    )}
                  </div>
                  <span>
                    I agree to the{' '}
                    <a href="/legal/terms" target="_blank">Terms of Use</a>,{' '}
                    <a href="/legal/privacy-policy" target="_blank">Privacy Policy</a> and{' '}
                    <a href="/legal/refund-policy" target="_blank">Refund Policy</a>.
                    I consent to my name, email and phone being shared with{' '}
                    <strong>Razorpay Software Pvt. Ltd.</strong> for payment processing and regulatory compliance.
                  </span>
                </label>
                {consentErr && (
                  <p className="consent-err-msg">
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><circle cx="7" cy="7" r="6"/><path d="M7 4v3M7 10h.01"/></svg>
                    Please accept the terms to proceed
                  </p>
                )}
              </div>

              {/* Security note */}
              <div className="security">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13">
                  <path d="M7 1l5 2.5V7c0 3-5 5-5 5S2 10 2 7V3.5L7 1z"/>
                </svg>
                <span>Your card details are entered directly into Razorpay's PCI DSS Level 1 certified gateway. We never store your card number, CVV, or UPI PIN.</span>
              </div>
            </div>

            {/* ── Right: Order summary ── */}
            <div className="right">
              <div className="summary-card">
                <h3 className="summary-title">Order Summary</h3>

                <div className="items-list">
                  {items.map(item => (
                    <div key={item.id} className="item-row">
                      <div className="item-info">
                        <span className="item-emoji">{item.emoji || '📦'}</span>
                        <div>
                          <p className="item-name">{item.name}</p>
                          <p className="item-qty">Qty {item.qty}</p>
                        </div>
                      </div>
                      <span className="item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="price-row">
                    <span>GST (18%)</span><span>₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="price-row">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'free' : ''}>
                      {shipping === 0 ? 'Complimentary' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="price-total">
                    <span>Total</span>
                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  className={`pay-btn${!consent ? ' blocked' : ''}`}
                  onClick={handlePay}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner" />
                  ) : (
                    <>
                      <span>Pay ₹{grandTotal.toLocaleString('en-IN')}</span>
                      <span className="pay-method">Cards · UPI · Wallets</span>
                    </>
                  )}
                </button>

                <div className="summary-links">
                  <a href="/legal/refund-policy" target="_blank">7-day returns</a>
                  <span>·</span>
                  <a href="/legal/terms" target="_blank">Terms</a>
                  <span>·</span>
                  <a href="/legal/grievance" target="_blank">Grievances</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .page { min-height:100vh; background:var(--bg); position:relative; overflow-x:hidden; }
        .ambient1 { position:fixed; top:-15%; right:-5%; width:600px; height:600px; background:radial-gradient(circle,rgba(27,77,62,0.18) 0%,transparent 70%); pointer-events:none; z-index:0; }
        .ambient2 { position:fixed; bottom:-10%; left:-5%; width:400px; height:400px; background:radial-gradient(circle,rgba(233,195,73,0.07) 0%,transparent 70%); pointer-events:none; z-index:0; }

        /* Header */
        .chead { position:sticky; top:0; z-index:50; background:rgba(9,22,16,0.85); backdrop-filter:blur(24px); border-bottom:1px solid rgba(65,72,67,0.2); padding:0 32px; height:64px; display:flex; align-items:center; justify-content:space-between; }
        .logo { font-family:'Noto Serif',serif; font-size:18px; font-weight:300; font-style:italic; color:var(--gold); }
        .steps { display:flex; align-items:center; gap:0; }
        .step { display:flex; align-items:center; gap:8px; font-size:12px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--text3); }
        .step.active { color:var(--gold); }
        .step-n { width:24px; height:24px; border-radius:50%; border:1px solid currentColor; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; }
        .step.active .step-n { background:linear-gradient(135deg,var(--gold),var(--gold-dark)); border-color:transparent; color:var(--on-gold); }
        .step-line { width:40px; height:1px; background:rgba(65,72,67,0.4); margin:0 12px; }

        /* Main */
        .main { max-width:1200px; margin:0 auto; padding:48px 32px 80px; position:relative; z-index:1; }
        .grid { display:grid; grid-template-columns:1fr 420px; gap:40px; align-items:start; }
        @media(max-width:900px){.grid{grid-template-columns:1fr}}

        /* Section label */
        .section-label { display:flex; align-items:center; gap:14px; margin-bottom:32px; }
        .section-num { width:32px; height:32px; border-radius:50%; background:rgba(233,195,73,0.12); border:1px solid rgba(233,195,73,0.3); color:var(--gold); font-size:13px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .section-label h2 { font-family:'Noto Serif',serif; font-size:22px; font-weight:300; font-style:italic; letter-spacing:-.2px; }
        .fields { display:flex; flex-direction:column; gap:0; margin-bottom:28px; }
        :global(.input-minimal.err) { border-bottom-color:var(--error) !important; }

        /* Consent */
        .consent { margin-bottom:24px; padding:18px 20px; background:rgba(42,56,49,0.4); border-radius:16px; box-shadow:inset 0 1px 1px rgba(65,72,67,0.25); transition:background .2s; }
        .consent.consent-err { background:rgba(255,180,171,0.08); box-shadow:inset 0 0 0 1px rgba(255,180,171,0.3); }
        .consent-label { display:flex; align-items:flex-start; gap:12px; cursor:default; font-size:12.5px; color:var(--text2); line-height:1.7; }
        .cbox { width:18px; height:18px; border-radius:5px; border:1.5px solid rgba(65,72,67,0.6); flex-shrink:0; margin-top:2px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .15s; }
        .cbox.checked { background:linear-gradient(135deg,var(--gold),var(--gold-dark)); border-color:transparent; color:var(--on-gold); }
        .consent-label a { color:var(--teal); text-decoration:underline; text-underline-offset:2px; }
        .consent-label strong { color:var(--text); }
        .consent-err-msg { display:flex; align-items:center; gap:6px; font-size:11px; color:var(--error); margin-top:10px; font-weight:600; }

        /* Security */
        .security { display:flex; gap:10px; align-items:flex-start; font-size:11.5px; color:var(--text3); line-height:1.6; padding:14px 18px; background:rgba(32,45,38,0.5); border-radius:12px; box-shadow:inset 0 1px 1px rgba(65,72,67,0.2); }
        .security svg { flex-shrink:0; margin-top:2px; color:var(--text3); }

        /* Summary card */
        .summary-card { background:rgba(42,56,49,0.55); backdrop-filter:blur(24px); border-radius:24px; padding:28px; box-shadow:inset 0 1px 1px rgba(65,72,67,0.3),0 20px 48px rgba(5,17,11,0.3); position:sticky; top:88px; }
        .summary-title { font-family:'Noto Serif',serif; font-size:18px; font-weight:300; font-style:italic; margin-bottom:20px; letter-spacing:-.2px; }
        .items-list { margin-bottom:20px; }
        .item-row { display:flex; align-items:center; justify-content:space-between; padding:11px 0; border-bottom:1px solid rgba(65,72,67,0.15); }
        .item-row:last-child { border:none; }
        .item-info { display:flex; align-items:center; gap:10px; }
        .item-emoji { font-size:22px; }
        .item-name { font-size:12.5px; font-weight:500; color:var(--text); }
        .item-qty { font-size:11px; color:var(--text3); margin-top:1px; }
        .item-price { font-family:'Noto Serif',serif; font-size:14px; color:var(--gold); }
        .price-breakdown { padding-top:4px; }
        .price-row { display:flex; justify-content:space-between; font-size:12.5px; color:var(--text2); padding:5px 0; }
        .free { color:var(--teal); font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; }
        .price-total { display:flex; justify-content:space-between; font-family:'Noto Serif',serif; font-size:20px; font-weight:300; color:var(--text); border-top:1px solid rgba(65,72,67,0.2); padding-top:14px; margin-top:8px; }
        .price-total span:last-child { color:var(--gold); }

        /* Pay button */
        .pay-btn { width:100%; height:56px; margin-top:20px; background:linear-gradient(135deg,var(--gold) 0%,var(--gold-dark) 100%); color:var(--on-gold); border:none; border-radius:999px; font-family:'Manrope',sans-serif; font-size:12px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; box-shadow:0 10px 28px rgba(233,195,73,0.25); transition:transform .2s, box-shadow .2s, opacity .2s; }
        .pay-btn:hover:not(:disabled) { transform:scale(1.02); box-shadow:0 14px 36px rgba(233,195,73,0.35); }
        .pay-btn:active { transform:scale(0.99); }
        .pay-btn.blocked { opacity:.35; cursor:not-allowed; }
        .pay-btn:disabled { cursor:not-allowed; opacity:.6; }
        .pay-method { font-size:9px; font-weight:500; letter-spacing:.12em; opacity:.65; text-transform:uppercase; }
        .spinner { width:20px; height:20px; border:2px solid rgba(60,47,0,0.25); border-top-color:var(--on-gold); border-radius:50%; animation:spin .7s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }

        .summary-links { display:flex; justify-content:center; gap:8px; margin-top:14px; font-size:11px; color:var(--text3); }
        .summary-links a { color:var(--text3); text-decoration:underline; text-underline-offset:2px; transition:color .15s; }
        .summary-links a:hover { color:var(--teal); }
      `}</style>
    </>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: error ? 'var(--error)' : 'var(--text3)', marginBottom: 6 }}>
        {label}
      </div>
      {children}
      {error && (
        <p style={{ fontSize: 11, color: 'var(--error)', marginTop: 5, fontWeight: 500 }}>{error}</p>
      )}
    </div>
  );
}
