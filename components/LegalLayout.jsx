// components/LegalLayout.jsx
// Shared wrapper for all policy/legal pages
import Link from "next/link";

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="legal-page">
      <div className="legal-wrap">
        <div className="legal-breadcrumb">
          <Link href="/">← Back to Store</Link>
        </div>
        <div className="legal-header">
          <h1>{title}</h1>
          {lastUpdated && <p className="legal-date">Last updated: {lastUpdated}</p>}
        </div>
        <div className="legal-body">{children}</div>
      </div>

      <style jsx>{`
        .legal-page {
          position: relative; z-index: 1;
          padding: 40px 20px 80px;
          min-height: 100vh;
        }
        .legal-wrap {
          max-width: 760px;
          margin: 0 auto;
        }
        .legal-breadcrumb {
          margin-bottom: 32px;
          font-size: 13px;
          color: var(--muted);
        }
        .legal-breadcrumb a:hover { color: var(--accent); }
        .legal-header {
          border-bottom: 1px solid var(--border);
          padding-bottom: 24px;
          margin-bottom: 36px;
        }
        .legal-header h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }
        .legal-date {
          font-size: 13px;
          color: var(--muted);
        }
        .legal-body {
          line-height: 1.8;
          font-size: 14px;
          color: #c8d0e0;
        }
        .legal-body h2 {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--text);
          margin: 32px 0 12px;
          padding-left: 12px;
          border-left: 3px solid var(--accent);
        }
        .legal-body h3 {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          margin: 20px 0 8px;
        }
        .legal-body p { margin-bottom: 14px; }
        .legal-body ul {
          padding-left: 20px;
          margin-bottom: 14px;
        }
        .legal-body ul li { margin-bottom: 6px; }
        .legal-body a { color: var(--accent); text-decoration: underline; }
        .legal-body .highlight-box {
          background: rgba(0,229,176,0.06);
          border: 1px solid rgba(0,229,176,0.2);
          border-radius: 10px;
          padding: 16px 20px;
          margin: 20px 0;
          font-size: 13px;
          color: var(--muted);
        }
        .legal-body .highlight-box strong { color: var(--accent); }
        .legal-body .contact-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          margin: 16px 0;
        }
        .legal-body .contact-card strong {
          display: block;
          color: var(--text);
          font-family: 'Syne', sans-serif;
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}
