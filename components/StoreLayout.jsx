// components/StoreLayout.jsx
// Shared layout for all storefront pages — Botanical Liquid Glass design system
// Atmospheric green blobs + glassmorphic navbar + editorial footer + gold accents
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About Us' },
  { href: '/ayuaahar',   label: 'AyuAahar' },
  { href: '/cosmetics',  label: 'Cosmetics' },
  { href: '/contact',    label: 'Contact' },
  { href: '/blog',       label: 'Journal' },
  { href: '/offer-zone', label: 'Offers' },
];

const FOOTER_INFO = [
  { href: '/about',   label: 'About Us' },
  { href: '/',        label: 'Products' },
  { href: '/ayuaahar',label: 'AyuAahar' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/blog',    label: 'Blog' },
];

const FOOTER_LEGAL = [
  { href: '/privacy',  label: 'Privacy Policy' },
  { href: '/terms',    label: 'Terms & Conditions' },
  { href: '/faq',      label: "FAQ's" },
];

export default function StoreLayout({ children, title = 'SB Ayurved', description = '' }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title} | Shree Brahmachaitanya Ayurved</title>
        {description && <meta name="description" content={description} />}
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ fontFamily:'Manrope,sans-serif', background:'#FCFCF9', color:'#1a1c1b', minHeight:'100vh', overflowX:'hidden', position:'relative' }}>

        {/* ═══ ATMOSPHERIC GREEN GRADIENT BLOBS ═══ */}
        <div style={{ position:'fixed', top:'-12%', left:'-8%', width:'50vw', height:'50vw', background:'rgba(203,234,208,0.3)', filter:'blur(120px)', borderRadius:'50%', pointerEvents:'none', zIndex:0 }} />
        <div style={{ position:'fixed', bottom:'-15%', right:'-8%', width:'55vw', height:'55vw', background:'rgba(176,206,181,0.2)', filter:'blur(120px)', borderRadius:'50%', pointerEvents:'none', zIndex:0 }} />
        <div style={{ position:'fixed', top:'35%', right:'5%', width:'35vw', height:'35vw', background:'rgba(213,227,216,0.25)', filter:'blur(120px)', borderRadius:'50%', pointerEvents:'none', zIndex:0 }} />
        <div style={{ position:'fixed', top:'60%', left:'10%', width:'25vw', height:'25vw', background:'rgba(233,195,73,0.04)', filter:'blur(100px)', borderRadius:'50%', pointerEvents:'none', zIndex:0 }} />

        {/* ═══ GLASSMORPHIC NAVBAR ═══ */}
        <nav style={{
          position:'fixed', top:16, left:'50%', transform:'translateX(-50%)',
          width:'94%', maxWidth:1200, zIndex:50,
          background:'rgba(240,248,241,0.45)',
          backdropFilter:'blur(32px)', WebkitBackdropFilter:'blur(32px)',
          borderTop:'1.5px solid rgba(255,255,255,0.8)',
          borderLeft:'1.5px solid rgba(255,255,255,0.8)',
          borderBottom:'1.5px solid rgba(255,255,255,0.25)',
          borderRight:'1.5px solid rgba(255,255,255,0.25)',
          boxShadow:'0 30px 60px -10px rgba(16,42,25,0.08)',
          borderRadius:9999, display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'10px 28px',
        }}>
          {/* Brand */}
          <Link href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontFamily:'Newsreader,serif', fontSize:22, fontWeight:700, fontStyle:'italic', color:'#D4AF37', letterSpacing:'-0.02em' }}>
              SB Ayurved
            </span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display:'flex', alignItems:'center', gap:28 }} className="hide-mobile">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{
                fontFamily:'Newsreader,serif', fontSize:14, letterSpacing:'-0.01em',
                color:'rgba(16,42,25,0.65)', textDecoration:'none',
                transition:'color 0.3s',
              }}
                onMouseEnter={e => e.target.style.color = '#D4AF37'}
                onMouseLeave={e => e.target.style.color = 'rgba(16,42,25,0.65)'}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <Link href="/" style={{ color:'#102A19', display:'flex' }}>
              <span className="material-symbols-outlined" style={{ fontSize:22 }}>shopping_bag</span>
            </Link>
            <Link href="/admin" style={{ color:'#102A19', display:'flex' }}>
              <span className="material-symbols-outlined" style={{ fontSize:22 }}>person</span>
            </Link>
            {/* Mobile burger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display:'none', background:'none', border:'none', color:'#102A19', cursor:'pointer' }} className="show-mobile-only">
              <span className="material-symbols-outlined" style={{ fontSize:24 }}>{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div style={{
            position:'fixed', top:72, left:'50%', transform:'translateX(-50%)',
            width:'90%', maxWidth:400, zIndex:49,
            background:'rgba(240,248,241,0.92)',
            backdropFilter:'blur(32px)', WebkitBackdropFilter:'blur(32px)',
            borderRadius:24, padding:'20px 24px',
            boxShadow:'0 20px 40px rgba(16,42,25,0.1)',
            borderTop:'1.5px solid rgba(255,255,255,0.8)',
            borderLeft:'1.5px solid rgba(255,255,255,0.8)',
            display:'flex', flexDirection:'column', gap:4,
          }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                fontFamily:'Newsreader,serif', fontSize:16, color:'#102A19', textDecoration:'none',
                padding:'10px 12px', borderRadius:12, transition:'background 0.2s',
              }}
                onMouseEnter={e => e.target.style.background = 'rgba(212,175,55,0.08)'}
                onMouseLeave={e => e.target.style.background = 'transparent'}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}

        {/* ═══ MAIN CONTENT ═══ */}
        <main style={{ position:'relative', zIndex:1, paddingTop:100 }}>
          {children}
        </main>

        {/* ═══ FOOTER ═══ */}
        <footer style={{
          position:'relative', zIndex:1,
          paddingTop:80, paddingBottom:40,
          background:'linear-gradient(180deg, transparent 0%, rgba(213,227,216,0.2) 40%, rgba(16,42,25,0.06) 100%)',
        }}>
          <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px' }}>
            {/* Top row */}
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1.5fr', gap:40, marginBottom:48 }} className="footer-grid">
              {/* Brand col */}
              <div>
                <span style={{ fontFamily:'Newsreader,serif', fontSize:26, fontStyle:'italic', fontWeight:700, color:'#D4AF37', display:'block', marginBottom:12 }}>
                  SB Ayurved
                </span>
                <p style={{ fontFamily:'Newsreader,serif', fontSize:14, fontStyle:'italic', color:'rgba(16,42,25,0.5)', lineHeight:1.7 }}>
                  Of the Vaidya, By the Vaidya, For the Vaidya
                </p>
                <div style={{ display:'flex', gap:10, marginTop:16 }}>
                  <a href="https://www.facebook.com/SBAyurved/" target="_blank" rel="noopener noreferrer" style={{
                    width:40, height:40, borderRadius:9999, display:'flex', alignItems:'center', justifyContent:'center',
                    border:'1px solid rgba(16,42,25,0.1)', color:'#102A19', transition:'all 0.2s', textDecoration:'none',
                  }}>
                    <span style={{ fontSize:14, fontWeight:700 }}>f</span>
                  </a>
                  <a href="https://www.instagram.com/shree_brahmachaitanya_ayurved/" target="_blank" rel="noopener noreferrer" style={{
                    width:40, height:40, borderRadius:9999, display:'flex', alignItems:'center', justifyContent:'center',
                    border:'1px solid rgba(16,42,25,0.1)', color:'#102A19', transition:'all 0.2s', textDecoration:'none',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize:16 }}>photo_camera</span>
                  </a>
                </div>
              </div>

              {/* Info links */}
              <div>
                <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#D4AF37', marginBottom:16, display:'block' }}>Information</span>
                {FOOTER_INFO.map(l => (
                  <Link key={l.href} href={l.href} style={{ display:'block', fontSize:13, color:'#424842', textDecoration:'none', marginBottom:10, transition:'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#D4AF37'}
                    onMouseLeave={e => e.target.style.color = '#424842'}
                  >{l.label}</Link>
                ))}
              </div>

              {/* Legal links */}
              <div>
                <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#D4AF37', marginBottom:16, display:'block' }}>Legal</span>
                {FOOTER_LEGAL.map(l => (
                  <Link key={l.href} href={l.href} style={{ display:'block', fontSize:13, color:'#424842', textDecoration:'none', marginBottom:10, transition:'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#D4AF37'}
                    onMouseLeave={e => e.target.style.color = '#424842'}
                  >{l.label}</Link>
                ))}
              </div>

              {/* Contact col */}
              <div>
                <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#D4AF37', marginBottom:16, display:'block' }}>Contact</span>
                <p style={{ fontSize:13, color:'#424842', lineHeight:1.8 }}>
                  533, Manorama Apt, Anand Nagar,<br />
                  Juni Shukrawari Road,<br />
                  Nagpur — 440009
                </p>
                <p style={{ fontSize:13, color:'#102A19', fontWeight:600, marginTop:10 }}>
                  +91 9168584999
                </p>
                <p style={{ fontSize:13, color:'#424842' }}>
                  info@sbayurved.com
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height:1, background:'linear-gradient(90deg, transparent, rgba(16,42,25,0.08), transparent)', marginBottom:24 }} />

            {/* Bottom */}
            <p style={{ textAlign:'center', fontSize:12, color:'rgba(66,72,66,0.5)' }}>
              © 2025 Shree Brahmachaitanya Ayurved. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* Responsive helpers */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-only { display: flex !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 769px) {
          .show-mobile-only { display: none !important; }
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
    </>
  );
}

// ═══ REUSABLE GLASS COMPONENTS ═══

/** Liquid Glass card — the signature component */
export function GlassCard({ children, style = {}, gold = false, className = '' }) {
  return (
    <div className={className} style={{
      background: 'rgba(255,255,255,0.4)',
      backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
      borderTop: '1.5px solid rgba(255,255,255,0.8)',
      borderLeft: '1.5px solid rgba(255,255,255,0.8)',
      borderBottom: '1.5px solid rgba(255,255,255,0.25)',
      borderRight: '1.5px solid rgba(255,255,255,0.25)',
      borderRadius: 40, padding: 48,
      boxShadow: gold
        ? '0 20px 40px rgba(16,42,25,0.06), inset 0 1px 0 rgba(212,175,55,0.15)'
        : '0 20px 40px rgba(16,42,25,0.06)',
      ...style,
    }}>
      {children}
    </div>
  );
}

/** Section heading with gold label */
export function SectionHeading({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: 48 }}>
      {label && (
        <span style={{
          fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:800,
          textTransform:'uppercase', letterSpacing:'0.3em',
          color:'#D4AF37', display:'block', marginBottom:12,
        }}>{label}</span>
      )}
      <h2 style={{
        fontFamily:'Newsreader,serif', fontSize:'clamp(32px,5vw,52px)',
        fontWeight:300, color:'#102A19', letterSpacing:'-0.02em',
        lineHeight:1.15, marginBottom: subtitle ? 12 : 0,
      }}>{title}</h2>
      {subtitle && (
        <p style={{ fontSize:16, color:'#424842', maxWidth:560, lineHeight:1.7 }}>{subtitle}</p>
      )}
    </div>
  );
}

/** Page hero with title + breadcrumb */
export function PageHero({ title, breadcrumb, subtitle }) {
  return (
    <section style={{ maxWidth:1100, margin:'0 auto', padding:'40px 32px 0', textAlign:'center', marginBottom:48 }}>
      {breadcrumb && (
        <div style={{ display:'flex', justifyContent:'center', gap:8, alignItems:'center', marginBottom:16 }}>
          <Link href="/" style={{ fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.15em', color:'#D4AF37', textDecoration:'none' }}>Home</Link>
          <span style={{ fontSize:10, color:'#c2c8c0' }}>›</span>
          <span style={{ fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.15em', color:'#424842' }}>{breadcrumb}</span>
        </div>
      )}
      <h1 style={{
        fontFamily:'Newsreader,serif', fontSize:'clamp(36px,6vw,72px)',
        fontWeight:300, fontStyle:'italic', color:'#102A19',
        letterSpacing:'-0.02em', lineHeight:1.1, marginBottom: subtitle ? 16 : 0,
      }}>{title}</h1>
      {subtitle && (
        <p style={{ fontSize:17, color:'#424842', maxWidth:640, margin:'0 auto', lineHeight:1.8 }}>{subtitle}</p>
      )}
    </section>
  );
}
