// pages/cosmetics.jsx — Samaayu Cosmetics, light Botanical Liquid Glass
import StoreLayout, { GlassCard, PageHero, SectionHeading } from '@/components/StoreLayout';
import Link from 'next/link';

const CATS = [
  { icon:'face', title:'Face Care', desc:'Ayurvedic cleansers, serums, and face packs from natural botanicals for radiant skin.' },
  { icon:'spa', title:'Body Care', desc:'Nourishing body oils, ubtan powders, and moisturizers with classical Ayurvedic ingredients.' },
  { icon:'self_improvement', title:'Hair Care', desc:'Traditional herbal hair oils, shampoos, and treatments to strengthen from root to tip.' },
  { icon:'local_florist', title:'Wellness Rituals', desc:'Complete self-care kits combining multiple products for your daily Ayurvedic beauty regimen.' },
];

export default function CosmeticsPage() {
  return (
    <StoreLayout title="Cosmetics" description="Samaayu Cosmetics — Ayurvedic beauty by SB Ayurved" activeNav="">
      <PageHero title={<>Samaayu <span style={{color:'#735c00'}}>Cosmetics</span></>} breadcrumb="Cosmetics"
        subtitle="Where ancient Ayurvedic wisdom meets modern beauty — pure, natural, and crafted for the conscious soul." />

      {/* Dark hero banner */}
      <section style={{maxWidth:1100,margin:'0 auto',padding:'0 24px 64px'}}>
        <div style={{position:'relative',borderRadius:48,overflow:'hidden',minHeight:320,background:'linear-gradient(135deg,#102A19,#1a4028,#0d2114)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{position:'absolute',top:'-20%',right:'-5%',width:300,height:300,background:'rgba(212,175,55,0.1)',filter:'blur(80px)',borderRadius:'50%'}} />
          <div style={{position:'absolute',bottom:'-30%',left:'10%',width:350,height:350,background:'rgba(176,206,181,0.08)',filter:'blur(80px)',borderRadius:'50%'}} />
          <div style={{position:'relative',zIndex:1,textAlign:'center',padding:'60px 40px'}}>
            <span style={{fontFamily:'Manrope,sans-serif',fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'0.3em',color:'#D4AF37',display:'block',marginBottom:16}}>Introducing</span>
            <h2 style={{fontFamily:'Newsreader,serif',fontSize:'clamp(32px,5vw,56px)',fontWeight:300,fontStyle:'italic',color:'#fff',marginBottom:16,lineHeight:1.2}}>The Samaayu Collection</h2>
            <p style={{fontSize:15,color:'rgba(255,255,255,0.6)',maxWidth:500,margin:'0 auto 28px',lineHeight:1.7}}>Rooted in the timeless principles of Ayurvedic beauty, Samaayu brings you cosmetics that honor nature.</p>
            <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#D4AF37,#e9c349)',color:'#102A19',padding:'14px 32px',borderRadius:9999,fontFamily:'Manrope,sans-serif',fontSize:11,fontWeight:800,textTransform:'uppercase',letterSpacing:'0.14em',boxShadow:'0 8px 24px rgba(212,175,55,0.3)'}}>
              Explore Products <span className="material-symbols-outlined" style={{fontSize:16}}>arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <section style={{maxWidth:1100,margin:'0 auto',padding:'0 24px 64px'}}>
        <div style={{textAlign:'center',marginBottom:40}}><SectionHeading label="Our Range" title={<>Crafted for Natural <span style={{fontStyle:'italic'}}>Beauty</span></>} /></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
          {CATS.map((c,i) => (
            <div key={i} className="liquid-glass" style={{borderRadius:28,padding:32,boxShadow:'0 16px 32px rgba(16,42,25,0.05)',transform:i%2===1?'translateY(12px)':'none'}}>
              <div style={{width:52,height:52,borderRadius:9999,marginBottom:16,background:'rgba(212,175,55,0.08)',border:'1px solid rgba(212,175,55,0.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span className="material-symbols-outlined" style={{fontSize:24,color:'#D4AF37'}}>{c.icon}</span>
              </div>
              <h3 style={{fontFamily:'Newsreader,serif',fontSize:20,color:'#102A19',marginBottom:8}}>{c.title}</h3>
              <p style={{fontSize:13,color:'#424842',lineHeight:1.75}}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{maxWidth:1100,margin:'0 auto',padding:'0 24px 80px'}}>
        <GlassCard gold style={{textAlign:'center'}}>
          <span style={{fontFamily:'Newsreader,serif',fontSize:'clamp(20px,3vw,26px)',fontStyle:'italic',color:'#D4AF37',marginBottom:20,display:'block'}}>"Beauty is the harmony of nature reflected in you."</span>
          <p style={{fontSize:15,color:'#424842',lineHeight:1.8,maxWidth:600,margin:'0 auto'}}>Every Samaayu product is free from synthetic chemicals, parabens, and artificial fragrances. True beauty comes from nature's purest ingredients.</p>
        </GlassCard>
      </section>
    </StoreLayout>
  );
}
