// pages/index.jsx
// 240-product catalog. All filtering/sorting runs via useMemo (sub-ms).
// Production: move to GET /api/products?search=&cat=&maxPrice=&sort=&page=
// backed by PostgreSQL with indexes on (category, price, created_at) + GIN tsvector.

import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartContext";
import { ALL_PRODUCTS, CATEGORIES } from "@/lib/products";

const PER_PAGE = 24;
const MAX_PRICE = 13000;

export default function Home() {
  const { addItem } = useCart();

  const [search, setSearch]         = useState("");
  const [debouncedSearch, setDS]    = useState("");
  const [activeCats, setActiveCats] = useState([]);
  const [maxPrice, setMaxPrice]     = useState(MAX_PRICE);
  const [sort, setSort]             = useState("default");
  const [page, setPage]             = useState(1);
  const [filterMs, setFilterMs]     = useState(0);

  // 180 ms debounce — avoids re-filtering on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDS(search), 180);
    return () => clearTimeout(t);
  }, [search]);

  // All filter + sort logic. In production this becomes a parameterised pg query.
  const filtered = useMemo(() => {
    const t0 = performance.now();
    let res = ALL_PRODUCTS;

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      res = res.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
      );
    }
    if (activeCats.length > 0) res = res.filter(p => activeCats.includes(p.category));
    res = res.filter(p => p.price <= maxPrice);

    if (sort === "price-asc")  res = [...res].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") res = [...res].sort((a, b) => b.price - a.price);
    if (sort === "rating")     res = [...res].sort((a, b) => b.rating - a.rating);
    if (sort === "reviews")    res = [...res].sort((a, b) => b.reviews - a.reviews);
    if (sort === "name")       res = [...res].sort((a, b) => a.name.localeCompare(b.name));

    setFilterMs(parseFloat((performance.now() - t0).toFixed(2)));
    return res;
  }, [debouncedSearch, activeCats, maxPrice, sort]);

  // Reset page on any filter change
  useEffect(() => { setPage(1); }, [debouncedSearch, activeCats, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function toggleCat(id) {
    setActiveCats(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);
  }

  function clearAll() {
    setSearch(""); setDS(""); setActiveCats([]); setMaxPrice(MAX_PRICE); setSort("default");
  }

  function pageNumbers() {
    const nums = [];
    const s = Math.max(1, page - 2), e = Math.min(totalPages, page + 2);
    if (s > 1) { nums.push(1); if (s > 2) nums.push("..."); }
    for (let i = s; i <= e; i++) nums.push(i);
    if (e < totalPages) { if (e < totalPages - 1) nums.push("..."); nums.push(totalPages); }
    return nums;
  }

  const hasActiveFilters = debouncedSearch || activeCats.length > 0 || maxPrice < MAX_PRICE || sort !== "default";

  return (
    <>
      <Head>
        <title>YourStore — Premium Tech Accessories</title>
        <meta name="description" content="240 premium tech accessories. Secure checkout via Razorpay." />
      </Head>

      <div className="page-wrap">
        <Navbar />

        <main className="catalog-page">

          {/* ── Hero ── */}
          <section className="hero">
            <p className="hero-eyebrow">✦ Secure payments via Razorpay · 240 products</p>
            <h1>Premium Tech<br />Accessories</h1>
            <p className="hero-sub">
              Free shipping above ₹1,999 · 7-day returns ·{" "}
              <Link href="/orders">Track your orders →</Link>
            </p>
          </section>

          {/* ── Perf bar ── */}
          <div className="perf-bar">
            <span className="chip"><b>{ALL_PRODUCTS.length}</b> products</span>
            <span className="chip"><b>{filtered.length}</b> matching</span>
            <span className="chip">filtered in <b>{filterMs} ms</b></span>
            <span className="chip">page <b>{page}</b> / <b>{totalPages}</b></span>
            {hasActiveFilters && (
              <button className="chip chip-clear" onClick={clearAll}>✕ Clear filters</button>
            )}
          </div>

          {/* ── Search + Sort ── */}
          <div className="controls-row">
            <div className="search-wrap">
              <svg className="search-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="7" cy="7" r="5"/><path d="m11 11 3 3"/>
              </svg>
              <input
                className="search-input"
                placeholder="Search by name, SKU, or category…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => { setSearch(""); setDS(""); }}>✕</button>
              )}
            </div>

            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Default order</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="name">Name A → Z</option>
            </select>
          </div>

          {/* ── Category + Price ── */}
          <div className="filter-row">
            <span className="filter-label">Filter:</span>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`cat-chip${activeCats.includes(c.id) ? " on" : ""}`}
                onClick={() => toggleCat(c.id)}
              >
                {c.emoji} {c.label}
              </button>
            ))}

            <div className="price-filter">
              <span>Max ₹<b>{maxPrice.toLocaleString("en-IN")}</b></span>
              <input
                type="range" min={699} max={MAX_PRICE} step={100}
                value={maxPrice}
                onChange={e => setMaxPrice(+e.target.value)}
              />
            </div>
          </div>

          {/* ── Product grid ── */}
          {pageItems.length === 0 ? (
            <div className="no-results">
              <p>No products match.</p>
              <button className="cat-chip" style={{ marginTop: 14 }} onClick={clearAll}>
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {pageItems.map(p => (
                <ProductCard key={p.id} product={p} onAdd={() => addItem(p)} />
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="pagination">
              <button className="pg-btn" onClick={() => setPage(1)} disabled={page === 1}>«</button>
              <button className="pg-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</button>
              {pageNumbers().map((n, i) =>
                n === "..."
                  ? <span key={`e${i}`} className="pg-dot">…</span>
                  : <button key={n} className={`pg-btn${page === n ? " active" : ""}`} onClick={() => setPage(n)}>{n}</button>
              )}
              <button className="pg-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>›</button>
              <button className="pg-btn" onClick={() => setPage(totalPages)} disabled={page === totalPages}>»</button>
            </div>
          )}

          {/* ── Trust strip ── */}
          <div className="trust-strip">
            <span>🔒 Razorpay · PCI DSS Level 1</span>
            <span>↩ 7-day returns</span>
            <span>📦 Ships in 1–2 business days</span>
            <span>💬 Grievances resolved in 5 days</span>
          </div>
        </main>

        <Footer />
      </div>

      <style jsx>{`
        .page-wrap { display: flex; flex-direction: column; min-height: 100vh; }
        .catalog-page { flex: 1; padding: 0 24px 80px; position: relative; z-index: 1; max-width: 1240px; margin: 0 auto; width: 100%; }

        .hero { padding: 60px 0 36px; }
        .hero-eyebrow { font-size: 12px; color: var(--accent); font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 14px; }
        .hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(36px, 6vw, 64px); font-weight: 800; letter-spacing: -2px; line-height: 1.05; margin-bottom: 14px; }
        .hero-sub { font-size: 14px; color: var(--muted); }
        .hero-sub a { color: var(--accent); }

        .perf-bar { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; align-items: center; }
        .chip { font-size: 12px; padding: 4px 12px; border-radius: 20px; background: var(--surface); border: 1px solid var(--border); color: var(--muted); }
        .chip b { color: var(--accent); }
        .chip-clear { border-style: dashed; cursor: pointer; transition: all .15s; }
        .chip-clear:hover { border-color: var(--danger); color: var(--danger); background: rgba(255,77,77,0.08); }

        .controls-row { display: grid; grid-template-columns: 1fr auto; gap: 10px; margin-bottom: 12px; align-items: center; }
        .search-wrap { position: relative; }
        .search-input { width: 100%; padding: 10px 36px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-size: 14px; outline: none; transition: border-color .2s; }
        .search-input:focus { border-color: var(--accent); }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 14px; height: 14px; color: var(--muted); pointer-events: none; }
        .search-clear { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--muted); font-size: 13px; padding: 4px; cursor: pointer; }
        select { padding: 10px 30px 10px 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-size: 13px; outline: none; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%237d8590'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; cursor: pointer; transition: border-color .2s; }
        select:focus { border-color: var(--accent); }

        .filter-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; align-items: center; }
        .filter-label { font-size: 12px; color: var(--muted); }
        .cat-chip { padding: 5px 13px; border-radius: 20px; border: 1px solid var(--border); font-size: 12px; background: var(--surface); color: var(--muted); transition: all .15s; cursor: pointer; }
        .cat-chip:hover { border-color: var(--accent); color: var(--text); }
        .cat-chip.on { background: var(--accent); color: #000; border-color: transparent; font-weight: 600; }
        .price-filter { margin-left: auto; display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); }
        .price-filter b { color: var(--text); }
        input[type=range] { accent-color: var(--accent); }

        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px; }
        .no-results { text-align: center; padding: 60px 0; color: var(--muted); }

        .pagination { display: flex; align-items: center; gap: 6px; justify-content: center; margin-bottom: 48px; flex-wrap: wrap; }
        .pg-btn { padding: 7px 13px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--text); font-size: 13px; transition: all .15s; cursor: pointer; }
        .pg-btn:hover:not(:disabled) { border-color: var(--accent); }
        .pg-btn.active { background: var(--accent); color: #000; border-color: transparent; font-weight: 700; }
        .pg-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .pg-dot { font-size: 13px; color: var(--muted); padding: 0 4px; }

        .trust-strip { display: flex; flex-wrap: wrap; justify-content: center; gap: 28px; padding: 28px 0; border-top: 1px solid var(--border); font-size: 13px; color: var(--muted); }
      `}</style>
    </>
  );
}

// ── Product card ─────────────────────────────────────────────────────────────
function ProductCard({ product: p, onAdd }) {
  const stockLabel = p.stock === 0 ? "Out of stock" : p.stock < 10 ? `Only ${p.stock} left` : `${p.stock} in stock`;
  const stockCls   = p.stock === 0 ? "out" : p.stock < 10 ? "low" : "ok";
  const stars      = "★".repeat(Math.floor(p.rating)) + "☆".repeat(5 - Math.floor(p.rating));

  return (
    <div className="pcard">
      {p.isNew && <span className="new-badge">New</span>}
      <div className="pcard-img">{p.emoji}</div>
      <div className="pcard-body">
        <div className="pcard-cat">{p.categoryLabel}</div>
        <div className="pcard-name">{p.name}</div>
        <div className="pcard-sku">{p.sku}</div>
        <div className="pcard-rating">
          <span className="stars">{stars}</span>
          <span className="rating-sub"> {p.rating} ({p.reviews.toLocaleString()})</span>
        </div>
        <div className="pcard-foot">
          <span className="pcard-price">₹{p.price.toLocaleString("en-IN")}</span>
          <span className={`stock-tag ${stockCls}`}>{stockLabel}</span>
        </div>
        <button className="add-btn" onClick={onAdd} disabled={p.stock === 0}>
          {p.stock === 0 ? "Out of stock" : "+ Add to cart"}
        </button>
      </div>

      <style jsx>{`
        .pcard { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; transition: border-color .15s, transform .15s; position: relative; }
        .pcard:hover { border-color: rgba(0,229,176,0.4); transform: translateY(-2px); }
        .new-badge { position: absolute; top: 10px; right: 10px; background: var(--accent); color: #000; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
        .pcard-img { height: 110px; display: flex; align-items: center; justify-content: center; background: var(--bg); font-size: 40px; }
        .pcard-body { padding: 12px 14px; flex: 1; display: flex; flex-direction: column; gap: 5px; }
        .pcard-cat { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted); }
        .pcard-name { font-size: 13px; font-weight: 600; line-height: 1.35; }
        .pcard-sku { font-size: 10px; color: var(--muted); font-family: monospace; }
        .pcard-rating { font-size: 11px; color: var(--muted); }
        .stars { color: #f0a500; letter-spacing: -1px; }
        .rating-sub { font-size: 10px; }
        .pcard-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }
        .pcard-price { font-size: 17px; font-weight: 700; font-family: 'Syne', sans-serif; }
        .stock-tag { font-size: 10px; padding: 2px 8px; border-radius: 20px; font-weight: 600; }
        .stock-tag.ok  { background: rgba(46,160,67,0.15); color: #3fb950; }
        .stock-tag.low { background: rgba(240,165,0,0.15);  color: #d29922; }
        .stock-tag.out { background: rgba(255,77,77,0.12);  color: #f85149; }
        .add-btn { margin-top: 8px; width: 100%; padding: 9px; border: 1px solid var(--border); border-radius: 8px; background: none; color: var(--text); font-size: 12px; font-weight: 600; transition: all .15s; cursor: pointer; }
        .add-btn:hover:not(:disabled) { background: var(--accent); color: #000; border-color: transparent; }
        .add-btn:disabled { opacity: 0.3; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
