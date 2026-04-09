// pages/ayuaahar.jsx
// AyuAahar — Ayurvedic food brand page
import StoreLayout, { GlassCard, PageHero, SectionHeading } from '@/components/StoreLayout';
import Link from 'next/link';

const HIGHLIGHTS = [
  { icon: 'nutrition', title: 'Ayurvedic Dietics', desc: 'Products formulated according to Ayurvedic Pathya Kalpana — the ancient science of therapeutic nutrition and dietary regimens.' },
  { icon: 'labs',      title: 'Expert R&D Team',   desc: 'Developed by specialists in Ayurvedic diet formulation, guided by experienced Vaidyas to ensure authenticity and efficacy.' },
  { icon: 'spa',       title: 'Immunity & Strength', desc: 'More than 60% of Ayurved deals with diet and seasonal eating habits. Following these regimens builds natural immunity.' },
  { icon: 'diversity_3', title: 'Vaidya Recommended', desc: 'Most Ayurvedic Vaidyas are associated with us to guide and recommend AyuAahar products to their patients and community.' },
];

const PRODUCTS = [
  { name: 'BrahmaSattu (Vyoshadya sattu)', weight: '250 Gm', price: 298, mrp: 350 },
  { name: 'BrahmaPeya (Raktshali peya)',   weight: '100 Gm', price: 128, mrp: 150 },
  { name: 'BrahmaYush (Mudg yush)',         weight: '100 Gm', price: 128, mrp: 150 },
  { name: 'BrahmaRaksha (Super health drink)', weight: '250 Gm', price: 250, mrp: 330 },
];

export default function AyuAaharPage() {
  return (
    <StoreLayout title="AyuAahar" description="AyuAahar — Ayurvedic food brand by Shree Brahmachaitanya Ayurved">
      <PageHero
        title={<>Welcome to <span style={{ color:'#D4AF37' }}>AyuAahar</span></>}
        breadcrumb="AyuAahar"
        subtitle="A first-of-its-kind food brand exclusively working on nutrition and food habits according to Ayurved."
      />

      {/* ── Main Content ── */}
      <section style={{ maxWidth:960, margin:'0 auto', padding:'0 32px 64px' }}>
        <GlassCard style={{ padding:'clamp(32px,5vw,56px)' }}>
          <div style={{ fontSize:16, color:'#424842', lineHeight:1.9, maxWidth:720, margin:'0 auto' }}>
            <p style={{ marginBottom:24 }}>
              <strong style={{ color:'#102A19' }}>AyuAahar</strong> is a food brand under Shree Brahmachaitanya Ayurved. It is the first of its kind, exclusively working on nutrition and food habits according to Ayurved. AyuAahar develops Ayurvedic food products according to Ayurvedic Pathya Kalpana dietics.
            </p>
            <p style={{ fontFamily:'Newsreader,serif', fontSize:22, fontStyle:'italic', color:'#102A19', lineHeight:1.6, margin:'32px 0', padding:'24px 32px', borderLeft:'3px solid #D4AF37' }}>
              More than 60% of Ayurved deals with diet, daily and seasonal eating habits — if one follows all dietary regimens according to Ayurved, they will have good immunity and strength.
            </p>
            <p style={{ marginBottom:24 }}>
              AyuAahar aims to bring these Ayurvedic dietary regimens in standardized form — easy to consume with actual natural and desired benefits of Ayurved.
            </p>
            <p>
              The R&D team of AyuAahar comprises experts in Ayurvedic diet formulation and preparation. Ayurvedic Vaidyas across India are associated with us to guide and recommend these products to their patients and social community.
            </p>
          </div>
        </GlassCard>
      </section>

      {/* ── Highlights Grid ── */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 64px' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <SectionHeading label="Why AyuAahar" title={<>Rooted in Tradition, <span style={{ fontStyle:'italic' }}>Standardized for Today</span></>} />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(230px, 1fr))', gap:20 }}>
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.5)', backdropFilter:'blur(24px)',
              borderTop:'1.5px solid rgba(255,255,255,0.8)', borderLeft:'1.5px solid rgba(255,255,255,0.8)',
              borderBottom:'1.5px solid rgba(255,255,255,0.2)', borderRight:'1.5px solid rgba(255,255,255,0.2)',
              borderRadius:28, padding:28, boxShadow:'0 16px 32px rgba(16,42,25,0.05)',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize:28, color:'#D4AF37', marginBottom:14, display:'block' }}>{h.icon}</span>
              <h3 style={{ fontFamily:'Newsreader,serif', fontSize:18, color:'#102A19', marginBottom:8 }}>{h.title}</h3>
              <p style={{ fontSize:13, color:'#424842', lineHeight:1.75 }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 80px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:32, flexWrap:'wrap', gap:16 }}>
          <SectionHeading label="Our Products" title="AyuAahar Range" />
          <Link href="/" style={{
            fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700,
            textTransform:'uppercase', letterSpacing:'0.1em',
            color:'#D4AF37', textDecoration:'none', borderBottom:'1px solid #D4AF37', paddingBottom:4,
          }}>View All Products</Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:20 }}>
          {PRODUCTS.map((p, i) => (
            <GlassCard key={i} style={{ padding:24, textAlign:'center', borderRadius:28 }}>
              <div style={{ width:80, height:80, borderRadius:9999, background:'rgba(203,234,208,0.3)', margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize:32, color:'#102A19' }}>package_2</span>
              </div>
              <h4 style={{ fontFamily:'Newsreader,serif', fontSize:16, color:'#102A19', marginBottom:4, lineHeight:1.4 }}>{p.name}</h4>
              <p style={{ fontSize:11, color:'#424842', marginBottom:12 }}>{p.weight}</p>
              <div style={{ display:'flex', justifyContent:'center', alignItems:'baseline', gap:8 }}>
                <span style={{ fontFamily:'Newsreader,serif', fontSize:22, fontWeight:600, color:'#D4AF37' }}>₹{p.price}</span>
                <span style={{ fontSize:13, color:'#c2c8c0', textDecoration:'line-through' }}>₹{p.mrp}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </StoreLayout>
  );
}
