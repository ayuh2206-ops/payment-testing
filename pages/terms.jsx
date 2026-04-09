// pages/terms.jsx
// Terms & Conditions — placeholder with admin-editable content
import { useState, useEffect } from 'react';
import StoreLayout, { GlassCard, PageHero } from '@/components/StoreLayout';

const PLACEHOLDER_SECTIONS = [
  { title: 'Acceptance of Terms', content: 'By accessing and using the SB Ayurved website (sbayurved.com) and purchasing our products, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.' },
  { title: 'Products & Descriptions', content: 'We strive to display product information, images, and descriptions as accurately as possible. However, slight variations in color, packaging, or labeling may occur. All Ayurvedic products are manufactured under GMP-compliant facilities.' },
  { title: 'Pricing & Payment', content: 'All prices are listed in Indian Rupees (₹) and include applicable taxes. We reserve the right to modify prices without prior notice. Payment is processed securely through our authorized payment gateway.' },
  { title: 'Shipping & Delivery', content: 'Orders are typically dispatched within 2-3 business days. Delivery timelines vary by location across India. We are not responsible for delays caused by courier services or unforeseen circumstances.' },
  { title: 'Returns & Refunds', content: 'Unopened products in original packaging may be returned within 7 days of delivery. Refunds are processed within 7-10 business days after receiving the returned product. Opened or used products cannot be returned.' },
  { title: 'Intellectual Property', content: 'All content on this website — including text, images, logos, product names (BrahmaSattu, BrahmaPeya, AyuAahar, etc.) — is the intellectual property of Shree Brahmachaitanya Ayurved and may not be reproduced without written permission.' },
  { title: 'Limitation of Liability', content: 'SB Ayurved products are Ayurvedic preparations intended for general wellness. They are not intended to diagnose, treat, cure, or prevent any disease. Please consult your healthcare practitioner before use.' },
  { title: 'Contact for Disputes', content: 'For any disputes or concerns, please contact us at info@sbayurved.com or call +91 9168584999. Disputes shall be subject to the jurisdiction of courts in Nagpur, Maharashtra.' },
];

export default function TermsPage() {
  const [cms, setCms] = useState(null);
  useEffect(() => {
    fetch('/api/p/terms-and-condition').then(r => r.ok ? r.json() : null).then(d => d && setCms(d.page)).catch(() => {});
  }, []);

  return (
    <StoreLayout title="Terms & Conditions" description="Terms and Conditions for SB Ayurved">
      <PageHero title="Terms & Conditions" breadcrumb="Terms & Conditions" />
      <section style={{ maxWidth:840, margin:'0 auto', padding:'0 32px 80px' }}>
        <GlassCard style={{ padding:'clamp(32px,5vw,56px)' }}>
          {cms?.content ? (
            <div style={{ fontSize:15, color:'#424842', lineHeight:1.9, whiteSpace:'pre-wrap' }}>{cms.content}</div>
          ) : (
            <div style={{ fontSize:15, color:'#424842', lineHeight:1.9 }}>
              <p style={{ fontSize:13, color:'rgba(66,72,66,0.5)', fontStyle:'italic', marginBottom:32 }}>
                Last updated: April 2025 · Editable from Admin → Pages
              </p>
              {PLACEHOLDER_SECTIONS.map((s, i) => (
                <div key={i} style={{ marginBottom:32 }}>
                  <h3 style={{ fontFamily:'Newsreader,serif', fontSize:20, color:'#102A19', marginBottom:10 }}>
                    {i + 1}. {s.title}
                  </h3>
                  <p>{s.content}</p>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </section>
    </StoreLayout>
  );
}
