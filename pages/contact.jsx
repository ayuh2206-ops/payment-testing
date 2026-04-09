// pages/contact.jsx
// ═══ Contact — matching Stitch contact_support/code.html exactly ═══
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const FAQS = [
  { q: 'Product Sourcing', a: 'All herbs are ethically sourced following Ayurvedic seasonal harvesting principles from certified organic farms across India.' },
  { q: 'Consultation Process', a: 'Our Vaidya team is available for consultations via phone or video call. Contact us to schedule a personalized session.' },
  { q: 'Pan-India Shipping', a: 'We ship to all Indian states with temperature-controlled packaging to preserve botanical potency. Free shipping on orders above ₹500.' },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Head>
        <title>Contact | SB Ayurved</title>
        <meta name="description" content="Get in touch with Shree Brahmachaitanya Ayurved — Nagpur" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background:'#FCFCF9', color:'#1a1c1b', minHeight:'100vh' }}>

        {/* Atmospheric blobs */}
        <div className="botanical-blob" style={{ top:-96, left:-96, width:500, height:500, background:'rgba(16,42,25,0.04)' }} />
        <div className="botanical-blob" style={{ bottom:40, right:40, width:400, height:400, background:'rgba(73,101,80,0.04)' }} />
        <div className="botanical-blob" style={{ top:'50%', left:'33%', width:300, height:300, background:'rgba(176,206,181,0.06)' }} />

        {/* Navbar — glass pill */}
        <nav style={{
          position:'fixed', top:0, left:0, right:0, zIndex:50,
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'16px 40px', maxWidth:1280, margin:'24px auto 0', width:'92%', borderRadius:9999,
          background:'rgba(255,255,255,0.4)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
          borderTop:'1.5px solid rgba(255,255,255,0.8)', borderLeft:'1.5px solid rgba(255,255,255,0.8)',
          borderBottom:'1.5px solid rgba(255,255,255,0.4)', borderRight:'1.5px solid rgba(255,255,255,0.4)',
          boxShadow:'0 20px 40px rgba(16,42,25,0.06)',
        }}>
          <Link href="/"><span style={{ fontSize:22, fontFamily:'Newsreader,serif', fontStyle:'italic', color:'#102a19' }}>SB Ayurved</span></Link>
          <div style={{ display:'flex', gap:40 }} className="hide-mobile">
            {['Shop','Heritage','Wellness','Journal','Contact'].map((l,i) => (
              <Link key={l} href={['/products','/about','/wellness','/blog','/contact'][i]} style={{
                fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.15em',
                color: l==='Contact' ? '#102a19' : '#424842',
                borderBottom: l==='Contact' ? '2px solid rgba(16,42,25,0.2)' : 'none', paddingBottom:4,
              }}>{l}</Link>
            ))}
          </div>
          <div style={{ display:'flex', gap:24, color:'#102a19' }}>
            <Link href="/checkout"><span className="material-symbols-outlined">shopping_bag</span></Link>
            <Link href="/admin"><span className="material-symbols-outlined">person</span></Link>
          </div>
        </nav>

        <main style={{ paddingTop:160, paddingBottom:96, maxWidth:1280, margin:'0 auto', padding:'160px 24px 96px' }}>

          {/* Header — from Stitch: text-5xl md:text-7xl italic */}
          <header style={{ marginBottom:80 }}>
            <h1 style={{
              fontFamily:'Newsreader,serif', fontSize:'clamp(40px,7vw,72px)',
              fontWeight:300, fontStyle:'italic', color:'#102a19',
              lineHeight:1.1, marginBottom:16,
            }}>Begin the dialogue.</h1>
            <p style={{ fontSize:17, color:'#424842', maxWidth:560, lineHeight:1.7 }}>
              Whether seeking product guidance or clarity on our formulations, our Vaidya team is here to assist your Ayurvedic wellness journey.
            </p>
          </header>

          {/* ── Two-column layout: 7/5 from Stitch ── */}
          <div style={{ display:'grid', gridTemplateColumns:'7fr 5fr', gap:64, alignItems:'start' }} className="contact-grid">

            {/* LEFT: Glass Form Panel — from Stitch: bg-white/40 backdrop-blur-2xl rounded-3xl p-16 glass-edge */}
            <section>
              <div className="liquid-glass" style={{
                borderRadius:28, padding:'clamp(32px,5vw,64px)',
                boxShadow:'0 20px 40px rgba(16,42,25,0.06)',
              }}>
                <h2 style={{ fontFamily:'Newsreader,serif', fontSize:28, color:'#102a19', marginBottom:48 }}>Send a Message</h2>
                <form onSubmit={e => e.preventDefault()} style={{ display:'flex', flexDirection:'column', gap:48 }}>
                  {/* Name + Email row */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48 }} className="form-2col">
                    {[{l:'Full Name',p:'Your name',t:'text'},{l:'Email Address',p:'you@email.com',t:'email'}].map(f => (
                      <div key={f.l}>
                        <label style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#424842', display:'block', marginBottom:8 }}>{f.l}</label>
                        <input type={f.t} placeholder={f.p} style={{
                          width:'100%', background:'transparent', border:'none',
                          borderBottom:'1px solid rgba(66,72,66,0.2)', padding:'12px 0',
                          fontSize:15, color:'#102a19', outline:'none', transition:'border-color 0.3s',
                        }}
                          onFocus={e => e.target.style.borderBottomColor = '#102a19'}
                          onBlur={e => e.target.style.borderBottomColor = 'rgba(66,72,66,0.2)'}
                        />
                      </div>
                    ))}
                  </div>
                  {/* Subject */}
                  <div>
                    <label style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#424842', display:'block', marginBottom:8 }}>Subject of Inquiry</label>
                    <select style={{
                      width:'100%', background:'transparent', border:'none',
                      borderBottom:'1px solid rgba(66,72,66,0.2)', padding:'12px 0',
                      fontSize:15, color:'#102a19', outline:'none', appearance:'none',
                    }}>
                      <option>General Inquiries</option>
                      <option>Ayurvedic Consultations</option>
                      <option>Order & Fulfillment</option>
                      <option>Partnership & Distribution</option>
                    </select>
                  </div>
                  {/* Message */}
                  <div>
                    <label style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#424842', display:'block', marginBottom:8 }}>The Message</label>
                    <textarea rows={4} placeholder="How may we assist your practice today?" style={{
                      width:'100%', background:'transparent', border:'none',
                      borderBottom:'1px solid rgba(66,72,66,0.2)', padding:'12px 0',
                      fontSize:15, color:'#102a19', outline:'none', resize:'vertical',
                    }} />
                  </div>
                  {/* Submit */}
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16, paddingTop:16 }}>
                    <button type="submit" style={{
                      display:'inline-flex', alignItems:'center', gap:16,
                      background:'#102a19', color:'#fff', padding:'20px 40px', borderRadius:9999,
                      fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700,
                      textTransform:'uppercase', letterSpacing:'0.15em', border:'none',
                      boxShadow:'0 12px 32px rgba(16,42,25,0.15)', cursor:'pointer',
                    }}>
                      Send Message
                      <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_right_alt</span>
                    </button>
                    <span style={{ fontSize:10, fontStyle:'italic', textTransform:'uppercase', letterSpacing:'0.05em', color:'rgba(66,72,66,0.5)' }}>
                      We respond within 24 hours.
                    </span>
                  </div>
                </form>
              </div>
            </section>

            {/* RIGHT: Info cards + FAQ + Image — from Stitch */}
            <section style={{ display:'flex', flexDirection:'column', gap:40 }}>
              {/* Contact cards — from Stitch: bg-white/40 backdrop-blur-2xl rounded-3xl p-8 glass-edge shadow-xl */}
              {[
                { icon:'location_on', title:'The Clinic', lines:['533, Manorama Apt, Anand Nagar,','Juni Shukrawari Road, Nagpur — 440009'], bg:'rgba(203,234,208,0.4)' },
                { icon:'mail', title:'Digital Contact', lines:['info@sbayurved.com','+91 9168584999'], bg:'rgba(214,231,214,0.4)' },
              ].map((card,i) => (
                <div key={i} className="liquid-glass" style={{
                  borderRadius:28, padding:32, boxShadow:'0 16px 32px rgba(16,42,25,0.05)',
                  transition:'transform 0.3s',
                }}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:20 }}>
                    <div style={{
                      width:48, height:48, borderRadius:9999, flexShrink:0,
                      background: card.bg,
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>
                      <span className="material-symbols-outlined" style={{ color:'#102a19' }}>{card.icon}</span>
                    </div>
                    <div>
                      <h3 style={{ fontFamily:'Newsreader,serif', fontSize:20, color:'#102a19', marginBottom:8 }}>{card.title}</h3>
                      {card.lines.map((l,j) => (
                        <p key={j} style={{ fontSize:14, color:'#424842', lineHeight:1.7 }}>{l}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* FAQ Accordion — from Stitch: bg-surface-container-low rounded-3xl p-10 */}
              <div style={{ background:'#f4f4f1', borderRadius:28, padding:40 }}>
                <h3 style={{ fontFamily:'Newsreader,serif', fontSize:22, color:'#102a19', marginBottom:32 }}>Frequent Questions</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
                  {FAQS.map((faq, i) => (
                    <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                      borderBottom:'1px solid rgba(194,200,192,0.3)', paddingBottom:16, cursor:'pointer',
                    }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                        <span style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'#102a19' }}>{faq.q}</span>
                        <span className="material-symbols-outlined" style={{
                          color:'#102a19', fontSize:20,
                          transform: openFaq === i ? 'rotate(45deg)' : 'none',
                          transition:'transform 0.3s',
                        }}>add</span>
                      </div>
                      {openFaq === i && (
                        <p style={{ fontSize:14, color:'#424842', lineHeight:1.7, paddingBottom:8 }}>{faq.a}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Image with quote overlay — from Stitch: rounded-3xl overflow-hidden group */}
              <div style={{ position:'relative', height:256, borderRadius:28, overflow:'hidden' }}>
                <img src="https://images.unsplash.com/photo-1611241893603-3c228ee0ae6f?w=800&q=80" alt="Ayurvedic bottles"
                  style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s' }} />
                <div style={{
                  position:'absolute', inset:0,
                  background:'linear-gradient(to top, rgba(16,42,25,0.65), transparent)',
                  display:'flex', alignItems:'flex-end', padding:32,
                }}>
                  <p style={{ color:'#fff', fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:17, lineHeight:1.6 }}>
                    "In every walk with nature one receives far more than he seeks."
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:48, padding:'96px 32px 48px', background:'#F9F9F6' }}>
          <span style={{ fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:28, color:'#102a19' }}>SB Ayurved</span>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:48 }}>
            {[{t:'About',h:'/about'},{t:'Products',h:'/wellness'},{t:'Shipping',h:'/terms'},{t:'Privacy',h:'/privacy'}].map(l => (
              <Link key={l.h} href={l.h} style={{ color:'#424842', fontSize:14, opacity:0.8 }}>{l.t}</Link>
            ))}
          </div>
          <p style={{ fontSize:12, color:'#424842', opacity:0.5 }}>© 2025 Shree Brahmachaitanya Ayurved. Rooted in Tradition.</p>
        </footer>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
