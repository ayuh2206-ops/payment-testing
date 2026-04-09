// pages/products.jsx
// ═══ Product Catalog — uses StoreLayout for consistent nav ═══
// Stitch product_catalog: glass sidebar + 3-col product cards with PROMINENT shadows
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import StoreLayout from '@/components/StoreLayout';
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
    <StoreLayout title="Shop" description="Browse 160+ authentic Ayurvedic formulations">
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px 96px', display:'flex', gap:48 }} className="catalog-layout">

        {/* ── SIDEBAR FILTER — glass-sidebar class for proper shadow ── */}
        <aside style={{ width:280, flexShrink:0 }} className="catalog-sidebar">
          <div className="glass-sidebar" style={{
            position:'sticky', top:128, padding:32, borderRadius:40,
            display:'flex', flexDirection:'column', gap:40,
          }}>
            {/* Categories */}
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
                    transition:'color 0.2s', textAlign:'left',
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
                width:'100%', background:'rgba(255,255,255,0.35)', border:'1px solid rgba(255,255,255,0.5)',
                borderRadius:9999, padding:'10px 16px', fontSize:13, color:'#102a19', outline:'none',
              }} />
            </div>

            {/* Ingredient tags — from Stitch: pill tags with gold active state */}
            <div>
              <h3 style={{ fontFamily:'Newsreader,serif', fontSize:20, fontStyle:'italic', color:'#102a19', marginBottom:16 }}>Ingredients</h3>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {['Ashwagandha','Saffron','Tulsi','Moringa','Guggulu','Holy Basil'].map((tag, i) => (
                  <span key={tag} style={{
                    padding:'8px 16px', borderRadius:9999, fontSize:10,
                    fontWeight:500, textTransform:'uppercase', letterSpacing:'0.1em',
                    background: i === 1 ? 'rgba(204,168,48,0.12)' : 'rgba(255,255,255,0.3)',
                    border: i === 1 ? '1px solid rgba(204,168,48,0.35)' : '1px solid rgba(16,42,25,0.08)',
                    color: i === 1 ? '#735c00' : 'rgba(16,42,25,0.65)',
                    cursor:'pointer', transition:'all 0.2s',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── PRODUCT GRID ── */}
        <section style={{ flex:1, minWidth:0 }}>
          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, flexWrap:'wrap', gap:16 }}>
            <div>
              <h1 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(36px,5vw,52px)', fontWeight:300, letterSpacing:'-0.02em', color:'#102a19' }}>
                Botanical <span style={{ fontStyle:'italic' }}>Treasury</span>
              </h1>
              <p style={{ fontSize:14, color:'rgba(16,42,25,0.5)', marginTop:8 }}>
                {total} curated formulations for modern vitality.
              </p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:16 }}>
              <span style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.15em', color:'rgba(16,42,25,0.4)' }}>Sort by</span>
              <button style={{ fontSize:12, fontWeight:700, color:'#102a19', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center' }}>
                Newest Arrivals <span className="material-symbols-outlined" style={{ fontSize:16, marginLeft:4 }}>expand_more</span>
              </button>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div style={{ display:'flex', justifyContent:'center', padding:80 }}>
              <div style={{ width:28, height:28, border:'2px solid rgba(16,42,25,0.1)', borderTopColor:'#735c00', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'80px 32px' }}>
              {products.map(p => (
                <div key={p.id} style={{ position:'relative', paddingTop:48 }}>
                  {/* Floating emoji/image — hovers above card */}
                  <div style={{
                    position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
                    width:180, height:180, zIndex:10,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transition:'transform 0.7s ease',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(-50%) translateY(-8px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateX(-50%)'}
                  >
                    <div style={{
                      width:140, height:140, borderRadius:24,
                      background:'linear-gradient(135deg, rgba(203,234,208,0.45), rgba(213,227,216,0.65))',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      boxShadow:'0 16px 32px rgba(16,42,25,0.1)',
                    }}>
                      <span style={{ fontSize:56 }}>{p.emoji || '🌿'}</span>
                    </div>
                  </div>

                  {/* CARD — uses product-glass-card for PROMINENT shadows */}
                  <div className="product-glass-card" style={{
                    borderRadius:40, padding:'140px 28px 28px',
                    display:'flex', flexDirection:'column', height:'100%',
                  }}>
                    <div style={{ flex:1 }}>
                      <h3 style={{ fontFamily:'Newsreader,serif', fontSize:20, color:'#102a19', lineHeight:1.3, marginBottom:4 }}>{p.name}</h3>
                      <p style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(16,42,25,0.4)', marginTop:4 }}>
                        {p.category || 'Classical Formulation'}
                      </p>
                      {p.is_new && (
                        <span style={{ display:'inline-block', marginTop:8, fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', padding:'3px 10px', borderRadius:9999, background:'rgba(204,168,48,0.12)', color:'#735c00', border:'1px solid rgba(204,168,48,0.25)' }}>New</span>
                      )}
                    </div>

                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:32 }}>
                      <span style={{ fontWeight:700, color:'#735c00', fontSize:16 }}>
                        ₹{(p.price || 0).toLocaleString('en-IN')}
                      </span>
                      <button onClick={() => addToCart && addToCart(p)} style={{
                        background:'#102a19', color:'#fff',
                        fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em',
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
                  fontSize:13, fontWeight: page === n ? 700 : 400,
                  background: page === n ? 'linear-gradient(135deg, #cca830, #e9c349)' : 'rgba(213,227,216,0.4)',
                  color: page === n ? '#4f3e00' : '#102a19',
                  boxShadow: page === n ? '0 4px 16px rgba(204,168,48,0.3)' : 'none',
                  transition:'all 0.2s',
                }}>{n}</button>
              ))}
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .catalog-layout { flex-direction: column !important; }
          .catalog-sidebar { width: 100% !important; }
        }
      `}</style>
    </StoreLayout>
  );
}
