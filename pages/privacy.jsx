// pages/privacy.jsx
import { useState, useEffect } from 'react';
import StoreLayout, { GlassCard, PageHero } from '@/components/StoreLayout';

const SECTIONS = [
  { title: 'Information We Collect', content: 'When you place an order or create an account, we collect your name, email address, phone number, and shipping address. We also collect payment information processed securely through our payment gateway — we do not store credit/debit card details on our servers.' },
  { title: 'How We Use Your Information', content: 'Your personal information is used to process and fulfill orders, send order confirmations and shipping updates, respond to customer service inquiries, and improve our website and product offerings. We may also send occasional newsletters about new products or promotions — you can opt out at any time.' },
  { title: 'Information Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers (shipping partners, payment processors) strictly for order fulfillment purposes.' },
  { title: 'Data Security', content: 'We implement industry-standard security measures including SSL encryption, secure payment processing, and restricted access to personal data. While we strive to protect your information, no method of electronic transmission is 100% secure.' },
  { title: 'Cookies', content: 'Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can manage cookie preferences through your browser settings.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us at info@sbayurved.com or call +91 9168584999.' },
  { title: 'Changes to This Policy', content: 'We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated revision date. Continued use of our website constitutes acceptance of the updated policy.' },
];

export default function PrivacyPage() {
  const [cms, setCms] = useState(null);
  useEffect(() => {
    fetch('/api/p/privacy-policies').then(r => r.ok ? r.json() : null).then(d => d && setCms(d.page)).catch(() => {});
  }, []);

  return (
    <StoreLayout title="Privacy Policy" description="Privacy Policy for SB Ayurved">
      <PageHero title="Privacy Policy" breadcrumb="Privacy Policy" />
      <section style={{ maxWidth:840, margin:'0 auto', padding:'0 32px 80px' }}>
        <GlassCard style={{ padding:'clamp(32px,5vw,56px)' }}>
          {cms?.content ? (
            <div style={{ fontSize:15, color:'#424842', lineHeight:1.9, whiteSpace:'pre-wrap' }}>{cms.content}</div>
          ) : (
            <div style={{ fontSize:15, color:'#424842', lineHeight:1.9 }}>
              <p style={{ fontSize:13, color:'rgba(66,72,66,0.5)', fontStyle:'italic', marginBottom:32 }}>
                Last updated: April 2025 · Editable from Admin → Pages
              </p>
              <p style={{ marginBottom:32 }}>
                Shree Brahmachaitanya Ayurved ("SB Ayurved", "we", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit sbayurved.com and purchase our products.
              </p>
              {SECTIONS.map((s, i) => (
                <div key={i} style={{ marginBottom:32 }}>
                  <h3 style={{ fontFamily:'Newsreader,serif', fontSize:20, color:'#102A19', marginBottom:10 }}>{i + 1}. {s.title}</h3>
                  <p>{s.content}</p>
                </div>
              ))}
              <div style={{ marginTop:40, padding:'20px 28px', borderRadius:16, background:'rgba(203,234,208,0.15)', borderLeft:'3px solid #D4AF37' }}>
                <p style={{ fontSize:14, color:'#102A19' }}>
                  <strong>Contact:</strong> For privacy-related inquiries, reach us at info@sbayurved.com or 533, Manorama Apt, Anand Nagar, Nagpur — 440009
                </p>
              </div>
            </div>
          )}
        </GlassCard>
      </section>
    </StoreLayout>
  );
}
