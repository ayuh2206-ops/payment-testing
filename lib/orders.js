// lib/orders.js
// 120 mock orders — deterministic via seeded random.
// Production: replace with prisma.order.findMany() / keyset-paginated pg query.
// PostgreSQL indexes needed: (status), (created_at DESC), (customer_email), (id DESC for keyset)

const NAMES = [
  'Rohan Sharma','Priya Patel','Amit Singh','Neha Gupta','Karan Kumar',
  'Sonal Joshi','Raj Mehta','Anita Nair','Dev Rao','Meera Iyer',
  'Vivek Shah','Pooja Agarwal','Suresh Reddy','Kavya Pillai','Arjun Verma',
];
const STATUSES = ['pending','processing','shipped','delivered','delivered','delivered','cancelled'];

function seededRand(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

export const ALL_ORDERS = Array.from({ length: 120 }, (_, i) => {
  const r       = seededRand(i * 17 + 3);
  const name    = NAMES[i % NAMES.length];
  const amount  = Math.floor(799 + r() * 24000);
  const items   = Math.floor(1 + r() * 5);
  const date    = new Date(2026, 1, 28 - Math.floor(r() * 60));
  const status  = STATUSES[Math.floor(r() * STATUSES.length)];

  return {
    id: `ORD-${String(14000 + i).padStart(5, '0')}`,
    customer: name,
    email: `${name.split(' ')[0].toLowerCase()}${i}@example.com`,
    amount,
    items,
    status,
    date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }),
    dateTs: date.getTime(),
  };
});

export const ORDER_STATUSES = ['pending','processing','shipped','delivered','cancelled'];
