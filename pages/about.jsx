// pages/about.jsx
// ═══ About — matching Stitch our_philosophy/code.html exactly ═══
import Head from 'next/head';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | SB Ayurved</title>
        <meta name="description" content="The philosophy behind Shree Brahmachaitanya Ayurved — Of the Vaidya, By the Vaidya, For the Vaidya" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background:'#FCFCF9', color:'#1a1c1b', minHeight:'100vh', overflow:'hidden' }}>

        {/* ═══ ATMOSPHERIC BLOBS — from Stitch ═══ */}
        <div className="botanical-blob" style={{ top:'-10%', left:'-10%', width:'50vw', height:'50vw', background:'rgba(203,234,208,0.3)' }} />
        <div className="botanical-blob" style={{ bottom:'-10%', right:'-10%', width:'60vw', height:'60vw', background:'rgba(187,203,187,0.2)' }} />
        <div className="botanical-blob" style={{ top:'30%', right:'10%', width:'40vw', height:'40vw', background:'rgba(222,228,221,0.4)' }} />

        {/* ═══ NAVBAR — from Stitch: glass pill ═══ */}
        <nav style={{
          position:'fixed', top:0, left:0, right:0, zIndex:50,
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'16px 40px', maxWidth:1280, margin:'24px auto 0', width:'92%',
          borderRadius:9999,
          background:'rgba(255,255,255,0.4)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
          borderTop:'1.5px solid rgba(255,255,255,0.8)', borderLeft:'1.5px solid rgba(255,255,255,0.8)',
          borderBottom:'1.5px solid rgba(255,255,255,0.4)', borderRight:'1.5px solid rgba(255,255,255,0.4)',
          boxShadow:'0 20px 40px rgba(16,42,25,0.06)',
        }}>
          <Link href="/"><span style={{ fontSize:22, fontFamily:'Newsreader,serif', fontStyle:'italic', color:'#102a19' }}>SB Ayurved</span></Link>
          <div style={{ display:'flex', alignItems:'center', gap:40 }} className="hide-mobile">
            {['Shop','About','AyuAahar','Contact'].map((l,i) => (
              <Link key={l} href={['/','/about','/ayuaahar','/contact'][i]} style={{
                fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:500,
                textTransform:'uppercase', letterSpacing:'0.15em',
                color: l==='About' ? '#102a19' : '#424842',
                borderBottom: l==='About' ? '2px solid rgba(16,42,25,0.2)' : 'none', paddingBottom:4,
                transition:'color 0.3s',
              }}>{l}</Link>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:24, color:'#102a19' }}>
            <Link href="/checkout"><span className="material-symbols-outlined">shopping_bag</span></Link>
            <Link href="/admin"><span className="material-symbols-outlined">person</span></Link>
          </div>
        </nav>

        {/* ═══ MAIN ═══ */}
        <main style={{ paddingTop:192, paddingBottom:128, padding:'192px 24px 128px' }}>

          {/* ── Hero — from Stitch: max-w-5xl mx-auto text-center mb-40 ── */}
          <section style={{ maxWidth:960, margin:'0 auto', textAlign:'center', marginBottom:160, position:'relative' }}>
            {/* Sage underglow */}
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'120%', height:'120%', background:'rgba(73,101,80,0.05)', filter:'blur(100px)', zIndex:0 }} />

            <span style={{ fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.3em', color:'#424842', display:'block', marginBottom:32, position:'relative' }}>The Soul of SB Ayurved</span>

            <h1 style={{
              fontFamily:'Newsreader,serif', fontSize:'clamp(40px,7vw,80px)',
              fontWeight:300, color:'#001406', letterSpacing:'-0.02em',
              lineHeight:1.1, marginBottom:64, position:'relative',
            }}>
              The Confluence of<br />
              <span style={{ fontStyle:'italic', fontWeight:400 }}>Nature and Healing</span>
            </h1>

            {/* Hero image — from Stitch: rounded-[4rem] shadow-2xl glass-edge */}
            <div style={{
              position:'relative', width:'100%', maxWidth:900, margin:'0 auto',
              aspectRatio:'16/10', overflow:'hidden', borderRadius:64,
              boxShadow:'0 25px 50px rgba(16,42,25,0.12)',
              borderTop:'1.5px solid rgba(255,255,255,0.8)', borderLeft:'1.5px solid rgba(255,255,255,0.8)',
              borderBottom:'1.5px solid rgba(255,255,255,0.4)', borderRight:'1.5px solid rgba(255,255,255,0.4)',
            }}>
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80" alt="Ayurvedic herbs and botanicals"
                style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
          </section>

          {/* ── Content Glass Panel — from Stitch: bg-white/40 backdrop-blur-3xl glass-edge rounded-[4rem] p-20 ── */}
          <section style={{ maxWidth:900, margin:'0 auto', position:'relative' }}>
            <div className="liquid-glass" style={{
              borderRadius:64, padding:'clamp(32px,6vw,80px)',
              boxShadow:'0 20px 40px rgba(16,42,25,0.05), 0 0 0 1px rgba(16,42,25,0.02)',
            }}>
              <div style={{ maxWidth:720, margin:'0 auto' }}>

                {/* Opening — from Stitch: font-headline text-3xl md:text-4xl text-primary-container leading-relaxed */}
                <p style={{
                  fontFamily:'Newsreader,serif', fontSize:'clamp(22px,3vw,32px)',
                  color:'#102a19', lineHeight:1.6, marginBottom:40,
                }}>
                  At the heart of Shree Brahmachaitanya Ayurved lies a belief that wellness is not a destination, but a rhythmic dialogue between the Vaidya's wisdom and the healing power of nature.
                </p>

                {/* Body — from Stitch: font-body text-lg text-on-surface-variant leading-loose */}
                <p style={{
                  fontFamily:'Manrope,sans-serif', fontSize:17, color:'#424842',
                  lineHeight:2, marginBottom:40,
                }}>
                  Founded by a group of Ayurvedic physicians, our philosophy is rooted in the ancestral wisdom of Ayurveda — the 'Science of Life.' We don't merely manufacture products; we curate authentic formulations that resonate with the body's natural healing frequencies. Each botanical is selected not just for its chemical profile, but for its energetic contribution to the whole. Our core associates are postgraduates in Rasashastra, Bhaishajya Kalpana, Dravyaguna, and Kaychikitsa — bringing depth knowledge of classical Shastrokt manufacturing.
                </p>

                {/* ── Asymmetric Glass Pillar Cards — from Stitch: grid grid-cols-2 gap-8, card 1 translate-y-12 ── */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, margin:'80px 0' }} className="pillar-grid">
                  {[
                    { icon:'eco', color:'#D4AF37', title:'Ethical Sourcing', desc:'Our partners are stewards of the land. We trace every ingredient from sustainable harvest to final preparation, ensuring nature is honored as much as the end formulation.' },
                    { icon:'science', color:'#D4AF37', title:'Clinical Precision', desc:'While we honor Shastrokt tradition, we utilize modern GMP-compliant processes to preserve the full bioavailability of every botanical compound in our 160+ formulations.' },
                  ].map((card, i) => (
                    <div key={i} style={{
                      background:'rgba(255,255,255,0.6)', backdropFilter:'blur(16px)',
                      borderTop:'1.5px solid rgba(255,255,255,0.8)', borderLeft:'1.5px solid rgba(255,255,255,0.8)',
                      borderBottom:'1.5px solid rgba(255,255,255,0.4)', borderRight:'1.5px solid rgba(255,255,255,0.4)',
                      padding:40, borderRadius:28,
                      transform: i === 0 ? 'translateY(48px)' : 'none',
                      boxShadow:'0 16px 32px rgba(16,42,25,0.04)',
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize:36, color:card.color, marginBottom:24, display:'block' }}>{card.icon}</span>
                      <h3 style={{ fontFamily:'Newsreader,serif', fontSize:22, color:'#102a19', marginBottom:16 }}>{card.title}</h3>
                      <p style={{ fontFamily:'Manrope,sans-serif', fontSize:14, color:'#424842', lineHeight:1.8 }}>{card.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Closing text */}
                <p style={{
                  fontFamily:'Manrope,sans-serif', fontSize:17, color:'#424842',
                  lineHeight:2, paddingTop:40,
                }}>
                  We believe in the beauty of the slow, authentic process. In a world of synthetic shortcuts, we choose the classical extraction. We choose the hand-verified ingredient. We choose the efficacy that reveals itself over time — much like the growth of a forest, our results are deep-rooted and lasting. By the grace of Lord Dhanvantari and Shri Brahmachaitanya Gondavlekar Maharaj, we have succeeded in producing more than 160 generic and 12 research-based proprietary products.
                </p>

                {/* CTA — from Stitch: bg-primary-container text-on-primary rounded-full uppercase tracking-widest */}
                <div style={{ borderTop:'1px solid rgba(16,42,25,0.06)', paddingTop:64, marginTop:64, textAlign:'center' }}>
                  <Link href="/wellness" style={{
                    display:'inline-flex', alignItems:'center', gap:12,
                    background:'#102a19', color:'#ffffff', padding:'20px 40px',
                    borderRadius:9999, fontFamily:'Manrope,sans-serif', fontSize:11,
                    fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em',
                    boxShadow:'0 12px 32px rgba(16,42,25,0.15)',
                    transition:'all 0.5s',
                  }}>
                    Explore Our Formulations
                  </Link>
                </div>
              </div>
            </div>

            {/* Decorative floating element — from Stitch: hidden lg:block absolute -left-24 top-1/4 */}
            <div style={{
              position:'absolute', left:-96, top:'25%', width:192, height:192,
              borderRadius:'50%', border:'1px solid rgba(16,42,25,0.08)',
              display:'flex', alignItems:'center', justifyContent:'center',
              transform:'rotate(-12deg)',
            }} className="hide-mobile">
              <span style={{ fontFamily:'Newsreader,serif', fontStyle:'italic', color:'rgba(16,42,25,0.3)', fontSize:14, textAlign:'center', padding:32 }}>Formulated for the Vaidya</span>
            </div>
          </section>
        </main>

        {/* ═══ FOOTER — from Stitch ═══ */}
        <footer style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:48, padding:'96px 32px 48px', background:'#F9F9F6' }}>
          <span style={{ fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:28, color:'#102a19' }}>SB Ayurved</span>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:48 }}>
            {[{t:'About',h:'/about'},{t:'Products',h:'/wellness'},{t:'AyuAahar',h:'/ayuaahar'},{t:'Shipping',h:'/terms'},{t:'Privacy',h:'/privacy'}].map(l => (
              <Link key={l.h} href={l.h} style={{ fontFamily:'Manrope,sans-serif', color:'#424842', fontSize:14, opacity:0.8, transition:'opacity 0.2s' }}>{l.t}</Link>
            ))}
          </div>
          <p style={{ fontSize:12, color:'#424842', opacity:0.5 }}>© 2025 Shree Brahmachaitanya Ayurved. Rooted in Tradition.</p>
        </footer>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .pillar-grid { grid-template-columns: 1fr !important; }
          .pillar-grid > div { transform: none !important; }
        }
      `}</style>
    </>
  );
}
