// pages/order-success.jsx — Botanical Glass
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function OrderSuccess() {
  const router = useRouter();
  const { paymentId, orderId } = router.query;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Head><title>Order Confirmed — YourStore</title></Head>
      <div className="page">
        <div className="ambient1" /><div className="ambient2" />

        {/* Minimal nav */}
        <header className="shead">
          <Link href="/" className="logo">YourStore</Link>
        </header>

        <main className="main">
          <div className="card">

            {/* Pulsing check circle — from Stitch order_success screen */}
            <div className="check-wrap">
              <div className="pulse-ring" />
              <div className="check-circle">
                <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                  <path d="M5 14l6 6 12-12"/>
                </svg>
              </div>
            </div>

            <h1 className="headline">Your journey begins here</h1>
            <p className="sub">
              Thank you for your order. Your selection is being curated and prepared for dispatch.
            </p>

            {/* Transaction IDs */}
            {(paymentId || orderId) && (
              <div className="ids">
                {paymentId && (
                  <div className="id-row">
                    <span className="id-label">Payment ID</span>
                    <span className="id-val">{paymentId}</span>
                  </div>
                )}
                {orderId && (
                  <div className="id-row">
                    <span className="id-label">Order Reference</span>
                    <span className="id-val">{orderId}</span>
                  </div>
                )}
                <p className="ids-note">Save these for any returns or queries</p>
              </div>
            )}

            {/* Next steps */}
            <div className="steps">
              <div className="step-item">
                <div className="step-icon">✉</div>
                <div>
                  <p className="step-title">Confirmation sent</p>
                  <p className="step-sub">Check your inbox for order details</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-icon">📦</div>
                <div>
                  <p className="step-title">Preparing for dispatch</p>
                  <p className="step-sub">Ships within 1–2 business days</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-icon">↩</div>
                <div>
                  <p className="step-title">Easy returns</p>
                  <p className="step-sub"><a href="/legal/refund-policy">7-day return window</a> from delivery</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="ctas">
              <Link href="/" className="btn-primary">Continue Shopping</Link>
              <Link href="/legal/grievance" className="btn-secondary">Need help?</Link>
            </div>

          </div>
        </main>
      </div>

      <style jsx>{`
        .page { min-height:100vh; background:var(--bg); position:relative; overflow:hidden; }
        .ambient1 { position:fixed; top:-10%; right:-5%; width:700px; height:700px; background:radial-gradient(circle,rgba(27,77,62,0.2) 0%,transparent 70%); pointer-events:none; z-index:0; }
        .ambient2 { position:fixed; bottom:-10%; left:-5%; width:500px; height:500px; background:radial-gradient(circle,rgba(233,195,73,0.08) 0%,transparent 70%); pointer-events:none; z-index:0; }

        .shead { padding:0 32px; height:64px; display:flex; align-items:center; border-bottom:1px solid rgba(65,72,67,0.2); position:relative; z-index:1; }
        .logo { font-family:'Noto Serif',serif; font-size:18px; font-weight:300; font-style:italic; color:var(--gold); }

        .main { display:flex; align-items:center; justify-content:center; padding:60px 24px 80px; position:relative; z-index:1; }
        .card { width:100%; max-width:600px; background:rgba(42,56,49,0.55); backdrop-filter:blur(28px); border-radius:32px; padding:56px 48px; text-align:center; box-shadow:inset 0 1px 1px rgba(65,72,67,0.3),0 24px 60px rgba(5,17,11,0.4); }
        @media(max-width:600px){ .card { padding:40px 28px; border-radius:24px; } }

        /* Pulsing check */
        .check-wrap { position:relative; width:100px; height:100px; margin:0 auto 32px; display:flex; align-items:center; justify-content:center; }
        .pulse-ring { position:absolute; inset:0; border-radius:50%; border:1px solid rgba(233,195,73,0.35); animation:pulse 2.4s ease-out infinite; }
        @keyframes pulse { 0%{transform:scale(1);opacity:.8} 70%{transform:scale(1.3);opacity:0} 100%{opacity:0} }
        .check-circle { width:80px; height:80px; border-radius:50%; border:1px solid rgba(233,195,73,0.25); background:rgba(233,195,73,0.08); display:flex; align-items:center; justify-content:center; color:var(--gold); }

        .headline { font-family:'Noto Serif',serif; font-size:clamp(24px,5vw,40px); font-weight:300; font-style:italic; letter-spacing:-0.5px; line-height:1.2; margin-bottom:14px; }
        .sub { font-size:14px; color:var(--text2); line-height:1.8; max-width:420px; margin:0 auto 32px; }

        /* IDs block */
        .ids { background:rgba(9,22,16,0.6); border-radius:16px; padding:18px 22px; margin-bottom:32px; text-align:left; box-shadow:inset 0 1px 1px rgba(65,72,67,0.25); }
        .id-row { display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid rgba(65,72,67,0.15); }
        .id-row:last-of-type { border:none; }
        .id-label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:var(--text3); }
        .id-val { font-family:monospace; font-size:12px; color:var(--teal); font-weight:600; }
        .ids-note { font-size:11px; color:var(--text3); margin-top:10px; font-style:italic; }

        /* Steps */
        .steps { display:flex; flex-direction:column; gap:0; margin-bottom:36px; text-align:left; }
        .step-item { display:flex; align-items:center; gap:14px; padding:14px 0; border-bottom:1px solid rgba(65,72,67,0.12); }
        .step-item:last-child { border:none; }
        .step-icon { font-size:20px; width:40px; height:40px; background:rgba(65,72,67,0.3); border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .step-title { font-size:13px; font-weight:600; color:var(--text); margin-bottom:2px; }
        .step-sub { font-size:11.5px; color:var(--text2); }
        .step-sub a { color:var(--teal); text-decoration:underline; text-underline-offset:2px; }

        /* CTAs */
        .ctas { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
        .btn-primary { padding:0 32px; height:52px; background:linear-gradient(135deg,var(--gold),var(--gold-dark)); color:var(--on-gold); border-radius:999px; font-family:'Manrope',sans-serif; font-size:12px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; display:inline-flex; align-items:center; text-decoration:none; box-shadow:0 8px 24px rgba(233,195,73,0.22); transition:transform .2s, box-shadow .2s; }
        .btn-primary:hover { transform:scale(1.03); box-shadow:0 12px 32px rgba(233,195,73,0.32); }
        .btn-secondary { padding:0 28px; height:52px; background:rgba(42,56,49,0.5); border:1px solid rgba(65,72,67,0.4); color:var(--text2); border-radius:999px; font-family:'Manrope',sans-serif; font-size:12px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; display:inline-flex; align-items:center; text-decoration:none; transition:all .2s; }
        .btn-secondary:hover { border-color:rgba(233,195,73,0.3); color:var(--gold); }
      `}</style>
    </>
  );
}
