// components/Footer.jsx — Botanical Glass
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">YourStore</div>
          <p className="footer-tagline">Premium tech accessories, curated with care. Secure payments via Razorpay PCI DSS Level 1.</p>
          <div className="pci-pill">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12">
              <path d="M7 1l5 2.5V7c0 3-5 5-5 5S2 10 2 7V3.5L7 1z"/>
            </svg>
            PCI DSS Certified via Razorpay
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Legal</h4>
            <Link href="/legal/terms">Terms of Use</Link>
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
            <Link href="/legal/refund-policy">Refund &amp; Returns</Link>
            <Link href="/legal/grievance">Grievance Redressal</Link>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>
            <a href="tel:+910000000000">[Your Phone Number]</a>
            <Link href="/legal/grievance">File a Complaint</Link>
          </div>
          <div className="footer-col">
            <h4>Payments</h4>
            <a href="https://razorpay.com/terms/" target="_blank" rel="noreferrer">Razorpay Terms</a>
            <a href="https://razorpay.com/privacy/" target="_blank" rel="noreferrer">Razorpay Privacy</a>
            <a href="https://razorpay.com/grievances/" target="_blank" rel="noreferrer">Razorpay Grievances</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} [Your Business Name]. All rights reserved. | [Your Business Address] | <a href="mailto:grievance@yourdomain.com">grievance@yourdomain.com</a></p>
        <p className="disclaimer">Payments processed by Razorpay Software Pvt. Ltd. We are an independent merchant and not an agent or representative of Razorpay.</p>
      </div>

      <style jsx>{`
        .footer {
          border-top: 1px solid rgba(65,72,67,0.2);
          padding: 52px 28px 28px;
          position: relative; z-index: 1;
          background: linear-gradient(to bottom, transparent, rgba(5,17,11,0.5));
        }
        .footer-inner {
          max-width: 1360px; margin: 0 auto;
          display: grid; grid-template-columns: 1.3fr 2fr;
          gap: 48px; margin-bottom: 44px;
        }
        @media(max-width:768px){ .footer-inner { grid-template-columns: 1fr; gap: 32px; } }
        .footer-logo {
          font-family: 'Noto Serif', serif;
          font-size: 20px; font-weight: 300; font-style: italic;
          color: var(--gold); margin-bottom: 12px;
        }
        .footer-tagline { font-size: 12.5px; color: var(--text2); line-height: 1.7; margin-bottom: 16px; }
        .pci-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(158,209,189,0.08); border: 1px solid rgba(158,209,189,0.2);
          border-radius: 999px; padding: 5px 12px;
          font-size: 11px; font-weight: 600; color: var(--teal);
          letter-spacing: .04em;
        }
        .footer-links {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 24px;
        }
        @media(max-width:500px){ .footer-links { grid-template-columns: 1fr 1fr; } }
        .footer-col h4 {
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--text3); margin-bottom: 16px;
        }
        .footer-col a {
          display: block; font-size: 13px; color: var(--text2);
          margin-bottom: 10px; transition: color .2s;
        }
        .footer-col a:hover { color: var(--gold); }
        .footer-bottom {
          border-top: 1px solid rgba(65,72,67,0.15);
          padding-top: 20px;
          max-width: 1360px; margin: 0 auto;
        }
        .footer-bottom p { font-size: 11.5px; color: var(--text3); line-height: 1.7; margin-bottom: 4px; }
        .footer-bottom a { color: var(--text3); text-decoration: underline; text-underline-offset: 2px; }
        .disclaimer { font-size: 10.5px; opacity: .55; }
      `}</style>
    </footer>
  );
}
