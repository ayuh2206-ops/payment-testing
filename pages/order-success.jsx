// pages/order-success.jsx
// ═══ Order Success — light Botanical Liquid Glass ═══
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function OrderSuccess() {
  const router = useRouter();
  const { ref } = router.query;

  return (
    <>
      <Head>
        <title>Order Confirmed | SB Ayurved</title>
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background:'#FCFCF9', color:'#1a1c1b', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
        {/* Atmospheric blobs */}
        <div className="botanical-blob" style={{ top:'-10%', left:'-10%', width:'50vw', height:'50vw', background:'rgba(203,234,208,0.3)' }} />
        <div className="botanical-blob" style={{ bottom:'-10%', right:'-10%', width:'40vw', height:'40vw', background:'rgba(176,206,181,0.2)' }} />

        <div className="liquid-glass" style={{
          borderRadius:48, padding:'clamp(40px,6vw,64px)', maxWidth:560, width:'90%', textAlign:'center',
          boxShadow:'0 30px 60px rgba(16,42,25,0.08)', position:'relative', zIndex:1,
        }}>
          {/* Success icon */}
          <div style={{
            width:80, height:80, borderRadius:9999, margin:'0 auto 24px',
            background:'rgba(203,234,208,0.4)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize:40, color:'#102a19' }}>check_circle</span>
          </div>

          <h1 style={{ fontFamily:'Newsreader,serif', fontSize:36, fontWeight:300, color:'#102a19', marginBottom:12 }}>
            Order <span style={{ fontStyle:'italic' }}>Confirmed</span>
          </h1>
          <p style={{ fontSize:15, color:'#424842', lineHeight:1.7, marginBottom:8 }}>
            Thank you for your order. Your Ayurvedic formulations are being prepared with care.
          </p>

          {ref && (
            <div style={{
              margin:'24px auto', padding:'12px 24px', borderRadius:12,
              background:'rgba(203,234,208,0.2)', display:'inline-block',
            }}>
              <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em', color:'#424842' }}>Order Reference</span>
              <p style={{ fontFamily:'Newsreader,serif', fontSize:20, color:'#102a19', marginTop:4 }}>{ref}</p>
            </div>
          )}

          <p style={{ fontSize:13, color:'#424842', marginTop:16, marginBottom:32 }}>
            You'll receive a confirmation email shortly with tracking details.
          </p>

          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              background:'#102a19', color:'#fff', padding:'14px 32px', borderRadius:9999,
              fontFamily:'Manrope,sans-serif', fontSize:12, fontWeight:700,
              textTransform:'uppercase', letterSpacing:'0.12em',
              boxShadow:'0 12px 32px rgba(16,42,25,0.15)',
            }}>
              Continue Shopping
              <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Bottom brand */}
        <p style={{ position:'absolute', bottom:32, fontSize:12, color:'rgba(16,42,25,0.3)', fontFamily:'Newsreader,serif', fontStyle:'italic' }}>
          SB Ayurved — Rooted in Tradition
        </p>
      </div>
    </>
  );
}
