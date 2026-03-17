// pages/admin/dashboard.jsx
// Fully rebuilt to match Stitch admin_dashboard/code.html exactly.
// Key Stitch patterns used throughout:
//   Sidebar: bg-[#2a3831]/60 backdrop-blur-2xl border-r border-outline-variant/30
//   Nav active: text-[#e9c349] font-bold bg-[#2a3831] rounded-lg
//   Nav inactive: text-[#c1c8c1] hover:bg-[#111e18] rounded-lg hover:translate-x-1
//   "Add Product" btn: gold-gradient rounded-full uppercase tracking-widest
//   KPI cards: glass-panel p-6 rounded-xl border-l-4 border-l-primary (first card)
//   Table: headers text-[10px] uppercase tracking-[0.2em] text-on-surface-variant
//   Status badges: px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider + border
//   Edit btn: tertiary/teal pill with pencil icon
//   Hide/Show: error/success pill
//   Pagination: w-12 h-12 rounded-full circles (from storefront_catalog)

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Status badge colours — from Stitch table rows
const STATUS_BADGE = {
  pending:    { bg: 'rgba(193,200,193,0.1)', color: '#c1c8c1', border: 'rgba(193,200,193,0.2)', label: 'Pending' },
  processing: { bg: 'rgba(233,195,73,0.1)',  color: '#e9c349', border: 'rgba(233,195,73,0.2)',  label: 'Processing' },
  shipped:    { bg: 'rgba(193,200,193,0.1)', color: '#c1c9bf', border: 'rgba(193,200,193,0.2)', label: 'Shipped' },
  delivered:  { bg: 'rgba(158,209,189,0.1)', color: '#9ed1bd', border: 'rgba(158,209,189,0.2)', label: 'Completed' },
  cancelled:  { bg: 'rgba(255,180,171,0.1)', color: '#ffb4ab', border: 'rgba(255,180,171,0.2)', label: 'Cancelled' },
};

const ALL_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

// Sidebar nav items
const NAV_ITEMS = [
  { id: 'analytics', label: 'Analytics',  icon: '📊' },
  { id: 'orders',    label: 'Orders',     icon: '📋' },
  { id: 'products',  label: 'Products',   icon: '🛍️' },
  { id: 'setup',     label: 'DB Setup',   icon: '🔧' },
];

export default function AdminDashboard() {
  const router              = useRouter();
  const [tab, setTab]       = useState('analytics');
  const [authed, setAuthed] = useState(null);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(r => { if (r.status === 401) router.replace('/admin'); else setAuthed(true); })
      .catch(() => router.replace('/admin'));
  }, []);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  if (authed === null) return <Loader />;

  return (
    <>
      <Head><title>Admin — YourStore</title></Head>
      <div style={{ display:'flex', minHeight:'100vh', background:'#091610' }}>

        {/* ── Sidebar — from Stitch: h-screen w-64 fixed bg-[#2a3831]/60 backdrop-blur-2xl ── */}
        <aside style={{
          width: 240, flexShrink: 0,
          background: 'rgba(42,56,49,0.62)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRight: '1px solid rgba(65,72,67,0.3)',
          boxShadow: '20px 0 40px rgba(5,17,11,0.3)',
          display: 'flex', flexDirection: 'column',
          padding: '24px 16px',
          position: 'sticky', top: 0, height: '100vh',
          overflowY: 'auto',
        }}>
          {/* Brand */}
          <div style={{ marginBottom: 36, padding: '0 8px' }}>
            <h1 style={{
              fontFamily: 'Noto Serif, serif', fontSize: 17, fontWeight: 300,
              fontStyle: 'italic', color: '#e9c349', marginBottom: 4,
            }}>YourStore Admin</h1>
            <p style={{
              fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em',
              color: '#c1c8c1', opacity: 0.7, fontFamily: 'Manrope, sans-serif',
            }}>Management Portal</p>
          </div>

          {/* Nav — from Stitch: flex flex-col gap-2 */}
          <nav style={{ display:'flex', flexDirection:'column', gap: 6, flex: 1 }}>
            {NAV_ITEMS.map(item => {
              const isActive = tab === item.id;
              return (
                <button key={item.id} onClick={() => setTab(item.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 14px',
                  borderRadius: 10, border: 'none', cursor: 'pointer',
                  fontFamily: 'Manrope, sans-serif', fontSize: 13,
                  letterSpacing: '0.03em',
                  // Active: from Stitch: text-[#e9c349] font-bold bg-[#2a3831]
                  // Inactive: text-[#c1c8c1] hover:bg-[#111e18]
                  background: isActive ? '#2a3831' : 'transparent',
                  color: isActive ? '#e9c349' : '#c1c8c1',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.2s',
                  width: '100%', textAlign: 'left',
                }}>
                  <span style={{ fontSize: 15 }}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Bottom — from Stitch: mt-auto pt-6 border-t */}
          <div style={{
            borderTop: '1px solid rgba(65,72,67,0.2)',
            paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <a href="/" target="_blank" style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 14px', borderRadius: 10,
              color: '#c1c8c1', textDecoration: 'none',
              fontSize: 13, fontFamily: 'Manrope, sans-serif',
              transition: 'all 0.2s',
            }}>
              <span>🏪</span> View Store
            </a>
            <button onClick={logout} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 14px', borderRadius: 10,
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#ffb4ab', fontSize: 13,
              fontFamily: 'Manrope, sans-serif',
              width: '100%', textAlign: 'left',
              transition: 'all 0.2s',
            }}>
              <span>↩</span> Logout
            </button>
          </div>
        </aside>

        {/* ── Main — from Stitch: ml-64 p-12 bg-gradient-to-br from-surface ── */}
        <main style={{
          flex: 1, padding: '40px 48px 80px',
          background: 'linear-gradient(135deg, #091610 0%, #091610 40%, #05110b 100%)',
          minWidth: 0, overflowY: 'auto',
          position: 'relative',
        }}>
          {/* Ambient orbs */}
          <div style={{ position:'fixed', top:'-15%', right:'-5%', width:480, height:480, background:'radial-gradient(circle,rgba(27,77,62,0.12) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none', zIndex:0 }} />
          <div style={{ position:'fixed', top:'40%', left:220, width:600, height:600, background:'radial-gradient(circle,rgba(233,195,73,0.04) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none', zIndex:0 }} />

          <div style={{ position:'relative', zIndex:1 }}>
            {tab === 'analytics' && <AnalyticsPanel />}
            {tab === 'orders'    && <OrdersPanel />}
            {tab === 'products'  && <ProductsPanel />}
            {tab === 'setup'     && <SetupPanel />}
          </div>
        </main>
      </div>

      <style jsx global>{`
        /* Glass panel — from Stitch .glass-panel */
        .stitch-glass {
          background: rgba(42,56,49,0.60);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(65,72,67,0.30);
        }
        /* Gold gradient — from Stitch .gold-gradient */
        .stitch-gold {
          background: linear-gradient(135deg, #e9c349 0%, #ad8b0e 100%);
        }
        /* Table row hover — from Stitch: hover:bg-white/5 */
        .stitch-row:hover { background: rgba(255,255,255,0.03); }
        /* Sidebar nav hover */
        .sb-nav-item:hover { background: #111e18 !important; transform: translateX(2px); }
      `}</style>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Analytics Panel
// ─────────────────────────────────────────────────────────────────────────────
function AnalyticsPanel() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics').then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (!data)   return <ErrMsg msg="Failed to load analytics" />;

  const maxRev = Math.max(...(data.dailyRevenue || []).map(d => parseInt(d.revenue)), 1);

  return (
    <div>
      {/* Header — from Stitch: flex justify-between items-end mb-16 */}
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: 48 }}>
        <div>
          <h2 style={{ fontFamily:'Noto Serif,serif', fontSize: 38, fontWeight: 300, letterSpacing:'-0.5px', color:'#d7e6dc', marginBottom: 6 }}>
            Performance Dashboard
          </h2>
          <p style={{ color:'#c1c8c1', fontSize: 14, opacity: 0.8 }}>Your store metrics at a glance.</p>
        </div>
        {/* Add Product — from Stitch: gold-gradient rounded-full uppercase tracking-widest */}
        <button className="stitch-gold" style={{
          color:'#3c2f00', padding:'12px 28px', borderRadius:999,
          border:'none', fontFamily:'Manrope,sans-serif', fontSize: 12,
          fontWeight: 800, textTransform:'uppercase', letterSpacing:'0.15em',
          cursor:'pointer', display:'flex', alignItems:'center', gap: 8,
          boxShadow:'0 8px 24px rgba(233,195,73,0.2)',
          transition:'transform 0.2s, box-shadow 0.2s',
        }}>
          <span>+</span> Add Product
        </button>
      </header>

      {/* KPI Cards — from Stitch: grid-cols-4 gap-6 */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap: 20, marginBottom: 36 }}>
        {[
          { label:'Total Revenue',   value:`₹${Math.round((data.totalRevenue||0)/100000*10)/10}L`, sub:'from delivered orders', accent:true },
          { label:'Total Orders',    value: data.totalOrders||0,                                    sub:'all time', accent:false },
          { label:'Pending / Processing', value: data.pendingOrders||0,                              sub:'need attention', accent:false, warn:true },
          { label:'Products',        value: data.products?.total||0,                                 sub:`${data.products?.out_of_stock||0} out of stock`, accent:false },
        ].map((c, i) => (
          <div key={i} className="stitch-glass" style={{
            padding: '24px', borderRadius: 14, display:'flex', flexDirection:'column', gap: 16,
            // from Stitch: first KPI has border-l-4 border-l-primary
            borderLeft: c.accent ? '4px solid #e9c349' : '1px solid rgba(65,72,67,0.3)',
            boxShadow: '0 8px 32px rgba(5,17,11,0.3)',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              {/* Label — from Stitch: text-[10px] uppercase tracking-widest font-bold */}
              <span style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.15em', color:'#c1c8c1', fontWeight: 700 }}>{c.label}</span>
            </div>
            <div>
              {/* Value — from Stitch: text-3xl font-headline */}
              <span style={{
                fontFamily:'Noto Serif,serif', fontSize: 32, fontWeight: 300,
                color: c.warn ? '#e9c349' : '#d7e6dc', display:'block', lineHeight: 1.1,
              }}>{String(c.value)}</span>
              <p style={{ fontSize:10, color:'#9ed1bd', fontWeight: 500, marginTop: 6 }}>{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content split — from Stitch: flex gap-8 */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap: 28 }}>

        {/* Revenue chart + top products */}
        <div style={{ display:'flex', flexDirection:'column', gap: 20 }}>
          {/* Daily revenue — glass-panel */}
          <div className="stitch-glass" style={{ borderRadius: 14, overflow:'hidden', boxShadow:'0 8px 32px rgba(5,17,11,0.3)' }}>
            <div style={{ padding:'24px 32px', borderBottom:'1px solid rgba(65,72,67,0.2)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <h3 style={{ fontFamily:'Noto Serif,serif', fontSize: 18, fontWeight: 400, color:'#d7e6dc' }}>Daily Revenue — Last 30 days</h3>
            </div>
            <div style={{ padding:'24px 32px 28px' }}>
              {(!data.dailyRevenue || data.dailyRevenue.length === 0) ? (
                <div style={{ height:160, display:'flex', alignItems:'center', justifyContent:'center', color:'#8b938c', fontSize:13, fontStyle:'italic' }}>No orders in the last 30 days</div>
              ) : (
                <div style={{ display:'flex', alignItems:'flex-end', gap: 4, height: 160, paddingBottom: 24, position:'relative' }}>
                  {data.dailyRevenue.map((d, i) => (
                    <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%', position:'relative', cursor:'default' }}
                      title={`${d.day}: ₹${parseInt(d.revenue).toLocaleString('en-IN')} (${d.orders} orders)`}>
                      <div style={{
                        width:'100%', minHeight: 3, borderRadius:'3px 3px 0 0',
                        background:'linear-gradient(to top, #ad8b0e, #e9c349)',
                        height:`${Math.round((parseInt(d.revenue)/maxRev)*100)}%`,
                        transition:'opacity 0.2s',
                      }} />
                      {i % 6 === 0 && (
                        <span style={{ position:'absolute', bottom:-18, fontSize:8, color:'#8b938c', whiteSpace:'nowrap', letterSpacing:'0.04em' }}>{d.day}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Top products table */}
          <div className="stitch-glass" style={{ borderRadius: 14, overflow:'hidden', boxShadow:'0 8px 32px rgba(5,17,11,0.3)' }}>
            <div style={{ padding:'24px 32px', borderBottom:'1px solid rgba(65,72,67,0.2)' }}>
              <h3 style={{ fontFamily:'Noto Serif,serif', fontSize: 18, fontWeight: 400, color:'#d7e6dc' }}>Top Products</h3>
            </div>
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background:'rgba(17,30,24,0.5)' }}>
                    {['Product','Category','Price','Units Sold'].map(h => (
                      <th key={h} style={{ padding:'14px 24px', textAlign:'left', fontSize:10, textTransform:'uppercase', letterSpacing:'0.18em', color:'#c1c8c1', fontWeight:700, borderBottom:'1px solid rgba(65,72,67,0.15)', whiteSpace:'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(data.topProducts || []).map((p, i) => (
                    <tr key={i} className="stitch-row" style={{ borderBottom:'1px solid rgba(65,72,67,0.08)', transition:'background 0.15s' }}>
                      <td style={{ padding:'18px 24px', color:'#d7e6dc', fontWeight: 500 }}>
                        <span style={{ marginRight: 10, fontSize: 18 }}>{p.emoji}</span>{p.name}
                      </td>
                      <td style={{ padding:'18px 24px' }}><span style={{ padding:'4px 12px', borderRadius:999, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', background:'rgba(65,72,67,0.4)', color:'#c1c8c1' }}>{p.category}</span></td>
                      <td style={{ padding:'18px 24px', fontFamily:'Noto Serif,serif', color:'#e9c349' }}>₹{p.price?.toLocaleString('en-IN')}</td>
                      <td style={{ padding:'18px 24px', color:'#d7e6dc', fontWeight: 600 }}>{p.units_sold || 0}</td>
                    </tr>
                  ))}
                  {!data.topProducts?.length && (
                    <tr><td colSpan={4} style={{ padding: 40, textAlign:'center', color:'#8b938c', fontStyle:'italic' }}>No sales data yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Orders by status — from Stitch Add Product panel style */}
        <div className="stitch-glass" style={{
          borderRadius: 14, padding: '24px 28px',
          borderTop: '2px solid rgba(233,195,73,0.3)',
          boxShadow:'0 8px 32px rgba(5,17,11,0.3)',
        }}>
          <h3 style={{ fontFamily:'Noto Serif,serif', fontSize: 18, fontWeight: 400, color:'#d7e6dc', marginBottom: 24 }}>Orders by Status</h3>
          <div style={{ display:'flex', flexDirection:'column', gap: 16 }}>
            {(data.ordersByStatus || []).map(s => {
              const st = STATUS_BADGE[s.status] || { color:'#c1c8c1', bg:'rgba(193,200,193,0.1)', border:'rgba(193,200,193,0.2)' };
              const pct = data.totalOrders ? Math.round((parseInt(s.count)/data.totalOrders)*100) : 0;
              return (
                <div key={s.status}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8 }}>
                    {/* Status badge — from Stitch: px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border */}
                    <span style={{
                      padding:'4px 12px', borderRadius:999,
                      fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                      background: st.bg, color: st.color, border:`1px solid ${st.border}`,
                    }}>{st.label}</span>
                    <span style={{ fontSize:12, color:'#c1c8c1' }}><strong style={{color:'#d7e6dc'}}>{s.count}</strong> <span style={{opacity:0.6}}>{pct}%</span></span>
                  </div>
                  <div style={{ height: 5, background:'rgba(65,72,67,0.35)', borderRadius:3, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${pct}%`, background: st.color, borderRadius:3, opacity:0.8, transition:'width 0.5s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Orders Panel
// ─────────────────────────────────────────────────────────────────────────────
function OrdersPanel() {
  const [orders, setOrders]         = useState([]);
  const [total, setTotal]           = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]       = useState(true);
  const [status, setStatus]         = useState('');
  const [search, setSearch]         = useState('');
  const [sort, setSort]             = useState('date-desc');
  const [page, setPage]             = useState(1);
  const [selected, setSelected]     = useState(new Set());
  const [updatingId, setUpdatingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs   = new URLSearchParams({ status, search, sort, page, limit:20 });
      const data = await fetch(`/api/admin/orders?${qs}`).then(r => r.json());
      setOrders(data.orders || []); setTotal(data.total||0); setTotalPages(data.totalPages||1);
    } catch { setOrders([]); }
    finally { setLoading(false); }
  }, [status, search, sort, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); setSelected(new Set()); }, [status, search, sort]);

  async function updateStatus(id, newStatus) {
    setUpdatingId(id);
    await fetch(`/api/admin/orders/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({status:newStatus}) });
    load(); setUpdatingId(null);
  }

  async function bulkUpdate(newStatus) { for(const id of selected) await updateStatus(id, newStatus); setSelected(new Set()); }

  function exportCSV() {
    const rows=[['Order Ref','Customer','Email','Amount','Status','Date'],...orders.map(o=>[o.order_ref,o.customer_name,o.customer_email,o.amount,o.status,new Date(o.created_at).toLocaleDateString('en-IN')])];
    const blob=new Blob([rows.map(r=>r.join(',')).join('\n')],{type:'text/csv'});
    Object.assign(document.createElement('a'),{href:URL.createObjectURL(blob),download:'orders.csv'}).click();
  }

  function toggleSel(id){setSelected(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n;});}
  function toggleAll(){selected.size===orders.length?setSelected(new Set()):setSelected(new Set(orders.map(o=>o.order_ref)));}

  return (
    <div>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: 40 }}>
        <div>
          <h2 style={{ fontFamily:'Noto Serif,serif', fontSize: 38, fontWeight: 300, letterSpacing:'-0.5px', color:'#d7e6dc', marginBottom: 6 }}>Orders</h2>
          <p style={{ color:'#c1c8c1', fontSize: 14, opacity: 0.8 }}>{total} total orders</p>
        </div>
        <button onClick={exportCSV} className="stitch-gold" style={{
          color:'#3c2f00', padding:'11px 24px', borderRadius:999, border:'none',
          fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:800,
          textTransform:'uppercase', letterSpacing:'0.12em', cursor:'pointer',
          boxShadow:'0 6px 20px rgba(233,195,73,0.2)',
        }}>Export CSV ↓</button>
      </header>

      {/* Status filter tabs — from Stitch: status pill badges style */}
      <div style={{ display:'flex', flexWrap:'wrap', gap: 8, marginBottom: 20 }}>
        {['all',...ALL_STATUSES].map(s => {
          const st = s==='all' ? null : STATUS_BADGE[s];
          const isOn = status===(s==='all'?'':s);
          return (
            <button key={s} onClick={()=>setStatus(s==='all'?'':s)} style={{
              padding:'7px 18px', borderRadius:999, border:'none', cursor:'pointer',
              fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700,
              textTransform:'uppercase', letterSpacing:'0.1em',
              transition:'all 0.15s',
              background: isOn ? (st?.bg||'rgba(233,195,73,0.12)') : 'rgba(42,56,49,0.5)',
              color: isOn ? (st?.color||'#e9c349') : '#8b938c',
              boxShadow: isOn ? `inset 0 0 0 1px ${st?.border||'rgba(233,195,73,0.3)'}` : 'inset 0 0 0 1px rgba(65,72,67,0.3)',
            }}>{s==='all'?'All orders':st?.label||s}</button>
          );
        })}
      </div>

      {/* Search + sort */}
      <div style={{ display:'flex', gap: 10, marginBottom: 16, flexWrap:'wrap' }}>
        <div style={{ position:'relative', flex: 1, minWidth: 220 }}>
          <svg style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'#8b938c', pointerEvents:'none' }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14"><circle cx="7" cy="7" r="5"/><path d="m11 11 3 3"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search order, customer…" style={{
            width:'100%', height:40, paddingLeft:36, paddingRight:14,
            background:'rgba(42,56,49,0.5)', border:'1px solid rgba(65,72,67,0.3)',
            borderRadius:999, color:'#d7e6dc', fontSize:13, outline:'none',
            fontFamily:'Manrope,sans-serif',
          }}/>
        </div>
        <select value={sort} onChange={e=>setSort(e.target.value)} style={{
          height:40, padding:'0 32px 0 16px', background:'rgba(42,56,49,0.5)',
          border:'1px solid rgba(65,72,67,0.3)', borderRadius:999, color:'#d7e6dc',
          fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em',
          outline:'none', appearance:'none', cursor:'pointer',
          backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238b938c'/%3E%3C/svg%3E")`,
          backgroundRepeat:'no-repeat', backgroundPosition:'right 12px center',
          fontFamily:'Manrope,sans-serif',
        }}>
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Amount ↓</option>
          <option value="amount-asc">Amount ↑</option>
        </select>
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div style={{
          display:'flex', flexWrap:'wrap', alignItems:'center', gap: 10,
          padding:'12px 20px', marginBottom:14,
          background:'rgba(42,56,49,0.5)', border:'1px solid rgba(65,72,67,0.3)',
          borderRadius: 14,
        }}>
          <span style={{ fontSize:13, color:'#c1c8c1', flex:1 }}>{selected.size} selected</span>
          {[{label:'Mark Shipped',color:'#9ed1bd',s:'shipped'},{label:'Mark Delivered',color:'#9ed1bd',s:'delivered'},{label:'Cancel',color:'#ffb4ab',s:'cancelled'}].map(b=>(
            <button key={b.s} onClick={()=>bulkUpdate(b.s)} style={{
              padding:'7px 18px', borderRadius:999, border:`1px solid ${b.color}33`,
              background:`${b.color}11`, color:b.color,
              fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
              cursor:'pointer', fontFamily:'Manrope,sans-serif', transition:'all .15s',
            }}>{b.label}</button>
          ))}
          <button onClick={exportCSV} style={{ padding:'7px 18px', borderRadius:999, border:'1px solid rgba(65,72,67,0.4)', background:'none', color:'#c1c8c1', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', cursor:'pointer', fontFamily:'Manrope,sans-serif' }}>Export CSV ↓</button>
        </div>
      )}

      {/* Table — from Stitch: glass-panel overflow-hidden */}
      <div className="stitch-glass" style={{ borderRadius: 14, overflow:'hidden', boxShadow:'0 8px 32px rgba(5,17,11,0.3)' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            {/* Headers — from Stitch: text-[10px] uppercase tracking-[0.2em] */}
            <thead style={{ background:'rgba(17,30,24,0.5)' }}>
              <tr>
                <th style={{ padding:'14px 20px', width:36 }}>
                  <input type="checkbox" checked={selected.size===orders.length&&orders.length>0} onChange={toggleAll}
                    style={{ accentColor:'#e9c349', cursor:'pointer', width:15, height:15 }}/>
                </th>
                {['Order','Customer','Amount','Status','Date','Action'].map(h=>(
                  <th key={h} style={{ padding:'14px 20px', textAlign:'left', fontSize:10, textTransform:'uppercase', letterSpacing:'0.18em', color:'#c1c8c1', fontWeight:700, borderBottom:'1px solid rgba(65,72,67,0.2)', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7}><Loader /></td></tr>
              ) : orders.length===0 ? (
                <tr><td colSpan={7} style={{ padding:48, textAlign:'center', color:'#8b938c', fontStyle:'italic', fontSize:14 }}>No orders found</td></tr>
              ) : orders.map(o => {
                const st = STATUS_BADGE[o.status] || STATUS_BADGE.pending;
                return (
                  <tr key={o.order_ref} className="stitch-row" style={{
                    borderBottom:'1px solid rgba(65,72,67,0.1)', transition:'background 0.15s',
                    background: selected.has(o.order_ref) ? 'rgba(233,195,73,0.04)' : 'transparent',
                  }}>
                    <td style={{ padding:'16px 20px' }}>
                      <input type="checkbox" checked={selected.has(o.order_ref)} onChange={()=>toggleSel(o.order_ref)}
                        style={{ accentColor:'#e9c349', cursor:'pointer', width:15, height:15 }}/>
                    </td>
                    <td style={{ padding:'16px 20px', fontFamily:'monospace', fontSize:11, color:'#c1c8c1', fontWeight:600 }}>{o.order_ref}</td>
                    <td style={{ padding:'16px 20px' }}>
                      <div style={{ fontWeight:500, fontSize:13, color:'#d7e6dc' }}>{o.customer_name}</div>
                      <div style={{ fontSize:11, color:'#8b938c', marginTop:2 }}>{o.customer_email}</div>
                    </td>
                    <td style={{ padding:'16px 20px', fontFamily:'Noto Serif,serif', fontSize:15, color:'#e9c349', fontWeight:400 }}>₹{parseInt(o.amount||0).toLocaleString('en-IN')}</td>
                    <td style={{ padding:'16px 20px' }}>
                      {/* Status badge — from Stitch exactly */}
                      <span style={{
                        padding:'4px 12px', borderRadius:999,
                        fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                        background:st.bg, color:st.color, border:`1px solid ${st.border}`,
                      }}>{st.label}</span>
                    </td>
                    <td style={{ padding:'16px 20px', fontSize:12, color:'#8b938c', whiteSpace:'nowrap' }}>
                      {new Date(o.created_at).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'2-digit'})}
                    </td>
                    <td style={{ padding:'16px 20px' }}>
                      {/* Status dropdown — glass style */}
                      <select value={o.status} onChange={e=>updateStatus(o.order_ref,e.target.value)}
                        disabled={updatingId===o.order_ref}
                        style={{
                          height:32, padding:'0 26px 0 12px', background:'rgba(42,56,49,0.6)',
                          border:'1px solid rgba(65,72,67,0.4)', borderRadius:999,
                          color:'#c1c8c1', fontSize:10, fontWeight:700, textTransform:'uppercase',
                          letterSpacing:'0.08em', outline:'none', appearance:'none', cursor:'pointer',
                          backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5'%3E%3Cpath d='M0 0l4 5 4-5z' fill='%238b938c'/%3E%3C/svg%3E")`,
                          backgroundRepeat:'no-repeat', backgroundPosition:'right 9px center',
                          fontFamily:'Manrope,sans-serif',
                        }}>
                        {ALL_STATUSES.map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination — from Stitch: w-12 h-12 rounded-full circles */}
      {totalPages > 1 && <Pager page={page} totalPages={totalPages} onChange={setPage} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Products Panel
// ─────────────────────────────────────────────────────────────────────────────
function ProductsPanel() {
  const [products, setProducts]     = useState([]);
  const [total, setTotal]           = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [category, setCategory]     = useState('');
  const [page, setPage]             = useState(1);
  const [editing, setEditing]       = useState(null);
  const [showAdd, setShowAdd]       = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs   = new URLSearchParams({ search, category, page, limit:20 });
      const data = await fetch(`/api/admin/products?${qs}`).then(r => r.json());
      setProducts(data.products||[]); setTotal(data.total||0); setTotalPages(data.totalPages||1);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  }, [search, category, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, category]);

  async function toggleActive(p) {
    await fetch(`/api/admin/products/${p.id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({is_active:!p.is_active})});
    load();
  }
  async function saveEdit(id, updates) {
    await fetch(`/api/admin/products/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(updates)});
    setEditing(null); load();
  }
  async function addProduct(data) {
    const res=await fetch('/api/admin/products',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    if(res.ok){setShowAdd(false);load();}else{const e=await res.json();alert(e.error);}
  }

  return (
    <div>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: 40 }}>
        <div>
          <h2 style={{ fontFamily:'Noto Serif,serif', fontSize: 38, fontWeight: 300, letterSpacing:'-0.5px', color:'#d7e6dc', marginBottom: 6 }}>Products</h2>
          <p style={{ color:'#c1c8c1', fontSize: 14, opacity: 0.8 }}>{total} products in database</p>
        </div>
        {/* Add button — from Stitch: gold-gradient rounded-full */}
        <button onClick={()=>setShowAdd(true)} className="stitch-gold" style={{
          color:'#3c2f00', padding:'12px 28px', borderRadius:999, border:'none',
          fontFamily:'Manrope,sans-serif', fontSize:12, fontWeight:800,
          textTransform:'uppercase', letterSpacing:'0.14em', cursor:'pointer',
          display:'flex', alignItems:'center', gap: 8,
          boxShadow:'0 8px 24px rgba(233,195,73,0.2)', transition:'transform 0.2s, box-shadow 0.2s',
        }}>
          <span>+</span> Add Product
        </button>
      </header>

      {showAdd   && <ProductModal title="Add Product"  product={null}     onSave={addProduct}           onClose={()=>setShowAdd(false)} />}
      {editing   && <ProductModal title="Edit Product" product={editing}  onSave={d=>saveEdit(editing.id,d)} onClose={()=>setEditing(null)} />}

      {/* Filters */}
      <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
        <div style={{ position:'relative', flex:1, minWidth:220 }}>
          <svg style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'#8b938c', pointerEvents:'none' }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14"><circle cx="7" cy="7" r="5"/><path d="m11 11 3 3"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products…" style={{
            width:'100%', height:40, paddingLeft:36, paddingRight:14,
            background:'rgba(42,56,49,0.5)', border:'1px solid rgba(65,72,67,0.3)',
            borderRadius:999, color:'#d7e6dc', fontSize:13, outline:'none',
            fontFamily:'Manrope,sans-serif',
          }}/>
        </div>
        <select value={category} onChange={e=>setCategory(e.target.value)} style={{
          height:40, padding:'0 32px 0 16px', background:'rgba(42,56,49,0.5)',
          border:'1px solid rgba(65,72,67,0.3)', borderRadius:999, color:'#d7e6dc',
          fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em',
          outline:'none', appearance:'none', cursor:'pointer',
          backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238b938c'/%3E%3C/svg%3E")`,
          backgroundRepeat:'no-repeat', backgroundPosition:'right 12px center', fontFamily:'Manrope,sans-serif',
        }}>
          <option value="">All Categories</option>
          {['audio','keyboards','displays','storage','cables','ergonomics','networking','cameras'].map(c=>(
            <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="stitch-glass" style={{ borderRadius:14, overflow:'hidden', boxShadow:'0 8px 32px rgba(5,17,11,0.3)' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead style={{ background:'rgba(17,30,24,0.5)' }}>
              <tr>
                {['Product','SKU','Category','Price','Stock','Rating','Status','Actions'].map(h=>(
                  <th key={h} style={{ padding:'14px 20px', textAlign:'left', fontSize:10, textTransform:'uppercase', letterSpacing:'0.18em', color:'#c1c8c1', fontWeight:700, borderBottom:'1px solid rgba(65,72,67,0.2)', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8}><Loader /></td></tr>
              ) : products.map(p => (
                <tr key={p.id} className="stitch-row" style={{
                  borderBottom:'1px solid rgba(65,72,67,0.1)',
                  transition:'background 0.15s', opacity: p.is_active ? 1 : 0.45,
                }}>
                  <td style={{ padding:'16px 20px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ fontSize:22 }}>{p.emoji}</span>
                      <div>
                        <div style={{ fontSize:13, fontWeight:500, color:'#d7e6dc' }}>{p.name}</div>
                        {p.is_new && (
                          <span style={{ fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', background:'linear-gradient(135deg,#e9c349,#ad8b0e)', color:'#3c2f00', padding:'2px 8px', borderRadius:999 }}>New</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:'16px 20px', fontFamily:'monospace', fontSize:11, color:'#8b938c' }}>{p.sku}</td>
                  <td style={{ padding:'16px 20px' }}>
                    <span style={{ padding:'4px 12px', borderRadius:999, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', background:'rgba(65,72,67,0.4)', color:'#c1c8c1' }}>{p.category}</span>
                  </td>
                  <td style={{ padding:'16px 20px', fontFamily:'Noto Serif,serif', fontSize:15, color:'#e9c349' }}>₹{parseInt(p.price||0).toLocaleString('en-IN')}</td>
                  <td style={{ padding:'16px 20px', fontSize:14, fontWeight:600, color:p.stock===0?'#ffb4ab':p.stock<10?'#e9c349':'#9ed1bd' }}>{p.stock}</td>
                  <td style={{ padding:'16px 20px', fontSize:13, color:'#c1c8c1' }}>{p.rating} ★</td>
                  <td style={{ padding:'16px 20px' }}>
                    {/* Status badge */}
                    <span style={{
                      padding:'4px 12px', borderRadius:999, fontSize:10, fontWeight:700,
                      textTransform:'uppercase', letterSpacing:'0.1em',
                      background: p.is_active?'rgba(158,209,189,0.12)':'rgba(255,180,171,0.1)',
                      color: p.is_active?'#9ed1bd':'#ffb4ab',
                      border: `1px solid ${p.is_active?'rgba(158,209,189,0.25)':'rgba(255,180,171,0.25)'}`,
                    }}>{p.is_active?'Active':'Hidden'}</span>
                  </td>
                  <td style={{ padding:'16px 20px' }}>
                    <div style={{ display:'flex', gap: 8, alignItems:'center' }}>
                      {/*
                        EDIT button — matches Stitch design system:
                        glass pill with teal/tertiary colour + pencil icon
                        from Stitch: px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                      */}
                      <button onClick={()=>setEditing(p)} style={{
                        display:'inline-flex', alignItems:'center', gap: 5,
                        padding:'6px 14px', borderRadius:999,
                        border:'1px solid rgba(158,209,189,0.3)',
                        background:'rgba(158,209,189,0.08)',
                        color:'#9ed1bd',
                        fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                        cursor:'pointer', fontFamily:'Manrope,sans-serif',
                        transition:'all 0.15s',
                      }}>
                        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" width="11" height="11">
                          <path d="M9.5 2.5l2 2-7 7H2.5v-2l7-7z"/>
                        </svg>
                        Edit
                      </button>
                      {/*
                        HIDE/SHOW button — error/success pill
                        matches Stitch status badge style
                      */}
                      <button onClick={()=>toggleActive(p)} style={{
                        display:'inline-flex', alignItems:'center', gap: 5,
                        padding:'6px 14px', borderRadius:999,
                        border: `1px solid ${p.is_active?'rgba(255,180,171,0.3)':'rgba(233,195,73,0.3)'}`,
                        background: p.is_active?'rgba(255,180,171,0.08)':'rgba(233,195,73,0.08)',
                        color: p.is_active?'#ffb4ab':'#e9c349',
                        fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                        cursor:'pointer', fontFamily:'Manrope,sans-serif',
                        transition:'all 0.15s',
                      }}>
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

      {/* Pagination — from Stitch: w-12 h-12 rounded-full circles */}
      {totalPages > 1 && <Pager page={page} totalPages={totalPages} onChange={setPage} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Setup Panel
// ─────────────────────────────────────────────────────────────────────────────
function SetupPanel() {
  const [passkey, setPasskey] = useState('');
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);

  async function runSetup() {
    setLoading(true); setResult(null);
    try {
      const res  = await fetch('/api/admin/setup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({passkey})});
      const data = await res.json();
      setResult({ ok:res.ok, data });
    } catch(e) { setResult({ok:false,data:{error:e.message}}); }
    finally { setLoading(false); }
  }

  return (
    <div>
      <header style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily:'Noto Serif,serif', fontSize: 38, fontWeight: 300, letterSpacing:'-0.5px', color:'#d7e6dc', marginBottom: 6 }}>Database Setup</h2>
        <p style={{ color:'#c1c8c1', fontSize:14, opacity:0.8 }}>One-time setup — creates tables, indexes, seeds 240 products</p>
      </header>
      {/* from Stitch: glass-panel rounded-xl p-8 border-t-2 border-t-primary/40 */}
      <div className="stitch-glass" style={{ borderRadius:14, padding:'32px 36px', maxWidth:560, borderTop:'2px solid rgba(233,195,73,0.3)' }}>
        <p style={{ fontSize:13, color:'#c1c8c1', lineHeight:1.85, marginBottom:24 }}>
          Run once after deploying. Creates <code style={{fontFamily:'monospace',fontSize:12,background:'rgba(65,72,67,0.4)',padding:'2px 6px',borderRadius:4,color:'#9ed1bd'}}>products</code>, <code style={{fontFamily:'monospace',fontSize:12,background:'rgba(65,72,67,0.4)',padding:'2px 6px',borderRadius:4,color:'#9ed1bd'}}>orders</code>, and <code style={{fontFamily:'monospace',fontSize:12,background:'rgba(65,72,67,0.4)',padding:'2px 6px',borderRadius:4,color:'#9ed1bd'}}>order_items</code> tables in Neon PostgreSQL, creates all indexes, and seeds 240 products.
        </p>
        <div style={{ display:'flex', gap:10, marginBottom:20 }}>
          {/* Input — from Stitch: bg-transparent border-b border-outline-variant/40 focus:border-primary */}
          <input type="password" placeholder="Admin passkey" value={passkey} onChange={e=>setPasskey(e.target.value)}
            style={{ flex:1, background:'transparent', border:'none', borderBottom:'1px solid rgba(65,72,67,0.5)', borderRadius:0, color:'#d7e6dc', fontSize:14, padding:'10px 4px', outline:'none', fontFamily:'Manrope,sans-serif', transition:'border-color 0.2s' }}/>
          {/* Button — from Stitch: gold-gradient rounded-full */}
          <button onClick={runSetup} disabled={loading||!passkey} className={!loading&&passkey?"stitch-gold":""} style={{
            padding:'10px 24px', borderRadius:999, border:'none',
            background: loading||!passkey ? 'rgba(42,56,49,0.5)' : undefined,
            color: loading||!passkey ? '#8b938c' : '#3c2f00',
            fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.12em',
            cursor: loading||!passkey ? 'not-allowed' : 'pointer', fontFamily:'Manrope,sans-serif',
          }}>{loading ? 'Running…' : 'Run Setup'}</button>
        </div>
        {result && (
          <div style={{
            padding:'12px 16px', borderRadius:12, fontSize:13,
            background: result.ok ? 'rgba(158,209,189,0.08)' : 'rgba(255,180,171,0.08)',
            border:`1px solid ${result.ok?'rgba(158,209,189,0.2)':'rgba(255,180,171,0.2)'}`,
            color: result.ok ? '#9ed1bd' : '#ffb4ab',
          }}>
            {result.ok
              ? <>✓ Setup complete — {result.data.productsInserted} products inserted. Tables: {result.data.tables?.join(', ')}</>
              : <>✗ Error: {result.data.error}</>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Product Modal — from Stitch: glass-panel rounded-xl p-8 border-t-2 border-t-primary/40
// Inputs: bg-transparent border-b border-outline-variant/40 — exactly like Stitch
// ─────────────────────────────────────────────────────────────────────────────
function ProductModal({ title, product: p, onSave, onClose }) {
  const [form, setForm] = useState({
    name:     p?.name     || '',
    price:    p?.price    || '',
    stock:    p?.stock    || '',
    emoji:    p?.emoji    || '📦',
    category: p?.category || 'audio',
    sku:      p?.sku      || '',
    is_new:   p?.is_new   ?? false,
    is_active:p?.is_active?? true,
  });
  const up = k => e => setForm(f=>({...f,[k]:e.target.value}));
  const inputStyle = {
    width:'100%', background:'transparent', border:'none',
    borderBottom:'1px solid rgba(65,72,67,0.45)', borderRadius:0,
    color:'#d7e6dc', fontSize:14, padding:'10px 4px',
    outline:'none', fontFamily:'Manrope,sans-serif',
    transition:'border-color 0.2s',
  };
  const labelStyle = {
    display:'block', fontSize:10, fontWeight:700, textTransform:'uppercase',
    letterSpacing:'0.15em', color:'#8b938c', marginBottom:6,
  };

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:999,
      background:'rgba(5,17,11,0.75)',
      backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:20,
    }}>
      {/* from Stitch: glass-panel rounded-xl p-8 border-t-2 border-t-primary/40 */}
      <div style={{
        background:'rgba(42,56,49,0.88)', backdropFilter:'blur(28px)',
        border:'1px solid rgba(65,72,67,0.3)',
        borderTop:'2px solid rgba(233,195,73,0.4)',
        borderRadius:18, padding:36, width:'100%', maxWidth:460, maxHeight:'90vh', overflowY:'auto',
        boxShadow:'0 30px 60px rgba(5,17,11,0.6)',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
          {/* from Stitch: w-10 h-10 rounded-lg gold-gradient */}
          <div className="stitch-gold" style={{ width:40, height:40, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', color:'#3c2f00', fontSize:18 }}>✦</div>
          <h3 style={{ fontFamily:'Noto Serif,serif', fontSize:20, fontWeight:400, fontStyle:'italic', color:'#d7e6dc' }}>{title}</h3>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 24px' }}>
          {[
            {label:'Product Name', key:'name', full:true, placeholder:'e.g. Midnight Audio Pro'},
            {label:'SKU',          key:'sku',  full:false, placeholder:'SKU-0241'},
            {label:'Emoji',        key:'emoji',full:false, placeholder:'📦'},
          ].map(f=>(
            <div key={f.key} style={{ gridColumn:f.full?'1/-1':'auto', marginBottom:22 }}>
              <label style={labelStyle}>{f.label}</label>
              <input value={form[f.key]} onChange={up(f.key)} placeholder={f.placeholder} style={inputStyle}/>
            </div>
          ))}

          <div style={{ marginBottom:22 }}>
            <label style={labelStyle}>Category</label>
            <select value={form.category} onChange={up('category')} style={{...inputStyle, appearance:'none', cursor:'pointer', backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5'%3E%3Cpath d='M0 0l4 5 4-5z' fill='%238b938c'/%3E%3C/svg%3E")`, backgroundRepeat:'no-repeat', backgroundPosition:'right 2px center', paddingRight:20 }}>
              {['audio','keyboards','displays','storage','cables','ergonomics','networking','cameras'].map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ marginBottom:22 }}>
            <label style={labelStyle}>Price (₹)</label>
            <input type="number" value={form.price} onChange={up('price')} placeholder="1999" style={inputStyle}/>
          </div>
          <div style={{ marginBottom:22 }}>
            <label style={labelStyle}>Stock</label>
            <input type="number" value={form.stock} onChange={up('stock')} placeholder="50" style={inputStyle}/>
          </div>
        </div>

        <div style={{ display:'flex', gap:24, marginBottom:24 }}>
          {[['is_new','Mark as New'],['is_active','Active']].map(([k,l])=>(
            <label key={k} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#c1c8c1', cursor:'pointer' }}>
              <input type="checkbox" checked={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.checked}))} style={{ accentColor:'#e9c349', width:15, height:15, cursor:'pointer' }}/>{l}
            </label>
          ))}
        </div>

        <div style={{ display:'flex', gap:12, marginTop:8 }}>
          {/* Save — gold-gradient rounded-full */}
          <button onClick={()=>onSave(form)} className="stitch-gold" style={{
            flex:1, height:48, borderRadius:999, border:'none',
            color:'#3c2f00', fontSize:12, fontWeight:800, textTransform:'uppercase',
            letterSpacing:'0.14em', cursor:'pointer', fontFamily:'Manrope,sans-serif',
          }}>Save</button>
          {/* Cancel — ghost pill */}
          <button onClick={onClose} style={{
            flex:1, height:48, borderRadius:999, border:'1px solid rgba(65,72,67,0.45)',
            background:'none', color:'#c1c8c1', fontSize:12, fontWeight:700,
            textTransform:'uppercase', letterSpacing:'0.1em', cursor:'pointer',
            fontFamily:'Manrope,sans-serif',
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pagination — from Stitch storefront_catalog: w-12 h-12 rounded-full circles
// Active: bg-primary (gold gradient), Inactive: glass-glow
// ─────────────────────────────────────────────────────────────────────────────
function Pager({ page, totalPages, onChange }) {
  function nums() {
    const a=[],s=Math.max(1,page-2),e=Math.min(totalPages,page+2);
    if(s>1){a.push(1);if(s>2)a.push('...');}
    for(let i=s;i<=e;i++)a.push(i);
    if(e<totalPages){if(e<totalPages-1)a.push('...');a.push(totalPages);}
    return a;
  }
  const circleBase = {
    width:48, height:48, borderRadius:'50%', border:'none', cursor:'pointer',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontFamily:'Manrope,sans-serif', fontSize:13, fontWeight:600,
    transition:'all 0.2s',
  };
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginTop:40 }}>
      {/* Left arrow — from Stitch: w-12 h-12 rounded-full glass-glow */}
      <button onClick={()=>onChange(p=>p-1)} disabled={page===1} style={{
        ...circleBase,
        background:'rgba(42,56,49,0.55)',
        boxShadow:'inset 0 1px 1px rgba(65,72,67,0.3)',
        color: page===1 ? '#414843' : '#c1c8c1',
        opacity: page===1 ? 0.4 : 1,
        cursor: page===1 ? 'not-allowed' : 'pointer',
      }}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M13 4l-6 6 6 6"/></svg>
      </button>

      {/* Page numbers */}
      <div style={{ display:'flex', gap:8 }}>
        {nums().map((n,i) =>
          n==='...' ? (
            <span key={`e${i}`} style={{ width:48, height:48, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, color:'#8b938c' }}>…</span>
          ) : (
            <button key={n} onClick={()=>onChange(n)} style={{
              ...circleBase,
              // Active: from Stitch: bg-primary text-on-primary font-label font-bold
              background: page===n ? 'linear-gradient(135deg,#e9c349,#ad8b0e)' : 'rgba(42,56,49,0.55)',
              color: page===n ? '#3c2f00' : '#c1c8c1',
              fontWeight: page===n ? 800 : 500,
              boxShadow: page===n ? '0 4px 16px rgba(233,195,73,0.3)' : 'inset 0 1px 1px rgba(65,72,67,0.3)',
              border:'none',
            }}>{n}</button>
          )
        )}
      </div>

      {/* Right arrow */}
      <button onClick={()=>onChange(p=>p+1)} disabled={page===totalPages} style={{
        ...circleBase,
        background:'rgba(42,56,49,0.55)',
        boxShadow:'inset 0 1px 1px rgba(65,72,67,0.3)',
        color: page===totalPages ? '#414843' : '#c1c8c1',
        opacity: page===totalPages ? 0.4 : 1,
        cursor: page===totalPages ? 'not-allowed' : 'pointer',
      }}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M7 4l6 6-6 6"/></svg>
      </button>
    </div>
  );
}

function Loader() {
  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:48 }}>
      <div style={{
        width:28, height:28, border:'2px solid rgba(65,72,67,0.4)',
        borderTopColor:'#e9c349', borderRadius:'50%',
        animation:'spin 0.7s linear infinite',
      }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function ErrMsg({ msg }) {
  return <div style={{ padding:48, textAlign:'center', color:'#ffb4ab', fontSize:14, fontStyle:'italic' }}>{msg}</div>;
}
