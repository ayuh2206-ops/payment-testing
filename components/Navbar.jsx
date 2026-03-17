// components/Navbar.jsx — Botanical Glass navbar
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import CartDrawer from '@/components/CartDrawer';

export default function Navbar({ onSearch }) {
  const { count }                   = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch]         = useState('');
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">

          {/* Logo */}
          <Link href="/" className="nav-logo">
            YourStore
          </Link>

          {/* Search */}
          <div className="search-pill">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14" style={{ color: 'var(--text3)', flexShrink: 0 }}>
              <circle cx="7" cy="7" r="5"/><path d="m11 11 3 3"/>
            </svg>
            <input
              placeholder="Search products, brands, categories…"
              value={search}
              onChange={e => { setSearch(e.target.value); if (onSearch) onSearch(e.target.value); }}
            />
            {search && (
              <button className="search-clear" onClick={() => { setSearch(''); if (onSearch) onSearch(''); }}>
                <svg viewBox="0 0 12 12" fill="currentColor" width="10" height="10"><path d="M1 1l10 10M11 1L1 11" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
              </button>
            )}
          </div>

          {/* Right actions */}
          <div className="nav-right">
            <Link href="/admin" className="admin-link">
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15">
                <path d="M9 2a7 7 0 100 14A7 7 0 009 2zm0 0v2.5M9 13.5V16m-7-7h2.5M13.5 9H16M4.4 4.4l1.8 1.8m6.6-1.8-1.8 1.8"/>
              </svg>
              Admin
            </Link>

            <button className="cart-btn" onClick={() => setDrawerOpen(true)} aria-label={`Cart — ${count} items`}>
              <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
                <path d="M6 2L3 6v13a2 2 0 002 2h12a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="19" y2="6"/>
                <path d="M14 10a3 3 0 01-6 0"/>
              </svg>
              {count > 0 && <span className="cart-badge">{count > 9 ? '9+' : count}</span>}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <style jsx>{`
        .nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(9,22,16,0.5);
          backdrop-filter: blur(32px) saturate(160%);
          -webkit-backdrop-filter: blur(32px) saturate(160%);
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s, background 0.3s;
        }
        .nav.scrolled {
          background: rgba(9,22,16,0.82);
          border-bottom-color: rgba(65,72,67,0.25);
        }
        .nav-inner {
          max-width: 1360px; margin: 0 auto;
          padding: 0 28px;
          height: 68px;
          display: flex; align-items: center; gap: 20px;
        }
        .nav-logo {
          font-family: 'Noto Serif', serif;
          font-size: 20px; font-weight: 300;
          font-style: italic;
          color: var(--gold);
          white-space: nowrap;
          letter-spacing: -0.3px;
          flex-shrink: 0;
        }
        .search-pill {
          flex: 1; max-width: 520px;
          display: flex; align-items: center; gap: 10px;
          height: 42px; padding: 0 16px;
          background: rgba(42,56,49,0.5);
          border-radius: 999px;
          border: 1px solid rgba(65,72,67,0.3);
          transition: border-color 0.2s, background 0.2s;
        }
        .search-pill:focus-within {
          border-color: rgba(233,195,73,0.5);
          background: rgba(42,56,49,0.7);
        }
        .search-pill input {
          flex: 1; background: none; border: none; outline: none;
          color: var(--text); font-size: 13.5px;
          font-family: 'Manrope', sans-serif;
        }
        .search-pill input::placeholder { color: var(--text3); }
        .search-clear {
          background: none; border: none; color: var(--text3); padding: 2px;
          display: flex; align-items: center; transition: color 0.15s;
        }
        .search-clear:hover { color: var(--text2); }
        .nav-right {
          display: flex; align-items: center; gap: 10px; margin-left: auto; flex-shrink: 0;
        }
        .admin-link {
          display: flex; align-items: center; gap: 6px;
          padding: 0 14px; height: 38px;
          background: rgba(42,56,49,0.5);
          border: 1px solid rgba(65,72,67,0.35);
          border-radius: 999px;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--text2);
          transition: all 0.2s;
        }
        .admin-link:hover { border-color: var(--gold); color: var(--gold); }
        .cart-btn {
          position: relative;
          width: 42px; height: 42px;
          background: rgba(42,56,49,0.5);
          border: 1px solid rgba(65,72,67,0.35);
          border-radius: 50%;
          color: var(--text2);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; padding: 0;
        }
        .cart-btn:hover { border-color: var(--gold); color: var(--gold); }
        .cart-badge {
          position: absolute; top: -4px; right: -4px;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          color: var(--on-gold);
          font-size: 9px; font-weight: 800;
          min-width: 18px; height: 18px;
          border-radius: 99px;
          display: flex; align-items: center; justify-content: center;
          padding: 0 4px;
          border: 2px solid var(--bg);
        }
      `}</style>
    </>
  );
}
