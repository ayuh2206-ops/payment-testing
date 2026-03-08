// pages/index.jsx
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import Link from "next/link";

const PRODUCTS = [
  { id: "prod_1", name: "Premium Sneakers X1",     emoji: "👟", price: 14900, badge: "Bestseller",  desc: "Lightweight design, superior cushioning for all-day comfort." },
  { id: "prod_2", name: "Wireless ANC Headphones", emoji: "🎧", price: 8900,  badge: "New",         desc: "40hr battery, active noise cancellation, studio-grade audio." },
  { id: "prod_3", name: "Smart Watch Pro",          emoji: "⌚", price: 21000, badge: "Hot",         desc: "Health tracking, GPS, 5-day battery in a sleek 44mm case." },
  { id: "prod_4", name: "Mechanical Keyboard",      emoji: "⌨️", price: 6500,  badge: "Popular",     desc: "Tactile brown switches, full RGB, aluminium frame." },
  { id: "prod_5", name: "4K Webcam Ultra",          emoji: "📷", price: 11200, badge: "Top Rated",   desc: "4K 30fps, auto-framing, built-in ring light. Plug and play." },
  { id: "prod_6", name: "Portable SSD 1TB",         emoji: "💾", price: 5800,  badge: "Sale",        desc: "1050MB/s read speed, military-grade shock protection." },
];

export default function Home() {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState({});

  function handleAdd(product) {
    addItem(product);
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1500);
  }

  return (
    <main>
      {/* Hero */}
      <div className="hero page-wrap">
        <div className="hero-eyebrow">
          <div className="dot" /> Powered by Razorpay · 100% Secure Checkout
        </div>
        <h1>Products you love,<br />payments that <em>never fail</em></h1>
        <p>Every transaction is encrypted, verified, and confirmed in under 1.2 seconds.</p>
      </div>

      {/* Products */}
      <div className="products-section page-wrap">
        <div className="section-label">Featured Products</div>
        <div className="products-grid">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-img" style={{ background: "var(--surface2)" }}>
                {product.badge && <div className="product-badge">{product.badge}</div>}
                <span>{product.emoji}</span>
              </div>
              <div className="product-body">
                <div className="product-name">{product.name}</div>
                <div className="product-desc">{product.desc}</div>
                <div className="product-footer">
                  <div className="product-price">
                    ₹{(product.price / 100).toFixed(0)}<small>incl. GST</small>
                  </div>
                  <button
                    className={`add-btn ${added[product.id] ? "added" : ""}`}
                    onClick={() => handleAdd(product)}
                  >
                    {added[product.id] ? "✓ Added" : "+ Add"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust strip */}
      <div className="page-wrap" style={{ paddingBottom: 60, position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { icon: "🛡️", title: "Zero Fraud Liability",     desc: "ML-powered fraud scoring on every transaction" },
            { icon: "⚡", title: "Sub-second Processing",    desc: "Multi-gateway routing for maximum reliability" },
            { icon: "🔄", title: "Smart Retry Logic",        desc: "Auto-retry via alternate routes — no dead ends" },
            { icon: "🔐", title: "End-to-End Encrypted",     desc: "256-bit AES · PCI DSS Level 1 Certified" },
          ].map((f) => (
            <div key={f.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 18px" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
