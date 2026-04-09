// pages/about.jsx
// About Us — Shree Brahmachaitanya Ayurved
// Stitch Botanical Liquid Glass: glassmorphic cards, green gradient blobs, gold accents, editorial typography
import { useState, useEffect } from 'react';
import StoreLayout, { GlassCard, PageHero } from '@/components/StoreLayout';

const PILLARS = [
  { icon: 'eco',     gold: true,  title: 'Authentic Formulations', desc: 'More than 160 generic and 12 research-based proprietary products manufactured following classical Shastrokt principles and good manufacturing practices.' },
  { icon: 'science', gold: true,  title: 'Expert Vaidya Team',     desc: 'Core associates are postgraduates in Rasashastra, Bhaishajya Kalpana, Dravyaguna, Kaychikitsa, M.Pharm — bringing deep knowledge of Ayurvedic manufacturing.' },
  { icon: 'volunteer_activism', gold: true, title: 'Affordable & Accessible', desc: 'Quality, effective and affordable classical medicines — including rare preparations unavailable elsewhere — for every Ayurvedic practitioner.' },
  { icon: 'verified', gold: true, title: 'Research-Driven',        desc: 'Bridging traditional wisdom with modern dosage forms. Every proprietary product is tested and validated before reaching the Vaidya.' },
];

export default function AboutPage() {
  const [cmsContent, setCmsContent] = useState(null);

  useEffect(() => {
    fetch('/api/p/about-us').then(r => r.ok ? r.json() : null).then(d => d && setCmsContent(d.page)).catch(() => {});
  }, []);

  return (
    <StoreLayout title="About Us" description="Learn about Shree Brahmachaitanya Ayurved — Of the Vaidya, By the Vaidya, For the Vaidya">
      <PageHero
        title="About Shree Brahmachaitanya Ayurveda"
        breadcrumb="About Us"
        subtitle="Of the Vaidya, By the Vaidya, For the Vaidya"
      />

      {/* ─── Main Content Glass Panel ─── */}
      <section style={{ maxWidth:960, margin:'0 auto', padding:'0 32px 64px', position:'relative' }}>
        {/* Extra decorative blob for depth */}
        <div style={{ position:'absolute', top:'10%', left:'-15%', width:300, height:300, background:'rgba(73,101,80,0.06)', filter:'blur(80px)', borderRadius:'50%', pointerEvents:'none', zIndex:0 }} />

        <GlassCard style={{ position:'relative', zIndex:1, padding:'clamp(32px,5vw,64px)' }}>
          {/* Tagline */}
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <span style={{
              fontFamily:'Newsreader,serif', fontSize:'clamp(22px,3vw,30px)',
              fontStyle:'italic', fontWeight:400, color:'#D4AF37',
              display:'block', lineHeight:1.5,
            }}>
              "Of the Vaidya, By the Vaidya, For the Vaidya"
            </span>
          </div>

          {/* Body paragraphs */}
          <div style={{ fontFamily:'Manrope,sans-serif', fontSize:16, color:'#424842', lineHeight:1.9, maxWidth:720, margin:'0 auto' }}>
            <p style={{ marginBottom:24 }}>
              <strong style={{ color:'#102A19' }}>Shree Brahmachaitanya Ayurved</strong> is a firm started by a group of Ayurvedic physicians (Vaidya) for the Ayurvedic physicians — to avail quality, effective and affordable classical and tested proprietary medicines from senior and experienced Vaidyas as per realistic requirement for Ayurvedic practice and ultimately for the goodness of society.
            </p>
            <p style={{ marginBottom:24 }}>
              The most problematic issue faced in day-to-day practice is the unavailability of authentic and cost-effective Ayurvedic medicines, and many times the unavailability of few efficacious but rare medicinal preparations, which are not in use only because no company manufactures them. Many Ayurved practitioners have shared that some good result-oriented classical products are not used simply because they are not available in the market.
            </p>
            <p style={{ marginBottom:24 }}>
              The core associates have deep experience in the manufacturing field and are strong supporters of this ideology, following good manufacturing practices in classical product production. They worked on these limitations and decided to go for the production of common and uncommon generic medicines in a highly cost-effective way.
            </p>
            <p style={{ marginBottom:24 }}>
              Core Associates of Shree Brahmachaitanya Ayurved are postgraduates in Ayurved, Rasashastra and Bhaishajya Kalpana, Dravyaguna, Kaychikitsa, M.Pharm, and Basic Sciences — bringing depth knowledge of Ayurvedic Shastrokt manufacturing principles as well as several new dosage forms.
            </p>
            <p>
              In a very short span, by the grace of <em style={{ color:'#102A19' }}>Lord Dhanvantari</em> and <em style={{ color:'#102A19' }}>Shri Brahmachaitanya Gondavlekar Maharaj</em>, they have succeeded in producing more than 160 generic and 12 research-based proprietary products — extending service to Vaidyas across the nation with the mission to bring the holiness of Ayurved across the globe.
            </p>
          </div>

          {/* Stats row */}
          <div style={{
            display:'flex', flexWrap:'wrap', justifyContent:'center', gap:40, marginTop:56, paddingTop:40,
            borderTop:'1px solid rgba(16,42,25,0.06)',
          }}>
            {[
              { num: '160+', label: 'Generic Products' },
              { num: '12+', label: 'Proprietary Formulas' },
              { num: '100+', label: 'Associated Vaidyas' },
            ].map(s => (
              <div key={s.label} style={{ textAlign:'center' }}>
                <span style={{ fontFamily:'Newsreader,serif', fontSize:36, fontWeight:700, color:'#D4AF37', display:'block' }}>{s.num}</span>
                <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#424842' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* ─── Pillars Grid ─── */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 80px' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.3em', color:'#D4AF37', display:'block', marginBottom:12 }}>Our Foundation</span>
          <h2 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(28px,4vw,42px)', fontWeight:300, color:'#102A19' }}>
            What Sets Us <span style={{ fontStyle:'italic' }}>Apart</span>
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:24 }}>
          {PILLARS.map((p, i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.5)',
              backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
              borderTop:'1.5px solid rgba(255,255,255,0.8)',
              borderLeft:'1.5px solid rgba(255,255,255,0.8)',
              borderBottom:'1.5px solid rgba(255,255,255,0.2)',
              borderRight:'1.5px solid rgba(255,255,255,0.2)',
              borderRadius:28, padding:32,
              boxShadow:'0 16px 32px rgba(16,42,25,0.05)',
              transform: i % 2 === 1 ? 'translateY(16px)' : 'none',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize:32, color:'#D4AF37', marginBottom:16, display:'block' }}>{p.icon}</span>
              <h3 style={{ fontFamily:'Newsreader,serif', fontSize:20, color:'#102A19', marginBottom:10 }}>{p.title}</h3>
              <p style={{ fontSize:13, color:'#424842', lineHeight:1.75 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 80px' }}>
        <div style={{
          background:'linear-gradient(135deg, #102A19 0%, #1a4028 100%)',
          borderRadius:48, padding:'clamp(40px,6vw,72px)',
          textAlign:'center', position:'relative', overflow:'hidden',
        }}>
          <div style={{ position:'absolute', top:'-30%', right:'-10%', width:300, height:300, background:'rgba(212,175,55,0.08)', filter:'blur(80px)', borderRadius:'50%' }} />
          <div style={{ position:'absolute', bottom:'-20%', left:'-5%', width:250, height:250, background:'rgba(176,206,181,0.08)', filter:'blur(80px)', borderRadius:'50%' }} />
          <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.3em', color:'#D4AF37', display:'block', marginBottom:16, position:'relative' }}>Explore Our Range</span>
          <h3 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:300, color:'#fff', marginBottom:20, position:'relative' }}>
            Discover 160+ Authentic <span style={{ fontStyle:'italic' }}>Ayurvedic Formulations</span>
          </h3>
          <a href="/" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'linear-gradient(135deg, #D4AF37, #e9c349)',
            color:'#102A19', padding:'14px 36px', borderRadius:9999,
            fontFamily:'Manrope,sans-serif', fontSize:12, fontWeight:800,
            textTransform:'uppercase', letterSpacing:'0.15em', textDecoration:'none',
            boxShadow:'0 8px 24px rgba(212,175,55,0.3)',
            position:'relative',
          }}>
            Shop All Products
            <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_forward</span>
          </a>
        </div>
      </section>
    </StoreLayout>
  );
}
