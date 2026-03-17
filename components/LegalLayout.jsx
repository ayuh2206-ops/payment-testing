// components/LegalLayout.jsx — Botanical Glass
import Link from 'next/link';

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="legal-page">
      <div className="ambient" />
      <div className="legal-wrap">
        <div className="breadcrumb">
          <Link href="/">← Back to Store</Link>
        </div>
        <div className="legal-header">
          <h1>{title}</h1>
          {lastUpdated && <p className="legal-date">Last updated: {lastUpdated}</p>}
        </div>
        <div className="legal-body">{children}</div>
      </div>

      <style jsx>{`
        .legal-page { min-height:100vh; background:var(--bg); padding:40px 24px 80px; position:relative; z-index:1; }
        .ambient { position:fixed; top:-10%; right:-5%; width:600px; height:600px; background:radial-gradient(circle,rgba(27,77,62,0.14) 0%,transparent 70%); pointer-events:none; z-index:0; }
        .legal-wrap { max-width:760px; margin:0 auto; position:relative; z-index:1; }
        .breadcrumb { margin-bottom:28px; font-size:12px; color:var(--text3); font-weight:600; letter-spacing:.04em; text-transform:uppercase; }
        .breadcrumb a:hover { color:var(--gold); }
        .legal-header { border-bottom:1px solid rgba(65,72,67,0.2); padding-bottom:24px; margin-bottom:36px; }
        .legal-header h1 { font-family:'Noto Serif',serif; font-size:clamp(26px,5vw,40px); font-weight:300; font-style:italic; letter-spacing:-0.5px; margin-bottom:8px; }
        .legal-date { font-size:12px; color:var(--text3); }
        .legal-body { line-height:1.85; font-size:14px; color:var(--text2); }
        :global(.legal-body h2) { font-family:'Noto Serif',serif; font-size:17px; font-weight:400; color:var(--text); margin:32px 0 12px; padding-left:14px; border-left:2px solid var(--gold); border-radius:0; }
        :global(.legal-body h3) { font-size:14px; font-weight:600; color:var(--text); margin:20px 0 8px; }
        :global(.legal-body p) { margin-bottom:14px; }
        :global(.legal-body ul) { padding-left:20px; margin-bottom:14px; }
        :global(.legal-body ul li) { margin-bottom:6px; }
        :global(.legal-body a) { color:var(--teal); text-decoration:underline; text-underline-offset:2px; }
        :global(.legal-body a:hover) { color:var(--gold); }
        :global(.legal-body .highlight-box) { background:rgba(233,195,73,0.06); border:1px solid rgba(233,195,73,0.15); border-radius:14px; padding:16px 20px; margin:20px 0; font-size:13px; color:var(--text2); }
        :global(.legal-body .highlight-box strong) { color:var(--gold); }
        :global(.legal-body .contact-card) { background:rgba(42,56,49,0.5); border-radius:16px; padding:20px; margin:16px 0; box-shadow:inset 0 1px 1px rgba(65,72,67,0.25); }
        :global(.legal-body .contact-card strong) { display:block; color:var(--text); font-family:'Noto Serif',serif; font-style:italic; margin-bottom:8px; }
        :global(.legal-body code) { font-family:monospace; font-size:12px; background:rgba(65,72,67,0.3); padding:2px 6px; border-radius:4px; color:var(--teal); }
      `}</style>
    </div>
  );
}
