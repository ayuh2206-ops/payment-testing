// pages/blog.jsx — Journal/Blog, light Botanical Liquid Glass
import StoreLayout, { GlassCard, PageHero } from '@/components/StoreLayout';

const POSTS = [
  { title:'Understanding Your Prakriti: Ayurvedic Body Types', tag:'Wellness', date:'Mar 2025', excerpt:'Discover your unique constitution — Vata, Pitta, or Kapha — and align your diet for optimal health.' },
  { title:'The Science Behind Classical Ayurvedic Manufacturing', tag:'Science', date:'Feb 2025', excerpt:'How traditional Shastrokt methods meet modern GMP standards at SB Ayurved.' },
  { title:'Seasonal Eating: Ritucharya for Modern Life', tag:'Diet', date:'Jan 2025', excerpt:'Ayurveda prescribes specific dietary regimens for each season. AyuAahar makes it easy.' },
  { title:'Panchakarma at Home: Simple Detox Rituals', tag:'Rituals', date:'Dec 2024', excerpt:"Simplified home practices to support your body's natural cleansing processes." },
  { title:'The Golden Spice: Turmeric in Ayurvedic Practice', tag:'Ingredients', date:'Nov 2024', excerpt:"Exploring why Haridra remains one of Ayurveda's most valued botanicals." },
  { title:'Building Immunity Through Ayurvedic Diet', tag:'Diet', date:'Oct 2024', excerpt:'Discover how traditional food preparations naturally strengthen immune response.' },
];
const TAG_COLORS = { Wellness:'rgba(203,234,208,0.4)', Science:'rgba(212,175,55,0.12)', Diet:'rgba(176,206,181,0.4)', Rituals:'rgba(222,228,221,0.5)', Ingredients:'rgba(233,195,73,0.15)' };

export default function BlogPage() {
  return (
    <StoreLayout title="Journal" description="Ayurvedic wisdom and insights from SB Ayurved" activeNav="Journal">
      <PageHero title={<>The <span style={{fontStyle:'italic'}}>Journal</span></>} breadcrumb="Blog"
        subtitle="Insights on Ayurvedic living, botanical science, and the art of natural wellness." />

      <section style={{maxWidth:1100,margin:'0 auto',padding:'0 24px 80px'}}>
        {/* Featured */}
        <GlassCard gold style={{marginBottom:48,display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'center'}} className="blog-feat">
          <div style={{width:'100%',aspectRatio:'4/3',borderRadius:24,background:'linear-gradient(135deg,rgba(16,42,25,0.08),rgba(203,234,208,0.2))',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span className="material-symbols-outlined" style={{fontSize:64,color:'rgba(16,42,25,0.12)'}}>article</span>
          </div>
          <div>
            <span style={{fontFamily:'Manrope,sans-serif',fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'0.2em',color:'#735c00',display:'block',marginBottom:12}}>Featured Article</span>
            <h3 style={{fontFamily:'Newsreader,serif',fontSize:'clamp(22px,3vw,30px)',color:'#102a19',marginBottom:12,lineHeight:1.3}}>Understanding Your Prakriti: A Guide to Ayurvedic Body Types</h3>
            <p style={{fontSize:14,color:'#424842',lineHeight:1.75,marginBottom:20}}>Discover your unique constitution and align your diet for optimal health.</p>
            <span style={{fontFamily:'Manrope,sans-serif',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#735c00',borderBottom:'1px solid #D4AF37',paddingBottom:2}}>Read Article →</span>
          </div>
        </GlassCard>

        {/* Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:24}}>
          {POSTS.map((p,i) => (
            <div key={i} className="liquid-glass" style={{borderRadius:28,padding:28,display:'flex',flexDirection:'column',boxShadow:'0 12px 28px rgba(16,42,25,0.04)',transition:'transform 0.3s',cursor:'pointer'}}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
              <div style={{width:'100%',height:160,borderRadius:16,marginBottom:20,background:'linear-gradient(135deg,rgba(203,234,208,0.2),rgba(213,227,216,0.3))',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span className="material-symbols-outlined" style={{fontSize:36,color:'rgba(16,42,25,0.12)'}}>article</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                <span style={{fontSize:9,fontWeight:800,textTransform:'uppercase',letterSpacing:'0.12em',padding:'4px 10px',borderRadius:9999,background:TAG_COLORS[p.tag]||TAG_COLORS.Wellness,color:'#102a19'}}>{p.tag}</span>
                <span style={{fontSize:11,color:'#c2c8c0'}}>{p.date}</span>
              </div>
              <h4 style={{fontFamily:'Newsreader,serif',fontSize:18,color:'#102a19',marginBottom:8,lineHeight:1.4,flex:1}}>{p.title}</h4>
              <p style={{fontSize:13,color:'#424842',lineHeight:1.7,marginBottom:16}}>{p.excerpt}</p>
              <span style={{fontFamily:'Manrope,sans-serif',fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#735c00'}}>Read More →</span>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:48,padding:'24px 32px',borderRadius:20,background:'rgba(212,175,55,0.05)',border:'1px solid rgba(212,175,55,0.1)'}}>
          <p style={{fontSize:13,color:'#424842',fontStyle:'italic'}}>Blog posts are placeholders. Manage content from Admin → Pages.</p>
        </div>
      </section>
    </StoreLayout>
  );
}
