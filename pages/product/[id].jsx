// pages/product/[id].jsx
// ═══ Product Detail — matching Stitch product_detail/code.html ═══
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
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
    <div style={{ background:'#FCFCF9', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:28, height:28, border:'2px solid rgba(16,42,25,0.1)', borderTopColor:'#735c00', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const ACCORDIONS = [
    { title:'Botanical Ingredients', content:`Classical Ayurvedic formulation prepared following Shastrokt principles. ${product.description || 'Authentic ingredients sourced from certified suppliers. GMP-compliant manufacturing process.'}` },
    { title:'The Crafting Process', content:'Each batch is prepared by experienced Vaidyas following traditional methods with modern GMP standards. Quality tested at every stage of production.' },
    { title:'Shipping & Returns', content:'Ships within 2-3 business days. Free shipping on orders above ₹500. Unopened products returnable within 7 days.' },
  ];

  return (
    <>
      <Head>
        <title>{product.name} | SB Ayurved</title>
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background:'#FCFCF9', color:'#1a1c1b', minHeight:'100vh' }}>
        {/* Nav */}
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
            <div style={{ display:'flex', gap:24 }} className="hide-mobile">
              {[{h:'/products',l:'Shop',a:true},{h:'/about',l:'Heritage'},{h:'/wellness',l:'Wellness'},{h:'/blog',l:'Journal'}].map(n => (
                <Link key={n.h} href={n.h} style={{ fontFamily:'Newsreader,serif', fontSize:14, color: n.a ? '#735c00' : 'rgba(16,42,25,0.65)', borderBottom: n.a ? '1px solid #735c00' : 'none' }}>{n.l}</Link>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', gap:20 }}>
            <Link href="/checkout" style={{ color:'#102a19', display:'flex' }}><span className="material-symbols-outlined">shopping_cart</span></Link>
            <Link href="/admin" style={{ color:'#102a19', display:'flex' }}><span className="material-symbols-outlined">person</span></Link>
          </div>
        </nav>

        {/* ═══ MAIN — from Stitch: flex items-stretch, split layout ═══ */}
        <main style={{ position:'relative', minHeight:'100vh', display:'flex', paddingTop:96 }} className="pdp-layout">
          {/* Ambient blobs */}
          <div className="botanical-blob" style={{ top:'25%', left:-80, width:384, height:384, background:'rgba(176,206,181,0.3)' }} />
          <div className="botanical-blob" style={{ bottom:'25%', right:-80, width:500, height:500, background:'rgba(213,227,216,0.2)' }} />

          {/* LEFT: Product Image — from Stitch: flex-1 flex items-center justify-center p-20 */}
          <section style={{ flex:1, position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'clamp(32px,5vw,80px)', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:'80%', aspectRatio:'1', background:'rgba(176,206,181,0.3)', borderRadius:'50%', filter:'blur(80px)' }} />
            </div>
            <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:500, transition:'transform 0.7s' }}>
              <div style={{
                width:'100%', aspectRatio:'1', borderRadius:32,
                background:'linear-gradient(135deg, rgba(203,234,208,0.4), rgba(213,227,216,0.6))',
                display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow:'0 60px 100px rgba(16,42,25,0.15)',
              }}>
                <span style={{ fontSize:120 }}>{product.emoji || '🌿'}</span>
              </div>
            </div>
            {/* Floating text — from Stitch: absolute bottom-12 left-12 italic */}
            <div style={{ position:'absolute', bottom:48, left:48, fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:36, color:'rgba(16,42,25,0.15)', lineHeight:1.2 }}>
              Essence of<br />the Earth
            </div>
          </section>

          {/* RIGHT: Info Panel — from Stitch: w-[40%] glass-card rounded-[2.5rem] p-12 shadow-2xl */}
          <section style={{ width:'42%', display:'flex', flexDirection:'column', padding:'16px 32px 16px 0' }} className="pdp-right">
            <div style={{
              background:'rgba(213,227,216,0.4)', backdropFilter:'blur(40px)', WebkitBackdropFilter:'blur(40px)',
              borderTop:'1px solid rgba(255,255,255,0.8)', borderLeft:'1px solid rgba(255,255,255,0.8)',
              borderBottom:'1px solid rgba(255,255,255,0.2)', borderRight:'1px solid rgba(255,255,255,0.2)',
              borderRadius:40, flex:1, display:'flex', flexDirection:'column',
              padding:'clamp(32px,4vw,48px)', boxShadow:'0 25px 50px rgba(16,42,25,0.12)',
            }}>
              {/* Breadcrumb */}
              <nav style={{ display:'flex', gap:8, marginBottom:16, fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.12em', color:'#424842' }}>
                <Link href="/products" style={{ color:'#735c00' }}>Shop</Link>
                <span style={{ color:'#735c00' }}>/</span>
                <span>{product.category || 'Apothecary'}</span>
              </nav>

              {/* Title */}
              <h1 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(36px,5vw,56px)', color:'#102a19', lineHeight:1.1, marginBottom:8 }}>
                {product.name?.split(' ').slice(0, -1).join(' ')} <span style={{ fontStyle:'italic' }}>{product.name?.split(' ').pop()}</span>
              </h1>

              {/* Price + tag */}
              <div style={{ display:'flex', alignItems:'center', gap:16, marginTop:24 }}>
                <span style={{ fontFamily:'Manrope,sans-serif', fontSize:28, color:'#102a19' }}>₹{(product.price || 0).toLocaleString('en-IN')}</span>
                <div style={{ flex:1, height:1, background:'rgba(194,200,192,0.3)' }} />
                {product.is_new && <span style={{ fontSize:10, fontFamily:'Manrope,sans-serif', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', color:'#735c00' }}>New Arrival</span>}
              </div>

              {/* Description */}
              <div style={{ marginTop:40, flex:1, display:'flex', flexDirection:'column', gap:40 }}>
                <section>
                  <h3 style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em', color:'#424842', marginBottom:12 }}>The Product</h3>
                  <p style={{ fontFamily:'Manrope,sans-serif', fontSize:16, lineHeight:1.75, color:'#424842' }}>
                    {product.description || `A classical Ayurvedic formulation from Shree Brahmachaitanya Ayurved. Crafted by experienced Vaidyas following Shastrokt manufacturing principles with GMP-compliant processes.`}
                  </p>
                </section>

                {/* Qty + Add to Cart — from Stitch: flex items-center gap-4 */}
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <div style={{
                    display:'flex', alignItems:'center',
                    background:'rgba(255,255,255,0.4)', borderRadius:9999,
                    border:'1px solid rgba(255,255,255,0.6)', padding:4,
                  }}>
                    <button onClick={() => setQty(Math.max(1, qty-1))} style={{ width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer', color:'#102a19' }}>
                      <span className="material-symbols-outlined" style={{ fontSize:16 }}>remove</span>
                    </button>
                    <span style={{ width:32, textAlign:'center', fontFamily:'Manrope,sans-serif', fontWeight:700 }}>{qty}</span>
                    <button onClick={() => setQty(qty+1)} style={{ width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer', color:'#102a19' }}>
                      <span className="material-symbols-outlined" style={{ fontSize:16 }}>add</span>
                    </button>
                  </div>
                  <button onClick={() => { for(let i=0;i<qty;i++) addToCart && addToCart(product); }} style={{
                    flex:1, background:'#102a19', color:'#fff', borderRadius:9999,
                    padding:'16px 32px', border:'none', fontFamily:'Manrope,sans-serif',
                    fontSize:13, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', gap:12,
                    cursor:'pointer', boxShadow:'0 12px 24px rgba(16,42,25,0.15)', transition:'all 0.3s',
                  }}>
                    Add to Cart
                    <span className="material-symbols-outlined" style={{ fontSize:16, color:'rgba(233,195,73,0.8)' }}>eco</span>
                  </button>
                </div>

                {/* Accordions — from Stitch: space-y-6, border-b border-white/20 */}
                <div style={{ display:'flex', flexDirection:'column', gap:24, paddingTop:24 }}>
                  {ACCORDIONS.map((acc, i) => (
                    <div key={i} style={{ borderBottom:'1px solid rgba(255,255,255,0.2)', paddingBottom:16 }}>
                      <button onClick={() => setOpenAcc(openAcc === i ? null : i)} style={{
                        width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
                        background:'none', border:'none', cursor:'pointer', textAlign:'left',
                      }}>
                        <span style={{ fontFamily:'Newsreader,serif', fontSize:18, color:'#102a19' }}>{acc.title}</span>
                        <span className="material-symbols-outlined" style={{ color:'#424842', transform: openAcc === i ? 'rotate(180deg)' : 'none', transition:'transform 0.3s', fontSize:20 }}>expand_more</span>
                      </button>
                      {openAcc === i && (
                        <p style={{ fontFamily:'Manrope,sans-serif', fontSize:14, color:'#424842', lineHeight:1.75, marginTop:16 }}>{acc.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer badge — from Stitch: sustainability */}
              <footer style={{ marginTop:48, display:'flex', gap:16, alignItems:'center' }}>
                <div style={{ width:32, height:32, borderRadius:8, background:'rgba(203,234,208,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize:16, color:'#102a19' }}>eco</span>
                </div>
                <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(66,72,66,0.5)' }}>Authentically Sourced · GMP Certified</span>
              </footer>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer style={{ width:'100%', paddingTop:160, paddingBottom:40, background:'#FCFCF9' }}>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'flex-end', gap:48 }}>
            <div>
              <h2 style={{ fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:36, color:'#102a19', marginBottom:24 }}>SB Ayurved</h2>
              <p style={{ fontSize:13, color:'rgba(16,42,25,0.5)', maxWidth:320, lineHeight:1.7 }}>Bridging the ancient science of Ayurveda with authentic manufacturing. Every formulation is a testament to Vaidya wisdom.</p>
            </div>
            <div style={{ display:'flex', gap:64, fontFamily:'Manrope,sans-serif', fontSize:12, textTransform:'uppercase', letterSpacing:'0.12em' }}>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <Link href="/about" style={{ color:'rgba(16,42,25,0.5)' }}>About</Link>
                <Link href="/terms" style={{ color:'rgba(16,42,25,0.5)' }}>Shipping</Link>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <Link href="/privacy" style={{ color:'rgba(16,42,25,0.5)' }}>Privacy</Link>
                <Link href="/terms" style={{ color:'rgba(16,42,25,0.5)' }}>Terms</Link>
              </div>
            </div>
          </div>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'80px 32px 0', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(16,42,25,0.35)', borderTop:'1px solid rgba(16,42,25,0.05)' }}>
            <span>© 2025 SB Ayurved. All rights reserved.</span>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize:14 }}>eco</span>
              <span>Crafted in Heritage</span>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .pdp-layout { flex-direction: column !important; padding-top: 128px !important; }
          .pdp-right { width: 100% !important; padding: 16px !important; }
        }
      `}</style>
    </>
  );
}
