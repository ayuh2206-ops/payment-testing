// pages/index.jsx — Botanical Glass storefront
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

const CAT_BG = {
  audio:      '#0d0820', keyboards:'#080d20', displays:'#071a13',
  storage:    '#1a0e03', cables:'#071510',    ergonomics:'#160520',
  networking: '#050e18', cameras:'#180707',
};

export default function Home() {
  const { addItem }               = useCart();
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [total, setTotal]         = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('');
  const [maxPrice, setMaxPrice]   = useState(13000);
  const [sort, setSort]           = useState('default');
  const [page, setPage]           = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ search, category, maxPrice, sort, page, limit: 24 });
      const d  = await fetch(`/api/products?${qs}`).then(r => r.json());
      setProducts(d.products || []); setTotal(d.total || 0); setTotalPages(d.totalPages || 1);
    } catch { setProducts([]); }
    finally   { setLoading(false); }
  }, [search, category, maxPrice, sort, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, category, maxPrice, sort]);

  function pageNums() {
    const a=[], s=Math.max(1,page-2), e=Math.min(totalPages,page+2);
    if(s>1){a.push(1);if(s>2)a.push('...');}
    for(let i=s;i<=e;i++)a.push(i);
    if(e<totalPages){if(e<totalPages-1)a.push('...');a.push(totalPages);}
    return a;
  }

  return (
    <>
      <Head>
        <title>YourStore — Premium Tech Accessories</title>
      </Head>
      <div className="shell">
        <Navbar onSearch={q => setSearch(q)} />

        {/* Category rail */}
        <nav className="catrail">
          <div className="catrail-inner">
            {CATEGORIES.map(c => (
              <button key={c.id} className={`ctab${category===c.id?' on':''}`} onClick={() => setCategory(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="main">
          <div className="container">

            {/* Toolbar */}
            <div className="toolbar">
              <p className="tcount">
                {!loading && <><b>{total.toLocaleString()}</b> products{category && <> in <em>{CATEGORIES.find(c=>c.id===category)?.label}</em></>}</>}
              </p>
              <div className="tcontrols">
                <label className="price-ctrl">
                  Up to <b>₹{maxPrice.toLocaleString('en-IN')}</b>
                  <input type="range" min={699} max={13000} step={100} value={maxPrice} onChange={e=>setMaxPrice(+e.target.value)} />
                </label>
                <div className="sort-wrap">
                  <select value={sort} onChange={e=>setSort(e.target.value)}>
                    <option value="default">Featured</option>
                    <option value="new">New Arrivals</option>
                    <option value="price-asc">Price ↑</option>
                    <option value="price-desc">Price ↓</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid">{[...Array(8)].map((_,i)=><SkeletonCard key={i}/>)}</div>
            ) : products.length === 0 ? (
              <div className="empty">
                <p className="empty-label">No products found</p>
                <p className="empty-sub">Try adjusting your search or filters</p>
                <button className="gold-btn" style={{padding:'12px 32px'}} onClick={()=>{setSearch('');setCategory('');setMaxPrice(13000);setSort('default');}}>
                  Clear Filters
                </button>
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
          </div>
        </main>
        <Footer />
      </div>

      <style jsx>{`
        .shell { display:flex; flex-direction:column; min-height:100vh; }
        .catrail { border-bottom:1px solid rgba(65,72,67,0.2); background:rgba(17,30,24,0.7); }
        .catrail-inner { max-width:1360px; margin:0 auto; padding:0 28px; display:flex; gap:0; overflow-x:auto; scrollbar-width:none; -webkit-overflow-scrolling:touch; }
        .catrail-inner::-webkit-scrollbar { display:none; }
        .ctab { padding:13px 18px; border:none; background:none; font-size:13px; font-weight:500; color:var(--text3); white-space:nowrap; border-bottom:2px solid transparent; margin-bottom:-1px; transition:color .15s, border-color .15s; cursor:pointer; font-family:'Manrope',sans-serif; letter-spacing:0.01em; }
        .ctab:hover { color:var(--text2); }
        .ctab.on { color:var(--gold); border-bottom-color:var(--gold); }
        .main { flex:1; padding:32px 28px 80px; }
        .container { max-width:1360px; margin:0 auto; }
        .toolbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; gap:12px; flex-wrap:wrap; }
        .tcount { font-size:13px; color:var(--text2); font-style:italic; }
        .tcount b { color:var(--text); font-style:normal; font-weight:600; }
        .tcount em { color:var(--gold); font-style:italic; }
        .tcontrols { display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
        .price-ctrl { display:flex; align-items:center; gap:8px; font-size:12px; color:var(--text2); white-space:nowrap; cursor:default; }
        .price-ctrl b { color:var(--text); }
        input[type=range] { width:80px; accent-color:var(--gold); cursor:pointer; }
        .sort-wrap select { height:38px; padding:0 30px 0 14px; background:rgba(42,56,49,0.5); border:1px solid rgba(65,72,67,0.3); border-radius:999px; color:var(--text); font-size:12px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; outline:none; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238b938c'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; cursor:pointer; font-family:'Manrope',sans-serif; }
        .sort-wrap select:focus { border-color:rgba(233,195,73,0.4); }

        /* 4-column grid — minmax(0, 1fr) is the correct fix */
        .grid { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:18px; }
        @media(max-width:1100px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
        @media(max-width:760px) {.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:480px) {.grid{grid-template-columns:minmax(0,1fr)}}

        .empty { text-align:center; padding:80px 20px; }
        .empty-label { font-family:'Noto Serif',serif; font-size:22px; font-weight:300; font-style:italic; color:var(--text); margin-bottom:10px; }
        .empty-sub { font-size:14px; color:var(--text2); margin-bottom:28px; }

        .pager { display:flex; align-items:center; justify-content:center; gap:6px; margin-top:52px; flex-wrap:wrap; }
        .pgb { min-width:38px; height:38px; padding:0 10px; border:1px solid rgba(65,72,67,0.3); border-radius:999px; background:rgba(42,56,49,0.4); color:var(--text2); font-size:13px; display:flex; align-items:center; justify-content:center; transition:all .15s; cursor:pointer; font-family:'Manrope',sans-serif; }
        .pgb:hover:not(:disabled) { border-color:rgba(233,195,73,0.5); color:var(--gold); }
        .pgb.on { background:linear-gradient(135deg,var(--gold),var(--gold-dark)); color:var(--on-gold); border-color:transparent; font-weight:700; }
        .pgb:disabled { opacity:.25; cursor:not-allowed; }
        .pgdot { font-size:13px; color:var(--text3); padding:0 4px; }
      `}</style>
    </>
  );
}

function SkeletonCard() {
  return (
    <div style={{background:'rgba(32,45,38,0.6)',borderRadius:20,overflow:'hidden',boxShadow:'inset 0 1px 1px rgba(65,72,67,0.3)'}}>
      <div className="sk" style={{height:200}} />
      <div style={{padding:'14px 18px 18px',display:'flex',flexDirection:'column',gap:10}}>
        {[35,75,55,45].map((w,i)=><div key={i} className="sk" style={{height:i===3?20:11,width:w+'%',borderRadius:99}}/>)}
      </div>
      <style jsx>{`.sk{background:linear-gradient(90deg,rgba(42,56,49,.6) 25%,rgba(42,56,49,.9) 50%,rgba(42,56,49,.6) 75%);background-size:200% 100%;animation:sh 1.6s infinite}@keyframes sh{to{background-position:-200% 0}}`}</style>
    </div>
  );
}

function ProductCard({ product: p, onAdd }) {
  const [added, setAdded] = useState(false);
  const bg     = CAT_BG[p.category] || '#0d1a10';
  const stars  = '★'.repeat(Math.floor(p.rating||4))+'☆'.repeat(5-Math.floor(p.rating||4));
  const inStock  = (p.stock||0) > 0;
  const lowStock = inStock && (p.stock||0) < 10;

  function handleAdd() {
    if (!inStock) return;
    onAdd(); setAdded(true); setTimeout(()=>setAdded(false), 1400);
  }

  return (
    <div className="card">
      {p.is_new && <div className="ntag">New</div>}
      <div className="cimg" style={{background:bg}}>
        <span className="emoji">{p.emoji||'📦'}</span>
        {!inStock && <div className="oos">Out of Stock</div>}
      </div>
      <div className="cinfo">
        <div className="crow1">
          <span className="ccat">{p.category}</span>
          {lowStock && <span className="lowtag">{p.stock} left</span>}
        </div>
        <h3 className="cname">{p.name}</h3>
        <div className="crating">
          <span style={{color:'var(--gold)',fontSize:10,letterSpacing:-1}}>{stars}</span>
          <span style={{fontSize:10,color:'var(--text3)',marginLeft:4}}>{p.rating} · {(p.reviews||0).toLocaleString()}</span>
        </div>
        <div className="cfoot">
          <span className="cprice">₹{(p.price||0).toLocaleString('en-IN')}</span>
          <button className={`addbtn${added?' done':''}${!inStock?' dis':''}`} onClick={handleAdd} disabled={!inStock}>
            {added
              ? <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"><path d="m2 7 4 4 6-7"/></svg>
              : <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"><path d="M7 1v12M1 7h12"/></svg>
            }
          </button>
        </div>
      </div>

      <style jsx>{`
        .card { position:relative; background:rgba(32,45,38,0.7); border-radius:20px; overflow:hidden; display:flex; flex-direction:column; transition:transform .2s,box-shadow .2s; box-shadow:inset 0 1px 1px rgba(65,72,67,0.25); }
        .card:hover { transform:translateY(-5px); box-shadow:inset 0 1px 1px rgba(65,72,67,0.25),0 20px 48px rgba(5,17,11,0.5); }
        .ntag { position:absolute; top:12px; left:12px; z-index:2; background:linear-gradient(135deg,var(--gold),var(--gold-dark)); color:var(--on-gold); font-size:9px; font-weight:800; padding:3px 10px; border-radius:99px; letter-spacing:.1em; text-transform:uppercase; }
        .cimg { height:200px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; flex-shrink:0; }
        .emoji { font-size:68px; filter:drop-shadow(0 8px 28px rgba(0,0,0,.7)); transition:transform .3s; }
        .card:hover .emoji { transform:scale(1.1) translateY(-4px); }
        .oos { position:absolute; inset:0; background:rgba(5,17,11,0.6); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.5); }
        .cinfo { padding:14px 18px 18px; display:flex; flex-direction:column; gap:7px; flex:1; }
        .crow1 { display:flex; align-items:center; justify-content:space-between; }
        .ccat { font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:var(--text3); }
        .lowtag { font-size:9px; font-weight:700; color:var(--gold); background:rgba(233,195,73,0.12); padding:2px 8px; border-radius:99px; letter-spacing:.05em; }
        .cname { font-size:13.5px; font-weight:400; font-family:'Noto Serif',serif; line-height:1.4; color:var(--text); display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; letter-spacing:-.1px; }
        .crating { display:flex; align-items:center; }
        .cfoot { display:flex; align-items:center; justify-content:space-between; margin-top:auto; padding-top:6px; }
        .cprice { font-family:'Noto Serif',serif; font-size:19px; font-weight:400; color:var(--gold); letter-spacing:-.2px; }
        .addbtn { width:38px; height:38px; border-radius:50%; border:1px solid rgba(65,72,67,0.4); background:rgba(42,56,49,0.6); color:var(--text2); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .2s; flex-shrink:0; padding:0; }
        .addbtn:hover:not(.dis) { background:linear-gradient(135deg,var(--gold),var(--gold-dark)); border-color:transparent; color:var(--on-gold); transform:scale(1.1); }
        .addbtn.done { background:rgba(158,209,189,0.2); border-color:rgba(158,209,189,0.4); color:var(--teal); }
        .addbtn.dis { opacity:.25; cursor:not-allowed; }
      `}</style>
    </div>
  );
}
