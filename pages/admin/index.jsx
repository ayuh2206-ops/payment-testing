// pages/admin/index.jsx — Admin login gate
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey }),
      });
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError('Invalid passkey. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head><title>Admin Login — YourStore</title></Head>
      <div className="page">
        <div className="card">
          <div className="logo">
            <span className="logo-dot" />
            YourStore
          </div>
          <h1>Admin Panel</h1>
          <p className="sub">Enter your admin passkey to continue</p>

          <form onSubmit={handleLogin}>
            <div className="field">
              <label>Passkey</label>
              <input
                type="password"
                value={passkey}
                onChange={e => setPasskey(e.target.value)}
                placeholder="Enter passkey"
                autoFocus
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn" disabled={loading || !passkey}>
              {loading ? 'Verifying…' : 'Access Admin Panel →'}
            </button>
          </form>

          <p className="back"><a href="/">← Back to store</a></p>
        </div>

        <style jsx>{`
          .page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: var(--bg);
          }
          .card {
            width: 100%;
            max-width: 380px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 40px 36px;
          }
          .logo {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: 'Syne', sans-serif;
            font-size: 16px;
            font-weight: 800;
            color: var(--text);
            margin-bottom: 28px;
          }
          .logo-dot {
            width: 8px; height: 8px;
            background: var(--accent);
            border-radius: 50%;
          }
          h1 {
            font-family: 'Syne', sans-serif;
            font-size: 24px; font-weight: 800;
            letter-spacing: -0.5px;
            margin-bottom: 6px;
          }
          .sub { font-size: 13px; color: var(--text2); margin-bottom: 28px; }
          .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
          label { font-size: 12px; font-weight: 600; color: var(--text2); text-transform: uppercase; letter-spacing: 0.5px; }
          input {
            height: 44px;
            padding: 0 14px;
            background: var(--surface2);
            border: 1px solid var(--border);
            border-radius: 10px;
            color: var(--text);
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
            font-family: 'Inter', sans-serif;
          }
          input:focus { border-color: var(--accent); }
          .error {
            font-size: 12px;
            color: var(--red);
            margin-bottom: 12px;
            padding: 8px 12px;
            background: rgba(239,68,68,0.08);
            border-radius: 8px;
            border: 1px solid rgba(239,68,68,0.2);
          }
          .btn {
            width: 100%;
            height: 46px;
            background: var(--accent);
            color: #fff;
            border: none;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            font-family: 'Inter', sans-serif;
            cursor: pointer;
            transition: opacity 0.15s;
            margin-top: 4px;
          }
          .btn:hover:not(:disabled) { opacity: 0.88; }
          .btn:disabled { opacity: 0.4; cursor: not-allowed; }
          .back { text-align: center; font-size: 13px; color: var(--text2); margin-top: 20px; }
          .back a:hover { color: var(--accent2); }
        `}</style>
      </div>
    </>
  );
}
