// pages/api/admin/logout.js
import { clearAdminCookie } from '@/lib/auth';

export default function handler(req, res) {
  clearAdminCookie(res);
  return res.status(200).json({ success: true });
}
