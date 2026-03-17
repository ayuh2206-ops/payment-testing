// pages/admin/index.jsx — Botanical Glass admin login
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminLogin() {
  const [passkey, setPasskey] = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const router                = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey }),
      });
      if (res.ok) router.push('/admin/dashboard');
      else setError('Invalid passkey. Please try again.');
    } catch { setError('Connection error.'); }
    finally { setLoading(false); }
  }

  return (
    <>
      <Head><title>Admin — YourStore</title></Head>
      <div className="page">
        <div className="ambient1" /><div className="ambient2" />
        <div className="card">
          <div className="logo">YourStore</div>
          <h1>Admin Access</h1>
          <p className="sub">Enter your passkey to continue</p>

          <form onSubmit={handleLogin}>
            <div className="field">
              <label>Passkey</label>
              <input
                type="password"
                value={passkey}
                onChange={e => setPasskey(e.target.value)}
                placeholder="••••••••"
                className="input-minimal"
                autoFocus required
              />
            </div>
            {error && <p className="err">{error}</p>}
            <button type="submit" className="gold-btn" style={{ width:'100%', padding:'15px 0', marginTop:8 }} disabled={loading || !passkey}>
              {loading ? 'Verifying…' : 'Access Dashboard'}
            </button>
          </form>
          <p className="back"><a href="/">← Back to store</a></p>
        </div>

        <style jsx>{`
          .page { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; position:relative; overflow:hidden; }
          .ambient1 { position:fixed; top:-20%; right:-10%; width:600px; height:600px; background:radial-gradient(circle,rgba(27,77,62,0.2) 0%,transparent 70%); pointer-events:none; z-index:0; }
          .ambient2 { position:fixed; bottom:-10%; left:-10%; width:400px; height:400px; background:radial-gradient(circle,rgba(233,195,73,0.07) 0%,transparent 70%); pointer-events:none; z-index:0; }
          .card { width:100%; max-width:380px; background:rgba(42,56,49,0.55); backdrop-filter:blur(28px); border-radius:28px; padding:44px 40px; box-shadow:inset 0 1px 1px rgba(65,72,67,0.3),0 30px 60px rgba(5,17,11,0.5); position:relative; z-index:1; }
          .logo { font-family:'Noto Serif',serif; font-size:20px; font-weight:300; font-style:italic; color:var(--gold); margin-bottom:28px; }
          h1 { font-family:'Noto Serif',serif; font-size:26px; font-weight:300; letter-spacing:-0.5px; margin-bottom:8px; }
          .sub { font-size:13px; color:var(--text2); margin-bottom:32px; }
          .field { display:flex; flex-direction:column; gap:6px; margin-bottom:20px; }
          label { font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--text3); }
          .err { font-size:12px; color:var(--error); padding:10px 14px; background:rgba(255,180,171,0.1); border-radius:10px; margin-bottom:12px; }
          .gold-btn:disabled { opacity:.4; cursor:not-allowed; transform:none !important; }
          .back { text-align:center; font-size:12px; color:var(--text3); margin-top:24px; }
          .back a:hover { color:var(--gold); }
        `}</style>
      </div>
    </>
  );
}
