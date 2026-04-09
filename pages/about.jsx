// pages/about.jsx
// ═══ About — uses StoreLayout for consistent nav ═══
import Link from 'next/link';
import StoreLayout, { GlassCard } from '@/components/StoreLayout';

export default function AboutPage() {
  return (
    <StoreLayout title="About Us" description="The philosophy behind Shree Brahmachaitanya Ayurved">
      {/* Hero — centered, matching Stitch our_philosophy */}
      <section style={{ maxWidth:960, margin:'0 auto', textAlign:'center', marginBottom:120, padding:'0 24px', position:'relative' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'120%', height:'120%', background:'rgba(73,101,80,0.05)', filter:'blur(100px)', zIndex:0 }} />
        <span style={{ fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.3em', color:'#424842', display:'block', marginBottom:32, position:'relative' }}>The Soul of SB Ayurved</span>
        <h1 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(40px,7vw,80px)', fontWeight:300, color:'#001406', letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:64, position:'relative' }}>
          The Confluence of<br /><span style={{ fontStyle:'italic', fontWeight:400 }}>Nature and Healing</span>
        </h1>
        <div className="liquid-glass" style={{ position:'relative', width:'100%', maxWidth:900, margin:'0 auto', aspectRatio:'16/10', overflow:'hidden', borderRadius:64 }}>
          <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80" alt="Ayurvedic herbs" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        </div>
      </section>

      {/* Content Glass Panel */}
      <section style={{ maxWidth:900, margin:'0 auto', padding:'0 24px 80px', position:'relative' }}>
        <GlassCard style={{ borderRadius:64, padding:'clamp(32px,6vw,80px)' }}>
          <div style={{ maxWidth:720, margin:'0 auto' }}>
            <p style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(22px,3vw,32px)', color:'#102a19', lineHeight:1.6, marginBottom:40 }}>
              At the heart of Shree Brahmachaitanya Ayurved lies a belief that wellness is not a destination, but a rhythmic dialogue between the Vaidya's wisdom and the healing power of nature.
            </p>
            <p style={{ fontSize:17, color:'#424842', lineHeight:2, marginBottom:40 }}>
              Founded by a group of Ayurvedic physicians, our philosophy is rooted in the ancestral wisdom of Ayurveda — the 'Science of Life.' We don't merely manufacture products; we curate authentic formulations that resonate with the body's natural healing frequencies. Our core associates are postgraduates in Rasashastra, Bhaishajya Kalpana, Dravyaguna, and Kaychikitsa — bringing depth knowledge of classical Shastrokt manufacturing.
            </p>

            {/* Asymmetric pillar cards — from Stitch: one offset translateY(48px) */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, margin:'80px 0' }} className="pillar-grid">
              {[
                { icon:'eco', title:'Ethical Sourcing', desc:'We trace every ingredient from sustainable harvest to final preparation, ensuring nature is honored as much as the formulation.', offset:true },
                { icon:'science', title:'Clinical Precision', desc:'While we honor Shastrokt tradition, we utilize modern GMP-compliant processes to preserve full bioavailability of every compound.', offset:false },
              ].map((c, i) => (
                <div key={i} className="liquid-glass" style={{
                  padding:40, borderRadius:28, transform: c.offset ? 'translateY(48px)' : 'none',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize:36, color:'#D4AF37', marginBottom:24, display:'block' }}>{c.icon}</span>
                  <h3 style={{ fontFamily:'Newsreader,serif', fontSize:22, color:'#102a19', marginBottom:16 }}>{c.title}</h3>
                  <p style={{ fontSize:14, color:'#424842', lineHeight:1.8 }}>{c.desc}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize:17, color:'#424842', lineHeight:2, paddingTop:40 }}>
              We believe in the beauty of the slow, authentic process. By the grace of Lord Dhanvantari and Shri Brahmachaitanya Gondavlekar Maharaj, we have succeeded in producing more than 160 generic and 12 research-based proprietary products — extending service to Vaidyas across the nation.
            </p>

            <div style={{ borderTop:'1px solid rgba(16,42,25,0.06)', paddingTop:64, marginTop:64, textAlign:'center' }}>
              <Link href="/products" style={{
                display:'inline-flex', alignItems:'center', gap:12,
                background:'#102a19', color:'#ffffff', padding:'20px 40px',
                borderRadius:9999, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em',
                boxShadow:'0 12px 32px rgba(16,42,25,0.15)',
              }}>Explore Our Formulations</Link>
            </div>
          </div>
        </GlassCard>

        {/* Decorative floating element */}
        <div className="hide-mobile" style={{
          position:'absolute', left:-96, top:'25%', width:192, height:192, borderRadius:'50%',
          border:'1px solid rgba(16,42,25,0.08)', display:'flex', alignItems:'center', justifyContent:'center', transform:'rotate(-12deg)',
        }}>
          <span style={{ fontFamily:'Newsreader,serif', fontStyle:'italic', color:'rgba(16,42,25,0.25)', fontSize:14, textAlign:'center', padding:32 }}>Formulated for the Vaidya</span>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .pillar-grid { grid-template-columns: 1fr !important; }
          .pillar-grid > div { transform: none !important; }
        }
      `}</style>
    </StoreLayout>
  );
}
