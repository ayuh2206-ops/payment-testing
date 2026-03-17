// pages/index.jsx
// Product cards match Stitch storefront_catalog/code.html exactly:
// - Container: bg-surface-container-low rounded-[2rem] p-4 glass-glow hover:-translate-y-2
// - Image area: aspect-square rounded-2xl overflow-hidden (SQUARE ratio)
// - New badge: absolute top-4 left-4 gold pill
// - Add button: w-12 h-12 rounded-full circle, hover gold fill
// - Name: font-headline (Noto Serif) text-lg
// - Description: text-sm text-on-surface-variant
// - Price: text-primary font-headline text-xl (gold)
// - Low stock: bottom bar inside image
// - Out of stock: overlay + "Sold Out" pill
// - Added: gold circle check overlay

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartContext';

const CATEGORIES = [
  { id: '',           label: 'All' },
  { id: 'audio',      label: 'Audio' },
  { id: 'keyboards',  label: 'Keyboards' },
  { id: 'displays',   label: 'Displays' },
  { id: 'storage',    label: 'Storage' },
  { id: 'cables',     label: 'Cables & Hubs' },
  { id: 'ergonomics', label: 'Ergonomics' },
  { id: 'networking', label: 'Networking' },
  { id: 'cameras',    label: 'Cameras' },
];

// Rich color gradients per category — used as the "product image" background
// Matches Stitch's image backgrounds using dark tonal palettes
const CAT_GRADIENT = {
  audio:      'linear-gradient(145deg, #1e0d42 0%, #0d0521 100%)',
  keyboards:  'linear-gradient(145deg, #0d1e42 0%, #050a1f 100%)',
  displays:   'linear-gradient(145deg, #0d3028 0%, #061a14 100%)',
  storage:    'linear-gradient(145deg, #2a1a06 0%, #150d03 100%)',
  cables:     'linear-gradient(145deg, #0f2218 0%, #09110a 100%)',
  ergonomics: 'linear-gradient(145deg, #250a2a 0%, #120514 100%)',
  networking: 'linear-gradient(145deg, #0a1c2a 0%, #050e15 100%)',
  cameras:    'linear-gradient(145deg, #2a0e0e 0%, #160707 100%)',
};

export default function Home() {
  const { addItem }             = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [total, setTotal]       = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(13000);
  const [sort, setSort]         = useState('default');
  const [page, setPage]         = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ search, category, maxPrice, sort, page, limit: 24 });
      const d  = await fetch(`/api/products?${qs}`).then(r => r.json());
      setProducts(d.products || []);
      setTotal(d.total || 0);
      setTotalPages(d.totalPages || 1);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  }, [search, category, maxPrice, sort, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, category, maxPrice, sort]);

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
      </Head>
      <div className="shell">
        <Navbar onSearch={q => setSearch(q)} />

        {/* Category rail — from Stitch sidebar as horizontal tabs */}
        <nav className="catrail">
          <div className="catrail-inner">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`ctab${category === c.id ? ' on' : ''}`}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="main">
          <div className="container">

            {/* Toolbar — from Stitch: flex justify-between items-center mb-12 */}
            <div className="toolbar">
              <p className="tcount">
                {!loading && (
                  <>Showing <b>{products.length}</b> of <b>{total.toLocaleString()}</b> products</>
                )}
              </p>
              <div className="tright">
                {/* Price range */}
                <label className="price-ctrl">
                  Up to <b>₹{maxPrice.toLocaleString('en-IN')}</b>
                  <input
                    type="range" min={699} max={13000} step={100}
                    value={maxPrice}
                    onChange={e => setMaxPrice(+e.target.value)}
                  />
                </label>
                {/* Sort — from Stitch: rounded-full glass-glow button */}
                <div className="sort-pill">
                  <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="default">Sort: Featured</option>
                    <option value="new">New Arrivals</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <svg viewBox="0 0 10 6" fill="currentColor" width="10" height="6"
                    style={{ position:'absolute', right:14, pointerEvents:'none', color:'#8b938c' }}>
                    <path d="M0 0l5 6 5-6z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Grid — from Stitch: grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 */}
            {loading ? (
              <div className="grid">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div className="empty">
                <p className="empty-title">No products found</p>
                <p className="empty-sub">Try adjusting your filters or search</p>
                <button className="ghost-btn" onClick={() => {
                  setSearch(''); setCategory(''); setMaxPrice(13000); setSort('default');
                }}>Clear filters</button>
              </div>
            ) : (
              <div className="grid">
                {products.map(p => (
                  <ProductCard key={p.id} product={p} onAdd={() => addItem(p)} />
                ))}
              </div>
            )}

            {/* Pagination — from Stitch: w-12 h-12 rounded-full circles */}
            {!loading && totalPages > 1 && (
              <div className="pager">
                <button className="pg-arrow" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                    <path d="M13 4l-6 6 6 6"/>
                  </svg>
                </button>
                <div className="pg-nums">
                  {pageNums().map((n, i) =>
                    n === '...'
                      ? <span key={`e${i}`} className="pg-dot">…</span>
                      : <button key={n} className={`pg-num${page === n ? ' on' : ''}`} onClick={() => setPage(n)}>{n}</button>
                  )}
                </div>
                <button className="pg-arrow" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                    <path d="M7 4l6 6-6 6"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>

      <style jsx>{`
        .shell { display: flex; flex-direction: column; min-height: 100vh; }

        /* Category rail */
        .catrail {
          border-bottom: 1px solid rgba(65,72,67,0.2);
          background: rgba(17,30,24,0.7);
          backdrop-filter: blur(8px);
        }
        .catrail-inner {
          max-width: 1360px; margin: 0 auto; padding: 0 28px;
          display: flex; gap: 0; overflow-x: auto; scrollbar-width: none;
        }
        .catrail-inner::-webkit-scrollbar { display: none; }
        .ctab {
          padding: 13px 18px; border: none; background: none;
          font-size: 13px; font-weight: 500; color: #8b938c;
          white-space: nowrap;
          border-bottom: 2px solid transparent; margin-bottom: -1px;
          transition: color .15s, border-color .15s; cursor: pointer;
          font-family: 'Manrope', sans-serif;
        }
        .ctab:hover { color: #c1c8c1; }
        .ctab.on { color: #e9c349; border-bottom-color: #e9c349; }

        /* Main */
        .main { flex: 1; padding: 40px 28px 80px; }
        .container { max-width: 1360px; margin: 0 auto; }

        /* Toolbar */
        .toolbar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 40px; gap: 12px; flex-wrap: wrap;
        }
        .tcount { font-size: 13px; color: #c1c8c1; }
        .tcount b { color: #d7e6dc; font-weight: 700; }
        .tright { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .price-ctrl {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; color: #c1c8c1; white-space: nowrap;
        }
        .price-ctrl b { color: #d7e6dc; }
        input[type=range] { width: 80px; accent-color: #e9c349; cursor: pointer; }
        /* from Stitch: rounded-full glass-glow px-6 py-2 */
        .sort-pill {
          position: relative; display: flex; align-items: center;
        }
        .sort-pill select {
          height: 40px; padding: 0 36px 0 18px;
          background: rgba(42,56,49,0.5);
          border: 1px solid rgba(65,72,67,0.3);
          border-radius: 999px;
          color: #d7e6dc; font-size: 13px; font-weight: 500;
          outline: none; appearance: none; cursor: pointer;
          font-family: 'Manrope', sans-serif;
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.25);
          transition: border-color .2s;
        }
        .sort-pill select:focus { border-color: rgba(233,195,73,0.4); }

        /* Product grid — from Stitch: grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 */
        .grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
        }
        @media (max-width: 1060px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px)  { .grid { grid-template-columns: minmax(0, 1fr); } }

        /* Empty */
        .empty { text-align: center; padding: 80px 20px; }
        .empty-title {
          font-family: 'Noto Serif', serif; font-size: 24px;
          font-weight: 300; font-style: italic; color: #d7e6dc; margin-bottom: 10px;
        }
        .empty-sub { font-size: 14px; color: #8b938c; margin-bottom: 24px; }
        .ghost-btn {
          padding: 12px 28px; border: 1px solid rgba(65,72,67,0.5);
          border-radius: 999px; background: none; color: #c1c8c1;
          font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          cursor: pointer; font-family: 'Manrope', sans-serif; transition: all .2s;
        }
        .ghost-btn:hover { border-color: #e9c349; color: #e9c349; }

        /* Pagination — from Stitch: w-12 h-12 rounded-full circles */
        .pager {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; margin-top: 60px;
        }
        .pg-arrow {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(42,56,49,0.5);
          border: 1px solid rgba(65,72,67,0.3);
          color: #c1c8c1;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all .2s;
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.25);
        }
        .pg-arrow:hover:not(:disabled) { color: #e9c349; border-color: rgba(233,195,73,0.4); }
        .pg-arrow:disabled { opacity: .3; cursor: not-allowed; }
        .pg-nums { display: flex; gap: 8px; }
        .pg-num {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(42,56,49,0.5);
          border: 1px solid rgba(65,72,67,0.3);
          color: #c1c8c1; font-size: 13px; font-weight: 500;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all .2s;
          font-family: 'Manrope', sans-serif;
        }
        .pg-num:hover { color: #d7e6dc; }
        .pg-num.on {
          background: linear-gradient(135deg, #e9c349, #ad8b0e);
          color: #3c2f00; border-color: transparent; font-weight: 700;
        }
        .pg-dot {
          width: 48px; height: 48px; display: flex;
          align-items: center; justify-content: center;
          font-size: 13px; color: #8b938c;
        }
      `}</style>
    </>
  );
}

/* ── Skeleton ── */
function SkeletonCard() {
  return (
    <div style={{ background:'rgba(32,45,38,0.6)', borderRadius:32, padding:16,
      boxShadow:'inset 0 1px 1px rgba(65,72,67,0.3)' }}>
      <div style={{ aspectRatio:'1', borderRadius:16, overflow:'hidden', marginBottom:20 }}
        className="sk" />
      <div style={{ padding:'0 8px' }}>
        <div className="sk" style={{ height:14, width:'70%', borderRadius:8, marginBottom:8 }} />
        <div className="sk" style={{ height:11, width:'50%', borderRadius:8, marginBottom:16 }} />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div className="sk" style={{ height:20, width:'35%', borderRadius:8 }} />
          <div className="sk" style={{ width:48, height:48, borderRadius:'50%' }} />
        </div>
      </div>
      <style jsx>{`
        .sk {
          background: linear-gradient(90deg,
            rgba(42,56,49,.6) 25%, rgba(42,56,49,.9) 50%, rgba(42,56,49,.6) 75%);
          background-size: 200% 100%;
          animation: sh 1.6s infinite;
        }
        @keyframes sh { to { background-position: -200% 0; } }
      `}</style>
    </div>
  );
}

/* ── Product Card — matches Stitch storefront_catalog exactly ── */
function ProductCard({ product: p, onAdd }) {
  const [added, setAdded] = useState(false);

  const gradient = CAT_GRADIENT[p.category] || 'linear-gradient(145deg,#1a2a20,#0d1a10)';
  const stars    = '★'.repeat(Math.floor(p.rating || 4)) + '☆'.repeat(5 - Math.floor(p.rating || 4));
  const inStock  = (p.stock || 0) > 0;
  const lowStock = inStock && (p.stock || 0) < 10;
  const isOut    = !inStock;

  function handleAdd() {
    if (!inStock) return;
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    /*
      from Stitch:
      group relative bg-surface-container-low rounded-[2rem] p-4 glass-glow
      hover:translate-y-[-8px] transition-all duration-500
    */
    <div className={`card${isOut ? ' oos' : ''}`}>

      {/*
        from Stitch: aspect-square rounded-2xl overflow-hidden relative mb-6
        SQUARE image area
      */}
      <div className="card-img" style={{ background: gradient }}>
        <span className="card-emoji">{p.emoji || '📦'}</span>

        {/* New badge — from Stitch: absolute top-4 left-4 gold pill */}
        {p.is_new && !isOut && (
          <div className="badge-new">New</div>
        )}

        {/* Low stock bar — from Stitch: absolute bottom-4 left-4 right-4 error-container bar */}
        {lowStock && !isOut && (
          <div className="badge-low">
            <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
              <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm8-4a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"/>
            </svg>
            Only {p.stock} left in stock
          </div>
        )}

        {/* Added state — from Stitch: inset gold circle check overlay */}
        {added && (
          <div className="added-overlay">
            <div className="added-circle">
              <svg viewBox="0 0 28 28" fill="none" stroke="currentColor"
                strokeWidth="2.5" width="28" height="28">
                <path d="M5 14l6 6 12-12"/>
              </svg>
            </div>
          </div>
        )}

        {/* Out of stock — from Stitch: inset overlay + "Sold Out" pill */}
        {isOut && (
          <div className="oos-overlay">
            <span className="sold-out-pill">Sold Out</span>
          </div>
        )}
      </div>

      {/* Card body — from Stitch: px-2 */}
      <div className="card-body">
        {/* Name — from Stitch: font-headline text-lg mb-1 */}
        <h3 className="card-name">{p.name}</h3>
        {/* Description — from Stitch: text-on-surface-variant text-sm mb-4 */}
        <p className="card-desc">
          {p.categoryLabel || p.category} · {p.sku}
        </p>
        <div className="card-rating">
          <span className="stars">{stars}</span>
          <span className="rating-count">{p.rating} ({(p.reviews || 0).toLocaleString()})</span>
        </div>

        {/* Footer row */}
        <div className="card-foot">
          {/* Price — from Stitch: text-primary font-headline text-xl */}
          <span className={`card-price${isOut ? ' card-price-oos' : ''}`}>
            ₹{(p.price || 0).toLocaleString('en-IN')}
          </span>

          {isOut ? (
            /* Out of stock "Waitlist Me" button — from Stitch */
            <button className="waitlist-btn">Notify Me</button>
          ) : added ? (
            /* In-cart qty control — from Stitch: bg-primary/10 rounded-full border border-primary/30 */
            <div className="in-cart-ctrl">
              <span className="in-cart-check">✓</span>
              <span className="in-cart-label">Added</span>
            </div>
          ) : (
            /* Add button — from Stitch: w-12 h-12 rounded-full bg-surface-container-highest hover:bg-primary */
            <button className="add-btn" onClick={handleAdd}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
                strokeWidth="2.5" width="14" height="14">
                <path d="M8 2v12M2 8h12"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        /* from Stitch: rounded-[2rem] p-4 glass-glow hover:-translate-y-2 */
        .card {
          background: rgba(17,30,24,0.8);
          border-radius: 32px;
          padding: 16px;
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.3);
          transition: transform 0.5s cubic-bezier(0.2,0,0,1), box-shadow 0.5s;
          position: relative;
        }
        .card:hover { transform: translateY(-8px); box-shadow: inset 0 1px 1px rgba(65,72,67,0.3), 0 24px 48px rgba(5,17,11,0.5); }
        .card.oos { opacity: 0.7; filter: grayscale(0.3); }

        /* from Stitch: aspect-square rounded-2xl overflow-hidden relative mb-6 */
        .card-img {
          aspect-ratio: 1 / 1;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          margin-bottom: 20px;
          display: flex; align-items: center; justify-content: center;
        }
        .card-emoji {
          font-size: 72px;
          filter: drop-shadow(0 8px 28px rgba(0,0,0,0.7));
          transition: transform 0.5s;
        }
        .card:hover .card-emoji { transform: scale(1.1); }

        /* from Stitch: absolute top-4 left-4 bg-primary gold pill */
        .badge-new {
          position: absolute; top: 14px; left: 14px;
          padding: 5px 14px;
          background: linear-gradient(135deg, #e9c349, #ad8b0e);
          color: #3c2f00;
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.12em; border-radius: 999px;
        }

        /* from Stitch: absolute bottom-4 left-4 right-4 error bg bar */
        .badge-low {
          position: absolute; bottom: 12px; left: 12px; right: 12px;
          display: flex; align-items: center; gap: 7px;
          padding: 8px 14px;
          background: rgba(147,0,10,0.75);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: #ffdad6;
        }

        /* from Stitch: inset gold circle check overlay */
        .added-overlay {
          position: absolute; inset: 0;
          background: rgba(233,195,73,0.18);
          backdrop-filter: blur(2px);
          display: flex; align-items: center; justify-content: center;
        }
        .added-circle {
          width: 64px; height: 64px; border-radius: 50%;
          background: linear-gradient(135deg, #e9c349, #ad8b0e);
          color: #3c2f00;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 28px rgba(233,195,73,0.4);
        }

        /* from Stitch: bg-surface/60 backdrop-blur-sm overlay + border pill */
        .oos-overlay {
          position: absolute; inset: 0;
          background: rgba(9,22,16,0.6);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
        }
        .sold-out-pill {
          color: #c1c8c1; font-size: 11px; font-weight: 700;
          font-family: 'Manrope', sans-serif;
          text-transform: uppercase; letter-spacing: 0.14em;
          border: 1px solid rgba(193,200,193,0.3);
          padding: 8px 22px; border-radius: 999px;
        }

        /* Card body */
        .card-body { padding: 0 8px 8px; }
        /* from Stitch: font-headline text-lg mb-1 */
        .card-name {
          font-family: 'Noto Serif', serif;
          font-size: 16px; font-weight: 400; line-height: 1.3;
          color: #d7e6dc; margin-bottom: 5px;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        /* from Stitch: text-on-surface-variant text-sm mb-4 */
        .card-desc {
          font-size: 12px; color: #8b938c;
          text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;
        }
        .card-rating { font-size: 11px; color: #8b938c; margin-bottom: 14px; }
        .stars { color: #e9c349; letter-spacing: -1px; margin-right: 4px; }

        /* from Stitch: flex justify-between items-center */
        .card-foot { display: flex; align-items: center; justify-content: space-between; }
        /* from Stitch: text-primary font-headline text-xl */
        .card-price {
          font-family: 'Noto Serif', serif;
          font-size: 20px; font-weight: 400; color: #e9c349;
        }
        .card-price-oos { color: #8b938c; }

        /* from Stitch: w-12 h-12 rounded-full bg-surface-container-highest glass-glow hover:bg-primary */
        .add-btn {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(42,56,49,0.7);
          border: 1px solid rgba(65,72,67,0.4);
          color: #c1c8c1;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; padding: 0;
          box-shadow: inset 0 1px 1px rgba(65,72,67,0.3);
          transition: all 0.25s;
        }
        .add-btn:hover {
          background: linear-gradient(135deg, #e9c349, #ad8b0e);
          border-color: transparent; color: #3c2f00;
          transform: scale(1.1);
        }

        /* from Stitch: in-cart state */
        .in-cart-ctrl {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 999px;
          background: rgba(233,195,73,0.1);
          border: 1px solid rgba(233,195,73,0.3);
        }
        .in-cart-check { color: #e9c349; font-size: 14px; font-weight: 700; }
        .in-cart-label { color: #e9c349; font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em; }

        /* from Stitch: waitlist px-6 py-2 rounded-full text-[10px] */
        .waitlist-btn {
          padding: 8px 18px; border-radius: 999px;
          background: rgba(42,56,49,0.6);
          border: 1px solid rgba(65,72,67,0.4);
          color: #c1c8c1;
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          cursor: pointer; font-family: 'Manrope', sans-serif;
          transition: all .2s;
        }
        .waitlist-btn:hover { background: rgba(193,200,193,0.1); color: #d7e6dc; }
      `}</style>
    </div>
  );
}
