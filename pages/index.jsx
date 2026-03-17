// pages/index.jsx
// Matches Stitch storefront_catalog/code.html structure exactly:
//
// 1. HERO — min-h-screen, 7/5 col grid, large serif headline, two CTAs, right image panel
//    with floating glass "Editor's Choice" card
// 2. CATALOG — 12-col grid: 3-col sticky sidebar + 9-col product grid
// 3. SIDEBAR — glass panel: Categories (checkboxes), Price Range (slider), Sort pills
// 4. PRODUCT GRID — aspect-square cards, rounded-[2rem] container, rounded-2xl image
// 5. NEWSLETTER — "Seasonal Rituals are Blooming" CTA section (bg-surface-container-lowest)
// 6. FOOTER — 3-col: brand + links + legal (matches Stitch footer exactly)

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useCart } from '@/components/CartContext';

const CATEGORIES = [
  { id: 'audio',      label: 'Audio' },
  { id: 'keyboards',  label: 'Keyboards' },
  { id: 'displays',   label: 'Displays' },
  { id: 'storage',    label: 'Storage' },
  { id: 'cables',     label: 'Cables & Hubs' },
  { id: 'ergonomics', label: 'Ergonomics' },
  { id: 'networking', label: 'Networking' },
  { id: 'cameras',    label: 'Cameras' },
];

// Category gradient backgrounds for product image areas
const CAT_GRADIENT = {
  audio:      'linear-gradient(145deg,#1e0d42,#0d0521)',
  keyboards:  'linear-gradient(145deg,#0d1e42,#050a1f)',
  displays:   'linear-gradient(145deg,#0d3028,#061a14)',
  storage:    'linear-gradient(145deg,#2a1a06,#150d03)',
  cables:     'linear-gradient(145deg,#0f2218,#09110a)',
  ergonomics: 'linear-gradient(145deg,#250a2a,#120514)',
  networking: 'linear-gradient(145deg,#0a1c2a,#050e15)',
  cameras:    'linear-gradient(145deg,#2a0e0e,#160707)',
};

export default function Home() {
  const { addItem }               = useCart();
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [total, setTotal]         = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch]       = useState('');
  const [activeCats, setActiveCats] = useState([]);   // multi-checkbox
  const [maxPrice, setMaxPrice]   = useState(13000);
  const [sort, setSort]           = useState('default');
  const [page, setPage]           = useState(1);
  const [email, setEmail]         = useState('');
  const [notified, setNotified]   = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const category = activeCats.length === 1 ? activeCats[0] : '';
      const qs = new URLSearchParams({ search, category, maxPrice, sort, page, limit: 9 });
      const d  = await fetch(`/api/products?${qs}`).then(r => r.json());
      setProducts(d.products || []);
      setTotal(d.total || 0);
      setTotalPages(d.totalPages || 1);
    } catch { setProducts([]); }
    finally  { setLoading(false); }
  }, [search, activeCats, maxPrice, sort, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, activeCats, maxPrice, sort]);

  function toggleCat(id) {
    setActiveCats(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);
  }

  function pageNums() {
    const a = [], s = Math.max(1, page - 2), e = Math.min(totalPages, page + 2);
    if (s > 1) { a.push(1); if (s > 2) a.push('...'); }
    for (let i = s; i <= e; i++) a.push(i);
    if (e < totalPages) { if (e < totalPages - 1) a.push('...'); a.push(totalPages); }
    return a;
  }

  return (
    <>
      <Head>
        <title>YourStore — Premium Tech Accessories</title>
        <meta name="description" content="Shop 240+ premium tech products. Secure checkout via Razorpay." />
      </Head>

      <div className="page">
        <Navbar onSearch={q => setSearch(q)} />

        {/* ══════════════════════════════════════════════════════════
            HERO SECTION
            Stitch: relative min-h-screen flex items-center pt-24
            bg-gradient-to-br from-surface to-surface-container-lowest
            Grid: 7 col headline + 5 col image
        ══════════════════════════════════════════════════════════ */}
        <header className="hero">
          {/* Ambient glows — from Stitch */}
          <div className="glow-tr" />
          <div className="glow-bl" />

          <div className="hero-inner">
            {/* Left: headline + CTAs — Stitch lg:col-span-7 */}
            <div className="hero-left">
              {/* Eyebrow — from Stitch: text-primary tracking-[0.3em] uppercase text-sm */}
              <span className="hero-eyebrow">✦ Curating Tech Excellence</span>

              {/* Headline — from Stitch: text-7xl font-headline font-light leading-[1.1] */}
              <h1 className="hero-h1">
                The <em>Premium</em><br />Curator
              </h1>

              <p className="hero-p">
                A collection of high-performance tech accessories, engineered for precision and built for the modern creator. Science meeting the soul of design.
              </p>

              {/* CTAs — from Stitch: gold gradient pill + glass ghost pill */}
              <div className="hero-ctas">
                <button className="cta-primary" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
                  Explore Collection
                </button>
                <button className="cta-ghost">Our Story</button>
              </div>
            </div>

            {/* Right: featured product panel — Stitch lg:col-span-5 */}
            <div className="hero-right">
              {/* from Stitch: aspect-[4/5] rounded-[2rem] overflow-hidden */}
              <div className="hero-img-wrap">
                <div className="hero-img-bg">
                  {/* Gradient backdrop simulating a product image */}
                  <div className="hero-img-gradient" />
                  <div className="hero-img-emoji">🎧</div>
                </div>
                {/* Overlay gradient — from Stitch: bg-gradient-to-t from-surface/60 to-transparent */}
                <div className="hero-img-vignette" />
                {/* Floating glass card — from Stitch: absolute bottom-8 left-8 right-8 glass card */}
                <div className="hero-card">
                  <p className="hero-card-label">Editor's Choice</p>
                  <h3 className="hero-card-title">Sony Elite Headphones Pro</h3>
                  <p className="hero-card-sub">40hr battery, ANC, IPX5 — premium audio engineering.</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════
            CATALOG SECTION
            Stitch: py-24 px-12 max-w-[1920px] grid grid-cols-12 gap-12
        ══════════════════════════════════════════════════════════ */}
        <section id="catalog" className="catalog">

          {/* ── SIDEBAR — Stitch: lg:col-span-3 ── */}
          <aside className="sidebar">
            {/* from Stitch: sticky top-32 p-8 rounded-3xl bg-surface-container-low glass-glow */}
            <div className="sidebar-panel">

              {/* Categories — from Stitch: checkboxes */}
              <div className="sb-section">
                <h4 className="sb-heading">Categories</h4>
                <div className="sb-cats">
                  {CATEGORIES.map(c => (
                    <label key={c.id} className="sb-cat-item">
                      <input
                        type="checkbox"
                        checked={activeCats.includes(c.id)}
                        onChange={() => toggleCat(c.id)}
                        className="sb-checkbox"
                      />
                      <span className={`sb-cat-label${activeCats.includes(c.id) ? ' active' : ''}`}>
                        {c.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range — from Stitch: h-1 track with filled portion */}
              <div className="sb-section">
                <h4 className="sb-heading">Price Range</h4>
                <input
                  type="range" min={699} max={13000} step={100}
                  value={maxPrice}
                  onChange={e => setMaxPrice(+e.target.value)}
                  className="sb-range"
                />
                <div className="sb-price-labels">
                  <span>₹699</span>
                  <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Sort — from Stitch: pill buttons like "Skin Concern" chips */}
              <div className="sb-section">
                <h4 className="sb-heading">Sort By</h4>
                <div className="sb-sort-pills">
                  {[
                    { value: 'default',    label: 'Featured' },
                    { value: 'new',        label: 'New' },
                    { value: 'price-asc',  label: 'Price ↑' },
                    { value: 'price-desc', label: 'Price ↓' },
                    { value: 'rating',     label: 'Top Rated' },
                  ].map(o => (
                    <button
                      key={o.value}
                      className={`sb-pill${sort === o.value ? ' active' : ''}`}
                      onClick={() => setSort(o.value)}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear filters */}
              {(activeCats.length > 0 || maxPrice < 13000 || sort !== 'default') && (
                <button className="sb-clear" onClick={() => { setActiveCats([]); setMaxPrice(13000); setSort('default'); }}>
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* ── PRODUCT GRID — Stitch: lg:col-span-9 ── */}
          <main className="grid-area">
            {/* Toolbar — from Stitch: flex justify-between items-center mb-12 */}
            <div className="toolbar">
              <p className="toolbar-count">
                Showing <b>{products.length}</b> of <b>{total.toLocaleString()}</b> products
              </p>
              {/* Sort button — from Stitch: rounded-full glass-glow */}
              <div className="toolbar-right">
                <div className="sort-pill-wrap">
                  <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
                    <option value="default">Sort: Featured</option>
                    <option value="new">New Arrivals</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <svg viewBox="0 0 10 6" fill="currentColor" width="10" height="6" className="sort-arrow"><path d="M0 0l5 6 5-6z"/></svg>
                </div>
              </div>
            </div>

            {/* Grid — from Stitch: grid-cols-2 xl:grid-cols-3 gap-8 */}
            {loading ? (
              <div className="product-grid">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div className="empty">
                <p className="empty-title">No products found</p>
                <p className="empty-sub">Try adjusting your filters</p>
                <button className="ghost-btn" onClick={() => { setSearch(''); setActiveCats([]); setMaxPrice(13000); setSort('default'); }}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {products.map(p => (
                  <ProductCard key={p.id} product={p} onAdd={() => addItem(p)} />
                ))}
              </div>
            )}

            {/* Pagination — from Stitch: w-12 h-12 rounded-full circles */}
            {!loading && totalPages > 1 && (
              <div className="pager">
                <button className="pg-arrow" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M13 4l-6 6 6 6"/></svg>
                </button>
                <div className="pg-nums">
                  {pageNums().map((n, i) =>
                    n === '...'
                      ? <span key={`e${i}`} className="pg-dot">…</span>
                      : <button key={n} className={`pg-num${page === n ? ' on' : ''}`} onClick={() => setPage(n)}>{n}</button>
                  )}
                </div>
                <button className="pg-arrow" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M7 4l6 6-6 6"/></svg>
                </button>
              </div>
            )}
          </main>
        </section>

        {/* ══════════════════════════════════════════════════════════
            NEWSLETTER CTA
            Stitch: py-24 bg-surface-container-lowest
            "Seasonal Rituals are Blooming"
        ══════════════════════════════════════════════════════════ */}
        <section className="newsletter">
          <div className="nl-inner">
            {/* Icon circle — from Stitch: w-24 h-24 rounded-full glass-glow mx-auto mb-8 */}
            <div className="nl-icon">
              <span style={{ fontSize: 36 }}>✦</span>
            </div>
            <h2 className="nl-title">New Arrivals are Landing</h2>
            <p className="nl-sub">
              Our next curated collection is being assembled. Sign up to be notified the moment it drops.
            </p>
            {notified ? (
              <p style={{ color: '#9ed1bd', fontSize: 14, fontWeight: 600 }}>✓ You're on the list!</p>
            ) : (
              <div className="nl-form">
                {/* Input — from Stitch: flex-grow glass-glow rounded-full px-6 py-4 */}
                <input
                  type="email"
                  placeholder="Your essence (email)"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="nl-input"
                />
                {/* Button — from Stitch: bg-primary text-on-primary rounded-full uppercase tracking-widest */}
                <button
                  className="nl-btn"
                  onClick={() => { if (email.includes('@')) setNotified(true); }}
                >
                  Notify
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FOOTER
            Stitch: bg-gradient-to-b from-[#091610] to-[#05110b] py-16 px-12
            3-col: brand | Customer Concierge | Legal
        ══════════════════════════════════════════════════════════ */}
        <footer className="site-footer">
          <div className="footer-inner">
            {/* Col 1: Brand */}
            <div>
              <span className="footer-logo">YourStore</span>
              <p className="footer-tagline">
                Committed to precision engineering and curated quality. Secure payments via Razorpay PCI DSS Level 1.
              </p>
              <div className="footer-social">
                <a href="/legal/terms">Terms</a>
                <a href="/legal/privacy-policy">Privacy</a>
              </div>
            </div>

            {/* Col 2: Customer — from Stitch: "Customer Concierge" */}
            <div>
              <h4 className="footer-col-head">Customer Concierge</h4>
              <ul className="footer-links">
                <li><a href="/legal/refund-policy">Shipping &amp; Returns</a></li>
                <li><a href="/legal/grievance">Grievance Redressal</a></li>
                <li><a href="mailto:support@yourdomain.com">Contact Us</a></li>
              </ul>
            </div>

            {/* Col 3: Legal */}
            <div>
              <h4 className="footer-col-head">Legal</h4>
              <ul className="footer-links">
                <li><a href="/legal/privacy-policy">Privacy Policy</a></li>
                <li><a href="/legal/terms">Terms of Service</a></li>
                <li><a href="/legal/refund-policy">Refund Policy</a></li>
              </ul>
              <p className="footer-copy">
                © {new Date().getFullYear()} YourStore. All rights reserved.<br />
                Payments by Razorpay Software Pvt. Ltd.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        /* ── Base ── */
        .page { display:flex; flex-direction:column; min-height:100vh; }

        /* ══════════════════════════════════
           HERO — matches Stitch exactly
        ══════════════════════════════════ */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          overflow: hidden;
          background: linear-gradient(135deg, #091610 0%, #091610 50%, #05110b 100%);
        }
        /* Ambient glows */
        .glow-tr {
          position: absolute; top: 0; right: 0;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(0,46,34,0.25) 0%, transparent 70%);
          transform: translate(20%,-30%);
          pointer-events: none; z-index: 0;
          filter: blur(60px);
        }
        .glow-bl {
          position: absolute; bottom: 0; left: 0;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(233,195,73,0.07) 0%, transparent 70%);
          transform: translate(-20%,20%);
          pointer-events: none; z-index: 0;
          filter: blur(80px);
        }
        .hero-inner {
          max-width: 1360px; margin: 0 auto;
          padding: 0 48px 80px;
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 60px;
          align-items: center;
          position: relative; z-index: 1;
          width: 100%;
        }
        @media(max-width:900px){
          .hero-inner { grid-template-columns:1fr; padding: 0 24px 60px; }
          .hero-right { display:none; }
        }

        /* Hero left */
        .hero-eyebrow {
          display: block;
          color: #e9c349; font-size: 12px; font-weight: 600;
          letter-spacing: 0.28em; text-transform: uppercase;
          margin-bottom: 20px;
        }
        .hero-h1 {
          font-family: 'Noto Serif', serif;
          font-size: clamp(52px, 7vw, 88px);
          font-weight: 300; line-height: 1.08;
          color: #d7e6dc; letter-spacing: -1.5px;
          margin-bottom: 24px;
        }
        .hero-h1 em {
          color: #e9c349; font-style: italic;
        }
        .hero-p {
          font-size: 17px; color: #c1c8c1; line-height: 1.75;
          max-width: 520px; margin-bottom: 44px; font-weight: 300;
        }
        .hero-ctas { display: flex; gap: 20px; flex-wrap: wrap; }

        /* CTAs — from Stitch */
        .cta-primary {
          background: linear-gradient(135deg, #e9c349 0%, #ad8b0e 100%);
          color: #3c2f00;
          padding: 16px 40px; border-radius: 999px; border: none;
          font-family: 'Manrope', sans-serif;
          font-size: 12px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.14em;
          cursor: pointer;
          box-shadow: 0 12px 32px rgba(233,195,73,0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-primary:hover { transform: scale(1.05); box-shadow: 0 16px 40px rgba(233,195,73,0.35); }

        .cta-ghost {
          padding: 16px 40px; border-radius: 999px;
          background: rgba(42,56,49,0.35);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(65,72,67,0.4);
          color: #d7e6dc;
          font-family: 'Manrope', sans-serif;
          font-size: 12px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.14em;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cta-ghost:hover { background: rgba(42,56,49,0.55); }

        /* Hero right image panel — from Stitch: aspect-[4/5] rounded-[2rem] */
        .hero-right {}
        .hero-img-wrap {
          aspect-ratio: 4/5;
          border-radius: 32px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 32px 80px rgba(5,17,11,0.6);
        }
        .hero-img-bg {
          width: 100%; height: 100%;
          background: linear-gradient(145deg, #1e0d42 0%, #0d0820 50%, #0d2a1a 100%);
          display: flex; align-items: center; justify-content: center;
        }
        .hero-img-emoji { font-size: 120px; filter: drop-shadow(0 16px 48px rgba(0,0,0,0.8)); }
        /* Vignette — from Stitch: bg-gradient-to-t from-surface/60 to-transparent */
        .hero-img-vignette {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(9,22,16,0.7) 0%, transparent 50%);
        }
        /* Floating card — from Stitch: absolute bottom-8 left-8 right-8 glass-card */
        .hero-card {
          position: absolute; bottom: 28px; left: 28px; right: 28px;
          padding: 22px 24px;
          background: rgba(42,56,49,0.65);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(65,72,67,0.3);
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.3);
        }
        .hero-card-label {
          font-family: 'Noto Serif', serif; font-style: italic;
          font-size: 13px; color: #e9c349; margin-bottom: 6px;
        }
        .hero-card-title {
          font-family: 'Noto Serif', serif;
          font-size: 19px; font-weight: 400; color: #d7e6dc;
          margin-bottom: 6px;
        }
        .hero-card-sub { font-size: 12px; color: #c1c8c1; line-height: 1.6; }

        /* ══════════════════════════════════
           CATALOG — from Stitch: py-24 px-12 grid grid-cols-12 gap-12
        ══════════════════════════════════ */
        .catalog {
          padding: 80px 48px;
          max-width: 1360px; margin: 0 auto; width: 100%;
          display: grid;
          grid-template-columns: 3fr 9fr;
          gap: 40px;
          align-items: start;
        }
        @media(max-width:960px){ .catalog { grid-template-columns:1fr; padding:48px 24px; } }

        /* ── SIDEBAR ── from Stitch: sticky top-32 p-8 rounded-3xl glass-glow */
        .sidebar {}
        .sidebar-panel {
          position: sticky; top: 88px;
          padding: 28px;
          border-radius: 24px;
          background: rgba(17,30,24,0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(65,72,67,0.25);
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.2);
          display: flex; flex-direction: column; gap: 32px;
        }
        .sb-section {}
        /* from Stitch: text-sm uppercase tracking-widest text-primary mb-6 */
        .sb-heading {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.15em; color: #e9c349; margin-bottom: 18px;
          font-family: 'Manrope', sans-serif;
        }
        .sb-cats { display: flex; flex-direction: column; gap: 12px; }
        /* Category checkbox row — from Stitch: flex items-center group cursor-pointer */
        .sb-cat-item { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .sb-checkbox {
          width: 15px; height: 15px; accent-color: #e9c349; cursor: pointer;
          border-radius: 3px; flex-shrink: 0;
        }
        .sb-cat-label {
          font-size: 13px; color: #8b938c;
          transition: color 0.15s; font-family: 'Manrope', sans-serif;
        }
        .sb-cat-label.active { color: #d7e6dc; }
        .sb-cat-item:hover .sb-cat-label { color: #d7e6dc; }

        /* Price range */
        .sb-range { width: 100%; accent-color: #e9c349; cursor: pointer; margin-bottom: 8px; }
        .sb-price-labels {
          display: flex; justify-content: space-between;
          font-size: 11px; color: #8b938c; font-family: 'Manrope', sans-serif;
        }

        /* Sort pills — from Stitch: Skin Concern pill chips */
        .sb-sort-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .sb-pill {
          padding: 6px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600; font-family: 'Manrope', sans-serif;
          background: rgba(42,56,49,0.4);
          border: 1px solid rgba(65,72,67,0.3);
          color: #8b938c; cursor: pointer;
          transition: all 0.15s;
        }
        .sb-pill:hover { border-color: rgba(233,195,73,0.3); color: #c1c8c1; }
        /* Active pill — from Stitch: bg-primary text-on-primary */
        .sb-pill.active {
          background: linear-gradient(135deg, #e9c349, #ad8b0e);
          color: #3c2f00; border-color: transparent; font-weight: 700;
        }
        .sb-clear {
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
          color: #ffb4ab; background: none; border: none; cursor: pointer;
          font-family: 'Manrope', sans-serif; padding: 0;
          transition: opacity 0.15s;
        }
        .sb-clear:hover { opacity: 0.75; }

        /* ── GRID AREA ── */
        .grid-area {}
        /* Toolbar — from Stitch: flex justify-between items-center mb-12 */
        .toolbar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 40px; gap: 12px; flex-wrap: wrap;
        }
        .toolbar-count { font-size: 13px; color: #c1c8c1; }
        .toolbar-count b { color: #d7e6dc; font-weight: 700; }
        .toolbar-right {}
        /* Sort — from Stitch: rounded-full glass-glow button with chevron */
        .sort-pill-wrap { position: relative; display: inline-flex; align-items: center; }
        .sort-select {
          height: 40px; padding: 0 36px 0 20px;
          background: rgba(42,56,49,0.5);
          border: 1px solid rgba(65,72,67,0.3);
          border-radius: 999px;
          color: #d7e6dc; font-size: 13px; font-weight: 500;
          outline: none; appearance: none; cursor: pointer;
          font-family: 'Manrope', sans-serif;
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.25);
          transition: border-color 0.2s;
        }
        .sort-select:focus { border-color: rgba(233,195,73,0.4); }
        .sort-arrow {
          position: absolute; right: 14px; color: #8b938c; pointer-events: none;
        }

        /* Product grid — from Stitch: grid-cols-2 xl:grid-cols-3 gap-8 */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        @media(max-width:1200px){ .product-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media(max-width:640px)  { .product-grid { grid-template-columns:minmax(0,1fr); } }

        /* Empty */
        .empty { text-align:center; padding:80px 0; }
        .empty-title { font-family:'Noto Serif',serif; font-size:22px; font-weight:300; font-style:italic; color:#d7e6dc; margin-bottom:8px; }
        .empty-sub { font-size:13px; color:#8b938c; margin-bottom:24px; }
        .ghost-btn { padding:10px 24px; border:1px solid rgba(65,72,67,0.5); border-radius:999px; background:none; color:#c1c8c1; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; cursor:pointer; font-family:'Manrope',sans-serif; transition:all .2s; }
        .ghost-btn:hover { border-color:#e9c349; color:#e9c349; }

        /* Pagination — from Stitch: w-12 h-12 rounded-full circles */
        .pager { display:flex; align-items:center; justify-content:center; gap:10px; margin-top:56px; }
        .pg-arrow { width:48px; height:48px; border-radius:50%; background:rgba(42,56,49,0.55); border:none; color:#c1c8c1; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .2s; box-shadow:inset 0 1px 1px rgba(65,72,67,0.3); }
        .pg-arrow:hover:not(:disabled) { color:#e9c349; }
        .pg-arrow:disabled { opacity:.3; cursor:not-allowed; }
        .pg-nums { display:flex; gap:8px; }
        .pg-num { width:48px; height:48px; border-radius:50%; background:rgba(42,56,49,0.55); border:none; color:#c1c8c1; font-size:13px; font-weight:500; display:flex; align-items:center; justify-content:center; cursor:pointer; font-family:'Manrope',sans-serif; transition:all .2s; }
        .pg-num:hover { color:#d7e6dc; }
        .pg-num.on { background:linear-gradient(135deg,#e9c349,#ad8b0e); color:#3c2f00; font-weight:800; box-shadow:0 4px 16px rgba(233,195,73,0.3); }
        .pg-dot { width:48px; height:48px; display:flex; align-items:center; justify-content:center; font-size:13px; color:#8b938c; }

        /* ══════════════════════════════════
           NEWSLETTER — Stitch: py-24 bg-surface-container-lowest
        ══════════════════════════════════ */
        .newsletter {
          background: #05110b;
          padding: 80px 24px;
          margin-top: 0;
        }
        .nl-inner {
          max-width: 600px; margin: 0 auto; text-align: center;
          padding: 64px 48px;
          border: 1px dashed rgba(65,72,67,0.3);
          border-radius: 48px;
        }
        /* Icon — from Stitch: w-24 h-24 rounded-full glass-glow mx-auto mb-8 */
        .nl-icon {
          width: 88px; height: 88px; border-radius: 50%;
          background: rgba(42,56,49,0.6);
          border: 1px solid rgba(65,72,67,0.3);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 28px; color: #e9c349;
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.3);
        }
        /* Headline — from Stitch: text-3xl font-headline font-light */
        .nl-title {
          font-family: 'Noto Serif', serif;
          font-size: 28px; font-weight: 300; color: #d7e6dc;
          margin-bottom: 14px;
        }
        .nl-sub { font-size: 14px; color: #c1c8c1; line-height: 1.75; margin-bottom: 36px; max-width: 400px; margin-left: auto; margin-right: auto; }
        /* Email form — from Stitch: flex max-w-sm gap-4 */
        .nl-form { display: flex; gap: 14px; max-width: 380px; margin: 0 auto; }
        /* Input — from Stitch: glass-glow rounded-full px-6 py-4 */
        .nl-input {
          flex: 1; padding: 14px 22px;
          background: rgba(17,30,24,0.8);
          border: 1px solid rgba(65,72,67,0.3);
          border-radius: 999px; color: #d7e6dc;
          font-size: 13px; font-family: 'Manrope', sans-serif;
          outline: none; transition: border-color 0.2s;
        }
        .nl-input:focus { border-color: rgba(233,195,73,0.4); }
        .nl-input::placeholder { color: #8b938c; }
        /* Button — from Stitch: bg-primary text-on-primary rounded-full uppercase tracking-widest */
        .nl-btn {
          padding: 14px 28px; border-radius: 999px; border: none;
          background: linear-gradient(135deg, #e9c349, #ad8b0e);
          color: #3c2f00; font-family: 'Manrope', sans-serif;
          font-size: 11px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.14em; cursor: pointer;
          box-shadow: 0 6px 20px rgba(233,195,73,0.25);
          transition: transform 0.2s;
          white-space: nowrap;
        }
        .nl-btn:hover { transform: scale(1.04); }

        /* ══════════════════════════════════
           FOOTER — from Stitch exactly
        ══════════════════════════════════ */
        .site-footer {
          background: linear-gradient(to bottom, #091610, #05110b);
          padding: 64px 48px;
          border-top: 1px solid rgba(65,72,67,0.1);
        }
        .footer-inner {
          max-width: 1360px; margin: 0 auto;
          display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 48px;
        }
        @media(max-width:768px){ .footer-inner { grid-template-columns:1fr; gap:32px; } }
        .footer-logo {
          font-family: 'Noto Serif', serif; font-size: 20px; font-weight: 300;
          font-style: italic; color: #e9c349; display: block; margin-bottom: 14px;
        }
        .footer-tagline { font-size: 13px; color: #c1c8c1; line-height: 1.75; opacity: 0.8; margin-bottom: 18px; max-width: 280px; }
        .footer-social { display: flex; gap: 20px; }
        .footer-social a { font-size: 13px; color: #c1c8c1; transition: color 0.2s; opacity: 0.8; }
        .footer-social a:hover { color: #e9c349; opacity: 1; }
        /* Column heading — from Stitch: text-[#e9c349] uppercase tracking-widest text-xs */
        .footer-col-head {
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.16em; color: #e9c349; margin-bottom: 20px;
          font-family: 'Manrope', sans-serif;
        }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
        .footer-links a { font-size: 13px; color: #c1c8c1; transition: color 0.2s; }
        .footer-links a:hover { color: #e9c349; }
        .footer-copy { font-size: 10px; color: rgba(193,200,193,0.35); line-height: 1.7; padding-top: 20px; border-top: 1px solid rgba(65,72,67,0.1); }
      `}</style>
    </>
  );
}

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div style={{ background:'rgba(17,30,24,0.8)', borderRadius:32, padding:16, boxShadow:'inset 0 1px 1px rgba(65,72,67,0.3)' }}>
      <div style={{ aspectRatio:'1', borderRadius:16, overflow:'hidden', marginBottom:20 }} className="sk" />
      <div style={{ padding:'0 8px' }}>
        <div className="sk" style={{ height:16, width:'72%', borderRadius:8, marginBottom:10 }} />
        <div className="sk" style={{ height:11, width:'50%', borderRadius:8, marginBottom:18 }} />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div className="sk" style={{ height:20, width:'38%', borderRadius:8 }} />
          <div className="sk" style={{ width:48, height:48, borderRadius:'50%' }} />
        </div>
      </div>
      <style jsx>{`.sk{background:linear-gradient(90deg,rgba(42,56,49,.6) 25%,rgba(42,56,49,.9) 50%,rgba(42,56,49,.6) 75%);background-size:200% 100%;animation:sh 1.6s infinite}@keyframes sh{to{background-position:-200% 0}}`}</style>
    </div>
  );
}

/* ── Product Card — matches Stitch storefront_catalog cards ── */
function ProductCard({ product: p, onAdd }) {
  const [added, setAdded] = useState(false);
  const gradient = CAT_GRADIENT[p.category] || 'linear-gradient(145deg,#1a2a20,#0d1a10)';
  const stars    = '★'.repeat(Math.floor(p.rating || 4)) + '☆'.repeat(5 - Math.floor(p.rating || 4));
  const inStock  = (p.stock || 0) > 0;
  const lowStock = inStock && (p.stock || 0) < 10;

  function handleAdd() {
    if (!inStock) return;
    onAdd(); setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    /* from Stitch: group relative bg-surface-container-low rounded-[2rem] p-4 glass-glow
       hover:translate-y-[-8px] transition-all duration-500 */
    <div className="card">
      {/* Image area — from Stitch: aspect-square rounded-2xl overflow-hidden relative mb-6 */}
      <div className="cimg" style={{ background: gradient }}>
        <span className="cemoji">{p.emoji || '📦'}</span>

        {/* New badge — from Stitch: absolute top-4 left-4 gold pill */}
        {p.is_new && inStock && <div className="badge-new">New</div>}

        {/* Low stock bar — from Stitch: absolute bottom-4 error bar */}
        {lowStock && inStock && (
          <div className="badge-low">⚠ Only {p.stock} left in stock</div>
        )}

        {/* Added overlay — from Stitch: inset gold circle check */}
        {added && (
          <div className="added-overlay">
            <div className="added-circle">
              <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5" width="28" height="28">
                <path d="M5 14l6 6 12-12"/>
              </svg>
            </div>
          </div>
        )}

        {/* Out of stock — from Stitch: surface/60 overlay + Sold Out pill */}
        {!inStock && (
          <div className="oos-overlay">
            <span className="sold-out">Sold Out</span>
          </div>
        )}
      </div>

      {/* Body — from Stitch: px-2 */}
      <div className="cbody">
        {/* Name — from Stitch: font-headline text-lg mb-1 */}
        <h3 className="cname">{p.name}</h3>
        {/* Desc — from Stitch: text-on-surface-variant text-sm mb-4 */}
        <p className="cdesc">{p.categoryLabel || p.category}</p>

        <div className="crating">
          <span className="stars">{stars}</span>
          <span className="rcount">{p.rating} · {(p.reviews || 0).toLocaleString()}</span>
        </div>

        <div className="cfoot">
          {/* Price — from Stitch: text-primary font-headline text-xl */}
          <span className={`cprice${!inStock ? ' oos' : ''}`}>
            ₹{(p.price || 0).toLocaleString('en-IN')}
          </span>

          {!inStock ? (
            /* Waitlist — from Stitch: px-6 py-2 rounded-full text-[10px] */
            <button className="waitlist">Notify Me</button>
          ) : added ? (
            <div className="in-cart">
              <span style={{ color:'#e9c349', fontWeight:700 }}>✓</span>
              <span>Added</span>
            </div>
          ) : (
            /* Add — from Stitch: w-12 h-12 rounded-full hover:bg-primary */
            <button className="addbtn" onClick={handleAdd}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                <path d="M8 2v12M2 8h12"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        /* from Stitch: rounded-[2rem] p-4 glass-glow hover:-translate-y-2 duration-500 */
        .card {
          background: rgba(17,30,24,0.85);
          border-radius: 32px; padding: 16px;
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.3);
          transition: transform 0.5s cubic-bezier(0.2,0,0,1), box-shadow 0.5s;
          position: relative;
        }
        .card:hover { transform: translateY(-8px); box-shadow: inset 0 1px 1px rgba(65,72,67,0.3), 0 24px 56px rgba(5,17,11,0.55); }

        /* from Stitch: aspect-square rounded-2xl overflow-hidden relative mb-6 */
        .cimg {
          aspect-ratio: 1/1; border-radius: 16px; overflow: hidden;
          position: relative; margin-bottom: 20px;
          display: flex; align-items: center; justify-content: center;
        }
        .cemoji { font-size: 72px; filter: drop-shadow(0 8px 28px rgba(0,0,0,.7)); transition: transform 0.5s; }
        .card:hover .cemoji { transform: scale(1.1); }

        /* from Stitch: absolute top-4 left-4 bg-primary gold pill */
        .badge-new { position:absolute; top:14px; left:14px; padding:5px 14px; background:linear-gradient(135deg,#e9c349,#ad8b0e); color:#3c2f00; font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.12em; border-radius:999px; }

        /* from Stitch: absolute bottom-4 left-4 right-4 error bg bar */
        .badge-low { position:absolute; bottom:12px; left:12px; right:12px; padding:8px 14px; background:rgba(147,0,10,0.75); backdrop-filter:blur(8px); border-radius:12px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:#ffdad6; }

        /* from Stitch: inset gold circle check overlay */
        .added-overlay { position:absolute; inset:0; background:rgba(233,195,73,0.18); backdrop-filter:blur(2px); display:flex; align-items:center; justify-content:center; }
        .added-circle { width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg,#e9c349,#ad8b0e); color:#3c2f00; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 28px rgba(233,195,73,0.4); }

        /* from Stitch: surface/60 overlay + border pill */
        .oos-overlay { position:absolute; inset:0; background:rgba(9,22,16,0.62); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; }
        .sold-out { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.14em; color:#c1c8c1; border:1px solid rgba(193,200,193,0.3); padding:8px 22px; border-radius:999px; }

        .cbody { padding: 0 8px 8px; }
        /* from Stitch: font-headline text-lg mb-1 */
        .cname { font-family:'Noto Serif',serif; font-size:16px; font-weight:400; line-height:1.35; color:#d7e6dc; margin-bottom:5px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        /* from Stitch: text-on-surface-variant text-sm mb-4 */
        .cdesc { font-size:12px; color:#8b938c; text-transform:uppercase; letter-spacing:.06em; margin-bottom:8px; }
        .crating { font-size:11px; color:#8b938c; margin-bottom:14px; display:flex; align-items:center; gap:4px; }
        .stars { color:#e9c349; letter-spacing:-1px; }
        .rcount { font-size:10px; }
        /* from Stitch: flex justify-between items-center */
        .cfoot { display:flex; align-items:center; justify-content:space-between; }
        /* from Stitch: text-primary font-headline text-xl */
        .cprice { font-family:'Noto Serif',serif; font-size:20px; font-weight:400; color:#e9c349; }
        .cprice.oos { color:#8b938c; }
        /* from Stitch: w-12 h-12 rounded-full hover:bg-primary hover:text-on-primary */
        .addbtn { width:48px; height:48px; border-radius:50%; background:rgba(42,56,49,0.7); border:1px solid rgba(65,72,67,0.4); color:#c1c8c1; display:flex; align-items:center; justify-content:center; cursor:pointer; padding:0; box-shadow:inset 0 1px 1px rgba(65,72,67,0.3); transition:all .25s; }
        .addbtn:hover { background:linear-gradient(135deg,#e9c349,#ad8b0e); border-color:transparent; color:#3c2f00; transform:scale(1.1); }
        .in-cart { display:flex; align-items:center; gap:6px; padding:8px 16px; border-radius:999px; background:rgba(233,195,73,0.1); border:1px solid rgba(233,195,73,0.3); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:#e9c349; }
        .waitlist { padding:8px 18px; border-radius:999px; background:rgba(42,56,49,0.6); border:1px solid rgba(65,72,67,0.4); color:#c1c8c1; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; cursor:pointer; font-family:'Manrope',sans-serif; transition:all .2s; }
        .waitlist:hover { background:rgba(193,200,193,0.1); color:#d7e6dc; }
      `}</style>
    </div>
  );
}
