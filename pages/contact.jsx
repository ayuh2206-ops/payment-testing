// pages/contact.jsx
// Contact Us — SB Ayurved
// Stitch Botanical Liquid Glass: glassmorphic form panel + info cards + atmospheric depth
import StoreLayout, { GlassCard, PageHero } from '@/components/StoreLayout';

const INFO_CARDS = [
  { icon: 'location_on', title: 'Visit Us',     lines: ['533, Manorama Apt, Anand Nagar,', 'Juni Shukrawari Road,', 'Nagpur — 440009'] },
  { icon: 'call',        title: 'Call Us',       lines: ['+91 9168584999', '+91 8329602635'] },
  { icon: 'mail',        title: 'Write to Us',   lines: ['info@sbayurved.com'] },
  { icon: 'schedule',    title: 'Working Hours', lines: ['Mon–Sat: 10:00 AM – 7:00 PM', 'Sunday: Closed'] },
];

export default function ContactPage() {
  return (
    <StoreLayout title="Contact Us" description="Get in touch with Shree Brahmachaitanya Ayurved — Nagpur">
      <PageHero
        title="Begin the dialogue."
        breadcrumb="Contact Us"
        subtitle="Whether seeking product guidance or partnership opportunities, our team is here to assist your journey into Ayurvedic wellness."
      />

      <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:40 }} className="contact-grid">

          {/* ── Contact Form ── */}
          <GlassCard style={{ padding:'clamp(32px,5vw,56px)' }}>
            <h2 style={{ fontFamily:'Newsreader,serif', fontSize:28, color:'#102A19', marginBottom:40 }}>Send a Message</h2>
            <form onSubmit={e => e.preventDefault()} style={{ display:'flex', flexDirection:'column', gap:36 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:36 }} className="form-2col">
                {[
                  { label:'Full Name', ph:'Your name', type:'text' },
                  { label:'Email Address', ph:'you@email.com', type:'email' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#424842', display:'block', marginBottom:8 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} style={{
                      width:'100%', background:'transparent', border:'none',
                      borderBottom:'1px solid rgba(194,200,192,0.4)',
                      padding:'12px 0', fontSize:15, color:'#102A19', outline:'none',
                      fontFamily:'Manrope,sans-serif', transition:'border-color 0.3s',
                    }}
                      onFocus={e => e.target.style.borderBottomColor = '#D4AF37'}
                      onBlur={e => e.target.style.borderBottomColor = 'rgba(194,200,192,0.4)'}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#424842', display:'block', marginBottom:8 }}>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" style={{
                  width:'100%', background:'transparent', border:'none',
                  borderBottom:'1px solid rgba(194,200,192,0.4)',
                  padding:'12px 0', fontSize:15, color:'#102A19', outline:'none',
                  fontFamily:'Manrope,sans-serif', transition:'border-color 0.3s',
                }}
                  onFocus={e => e.target.style.borderBottomColor = '#D4AF37'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(194,200,192,0.4)'}
                />
              </div>
              <div>
                <label style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#424842', display:'block', marginBottom:8 }}>Your Message</label>
                <textarea rows={4} placeholder="How may we help you today?" style={{
                  width:'100%', background:'transparent', border:'none',
                  borderBottom:'1px solid rgba(194,200,192,0.4)',
                  padding:'12px 0', fontSize:15, color:'#102A19', outline:'none', resize:'vertical',
                  fontFamily:'Manrope,sans-serif', transition:'border-color 0.3s',
                }}
                  onFocus={e => e.target.style.borderBottomColor = '#D4AF37'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(194,200,192,0.4)'}
                />
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16, paddingTop:8 }}>
                <button type="submit" style={{
                  display:'inline-flex', alignItems:'center', gap:10,
                  background:'#102A19', color:'#fff', padding:'16px 36px', borderRadius:9999,
                  fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700,
                  textTransform:'uppercase', letterSpacing:'0.15em', border:'none', cursor:'pointer',
                  boxShadow:'0 12px 32px rgba(16,42,25,0.15)', transition:'all 0.3s',
                }}>
                  Send Message
                  <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_forward</span>
                </button>
                <span style={{ fontSize:11, fontStyle:'italic', color:'rgba(66,72,66,0.5)' }}>We respond within 24 hours.</span>
              </div>
            </form>
          </GlassCard>

          {/* ── Info Cards Grid ── */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:20 }}>
            {INFO_CARDS.map((c, i) => (
              <div key={i} style={{
                background:'rgba(255,255,255,0.45)',
                backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
                borderTop:'1.5px solid rgba(255,255,255,0.8)',
                borderLeft:'1.5px solid rgba(255,255,255,0.8)',
                borderBottom:'1.5px solid rgba(255,255,255,0.2)',
                borderRight:'1.5px solid rgba(255,255,255,0.2)',
                borderRadius:28, padding:28,
                boxShadow:'0 16px 32px rgba(16,42,25,0.05)',
                transition:'transform 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{
                  width:44, height:44, borderRadius:9999, marginBottom:16,
                  background:'rgba(203,234,208,0.4)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize:20, color:'#102A19' }}>{c.icon}</span>
                </div>
                <h3 style={{ fontFamily:'Newsreader,serif', fontSize:18, color:'#102A19', marginBottom:8 }}>{c.title}</h3>
                {c.lines.map((l, j) => (
                  <p key={j} style={{ fontSize:13, color:'#424842', lineHeight:1.7 }}>{l}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 640px) {
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </StoreLayout>
  );
}
