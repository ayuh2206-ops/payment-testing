// pages/contact.jsx
// ═══ Contact — uses StoreLayout for consistent nav ═══
import { useState } from 'react';
import StoreLayout, { GlassCard } from '@/components/StoreLayout';

const FAQS = [
  { q:'Product Sourcing', a:'All herbs are ethically sourced following Ayurvedic seasonal harvesting principles from certified organic farms across India.' },
  { q:'Consultation Process', a:'Our Vaidya team is available for consultations via phone or video call. Contact us to schedule a session.' },
  { q:'Pan-India Shipping', a:'We ship to all Indian states. Free shipping on orders above ₹500.' },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <StoreLayout title="Contact" description="Get in touch with Shree Brahmachaitanya Ayurved">
      {/* Header */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', marginBottom:64 }}>
        <h1 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(40px,7vw,72px)', fontWeight:300, fontStyle:'italic', color:'#102a19', lineHeight:1.1, marginBottom:16 }}>Begin the dialogue.</h1>
        <p style={{ fontSize:17, color:'#424842', maxWidth:560, lineHeight:1.7 }}>Whether seeking product guidance or clarity on our formulations, our Vaidya team is here to assist.</p>
      </div>

      {/* 7/5 grid — from Stitch contact_support */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px 80px', display:'grid', gridTemplateColumns:'7fr 5fr', gap:64, alignItems:'start' }} className="contact-grid">
        {/* LEFT: Glass Form */}
        <section>
          <GlassCard style={{ borderRadius:28, padding:'clamp(32px,5vw,64px)' }}>
            <h2 style={{ fontFamily:'Newsreader,serif', fontSize:28, color:'#102a19', marginBottom:48 }}>Send a Message</h2>
            <form onSubmit={e => e.preventDefault()} style={{ display:'flex', flexDirection:'column', gap:48 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48 }} className="form-2col">
                {[{l:'Full Name',p:'Your name',t:'text'},{l:'Email Address',p:'you@email.com',t:'email'}].map(f => (
                  <div key={f.l}>
                    <label style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#424842', display:'block', marginBottom:8 }}>{f.l}</label>
                    <input type={f.t} placeholder={f.p} style={{ width:'100%', background:'transparent', border:'none', borderBottom:'1px solid rgba(66,72,66,0.2)', padding:'12px 0', fontSize:15, color:'#102a19', outline:'none', transition:'border-color 0.3s' }}
                      onFocus={e => e.target.style.borderBottomColor='#102a19'} onBlur={e => e.target.style.borderBottomColor='rgba(66,72,66,0.2)'} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#424842', display:'block', marginBottom:8 }}>Subject of Inquiry</label>
                <select style={{ width:'100%', background:'transparent', border:'none', borderBottom:'1px solid rgba(66,72,66,0.2)', padding:'12px 0', fontSize:15, color:'#102a19', outline:'none', appearance:'none' }}>
                  <option>General Inquiries</option><option>Ayurvedic Consultations</option><option>Order & Fulfillment</option><option>Partnership</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#424842', display:'block', marginBottom:8 }}>The Message</label>
                <textarea rows={4} placeholder="How may we assist your practice today?" style={{ width:'100%', background:'transparent', border:'none', borderBottom:'1px solid rgba(66,72,66,0.2)', padding:'12px 0', fontSize:15, color:'#102a19', outline:'none', resize:'vertical' }} />
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
                <button type="submit" style={{ display:'inline-flex', alignItems:'center', gap:16, background:'#102a19', color:'#fff', padding:'20px 40px', borderRadius:9999, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em', border:'none', boxShadow:'0 12px 32px rgba(16,42,25,0.15)', cursor:'pointer' }}>
                  Send Message <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_right_alt</span>
                </button>
                <span style={{ fontSize:10, fontStyle:'italic', textTransform:'uppercase', letterSpacing:'0.05em', color:'rgba(66,72,66,0.5)' }}>We respond within 24 hours.</span>
              </div>
            </form>
          </GlassCard>
        </section>

        {/* RIGHT: Info cards + FAQ + Image */}
        <section style={{ display:'flex', flexDirection:'column', gap:40 }}>
          {[
            { icon:'location_on', title:'The Clinic', lines:['533, Manorama Apt, Anand Nagar,','Juni Shukrawari Road, Nagpur — 440009'] },
            { icon:'mail', title:'Digital Contact', lines:['info@sbayurved.com','+91 9168584999'] },
          ].map((card,i) => (
            <div key={i} className="liquid-glass" style={{ borderRadius:28, padding:32, transition:'transform 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:20 }}>
                <div style={{ width:48, height:48, borderRadius:9999, flexShrink:0, background:'rgba(203,234,208,0.4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span className="material-symbols-outlined" style={{ color:'#102a19' }}>{card.icon}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily:'Newsreader,serif', fontSize:20, color:'#102a19', marginBottom:8 }}>{card.title}</h3>
                  {card.lines.map((l,j) => <p key={j} style={{ fontSize:14, color:'#424842', lineHeight:1.7 }}>{l}</p>)}
                </div>
              </div>
            </div>
          ))}

          {/* FAQ Accordion */}
          <div style={{ background:'#f4f4f1', borderRadius:28, padding:40 }}>
            <h3 style={{ fontFamily:'Newsreader,serif', fontSize:22, color:'#102a19', marginBottom:32 }}>Frequent Questions</h3>
            {FAQS.map((faq,i) => (
              <div key={i} onClick={() => setOpenFaq(openFaq===i?null:i)} style={{ borderBottom:'1px solid rgba(194,200,192,0.3)', paddingBottom:16, marginBottom:16, cursor:'pointer' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'#102a19' }}>{faq.q}</span>
                  <span className="material-symbols-outlined" style={{ color:'#102a19', fontSize:20, transform:openFaq===i?'rotate(45deg)':'none', transition:'transform 0.3s' }}>add</span>
                </div>
                {openFaq===i && <p style={{ fontSize:14, color:'#424842', lineHeight:1.7, paddingTop:12 }}>{faq.a}</p>}
              </div>
            ))}
          </div>

          {/* Image with quote */}
          <div style={{ position:'relative', height:256, borderRadius:28, overflow:'hidden' }}>
            <img src="https://images.unsplash.com/photo-1611241893603-3c228ee0ae6f?w=800&q=80" alt="Ayurvedic bottles" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(16,42,25,0.65), transparent)', display:'flex', alignItems:'flex-end', padding:32 }}>
              <p style={{ color:'#fff', fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:17, lineHeight:1.6 }}>"In every walk with nature one receives far more than he seeks."</p>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </StoreLayout>
  );
}
