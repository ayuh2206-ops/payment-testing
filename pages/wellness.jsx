// pages/wellness.jsx
// Wellness — health goals and collections hub
import StoreLayout, { GlassCard, PageHero, SectionHeading } from '@/components/StoreLayout';
import Link from 'next/link';

const HEALTH_GOALS = [
  { icon: 'directions_run', title: 'Flexi Joints',   desc: 'Support joint mobility and comfort with our specialized Ayurvedic formulations for musculoskeletal health.', color: '#102A19' },
  { icon: 'gastroenterology', title: 'Happy Gut',    desc: 'Digestive wellness through classical churna, vati, and Ayurvedic dietary preparations for a balanced gut.', color: '#324d39' },
  { icon: 'fitness_center', title: 'Slim & Fit',     desc: 'Ayurvedic support for healthy metabolism, weight management, and sustainable fitness goals.', color: '#496550' },
  { icon: 'dermatology', title: 'Glow & Grow',       desc: 'Nourish skin and hair from within using traditional Rasayana formulations and Samaayu cosmetics.', color: '#102A19' },
  { icon: 'bolt', title: 'Vitality Plus',             desc: 'Rejuvenating energy and stamina with classical Vajikarana and adaptogenic Ayurvedic preparations.', color: '#324d39' },
  { icon: 'favorite', title: 'Her Balance',           desc: "Specialized formulations supporting women's hormonal balance, menstrual health, and overall well-being.", color: '#496550' },
];

const WELLNESS_PILLARS = [
  { title: 'Ahara (Diet)', desc: 'Therapeutic nutrition through AyuAahar products — sattu, peya, yush — following Pathya Kalpana principles for daily nourishment.' },
  { title: 'Vihara (Lifestyle)', desc: 'Guidance on Dinacharya (daily routine), Ritucharya (seasonal regimen), and Sadvritta (ethical conduct) for holistic wellness.' },
  { title: 'Aushadha (Medicine)', desc: 'Over 160 classical and 12 proprietary formulations manufactured by experienced Vaidyas with GMP-compliant processes.' },
];

export default function WellnessPage() {
  return (
    <StoreLayout title="Wellness" description="Ayurvedic wellness programs and health goal collections from SB Ayurved">
      <PageHero
        title={<>Your Wellness <span style={{ fontStyle:'italic' }}>Journey</span></>}
        breadcrumb="Wellness"
        subtitle="Ayurveda teaches that true health is a balance of body, mind, and spirit. Choose your path below."
      />

      {/* ── Health Goals Grid ── */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 64px' }}>
        <SectionHeading label="Health Goals" title="Find Your Focus" subtitle="Curated product collections designed around specific wellness outcomes." />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:24 }}>
          {HEALTH_GOALS.map((g, i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,0.45)',
              backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
              borderTop:'1.5px solid rgba(255,255,255,0.8)',
              borderLeft:'1.5px solid rgba(255,255,255,0.8)',
              borderBottom:'1.5px solid rgba(255,255,255,0.2)',
              borderRight:'1.5px solid rgba(255,255,255,0.2)',
              borderRadius:28, padding:32,
              boxShadow:'0 16px 32px rgba(16,42,25,0.05)',
              display:'flex', gap:20, alignItems:'flex-start',
              transition:'transform 0.3s, box-shadow 0.3s',
              cursor:'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(16,42,25,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(16,42,25,0.05)'; }}
            >
              <div style={{
                width:52, height:52, borderRadius:16, flexShrink:0,
                background:`rgba(16,42,25,0.06)`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize:24, color: g.color }}>{g.icon}</span>
              </div>
              <div>
                <h3 style={{ fontFamily:'Newsreader,serif', fontSize:20, color:'#102A19', marginBottom:6 }}>{g.title}</h3>
                <p style={{ fontSize:13, color:'#424842', lineHeight:1.75 }}>{g.desc}</p>
                <span style={{
                  display:'inline-block', marginTop:12,
                  fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.1em',
                  color:'#D4AF37',
                }}>Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Three Pillars ── */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 64px' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <SectionHeading label="Ayurvedic Approach" title={<>The Three Pillars of <span style={{ fontStyle:'italic' }}>Wellness</span></>} />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:24 }}>
          {WELLNESS_PILLARS.map((p, i) => (
            <GlassCard key={i} gold={i === 0} style={{ padding:32, borderRadius:28, textAlign:'center' }}>
              <span style={{
                fontFamily:'Newsreader,serif', fontSize:40, fontWeight:300,
                color:'#D4AF37', display:'block', marginBottom:8, lineHeight:1,
              }}>{String(i + 1).padStart(2, '0')}</span>
              <h4 style={{ fontFamily:'Newsreader,serif', fontSize:22, color:'#102A19', marginBottom:10 }}>{p.title}</h4>
              <p style={{ fontSize:13, color:'#424842', lineHeight:1.75 }}>{p.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 80px' }}>
        <div style={{
          background:'linear-gradient(135deg, #102A19, #1a4028)', borderRadius:40,
          padding:'clamp(40px,6vw,56px)', textAlign:'center', position:'relative', overflow:'hidden',
        }}>
          <div style={{ position:'absolute', top:'-30%', left:'5%', width:250, height:250, background:'rgba(212,175,55,0.08)', filter:'blur(80px)', borderRadius:'50%' }} />
          <div style={{ position:'absolute', bottom:'-20%', right:'10%', width:300, height:300, background:'rgba(176,206,181,0.06)', filter:'blur(80px)', borderRadius:'50%' }} />
          <h3 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(24px,4vw,36px)', fontWeight:300, color:'#fff', marginBottom:16, position:'relative' }}>
            Begin Your <span style={{ fontStyle:'italic', color:'#D4AF37' }}>Ayurvedic Journey</span>
          </h3>
          <p style={{ fontSize:14, color:'rgba(255,255,255,0.55)', maxWidth:480, margin:'0 auto 24px', position:'relative' }}>
            Consult with our Vaidya team or explore our complete range of wellness products.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', position:'relative' }}>
            <Link href="/contact" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              background:'linear-gradient(135deg, #D4AF37, #e9c349)',
              color:'#102A19', padding:'14px 32px', borderRadius:9999,
              fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.12em', textDecoration:'none',
              boxShadow:'0 8px 24px rgba(212,175,55,0.3)',
            }}>
              Consult a Vaidya <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_forward</span>
            </Link>
            <Link href="/" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              background:'transparent', border:'1px solid rgba(255,255,255,0.2)',
              color:'#fff', padding:'14px 32px', borderRadius:9999,
              fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', textDecoration:'none',
            }}>
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </StoreLayout>
  );
}
