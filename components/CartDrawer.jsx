// components/CartDrawer.jsx — Botanical Glass cart drawer
import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import { useEffect } from 'react';

const CAT_ACCENT = {
  audio:'#1e0d42', keyboards:'#0d1e42', displays:'#0d3028',
  storage:'#2a1a06', cables:'#0d2a14', ergonomics:'#250a2a',
  networking:'#0a1c2a', cameras:'#2a0e0e',
};

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, total } = useCart();

  const itemCount  = items.reduce((s, i) => s + i.qty, 0);
  const gst        = Math.round(total * 0.18);
  const shipping   = total >= 1999 ? 0 : 99;
  const grandTotal = total + gst + shipping;

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Veil */}
      <div className={`veil${open ? ' show' : ''}`} onClick={onClose} />

      {/* Drawer */}
      <aside className={`drawer${open ? ' open' : ''}`}>

        {/* Header */}
        <div className="dhead">
          <div className="dhead-left">
            <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18" style={{ color: 'var(--gold)' }}>
              <path d="M6 2L3 6v13a2 2 0 002 2h12a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="19" y2="6"/>
              <path d="M14 10a3 3 0 01-6 0"/>
            </svg>
            <h2 className="dhead-title">Your Selection</h2>
            {itemCount > 0 && <span className="item-count">{itemCount}</span>}
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
              <path d="M1 1l12 12M13 1L1 13"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="dbody">
          {items.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" width="40" height="40" style={{ color: 'var(--text3)' }}>
                  <path d="M16 20V14a8 8 0 0116 0v6"/>
                  <rect x="8" y="20" width="32" height="24" rx="6"/>
                </svg>
              </div>
              <p className="empty-title">Your collection is empty</p>
              <p className="empty-sub">Discover our curated selection</p>
              <button className="btn-ghost" onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            <div className="items">
              {items.map(item => (
                <CartItem key={item.id} item={item}
                  onRemove={() => removeItem(item.id)}
                  onQty={d => updateQty(item.id, item.qty + d)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="dfooter">
            <div className="price-block">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="price-row">
                <span>GST (18%)</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                {shipping === 0
                  ? <span className="free">Complimentary</span>
                  : <span>₹{shipping}</span>
                }
              </div>
              {shipping > 0 && (
                <p className="free-hint">Add ₹{(1999 - total).toLocaleString('en-IN')} more for free shipping</p>
              )}
              <div className="price-total">
                <span>Total Estimate</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* THE CHECKOUT BUTTON */}
            <Link href="/checkout" className="checkout-btn" onClick={onClose}>
              Proceed to Checkout
            </Link>

            <p className="security-note">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12">
                <path d="M7 1l5 2.5V7c0 3-5 5-5 5S2 10 2 7V3.5L7 1z"/>
              </svg>
              Safe &amp; Secure Encrypted Payment
            </p>
          </div>
        )}
      </aside>

      <style jsx>{`
        .veil {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(5,17,11,0);
          backdrop-filter: blur(0px);
          pointer-events: none;
          transition: background 0.35s, backdrop-filter 0.35s;
        }
        .veil.show {
          background: rgba(5,17,11,0.65);
          backdrop-filter: blur(6px);
          pointer-events: all;
        }
        .drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: 420px; max-width: 100vw; z-index: 201;
          background: rgba(42,56,49,0.60);
          backdrop-filter: blur(28px) saturate(140%);
          -webkit-backdrop-filter: blur(28px) saturate(140%);
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.3), -20px 0 60px rgba(5,17,11,0.5);
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.36s cubic-bezier(0.32,0,0.15,1);
        }
        .drawer.open { transform: translateX(0); }

        /* Header */
        .dhead {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 28px 20px;
          border-bottom: 1px solid rgba(65,72,67,0.2);
          flex-shrink: 0;
        }
        .dhead-left { display: flex; align-items: center; gap: 10px; }
        .dhead-title {
          font-family: 'Noto Serif', serif;
          font-size: 18px; font-weight: 400;
          font-style: italic;
          color: var(--text);
          letter-spacing: -0.2px;
        }
        .item-count {
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          color: var(--on-gold);
          font-size: 10px; font-weight: 800;
          padding: 1px 8px; border-radius: 99px;
        }
        .close-btn {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(65,72,67,0.3); border: none;
          color: var(--text3);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .close-btn:hover { background: rgba(65,72,67,0.5); color: var(--text); }

        /* Body */
        .dbody {
          flex: 1; overflow-y: auto; padding: 8px 0;
        }
        .dbody::-webkit-scrollbar { width: 3px; }
        .dbody::-webkit-scrollbar-thumb { background: rgba(65,72,67,0.4); border-radius: 2px; }

        /* Empty */
        .empty {
          display: flex; flex-direction: column; align-items: center;
          padding: 60px 20px; text-align: center;
        }
        .empty-icon {
          width: 80px; height: 80px;
          background: rgba(42,56,49,0.5);
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.3);
        }
        .empty-title { font-family: 'Noto Serif', serif; font-size: 16px; color: var(--text); margin-bottom: 6px; font-style: italic; }
        .empty-sub { font-size: 13px; color: var(--text2); margin-bottom: 24px; }
        .btn-ghost {
          padding: 9px 24px; border: 1px solid rgba(65,72,67,0.5);
          border-radius: 999px; background: none; color: var(--text2);
          font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; cursor: pointer;
          font-family: 'Manrope', sans-serif;
          transition: all 0.2s;
        }
        .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

        /* Items */
        .items { padding: 4px 0; }

        /* Footer */
        .dfooter {
          padding: 20px 28px 32px;
          border-top: 1px solid rgba(65,72,67,0.2);
          flex-shrink: 0;
        }
        .price-block { margin-bottom: 20px; }
        .price-row {
          display: flex; justify-content: space-between;
          font-size: 13px; color: var(--text2); padding: 5px 0;
        }
        .free {
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--teal);
        }
        .free-hint {
          font-size: 11px; color: var(--text3); text-align: center;
          margin: 6px 0;
          padding: 6px 12px;
          background: rgba(65,72,67,0.2); border-radius: 8px;
        }
        .price-total {
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid rgba(65,72,67,0.2);
          padding-top: 14px; margin-top: 8px;
          font-family: 'Noto Serif', serif;
          font-size: 18px; font-weight: 400; font-style: italic;
          color: var(--text);
        }
        .price-total span:last-child { color: var(--gold); font-weight: 400; }

        /* CHECKOUT BUTTON */
        .checkout-btn {
          display: flex; align-items: center; justify-content: center;
          width: 100%; height: 54px;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
          color: var(--on-gold);
          border-radius: 999px;
          font-family: 'Manrope', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(233,195,73,0.25);
          transition: transform 0.2s, box-shadow 0.2s;
          margin-bottom: 14px;
        }
        .checkout-btn:hover { transform: scale(1.02); box-shadow: 0 14px 36px rgba(233,195,73,0.35); }
        .checkout-btn:active { transform: scale(0.98); }

        .security-note {
          display: flex; align-items: center; justify-content: center;
          gap: 5px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text3);
        }
      `}</style>
    </>
  );
}

/* ── Cart Item ── */
function CartItem({ item, onRemove, onQty }) {
  const bg = CAT_ACCENT[item.category] || '#1a2a20';
  return (
    <div className="ci">
      <div className="ci-img" style={{ background: bg }}>
        <span style={{ fontSize: 26 }}>{item.emoji || '📦'}</span>
      </div>
      <div className="ci-body">
        <div className="ci-top">
          <p className="ci-name">{item.name}</p>
          <button className="ci-rm" onClick={onRemove} aria-label="Remove">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10"><path d="M1 1l10 10M11 1L1 11"/></svg>
          </button>
        </div>
        <div className="ci-bottom">
          <div className="qty">
            <button className="qty-b" onClick={() => onQty(-1)} disabled={item.qty <= 1}>−</button>
            <span className="qty-n">{item.qty}</span>
            <button className="qty-b" onClick={() => onQty(1)}>+</button>
          </div>
          <span className="ci-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
        </div>
      </div>

      <style jsx>{`
        .ci { display:flex; gap:14px; padding:16px 28px; border-bottom:1px solid rgba(65,72,67,0.15); }
        .ci:last-child { border:none; }
        .ci-img { width:60px; height:60px; flex-shrink:0; border-radius:14px; display:flex; align-items:center; justify-content:center; box-shadow:inset 0 1px 1px rgba(65,72,67,0.3); }
        .ci-body { flex:1; min-width:0; display:flex; flex-direction:column; gap:10px; }
        .ci-top { display:flex; align-items:flex-start; justify-content:space-between; gap:8px; }
        .ci-name { font-size:13px; font-weight:500; line-height:1.4; color:var(--text); display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .ci-rm { flex-shrink:0; width:22px; height:22px; background:rgba(65,72,67,0.3); border:none; border-radius:50%; color:var(--text3); cursor:pointer; padding:0; display:flex; align-items:center; justify-content:center; transition:all .2s; }
        .ci-rm:hover { background:rgba(255,180,171,0.2); color:var(--error); }
        .ci-bottom { display:flex; align-items:center; justify-content:space-between; }
        .qty { display:flex; align-items:center; gap:0; background:rgba(65,72,67,0.3); border-radius:999px; padding:2px; }
        .qty-b { width:28px; height:28px; border:none; background:none; color:var(--text2); font-size:16px; cursor:pointer; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:all .15s; font-family:'Manrope',sans-serif; }
        .qty-b:hover:not(:disabled) { background:rgba(233,195,73,0.2); color:var(--gold); }
        .qty-b:disabled { opacity:.3; cursor:not-allowed; }
        .qty-n { font-size:13px; font-weight:600; min-width:26px; text-align:center; color:var(--text); }
        .ci-price { font-family:'Noto Serif',serif; font-size:15px; font-weight:400; color:var(--gold); }
      `}</style>
    </div>
  );
}
