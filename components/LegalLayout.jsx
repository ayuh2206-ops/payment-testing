// components/LegalLayout.jsx
// ═══ Legal page layout — light Botanical Liquid Glass ═══
import StoreLayout from './StoreLayout';

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <StoreLayout title={title}>
      <section style={{ maxWidth:840, margin:'0 auto', padding:'40px 32px 80px' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <h1 style={{
            fontFamily:'Newsreader,serif', fontSize:'clamp(32px,5vw,52px)',
            fontWeight:300, fontStyle:'italic', color:'#102a19',
            lineHeight:1.15,
          }}>{title}</h1>
          {lastUpdated && <p style={{ fontSize:12, color:'#424842', opacity:0.5, marginTop:12 }}>Last updated: {lastUpdated}</p>}
        </div>
        <div className="liquid-glass" style={{
          borderRadius:40, padding:'clamp(32px,5vw,56px)',
          boxShadow:'0 20px 40px rgba(16,42,25,0.06)',
        }}>
          <div style={{ fontSize:15, color:'#424842', lineHeight:1.9, fontFamily:'Manrope,sans-serif' }}>
            {children}
          </div>
        </div>
      </section>
    </StoreLayout>
  );
}
