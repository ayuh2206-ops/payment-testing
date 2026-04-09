// pages/product/[id].jsx
// ═══ Product Detail — uses StoreLayout for consistent nav ═══
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import StoreLayout from '@/components/StoreLayout';
import { useCart } from '@/components/CartContext';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products?search=${id}&limit=1`)
      .then(r => r.json())
      .then(d => { if (d.products?.length) setProduct(d.products[0]); })
      .catch(() => {});
  }, [id]);

  if (!product) return (
    <StoreLayout title="Loading...">
      <div style={{ display:'flex', justifyContent:'center', padding:120 }}>
        <div style={{ width:28, height:28, border:'2px solid rgba(16,42,25,0.1)', borderTopColor:'#735c00', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </StoreLayout>
  );

  const ACCORDIONS = [
    { title:'Botanical Ingredients', content: product.description || 'Classical Ayurvedic formulation prepared following Shastrokt principles. Authentic ingredients sourced from certified suppliers.' },
    { title:'The Crafting Process', content:'Each batch is prepared by experienced Vaidyas following traditional methods with modern GMP standards. Quality tested at every stage.' },
    { title:'Shipping & Returns', content:'Ships within 2-3 business days. Free shipping on orders above ₹500. Unopened products returnable within 7 days.' },
  ];

  return (
    <StoreLayout title={product.name} description={product.description || 'Authentic Ayurvedic formulation'} noFooter>
      {/* Split layout — from Stitch product_detail */}
      <div style={{ display:'flex', minHeight:'calc(100vh - 128px)' }} className="pdp-layout">
        {/* Ambient blobs — extra for this page */}
        <div className="botanical-blob" style={{ top:'25%', left:-80, width:384, height:384, background:'rgba(176,206,181,0.35)' }} />
        <div className="botanical-blob" style={{ bottom:'25%', right:-80, width:500, height:500, background:'rgba(213,227,216,0.25)' }} />

        {/* LEFT: Product Image */}
        <section style={{ flex:1, position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'clamp(32px,5vw,80px)', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:'80%', aspectRatio:'1', background:'rgba(176,206,181,0.35)', borderRadius:'50%', filter:'blur(80px)' }} />
          </div>
          <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:420 }}>
            <div style={{
              width:'100%', aspectRatio:'1', borderRadius:32,
              background:'linear-gradient(135deg, rgba(203,234,208,0.45), rgba(213,227,216,0.65))',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 60px 100px rgba(16,42,25,0.12)',
            }}>
              <span style={{ fontSize:120 }}>{product.emoji || '🌿'}</span>
            </div>
          </div>
          <div style={{ position:'absolute', bottom:48, left:48, fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:36, color:'rgba(16,42,25,0.12)', lineHeight:1.2 }}>
            Essence of<br />the Earth
          </div>
        </section>

        {/* RIGHT: Glass Info Panel — from Stitch: glass-card rounded-[2.5rem] */}
        <section style={{ width:'42%', display:'flex', flexDirection:'column', padding:'16px 32px 16px 0' }} className="pdp-right">
          <div className="glass-card" style={{
            borderRadius:40, flex:1, display:'flex', flexDirection:'column',
            padding:'clamp(32px,4vw,48px)',
          }}>
            {/* Breadcrumb */}
            <nav style={{ display:'flex', gap:8, marginBottom:16, fontSize:10, textTransform:'uppercase', letterSpacing:'0.12em', color:'#424842' }}>
              <Link href="/products" style={{ color:'#735c00' }}>Shop</Link>
              <span style={{ color:'#735c00' }}>/</span>
              <span>{product.category || 'Apothecary'}</span>
            </nav>

            <h1 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(36px,5vw,56px)', color:'#102a19', lineHeight:1.1, marginBottom:8 }}>
              {product.name}
            </h1>

            {/* Price + tag */}
            <div style={{ display:'flex', alignItems:'center', gap:16, marginTop:24 }}>
              <span style={{ fontSize:28, color:'#102a19' }}>₹{(product.price || 0).toLocaleString('en-IN')}</span>
              <div style={{ flex:1, height:1, background:'rgba(194,200,192,0.3)' }} />
              {product.is_new && <span style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', color:'#735c00' }}>New Arrival</span>}
            </div>

            <div style={{ marginTop:40, flex:1, display:'flex', flexDirection:'column', gap:40 }}>
              {/* Description */}
              <section>
                <h3 style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em', color:'#424842', marginBottom:12 }}>The Product</h3>
                <p style={{ fontSize:16, lineHeight:1.75, color:'#424842' }}>
                  {product.description || 'A classical Ayurvedic formulation from Shree Brahmachaitanya Ayurved. Crafted by experienced Vaidyas following Shastrokt manufacturing principles with GMP-compliant processes.'}
                </p>
              </section>

              {/* Qty + Add to Cart */}
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                <div className="liquid-glass" style={{ display:'flex', alignItems:'center', borderRadius:9999, padding:4, boxShadow:'none' }}>
                  <button onClick={() => setQty(Math.max(1, qty-1))} style={{ width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer', color:'#102a19' }}>
                    <span className="material-symbols-outlined" style={{ fontSize:16 }}>remove</span>
                  </button>
                  <span style={{ width:32, textAlign:'center', fontWeight:700 }}>{qty}</span>
                  <button onClick={() => setQty(qty+1)} style={{ width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer', color:'#102a19' }}>
                    <span className="material-symbols-outlined" style={{ fontSize:16 }}>add</span>
                  </button>
                </div>
                <button onClick={() => { for(let i=0;i<qty;i++) addToCart && addToCart(product); }} style={{
                  flex:1, background:'#102a19', color:'#fff', borderRadius:9999,
                  padding:'16px 32px', border:'none', fontSize:13, fontWeight:700,
                  display:'flex', alignItems:'center', justifyContent:'center', gap:12,
                  cursor:'pointer', boxShadow:'0 12px 24px rgba(16,42,25,0.15)', transition:'all 0.3s',
                }}>
                  Add to Cart
                  <span className="material-symbols-outlined" style={{ fontSize:16, color:'rgba(233,195,73,0.8)' }}>eco</span>
                </button>
              </div>

              {/* Accordions */}
              <div style={{ display:'flex', flexDirection:'column', gap:24, paddingTop:24 }}>
                {ACCORDIONS.map((acc, i) => (
                  <div key={i} style={{ borderBottom:'1px solid rgba(255,255,255,0.2)', paddingBottom:16 }}>
                    <button onClick={() => setOpenAcc(openAcc===i?null:i)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
                      <span style={{ fontFamily:'Newsreader,serif', fontSize:18, color:'#102a19' }}>{acc.title}</span>
                      <span className="material-symbols-outlined" style={{ color:'#424842', transform:openAcc===i?'rotate(180deg)':'none', transition:'transform 0.3s', fontSize:20 }}>expand_more</span>
                    </button>
                    {openAcc===i && <p style={{ fontSize:14, color:'#424842', lineHeight:1.75, marginTop:16 }}>{acc.content}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer badge */}
            <footer style={{ marginTop:48, display:'flex', gap:16, alignItems:'center' }}>
              <div style={{ width:32, height:32, borderRadius:8, background:'rgba(203,234,208,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize:16, color:'#102a19' }}>eco</span>
              </div>
              <span style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(66,72,66,0.5)' }}>Authentically Sourced · GMP Certified</span>
            </footer>
          </div>
        </section>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .pdp-layout { flex-direction: column !important; }
          .pdp-right { width: 100% !important; padding: 16px !important; }
        }
      `}</style>
    </StoreLayout>
  );
}
