// components/CartDrawer.jsx
// Matches Stitch cart_drawer/code.html exactly:
// - Item layout: w-24 h-32 tall image + flex-col body
// - Qty pill: rounded-full glass backdrop blur
// - Footer: bg-[#111e18]/40 backdrop-blur-3xl
// - Total: font-headline serif
// - Checkout: BUTTON (not Link) w-full py-5 rounded-full gold gradient
// - Security note: text-[10px] uppercase tracking-widest

import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CAT_COLOR = {
  audio:      '#180a30', keyboards:'#0a1830', displays:'#0a2820',
  storage:    '#281a05', cables:   '#0a2015', ergonomics:'#200828',
  networking: '#081828', cameras:  '#280808',
};

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, total } = useCart();
  const router = useRouter();

  const itemCount  = items.reduce((s, i) => s + i.qty, 0);
  const gst        = Math.round(total * 0.18);
  const shipping   = total >= 1999 ? 0 : 99;
  const grandTotal = total + gst + shipping;

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function handleCheckout() {
    onClose();
    router.push('/checkout');
  }

  return (
    <>
      {/* Glass veil overlay — from Stitch: fixed inset-0 bg-surface/40 backdrop-blur-sm */}
      <div
        className={`veil${open ? ' show' : ''}`}
        onClick={onClose}
      />

      {/* Drawer — from Stitch: fixed right-0 top-0 h-full max-w-md glass backdrop */}
      <aside className={`drawer${open ? ' open' : ''}`}>

        {/* Header */}
        <div className="dhead">
          <div className="dhead-left">
            <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5"
              width="20" height="20" style={{ color: '#e9c349', flexShrink: 0 }}>
              <path d="M6 2L3 6v13a2 2 0 002 2h12a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="19" y2="6"/>
              <path d="M14 10a3 3 0 01-6 0"/>
            </svg>
            <h2 className="dhead-title">Your Selection</h2>
            {itemCount > 0 && <span className="count-pill">{itemCount}</span>}
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2"
              width="13" height="13">
              <path d="M1 1l12 12M13 1L1 13"/>
            </svg>
          </button>
        </div>

        {/* Scrollable item list — from Stitch: flex-1 overflow-y-auto px-8 py-6 space-y-8 */}
        <div className="dbody">
          {items.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
                  strokeWidth="1.2" width="44" height="44" style={{ color: '#414843' }}>
                  <path d="M16 20V14a8 8 0 0116 0v6"/>
                  <rect x="8" y="20" width="32" height="24" rx="6"/>
                </svg>
              </div>
              <p className="empty-title">Your collection is empty</p>
              <p className="empty-sub">Discover our curated selection</p>
              <button className="ghost-btn" onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            <div className="items-list">
              {items.map(item => (
                <CartItem key={item.id} item={item}
                  onRemove={() => removeItem(item.id)}
                  onQty={d => updateQty(item.id, item.qty + d)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Summary & Footer — from Stitch: p-8 bg-[#111e18]/40 backdrop-blur-3xl border-t */}
        {items.length > 0 && (
          <div className="dfooter">
            <div className="price-rows">
              <div className="price-row">
                <span className="price-label">Subtotal</span>
                <span className="price-val">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="price-row">
                <span className="price-label">GST (18%)</span>
                <span className="price-val">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="price-row">
                <span className="price-label">Standard Shipping</span>
                <span className="price-val shipping-free">
                  {shipping === 0 ? 'Complimentary' : `₹${shipping}`}
                </span>
              </div>
              {/* Total — from Stitch: text-lg font-headline + text-xl font-headline text-primary */}
              <div className="price-total">
                <span className="total-label">Total Estimate</span>
                <span className="total-val">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/*
              THE CHECKOUT BUTTON — exactly from Stitch cart_drawer/code.html line 211:
              w-full py-5 rounded-full
              bg-gradient-to-br from-[#e9c349] to-[#ad8b0e]
              text-on-primary font-label text-sm font-bold uppercase tracking-[0.2em]
              shadow-[0_10px_30px_rgba(233,195,73,0.2)]
              hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
            */}
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            {/* Security note — from Stitch: text-center mt-6 text-[10px] uppercase tracking-widest */}
            <p className="security-note">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor"
                strokeWidth="1.5" width="12" height="12" style={{ flexShrink: 0 }}>
                <path d="M7 1l5 2.5V7c0 3-5 5-5 5S2 10 2 7V3.5L7 1z"/>
              </svg>
              Safe &amp; Secure Encrypted Payment
            </p>
          </div>
        )}
      </aside>

      <style jsx>{`
        /* Veil */
        .veil {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(9,22,16,0);
          pointer-events: none;
          transition: background 0.35s;
        }
        .veil.show {
          background: rgba(9,22,16,0.65);
          pointer-events: all;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        /* Drawer — from Stitch: fixed right-0 top-0 h-full w-full max-w-md */
        .drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: 100%; max-width: 440px;
          z-index: 201;
          background: rgba(42,56,49,0.62);
          backdrop-filter: blur(28px) saturate(160%);
          -webkit-backdrop-filter: blur(28px) saturate(160%);
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.30),
                      -24px 0 60px rgba(5,17,11,0.55);
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.36s cubic-bezier(0.32,0,0.15,1);
        }
        .drawer.open { transform: translateX(0); }

        /* Header */
        .dhead {
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 32px 20px;
          border-bottom: 1px solid rgba(65,72,67,0.15);
          flex-shrink: 0;
        }
        .dhead-left { display: flex; align-items: center; gap: 10px; }
        .dhead-title {
          font-family: 'Noto Serif', serif;
          font-size: 20px; font-weight: 400; font-style: italic;
          color: #d7e6dc; letter-spacing: -0.2px;
        }
        .count-pill {
          background: linear-gradient(135deg, #e9c349, #ad8b0e);
          color: #3c2f00;
          font-size: 10px; font-weight: 800;
          padding: 1px 9px; border-radius: 99px;
        }
        .close-btn {
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(65,72,67,0.3); border: none;
          color: #8b938c;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; padding: 0;
          transition: background 0.2s, color 0.2s;
        }
        .close-btn:hover { background: rgba(65,72,67,0.5); color: #d7e6dc; }

        /* Body — from Stitch: flex-1 overflow-y-auto px-8 py-6 */
        .dbody {
          flex: 1; overflow-y: auto;
          padding: 24px 32px;
        }
        .dbody::-webkit-scrollbar { width: 3px; }
        .dbody::-webkit-scrollbar-thumb { background: rgba(65,72,67,0.4); border-radius: 2px; }

        /* Empty state */
        .empty {
          display: flex; flex-direction: column; align-items: center;
          padding: 56px 16px; text-align: center;
        }
        .empty-icon {
          width: 80px; height: 80px;
          background: rgba(42,56,49,0.5);
          border-radius: 20px; margin-bottom: 20px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.3);
        }
        .empty-title {
          font-family: 'Noto Serif', serif; font-size: 16px;
          font-style: italic; color: #d7e6dc; margin-bottom: 6px;
        }
        .empty-sub { font-size: 13px; color: #8b938c; margin-bottom: 24px; }
        .ghost-btn {
          padding: 10px 24px; border: 1px solid rgba(65,72,67,0.5);
          border-radius: 999px; background: none; color: #c1c8c1;
          font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; cursor: pointer;
          font-family: 'Manrope', sans-serif; transition: all 0.2s;
        }
        .ghost-btn:hover { border-color: #e9c349; color: #e9c349; }

        .items-list { display: flex; flex-direction: column; gap: 28px; }

        /* Footer — from Stitch: p-8 bg-[#111e18]/40 backdrop-blur-3xl border-t */
        .dfooter {
          padding: 24px 32px 32px;
          background: rgba(17,30,24,0.5);
          backdrop-filter: blur(32px);
          border-top: 1px solid rgba(65,72,67,0.15);
          flex-shrink: 0;
        }

        /* Price rows — from Stitch: space-y-4 mb-8 */
        .price-rows { margin-bottom: 28px; display: flex; flex-direction: column; gap: 14px; }
        .price-row { display: flex; justify-content: space-between; align-items: center; }
        .price-label { font-size: 13px; letter-spacing: 0.02em; color: #c1c8c1; }
        .price-val { font-size: 14px; font-weight: 500; color: #c1c8c1; }
        /* from Stitch: text-[10px] uppercase tracking-widest text-primary */
        .shipping-free {
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.15em; color: #e9c349;
        }
        /* from Stitch: pt-4 flex justify-between items-center */
        .price-total {
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid rgba(65,72,67,0.2); padding-top: 16px; margin-top: 4px;
        }
        /* from Stitch: text-lg font-headline */
        .total-label {
          font-family: 'Noto Serif', serif; font-size: 18px; font-weight: 400;
          font-style: italic; color: #d7e6dc;
        }
        /* from Stitch: text-xl font-headline text-primary */
        .total-val {
          font-family: 'Noto Serif', serif; font-size: 20px; font-weight: 400;
          color: #e9c349;
        }

        /*
          THE CHECKOUT BUTTON — copied exactly from Stitch cart_drawer/code.html:
          w-full py-5 rounded-full bg-gradient-to-br from-[#e9c349] to-[#ad8b0e]
          text-on-primary font-label text-sm font-bold uppercase tracking-[0.2em]
          shadow-[0_10px_30px_rgba(233,195,73,0.2)]
          hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
        */
        .checkout-btn {
          width: 100%;
          padding: 20px 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #e9c349 0%, #ad8b0e 100%);
          color: #3c2f00;
          border: none;
          font-family: 'Manrope', sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          box-shadow: 0 10px 30px rgba(233,195,73,0.2);
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
          display: block;
        }
        .checkout-btn:hover { transform: scale(1.02); box-shadow: 0 14px 36px rgba(233,195,73,0.3); }
        .checkout-btn:active { transform: scale(0.98); }

        /* from Stitch: text-center mt-6 text-[10px] uppercase tracking-widest */
        .security-note {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          margin-top: 18px;
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.14em; color: rgba(193,200,193,0.5);
        }
      `}</style>
    </>
  );
}

/* ── Cart Item — from Stitch: flex gap-6 group with w-24 h-32 image ── */
function CartItem({ item, onRemove, onQty }) {
  const bg = CAT_COLOR[item.category] || '#0d1a10';

  return (
    <div className="ci">
      {/* from Stitch: relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg */}
      <div className="ci-img" style={{ background: bg }}>
        <span className="ci-emoji">{item.emoji || '📦'}</span>
      </div>

      {/* from Stitch: flex flex-col justify-between flex-1 py-1 */}
      <div className="ci-body">
        <div>
          {/* from Stitch: font-headline text-lg leading-tight */}
          <h3 className="ci-name">{item.name}</h3>
          <p className="ci-sub">Qty {item.qty} · ₹{item.price.toLocaleString('en-IN')} each</p>
        </div>
        <div className="ci-foot">
          {/* from Stitch: bg-surface-variant/30 backdrop-blur-md rounded-full px-3 py-1 glass-glow */}
          <div className="qty-pill">
            <button className="qty-btn" onClick={() => onQty(-1)} disabled={item.qty <= 1}>−</button>
            <span className="qty-num">{String(item.qty).padStart(2,'0')}</span>
            <button className="qty-btn" onClick={() => onQty(1)}>+</button>
          </div>
          {/* from Stitch: font-headline text-primary */}
          <span className="ci-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
        </div>
      </div>

      <button className="ci-rm" onClick={onRemove} title="Remove">
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"
          width="10" height="10"><path d="M1 1l10 10M11 1L1 11"/></svg>
      </button>

      <style jsx>{`
        .ci { display: flex; gap: 20px; position: relative; }
        /* w-24 h-32 = 96px × 128px */
        .ci-img {
          width: 96px; height: 128px; flex-shrink: 0;
          border-radius: 12px; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.3);
        }
        .ci-emoji { font-size: 40px; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6)); }
        .ci-body { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 4px 0; }
        .ci-name {
          font-family: 'Noto Serif', serif;
          font-size: 15px; font-weight: 400; line-height: 1.35;
          color: #d7e6dc; margin-bottom: 4px;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .ci-sub { font-size: 11px; color: #8b938c; text-transform: uppercase; letter-spacing: 0.06em; }
        .ci-foot { display: flex; align-items: center; justify-content: space-between; }
        /* from Stitch: rounded-full glass pill qty */
        .qty-pill {
          display: flex; align-items: center; gap: 0;
          background: rgba(42,56,49,0.4);
          backdrop-filter: blur(12px);
          border-radius: 999px;
          padding: 4px 4px;
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.3);
        }
        .qty-btn {
          width: 28px; height: 28px; border-radius: 50%;
          border: none; background: none;
          color: #c1c8c1; font-size: 16px; line-height: 1;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-family: 'Manrope', sans-serif; transition: color 0.15s;
        }
        .qty-btn:hover:not(:disabled) { color: #e9c349; }
        .qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .qty-num {
          font-size: 13px; font-weight: 600; min-width: 28px;
          text-align: center; color: #d7e6dc;
        }
        /* from Stitch: font-headline text-primary */
        .ci-price {
          font-family: 'Noto Serif', serif; font-size: 16px;
          font-weight: 400; color: #e9c349;
        }
        .ci-rm {
          position: absolute; top: 0; right: 0;
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(65,72,67,0.35); border: none;
          color: #8b938c; cursor: pointer; padding: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
        }
        .ci-rm:hover { background: rgba(255,180,171,0.2); color: #ffb4ab; }
      `}</style>
    </div>
  );
}
