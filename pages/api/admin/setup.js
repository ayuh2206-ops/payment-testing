// pages/api/admin/setup.js
// ONE-TIME setup: creates all tables + seeds 240 products.
// POST /api/admin/setup  { passkey: "admin@123" }
// Safe to run multiple times — uses CREATE TABLE IF NOT EXISTS + INSERT ON CONFLICT DO NOTHING.

import { getDb } from '@/lib/db';
import { getAdminPasskey } from '@/lib/auth';

const CATEGORIES = [
  { id: 'audio',      label: 'Audio',         emoji: '🎧' },
  { id: 'keyboards',  label: 'Keyboards',     emoji: '⌨️' },
  { id: 'displays',   label: 'Displays',      emoji: '🖥️' },
  { id: 'storage',    label: 'Storage',       emoji: '💾' },
  { id: 'cables',     label: 'Cables & Hubs', emoji: '🔌' },
  { id: 'ergonomics', label: 'Ergonomics',    emoji: '💺' },
  { id: 'networking', label: 'Networking',    emoji: '📡' },
  { id: 'cameras',    label: 'Cameras',       emoji: '📷' },
];

const BRANDS     = ['Logitech','Sony','Bose','Razer','Corsair','Samsung','LG','Anker','Belkin','Dell','HP','Asus','Jabra','Rode','HyperX','SteelSeries','Keychron','Nuphy','Blue','Elgato'];
const ADJECTIVES = ['Pro','Ultra','Max','Slim','Elite','Studio','Air','Compact','Premium','Lite','Nano','Plus','HD','4K','Wireless','Mechanical','Gaming','Creator','Office','Travel'];
const PRICES     = [699,999,1299,1799,2499,2999,3499,4499,5999,7999,9999,12999];

function seededRand(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

function generateProducts() {
  return Array.from({ length: 240 }, (_, i) => {
    const r     = seededRand(i * 31 + 7);
    const cat   = CATEGORIES[i % CATEGORIES.length];
    const brand = BRANDS[Math.floor(r() * BRANDS.length)];
    const adj   = ADJECTIVES[Math.floor(r() * ADJECTIVES.length)];
    const price = PRICES[Math.floor(r() * PRICES.length)];
    const stock = Math.floor(r() * 200);
    const rating = parseFloat((3.2 + r() * 1.8).toFixed(1));
    const reviews = Math.floor(20 + r() * 980);
    return {
      sku: `SKU-${String(i + 1).padStart(4, '0')}`,
      name: `${brand} ${adj} ${cat.label.split(' ')[0]} ${(i % 99) + 1}`,
      category: cat.id,
      price,
      stock,
      rating,
      reviews,
      emoji: cat.emoji,
      is_new: i < 24,
    };
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { passkey } = req.body;
  if (passkey !== getAdminPasskey()) {
    return res.status(401).json({ error: 'Invalid passkey' });
  }

  const sql = getDb();

  try {
    // 1. Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id          SERIAL PRIMARY KEY,
        sku         VARCHAR(20) UNIQUE NOT NULL,
        name        VARCHAR(255) NOT NULL,
        description TEXT DEFAULT '',
        category    VARCHAR(50) NOT NULL,
        price       INTEGER NOT NULL,
        stock       INTEGER NOT NULL DEFAULT 0,
        rating      DECIMAL(3,1) DEFAULT 4.0,
        reviews     INTEGER DEFAULT 0,
        emoji       VARCHAR(10) DEFAULT '📦',
        is_new      BOOLEAN DEFAULT false,
        is_active   BOOLEAN DEFAULT true,
        created_at  TIMESTAMPTZ DEFAULT NOW(),
        updated_at  TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id                   SERIAL PRIMARY KEY,
        order_ref            VARCHAR(30) UNIQUE NOT NULL,
        customer_name        VARCHAR(255) NOT NULL,
        customer_email       VARCHAR(255) NOT NULL,
        customer_phone       VARCHAR(20) DEFAULT '',
        razorpay_order_id    VARCHAR(100),
        razorpay_payment_id  VARCHAR(100),
        amount               INTEGER NOT NULL,
        status               VARCHAR(20) DEFAULT 'pending',
        created_at           TIMESTAMPTZ DEFAULT NOW(),
        updated_at           TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS order_items (
        id           SERIAL PRIMARY KEY,
        order_ref    VARCHAR(30) REFERENCES orders(order_ref) ON DELETE CASCADE,
        product_id   INTEGER REFERENCES products(id),
        product_name VARCHAR(255) NOT NULL,
        product_sku  VARCHAR(20) NOT NULL,
        quantity     INTEGER NOT NULL,
        unit_price   INTEGER NOT NULL,
        created_at   TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS site_pages (
        id              SERIAL PRIMARY KEY,
        title           VARCHAR(255) NOT NULL,
        slug            VARCHAR(255) UNIQUE NOT NULL,
        seo_title       VARCHAR(255) DEFAULT '',
        seo_description TEXT DEFAULT '',
        content         TEXT DEFAULT '',
        is_active       BOOLEAN DEFAULT true,
        is_core         BOOLEAN DEFAULT false,
        sort_order      INTEGER DEFAULT 100,
        created_at      TIMESTAMPTZ DEFAULT NOW(),
        updated_at      TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // 2. Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_products_category  ON products(category)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_products_price     ON products(price)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_products_active    ON products(is_active)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_orders_status      ON orders(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_orders_created     ON orders(created_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_order_items_ref    ON order_items(order_ref)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_site_pages_slug    ON site_pages(slug)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_site_pages_active  ON site_pages(is_active)`;

    // 3a. Seed core site pages
    const corePages = [
      { title: 'Home',                 slug: 'home',                 seo_title: 'Home',                 sort_order: 1,  is_core: true },
      { title: 'About Us',             slug: 'about-us',             seo_title: 'About Us',             sort_order: 2,  is_core: true },
      { title: 'Contact Us',           slug: 'contact-us',           seo_title: 'Contact Us',           sort_order: 3,  is_core: true },
      { title: 'Terms And Condition',  slug: 'terms-and-condition',  seo_title: 'Terms And Condition',  sort_order: 4,  is_core: true },
      { title: "FAQ's",                slug: 'faqs',                 seo_title: "FAQ's",                sort_order: 5,  is_core: true },
      { title: 'Why Choose Us',        slug: 'why-choose-us',        seo_title: 'Why Choose Us',        sort_order: 6,  is_core: false },
      { title: 'Blog',                 slug: 'blog',                 seo_title: 'Blog',                 sort_order: 7,  is_core: false },
      { title: 'Product',              slug: 'product',              seo_title: 'Product',              sort_order: 8,  is_core: false },
      { title: 'AyuAahar',             slug: 'ayuaahar',             seo_title: 'AyuAahar',             sort_order: 9,  is_core: false },
      { title: 'Offer Zone',           slug: 'offer-zone',           seo_title: 'Offer Zone',           sort_order: 10, is_core: false },
      { title: 'Cosmetics',            slug: 'cosmetics',            seo_title: 'Cosmetics',            sort_order: 11, is_core: false },
    ];
    let pagesInserted = 0;
    for (const pg of corePages) {
      const r = await sql`
        INSERT INTO site_pages (title, slug, seo_title, seo_description, content, is_active, is_core, sort_order)
        VALUES (${pg.title}, ${pg.slug}, ${pg.seo_title}, ${''}, ${''}, ${true}, ${pg.is_core}, ${pg.sort_order})
        ON CONFLICT (slug) DO NOTHING
        RETURNING id
      `;
      if (r.length > 0) pagesInserted++;
    }

    // 3b. Seed products (INSERT ... ON CONFLICT DO NOTHING = safe to re-run)
    const products = generateProducts();
    let inserted = 0;
    for (const p of products) {
      const result = await sql`
        INSERT INTO products (sku, name, category, price, stock, rating, reviews, emoji, is_new)
        VALUES (${p.sku}, ${p.name}, ${p.category}, ${p.price}, ${p.stock}, ${p.rating}, ${p.reviews}, ${p.emoji}, ${p.is_new})
        ON CONFLICT (sku) DO NOTHING
        RETURNING id
      `;
      if (result.length > 0) inserted++;
    }

    return res.status(200).json({
      success: true,
      message: 'Database setup complete',
      tables: ['products', 'orders', 'order_items', 'site_pages'],
      productsInserted: inserted,
      pagesInserted,
      totalProducts: products.length,
    });
  } catch (err) {
    console.error('Setup error:', err);
    return res.status(500).json({ error: err.message });
  }
}
