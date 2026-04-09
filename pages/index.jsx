// pages/index.jsx
// ═══ SB Ayurved — Storefront Home ═══
// Faithfully converted from Stitch storefront_home/code.html
// Design: Botanical Liquid Glass — warm white canvas, green gradient bleeds,
// glassmorphic components with directional light borders, gold accents, depth shadows
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

// ─── Design tokens (from Stitch tailwind config) ───
const C = {
  bg:          '#FCFCF9',
  surface:     '#f9f9f6',
  surfaceLow:  '#f4f4f1',
  primary:     '#001406',
  primaryC:    '#102a19',
  onPrimary:   '#ffffff',
  onPrimaryC:  '#76937c',
  primaryFixed: '#cbead0',
  primaryFixedDim: '#b0ceb5',
  secondary:   '#546159',
  secondaryC:  '#d5e3d8',
  onSurface:   '#1a1c1b',
  onSurfaceV:  '#424842',
  outline:     '#737972',
  outlineV:    '#c2c8c0',
  tertiary:    '#735c00',
  tertiaryC:   '#cca830',
  tertiaryFD:  '#e9c349',
  gold:        '#D4AF37',
  emerald50_40:'rgba(236,253,245,0.4)',
};

// ─── Glass recipes ───
const glassNav = {
  background: C.emerald50_40,
  backdropFilter: 'blur(48px)', WebkitBackdropFilter: 'blur(48px)',
  borderTop: '1px solid rgba(255,255,255,0.8)',
  borderLeft: '1px solid rgba(255,255,255,0.8)',
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  borderRight: '1px solid rgba(255,255,255,0.2)',
  boxShadow: '0 40px 80px -10px rgba(16,42,25,0.08)',
};
const liquidGlass = {
  background: 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
  borderTop: '1px solid rgba(255,255,255,0.8)',
  borderLeft: '1px solid rgba(255,255,255,0.8)',
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  borderRight: '1px solid rgba(255,255,255,0.2)',
};

const NAV = [
  { href: '/products', label: 'Shop',     active: true },
  { href: '/about',    label: 'Heritage', active: false },
  { href: '/wellness', label: 'Wellness', active: false },
  { href: '/blog',     label: 'Journal',  active: false },
  { href: '/contact',  label: 'Contact',  active: false },
];

const CATEGORIES = [
  { title: 'Proprietary Special', sub: 'Tested & trusted formulations from senior Vaidyas for everyday Ayurvedic practice.', href: '/' },
  { title: 'AyuAahar Range', sub: 'Ayurvedic food products — sattu, peya, yush — following Pathya Kalpana dietics.', href: '/ayuaahar' },
  { title: 'Samaayu Cosmetics', sub: 'Pure botanical beauty — face care, body care, hair care rooted in Ayurvedic wisdom.', href: '/cosmetics' },
];

const PRODUCTS = [
  { name: 'BrahmaSattu', sub: 'Vyoshadya Sattu · 250g', price: 298, mrp: 350 },
  { name: 'BrahmaPeya', sub: 'Raktshali Peya · 100g', price: 128, mrp: 150 },
  { name: 'Kuberaksha Vati', sub: '30 Tablets', price: 128, mrp: 150 },
  { name: 'SB-Cid Capsule', sub: '30 Capsules', price: 179, mrp: 210 },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/products?limit=6')
      .then(r => r.json()).then(d => setProducts(d.products || []))
      .catch(() => {});
  }, []);

  return (
    <>
      <Head>
        <title>SB Ayurved — Ancient Wisdom for the Modern Vaidya</title>
        <meta name="description" content="Quality, effective and affordable Ayurvedic medicines from Shree Brahmachaitanya Ayurved. 160+ classical and proprietary formulations." />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background: C.bg, color: C.onSurface, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

        {/* ═══ ATMOSPHERIC BACKGROUND BLOBS ═══ */}
        <div className="botanical-blob" style={{ top: '-10%', right: '-10%', width: '50vw', height: '50vw', background: `${C.secondaryC}40` }} />
        <div className="botanical-blob" style={{ bottom: '-20%', left: '-10%', width: '60vw', height: '60vw', background: `${C.primaryFixedDim}30` }} />

        {/* ═══ GLASSMORPHIC NAVBAR ═══ */}
        {/* From Stitch: fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full */}
        <nav style={{
          position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
          width: '95%', maxWidth: 1280, zIndex: 50, borderRadius: 9999,
          ...glassNav,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <Link href="/">
              <span style={{ fontFamily: 'Newsreader,serif', fontSize: 24, fontWeight: 700, color: C.tertiary }}>SB Ayurved</span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }} className="hide-mobile">
              {NAV.map(n => (
                <Link key={n.href} href={n.href} style={{
                  fontFamily: 'Newsreader,serif', letterSpacing: '-0.01em',
                  color: n.active ? C.tertiary : 'rgba(16,42,25,0.65)',
                  borderBottom: n.active ? `1px solid ${C.tertiary}` : 'none',
                  transition: 'color 0.3s',
                }}>{n.label}</Link>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Search — from Stitch: bg-white/20 px-4 py-1.5 rounded-full border-white/40 */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.2)', padding: '6px 16px',
              borderRadius: 9999, border: '1px solid rgba(255,255,255,0.4)',
            }} className="hide-mobile">
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'rgba(16,42,25,0.4)' }}>search</span>
              <input placeholder="Search..." style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 13, width: 100, color: C.onSurface,
              }} />
            </div>
            <Link href="/checkout" style={{ color: C.primaryC, display: 'flex' }}>
              <span className="material-symbols-outlined">shopping_cart</span>
            </Link>
            <Link href="/admin" style={{ color: C.primaryC, display: 'flex' }}>
              <span className="material-symbols-outlined">person</span>
            </Link>
          </div>
        </nav>

        {/* ═══ MAIN CONTENT ═══ */}
        <main style={{ position: 'relative', paddingTop: 128, padding: '128px 16px 0', maxWidth: 1400, margin: '0 auto' }}>

          {/* ── HERO SECTION ── */}
          {/* From Stitch: relative min-h-[870px] flex items-center mb-32 */}
          <section style={{ position: 'relative', minHeight: 700, display: 'flex', alignItems: 'center', marginBottom: 128 }}>
            {/* Right image — from Stitch: absolute right-0 top-0 w-2/3 h-full rounded-[4rem] */}
            <div style={{
              position: 'absolute', right: 0, top: 0, width: '65%', height: '100%',
              overflow: 'hidden', borderRadius: 64,
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `${C.primaryFixedDim}80`,
                filter: 'blur(80px)', transform: 'translate(25%, -25%)',
                borderRadius: '50%',
              }} />
              <img
                src="https://images.unsplash.com/photo-1611241893603-3c228ee0ae6f?w=1200&q=80"
                alt="Ayurvedic botanicals"
                style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply', opacity: 0.85, transform: 'scale(1.1)' }}
              />
            </div>

            {/* Floating glass card — from Stitch: liquid-glass p-10 md:p-16 rounded-[3rem] shadow-2xl */}
            <div className="liquid-glass" style={{
              position: 'relative', zIndex: 10, maxWidth: 600,
              padding: 'clamp(32px, 5vw, 64px)', borderRadius: 48,
              boxShadow: '0 25px 50px -12px rgba(16,42,25,0.15)',
            }}>
              {/* Gold label — from Stitch: font-body text-[10px] uppercase tracking-[0.3em] text-tertiary */}
              <span style={{
                fontFamily: 'Manrope,sans-serif', fontSize: 10, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.3em',
                color: C.tertiary, display: 'block', marginBottom: 24,
              }}>Shree Brahmachaitanya Ayurved</span>

              {/* Headline — from Stitch: font-newsreader text-5xl md:text-7xl font-bold text-primary-container */}
              <h1 style={{
                fontFamily: 'Newsreader,serif', fontSize: 'clamp(36px, 6vw, 68px)',
                fontWeight: 700, color: C.primaryC,
                lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 32,
              }}>
                Ancient Wisdom, crafted for the{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Modern Vaidya.</span>
              </h1>

              {/* Subtitle */}
              <p style={{
                fontFamily: 'Manrope,sans-serif', fontSize: 17, color: C.secondary,
                lineHeight: 1.7, marginBottom: 40, maxWidth: 480,
              }}>
                Quality, effective and affordable classical Ayurvedic medicines — 160+ formulations from experienced Vaidyas, for the goodness of society.
              </p>

              {/* CTAs — from Stitch: flex flex-wrap gap-4 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <Link href="/wellness" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: C.primaryC, color: C.onPrimary,
                  padding: '16px 36px', borderRadius: 9999,
                  fontFamily: 'Manrope,sans-serif', fontSize: 14, fontWeight: 600,
                  transition: 'opacity 0.2s',
                }}>
                  Shop Collection
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </Link>
                <Link href="/about" style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '16px 36px', borderRadius: 9999,
                  fontFamily: 'Manrope,sans-serif', fontSize: 14, fontWeight: 600,
                  color: C.primary, border: `1px solid rgba(0,20,6,0.1)`,
                  transition: 'background 0.2s',
                }}>
                  Our Story
                </Link>
              </div>
            </div>
          </section>

          {/* ── CURATED COLLECTIONS ── */}
          {/* From Stitch: mb-40, flex justify-between items-end mb-16 */}
          <section style={{ marginBottom: 160, padding: '0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h2 style={{ fontFamily: 'Newsreader,serif', fontSize: 'clamp(32px, 5vw, 52px)', color: C.primaryC, marginBottom: 16 }}>
                  Curated <span style={{ fontStyle: 'italic' }}>Collections</span>
                </h2>
                <p style={{ fontFamily: 'Manrope,sans-serif', color: C.secondary, maxWidth: 400 }}>
                  Authentic Ayurvedic formulations for specific wellness goals.
                </p>
              </div>
              <Link href="/wellness" style={{
                color: C.tertiary, fontFamily: 'Manrope,sans-serif', fontWeight: 700,
                borderBottom: `1px solid ${C.tertiary}`, paddingBottom: 4,
                transition: 'padding-right 0.3s',
              }}>View All Collections</Link>
            </div>

            {/* 3 collection cards — from Stitch: grid grid-cols-3 gap-10 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
              {CATEGORIES.map((cat, i) => (
                <Link href={cat.href} key={i} style={{ textDecoration: 'none', position: 'relative', paddingTop: 48 }}>
                  {/* Ambient glow behind card — from Stitch: absolute top-0 right-8 w-40 h-40 blur-3xl */}
                  <div style={{
                    position: 'absolute', top: 0, right: 32, width: 160, height: 160,
                    background: i === 1 ? 'rgba(255,224,136,0.2)' : 'rgba(203,234,208,0.3)',
                    borderRadius: '50%', filter: 'blur(48px)',
                    transition: 'transform 0.7s', zIndex: 0,
                  }} className="collection-glow" />

                  {/* Card — from Stitch: liquid-glass p-8 rounded-[2.5rem] border border-tertiary/10 */}
                  <div className="liquid-glass" style={{
                    padding: 32, borderRadius: 40, position: 'relative',
                    height: '100%', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', textAlign: 'center',
                    border: `1px solid rgba(${i === 1 ? '204,168,48' : '16,42,25'},0.1)`,
                    boxShadow: '0 20px 40px rgba(16,42,25,0.06)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    overflow: 'hidden',
                  }}>
                    {/* Placeholder image circle */}
                    <div style={{
                      width: 120, height: 120, borderRadius: 24, marginBottom: 24, marginTop: -16,
                      background: i === 0 ? 'linear-gradient(135deg, #cbead0, #b0ceb5)' : i === 1 ? 'linear-gradient(135deg, #ffe088, #e9c349)' : 'linear-gradient(135deg, #d5e3d8, #cbead0)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 12px 24px rgba(16,42,25,0.1)',
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 40, color: C.primaryC }}>
                        {i === 0 ? 'science' : i === 1 ? 'restaurant' : 'spa'}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'Newsreader,serif', fontSize: 22, fontWeight: 700, color: C.primaryC, marginBottom: 8 }}>
                      {cat.title}
                    </h3>
                    <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: C.secondary, marginBottom: 24, lineHeight: 1.7, padding: '0 16px' }}>
                      {cat.sub}
                    </p>
                    <span style={{
                      marginTop: 'auto', color: C.tertiary, fontFamily: 'Manrope,sans-serif',
                      fontWeight: 700, letterSpacing: '0.15em', fontSize: 11, textTransform: 'uppercase',
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      Explore <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_flat</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── FEATURED PRODUCTS ── */}
          <section style={{ marginBottom: 128, padding: '0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', color: C.tertiary, display: 'block', marginBottom: 8 }}>Best Sellers</span>
                <h2 style={{ fontFamily: 'Newsreader,serif', fontSize: 'clamp(28px, 4vw, 42px)', color: C.primaryC }}>
                  Botanical <span style={{ fontStyle: 'italic' }}>Treasury</span>
                </h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
              {(products.length > 0 ? products.slice(0, 6) : PRODUCTS).map((p, i) => (
                <div key={i} className="liquid-glass" style={{
                  borderRadius: 32, padding: 24, display: 'flex', flexDirection: 'column',
                  boxShadow: '0 16px 32px rgba(16,42,25,0.04)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                }}>
                  {/* Product image placeholder */}
                  <div style={{
                    width: '100%', aspectRatio: '1', borderRadius: 20, marginBottom: 16,
                    background: `linear-gradient(135deg, ${C.secondaryC}60, ${C.primaryFixed}40)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 48 }}>{p.emoji || '🌿'}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Newsreader,serif', fontSize: 18, color: C.primaryC, marginBottom: 4 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10, color: C.onSurfaceV, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                    {p.sub || p.category || 'Classical Formulation'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <span style={{ fontFamily: 'Newsreader,serif', fontSize: 20, color: C.primaryC }}>
                      ₹{(p.price || 0).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => addToCart && addToCart(p)}
                      style={{
                        background: C.primaryC, color: C.onPrimary,
                        padding: '10px 20px', borderRadius: 9999, border: 'none',
                        fontFamily: 'Manrope,sans-serif', fontSize: 10, fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                        cursor: 'pointer', transition: 'background 0.3s',
                      }}
                    >Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── BENTO PHILOSOPHY ── */}
          {/* From Stitch: grid grid-cols-12 gap-8 h-[600px] mb-40 */}
          <section style={{ marginBottom: 160, padding: '0 16px' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 32,
              minHeight: 500,
            }} className="bento-grid">
              {/* Left glass panel — from Stitch: col-span-7 liquid-glass rounded-[3rem] p-12 */}
              <div className="liquid-glass" style={{
                borderRadius: 48, padding: 'clamp(32px, 5vw, 48px)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(16,42,25,0.06)',
              }}>
                {/* Ambient blob inside — from Stitch: absolute bg-secondary-container/20 blur-[100px] */}
                <div style={{
                  position: 'absolute', bottom: 0, right: 0, width: '100%', height: '100%',
                  transform: 'translate(50%, 50%)', background: `${C.secondaryC}30`,
                  borderRadius: '50%', filter: 'blur(100px)', zIndex: 0,
                }} />

                <h3 style={{
                  fontFamily: 'Newsreader,serif', fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 700, color: C.primaryC, marginBottom: 24,
                  lineHeight: 1.15, position: 'relative', zIndex: 1,
                }}>
                  "Of the Vaidya, By the Vaidya, For the Vaidya."
                </h3>
                <p style={{
                  fontFamily: 'Manrope,sans-serif', fontSize: 17, color: C.secondary,
                  lineHeight: 1.75, marginBottom: 32, maxWidth: 500,
                  position: 'relative', zIndex: 1,
                }}>
                  Started by a group of Ayurvedic physicians to bring quality, authentic and affordable classical medicines to every practitioner — including rare preparations no other company manufactures.
                </p>

                {/* Stats — from Stitch: flex items-center gap-12 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 48, position: 'relative', zIndex: 1 }}>
                  {[
                    { val: '160+', label: 'Formulations' },
                    { val: 'Zero', label: 'Synthetic Ingredients' },
                    { val: 'GMP', label: 'Certified' },
                  ].map(s => (
                    <div key={s.label} style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontFamily: 'Newsreader,serif', fontSize: 28, fontWeight: 700, color: C.tertiary }}>{s.val}</span>
                      <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: C.secondary }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right image — from Stitch: col-span-5 rounded-[3rem] overflow-hidden */}
              <div style={{
                borderRadius: 48, overflow: 'hidden', position: 'relative',
                background: `linear-gradient(135deg, ${C.primaryC}, #1a4028)`,
              }}>
                <img
                  src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80"
                  alt="Ayurvedic herbs and preparation"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s', opacity: 0.9 }}
                />
                {/* Gold gradient overlay at bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                  background: `linear-gradient(to top, ${C.primaryC}90, transparent)`,
                }} />
                <div style={{
                  position: 'absolute', bottom: 32, left: 32, right: 32,
                  color: '#fff', fontFamily: 'Newsreader,serif', fontStyle: 'italic',
                  fontSize: 18, lineHeight: 1.6,
                }}>
                  "May Lord Dhanvantari shower his blessings to extend Ayurvedic service worldwide."
                </div>
              </div>
            </div>
          </section>

          {/* ── NEWSLETTER CTA ── */}
          <section style={{ marginBottom: 80, padding: '0 16px' }}>
            <div style={{
              background: `linear-gradient(135deg, ${C.primaryC}, #1a4028)`,
              borderRadius: 48, padding: 'clamp(40px, 6vw, 64px)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 300, height: 300, background: `${C.gold}12`, filter: 'blur(80px)', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', bottom: '-20%', left: '5%', width: 250, height: 250, background: `${C.primaryFixedDim}10`, filter: 'blur(80px)', borderRadius: '50%' }} />
              <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', color: C.tertiaryFD, display: 'block', marginBottom: 16, position: 'relative' }}>Free Consultation</span>
              <h3 style={{ fontFamily: 'Newsreader,serif', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 400, color: '#fff', marginBottom: 20, position: 'relative' }}>
                Connect with our <span style={{ fontStyle: 'italic', color: C.tertiaryFD }}>Vaidya Team</span>
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', maxWidth: 480, margin: '0 auto 28px', position: 'relative' }}>
                Get personalized guidance on Ayurvedic formulations for your practice or wellness needs.
              </p>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: `linear-gradient(135deg, ${C.gold}, ${C.tertiaryFD})`,
                color: C.primaryC, padding: '16px 36px', borderRadius: 9999,
                fontFamily: 'Manrope,sans-serif', fontSize: 12, fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.15em',
                boxShadow: `0 8px 24px ${C.gold}50`, position: 'relative',
              }}>
                Get in Touch
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </Link>
            </div>
          </section>
        </main>

        {/* ═══ FOOTER ═══ */}
        {/* From Stitch: bg-[#FCFCF9] pt-20 pb-10, gradient-to-t from-secondary-container/20 */}
        <footer style={{
          width: '100%', paddingTop: 80, paddingBottom: 40,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: '0 0 0 0', bottom: 0, height: 384, background: `linear-gradient(to top, ${C.secondaryC}30, transparent)`, zIndex: 0 }} />
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32 }}>
              <div style={{ maxWidth: 360 }}>
                <span style={{ fontFamily: 'Newsreader,serif', fontStyle: 'italic', fontSize: 28, color: C.primaryC, display: 'block', marginBottom: 12 }}>SB Ayurved</span>
                <p style={{ fontSize: 13, color: `${C.primaryC}80`, lineHeight: 1.7 }}>
                  Of the Vaidya, By the Vaidya, For the Vaidya — quality Ayurvedic formulations since inception.
                </p>
                <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
                  {[
                    { href: 'https://www.facebook.com/SBAyurved/', icon: 'share' },
                    { href: 'https://www.instagram.com/shree_brahmachaitanya_ayurved/', icon: 'photo_camera' },
                  ].map(s => (
                    <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                      width: 48, height: 48, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${C.primary}15`, transition: 'background 0.2s',
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{s.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 48 }}>
                {[
                  { label: 'Information', links: [{ t: 'About', h: '/about' }, { t: 'Products', h: '/wellness' }, { t: 'AyuAahar', h: '/ayuaahar' }, { t: 'Contact', h: '/contact' }] },
                  { label: 'Legal', links: [{ t: 'Privacy', h: '/privacy' }, { t: 'Terms', h: '/terms' }, { t: "FAQ's", h: '/faq' }] },
                ].map(col => (
                  <div key={col.label}>
                    <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.tertiary, display: 'block', marginBottom: 16 }}>{col.label}</span>
                    {col.links.map(l => (
                      <Link key={l.h} href={l.h} style={{ display: 'block', fontSize: 13, color: `${C.primaryC}80`, marginBottom: 10, transition: 'color 0.2s' }}>{l.t}</Link>
                    ))}
                  </div>
                ))}
              </div>
              <div>
                <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.tertiary, display: 'block', marginBottom: 12 }}>Contact</span>
                <p style={{ fontSize: 13, color: `${C.primaryC}80`, lineHeight: 1.8 }}>
                  533, Manorama Apt, Nagpur — 440009<br />
                  +91 9168584999<br />
                  info@sbayurved.com
                </p>
              </div>
            </div>
            {/* Bottom line */}
            <div style={{
              marginTop: 48, paddingTop: 20,
              borderTop: `1px solid ${C.primaryC}08`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: `${C.primaryC}40`,
            }}>
              <span>© 2025 Shree Brahmachaitanya Ayurved. All rights reserved.</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>eco</span>
                Rooted in Tradition
              </span>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .bento-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
