// pages/orders.jsx
// Order management — 120 orders with:
//   - Status filter tabs (all / pending / processing / shipped / delivered / cancelled)
//   - Search by order ID, customer name, email
//   - Sort by date and amount
//   - Bulk select + actions (mark shipped, mark delivered, cancel, export CSV)
//   - 20-per-page pagination
//   - Revenue / pending / avg order metric cards
// Production: GET /api/orders?status=&search=&sort=&page=
// PostgreSQL: indexes on (status), (created_at DESC), keyset on (id) for cursor pagination.

import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ALL_ORDERS, ORDER_STATUSES } from "@/lib/orders";

const PER_PAGE = 20;

const STATUS_STYLES = {
  pending:    { bg: "rgba(240,165,0,0.12)",   color: "#d29922" },
  processing: { bg: "rgba(56,139,253,0.12)",  color: "#388bfd" },
  shipped:    { bg: "rgba(138,104,253,0.12)", color: "#a371f7" },
  delivered:  { bg: "rgba(46,160,67,0.12)",   color: "#3fb950" },
  cancelled:  { bg: "rgba(255,77,77,0.12)",   color: "#f85149" },
};

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch]             = useState("");
  const [sort, setSort]                 = useState("date-desc");
  const [page, setPage]                 = useState(1);
  const [selected, setSelected]         = useState(new Set());

  const filtered = useMemo(() => {
    let res = ALL_ORDERS;
    if (statusFilter !== "all") res = res.filter(o => o.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
      );
    }
    if (sort === "date-desc")    res = [...res].sort((a, b) => b.dateTs - a.dateTs);
    if (sort === "date-asc")     res = [...res].sort((a, b) => a.dateTs - b.dateTs);
    if (sort === "amount-desc")  res = [...res].sort((a, b) => b.amount - a.amount);
    if (sort === "amount-asc")   res = [...res].sort((a, b) => a.amount - b.amount);
    return res;
  }, [statusFilter, search, sort]);

  useEffect(() => { setPage(1); setSelected(new Set()); }, [statusFilter, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const metrics = useMemo(() => {
    const delivered = ALL_ORDERS.filter(o => o.status === "delivered");
    const totalRev  = delivered.reduce((s, o) => s + o.amount, 0);
    const avgOrder  = delivered.length ? Math.round(totalRev / delivered.length) : 0;
    const pending   = ALL_ORDERS.filter(o => o.status === "pending" || o.status === "processing").length;
    return { totalRev, avgOrder, pending, total: ALL_ORDERS.length };
  }, []);

  function toggleSelect(id) {
    setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }
  function toggleAll() {
    if (selected.size === pageItems.length) setSelected(new Set());
    else setSelected(new Set(pageItems.map(o => o.id)));
  }

  function exportCSV() {
    const rows = [
      ["Order ID", "Customer", "Email", "Items", "Amount (INR)", "Status", "Date"],
      ...filtered
        .filter(o => selected.size === 0 || selected.has(o.id))
        .map(o => [o.id, o.customer, o.email, o.items, o.amount, o.status, o.date]),
    ];
    const csv  = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "orders-export.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  const statusCounts = useMemo(() => {
    const c = { all: ALL_ORDERS.length };
    ORDER_STATUSES.forEach(s => { c[s] = ALL_ORDERS.filter(o => o.status === s).length; });
    return c;
  }, []);

  return (
    <>
      <Head>
        <title>Order Management | YourStore</title>
      </Head>

      <div className="page-wrap">
        <Navbar />

        <main className="orders-page">
          <div className="page-header">
            <div>
              <h1>Order Management</h1>
              <p className="page-sub">120 orders · filters, bulk actions, CSV export</p>
            </div>
          </div>

          {/* ── Metric cards ── */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="mc-label">Total orders</div>
              <div className="mc-value">{metrics.total}</div>
            </div>
            <div className="metric-card">
              <div className="mc-label">Revenue (delivered)</div>
              <div className="mc-value">₹{Math.round(metrics.totalRev / 100000)}L</div>
            </div>
            <div className="metric-card">
              <div className="mc-label">Avg order value</div>
              <div className="mc-value">₹{metrics.avgOrder.toLocaleString("en-IN")}</div>
            </div>
            <div className="metric-card">
              <div className="mc-label">Pending / processing</div>
              <div className="mc-value" style={{ color: "#d29922" }}>{metrics.pending}</div>
            </div>
          </div>

          {/* ── Status tabs ── */}
          <div className="status-tabs">
            {["all", ...ORDER_STATUSES].map(s => (
              <button
                key={s}
                className={`stab${statusFilter === s ? " active" : ""}`}
                onClick={() => setStatusFilter(s)}
              >
                {s === "all" ? "All orders" : s.charAt(0).toUpperCase() + s.slice(1)}
                <span className="stab-count">{statusCounts[s] || 0}</span>
              </button>
            ))}
          </div>

          {/* ── Search + Sort ── */}
          <div className="controls-row">
            <div className="search-wrap">
              <svg className="search-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="7" cy="7" r="5"/><path d="m11 11 3 3"/>
              </svg>
              <input
                className="search-input"
                placeholder="Search order ID, customer name, or email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && <button className="search-clear" onClick={() => setSearch("")}>✕</button>}
            </div>

            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="date-desc">Newest first</option>
              <option value="date-asc">Oldest first</option>
              <option value="amount-desc">Amount: High → Low</option>
              <option value="amount-asc">Amount: Low → High</option>
            </select>
          </div>

          {/* ── Perf + result count ── */}
          <div className="perf-bar">
            <span className="chip"><b>{filtered.length}</b> orders shown</span>
            <span className="chip">page <b>{page}</b> / <b>{totalPages}</b></span>
            {selected.size > 0 && <span className="chip" style={{ color: "var(--accent)" }}><b>{selected.size}</b> selected</span>}
          </div>

          {/* ── Bulk action bar ── */}
          {selected.size > 0 && (
            <div className="bulk-bar">
              <span>{selected.size} order{selected.size > 1 ? "s" : ""} selected</span>
              <button className="bulk-btn">Mark shipped</button>
              <button className="bulk-btn">Mark delivered</button>
              <button className="bulk-btn danger">Cancel orders</button>
              <button className="bulk-btn" onClick={exportCSV}>Export CSV ↓</button>
              <button className="bulk-btn" onClick={() => setSelected(new Set())}>Deselect all</button>
            </div>
          )}

          {/* ── Table header ── */}
          <div className="table-head">
            <input
              type="checkbox"
              className="row-check"
              checked={selected.size === pageItems.length && pageItems.length > 0}
              onChange={toggleAll}
            />
            <span className="th">Order</span>
            <span className="th">Customer</span>
            <span className="th th-center">Items</span>
            <span className="th th-center">Status</span>
            <span className="th th-right">Amount</span>
            <span className="th th-right">Date</span>
          </div>

          {/* ── Order rows ── */}
          {filtered.length === 0 ? (
            <div className="no-results">No orders match your filters.</div>
          ) : (
            <div className="order-list">
              {pageItems.map(o => (
                <OrderRow
                  key={o.id}
                  order={o}
                  checked={selected.has(o.id)}
                  onToggle={() => toggleSelect(o.id)}
                />
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="pagination">
              <button className="pg-btn" onClick={() => setPage(1)} disabled={page === 1}>«</button>
              <button className="pg-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
                .reduce((acc, n, i, arr) => {
                  if (i > 0 && n - arr[i - 1] > 1) acc.push("...");
                  acc.push(n);
                  return acc;
                }, [])
                .map((n, i) =>
                  n === "..." ? (
                    <span key={`e${i}`} className="pg-dot">…</span>
                  ) : (
                    <button key={n} className={`pg-btn${page === n ? " active" : ""}`} onClick={() => setPage(n)}>{n}</button>
                  )
                )}
              <button className="pg-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>›</button>
              <button className="pg-btn" onClick={() => setPage(totalPages)} disabled={page === totalPages}>»</button>
            </div>
          )}

          {!selected.size && (
            <div className="export-row">
              <button className="bulk-btn" onClick={exportCSV}>Export all {filtered.length} orders as CSV ↓</button>
            </div>
          )}

        </main>

        <Footer />
      </div>

      <style jsx>{`
        .page-wrap { display: flex; flex-direction: column; min-height: 100vh; }
        .orders-page { flex: 1; padding: 40px 24px 80px; position: relative; z-index: 1; max-width: 1240px; margin: 0 auto; width: 100%; }

        .page-header { margin-bottom: 28px; }
        .page-header h1 { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; letter-spacing: -1px; margin-bottom: 4px; }
        .page-sub { font-size: 13px; color: var(--muted); }

        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px; }
        @media(max-width:700px){ .metrics-grid { grid-template-columns: 1fr 1fr; } }
        .metric-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; }
        .mc-label { font-size: 12px; color: var(--muted); margin-bottom: 8px; }
        .mc-value { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; }

        .status-tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .stab { padding: 7px 14px; border-radius: 20px; border: 1px solid var(--border); font-size: 13px; background: var(--surface); color: var(--muted); display: flex; align-items: center; gap: 7px; transition: all .15s; }
        .stab:hover { border-color: var(--accent); color: var(--text); }
        .stab.active { background: var(--accent); color: #000; border-color: transparent; font-weight: 600; }
        .stab.active .stab-count { background: rgba(0,0,0,0.2); }
        .stab-count { font-size: 11px; background: var(--bg); border-radius: 20px; padding: 1px 7px; font-weight: 700; }

        .controls-row { display: grid; grid-template-columns: 1fr auto; gap: 10px; margin-bottom: 12px; align-items: center; }
        .search-wrap { position: relative; }
        .search-input { width: 100%; padding: 10px 36px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-size: 14px; outline: none; transition: border-color .2s; }
        .search-input:focus { border-color: var(--accent); }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 14px; height: 14px; color: var(--muted); pointer-events: none; }
        .search-clear { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--muted); font-size: 13px; padding: 4px; cursor: pointer; }
        select { padding: 10px 30px 10px 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-size: 13px; outline: none; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%237d8590'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; cursor: pointer; }

        .perf-bar { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; align-items: center; }
        .chip { font-size: 12px; padding: 4px 12px; border-radius: 20px; background: var(--surface); border: 1px solid var(--border); color: var(--muted); }
        .chip b { color: var(--accent); }

        .bulk-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 10px 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 12px; font-size: 13px; color: var(--muted); }
        .bulk-bar span { flex: 0 0 auto; }
        .bulk-btn { padding: 6px 14px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg); color: var(--text); font-size: 12px; font-weight: 600; cursor: pointer; transition: all .15s; }
        .bulk-btn:hover { border-color: var(--accent); }
        .bulk-btn.danger { color: #f85149; border-color: rgba(248,81,73,0.3); }
        .bulk-btn.danger:hover { background: rgba(248,81,73,0.1); }

        .table-head { display: grid; grid-template-columns: 20px 1fr 1fr 70px 100px 100px 80px; gap: 12px; padding: 10px 14px; border-bottom: 1px solid var(--border); margin-bottom: 2px; }
        .th { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted); }
        .th-center { text-align: center; }
        .th-right { text-align: right; }
        .row-check { width: 16px; height: 16px; accent-color: var(--accent); cursor: pointer; }

        .order-list { margin-bottom: 20px; }
        .no-results { text-align: center; padding: 60px 0; color: var(--muted); font-size: 14px; }

        .pagination { display: flex; align-items: center; gap: 6px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap; }
        .pg-btn { padding: 7px 13px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--text); font-size: 13px; cursor: pointer; transition: all .15s; }
        .pg-btn:hover:not(:disabled) { border-color: var(--accent); }
        .pg-btn.active { background: var(--accent); color: #000; border-color: transparent; font-weight: 700; }
        .pg-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .pg-dot { font-size: 13px; color: var(--muted); padding: 0 4px; }

        .export-row { display: flex; justify-content: flex-end; }
      `}</style>
    </>
  );
}

// ── Single order row ──────────────────────────────────────────────────────────
function OrderRow({ order: o, checked, onToggle }) {
  const style = STATUS_STYLES[o.status] || {};

  return (
    <div className={`order-row${checked ? " selected" : ""}`}>
      <input type="checkbox" className="row-check" checked={checked} onChange={onToggle} />
      <div className="ord-id">{o.id}</div>
      <div>
        <div className="ord-customer">{o.customer}</div>
        <div className="ord-email">{o.email}</div>
      </div>
      <div className="ord-center">{o.items} item{o.items > 1 ? "s" : ""}</div>
      <div className="ord-center">
        <span className="status-badge" style={{ background: style.bg, color: style.color }}>
          {o.status}
        </span>
      </div>
      <div className="ord-right ord-amount">₹{o.amount.toLocaleString("en-IN")}</div>
      <div className="ord-right ord-date">{o.date}</div>

      <style jsx>{`
        .order-row { display: grid; grid-template-columns: 20px 1fr 1fr 70px 100px 100px 80px; gap: 12px; padding: 14px; border-bottom: 1px solid var(--border); align-items: center; transition: background .1s; border-radius: 8px; }
        .order-row:hover { background: var(--surface); }
        .order-row.selected { background: rgba(0,229,176,0.05); border-color: rgba(0,229,176,0.2); }
        .row-check { width: 16px; height: 16px; accent-color: var(--accent); cursor: pointer; }
        .ord-id { font-size: 11px; color: var(--muted); font-family: monospace; font-weight: 600; }
        .ord-customer { font-size: 13px; font-weight: 600; }
        .ord-email { font-size: 11px; color: var(--muted); }
        .ord-center { text-align: center; font-size: 13px; color: var(--muted); }
        .status-badge { font-size: 11px; padding: 3px 10px; border-radius: 20px; font-weight: 600; white-space: nowrap; }
        .ord-right { text-align: right; }
        .ord-amount { font-size: 14px; font-weight: 600; font-family: 'Syne', sans-serif; }
        .ord-date { font-size: 11px; color: var(--muted); }
      `}</style>
    </div>
  );
}
