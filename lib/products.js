// lib/products.js
// 240 products across 8 categories — deterministic via seeded random.
// Production: replace with prisma.product.findMany() or pg query.
// PostgreSQL indexes needed: (category), (price), GIN on tsvector(name), (stock), (created_at)

export const CATEGORIES = [
  { id: 'audio',      label: 'Audio',         emoji: '🎧' },
  { id: 'keyboards',  label: 'Keyboards',     emoji: '⌨️' },
  { id: 'displays',   label: 'Displays',      emoji: '🖥️' },
  { id: 'storage',    label: 'Storage',       emoji: '💾' },
  { id: 'cables',     label: 'Cables & Hubs', emoji: '🔌' },
  { id: 'ergonomics', label: 'Ergonomics',    emoji: '💺' },
  { id: 'networking', label: 'Networking',    emoji: '📡' },
  { id: 'cameras',    label: 'Cameras',       emoji: '📷' },
];

const BRANDS     = ['Logitech','Sony','Bose','Razer','Corsair','Samsung','LG','Anker','Belkin','Dell','HP','Asus','Jabra','Rode','HyperX','SteelSeries','Keychron','Nuphy','Rode','Blue'];
const ADJECTIVES = ['Pro','Ultra','Max','Slim','Elite','Studio','Air','Compact','Premium','Lite','Nano','Plus','HD','4K','Wireless','Mechanical','Gaming','Creator','Office','Travel'];
const BASE_PRICES = [699,999,1299,1799,2499,2999,3499,4499,5999,7999,9999,12999];

function seededRand(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

export const ALL_PRODUCTS = Array.from({ length: 240 }, (_, i) => {
  const r     = seededRand(i * 31 + 7);
  const cat   = CATEGORIES[i % CATEGORIES.length];
  const brand = BRANDS[Math.floor(r() * BRANDS.length)];
  const adj   = ADJECTIVES[Math.floor(r() * ADJECTIVES.length)];
  const price = BASE_PRICES[Math.floor(r() * BASE_PRICES.length)];
  const stock = Math.floor(r() * 200);
  const rating = parseFloat((3.2 + r() * 1.8).toFixed(1));
  const reviews = Math.floor(20 + r() * 980);
  return {
    id: i + 1,
    sku: `SKU-${String(i + 1).padStart(4, '0')}`,
    name: `${brand} ${adj} ${cat.label.split(' ')[0]} ${(i % 99) + 1}`,
    category: cat.id,
    categoryLabel: cat.label,
    emoji: cat.emoji,
    price,
    stock,
    rating,
    reviews,
    isNew: i < 24,
  };
});
