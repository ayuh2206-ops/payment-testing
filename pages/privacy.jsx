// pages/privacy.jsx — Privacy Policy, light Botanical Liquid Glass
import StoreLayout, { GlassCard, PageHero } from '@/components/StoreLayout';

const S = [
  { t:'Information We Collect', c:'Name, email, phone, shipping address when you order. Payment info processed securely via Razorpay — we do not store card details.' },
  { t:'How We Use Information', c:'To process orders, send confirmations, respond to inquiries, and improve our offerings. Optional newsletters — opt out anytime.' },
  { t:'Information Sharing', c:'We do not sell or rent personal info. Shared only with shipping partners and payment processors for order fulfillment.' },
  { t:'Data Security', c:'Industry-standard SSL encryption, secure payment processing, and restricted access to personal data.' },
  { t:'Cookies', c:'Used to enhance browsing, remember preferences, and analyze traffic. Manage via browser settings.' },
  { t:'Your Rights', c:'Access, correct, or delete personal information anytime. Contact info@sbayurved.com or +91 9168584999.' },
  { t:'Policy Changes', c:'Updates posted on this page with revised dates. Continued use constitutes acceptance.' },
];

export default function PrivacyPage() {
  return (
    <StoreLayout title="Privacy Policy" description="Privacy Policy for SB Ayurved">
      <PageHero title="Privacy Policy" breadcrumb="Privacy" />
      <section style={{maxWidth:840,margin:'0 auto',padding:'0 24px 80px'}}>
        <GlassCard>
          <p style={{fontSize:13,color:'rgba(66,72,66,0.5)',fontStyle:'italic',marginBottom:32}}>Last updated: April 2025</p>
          <p style={{fontSize:15,color:'#424842',lineHeight:1.9,marginBottom:32}}>Shree Brahmachaitanya Ayurved is committed to protecting your privacy. This policy explains how we handle personal information.</p>
          {S.map((s,i) => (
            <div key={i} style={{marginBottom:32}}>
              <h3 style={{fontFamily:'Newsreader,serif',fontSize:20,color:'#102a19',marginBottom:10}}>{i+1}. {s.t}</h3>
              <p style={{fontSize:15,color:'#424842',lineHeight:1.9}}>{s.c}</p>
            </div>
          ))}
          <div style={{marginTop:40,padding:'20px 28px',borderRadius:16,background:'rgba(203,234,208,0.15)',borderLeft:'3px solid #D4AF37'}}>
            <p style={{fontSize:14,color:'#102a19'}}><strong>Contact:</strong> info@sbayurved.com · 533, Manorama Apt, Nagpur — 440009</p>
          </div>
        </GlassCard>
      </section>
    </StoreLayout>
  );
}
