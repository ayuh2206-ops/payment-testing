// pages/index.jsx — Professional e-commerce catalog, fetches from PostgreSQL via /api/products
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartContext';

const CATEGORIES = [
  { id: '',           label: 'All',          emoji: '✦' },
  { id: 'audio',      label: 'Audio',        emoji: '🎧' },
  { id: 'keyboards',  label: 'Keyboards',    emoji: '⌨️' },
  { id: 'displays',   label: 'Displays',     emoji: '🖥️' },
  { id: 'storage',    label: 'Storage',      emoji: '💾' },
  { id: 'cables',     label: 'Cables & Hubs',emoji: '🔌' },
  { id: 'ergonomics', label: 'Ergonomics',   emoji: '💺' },
  { id: 'networking', label: 'Networking',   emoji: '📡' },
  { id: 'cameras',    label: 'Cameras',      emoji: '📷' },
];

const CAT_GRADIENT = {
  audio:      'linear-gradient(150deg,#1e0d42,#0d0521)',
  keyboards:  'linear-gradient(150deg,#0d1e42,#05091a)',
  displays:   'linear-gradient(150deg,#0d3028,#051a14)',
  storage:    'linear-gradient(150deg,#2a1a06,#150d03)',
  cables:     'linear-gradient(150deg,#122216,#09110a)',
  ergonomics: 'linear-gradient(150deg,#250a2a,#120514)',
  networking: 'linear-gradient(150deg,#0a1c2a,#050d15)',
  cameras:    'linear-gradient(150deg,#2a0e0e,#150707)',
};

export default function Home() {
  const { addItem }                   = useCart();
  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [total, setTotal]             = useState(0);
  const [totalPages, setTotalPages]   = useState(1);
  const [search, setSearch]           = useState('');
  const [category, setCategory]       = useState('');
  const [maxPrice, setMaxPrice]       = useState(13000);
  const [sort, setSort]               = useState('default');
  const [page, setPage]               = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ search, category, maxPrice, sort, page, limit: 24 });
      const data = await fetch(`/api/products?${qs}`).then(r => r.json());
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch { setProducts([]); }
    finally  { setLoading(false); }
  }, [search, category, maxPrice, sort, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { setPage(1); }, [search, category, maxPrice, sort]);

  function pageNums() {
    const arr = [], s = Math.max(1, page-2), e = Math.min(totalPages, page+2);
    if (s > 1) { arr.push(1); if (s > 2) arr.push('...'); }
    for (let i=s; i<=e; i++) arr.push(i);
    if (e < totalPages) { if (e < totalPages-1) arr.push('...'); arr.push(totalPages); }
    return arr;
  }

  return (
    <>
      <Head>
        <title>YourStore — Premium Tech Accessories</title>
        <meta name="description" content="Shop 240+ premium tech products. Secure checkout via Razorpay." />
      </Head>
      <div className="shell">
        <Navbar onSearch={q => setSearch(q)} />

        {/* Category nav */}
        <nav className="catbar">
          <div className="catbar-inner">
            {CATEGORIES.map(c => (
              <button key={c.id} className={`cpill${category===c.id?' on':''}`} onClick={() => setCategory(c.id)}>
                <span>{c.emoji}</span>{c.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="main">
          {/* Toolbar */}
          <div className="toolbar">
            <p className="tcount">
              {loading ? 'Loading…' : <><b>{total.toLocaleString()}</b> products{category && ` in ${CATEGORIES.find(c=>c.id===category)?.label}`}</>}
            </p>
            <div className="tright">
              <label className="price-lbl">
                Max ₹{maxPrice.toLocaleString('en-IN')}
                <input type="range" min={699} max={13000} step={100} value={maxPrice} onChange={e=>setMaxPrice(+e.target.value)} />
              </label>
              <select value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="default">Featured</option>
                <option value="new">New Arrivals</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid">{Array.from({length:8}).map((_,i)=><SkeletonCard key={i}/>)}</div>
          ) : products.length === 0 ? (
            <div className="empty">
              <span style={{fontSize:48}}>🔍</span>
              <h3>No products found</h3>
              <p>Try adjusting your filters</p>
              <button onClick={()=>{setSearch('');setCategory('');setMaxPrice(13000);setSort('default');}}>Clear filters</button>
            </div>
          ) : (
            <div className="grid">
              {products.map(p => <ProductCard key={p.id} product={p} onAdd={() => addItem(p)} />)}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="pager">
              <button className="pgb" onClick={()=>setPage(1)} disabled={page===1}>«</button>
              <button className="pgb" onClick={()=>setPage(p=>p-1)} disabled={page===1}>‹</button>
              {pageNums().map((n,i) => n==='...'
                ? <span key={'e'+i} className="pgdot">…</span>
                : <button key={n} className={`pgb${page===n?' on':''}`} onClick={()=>setPage(n)}>{n}</button>
              )}
              <button className="pgb" onClick={()=>setPage(p=>p+1)} disabled={page===totalPages}>›</button>
              <button className="pgb" onClick={()=>setPage(totalPages)} disabled={page===totalPages}>»</button>
            </div>
          )}
        </main>
        <Footer />
      </div>

      <style jsx>{`
        .shell { min-height:100vh; display:flex; flex-direction:column; }
        .catbar { border-bottom:1px solid var(--border); background:var(--bg2); }
        .catbar-inner { max-width:1360px; margin:0 auto; padding:0 24px; display:flex; gap:2px; overflow-x:auto; scrollbar-width:none; }
        .catbar-inner::-webkit-scrollbar { display:none; }
        .cpill { display:flex; align-items:center; gap:6px; padding:11px 16px; white-space:nowrap; font-size:13px; font-weight:500; color:var(--text2); border:none; background:none; border-bottom:2px solid transparent; margin-bottom:-1px; transition:color .15s, border-color .15s; }
        .cpill:hover { color:var(--text); }
        .cpill.on { color:var(--accent2); border-bottom-color:var(--accent); }
        .main { flex:1; padding:24px 24px 80px; max-width:1360px; margin:0 auto; width:100%; }
        .toolbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px; }
        .tcount { font-size:13px; color:var(--text2); }
        .tcount b { color:var(--text); font-weight:600; }
        .tright { display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
        .price-lbl { display:flex; align-items:center; gap:8px; font-size:12px; color:var(--text2); white-space:nowrap; }
        input[type=range] { width:80px; accent-color:var(--accent); cursor:pointer; }
        select { height:36px; padding:0 32px 0 12px; background:var(--surface2); border:1px solid var(--border); border-radius:8px; color:var(--text); font-size:13px; outline:none; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%235a5a78'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 10px center; cursor:pointer; }
        select:focus { border-color:var(--accent); }
        .grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        @media(max-width:1200px){.grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:860px){.grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:480px){.grid{grid-template-columns:1fr}}
        .empty { text-align:center; padding:80px 20px; color:var(--text2); }
        .empty h3 { font-size:18px; font-weight:600; color:var(--text); margin:12px 0 8px; }
        .empty p { font-size:14px; margin-bottom:20px; }
        .empty button { padding:9px 20px; background:var(--accent); color:#fff; border:none; border-radius:8px; font-size:13px; font-weight:500; cursor:pointer; }
        .pager { display:flex; align-items:center; gap:6px; justify-content:center; margin-top:40px; flex-wrap:wrap; }
        .pgb { min-width:36px; height:36px; padding:0 8px; border:1px solid var(--border); border-radius:8px; background:var(--surface); color:var(--text2); font-size:13px; display:flex; align-items:center; justify-content:center; transition:all .15s; }
        .pgb:hover:not(:disabled) { border-color:var(--accent); color:var(--text); }
        .pgb.on { background:var(--accent); color:#fff; border-color:transparent; font-weight:600; }
        .pgb:disabled { opacity:.3; cursor:not-allowed; }
        .pgdot { font-size:13px; color:var(--text3); padding:0 4px; }
      `}</style>
    </>
  );
}

function SkeletonCard() {
  return (
    <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden'}}>
      <div style={{height:180,background:'var(--surface2)'}} className="sk" />
      <div style={{padding:'14px 16px',display:'flex',flexDirection:'column',gap:8}}>
        {[40,80,60,50].map((w,i) => <div key={i} className="sk" style={{height:i===3?18:12,width:w+'%',borderRadius:4}} />)}
      </div>
      <style jsx>{`.sk{background:linear-gradient(90deg,var(--surface2) 25%,var(--surface) 50%,var(--surface2) 75%);background-size:200% 100%;animation:sh 1.4s infinite}@keyframes sh{to{background-position:-200% 0}}`}</style>
    </div>
  );
}

function ProductCard({ product: p, onAdd }) {
  const [added, setAdded] = useState(false);
  const gradient = CAT_GRADIENT[p.category] || 'linear-gradient(150deg,#1a1a28,#0d0d18)';
  const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));
  const stockColor = p.stock===0 ? 'var(--red)' : p.stock<10 ? 'var(--amber)' : 'var(--green)';
  const stockLabel = p.stock===0 ? 'Out of stock' : p.stock<10 ? `${p.stock} left` : 'In stock';

  function handleAdd() {
    if (p.stock === 0) return;
    onAdd(); setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className="card">
      {p.is_new && <span className="ntag">New</span>}
      <div className="cimg" style={{background:gradient}}>
        <span className="cemoji">{p.emoji}</span>
      </div>
      <div className="cbody">
        <span className="ccat">{p.category}</span>
        <h3 className="cname" title={p.name}>{p.name}</h3>
        <div className="cmeta">
          <span style={{color:'#f59e0b',fontSize:11,letterSpacing:-1}}>{stars}</span>
          <span style={{fontSize:11,color:'var(--text3)'}}> {p.rating} ({(p.reviews||0).toLocaleString()})</span>
        </div>
        <div className="cfooter">
          <div>
            <div className="cprice">₹{(p.price||0).toLocaleString('en-IN')}</div>
            <div style={{fontSize:11,marginTop:2,fontWeight:500,color:stockColor}}>{stockLabel}</div>
          </div>
          <button className={`addbtn${added?' added':''}`} onClick={handleAdd} disabled={p.stock===0} title={p.stock===0?'Out of stock':'Add to cart'}>
            {added
              ? <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="m2 8 4 4 8-8"/></svg>
              : <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M8 3v10M3 8h10"/></svg>
            }
          </button>
        </div>
      </div>

      <style jsx>{`
        .card { background:var(--surface); border:1px solid var(--border); border-radius:16px; overflow:hidden; position:relative; display:flex; flex-direction:column; transition:border-color .2s,transform .2s,box-shadow .2s; }
        .card:hover { border-color:var(--border2); transform:translateY(-3px); box-shadow:0 8px 32px rgba(0,0,0,.4); }
        .ntag { position:absolute; top:10px; left:10px; z-index:2; background:var(--accent); color:#fff; font-size:10px; font-weight:700; padding:2px 8px; border-radius:99px; text-transform:uppercase; letter-spacing:.5px; }
        .cimg { height:180px; display:flex; align-items:center; justify-content:center; }
        .cemoji { font-size:56px; filter:drop-shadow(0 4px 16px rgba(0,0,0,.5)); }
        .cbody { padding:14px 16px 16px; flex:1; display:flex; flex-direction:column; gap:6px; }
        .ccat { font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:.8px; color:var(--text3); }
        .cname { font-size:13.5px; font-weight:500; line-height:1.4; color:var(--text); display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .cmeta { display:flex; align-items:center; }
        .cfooter { display:flex; align-items:flex-end; justify-content:space-between; margin-top:auto; padding-top:8px; }
        .cprice { font-family:'Syne',sans-serif; font-size:18px; font-weight:700; color:var(--text); line-height:1.2; }
        .addbtn { width:36px; height:36px; border-radius:10px; border:1px solid var(--border2); background:var(--surface2); color:var(--text); display:flex; align-items:center; justify-content:center; transition:all .15s; padding:0; flex-shrink:0; }
        .addbtn:hover:not(:disabled) { background:var(--accent); border-color:transparent; color:#fff; }
        .addbtn.added { background:var(--green); border-color:transparent; color:#fff; }
        .addbtn:disabled { opacity:.3; cursor:not-allowed; }
      `}</style>
    </div>
  );
}
