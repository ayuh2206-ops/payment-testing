// pages/wellness.jsx — Wellness hub, light Botanical Liquid Glass
import StoreLayout, { GlassCard, PageHero, SectionHeading } from '@/components/StoreLayout';
import Link from 'next/link';

const GOALS = [
  { icon:'directions_run', title:'Flexi Joints', desc:'Joint mobility and comfort with specialized Ayurvedic musculoskeletal formulations.' },
  { icon:'gastroenterology', title:'Happy Gut', desc:'Digestive wellness through classical churna, vati, and Ayurvedic dietary preparations.' },
  { icon:'fitness_center', title:'Slim & Fit', desc:'Healthy metabolism, weight management, and sustainable fitness goals.' },
  { icon:'dermatology', title:'Glow & Grow', desc:'Nourish skin and hair with Rasayana formulations and Samaayu cosmetics.' },
  { icon:'bolt', title:'Vitality Plus', desc:'Rejuvenating energy with classical Vajikarana and adaptogenic preparations.' },
  { icon:'favorite', title:'Her Balance', desc:"Women's hormonal balance, menstrual health, and overall well-being." },
];
const PILLARS = [
  { title:'Ahara (Diet)', desc:'Therapeutic nutrition through AyuAahar — sattu, peya, yush — following Pathya Kalpana principles.' },
  { title:'Vihara (Lifestyle)', desc:'Dinacharya (daily routine), Ritucharya (seasonal regimen), and Sadvritta for holistic wellness.' },
  { title:'Aushadha (Medicine)', desc:'160+ classical and 12 proprietary formulations by experienced Vaidyas with GMP processes.' },
];

export default function WellnessPage() {
  return (
    <StoreLayout title="Wellness" description="Ayurvedic wellness programs from SB Ayurved" activeNav="">
      <PageHero title={<>Your Wellness <span style={{fontStyle:'italic'}}>Journey</span></>} breadcrumb="Wellness"
        subtitle="True health is a balance of body, mind, and spirit. Choose your path below." />

      <section style={{maxWidth:1100,margin:'0 auto',padding:'0 24px 64px'}}>
        <SectionHeading label="Health Goals" title="Find Your Focus" subtitle="Curated product collections for specific wellness outcomes." />
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:24}}>
          {GOALS.map((g,i) => (
            <div key={i} className="liquid-glass" style={{borderRadius:28,padding:32,boxShadow:'0 16px 32px rgba(16,42,25,0.05)',display:'flex',gap:20,alignItems:'flex-start',cursor:'pointer',transition:'transform 0.3s'}}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
              <div style={{width:52,height:52,borderRadius:16,flexShrink:0,background:'rgba(16,42,25,0.06)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span className="material-symbols-outlined" style={{fontSize:24,color:'#102a19'}}>{g.icon}</span>
              </div>
              <div>
                <h3 style={{fontFamily:'Newsreader,serif',fontSize:20,color:'#102a19',marginBottom:6}}>{g.title}</h3>
                <p style={{fontSize:13,color:'#424842',lineHeight:1.75}}>{g.desc}</p>
                <span style={{display:'inline-block',marginTop:12,fontFamily:'Manrope,sans-serif',fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#735c00'}}>Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{maxWidth:1100,margin:'0 auto',padding:'0 24px 64px'}}>
        <div style={{textAlign:'center',marginBottom:40}}><SectionHeading label="Ayurvedic Approach" title={<>Three Pillars of <span style={{fontStyle:'italic'}}>Wellness</span></>} /></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24}}>
          {PILLARS.map((p,i) => (
            <GlassCard key={i} gold={i===0} style={{padding:32,borderRadius:28,textAlign:'center'}}>
              <span style={{fontFamily:'Newsreader,serif',fontSize:40,fontWeight:300,color:'#D4AF37',display:'block',marginBottom:8}}>{String(i+1).padStart(2,'0')}</span>
              <h4 style={{fontFamily:'Newsreader,serif',fontSize:22,color:'#102a19',marginBottom:10}}>{p.title}</h4>
              <p style={{fontSize:13,color:'#424842',lineHeight:1.75}}>{p.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section style={{maxWidth:1100,margin:'0 auto',padding:'0 24px 80px'}}>
        <div style={{background:'linear-gradient(135deg,#102A19,#1a4028)',borderRadius:40,padding:'clamp(40px,6vw,56px)',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-30%',left:'5%',width:250,height:250,background:'rgba(212,175,55,0.08)',filter:'blur(80px)',borderRadius:'50%'}} />
          <h3 style={{fontFamily:'Newsreader,serif',fontSize:'clamp(24px,4vw,36px)',fontWeight:300,color:'#fff',marginBottom:16,position:'relative'}}>Begin Your <span style={{fontStyle:'italic',color:'#D4AF37'}}>Ayurvedic Journey</span></h3>
          <p style={{fontSize:14,color:'rgba(255,255,255,0.55)',maxWidth:480,margin:'0 auto 24px',position:'relative'}}>Consult with our Vaidya team or explore our complete range.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',position:'relative'}}>
            <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#D4AF37,#e9c349)',color:'#102A19',padding:'14px 32px',borderRadius:9999,fontSize:11,fontWeight:800,textTransform:'uppercase',letterSpacing:'0.12em',boxShadow:'0 8px 24px rgba(212,175,55,0.3)'}}>
              Consult a Vaidya <span className="material-symbols-outlined" style={{fontSize:16}}>arrow_forward</span>
            </Link>
            <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:8,background:'transparent',border:'1px solid rgba(255,255,255,0.2)',color:'#fff',padding:'14px 32px',borderRadius:9999,fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.12em'}}>Browse Products</Link>
          </div>
        </div>
      </section>
    </StoreLayout>
  );
}
