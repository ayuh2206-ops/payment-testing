// pages/index.jsx
// ═══ Home — uses StoreLayout for consistent nav ═══
import { useState, useEffect } from 'react';
import Link from 'next/link';
import StoreLayout from '@/components/StoreLayout';
import { useCart } from '@/components/CartContext';

const CATEGORIES = [
  { title:'Proprietary Special', sub:'Tested & trusted formulations from senior Vaidyas for everyday Ayurvedic practice.', href:'/products', icon:'science' },
  { title:'AyuAahar Range', sub:'Ayurvedic food products — sattu, peya, yush — following Pathya Kalpana dietics.', href:'/ayuaahar', icon:'restaurant' },
  { title:'Samaayu Cosmetics', sub:'Pure botanical beauty — face, body, hair care rooted in Ayurvedic wisdom.', href:'/cosmetics', icon:'spa' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/products?limit=6').then(r => r.json()).then(d => setProducts(d.products || [])).catch(() => {});
  }, []);

  return (
    <StoreLayout title="Ancient Wisdom for the Modern Vaidya" description="Quality Ayurvedic medicines from Shree Brahmachaitanya Ayurved. 160+ formulations.">

      {/* ═══ HERO ═══ */}
      <section style={{ position:'relative', minHeight:620, display:'flex', alignItems:'center', marginBottom:128, maxWidth:1400, margin:'0 auto 128px', padding:'0 16px' }}>
        {/* Right image */}
        <div style={{ position:'absolute', right:0, top:0, width:'63%', height:'100%', overflow:'hidden', borderRadius:64 }} className="hide-mobile">
          <div style={{ position:'absolute', inset:0, background:'rgba(176,206,181,0.5)', filter:'blur(80px)', transform:'translate(25%,-25%)', borderRadius:'50%' }} />
          <img src="https://images.unsplash.com/photo-1611241893603-3c228ee0ae6f?w=1200&q=80" alt="Ayurvedic botanicals" style={{ width:'100%', height:'100%', objectFit:'cover', mixBlendMode:'multiply', opacity:0.85, transform:'scale(1.1)' }} />
        </div>

        {/* Floating glass card */}
        <div className="liquid-glass" style={{ position:'relative', zIndex:10, maxWidth:580, padding:'clamp(32px,5vw,64px)', borderRadius:48 }}>
          <span style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.3em', color:'#735c00', display:'block', marginBottom:24 }}>Shree Brahmachaitanya Ayurved</span>
          <h1 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(36px,6vw,64px)', fontWeight:700, color:'#102a19', lineHeight:1.1, letterSpacing:'-0.02em', marginBottom:32 }}>
            Ancient Wisdom, crafted for the <span style={{ fontStyle:'italic', fontWeight:400 }}>Modern Vaidya.</span>
          </h1>
          <p style={{ fontSize:17, color:'#546159', lineHeight:1.7, marginBottom:40, maxWidth:460 }}>
            Quality, effective and affordable classical Ayurvedic medicines — 160+ formulations from experienced Vaidyas, for the goodness of society.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:16 }}>
            <Link href="/products" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#102a19', color:'#fff', padding:'16px 36px', borderRadius:9999, fontSize:14, fontWeight:600, boxShadow:'0 12px 24px rgba(16,42,25,0.15)' }}>
              Shop Collection <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_forward</span>
            </Link>
            <Link href="/about" style={{ display:'inline-flex', alignItems:'center', padding:'16px 36px', borderRadius:9999, fontSize:14, fontWeight:600, color:'#001406', border:'1px solid rgba(0,20,6,0.1)' }}>Our Story</Link>
          </div>
        </div>
      </section>

      {/* ═══ COLLECTIONS ═══ */}
      <section style={{ marginBottom:128, maxWidth:1400, margin:'0 auto 128px', padding:'0 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:64, flexWrap:'wrap', gap:16 }}>
          <div>
            <h2 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(32px,5vw,52px)', color:'#102a19', marginBottom:12 }}>Curated <span style={{ fontStyle:'italic' }}>Collections</span></h2>
            <p style={{ color:'#546159', maxWidth:400 }}>Authentic Ayurvedic formulations for specific wellness goals.</p>
          </div>
          <Link href="/products" style={{ color:'#735c00', fontWeight:700, borderBottom:'1px solid #735c00', paddingBottom:4 }}>View All Collections</Link>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:40 }}>
          {CATEGORIES.map((cat, i) => (
            <Link href={cat.href} key={i} style={{ textDecoration:'none', position:'relative', paddingTop:48 }}>
              <div style={{ position:'absolute', top:0, right:32, width:160, height:160, background: i===1 ? 'rgba(255,224,136,0.2)' : 'rgba(203,234,208,0.3)', borderRadius:'50%', filter:'blur(48px)' }} />
              <div className="product-glass-card" style={{ padding:32, borderRadius:40, height:'100%', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
                <div style={{ width:100, height:100, borderRadius:24, marginBottom:24, marginTop:-16, background: i===0 ? 'linear-gradient(135deg,#cbead0,#b0ceb5)' : i===1 ? 'linear-gradient(135deg,#ffe088,#e9c349)' : 'linear-gradient(135deg,#d5e3d8,#cbead0)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 12px 24px rgba(16,42,25,0.1)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize:36, color:'#102a19' }}>{cat.icon}</span>
                </div>
                <h3 style={{ fontFamily:'Newsreader,serif', fontSize:22, fontWeight:700, color:'#102a19', marginBottom:8 }}>{cat.title}</h3>
                <p style={{ fontSize:13, color:'#546159', lineHeight:1.7, padding:'0 12px', marginBottom:24 }}>{cat.sub}</p>
                <span style={{ marginTop:'auto', color:'#735c00', fontWeight:700, letterSpacing:'0.15em', fontSize:11, textTransform:'uppercase', display:'flex', alignItems:'center', gap:4 }}>
                  Explore <span className="material-symbols-outlined" style={{ fontSize:14 }}>trending_flat</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      {products.length > 0 && (
        <section style={{ marginBottom:128, maxWidth:1400, margin:'0 auto 128px', padding:'0 24px' }}>
          <div style={{ marginBottom:48 }}>
            <span style={{ fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.3em', color:'#735c00', display:'block', marginBottom:8 }}>Best Sellers</span>
            <h2 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(28px,4vw,42px)', color:'#102a19' }}>Botanical <span style={{ fontStyle:'italic' }}>Treasury</span></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:24 }}>
            {products.slice(0, 6).map(p => (
              <div key={p.id} className="product-glass-card" style={{ borderRadius:32, padding:24, display:'flex', flexDirection:'column' }}>
                <div style={{ width:'100%', aspectRatio:'1', borderRadius:20, marginBottom:16, background:'linear-gradient(135deg, rgba(213,227,216,0.4), rgba(203,234,208,0.3))', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:48 }}>{p.emoji || '🌿'}</span>
                </div>
                <h3 style={{ fontFamily:'Newsreader,serif', fontSize:18, color:'#102a19', marginBottom:4 }}>{p.name}</h3>
                <p style={{ fontSize:10, color:'rgba(16,42,25,0.4)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:16 }}>{p.category}</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto' }}>
                  <span style={{ fontFamily:'Newsreader,serif', fontSize:20, color:'#102a19' }}>₹{(p.price||0).toLocaleString('en-IN')}</span>
                  <button onClick={() => addToCart && addToCart(p)} style={{ background:'#102a19', color:'#fff', padding:'10px 20px', borderRadius:9999, border:'none', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', cursor:'pointer' }}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══ BENTO PHILOSOPHY ═══ */}
      <section style={{ marginBottom:128, maxWidth:1400, margin:'0 auto 128px', padding:'0 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'7fr 5fr', gap:32, minHeight:480 }} className="bento-grid">
          <div className="liquid-glass" style={{ borderRadius:48, padding:'clamp(32px,5vw,48px)', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', bottom:0, right:0, width:'100%', height:'100%', transform:'translate(50%,50%)', background:'rgba(213,227,216,0.3)', borderRadius:'50%', filter:'blur(100px)', zIndex:0 }} />
            <h3 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(28px,4vw,44px)', fontWeight:700, color:'#102a19', marginBottom:24, lineHeight:1.15, position:'relative', zIndex:1 }}>
              "Of the Vaidya, By the Vaidya, For the Vaidya."
            </h3>
            <p style={{ fontSize:17, color:'#546159', lineHeight:1.75, marginBottom:32, maxWidth:480, position:'relative', zIndex:1 }}>
              Started by Ayurvedic physicians to bring quality, authentic and affordable classical medicines to every practitioner — including rare preparations no other company manufactures.
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:48, position:'relative', zIndex:1 }}>
              {[{ val:'160+', label:'Formulations' },{ val:'Zero', label:'Synthetic Ingredients' },{ val:'GMP', label:'Certified' }].map(s => (
                <div key={s.label}>
                  <span style={{ fontFamily:'Newsreader,serif', fontSize:28, fontWeight:700, color:'#735c00', display:'block' }}>{s.val}</span>
                  <span style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em', color:'#546159' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius:48, overflow:'hidden', position:'relative', background:'linear-gradient(135deg,#102a19,#1a4028)' }}>
            <img src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80" alt="Ayurvedic herbs" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.85 }} />
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'40%', background:'linear-gradient(to top, rgba(16,42,25,0.8), transparent)' }} />
            <div style={{ position:'absolute', bottom:32, left:32, right:32, color:'#fff', fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:18, lineHeight:1.6 }}>
              "May Lord Dhanvantari shower his blessings to extend Ayurvedic service worldwide."
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ marginBottom:80, maxWidth:1400, margin:'0 auto 80px', padding:'0 24px' }}>
        <div style={{ background:'linear-gradient(135deg,#102a19,#1a4028)', borderRadius:48, padding:'clamp(40px,6vw,64px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:'-20%', right:'-5%', width:300, height:300, background:'rgba(212,175,55,0.1)', filter:'blur(80px)', borderRadius:'50%' }} />
          <div style={{ position:'absolute', bottom:'-20%', left:'5%', width:250, height:250, background:'rgba(176,206,181,0.08)', filter:'blur(80px)', borderRadius:'50%' }} />
          <span style={{ fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.3em', color:'#e9c349', display:'block', marginBottom:16, position:'relative' }}>Free Consultation</span>
          <h3 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:400, color:'#fff', marginBottom:20, position:'relative' }}>
            Connect with our <span style={{ fontStyle:'italic', color:'#e9c349' }}>Vaidya Team</span>
          </h3>
          <p style={{ fontSize:14, color:'rgba(255,255,255,0.6)', maxWidth:480, margin:'0 auto 28px', position:'relative' }}>Personalized guidance on Ayurvedic formulations for your practice or wellness needs.</p>
          <Link href="/contact" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#D4AF37,#e9c349)', color:'#102a19', padding:'16px 36px', borderRadius:9999, fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.15em', boxShadow:'0 8px 24px rgba(212,175,55,0.4)', position:'relative' }}>
            Get in Touch <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_forward</span>
          </Link>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .bento-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </StoreLayout>
  );
}
