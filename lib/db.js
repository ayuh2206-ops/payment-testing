// lib/db.js
// Neon serverless PostgreSQL driver.
// Usage in API routes:
//   import { getDb } from '@/lib/db';
//   const sql = getDb();
//   const rows = await sql`SELECT * FROM products WHERE is_active = true`;

import { neon } from '@neondatabase/serverless';

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return neon(process.env.DATABASE_URL);
}
