// pages/admin/dashboard.jsx
// Full admin dashboard: Analytics, Orders, Products — all server-side guarded.

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const STATUS_STYLES = {
  pending:    { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
  processing: { bg: 'rgba(59,130,246,0.12)', color: '#60a5fa' },
  shipped:    { bg: 'rgba(139,92,246,0.12)', color: '#a78bfa' },
  delivered:  { bg: 'rgba(34,197,94,0.12)',  color: '#4ade80' },
  cancelled:  { bg: 'rgba(239,68,68,0.12)',  color: '#f87171' },
};

const ALL_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminDashboard() {
  const router         = useRouter();
  const [tab, setTab]  = useState('analytics');
  const [authed, setAuthed] = useState(null);

  // Verify auth on mount
  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(r => {
        if (r.status === 401) router.replace('/admin');
        else setAuthed(true);
      })
      .catch(() => router.replace('/admin'));
  }, []);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  if (authed === null) return <LoadingScreen />;

  return (
    <>
      <Head><title>Admin Dashboard — YourStore</title></Head>
      <div className="shell">

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sb-logo">
            <span className="ldot" />
            YourStore
          </div>

          <nav className="sb-nav">
            {[
              { id: 'analytics', label: 'Analytics',  icon: '📊' },
              { id: 'orders',    label: 'Orders',     icon: '📦' },
              { id: 'products',  label: 'Products',   icon: '🛍️' },
              { id: 'setup',     label: 'DB Setup',   icon: '🔧' },
            ].map(item => (
              <button
                key={item.id}
                className={`sb-item${tab === item.id ? ' active' : ''}`}
                onClick={() => setTab(item.id)}
              >
                <span className="sb-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="sb-bottom">
            <a href="/" className="sb-item" target="_blank">
              <span className="sb-icon">🏪</span> View Store
            </a>
            <button className="sb-item logout" onClick={logout}>
              <span className="sb-icon">⬡</span> Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="content">
          {tab === 'analytics' && <AnalyticsPanel />}
          {tab === 'orders'    && <OrdersPanel />}
          {tab === 'products'  && <ProductsPanel />}
          {tab === 'setup'     && <SetupPanel />}
        </main>
      </div>

      <style jsx>{`
        .shell {
          display: flex;
          min-height: 100vh;
          background: var(--bg);
        }
        .sidebar {
          width: 220px;
          flex-shrink: 0;
          background: var(--surface);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 20px 12px;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }
        .sb-logo {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800;
          color: var(--text); padding: 4px 12px; margin-bottom: 24px;
        }
        .ldot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; flex-shrink: 0; }
        .sb-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
        :global(.sb-item) {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 10px;
          font-size: 13.5px; font-weight: 500; color: var(--text2);
          border: none; background: none; width: 100%; text-align: left;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: background 0.15s, color 0.15s;
          text-decoration: none;
        }
        :global(.sb-item:hover) { background: var(--surface2); color: var(--text); }
        :global(.sb-item.active) { background: rgba(124,106,247,0.15); color: var(--accent2); }
        :global(.sb-icon) { font-size: 15px; width: 20px; text-align: center; }
        .sb-bottom { padding-top: 16px; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 2px; }
        :global(.logout) { color: var(--red) !important; }
        :global(.logout:hover) { background: rgba(239,68,68,0.1) !important; }
        .content {
          flex: 1;
          padding: 32px;
          overflow-y: auto;
          min-width: 0;
        }
        @media (max-width: 768px) {
          .sidebar { width: 60px; }
          :global(.sb-item span:not(.sb-icon)) { display: none; }
          .sb-logo span:not(.ldot) { display: none; }
        }
      `}</style>
    </>
  );
}

// ── Analytics Panel ───────────────────────────────────────────────────────────
function AnalyticsPanel() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (!data)   return <Err msg="Failed to load analytics" />;

  const maxRev = Math.max(...(data.dailyRevenue || []).map(d => parseInt(d.revenue)), 1);

  return (
    <div>
      <PageHeader title="Analytics" sub="Live data from PostgreSQL" />

      {/* KPI cards */}
      <div className="kpis">
        <KPICard label="Total Revenue" value={`₹${Math.round(data.totalRevenue / 100000 * 10) / 10}L`} sub="from delivered orders" color="var(--teal)" />
        <KPICard label="Total Orders"  value={data.totalOrders}  sub="all time" color="var(--accent2)" />
        <KPICard label="Pending / Processing" value={data.pendingOrders} sub="need attention" color="var(--amber)" />
        <KPICard label="Products" value={data.products?.total} sub={`${data.products?.out_of_stock} out of stock`} color="var(--blue)" />
      </div>

      <div className="two-col">
        {/* Revenue chart */}
        <div className="panel">
          <h3 className="panel-title">Daily Revenue — Last 30 days</h3>
          {data.dailyRevenue?.length === 0 ? (
            <div className="chart-empty">No orders in the last 30 days</div>
          ) : (
            <div className="bar-chart">
              {(data.dailyRevenue || []).map((d, i) => (
                <div key={i} className="bar-col" title={`${d.day}: ₹${parseInt(d.revenue).toLocaleString('en-IN')} (${d.orders} orders)`}>
                  <div className="bar-fill" style={{ height: `${Math.round((parseInt(d.revenue) / maxRev) * 100)}%` }} />
                  {i % 5 === 0 && <span className="bar-label">{d.day}</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order status breakdown */}
        <div className="panel">
          <h3 className="panel-title">Orders by Status</h3>
          <div className="status-list">
            {(data.ordersByStatus || []).map(s => {
              const style = STATUS_STYLES[s.status] || {};
              const pct   = Math.round((parseInt(s.count) / data.totalOrders) * 100);
              return (
                <div key={s.status} className="status-row">
                  <span className="badge" style={{ background: style.bg, color: style.color }}>{s.status}</span>
                  <div className="status-bar-wrap">
                    <div className="status-bar-fill" style={{ width: pct + '%', background: style.color }} />
                  </div>
                  <span className="status-count"><b>{s.count}</b> <span>{pct}%</span></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top products */}
      <div className="panel" style={{ marginTop: 20 }}>
        <h3 className="panel-title">Top Products by Units Sold</h3>
        <table className="data-table">
          <thead>
            <tr><th>Product</th><th>Category</th><th>Price</th><th>Units Sold</th><th>Orders</th></tr>
          </thead>
          <tbody>
            {(data.topProducts || []).map((p, i) => (
              <tr key={i}>
                <td><span style={{ marginRight: 8 }}>{p.emoji}</span>{p.name}</td>
                <td><span className="cat-tag">{p.category}</span></td>
                <td>₹{p.price?.toLocaleString('en-IN')}</td>
                <td><b>{p.units_sold || 0}</b></td>
                <td>{p.order_count || 0}</td>
              </tr>
            ))}
            {!data.topProducts?.length && (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text2)', padding: 24 }}>No sales data yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        @media(max-width:900px){.kpis{grid-template-columns:repeat(2,1fr)}}
        .two-col { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        @media(max-width:900px){.two-col{grid-template-columns:1fr}}
        .bar-chart { display:flex; align-items:flex-end; gap:3px; height:180px; padding-bottom:20px; position:relative; }
        .bar-col { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; position:relative; height:100%; cursor:default; }
        .bar-fill { width:100%; background:var(--accent); border-radius:3px 3px 0 0; min-height:2px; transition:opacity .15s; }
        .bar-col:hover .bar-fill { opacity:.7; }
        .bar-label { position:absolute; bottom:-18px; font-size:9px; color:var(--text3); white-space:nowrap; }
        .chart-empty { height:180px; display:flex; align-items:center; justify-content:center; color:var(--text2); font-size:13px; }
        .status-list { display:flex; flex-direction:column; gap:12px; }
        .status-row { display:grid; grid-template-columns:100px 1fr 80px; align-items:center; gap:10px; }
        .status-bar-wrap { background:var(--surface2); border-radius:4px; height:6px; overflow:hidden; }
        .status-bar-fill { height:100%; border-radius:4px; transition:width .4s; }
        .status-count { font-size:12px; color:var(--text2); text-align:right; }
        .status-count b { color:var(--text); }
      `}</style>
    </div>
  );
}

// ── Orders Panel ──────────────────────────────────────────────────────────────
function OrdersPanel() {
  const [orders, setOrders]       = useState([]);
  const [total, setTotal]         = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]     = useState(true);
  const [statusFilter, setStatus] = useState('');
  const [search, setSearch]       = useState('');
  const [sort, setSort]           = useState('date-desc');
  const [page, setPage]           = useState(1);
  const [selected, setSelected]   = useState(new Set());
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const qs   = new URLSearchParams({ status: statusFilter, search, sort, page, limit: 20 });
      const data = await fetch(`/api/admin/orders?${qs}`).then(r => r.json());
      setOrders(data.orders || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch { setOrders([]); }
    finally  { setLoading(false); }
  }, [statusFilter, search, sort, page]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);
  useEffect(() => { setPage(1); setSelected(new Set()); }, [statusFilter, search, sort]);

  async function updateStatus(orderRef, newStatus) {
    setUpdatingId(orderRef);
    try {
      await fetch(`/api/admin/orders/${orderRef}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders();
    } finally { setUpdatingId(null); }
  }

  async function bulkUpdate(newStatus) {
    for (const id of selected) await updateStatus(id, newStatus);
    setSelected(new Set());
  }

  function exportCSV() {
    const rows = [['Order Ref','Customer','Email','Amount','Status','Date'],
      ...orders.map(o => [o.order_ref, o.customer_name, o.customer_email, o.amount, o.status, new Date(o.created_at).toLocaleDateString('en-IN')])];
    const blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href: url, download: 'orders.csv' });
    a.click(); URL.revokeObjectURL(url);
  }

  function toggleSel(id) { setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; }); }
  function toggleAll() { selected.size === orders.length ? setSelected(new Set()) : setSelected(new Set(orders.map(o => o.order_ref))); }

  return (
    <div>
      <PageHeader title="Orders" sub={`${total} total orders`} action={
        <button className="action-btn" onClick={exportCSV}>Export CSV ↓</button>
      } />

      {/* Filters */}
      <div className="order-filters">
        <div className="filter-tabs">
          <button className={`ftab${!statusFilter?' on':''}`} onClick={() => setStatus('')}>All</button>
          {ALL_STATUSES.map(s => (
            <button key={s} className={`ftab${statusFilter===s?' on':''}`} onClick={() => setStatus(s)} style={statusFilter===s ? { color: STATUS_STYLES[s]?.color } : {}}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <div className="filter-right">
          <div className="search-wrap">
            <svg className="si" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
              <circle cx="7" cy="7" r="5"/><path d="m11 11 3 3"/>
            </svg>
            <input placeholder="Search order, customer…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="amount-desc">Amount ↓</option>
            <option value="amount-asc">Amount ↑</option>
          </select>
        </div>
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div className="bulk-bar">
          <span>{selected.size} selected</span>
          <button className="bulk-btn" onClick={() => bulkUpdate('shipped')}>Mark Shipped</button>
          <button className="bulk-btn" onClick={() => bulkUpdate('delivered')}>Mark Delivered</button>
          <button className="bulk-btn danger" onClick={() => bulkUpdate('cancelled')}>Cancel</button>
          <button className="bulk-btn" onClick={() => setSelected(new Set())}>Deselect</button>
        </div>
      )}

      {/* Table */}
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <input type="checkbox" style={{ accentColor: 'var(--accent)', cursor: 'pointer' }}
                    checked={selected.size === orders.length && orders.length > 0}
                    onChange={toggleAll}
                  />
                </th>
                <th>Order</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7}><Spinner /></td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text2)', padding: 40 }}>No orders found</td></tr>
              ) : orders.map(o => {
                const st = STATUS_STYLES[o.status] || {};
                return (
                  <tr key={o.order_ref} className={selected.has(o.order_ref) ? 'sel' : ''}>
                    <td>
                      <input type="checkbox" style={{ accentColor: 'var(--accent)', cursor: 'pointer' }}
                        checked={selected.has(o.order_ref)}
                        onChange={() => toggleSel(o.order_ref)}
                      />
                    </td>
                    <td><span className="mono">{o.order_ref}</span></td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{o.customer_name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>{o.customer_email}</div>
                    </td>
                    <td><b>₹{parseInt(o.amount).toLocaleString('en-IN')}</b></td>
                    <td><span className="badge" style={{ background: st.bg, color: st.color }}>{o.status}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--text2)' }}>{new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}</td>
                    <td>
                      <select
                        className="status-sel"
                        value={o.status}
                        onChange={e => updateStatus(o.order_ref, e.target.value)}
                        disabled={updatingId === o.order_ref}
                      >
                        {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pager">
          <button className="pgb" onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹ Prev</button>
          <span style={{ fontSize: 13, color: 'var(--text2)' }}>Page {page} of {totalPages}</span>
          <button className="pgb" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Next ›</button>
        </div>
      )}

      <style jsx>{`
        .order-filters { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px; }
        .filter-tabs { display:flex; gap:4px; flex-wrap:wrap; }
        .ftab { padding:6px 14px; border-radius:20px; border:1px solid var(--border); font-size:12px; font-weight:500; background:var(--surface2); color:var(--text2); transition:all .15s; }
        .ftab:hover { border-color:var(--border2); color:var(--text); }
        .ftab.on { background:var(--surface); color:var(--text); border-color:var(--border2); font-weight:600; }
        .filter-right { display:flex; gap:8px; align-items:center; }
        .search-wrap { position:relative; }
        .search-wrap input { height:36px; padding:0 12px 0 30px; background:var(--surface2); border:1px solid var(--border); border-radius:8px; color:var(--text); font-size:13px; outline:none; width:220px; font-family:'Inter',sans-serif; }
        .search-wrap input:focus { border-color:var(--accent); }
        .si { position:absolute; left:10px; top:50%; transform:translateY(-50%); color:var(--text3); pointer-events:none; }
        select { height:36px; padding:0 28px 0 10px; background:var(--surface2); border:1px solid var(--border); border-radius:8px; color:var(--text); font-size:13px; outline:none; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%235a5a78'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 8px center; cursor:pointer; }
        select:focus { border-color:var(--accent); }
        .status-sel { height:30px; font-size:12px; min-width:110px; }
        .table-wrap { overflow-x:auto; }
        .bulk-bar { display:flex; flex-wrap:wrap; align-items:center; gap:8px; padding:10px 14px; background:var(--surface2); border-radius:10px; margin-bottom:12px; font-size:13px; color:var(--text2); }
        .bulk-btn { padding:5px 12px; border:1px solid var(--border); border-radius:6px; background:var(--surface); color:var(--text); font-size:12px; font-weight:500; cursor:pointer; }
        .bulk-btn:hover { border-color:var(--accent); }
        .bulk-btn.danger { color:var(--red); border-color:rgba(239,68,68,.3); }
        .pager { display:flex; align-items:center; justify-content:center; gap:16px; margin-top:16px; }
        .pgb { padding:7px 16px; border:1px solid var(--border); border-radius:8px; background:var(--surface); color:var(--text2); font-size:13px; cursor:pointer; }
        .pgb:disabled { opacity:.3; cursor:not-allowed; }
        .pgb:not(:disabled):hover { border-color:var(--accent); color:var(--text); }
        tr.sel { background:rgba(124,106,247,.06); }
      `}</style>
    </div>
  );
}

// ── Products Panel ────────────────────────────────────────────────────────────
function ProductsPanel() {
  const [products, setProducts]   = useState([]);
  const [total, setTotal]         = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('');
  const [page, setPage]           = useState(1);
  const [editing, setEditing]     = useState(null);
  const [showAdd, setShowAdd]     = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const qs   = new URLSearchParams({ search, category, page, limit: 20 });
      const data = await fetch(`/api/admin/products?${qs}`).then(r => r.json());
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch { setProducts([]); }
    finally  { setLoading(false); }
  }, [search, category, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { setPage(1); }, [search, category]);

  async function toggleActive(p) {
    await fetch(`/api/admin/products/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !p.is_active }),
    });
    fetchProducts();
  }

  async function saveEdit(id, updates) {
    await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    setEditing(null);
    fetchProducts();
  }

  async function addProduct(data) {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) { setShowAdd(false); fetchProducts(); }
    else { const err = await res.json(); alert(err.error); }
  }

  return (
    <div>
      <PageHeader title="Products" sub={`${total} products in database`} action={
        <button className="action-btn" onClick={() => setShowAdd(true)}>+ Add Product</button>
      } />

      {showAdd && <AddProductForm onSave={addProduct} onClose={() => setShowAdd(false)} />}
      {editing && <EditProductForm product={editing} onSave={saveEdit} onClose={() => setEditing(null)} />}

      <div className="prod-filters">
        <div className="search-wrap">
          <svg className="si" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
            <circle cx="7" cy="7" r="5"/><path d="m11 11 3 3"/>
          </svg>
          <input placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {['audio','keyboards','displays','storage','cables','ergonomics','networking','cameras'].map(c => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Product</th><th>SKU</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8}><Spinner /></td></tr>
              ) : products.map(p => (
                <tr key={p.id} style={{ opacity: p.is_active ? 1 : 0.45 }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 22 }}>{p.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 13 }}>{p.name}</div>
                        {p.is_new && <span className="new-pill">New</span>}
                      </div>
                    </div>
                  </td>
                  <td><span className="mono" style={{ fontSize: 11 }}>{p.sku}</span></td>
                  <td><span className="cat-tag">{p.category}</span></td>
                  <td><b>₹{parseInt(p.price).toLocaleString('en-IN')}</b></td>
                  <td>
                    <span style={{ color: p.stock === 0 ? 'var(--red)' : p.stock < 10 ? 'var(--amber)' : 'var(--green)', fontWeight: 600 }}>
                      {p.stock}
                    </span>
                  </td>
                  <td>{p.rating} ★</td>
                  <td>
                    <span className="badge" style={p.is_active
                      ? { background: 'rgba(34,197,94,0.12)', color: 'var(--green)' }
                      : { background: 'rgba(239,68,68,0.12)', color: 'var(--red)' }}>
                      {p.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="row-btn" onClick={() => setEditing(p)}>Edit</button>
                      <button className="row-btn" onClick={() => toggleActive(p)} style={{ color: p.is_active ? 'var(--red)' : 'var(--green)' }}>
                        {p.is_active ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pager">
          <button className="pgb" onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹ Prev</button>
          <span style={{ fontSize: 13, color: 'var(--text2)' }}>Page {page} of {totalPages}</span>
          <button className="pgb" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Next ›</button>
        </div>
      )}

      <style jsx>{`
        .prod-filters { display:flex; gap:10px; margin-bottom:16px; flex-wrap:wrap; }
        .search-wrap { position:relative; flex:1; min-width:200px; }
        .search-wrap input { height:36px; padding:0 12px 0 30px; background:var(--surface2); border:1px solid var(--border); border-radius:8px; color:var(--text); font-size:13px; outline:none; width:100%; font-family:'Inter',sans-serif; }
        .search-wrap input:focus { border-color:var(--accent); }
        .si { position:absolute; left:10px; top:50%; transform:translateY(-50%); color:var(--text3); pointer-events:none; }
        select { height:36px; padding:0 28px 0 10px; background:var(--surface2); border:1px solid var(--border); border-radius:8px; color:var(--text); font-size:13px; outline:none; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%235a5a78'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 8px center; cursor:pointer; }
        .table-wrap { overflow-x:auto; }
        .row-btn { padding:4px 10px; border:1px solid var(--border); border-radius:6px; background:none; color:var(--text2); font-size:11px; font-weight:500; cursor:pointer; transition:all .15s; }
        .row-btn:hover { border-color:var(--accent); color:var(--text); }
        .new-pill { font-size:9px; font-weight:700; text-transform:uppercase; background:var(--accent); color:#fff; padding:1px 6px; border-radius:99px; letter-spacing:.5px; }
        .pager { display:flex; align-items:center; justify-content:center; gap:16px; margin-top:16px; }
        .pgb { padding:7px 16px; border:1px solid var(--border); border-radius:8px; background:var(--surface); color:var(--text2); font-size:13px; cursor:pointer; }
        .pgb:disabled { opacity:.3; cursor:not-allowed; }
        .pgb:not(:disabled):hover { border-color:var(--accent); color:var(--text); }
      `}</style>
    </div>
  );
}

// ── Setup Panel ───────────────────────────────────────────────────────────────
function SetupPanel() {
  const [passkey, setPasskey]   = useState('');
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);

  async function runSetup() {
    setLoading(true); setResult(null);
    try {
      const res  = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey }),
      });
      const data = await res.json();
      setResult({ ok: res.ok, data });
    } catch (err) {
      setResult({ ok: false, data: { error: err.message } });
    } finally { setLoading(false); }
  }

  return (
    <div>
      <PageHeader title="Database Setup" sub="One-time setup: creates tables, indexes, seeds 240 products" />
      <div className="panel" style={{ maxWidth: 560 }}>
        <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20, lineHeight: 1.8 }}>
          Run this once after deploying. It will create the <code>products</code>, <code>orders</code>, and <code>order_items</code> tables in your Neon PostgreSQL database, create all necessary indexes, and seed 240 products. Safe to run again — uses <code>ON CONFLICT DO NOTHING</code>.
        </p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <input
            type="password"
            placeholder="Admin passkey"
            value={passkey}
            onChange={e => setPasskey(e.target.value)}
            style={{ flex: 1, height: 40, padding: '0 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif' }}
          />
          <button onClick={runSetup} disabled={loading || !passkey} style={{ padding: '0 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Running…' : 'Run Setup'}
          </button>
        </div>
        {result && (
          <div style={{ padding: '12px 16px', background: result.ok ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${result.ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`, borderRadius: 10, fontSize: 13, color: result.ok ? 'var(--green)' : 'var(--red)' }}>
            {result.ok ? (
              <>
                ✓ Setup complete — {result.data.productsInserted} products inserted<br />
                Tables: {result.data.tables?.join(', ')}
              </>
            ) : (
              <>✗ Error: {result.data.error}</>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Add Product Form ──────────────────────────────────────────────────────────
function AddProductForm({ onSave, onClose }) {
  const [form, setForm] = useState({ sku: '', name: '', category: 'audio', price: '', stock: '', emoji: '📦', is_new: false });
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 20 }}>Add Product</h3>
        <div className="form-grid">
          <FormField label="SKU *"><input value={form.sku} onChange={up('sku')} placeholder="SKU-0241" /></FormField>
          <FormField label="Emoji"><input value={form.emoji} onChange={up('emoji')} style={{ width: 60 }} /></FormField>
          <FormField label="Name *" full><input value={form.name} onChange={up('name')} placeholder="Brand Model Name" /></FormField>
          <FormField label="Category *">
            <select value={form.category} onChange={up('category')}>
              {['audio','keyboards','displays','storage','cables','ergonomics','networking','cameras'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Price (₹) *"><input type="number" value={form.price} onChange={up('price')} placeholder="1999" /></FormField>
          <FormField label="Stock"><input type="number" value={form.stock} onChange={up('stock')} placeholder="50" /></FormField>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)', marginTop: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={form.is_new} onChange={e => setForm(f => ({ ...f, is_new: e.target.checked }))} style={{ accentColor: 'var(--accent)' }} />
          Mark as New
        </label>
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button style={{ flex: 1, height: 40, background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }} onClick={() => onSave(form)}>Add Product</button>
          <button style={{ flex: 1, height: 40, background: 'none', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text2)', cursor: 'pointer' }} onClick={onClose}>Cancel</button>
        </div>
      </div>
      <ModalStyle />
    </div>
  );
}

// ── Edit Product Form ─────────────────────────────────────────────────────────
function EditProductForm({ product: p, onSave, onClose }) {
  const [form, setForm] = useState({ name: p.name, price: p.price, stock: p.stock, emoji: p.emoji, is_new: p.is_new, is_active: p.is_active });
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 4 }}>Edit Product</h3>
        <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 20 }}>{p.sku}</p>
        <div className="form-grid">
          <FormField label="Name" full><input value={form.name} onChange={up('name')} /></FormField>
          <FormField label="Emoji"><input value={form.emoji} onChange={up('emoji')} style={{ width: 60 }} /></FormField>
          <FormField label="Price (₹)"><input type="number" value={form.price} onChange={up('price')} /></FormField>
          <FormField label="Stock"><input type="number" value={form.stock} onChange={up('stock')} /></FormField>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.is_new} onChange={e => setForm(f => ({ ...f, is_new: e.target.checked }))} style={{ accentColor: 'var(--accent)' }} /> New
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} style={{ accentColor: 'var(--accent)' }} /> Active
          </label>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button style={{ flex: 1, height: 40, background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }} onClick={() => onSave(p.id, form)}>Save Changes</button>
          <button style={{ flex: 1, height: 40, background: 'none', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text2)', cursor: 'pointer' }} onClick={onClose}>Cancel</button>
        </div>
      </div>
      <ModalStyle />
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────
function KPICard({ label, value, sub, color }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px' }}>
      <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: color || 'var(--text)', lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 6 }}>{sub}</div>
    </div>
  );
}

function PageHeader({ title, sub, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
      <div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 4 }}>{title}</h2>
        <p style={{ fontSize: 13, color: 'var(--text2)' }}>{sub}</p>
      </div>
      {action}
    </div>
  );
}

function FormField({ label, children, full }) {
  return (
    <div style={{ gridColumn: full ? '1 / -1' : undefined }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5 }}>{label}</div>
      {children}
    </div>
  );
}

function ModalStyle() {
  return (
    <style>{`
      .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:999;padding:20px}
      .modal{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:28px;width:100%;max-width:480px;max-height:90vh;overflow-y:auto}
      .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
      .form-grid input,.form-grid select{width:100%;height:38px;padding:0 12px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:13px;outline:none;font-family:'Inter',sans-serif}
      .form-grid select{padding:0 28px 0 10px;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%235a5a78'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center}
      .form-grid input:focus,.form-grid select:focus{border-color:var(--accent)}
    `}</style>
  );
}

function LoadingScreen() {
  return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}><Spinner /></div>;
}

function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
      <div style={{ width: 28, height: 28, border: '2px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function Err({ msg }) {
  return <div style={{ padding: 40, textAlign: 'center', color: 'var(--red)', fontSize: 14 }}>{msg}</div>;
}
