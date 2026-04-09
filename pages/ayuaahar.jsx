// pages/ayuaahar.jsx — AyuAahar brand page, light Botanical Liquid Glass
import StoreLayout, { GlassCard, PageHero, SectionHeading } from '@/components/StoreLayout';
import Link from 'next/link';

const HIGHLIGHTS = [
  { icon:'nutrition', title:'Ayurvedic Dietics', desc:'Products formulated according to Ayurvedic Pathya Kalpana — the ancient science of therapeutic nutrition.' },
  { icon:'labs', title:'Expert R&D Team', desc:'Developed by specialists in Ayurvedic diet formulation, guided by experienced Vaidyas.' },
  { icon:'spa', title:'Immunity & Strength', desc:'More than 60% of Ayurved deals with diet. Following these regimens builds natural immunity.' },
  { icon:'diversity_3', title:'Vaidya Recommended', desc:'Ayurvedic Vaidyas across India recommend AyuAahar products to patients and community.' },
];
const PRODUCTS = [
  { name:'BrahmaSattu', sub:'Vyoshadya Sattu · 250g', price:298, mrp:350 },
  { name:'BrahmaPeya', sub:'Raktshali Peya · 100g', price:128, mrp:150 },
  { name:'BrahmaYush', sub:'Mudg Yush · 100g', price:128, mrp:150 },
  { name:'BrahmaRaksha', sub:'Super Health Drink · 250g', price:250, mrp:330 },
];

export default function AyuAaharPage() {
  return (
    <StoreLayout title="AyuAahar" description="AyuAahar — Ayurvedic food brand by SB Ayurved" activeNav="AyuAahar">
      <PageHero title={<>Welcome to <span style={{color:'#735c00'}}>AyuAahar</span></>} breadcrumb="AyuAahar"
        subtitle="A first-of-its-kind food brand exclusively working on nutrition and food habits according to Ayurved." />

      <section style={{maxWidth:900,margin:'0 auto',padding:'0 24px 64px'}}>
        <GlassCard>
          <div style={{fontSize:16,color:'#424842',lineHeight:1.9,maxWidth:700,margin:'0 auto'}}>
            <p style={{marginBottom:24}}><strong style={{color:'#102a19'}}>AyuAahar</strong> is a food brand under Shree Brahmachaitanya Ayurved — the first of its kind, exclusively developing Ayurvedic food products according to Pathya Kalpana dietics.</p>
            <p style={{fontFamily:'Newsreader,serif',fontSize:22,fontStyle:'italic',color:'#102a19',lineHeight:1.6,margin:'32px 0',padding:'24px 32px',borderLeft:'3px solid #D4AF37'}}>
              More than 60% of Ayurved deals with diet, daily and seasonal eating habits — following these regimens builds good immunity and strength.
            </p>
            <p>AyuAahar aims to bring Ayurvedic dietary regimens in standardized, easy-to-consume form with actual natural benefits. The R&D team comprises experts in Ayurvedic diet formulation guided by Vaidyas across India.</p>
          </div>
        </GlassCard>
      </section>

      <section style={{maxWidth:1100,margin:'0 auto',padding:'0 24px 64px'}}>
        <div style={{textAlign:'center',marginBottom:40}}><SectionHeading label="Why AyuAahar" title={<>Rooted in Tradition, <span style={{fontStyle:'italic'}}>Standardized for Today</span></>} /></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:20}}>
          {HIGHLIGHTS.map((h,i) => (
            <div key={i} className="liquid-glass" style={{borderRadius:28,padding:28,boxShadow:'0 16px 32px rgba(16,42,25,0.05)',transform:i%2===1?'translateY(12px)':'none'}}>
              <span className="material-symbols-outlined" style={{fontSize:28,color:'#D4AF37',marginBottom:14,display:'block'}}>{h.icon}</span>
              <h3 style={{fontFamily:'Newsreader,serif',fontSize:18,color:'#102a19',marginBottom:8}}>{h.title}</h3>
              <p style={{fontSize:13,color:'#424842',lineHeight:1.75}}>{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{maxWidth:1100,margin:'0 auto',padding:'0 24px 80px'}}>
        <SectionHeading label="Our Products" title="AyuAahar Range" />
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:20}}>
          {PRODUCTS.map((p,i) => (
            <GlassCard key={i} style={{padding:24,textAlign:'center',borderRadius:28}}>
              <div style={{width:80,height:80,borderRadius:9999,background:'rgba(203,234,208,0.3)',margin:'0 auto 16px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span className="material-symbols-outlined" style={{fontSize:32,color:'#102a19'}}>package_2</span>
              </div>
              <h4 style={{fontFamily:'Newsreader,serif',fontSize:16,color:'#102a19',marginBottom:4}}>{p.name}</h4>
              <p style={{fontSize:11,color:'#424842',marginBottom:12}}>{p.sub}</p>
              <div style={{display:'flex',justifyContent:'center',alignItems:'baseline',gap:8}}>
                <span style={{fontFamily:'Newsreader,serif',fontSize:22,fontWeight:600,color:'#735c00'}}>₹{p.price}</span>
                <span style={{fontSize:13,color:'#c2c8c0',textDecoration:'line-through'}}>₹{p.mrp}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </StoreLayout>
  );
}
