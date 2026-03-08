// components/CartDrawer.jsx
import { useCart } from "./CartContext";
import { useRouter } from "next/router";

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, removeItem, totalPaise } = useCart();
  const router = useRouter();

  function goCheckout() {
    onClose();
    router.push("/checkout");
  }

  return (
    <>
      <div className={`cart-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <div className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="drawer-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-emoji">{item.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₹{((item.price * item.qty) / 100).toFixed(2)}</div>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--muted)", fontSize: 12, cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: "auto" }}>
              <div className="cart-total-row">
                <span className="cart-total-label">Total</span>
                <span className="cart-total-val">₹{(totalPaise / 100).toFixed(2)}</span>
              </div>
              <button className="checkout-cta" onClick={goCheckout}>
                🔒 Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
