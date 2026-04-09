// pages/terms.jsx — Terms & Conditions, light Botanical Liquid Glass
import StoreLayout, { GlassCard, PageHero } from '@/components/StoreLayout';

const S = [
  { t:'Acceptance of Terms', c:'By using sbayurved.com and purchasing products, you agree to these Terms and Conditions.' },
  { t:'Products & Descriptions', c:'We strive for accuracy in product info. Slight variations in packaging may occur. All products are GMP-compliant.' },
  { t:'Pricing & Payment', c:'Prices in Indian Rupees (₹) include applicable taxes. Payment processed securely via Razorpay.' },
  { t:'Shipping & Delivery', c:'Orders dispatched within 2-3 business days. Delivery timelines vary by location across India.' },
  { t:'Returns & Refunds', c:'Unopened products returnable within 7 days. Refunds processed within 7-10 business days.' },
  { t:'Intellectual Property', c:'All content, logos, and product names are intellectual property of Shree Brahmachaitanya Ayurved.' },
  { t:'Medical Disclaimer', c:'Products are Ayurvedic preparations for general wellness, not intended to diagnose, treat, or cure disease.' },
  { t:'Disputes', c:'Contact info@sbayurved.com or +91 9168584999. Disputes subject to jurisdiction of Nagpur, Maharashtra.' },
];

export default function TermsPage() {
  return (
    <StoreLayout title="Terms & Conditions" description="Terms and Conditions for SB Ayurved">
      <PageHero title="Terms & Conditions" breadcrumb="Terms" />
      <section style={{maxWidth:840,margin:'0 auto',padding:'0 24px 80px'}}>
        <GlassCard>
          <p style={{fontSize:13,color:'rgba(66,72,66,0.5)',fontStyle:'italic',marginBottom:32}}>Last updated: April 2025</p>
          {S.map((s,i) => (
            <div key={i} style={{marginBottom:32}}>
              <h3 style={{fontFamily:'Newsreader,serif',fontSize:20,color:'#102a19',marginBottom:10}}>{i+1}. {s.t}</h3>
              <p style={{fontSize:15,color:'#424842',lineHeight:1.9}}>{s.c}</p>
            </div>
          ))}
        </GlassCard>
      </section>
    </StoreLayout>
  );
}
