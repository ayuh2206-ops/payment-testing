// lib/auth.js
// Admin passkey authentication via JWT + httpOnly cookie.
// Passkey is set via ADMIN_PASSKEY env var (default: admin@123).
// JWT_SECRET should be a long random string in production.

import jwt from 'jsonwebtoken';
import { serialize, parse } from 'cookie';

const COOKIE_NAME = 'admin_token';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export function getJwtSecret() {
  return process.env.JWT_SECRET || 'dev-secret-change-in-production';
}

export function getAdminPasskey() {
  return process.env.ADMIN_PASSKEY || 'admin@123';
}

export function createAdminToken() {
  return jwt.sign({ role: 'admin', iat: Date.now() }, getJwtSecret(), { expiresIn: '24h' });
}

export function verifyAdminToken(req) {
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies[COOKIE_NAME];
    if (!token) return false;
    const decoded = jwt.verify(token, getJwtSecret());
    return decoded.role === 'admin';
  } catch {
    return false;
  }
}

export function setAdminCookie(res, token) {
  res.setHeader('Set-Cookie', serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  }));
}

export function clearAdminCookie(res) {
  res.setHeader('Set-Cookie', serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  }));
}

// Middleware helper for admin API routes
export function requireAdmin(handler) {
  return async (req, res) => {
    if (!verifyAdminToken(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return handler(req, res);
  };
}
