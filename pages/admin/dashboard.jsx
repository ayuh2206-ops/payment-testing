// pages/admin/dashboard.jsx
// Full admin dashboard: Analytics, Orders, Products — all server-side guarded.

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const STATUS_STYLES = {
  pending:    { bg: 'rgba(233,195,73,0.12)',  color: '#e9c349' },
  processing: { bg: 'rgba(158,209,189,0.12)', color: '#9ed1bd' },
  shipped:    { bg: 'rgba(193,201,191,0.12)', color: '#c1c9bf' },
  delivered:  { bg: 'rgba(103,152,134,0.15)', color: '#679886' },
  cancelled:  { bg: 'rgba(255,180,171,0.12)', color: '#ffb4ab' },
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
          width: 228px;
          flex-shrink: 0;
          background: rgba(17,30,24,0.95);
          border-right: 1px solid rgba(65,72,67,0.2);
          display: flex;
          flex-direction: column;
          padding: 24px 14px;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }
        .sb-logo {
          font-family: 'Noto Serif', serif; font-size: 18px; font-weight: 300;
          font-style: italic; color: var(--gold);
          padding: 4px 10px; margin-bottom: 28px; letter-spacing: -0.3px;
        }
        .ldot { display: none; }
        .sb-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
        :global(.sb-item) {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 12px;
          font-size: 13px; font-weight: 500; color: var(--text2);
          border: none; background: none; width: 100%; text-align: left;
          cursor: pointer; font-family: 'Manrope', sans-serif;
          transition: background 0.15s, color 0.15s;
          text-decoration: none;
        }
        :global(.sb-item:hover) { background: rgba(42,56,49,0.5); color: var(--text); }
        :global(.sb-item.active) { background: rgba(233,195,73,0.1); color: var(--gold); }
        :global(.sb-icon) { font-size: 15px; width: 20px; text-align: center; }
        .sb-bottom { padding-top: 16px; border-top: 1px solid rgba(65,72,67,0.2); display: flex; flex-direction: column; gap: 2px; }
        :global(.logout) { color: var(--error) !important; }
        :global(.logout:hover) { background: rgba(255,180,171,0.08) !important; }
        .content {
          flex: 1;
          padding: 36px;
          overflow-y: auto;
          min-width: 0;
        }
        @media (max-width: 768px) {
          .sidebar { width: 64px; }
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
        <KPICard label="Total Orders"  value={data.totalOrders}  sub="all time" color="var(--teal)" />
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
        .kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:22px; }
        @media(max-width:900px){.kpis{grid-template-columns:repeat(2,1fr)}}
        .two-col { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        @media(max-width:900px){.two-col{grid-template-columns:1fr}}
        .bar-chart { display:flex; align-items:flex-end; gap:3px; height:180px; padding-bottom:20px; position:relative; }
        .bar-col { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; position:relative; height:100%; cursor:default; }
        .bar-fill { width:100%; background:linear-gradient(to top,#ad8b0e,#e9c349); border-radius:3px 3px 0 0; min-height:2px; transition:opacity .15s; }
        .bar-col:hover .bar-fill { opacity:.7; }
        .bar-label { position:absolute; bottom:-18px; font-size:9px; color:var(--text3); white-space:nowrap; letter-spacing:.04em; }
        .chart-empty { height:180px; display:flex; align-items:center; justify-content:center; color:var(--text2); font-size:13px; font-style:italic; }
        .status-list { display:flex; flex-direction:column; gap:14px; }
        .status-row { display:grid; grid-template-columns:100px 1fr 80px; align-items:center; gap:10px; }
        .status-bar-wrap { background:rgba(65,72,67,0.3); border-radius:4px; height:5px; overflow:hidden; }
        .status-bar-fill { height:100%; border-radius:4px; transition:width .5s cubic-bezier(0.4,0,0.2,1); opacity:0.8; }
        .status-count { font-size:12px; color:var(--text2); text-align:right; }
        .status-count b { color:var(--text); font-weight:600; }
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
                  <input type="checkbox" style={{ accentColor: 'var(--gold)', cursor: 'pointer' }}
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
                      <input type="checkbox" style={{ accentColor: 'var(--gold)', cursor: 'pointer' }}
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
        .order-filters { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; flex-wrap:wrap; gap:10px; }
        .filter-tabs { display:flex; gap:4px; flex-wrap:wrap; }
        .ftab { padding:6px 16px; border-radius:999px; border:1px solid rgba(65,72,67,0.3); font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; background:rgba(42,56,49,0.4); color:var(--text3); transition:all .15s; font-family:'Manrope',sans-serif; }
        .ftab:hover { border-color:rgba(65,72,67,0.5); color:var(--text2); }
        .ftab.on { background:rgba(233,195,73,0.12); color:var(--gold); border-color:rgba(233,195,73,0.3); }
        .filter-right { display:flex; gap:8px; align-items:center; }
        .search-wrap { position:relative; }
        .search-wrap input { height:38px; padding:0 12px 0 32px; background:rgba(42,56,49,0.5); border:1px solid rgba(65,72,67,0.3); border-radius:999px; color:var(--text); font-size:13px; outline:none; width:220px; font-family:'Manrope',sans-serif; }
        .search-wrap input:focus { border-color:rgba(233,195,73,0.4); }
        .si { position:absolute; left:11px; top:50%; transform:translateY(-50%); color:var(--text3); pointer-events:none; }
        select { height:38px; padding:0 28px 0 14px; background:rgba(42,56,49,0.5); border:1px solid rgba(65,72,67,0.3); border-radius:999px; color:var(--text); font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; outline:none; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238b938c'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 10px center; cursor:pointer; font-family:'Manrope',sans-serif; }
        select:focus { border-color:rgba(233,195,73,0.4); }
        .status-sel { height:32px; font-size:11px; min-width:110px; border-radius:8px; letter-spacing:.04em; }
        .table-wrap { overflow-x:auto; }
        .bulk-bar { display:flex; flex-wrap:wrap; align-items:center; gap:8px; padding:12px 16px; background:rgba(32,45,38,0.8); border-radius:14px; margin-bottom:14px; font-size:12px; color:var(--text2); box-shadow:inset 0 1px 1px rgba(65,72,67,0.2); }
        .bulk-btn { padding:7px 16px; border:1px solid rgba(65,72,67,0.4); border-radius:999px; background:rgba(42,56,49,0.5); color:var(--text2); font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; cursor:pointer; font-family:'Manrope',sans-serif; transition:all .15s; }
        .bulk-btn:hover { border-color:rgba(233,195,73,0.4); color:var(--gold); }
        .bulk-btn.danger { color:var(--error); border-color:rgba(255,180,171,0.25); }
        .bulk-btn.danger:hover { background:rgba(255,180,171,0.08); }
        .pager { display:flex; align-items:center; justify-content:center; gap:16px; margin-top:16px; }
        .pgb { padding:8px 20px; border:1px solid rgba(65,72,67,0.3); border-radius:999px; background:rgba(42,56,49,0.4); color:var(--text2); font-size:12px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; cursor:pointer; font-family:'Manrope',sans-serif; transition:all .15s; }
        .pgb:disabled { opacity:.25; cursor:not-allowed; }
        .pgb:not(:disabled):hover { border-color:rgba(233,195,73,0.4); color:var(--gold); }
        tr.sel { background:rgba(233,195,73,0.04); }
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
                    <span style={{ color: p.stock === 0 ? 'var(--error)' : p.stock < 10 ? 'var(--amber)' : 'var(--green)', fontWeight: 600 }}>
                      {p.stock}
                    </span>
                  </td>
                  <td>{p.rating} ★</td>
                  <td>
                    <span className="badge" style={p.is_active
                      ? { background: 'rgba(34,197,94,0.12)', color: 'var(--green)' }
                      : { background: 'rgba(239,68,68,0.12)', color: 'var(--error)' }}>
                      {p.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="row-btn edit-btn" onClick={() => setEditing(p)}>
                        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" width="11" height="11" style={{marginRight:4}}><path d="M9.5 2.5l2 2-7 7H2.5v-2l7-7z"/></svg>
                        Edit
                      </button>
                      <button className="row-btn toggle-btn" onClick={() => toggleActive(p)} data-active={p.is_active}>
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
        .prod-filters { display:flex; gap:10px; margin-bottom:18px; flex-wrap:wrap; }
        .search-wrap { position:relative; flex:1; min-width:200px; }
        .search-wrap input { height:38px; padding:0 14px 0 32px; background:rgba(42,56,49,0.5); border:1px solid rgba(65,72,67,0.3); border-radius:999px; color:var(--text); font-size:13px; outline:none; width:100%; font-family:'Manrope',sans-serif; }
        .search-wrap input:focus { border-color:rgba(233,195,73,0.4); }
        .si { position:absolute; left:11px; top:50%; transform:translateY(-50%); color:var(--text3); pointer-events:none; }
        select { height:38px; padding:0 28px 0 14px; background:rgba(42,56,49,0.5); border:1px solid rgba(65,72,67,0.3); border-radius:999px; color:var(--text); font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; outline:none; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238b938c'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 10px center; cursor:pointer; font-family:'Manrope',sans-serif; }
        .table-wrap { overflow-x:auto; }
        .row-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 14px; border-radius:999px; font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; cursor:pointer; transition:all .18s; font-family:'Manrope',sans-serif; white-space:nowrap; }
        .row-btn:hover { transform:scale(1.04); }
        .edit-btn { border:1px solid rgba(158,209,189,0.3); color:var(--teal); background:rgba(158,209,189,0.08); }
        .edit-btn:hover { background:rgba(158,209,189,0.16); border-color:rgba(158,209,189,0.5); }
        .toggle-btn[data-active="true"] { color:var(--error); border:1px solid rgba(255,180,171,0.3); background:rgba(255,180,171,0.08); }
        .toggle-btn[data-active="true"]:hover { background:rgba(255,180,171,0.16); }
        .toggle-btn[data-active="false"] { color:var(--gold); border:1px solid rgba(233,195,73,0.3); background:rgba(233,195,73,0.08); }
        .toggle-btn[data-active="false"]:hover { background:rgba(233,195,73,0.16); }
        .new-pill { font-size:9px; font-weight:700; text-transform:uppercase; background:linear-gradient(135deg,var(--gold),var(--gold-dark)); color:var(--on-gold); padding:2px 8px; border-radius:99px; letter-spacing:.06em; }
        .pager { display:flex; align-items:center; justify-content:center; gap:16px; margin-top:18px; }
        .pgb { padding:8px 20px; border:1px solid rgba(65,72,67,0.3); border-radius:999px; background:rgba(42,56,49,0.4); color:var(--text2); font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; cursor:pointer; font-family:'Manrope',sans-serif; transition:all .15s; }
        .pgb:disabled { opacity:.25; cursor:not-allowed; }
        .pgb:not(:disabled):hover { border-color:rgba(233,195,73,0.4); color:var(--gold); }
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
            style={{ flex: 1, height: 40, padding: '0 14px', background: 'rgba(42,56,49,0.5)', border: '1px solid rgba(65,72,67,0.3)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif' }}
          />
          <button onClick={runSetup} disabled={loading || !passkey} style={{ padding: '0 20px', background: 'var(--gold)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Running…' : 'Run Setup'}
          </button>
        </div>
        {result && (
          <div style={{ padding: '12px 16px', background: result.ok ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${result.ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`, borderRadius: 10, fontSize: 13, color: result.ok ? 'var(--green)' : 'var(--error)' }}>
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
        <h3 style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, fontStyle: 'italic', fontSize: 22, marginBottom: 20, letterSpacing: '-0.2px' }}>Add Product</h3>
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
          <input type="checkbox" checked={form.is_new} onChange={e => setForm(f => ({ ...f, is_new: e.target.checked }))} style={{ accentColor: 'var(--gold)' }} />
          Mark as New
        </label>
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button style={{ flex: 1, height: 46, background: 'linear-gradient(135deg,#e9c349,#ad8b0e)', color: '#3c2f00', border: 'none', borderRadius: 999, fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Manrope',sans-serif" }} onClick={() => onSave(form)}>Add Product</button>
          <button style={{ flex: 1, height: 46, background: 'none', border: '1px solid rgba(65,72,67,0.4)', borderRadius: 999, color: 'var(--text2)', cursor: 'pointer', fontFamily: "'Manrope',sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }} onClick={onClose}>Cancel</button>
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
        <h3 style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, fontStyle: 'italic', fontSize: 22, marginBottom: 4, letterSpacing: '-0.2px' }}>Edit Product</h3>
        <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 20 }}>{p.sku}</p>
        <div className="form-grid">
          <FormField label="Name" full><input value={form.name} onChange={up('name')} /></FormField>
          <FormField label="Emoji"><input value={form.emoji} onChange={up('emoji')} style={{ width: 60 }} /></FormField>
          <FormField label="Price (₹)"><input type="number" value={form.price} onChange={up('price')} /></FormField>
          <FormField label="Stock"><input type="number" value={form.stock} onChange={up('stock')} /></FormField>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.is_new} onChange={e => setForm(f => ({ ...f, is_new: e.target.checked }))} style={{ accentColor: 'var(--gold)' }} /> New
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} style={{ accentColor: 'var(--gold)' }} /> Active
          </label>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button style={{ flex: 1, height: 46, background: 'linear-gradient(135deg,#e9c349,#ad8b0e)', color: '#3c2f00', border: 'none', borderRadius: 999, fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Manrope',sans-serif" }} onClick={() => onSave(p.id, form)}>Save Changes</button>
          <button style={{ flex: 1, height: 46, background: 'none', border: '1px solid rgba(65,72,67,0.4)', borderRadius: 999, color: 'var(--text2)', cursor: 'pointer', fontFamily: "'Manrope',sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }} onClick={onClose}>Cancel</button>
        </div>
      </div>
      <ModalStyle />
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────
function KPICard({ label, value, sub, color }) {
  return (
    <div style={{ background: 'rgba(32,45,38,0.7)', borderRadius: 18, padding: '20px 22px', boxShadow: 'inset 0 1px 1px rgba(65,72,67,0.25)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: 10 }}>{label}</div>
      <div style={{ fontFamily: 'Noto Serif, serif', fontSize: 30, fontWeight: 300, color: color || 'var(--gold)', lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 7 }}>{sub}</div>
    </div>
  );
}

function PageHeader({ title, sub, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
      <div>
        <h2 style={{ fontFamily: 'Noto Serif, serif', fontSize: 24, fontWeight: 300, letterSpacing: '-0.3px', marginBottom: 4, fontStyle: 'italic' }}>{title}</h2>
        <p style={{ fontSize: 12, color: 'var(--text3)', letterSpacing: '0.04em' }}>{sub}</p>
      </div>
      {action}
    </div>
  );
}

function FormField({ label, children, full }) {
  return (
    <div style={{ gridColumn: full ? '1 / -1' : undefined, marginBottom: 18 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

function ModalStyle() {
  return (
    <style>{`
      .modal-overlay{position:fixed;inset:0;background:rgba(5,17,11,0.75);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:999;padding:20px}
      .modal{background:rgba(32,45,38,0.9);backdrop-filter:blur(28px);box-shadow:inset 0 1px 1px rgba(65,72,67,0.3),0 30px 60px rgba(5,17,11,0.6);border-radius:24px;padding:32px;width:100%;max-width:480px;max-height:90vh;overflow-y:auto}
      .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 20px}
      .form-grid input,.form-grid select{width:100%;background:transparent;border:none;border-bottom:1px solid rgba(65,72,67,0.5);border-radius:0;color:var(--text);font-size:13px;outline:none;font-family:'Manrope',sans-serif;padding:8px 4px;transition:border-color .2s}
      .form-grid input::placeholder{color:var(--text3)}
      .form-grid select{padding:8px 24px 8px 4px;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238b938c'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 4px center;background-color:transparent}
      .form-grid input:focus,.form-grid select:focus{border-bottom-color:var(--gold)}
    `}</style>
  );
}

function LoadingScreen() {
  return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}><Spinner /></div>;
}

function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
      <div style={{ width: 28, height: 28, border: '2px solid rgba(65,72,67,0.3)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function Err({ msg }) {
  return <div style={{ padding: 40, textAlign: 'center', color: 'var(--error)', fontSize: 14 }}>{msg}</div>;
}
