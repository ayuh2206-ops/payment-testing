// components/Navbar.jsx
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const { count } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="nav-logo">YourStore</Link>

        <div className="nav-actions">
          <Link href="/orders" className="nav-link">Orders</Link>
          <Link href="/legal/refund-policy" className="nav-link">Returns</Link>
          <button
            className="cart-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label={`Cart — ${count} items`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && <span className="cart-count">{count}</span>}
          </button>
        </div>
      </nav>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <style jsx>{`
        .navbar {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24px;
          height: 60px;
          background: rgba(13,17,23,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-size: 18px; font-weight: 800;
          color: var(--text);
        }
        .nav-actions {
          display: flex; align-items: center; gap: 20px;
        }
        .nav-link {
          font-size: 13px; color: var(--muted);
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--accent); }
        .cart-btn {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 8px 10px;
          color: var(--text);
          cursor: pointer;
          display: flex; align-items: center;
          transition: border-color 0.2s;
        }
        .cart-btn:hover { border-color: var(--accent); }
        .cart-count {
          position: absolute; top: -6px; right: -6px;
          background: var(--accent); color: #000;
          font-size: 10px; font-weight: 800;
          width: 18px; height: 18px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
      `}</style>
    </>
  );
}
