// components/Footer.jsx
// REQUIRED: Razorpay ToU Part I §6.1(b) — refund policy and T&C must be clearly
// displayed on the website. Footer ensures they're accessible from every page.

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <span className="footer-logo">YourStore</span>
          <p className="footer-tagline">
            Secure payments powered by Razorpay.<br />
            We never store your card or payment credentials.
          </p>
          {/* PCI DSS badge statement — Razorpay ToU §6.3 */}
          <div className="pci-badge">
            <span>🔒</span>
            <span>PCI DSS Compliant via Razorpay</span>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Legal</h4>
            {/* All four links REQUIRED by Razorpay ToU */}
            <Link href="/legal/terms">Terms of Use</Link>
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
            <Link href="/legal/refund-policy">Refund &amp; Return Policy</Link>
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
            {/* Required: Razorpay ToU §2.20 — do NOT claim to be Razorpay's agent */}
            <a href="https://razorpay.com/terms/" target="_blank" rel="noreferrer">
              Razorpay Terms
            </a>
            <a href="https://razorpay.com/privacy/" target="_blank" rel="noreferrer">
              Razorpay Privacy
            </a>
            <a href="https://razorpay.com/grievances/" target="_blank" rel="noreferrer">
              Razorpay Grievances
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {year} [Your Business Name]. All rights reserved. |{" "}
          [Your Business Address] |{" "}
          <a href="mailto:grievance@yourdomain.com">grievance@yourdomain.com</a>
        </p>
        <p className="footer-disclaimer">
          Payments processed by Razorpay Software Pvt. Ltd. We are an independent merchant
          and not an agent or representative of Razorpay.
          {/* Razorpay ToU §2.20 & §14.2(c) — must not claim to represent Razorpay */}
        </p>
      </div>

      <style jsx>{`
        .site-footer {
          border-top: 1px solid var(--border);
          padding: 48px 24px 24px;
          margin-top: auto;
          position: relative; z-index: 1;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.4fr 2fr;
          gap: 48px;
          margin-bottom: 40px;
        }
        @media (max-width: 768px) {
          .footer-inner { grid-template-columns: 1fr; gap: 32px; }
        }
        .footer-logo {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: var(--text);
          display: block;
          margin-bottom: 12px;
        }
        .footer-tagline {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .pci-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,229,176,0.07);
          border: 1px solid rgba(0,229,176,0.2);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 12px;
          color: var(--accent);
          font-weight: 600;
        }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 500px) {
          .footer-links { grid-template-columns: 1fr 1fr; }
        }
        .footer-col h4 {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--muted);
          margin-bottom: 14px;
        }
        .footer-col a {
          display: block;
          font-size: 13px;
          color: #8892a4;
          margin-bottom: 10px;
          transition: color 0.2s;
        }
        .footer-col a:hover { color: var(--accent); }
        .footer-bottom {
          border-top: 1px solid var(--border);
          padding-top: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-bottom p {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 6px;
        }
        .footer-bottom a { color: var(--muted); text-decoration: underline; }
        .footer-disclaimer {
          font-size: 11px !important;
          opacity: 0.6;
        }
      `}</style>
    </footer>
  );
}
