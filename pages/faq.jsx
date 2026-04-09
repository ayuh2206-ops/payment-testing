// pages/faq.jsx — FAQ page, light Botanical Liquid Glass with accordion
import { useState } from 'react';
import StoreLayout, { GlassCard, PageHero } from '@/components/StoreLayout';
import Link from 'next/link';

const FAQS = [
  { q:'What is Shree Brahmachaitanya Ayurved?', a:'A collective of Ayurvedic physicians producing quality, affordable classical and proprietary Ayurvedic medicines with 160+ formulations.' },
  { q:'Are your products clinically tested?', a:'Yes. All proprietary products undergo rigorous testing. Classical formulations follow Shastrokt manufacturing principles with GMP compliance.' },
  { q:'How do I place an order?', a:'Browse our catalog, add items to cart, and checkout securely via Razorpay. Orders dispatch within 2-3 business days.' },
  { q:'Do you ship across India?', a:'Yes, we ship pan-India. Orders above ₹500 qualify for free shipping. Delivery timelines vary by location.' },
  { q:'What is AyuAahar?', a:'Our Ayurvedic food brand — first of its kind — working exclusively on nutrition according to Pathya Kalpana dietics.' },
  { q:'Can I return a product?', a:'Unopened products in original packaging may be returned within 7 days. Contact info@sbayurved.com to initiate.' },
  { q:'Are products suitable for all ages?', a:'Most products are for adults. Refer to product labels or consult your Ayurvedic practitioner before use.' },
  { q:'How to become a distributor?', a:'We welcome partnerships. Reach out via our Contact page or email info@sbayurved.com with your details.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState(null);
  return (
    <StoreLayout title="FAQ's" description="Frequently asked questions about SB Ayurved">
      <PageHero title="Frequently Asked Questions" breadcrumb="FAQ's" subtitle="Everything you need to know about our products, shipping, and Ayurvedic wellness." />
      <section style={{maxWidth:800,margin:'0 auto',padding:'0 24px 80px'}}>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {FAQS.map((faq,i) => (
            <div key={i} onClick={() => setOpen(open===i?null:i)} className="liquid-glass" style={{
              borderRadius:20, padding:'20px 28px', cursor:'pointer',
              boxShadow: open===i ? '0 16px 32px rgba(16,42,25,0.06)' : '0 8px 20px rgba(16,42,25,0.03)',
              transition:'all 0.3s',
              borderBottom: open===i ? '1.5px solid rgba(212,175,55,0.2)' : undefined,
            }}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
                <span style={{fontFamily:'Manrope,sans-serif',fontSize:14,fontWeight:600,color:'#102a19',flex:1}}>{faq.q}</span>
                <span className="material-symbols-outlined" style={{fontSize:20,color:open===i?'#D4AF37':'#102a19',transform:open===i?'rotate(45deg)':'none',transition:'all 0.3s',flexShrink:0}}>add</span>
              </div>
              {open===i && <p style={{fontSize:14,color:'#424842',lineHeight:1.8,marginTop:16,paddingTop:16,borderTop:'1px solid rgba(16,42,25,0.05)'}}>{faq.a}</p>}
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:48}}>
          <p style={{fontSize:14,color:'#424842',marginBottom:16}}>Still have questions?</p>
          <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:8,background:'#102a19',color:'#fff',padding:'14px 32px',borderRadius:9999,fontFamily:'Manrope,sans-serif',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.12em',boxShadow:'0 12px 32px rgba(16,42,25,0.15)'}}>
            Contact Us <span className="material-symbols-outlined" style={{fontSize:16}}>arrow_forward</span>
          </Link>
        </div>
      </section>
    </StoreLayout>
  );
}
