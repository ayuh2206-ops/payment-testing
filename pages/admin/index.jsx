// pages/admin/index.jsx
// Matches Stitch admin_login/code.html exactly:
//   Card: glass-card rounded-[2rem] p-10 shadow-[0px_20px_40px_rgba(5,17,11,0.4)]
//   Gold top stripe: absolute top-0 left-0 w-full h-1 gold-gradient opacity-40
//   Inputs: bg-transparent border-b border-outline-variant/40 focus:border-primary
//   Submit: w-full gold-gradient py-4 rounded-full uppercase tracking-[0.15em]
//   Error: p-4 rounded-xl border border-error/20 bg-error-container/10

import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminLogin() {
  const [passkey, setPasskey] = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const router                = useRouter();

  async function handleLogin(e) {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const res = await fetch('/api/admin/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({passkey}) });
      if (res.ok) router.push('/admin/dashboard');
      else setError('Authentication Failed. Please verify your passkey.');
    } catch { setError('Connection error. Please try again.'); }
    finally { setLoading(false); }
  }

  return (
    <>
      <Head><title>Admin Login — YourStore</title></Head>
      <div style={{
        minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        background:'radial-gradient(circle at top right, #2f3c35, #091610)',
        padding: 24, position:'relative', overflow:'hidden',
        fontFamily:'Manrope, sans-serif',
      }}>
        {/* Ambient glows — from Stitch */}
        <div style={{ position:'fixed', top:'-10%', left:'-5%', width:'40%', height:'60%', opacity:0.18, filter:'blur(120px)', background:'#e9c349', borderRadius:'50%', pointerEvents:'none' }}/>
        <div style={{ position:'fixed', bottom:'-10%', right:'-5%', width:'30%', height:'50%', opacity:0.08, filter:'blur(100px)', background:'#9ed1bd', borderRadius:'50%', pointerEvents:'none' }}/>

        <main style={{ position:'relative', zIndex:10, width:'100%', maxWidth:420, padding:'0 4px' }}>
          {/* Brand — from Stitch: font-headline italic text-4xl text-primary */}
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <h1 style={{ fontFamily:'Noto Serif, serif', fontStyle:'italic', fontSize:38, fontWeight:300, color:'#e9c349', letterSpacing:'-0.5px', marginBottom:8 }}>YourStore</h1>
            <p style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'#8b938c' }}>Management Portal · Secure Access</p>
          </div>

          {/* Card — from Stitch: glass-card rounded-[2rem] p-10 shadow-[0px_20px_40px_rgba(5,17,11,0.4)] */}
          <div style={{
            background:'rgba(42,56,49,0.62)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            border:'1px solid rgba(65,72,67,0.3)',
            borderRadius:32, padding:'44px 40px',
            boxShadow:'0 20px 40px rgba(5,17,11,0.4)',
            position:'relative', overflow:'hidden',
          }}>
            {/* Gold top stripe — from Stitch: absolute top-0 left-0 w-full h-1 gold-gradient opacity-40 */}
            <div style={{
              position:'absolute', top:0, left:0, right:0, height:2,
              background:'linear-gradient(135deg,#e9c349,#ad8b0e)', opacity:0.45,
            }}/>

            <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
              {/* Header — from Stitch */}
              <header>
                <h2 style={{ fontFamily:'Noto Serif, serif', fontSize:24, fontWeight:400, color:'#d7e6dc', marginBottom:6 }}>Welcome Back</h2>
                <p style={{ color:'#8b938c', fontSize:13, fontWeight:300, lineHeight:1.6 }}>Enter your administrative credentials to access the workspace.</p>
              </header>

              {/* Form */}
              <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:24 }}>
                {/* Passkey field — from Stitch: border-b border-outline-variant/40 focus:border-primary */}
                <div>
                  <label style={{ display:'block', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em', color:'#8b938c', marginBottom:8 }}>
                    Passkey
                  </label>
                  <input
                    type="password"
                    value={passkey}
                    onChange={e => setPasskey(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    autoFocus
                    style={{
                      width:'100%', background:'transparent', border:'none',
                      borderBottom:'1px solid rgba(65,72,67,0.45)',
                      color:'#d7e6dc', padding:'12px 4px',
                      fontSize:15, outline:'none',
                      fontFamily:'Manrope, sans-serif',
                      transition:'border-color 0.3s',
                    }}
                    onFocus={e => e.target.style.borderBottomColor='#e9c349'}
                    onBlur={e  => e.target.style.borderBottomColor='rgba(65,72,67,0.45)'}
                  />
                </div>

                {/* Submit — from Stitch: w-full gold-gradient py-4 rounded-full uppercase tracking-[0.15em] */}
                <button
                  type="submit"
                  disabled={loading || !passkey}
                  style={{
                    width:'100%', padding:'16px 0', borderRadius:999, border:'none',
                    background: loading||!passkey ? 'rgba(65,72,67,0.4)' : 'linear-gradient(135deg,#e9c349 0%,#ad8b0e 100%)',
                    color: loading||!passkey ? '#8b938c' : '#3c2f00',
                    fontFamily:'Manrope, sans-serif', fontSize:12, fontWeight:800,
                    textTransform:'uppercase', letterSpacing:'0.15em',
                    cursor: loading||!passkey ? 'not-allowed' : 'pointer',
                    boxShadow: loading||!passkey ? 'none' : '0 8px 24px rgba(233,195,73,0.25)',
                    transition:'all 0.2s',
                  }}
                >
                  {loading ? 'Verifying…' : 'Enter Workspace'}
                </button>

                <div style={{ display:'flex', justifyContent:'space-between', padding:'0 4px' }}>
                  <a href="/" style={{ fontSize:11, color:'#8b938c', textDecoration:'underline', textDecorationColor:'rgba(233,195,73,0.3)', textUnderlineOffset:3 }}>← Back to Store</a>
                </div>
              </form>

              {/* Error — from Stitch: p-4 rounded-xl border border-error/20 bg-error-container/10 */}
              {error && (
                <div style={{
                  padding:'12px 16px', borderRadius:14,
                  border:'1px solid rgba(255,180,171,0.2)',
                  background:'rgba(147,0,10,0.1)',
                  display:'flex', alignItems:'center', gap:10,
                }}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="#ffb4ab" strokeWidth="1.8" width="18" height="18" style={{flexShrink:0}}>
                    <path d="M10 2l8 14H2L10 2zm0 5v4m0 3h.01"/>
                  </svg>
                  <span style={{ fontSize:12, color:'rgba(255,218,214,0.9)', fontWeight:500 }}>{error}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer — from Stitch: AES-256 + Secure Node */}
          <footer style={{ marginTop:36, textAlign:'center', display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:20 }}>
              {[['🔒','AES-256 Encrypted'],['🛡️','Secure Node']].map(([icon,label])=>(
                <div key={label} style={{ display:'flex', alignItems:'center', gap:6, color:'rgba(139,147,140,0.5)' }}>
                  <span style={{ fontSize:12 }}>{icon}</span>
                  <span style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.14em' }}>{label}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize:10, color:'rgba(139,147,140,0.35)', fontWeight:300 }}>© YourStore. Unauthorized access is strictly prohibited.</p>
          </footer>
        </main>

        {/* Floating rings — from Stitch */}
        <div style={{ position:'fixed', top:'18%', right:'14%', width:240, height:240, border:'1px solid rgba(233,195,73,0.05)', borderRadius:'50%', pointerEvents:'none' }}/>
        <div style={{ position:'fixed', bottom:'8%', left:'8%', width:360, height:360, border:'1px solid rgba(158,209,189,0.04)', borderRadius:'50%', pointerEvents:'none' }}/>
      </div>
    </>
  );
}
