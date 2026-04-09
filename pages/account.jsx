// pages/account.jsx
// ═══ Customer Portal — matching Stitch customer_portal/code.html ═══
// Glass sidebar + order history cards + membership bento stats
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SIDEBAR_NAV = [
  { icon:'dashboard', label:'Dashboard', active:false },
  { icon:'auto_stories', label:'Orders', active:true },
  { icon:'eco', label:'Products', active:false },
  { icon:'favorite', label:'Wishlist', active:false },
  { icon:'settings', label:'Settings', active:false },
];

export default function AccountPage() {
  return (
    <>
      <Head>
        <title>My Account | SB Ayurved</title>
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background:'#f9f9f6', color:'#1a1c1b', minHeight:'100vh', display:'flex' }}>
        {/* Atmospheric blobs */}
        <div className="botanical-blob" style={{ top:'-10%', left:'-10%', width:'60%', height:'60%', background:'rgba(232,243,234,0.6)' }} />
        <div className="botanical-blob" style={{ bottom:'-5%', right:'-5%', width:'50%', height:'50%', background:'rgba(241,244,232,0.7)' }} />
        <div className="botanical-blob" style={{ top:'30%', right:'10%', width:'30%', height:'30%', background:'rgba(222,228,221,0.4)' }} />

        {/* ═══ SIDEBAR — from Stitch: fixed left-0 w-72 bg-white/40 backdrop-blur-2xl rounded-r-[3rem] glass ═══ */}
        <aside style={{
          position:'fixed', left:0, top:0, bottom:0, width:288,
          display:'flex', flexDirection:'column', padding:32, zIndex:40,
          background:'rgba(255,255,255,0.4)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
          borderRight:'1px solid rgba(255,255,255,0.4)',
          borderTopRightRadius:48, borderBottomRightRadius:48,
          boxShadow:'20px 0 40px rgba(16,42,25,0.05)',
          margin:'20px 0',
        }}>
          <div style={{ marginBottom:48 }}>
            <Link href="/"><h1 style={{ fontFamily:'Newsreader,serif', fontSize:20, color:'#102a19' }}>SB Ayurved</h1></Link>
            <p style={{ fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.15em', color:'#424842', marginTop:4 }}>My Account</p>
          </div>

          <nav style={{ flex:1, display:'flex', flexDirection:'column', gap:4 }}>
            {SIDEBAR_NAV.map(n => (
              <a key={n.label} href="#" style={{
                display:'flex', alignItems:'center', gap:16, padding:'12px 16px',
                borderRadius:12, transition:'all 0.3s',
                background: n.active ? '#102a19' : 'transparent',
                color: n.active ? '#fff' : '#424842',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize:20 }}>{n.icon}</span>
                <span style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.12em' }}>{n.label}</span>
              </a>
            ))}
            <Link href="/products" style={{
              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
              marginTop:32, padding:'12px 16px', borderRadius:12,
              background:'#102a19', color:'#fff',
              fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700,
              textTransform:'uppercase', letterSpacing:'0.12em',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize:16 }}>add</span>
              Shop Products
            </Link>
          </nav>

          <div style={{ borderTop:'1px solid rgba(255,255,255,0.2)', paddingTop:32, marginTop:'auto' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24, padding:'0 8px' }}>
              <div style={{ width:40, height:40, borderRadius:9999, background:'rgba(232,232,229,0.8)', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid rgba(255,255,255,0.5)' }}>
                <span className="material-symbols-outlined" style={{ fontSize:20, color:'#102a19' }}>person</span>
              </div>
              <div>
                <p style={{ fontFamily:'Manrope,sans-serif', fontSize:13, fontWeight:600, color:'#102a19' }}>Customer</p>
                <p style={{ fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.05em', color:'#424842' }}>Member</p>
              </div>
            </div>
            <nav style={{ display:'flex', flexDirection:'column', gap:4 }}>
              <a href="#" style={{ display:'flex', alignItems:'center', gap:16, padding:'8px 16px', borderRadius:12, color:'#424842', fontFamily:'Manrope,sans-serif', fontSize:11, textTransform:'uppercase', letterSpacing:'0.12em' }}>
                <span className="material-symbols-outlined" style={{ fontSize:18 }}>help_outline</span> Support
              </a>
              <Link href="/" style={{ display:'flex', alignItems:'center', gap:16, padding:'8px 16px', borderRadius:12, color:'#424842', fontFamily:'Manrope,sans-serif', fontSize:11, textTransform:'uppercase', letterSpacing:'0.12em' }}>
                <span className="material-symbols-outlined" style={{ fontSize:18 }}>storefront</span> Back to Store
              </Link>
            </nav>
          </div>
        </aside>

        {/* ═══ MAIN CONTENT — from Stitch: ml-72 p-20 ═══ */}
        <main style={{ marginLeft:288, minHeight:'100vh', padding:'clamp(32px,5vw,80px)', flex:1 }}>
          <header style={{ maxWidth:960, margin:'0 auto 64px' }}>
            <h2 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(36px,5vw,48px)', color:'#102a19', lineHeight:1.2 }}>My Orders</h2>
            <p style={{ fontFamily:'Manrope,sans-serif', fontSize:16, color:'#424842', maxWidth:560, marginTop:16, lineHeight:1.7 }}>
              Your archive of Ayurvedic purchases. Track shipments or reorder your favorites.
            </p>
          </header>

          <section style={{ maxWidth:960, margin:'0 auto', display:'flex', flexDirection:'column', gap:32 }}>
            {/* Order Card 1 — from Stitch: liquid-glass rounded-xl p-8 shadow hover:-translate-y-1 */}
            {[
              { status:'Delivered', statusBg:'rgba(203,234,208,0.5)', ref:'#SBA-10241', title:'Proprietary Special Kit', date:'March 15, 2025', total:'₹1,280', action:'View Details' },
              { status:'In Transit', statusBg:'rgba(222,228,221,0.5)', ref:'#SBA-10298', title:'AyuAahar Wellness Bundle', date:'April 2, 2025', total:'₹654', action:'Track Shipment' },
              { status:'Processing', statusBg:'rgba(233,195,73,0.15)', ref:'#SBA-10312', title:'Classical Churna Collection', date:'April 8, 2025', total:'₹890', action:'View Details' },
            ].map((order, i) => (
              <div key={i} className="liquid-glass" style={{
                borderRadius:16, padding:32,
                boxShadow:'0 20px 40px rgba(16,42,25,0.06)',
                transition:'transform 0.5s', cursor:'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:24 }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <span style={{
                        padding:'4px 12px', borderRadius:9999,
                        background: order.statusBg,
                        fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700,
                        textTransform:'uppercase', letterSpacing:'0.12em', color:'#102a19',
                      }}>{order.status}</span>
                      <span style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color:'#424842', letterSpacing:'0.04em' }}>Order {order.ref}</span>
                    </div>
                    <h3 style={{ fontFamily:'Newsreader,serif', fontSize:22, color:'#102a19' }}>{order.title}</h3>
                    <p style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color:'#424842' }}>Ordered on {order.date} · Total {order.total}</p>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:16 }}>
                    <div style={{ display:'flex', gap:-12 }}>
                      {[0,1,2].map(j => (
                        <div key={j} style={{
                          width:56, height:56, borderRadius:16, overflow:'hidden',
                          border:'4px solid rgba(255,255,255,0.6)', boxShadow:'0 2px 8px rgba(16,42,25,0.1)',
                          background:'rgba(213,227,216,0.3)', display:'flex', alignItems:'center', justifyContent:'center',
                          marginLeft: j > 0 ? -12 : 0,
                        }}>
                          <span style={{ fontSize:20 }}>🌿</span>
                        </div>
                      ))}
                    </div>
                    <button style={{
                      fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700,
                      textTransform:'uppercase', letterSpacing:'0.12em', color:'#102a19',
                      background:'none', border:'none', borderBottom:'1px solid rgba(16,42,25,0.2)',
                      paddingBottom:4, cursor:'pointer', transition:'border-color 0.3s',
                    }}>{order.action}</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Stats Bento — from Stitch: grid grid-cols-3 gap-6 pt-8, asymmetric */}
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:24, paddingTop:32 }} className="bento-stats">
              {/* Wide card */}
              <div className="liquid-glass" style={{ borderRadius:16, padding:40, display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'relative', zIndex:1 }}>
                  <p style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em', color:'#424842', marginBottom:8 }}>Membership Status</p>
                  <h4 style={{ fontFamily:'Newsreader,serif', fontSize:28, color:'#102a19', marginBottom:16 }}>Valued Customer</h4>
                  <div style={{ display:'flex', alignItems:'center', gap:24 }}>
                    <div>
                      <p style={{ fontFamily:'Manrope,sans-serif', fontSize:24, fontWeight:300, color:'#102a19' }}>3</p>
                      <p style={{ fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.08em', color:'#424842' }}>Orders</p>
                    </div>
                    <div style={{ height:32, width:1, background:'rgba(16,42,25,0.1)' }} />
                    <div>
                      <p style={{ fontFamily:'Manrope,sans-serif', fontSize:24, fontWeight:300, color:'#102a19' }}>₹2,824</p>
                      <p style={{ fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.08em', color:'#424842' }}>Total Spent</p>
                    </div>
                  </div>
                </div>
                <div style={{ position:'absolute', right:0, top:0, width:'33%', height:'100%', opacity:0.15, background:'linear-gradient(135deg, rgba(203,234,208,0.5), transparent)' }} />
              </div>

              {/* Narrow card — dark */}
              <div style={{
                borderRadius:16, padding:40, display:'flex', flexDirection:'column', justifyContent:'center',
                background:'#102a19', color:'#fff',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize:36, opacity:0.5, marginBottom:16 }}>auto_awesome</span>
                <p style={{ fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:18, marginBottom:8 }}>Free Consultation</p>
                <p style={{ fontSize:12, opacity:0.7, lineHeight:1.6, marginBottom:24 }}>Book a session with our Vaidya team for personalized guidance.</p>
                <Link href="/contact" style={{ fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.12em', textDecoration:'underline', textUnderlineOffset:8, color:'rgba(255,255,255,0.6)' }}>Book Now</Link>
              </div>
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .bento-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
