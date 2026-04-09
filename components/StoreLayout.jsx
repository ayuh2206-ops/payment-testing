// components/StoreLayout.jsx
// ═══ Shared layout — Botanical Liquid Glass ═══
// CONSISTENT NAV across all pages: Shop | Heritage | AyuAahar | Wellness | Journal | Contact
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const NAV = [
  { href:'/products', label:'Shop' },
  { href:'/about', label:'Heritage' },
  { href:'/ayuaahar', label:'AyuAahar' },
  { href:'/wellness', label:'Wellness' },
  { href:'/blog', label:'Journal' },
  { href:'/contact', label:'Contact' },
];

export default function StoreLayout({ children, title='SB Ayurved', description='' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title} | Shree Brahmachaitanya Ayurved</title>
        {description && <meta name="description" content={description} />}
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background:'#FCFCF9', color:'#1a1c1b', minHeight:'100vh', overflow:'hidden', position:'relative' }}>
        {/* ═══ ATMOSPHERIC BLOBS ═══ */}
        <div className="botanical-blob" style={{ top:'-10%', left:'-10%', width:'50vw', height:'50vw', background:'rgba(203,234,208,0.3)' }} />
        <div className="botanical-blob" style={{ bottom:'-10%', right:'-10%', width:'55vw', height:'55vw', background:'rgba(187,203,187,0.2)' }} />
        <div className="botanical-blob" style={{ top:'35%', right:'5%', width:'35vw', height:'35vw', background:'rgba(222,228,221,0.35)' }} />

        {/* ═══ GLASS NAVBAR — consistent across ALL pages ═══ */}
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
              {NAV.map(n => {
                const isActive = router.pathname === n.href || (n.href === '/products' && router.pathname === '/');
                return (
                  <Link key={n.href} href={n.href} style={{
                    fontFamily:'Newsreader,serif', fontSize:14, letterSpacing:'-0.01em',
                    color: isActive ? '#735c00' : 'rgba(16,42,25,0.65)',
                    borderBottom: isActive ? '1px solid #735c00' : 'none',
                    transition:'color 0.3s',
                  }}>{n.label}</Link>
                );
              })}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:20 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.2)', padding:'6px 16px', borderRadius:9999, border:'1px solid rgba(255,255,255,0.4)' }} className="hide-mobile">
              <span className="material-symbols-outlined" style={{ fontSize:16, color:'rgba(16,42,25,0.4)' }}>search</span>
              <input placeholder="Search..." style={{ background:'transparent', border:'none', outline:'none', fontSize:13, width:100, color:'#1a1c1b' }} />
            </div>
            <Link href="/checkout" style={{ color:'#102a19', display:'flex' }}><span className="material-symbols-outlined">shopping_cart</span></Link>
            <Link href="/admin" style={{ color:'#102a19', display:'flex' }}><span className="material-symbols-outlined">person</span></Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display:'none', background:'none', border:'none', color:'#102a19', cursor:'pointer' }} className="show-mobile-only">
              <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div style={{ position:'fixed', top:80, left:'50%', transform:'translateX(-50%)', width:'90%', maxWidth:400, zIndex:49, background:'rgba(249,249,246,0.95)', backdropFilter:'blur(32px)', borderRadius:24, padding:'16px 20px', boxShadow:'0 20px 40px rgba(16,42,25,0.1)', borderTop:'1.5px solid rgba(255,255,255,0.8)' }}>
            {NAV.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)} style={{ display:'block', fontFamily:'Newsreader,serif', fontSize:16, color:'#102a19', padding:'12px 16px', borderRadius:12 }}>{n.label}</Link>
            ))}
          </div>
        )}

        <main style={{ position:'relative', zIndex:1, paddingTop:128 }}>{children}</main>

        {/* ═══ FOOTER — from Stitch with newsletter ═══ */}
        <footer style={{ width:'100%', paddingTop:80, paddingBottom:40, background:'#FCFCF9', position:'relative', zIndex:1 }}>
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:384, background:'linear-gradient(to top, rgba(213,227,216,0.2), transparent)', zIndex:0 }} />
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', position:'relative', zIndex:1 }}>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'flex-start', gap:40, marginBottom:48 }}>
              <div style={{ maxWidth:320 }}>
                <span style={{ fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:28, color:'#102a19', display:'block', marginBottom:12 }}>SB Ayurved</span>
                <p style={{ fontSize:13, color:'rgba(16,42,25,0.5)', lineHeight:1.7 }}>Crafting authentic Ayurvedic formulations through the intersection of classical Vaidya wisdom and modern manufacturing.</p>
                <div style={{ display:'flex', gap:32, marginTop:20 }}>
                  {[{t:'About',h:'/about'},{t:'Shipping',h:'/terms'},{t:'Privacy',h:'/privacy'},{t:'Terms',h:'/terms'}].map(l => (
                    <Link key={l.t} href={l.h} style={{ fontSize:13, color:'rgba(16,42,25,0.5)', transition:'color 0.2s' }}>{l.t}</Link>
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
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(16,42,25,0.35)', borderTop:'1px solid rgba(16,42,25,0.06)', paddingTop:20 }}>
              <span>© 2025 Shree Brahmachaitanya Ayurved. All rights reserved.</span>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span className="material-symbols-outlined" style={{ fontSize:14 }}>eco</span>
                <span>Rooted in Tradition</span>
              </div>
            </div>
            {/* Bottom gradient bar — from Stitch product_catalog footer */}
            <div style={{ marginTop:20, height:3, background:'linear-gradient(to right, rgba(213,227,216,0.4), rgba(204,168,48,0.3), rgba(16,42,25,0.2))', borderRadius:2, opacity:0.5 }} />
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-only { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}

export function PageHero({ title, breadcrumb, subtitle }) {
  return (
    <section style={{ maxWidth:960, margin:'0 auto', textAlign:'center', padding:'0 24px', marginBottom:64 }}>
      {breadcrumb && (
        <div style={{ display:'flex', justifyContent:'center', gap:8, alignItems:'center', marginBottom:16 }}>
          <Link href="/" style={{ fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.15em', color:'#735c00' }}>Home</Link>
          <span style={{ fontSize:10, color:'#c2c8c0' }}>›</span>
          <span style={{ fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.15em', color:'#424842' }}>{breadcrumb}</span>
        </div>
      )}
      <h1 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(36px,6vw,72px)', fontWeight:300, fontStyle:'italic', color:'#102a19', letterSpacing:'-0.02em', lineHeight:1.1, marginBottom: subtitle ? 16 : 0 }}>{title}</h1>
      {subtitle && <p style={{ fontSize:17, color:'#424842', maxWidth:640, margin:'0 auto', lineHeight:1.8 }}>{subtitle}</p>}
    </section>
  );
}

export function GlassCard({ children, style={}, gold=false }) {
  return (
    <div className="liquid-glass" style={{ borderRadius:40, padding:'clamp(32px,5vw,56px)', boxShadow: gold ? '0 20px 40px rgba(16,42,25,0.06), inset 0 1px 0 rgba(212,175,55,0.15)' : '0 20px 40px rgba(16,42,25,0.06)', ...style }}>{children}</div>
  );
}

export function SectionHeading({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom:48 }}>
      {label && <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.3em', color:'#735c00', display:'block', marginBottom:12 }}>{label}</span>}
      <h2 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(28px,4vw,48px)', fontWeight:300, color:'#102a19', letterSpacing:'-0.02em', lineHeight:1.15 }}>{title}</h2>
      {subtitle && <p style={{ fontSize:15, color:'#424842', maxWidth:560, lineHeight:1.7, marginTop:8 }}>{subtitle}</p>}
    </div>
  );
}
