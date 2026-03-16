// pages/api/admin/login.js
import { getAdminPasskey, createAdminToken, setAdminCookie } from '@/lib/auth';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { passkey } = req.body;
  if (!passkey || passkey !== getAdminPasskey()) {
    return res.status(401).json({ error: 'Invalid passkey' });
  }

  const token = createAdminToken();
  setAdminCookie(res, token);
  return res.status(200).json({ success: true });
}
