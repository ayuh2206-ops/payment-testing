// components/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '@/components/CartContext';
import CartDrawer from '@/components/CartDrawer';

export default function Navbar({ onSearch }) {
  const { count }                   = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch]         = useState('');
  const [scrolled, setScrolled]     = useState(false);
  const router                      = useRouter();
  const inputRef                    = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (onSearch) onSearch(search);
  }

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <span className="logo-dot" />
            YourStore
          </Link>

          {/* Search */}
          <form className="nav-search" onSubmit={handleSearch}>
            <svg className="search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="9" r="6"/><path d="m14 14 4 4"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products, brands, categories…"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
            />
            {search && (
              <button type="button" className="search-clear" onClick={() => { setSearch(''); if (onSearch) onSearch(''); }}>
                <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
                  <path d="M8 6.586L2.707 1.293 1.293 2.707 6.586 8l-5.293 5.293 1.414 1.414L8 9.414l5.293 5.293 1.414-1.414L9.414 8l5.293-5.293-1.414-1.414L8 6.586z"/>
                </svg>
              </button>
            )}
          </form>

          {/* Actions */}
          <div className="nav-actions">
            <Link href="/admin" className="admin-btn" title="Admin panel">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="16" height="16">
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 0v3m0 11v-3M2 10h3m11 0h-3M4.222 4.222l2.121 2.121m7.07 7.07l2.122 2.122M4.222 15.778l2.121-2.121m7.07-7.07l2.122-2.122"/>
              </svg>
              Admin
            </Link>

            <button className="cart-btn" onClick={() => setDrawerOpen(true)} aria-label={`Cart — ${count} items`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && <span className="cart-badge">{count > 9 ? '9+' : count}</span>}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <style jsx>{`
        .navbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(9,9,15,0.7);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s, background 0.2s;
        }
        .navbar.scrolled {
          background: rgba(9,9,15,0.92);
          border-bottom-color: var(--border);
        }
        .nav-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.3px;
          white-space: nowrap;
          color: var(--text);
        }
        .logo-dot {
          width: 8px; height: 8px;
          background: var(--accent);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .nav-search {
          flex: 1;
          position: relative;
          max-width: 560px;
        }
        .nav-search input {
          width: 100%;
          height: 40px;
          padding: 0 36px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 999px;
          color: var(--text);
          font-size: 13.5px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .nav-search input:focus {
          border-color: var(--accent);
          background: var(--surface);
        }
        .nav-search input::placeholder { color: var(--text3); }
        .search-icon {
          position: absolute;
          left: 12px; top: 50%;
          transform: translateY(-50%);
          width: 16px; height: 16px;
          color: var(--text3);
          pointer-events: none;
        }
        .search-clear {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          background: var(--surface);
          border: none;
          border-radius: 50%;
          width: 20px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          color: var(--text2);
          padding: 0;
          transition: color 0.15s;
        }
        .search-clear:hover { color: var(--text); }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }
        .admin-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 14px;
          height: 36px;
          background: var(--surface2);
          border: 1px solid var(--border2);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text2);
          transition: all 0.15s;
          white-space: nowrap;
        }
        .admin-btn:hover {
          background: var(--surface);
          color: var(--accent2);
          border-color: var(--accent);
        }
        .cart-btn {
          position: relative;
          width: 40px; height: 40px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
          padding: 0;
        }
        .cart-btn:hover {
          background: var(--surface);
          border-color: var(--border2);
        }
        .cart-badge {
          position: absolute;
          top: -5px; right: -5px;
          background: var(--accent);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          min-width: 18px; height: 18px;
          border-radius: 99px;
          display: flex; align-items: center; justify-content: center;
          padding: 0 4px;
          border: 2px solid var(--bg);
        }
        @media (max-width: 640px) {
          .nav-inner { gap: 12px; padding: 0 16px; }
          .admin-btn span { display: none; }
        }
      `}</style>
    </>
  );
}
