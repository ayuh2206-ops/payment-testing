// pages/faq.jsx
// FAQ — placeholder content editable from admin
import { useState, useEffect } from 'react';
import StoreLayout, { GlassCard, PageHero } from '@/components/StoreLayout';

const DEFAULT_FAQS = [
  { q: 'What is Shree Brahmachaitanya Ayurved?', a: 'We are a collective of Ayurvedic physicians (Vaidyas) producing quality, effective and affordable classical and proprietary Ayurvedic medicines. Our core team holds postgraduate degrees in Rasashastra, Bhaishajya Kalpana, Dravyaguna, and Kaychikitsa.' },
  { q: 'Are your products clinically tested?', a: 'Yes. All our proprietary products undergo rigorous testing and validation. Our classical formulations follow Shastrokt (scripture-based) manufacturing principles with GMP-compliant processes.' },
  { q: 'How do I place an order?', a: 'Browse our product catalog, add items to your cart, and proceed to checkout. We accept all major payment methods through our secure payment gateway. Orders are typically dispatched within 2-3 business days.' },
  { q: 'Do you ship across India?', a: 'Yes, we ship to all major cities and towns across India. Shipping charges may vary based on location and order value. Orders above a certain value qualify for free shipping.' },
  { q: 'What is AyuAahar?', a: 'AyuAahar is our Ayurvedic food brand — the first of its kind working exclusively on nutrition and food habits according to Ayurvedic Pathya Kalpana dietics. Products include health drinks, sattu, and peya preparations.' },
  { q: 'Can I return or exchange a product?', a: 'We accept returns within 7 days of delivery for unopened products in original packaging. Please contact us at info@sbayurved.com with your order details to initiate a return or exchange.' },
  { q: 'Are your products suitable for all age groups?', a: 'Most of our products are suitable for adults. For specific age recommendations, please refer to the product label or consult with your Ayurvedic practitioner before use.' },
  { q: 'How can I become a distributor or stockist?', a: 'We welcome partnerships with Ayurvedic practitioners and health stores. Please reach out to us via our Contact page or email info@sbayurved.com with your details and area of interest.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState(null);
  const [cmsContent, setCmsContent] = useState(null);

  useEffect(() => {
    fetch('/api/p/faqs').then(r => r.ok ? r.json() : null).then(d => d && setCmsContent(d.page)).catch(() => {});
  }, []);

  return (
    <StoreLayout title="FAQ's" description="Frequently asked questions about SB Ayurved products and services">
      <PageHero title="Frequently Asked Questions" breadcrumb="FAQ's" subtitle="Everything you need to know about our products, shipping, and Ayurvedic wellness journey." />

      <section style={{ maxWidth:800, margin:'0 auto', padding:'0 32px 80px' }}>
        {/* CMS content if available */}
        {cmsContent?.content && (
          <GlassCard style={{ marginBottom:32, padding:32 }}>
            <div style={{ fontSize:15, color:'#424842', lineHeight:1.8, whiteSpace:'pre-wrap' }}>{cmsContent.content}</div>
          </GlassCard>
        )}

        {/* FAQ Accordion */}
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {DEFAULT_FAQS.map((faq, i) => (
            <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{
              background: open === i ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.35)',
              backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
              borderTop:'1.5px solid rgba(255,255,255,0.8)',
              borderLeft:'1.5px solid rgba(255,255,255,0.8)',
              borderBottom: open === i ? '1.5px solid rgba(212,175,55,0.2)' : '1.5px solid rgba(255,255,255,0.2)',
              borderRight:'1.5px solid rgba(255,255,255,0.2)',
              borderRadius:20, padding:'20px 28px',
              boxShadow: open === i ? '0 16px 32px rgba(16,42,25,0.06)' : '0 8px 20px rgba(16,42,25,0.03)',
              cursor:'pointer', transition:'all 0.3s',
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:16 }}>
                <span style={{ fontFamily:'Manrope,sans-serif', fontSize:14, fontWeight:600, color:'#102A19', flex:1 }}>{faq.q}</span>
                <span className="material-symbols-outlined" style={{
                  fontSize:20, color: open === i ? '#D4AF37' : '#102A19',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition:'transform 0.3s, color 0.3s', flexShrink:0,
                }}>add</span>
              </div>
              {open === i && (
                <p style={{ fontSize:14, color:'#424842', lineHeight:1.8, marginTop:16, paddingTop:16, borderTop:'1px solid rgba(16,42,25,0.05)' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign:'center', marginTop:48 }}>
          <p style={{ fontSize:14, color:'#424842', marginBottom:16 }}>Still have questions?</p>
          <a href="/contact" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'#102A19', color:'#fff', padding:'14px 32px', borderRadius:9999,
            fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700,
            textTransform:'uppercase', letterSpacing:'0.12em', textDecoration:'none',
            boxShadow:'0 12px 32px rgba(16,42,25,0.15)',
          }}>
            Contact Us <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_forward</span>
          </a>
        </div>
      </section>
    </StoreLayout>
  );
}
