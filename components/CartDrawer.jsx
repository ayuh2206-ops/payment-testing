// components/CartDrawer.jsx
import { useCart } from "@/components/CartContext";
import Link from "next/link";

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, total } = useCart();

  return (
    <>
      {/* Backdrop */}
      {open && <div className="backdrop" onClick={onClose} />}

      <div className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <button className="continue-btn" onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">₹{item.price.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="item-controls">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>✕</button>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <Link href="/checkout" className="checkout-btn" onClick={onClose}>
              Proceed to Checkout
            </Link>
            <p className="drawer-policy-note">
              By proceeding, you agree to our{" "}
              <a href="/legal/terms" target="_blank">Terms</a> &amp;{" "}
              <a href="/legal/refund-policy" target="_blank">Return Policy</a>.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 200;
        }
        .drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: 380px; max-width: 95vw;
          background: var(--surface);
          border-left: 1px solid var(--border);
          z-index: 201;
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .drawer.open { transform: translateX(0); }
        .drawer-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border);
        }
        .drawer-header h2 {
          font-family: 'Syne', sans-serif;
          font-size: 18px; font-weight: 800;
        }
        .close-btn {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--muted);
          width: 32px; height: 32px;
          cursor: pointer;
          font-size: 14px;
          transition: color 0.2s;
        }
        .close-btn:hover { color: var(--text); }
        .drawer-body { flex: 1; overflow-y: auto; padding: 20px 24px; }
        .empty-cart { text-align: center; padding: 60px 0; color: var(--muted); }
        .continue-btn {
          margin-top: 16px;
          background: var(--accent); color: #000;
          border: none; border-radius: 10px;
          padding: 10px 24px;
          font-weight: 700; cursor: pointer;
        }
        .cart-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
          gap: 12px;
        }
        .item-name { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
        .item-price { font-size: 13px; color: var(--accent); }
        .item-controls {
          display: flex; align-items: center; gap: 8px;
          flex-shrink: 0;
        }
        .item-controls button {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text);
          width: 28px; height: 28px;
          cursor: pointer;
          font-size: 14px;
          transition: border-color 0.2s;
        }
        .item-controls button:hover { border-color: var(--accent); }
        .item-controls span { font-size: 14px; font-weight: 600; min-width: 20px; text-align: center; }
        .remove-btn { color: var(--muted) !important; font-size: 11px !important; }
        .cart-total {
          display: flex; justify-content: space-between;
          font-family: 'Syne', sans-serif;
          font-size: 18px; font-weight: 800;
          padding: 20px 0 0;
        }
        .drawer-footer {
          padding: 20px 24px;
          border-top: 1px solid var(--border);
        }
        .checkout-btn {
          display: block;
          background: var(--accent); color: #000;
          border-radius: 12px; padding: 14px;
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 800;
          text-align: center;
          transition: opacity 0.2s;
        }
        .checkout-btn:hover { opacity: 0.85; }
        .drawer-policy-note {
          margin-top: 10px;
          font-size: 11px; color: var(--muted);
          text-align: center; line-height: 1.6;
        }
        .drawer-policy-note a { color: var(--muted); text-decoration: underline; }
        .drawer-policy-note a:hover { color: var(--accent); }
      `}</style>
    </>
  );
}
