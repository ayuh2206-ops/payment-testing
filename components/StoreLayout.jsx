// components/StoreLayout.jsx
// Shared layout for secondary storefront pages — Botanical Liquid Glass
// Used by: ayuaahar, cosmetics, blog, faq, terms, privacy, wellness, offer-zone, customer portal
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const NAV = [
  { href:'/', label:'Shop' },
  { href:'/about', label:'Heritage' },
  { href:'/ayuaahar', label:'AyuAahar' },
  { href:'/contact', label:'Contact' },
  { href:'/blog', label:'Journal' },
];

export default function StoreLayout({ children, title='SB Ayurved', description='', activeNav='' }) {
  const [mobileOpen, setMobileOpen] = useState(false);

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

        {/* ═══ GLASS NAVBAR ═══ */}
        <nav style={{
          position:'fixed', top:0, left:0, right:0, zIndex:50,
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'16px 40px', maxWidth:1280, margin:'24px auto 0', width:'92%',
          borderRadius:9999,
          background:'rgba(255,255,255,0.4)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
          borderTop:'1.5px solid rgba(255,255,255,0.8)', borderLeft:'1.5px solid rgba(255,255,255,0.8)',
          borderBottom:'1.5px solid rgba(255,255,255,0.4)', borderRight:'1.5px solid rgba(255,255,255,0.4)',
          boxShadow:'0 20px 40px rgba(16,42,25,0.06)',
        }}>
          <Link href="/"><span style={{ fontSize:22, fontFamily:'Newsreader,serif', fontStyle:'italic', color:'#102a19' }}>SB Ayurved</span></Link>
          <div style={{ display:'flex', alignItems:'center', gap:40 }} className="hide-mobile">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} style={{
                fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:500,
                textTransform:'uppercase', letterSpacing:'0.15em',
                color: activeNav === n.label ? '#102a19' : '#424842',
                borderBottom: activeNav === n.label ? '2px solid rgba(16,42,25,0.2)' : 'none',
                paddingBottom:4, transition:'color 0.3s',
              }}>{n.label}</Link>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:24, color:'#102a19' }}>
            <Link href="/checkout"><span className="material-symbols-outlined">shopping_bag</span></Link>
            <Link href="/admin"><span className="material-symbols-outlined">person</span></Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display:'none', background:'none', border:'none', color:'#102a19', cursor:'pointer' }} className="show-mobile-only">
              <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div style={{
            position:'fixed', top:80, left:'50%', transform:'translateX(-50%)',
            width:'90%', maxWidth:400, zIndex:49,
            background:'rgba(249,249,246,0.95)', backdropFilter:'blur(32px)',
            borderRadius:24, padding:'16px 20px',
            boxShadow:'0 20px 40px rgba(16,42,25,0.1)',
            borderTop:'1.5px solid rgba(255,255,255,0.8)', borderLeft:'1.5px solid rgba(255,255,255,0.8)',
          }}>
            {NAV.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)} style={{
                display:'block', fontFamily:'Newsreader,serif', fontSize:16, color:'#102a19',
                padding:'12px 16px', borderRadius:12,
              }}>{n.label}</Link>
            ))}
          </div>
        )}

        {/* ═══ MAIN ═══ */}
        <main style={{ position:'relative', zIndex:1, paddingTop:160, paddingBottom:0 }}>
          {children}
        </main>

        {/* ═══ FOOTER ═══ */}
        <footer style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:48, padding:'96px 32px 48px', background:'#F9F9F6', position:'relative', zIndex:1 }}>
          <span style={{ fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:28, color:'#102a19' }}>SB Ayurved</span>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:48 }}>
            {[{t:'About',h:'/about'},{t:'Products',h:'/wellness'},{t:'AyuAahar',h:'/ayuaahar'},{t:'Contact',h:'/contact'},{t:'Privacy',h:'/privacy'},{t:'Terms',h:'/terms'}].map(l => (
              <Link key={l.h} href={l.h} style={{ fontFamily:'Manrope,sans-serif', color:'#424842', fontSize:14, opacity:0.8, transition:'opacity 0.2s' }}>{l.t}</Link>
            ))}
          </div>
          <p style={{ fontSize:12, color:'#424842', opacity:0.5 }}>© 2025 Shree Brahmachaitanya Ayurved. Rooted in Tradition.</p>
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

// ═══ REUSABLE COMPONENTS ═══

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
      <h1 style={{
        fontFamily:'Newsreader,serif', fontSize:'clamp(36px,6vw,72px)',
        fontWeight:300, fontStyle:'italic', color:'#102a19',
        letterSpacing:'-0.02em', lineHeight:1.1, marginBottom: subtitle ? 16 : 0,
      }}>{title}</h1>
      {subtitle && <p style={{ fontSize:17, color:'#424842', maxWidth:640, margin:'0 auto', lineHeight:1.8 }}>{subtitle}</p>}
    </section>
  );
}

export function GlassCard({ children, style={}, gold=false }) {
  return (
    <div className="liquid-glass" style={{
      borderRadius:40, padding:'clamp(32px,5vw,56px)',
      boxShadow: gold
        ? '0 20px 40px rgba(16,42,25,0.06), inset 0 1px 0 rgba(212,175,55,0.15)'
        : '0 20px 40px rgba(16,42,25,0.06)',
      ...style,
    }}>{children}</div>
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
