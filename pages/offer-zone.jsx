// pages/offer-zone.jsx
// Offer Zone — deals and promotions page
import StoreLayout, { GlassCard, PageHero, SectionHeading } from '@/components/StoreLayout';
import Link from 'next/link';

const DEALS = [
  { name: 'Raktpachak Vati', discount: '15%', desc: 'Blood-purifying classical formulation for healthy digestion and clear skin.' },
  { name: 'Medopachak Vati', discount: '15%', desc: 'Ayurvedic support for healthy metabolism and weight management.' },
  { name: 'Manspachak Vati', discount: '15%', desc: 'Mind-calming formulation for mental clarity and stress relief.' },
];

const FEATURED_COMBOS = [
  { title: 'Flexi Joints Kit', desc: 'Complete joint care package — oil, tablets, and lep powder for mobility and comfort.', tag: 'Joint Care' },
  { title: 'Happy Gut Bundle', desc: 'Digestive wellness combo with churna, vati, and Ayurvedic food supplements.', tag: 'Digestion' },
  { title: 'Glow & Grow Set', desc: 'Samaayu cosmetics essentials for radiant skin and healthy hair — inside out.', tag: 'Beauty' },
];

export default function OfferZonePage() {
  return (
    <StoreLayout title="Offer Zone" description="Exclusive deals and offers on SB Ayurved products">
      <PageHero
        title={<>Offer <span style={{ color:'#D4AF37' }}>Zone</span></>}
        breadcrumb="Offer Zone"
        subtitle="Exclusive deals on authentic Ayurvedic formulations — limited time offers curated for your wellness journey."
      />

      {/* ── Banner ── */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 48px' }}>
        <div style={{
          background:'linear-gradient(135deg, #102A19, #1a4028)', borderRadius:40,
          padding:'clamp(40px,6vw,64px)', textAlign:'center', position:'relative', overflow:'hidden',
        }}>
          <div style={{ position:'absolute', top:'-25%', right:'-10%', width:300, height:300, background:'rgba(212,175,55,0.12)', filter:'blur(80px)', borderRadius:'50%' }} />
          <div style={{ position:'absolute', bottom:'-20%', left:'5%', width:250, height:250, background:'rgba(176,206,181,0.08)', filter:'blur(80px)', borderRadius:'50%' }} />
          <span style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.3em', color:'#D4AF37', display:'block', marginBottom:12, position:'relative' }}>Limited Time</span>
          <h2 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(28px,5vw,48px)', fontWeight:300, color:'#fff', marginBottom:12, position:'relative', lineHeight:1.2 }}>
            Upto <span style={{ color:'#D4AF37', fontWeight:700 }}>15% Off</span> on DhatuPachak Range
          </h2>
          <p style={{ fontSize:14, color:'rgba(255,255,255,0.6)', position:'relative', maxWidth:480, margin:'0 auto' }}>
            Classical Ayurvedic tissue-metabolizing formulations at special prices.
          </p>
        </div>
      </section>

      {/* ── Top Deals ── */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 64px' }}>
        <SectionHeading label="Top Deals" title="Ayurvedic Essentials on Offer" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:24 }}>
          {DEALS.map((d, i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.5)', backdropFilter:'blur(24px)',
              borderTop:'1.5px solid rgba(255,255,255,0.8)', borderLeft:'1.5px solid rgba(255,255,255,0.8)',
              borderBottom:'1.5px solid rgba(255,255,255,0.2)', borderRight:'1.5px solid rgba(255,255,255,0.2)',
              borderRadius:28, padding:32, position:'relative', overflow:'hidden',
              boxShadow:'0 16px 32px rgba(16,42,25,0.05)', transition:'transform 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Discount badge */}
              <div style={{
                position:'absolute', top:20, right:20,
                background:'linear-gradient(135deg, #D4AF37, #e9c349)',
                color:'#102A19', padding:'6px 14px', borderRadius:9999,
                fontSize:11, fontWeight:800, letterSpacing:'0.05em',
              }}>
                {d.discount} OFF
              </div>
              {/* Product icon */}
              <div style={{
                width:64, height:64, borderRadius:9999, marginBottom:20,
                background:'rgba(203,234,208,0.25)',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize:28, color:'#102A19' }}>package_2</span>
              </div>
              <h3 style={{ fontFamily:'Newsreader,serif', fontSize:22, color:'#102A19', marginBottom:8 }}>{d.name}</h3>
              <p style={{ fontSize:13, color:'#424842', lineHeight:1.75, marginBottom:20 }}>{d.desc}</p>
              <Link href="/" style={{
                fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700,
                textTransform:'uppercase', letterSpacing:'0.12em',
                color:'#D4AF37', textDecoration:'none', borderBottom:'1px solid #D4AF37', paddingBottom:2,
              }}>Shop Now →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Combo Kits ── */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 80px' }}>
        <SectionHeading label="Value Bundles" title={<>Curated Wellness <span style={{ fontStyle:'italic' }}>Kits</span></>} />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:24 }}>
          {FEATURED_COMBOS.map((c, i) => (
            <GlassCard key={i} gold style={{ padding:32, borderRadius:28 }}>
              <span style={{
                fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.15em',
                padding:'4px 12px', borderRadius:9999,
                background:'rgba(212,175,55,0.1)', color:'#D4AF37', border:'1px solid rgba(212,175,55,0.2)',
                display:'inline-block', marginBottom:16,
              }}>{c.tag}</span>
              <h4 style={{ fontFamily:'Newsreader,serif', fontSize:22, color:'#102A19', marginBottom:10 }}>{c.title}</h4>
              <p style={{ fontSize:13, color:'#424842', lineHeight:1.75 }}>{c.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </StoreLayout>
  );
}
