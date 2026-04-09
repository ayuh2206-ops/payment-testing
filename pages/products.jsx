// pages/products.jsx
// ═══ Product Catalog — matching Stitch product_catalog/code.html exactly ═══
// Layout: sidebar filter panel (glass, rounded-[2.5rem]) + 3-col product grid
// Cards: glass with floating image above, Newsreader titles, gold price, dark CTA pill
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '@/components/CartContext';

const CATEGORIES = [
  { id:'', label:'All Products' },
  { id:'audio', label:'Proprietary Special' },
  { id:'keyboards', label:'Proprietary Premium' },
  { id:'displays', label:'Classical Range' },
  { id:'storage', label:'Churna & Vati' },
  { id:'cables', label:'Taila & Oils' },
  { id:'ergonomics', label:'AyuAahar' },
  { id:'networking', label:'Panchakarma Kits' },
  { id:'cameras', label:'Cosmetics' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ search, category, page, limit: 12 });
      const data = await fetch(`/api/products?${qs}`).then(r => r.json());
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  }, [search, category, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, category]);

  return (
    <>
      <Head>
        <title>Shop | SB Ayurved</title>
        <meta name="description" content="Browse 160+ authentic Ayurvedic formulations from Shree Brahmachaitanya Ayurved" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background:'#FCFCF9', color:'#1a1c1b', minHeight:'100vh', position:'relative', overflow:'hidden' }}>
        {/* ═══ ATMOSPHERIC BLOBS — from Stitch ═══ */}
        <div className="botanical-blob" style={{ top:-160, left:-80, width:600, height:600, background:'rgba(16,42,25,0.04)' }} />
        <div className="botanical-blob" style={{ top:'50%', right:-80, width:500, height:500, background:'rgba(213,227,216,0.3)' }} />
        <div className="botanical-blob" style={{ bottom:40, left:'33%', width:400, height:400, background:'rgba(204,168,48,0.03)' }} />

        {/* ═══ NAV — from Stitch: glass pill, gold brand, Newsreader links ═══ */}
        <nav style={{
          position:'fixed', top:16, left:'50%', transform:'translateX(-50%)',
          width:'95%', maxWidth:1280, zIndex:50, borderRadius:9999,
          background:'rgba(236,253,245,0.4)', backdropFilter:'blur(48px)', WebkitBackdropFilter:'blur(48px)',
          borderTop:'1px solid rgba(255,255,255,0.8)', borderLeft:'1px solid rgba(255,255,255,0.8)',
          borderBottom:'1px solid rgba(255,255,255,0.2)', borderRight:'1px solid rgba(255,255,255,0.2)',
          boxShadow:'0 40px 80px -10px rgba(16,42,25,0.08)',
          display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 32px',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:32 }}>
            <Link href="/"><span style={{ fontFamily:'Newsreader,serif', fontSize:24, fontWeight:700, color:'#735c00' }}>SB Ayurved</span></Link>
            <div style={{ display:'flex', alignItems:'center', gap:24 }} className="hide-mobile">
              {[
                { href:'/products', label:'Shop', active:true },
                { href:'/about', label:'Heritage' },
                { href:'/wellness', label:'Wellness' },
                { href:'/blog', label:'Journal' },
              ].map(n => (
                <Link key={n.href} href={n.href} style={{
                  fontFamily:'Newsreader,serif', fontSize:14, letterSpacing:'-0.01em',
                  color: n.active ? '#735c00' : 'rgba(16,42,25,0.65)',
                  borderBottom: n.active ? '1px solid #735c00' : 'none',
                  transition:'color 0.3s',
                }}>{n.label}</Link>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:20 }}>
            <Link href="/checkout" style={{ color:'#102a19', display:'flex' }}><span className="material-symbols-outlined">shopping_cart</span></Link>
            <Link href="/admin" style={{ color:'#102a19', display:'flex' }}><span className="material-symbols-outlined">person</span></Link>
          </div>
        </nav>

        {/* ═══ MAIN — from Stitch: flex sidebar + grid, pt-32 ═══ */}
        <main style={{ maxWidth:1280, margin:'0 auto', paddingTop:128, paddingBottom:96, padding:'128px 24px 96px', display:'flex', gap:48 }} className="catalog-layout">

          {/* ── LEFT SIDEBAR: Filter Panel ── */}
          {/* From Stitch: w-72 sticky top-32 p-8 rounded-[2.5rem] bg-secondary-container/40 backdrop-blur-3xl glass-border shadow-xl */}
          <aside style={{ width:280, flexShrink:0 }} className="catalog-sidebar">
            <div style={{
              position:'sticky', top:128, padding:32, borderRadius:40,
              background:'rgba(213,227,216,0.4)', backdropFilter:'blur(48px)', WebkitBackdropFilter:'blur(48px)',
              borderTop:'1px solid rgba(255,255,255,0.8)', borderLeft:'1px solid rgba(255,255,255,0.8)',
              borderBottom:'1px solid rgba(255,255,255,0.2)', borderRight:'1px solid rgba(255,255,255,0.2)',
              boxShadow:'0 20px 40px rgba(16,42,25,0.06)',
              display:'flex', flexDirection:'column', gap:40,
            }}>
              {/* Categories — from Stitch: font-newsreader italic heading + list */}
              <div>
                <h3 style={{ fontFamily:'Newsreader,serif', fontSize:20, fontStyle:'italic', color:'#102a19', marginBottom:24 }}>Categories</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {CATEGORIES.map(c => (
                    <button key={c.id} onClick={() => setCategory(c.id)} style={{
                      display:'flex', justifyContent:'space-between', alignItems:'center',
                      background:'none', border:'none', cursor:'pointer', padding:0,
                      fontFamily:'Manrope,sans-serif', fontSize:13, letterSpacing:'0.02em',
                      color: category === c.id ? '#735c00' : 'rgba(16,42,25,0.7)',
                      fontWeight: category === c.id ? 700 : 400,
                      transition:'color 0.2s',
                    }}>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div>
                <h3 style={{ fontFamily:'Newsreader,serif', fontSize:20, fontStyle:'italic', color:'#102a19', marginBottom:16 }}>Search</h3>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." style={{
                  width:'100%', background:'rgba(255,255,255,0.3)', border:'1px solid rgba(255,255,255,0.4)',
                  borderRadius:9999, padding:'10px 16px', fontSize:13, color:'#102a19', outline:'none',
                  fontFamily:'Manrope,sans-serif',
                }} />
              </div>

              {/* Ingredients tags — from Stitch: flex-wrap pill tags */}
              <div>
                <h3 style={{ fontFamily:'Newsreader,serif', fontSize:20, fontStyle:'italic', color:'#102a19', marginBottom:16 }}>Popular</h3>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {['Ashwagandha','Saffron','Tulsi','Moringa','Guggulu','Triphala'].map((tag, i) => (
                    <span key={tag} style={{
                      padding:'8px 16px', borderRadius:9999, fontSize:10,
                      fontFamily:'Manrope,sans-serif', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em',
                      background: i === 1 ? 'rgba(204,168,48,0.1)' : 'rgba(255,255,255,0.3)',
                      border: i === 1 ? '1px solid rgba(204,168,48,0.3)' : '1px solid rgba(16,42,25,0.08)',
                      color: i === 1 ? '#735c00' : 'rgba(16,42,25,0.7)',
                      cursor:'pointer', transition:'all 0.2s',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── RIGHT: Product Grid ── */}
          <section style={{ flex:1, minWidth:0 }}>
            {/* Header — from Stitch: flex justify-between items-end mb-12 */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, flexWrap:'wrap', gap:16 }}>
              <div>
                <h1 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(36px,5vw,52px)', fontWeight:300, letterSpacing:'-0.02em', color:'#102a19' }}>
                  Botanical <span style={{ fontStyle:'italic' }}>Treasury</span>
                </h1>
                <p style={{ fontFamily:'Manrope,sans-serif', fontSize:14, color:'rgba(16,42,25,0.5)', marginTop:8 }}>
                  {total} curated formulations for modern vitality.
                </p>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.15em', color:'rgba(16,42,25,0.4)' }}>Sort by</span>
                <button style={{ fontFamily:'Manrope,sans-serif', fontSize:12, fontWeight:700, color:'#102a19', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center' }}>
                  Newest Arrivals <span className="material-symbols-outlined" style={{ fontSize:16, marginLeft:4 }}>expand_more</span>
                </button>
              </div>
            </div>

            {/* Product Grid — from Stitch: grid-cols-3 gap-y-20 gap-x-8 */}
            {loading ? (
              <div style={{ display:'flex', justifyContent:'center', padding:80 }}>
                <div style={{ width:28, height:28, border:'2px solid rgba(16,42,25,0.1)', borderTopColor:'#735c00', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </div>
            ) : products.length === 0 ? (
              <div style={{ textAlign:'center', padding:80 }}>
                <span className="material-symbols-outlined" style={{ fontSize:48, color:'rgba(16,42,25,0.12)', display:'block', marginBottom:16 }}>search_off</span>
                <p style={{ fontFamily:'Newsreader,serif', fontSize:20, fontStyle:'italic', color:'rgba(16,42,25,0.3)' }}>No products found</p>
              </div>
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'80px 32px' }}>
                {products.map(p => (
                  <div key={p.id} style={{ position:'relative', paddingTop:48 }}>
                    {/* Floating product image — from Stitch: absolute top-0 left-1/2 -translate-x-1/2 w-48 h-64 z-10 */}
                    <div style={{
                      position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
                      width:180, height:200, zIndex:10, transition:'transform 0.7s',
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }} className="product-img-hover">
                      <div style={{
                        width:120, height:120, borderRadius:24,
                        background:'linear-gradient(135deg, rgba(203,234,208,0.4), rgba(213,227,216,0.6))',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        boxShadow:'0 20px 40px rgba(16,42,25,0.1)',
                      }}>
                        <span style={{ fontSize:48 }}>{p.emoji || '🌿'}</span>
                      </div>
                    </div>

                    {/* Card body — from Stitch: bg-secondary-container/30 backdrop-blur-3xl rounded-[2.5rem] p-8 pt-48 glass-border shadow-xl */}
                    <div style={{
                      background:'rgba(213,227,216,0.3)', backdropFilter:'blur(48px)', WebkitBackdropFilter:'blur(48px)',
                      borderRadius:40, padding:'160px 32px 32px',
                      borderTop:'1px solid rgba(255,255,255,0.8)', borderLeft:'1px solid rgba(255,255,255,0.8)',
                      borderBottom:'1px solid rgba(255,255,255,0.2)', borderRight:'1px solid rgba(255,255,255,0.2)',
                      boxShadow:'0 20px 40px rgba(16,42,25,0.06)',
                      display:'flex', flexDirection:'column', height:'100%',
                    }}>
                      <div style={{ flex:1 }}>
                        <h3 style={{ fontFamily:'Newsreader,serif', fontSize:20, color:'#102a19', lineHeight:1.3, marginBottom:4 }}>{p.name}</h3>
                        <p style={{ fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(16,42,25,0.4)', marginTop:4 }}>
                          {p.category || 'Classical Formulation'}
                        </p>
                        {p.is_new && (
                          <span style={{ display:'inline-block', marginTop:8, fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', padding:'3px 10px', borderRadius:9999, background:'rgba(204,168,48,0.1)', color:'#735c00', border:'1px solid rgba(204,168,48,0.2)' }}>New</span>
                        )}
                      </div>

                      {/* Price + CTA — from Stitch: flex items-center justify-between mt-8 */}
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:32 }}>
                        <span style={{ fontFamily:'Manrope,sans-serif', fontWeight:700, color:'#735c00', fontSize:16 }}>
                          ₹{(p.price || 0).toLocaleString('en-IN')}
                        </span>
                        <button onClick={() => addToCart && addToCart(p)} style={{
                          background:'#102a19', color:'#fff',
                          fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700,
                          textTransform:'uppercase', letterSpacing:'0.12em',
                          padding:'12px 24px', borderRadius:9999, border:'1px solid rgba(204,168,48,0.2)',
                          cursor:'pointer', transition:'background 0.3s',
                        }}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:64 }}>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)} style={{
                    width:44, height:44, borderRadius:'50%', border:'none', cursor:'pointer',
                    fontFamily:'Manrope,sans-serif', fontSize:13, fontWeight: page === n ? 700 : 400,
                    background: page === n ? 'linear-gradient(135deg, #cca830, #e9c349)' : 'rgba(213,227,216,0.4)',
                    color: page === n ? '#4f3e00' : '#102a19',
                    boxShadow: page === n ? '0 4px 16px rgba(204,168,48,0.3)' : 'none',
                    transition:'all 0.2s',
                  }}>{n}</button>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Footer — from Stitch product_catalog */}
        <footer style={{ width:'100%', paddingTop:80, paddingBottom:40, background:'#FCFCF9' }}>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'flex-start', gap:40 }}>
            <div style={{ maxWidth:360 }}>
              <span style={{ fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:28, color:'#102a19', display:'block', marginBottom:12 }}>SB Ayurved</span>
              <p style={{ fontSize:13, color:'rgba(16,42,25,0.5)', lineHeight:1.7, maxWidth:320 }}>Crafting authentic Ayurvedic formulations through classical Vaidya wisdom.</p>
              <div style={{ display:'flex', gap:32, marginTop:16 }}>
                {['About','Shipping','Privacy','Terms'].map(t => (
                  <Link key={t} href={t === 'About' ? '/about' : '/terms'} style={{ fontSize:13, color:'rgba(16,42,25,0.5)', transition:'color 0.2s' }}>{t}</Link>
                ))}
              </div>
            </div>
            <div>
              <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.3em', color:'#735c00', display:'block', marginBottom:8 }}>Newsletter</span>
              <div style={{ display:'flex', borderBottom:'1px solid rgba(16,42,25,0.1)', paddingBottom:8 }}>
                <input placeholder="Your Email Address" style={{ background:'transparent', border:'none', outline:'none', fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:16, width:240, color:'#102a19' }} />
                <span className="material-symbols-outlined" style={{ color:'#102a19', cursor:'pointer' }}>arrow_forward</span>
              </div>
            </div>
          </div>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 32px 0', fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(16,42,25,0.3)' }}>
            © 2025 Shree Brahmachaitanya Ayurved. All rights reserved.
          </div>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'20px 32px 0' }}>
            <div style={{ height:3, background:'linear-gradient(to right, rgba(213,227,216,0.4), rgba(204,168,48,0.3), rgba(16,42,25,0.2))', borderRadius:2, opacity:0.4 }} />
          </div>
        </footer>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .catalog-layout { flex-direction: column !important; }
          .catalog-sidebar { width: 100% !important; }
        }
        .product-img-hover:hover { transform: translateX(-50%) translateY(-8px) !important; }
      `}</style>
    </>
  );
}
