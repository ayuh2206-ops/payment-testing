// components/CartDrawer.jsx
// ═══ Cart Drawer — matching Stitch cart_drawer/code.html exactly ═══
// Design: glass sidebar sliding from right, backdrop blur, directional light borders,
// botanical gradient separators, gold CTA, green-tinted shadows
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/router';

export default function CartDrawer({ open, onClose }) {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  if (!open) return null;

  const items = cart || [];
  const total = cartTotal || 0;

  return (
    <>
      {/* ═══ OVERLAY — from Stitch: fixed inset-0 z-50 flex justify-end ═══ */}
      <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', justifyContent:'flex-end' }}>

        {/* Backdrop — from Stitch: bg-primary-container/10 backdrop-blur-sm */}
        <div onClick={onClose} style={{
          position:'absolute', inset:0,
          background:'rgba(16,42,25,0.1)', backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)',
        }} />

        {/* ═══ THE DRAWER — from Stitch: bg-secondary-container/60 backdrop-blur-3xl shadow border-l border-white/40 ═══ */}
        <aside style={{
          position:'relative', width:'100%', maxWidth:420, height:'100%',
          background:'rgba(213,227,216,0.6)',
          backdropFilter:'blur(48px)', WebkitBackdropFilter:'blur(48px)',
          boxShadow:'-20px 0 80px rgba(16,42,25,0.1)',
          borderLeft:'1px solid rgba(255,255,255,0.4)',
          display:'flex', flexDirection:'column',
        }}>

          {/* ── Header — from Stitch: px-8 pt-10 pb-6 ── */}
          <div style={{ padding:'40px 32px 24px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
            <div>
              <span style={{ fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em', color:'rgba(16,42,25,0.5)', display:'block', marginBottom:8 }}>Your Selection</span>
              <h2 style={{ fontFamily:'Newsreader,serif', fontSize:32, fontStyle:'italic', color:'#102a19' }}>
                Cart ({items.reduce((s, i) => s + (i.quantity || 1), 0)})
              </h2>
            </div>
            <button onClick={onClose} style={{
              padding:8, background:'none', border:'none', cursor:'pointer',
              transition:'transform 0.5s', color:'#102a19',
            }}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* ── Scrollable Items — from Stitch: flex-1 overflow-y-auto px-8 space-y-12 ── */}
          <div style={{ flex:1, overflowY:'auto', padding:'32px 32px', display:'flex', flexDirection:'column', gap:48 }}>

            {items.length === 0 ? (
              <div style={{ textAlign:'center', padding:'64px 0' }}>
                <span className="material-symbols-outlined" style={{ fontSize:48, color:'rgba(16,42,25,0.15)', display:'block', marginBottom:16 }}>shopping_bag</span>
                <p style={{ fontFamily:'Newsreader,serif', fontSize:20, fontStyle:'italic', color:'rgba(16,42,25,0.3)' }}>Your cart is empty</p>
                <p style={{ fontSize:13, color:'rgba(66,72,66,0.4)', marginTop:8 }}>Browse our botanical treasury</p>
              </div>
            ) : (
              <>
                {items.map((item, i) => (
                  <div key={i} style={{ display:'flex', gap:24 }}>
                    {/* Image — from Stitch: w-24 h-32 rounded-2xl glass-directional p-1 */}
                    <div style={{
                      width:96, height:128, borderRadius:16, overflow:'hidden', flexShrink:0,
                      background:'rgba(213,227,216,0.4)', backdropFilter:'blur(40px)',
                      borderTop:'1px solid rgba(255,255,255,0.8)', borderLeft:'1px solid rgba(255,255,255,0.8)',
                      borderBottom:'1px solid rgba(255,255,255,0.2)', borderRight:'1px solid rgba(255,255,255,0.2)',
                      padding:4, display:'flex', alignItems:'center', justifyContent:'center',
                    }}>
                      <span style={{ fontSize:36 }}>{item.emoji || '🌿'}</span>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', flex:1, padding:'4px 0' }}>
                      <div>
                        <h3 style={{ fontFamily:'Newsreader,serif', fontSize:18, color:'#102a19' }}>{item.name}</h3>
                        <p style={{ fontFamily:'Manrope,sans-serif', fontSize:10, color:'#424842', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:4 }}>
                          {item.category || 'Classical Formulation'}
                        </p>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        {/* Qty control — from Stitch: bg-white/30 px-3 py-1.5 rounded-full border-white/40 */}
                        <div style={{
                          display:'flex', alignItems:'center', gap:16,
                          background:'rgba(255,255,255,0.3)', padding:'6px 12px',
                          borderRadius:9999, border:'1px solid rgba(255,255,255,0.4)',
                        }}>
                          <button onClick={() => {
                            if ((item.quantity || 1) <= 1) removeFromCart(item.id || item.sku);
                            else updateQuantity(item.id || item.sku, (item.quantity || 1) - 1);
                          }} style={{ background:'none', border:'none', cursor:'pointer', color:'#102a19', padding:0, display:'flex' }}>
                            <span className="material-symbols-outlined" style={{ fontSize:18 }}>remove</span>
                          </button>
                          <span style={{ fontFamily:'Manrope,sans-serif', fontSize:13, fontWeight:700, width:16, textAlign:'center' }}>{item.quantity || 1}</span>
                          <button onClick={() => updateQuantity(item.id || item.sku, (item.quantity || 1) + 1)}
                            style={{ background:'none', border:'none', cursor:'pointer', color:'#102a19', padding:0, display:'flex' }}>
                            <span className="material-symbols-outlined" style={{ fontSize:18 }}>add</span>
                          </button>
                        </div>
                        <span style={{ fontFamily:'Newsreader,serif', fontSize:18, color:'#102a19' }}>
                          ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Botanical separator — from Stitch: gradient line */}
                <div style={{ padding:'16px 0' }}>
                  <div style={{ height:1, width:'100%', background:'linear-gradient(to right, transparent, rgba(16,42,25,0.1), transparent)' }} />
                </div>
              </>
            )}
          </div>

          {/* ── Footer / Totals — from Stitch: px-8 pt-6 pb-10 bg-white/20 border-t border-white/40 ── */}
          <div style={{
            padding:'24px 32px 40px',
            background:'rgba(255,255,255,0.2)',
            borderTop:'1px solid rgba(255,255,255,0.4)',
            backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
          }}>
            <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:32 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'Manrope,sans-serif', fontSize:14, color:'#424842' }}>
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'Manrope,sans-serif', fontSize:14, color:'#424842' }}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div style={{ paddingTop:16, display:'flex', justifyContent:'space-between', alignItems:'flex-end', borderTop:'1px solid rgba(16,42,25,0.05)' }}>
                <span style={{ fontFamily:'Newsreader,serif', fontSize:22, fontStyle:'italic', color:'#102a19' }}>Total</span>
                <span style={{ fontFamily:'Newsreader,serif', fontSize:28, color:'#102a19' }}>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* CTA — from Stitch: w-full bg-primary-container text-on-primary rounded-full py-5 shadow-2xl */}
            <button
              onClick={() => { onClose(); router.push('/checkout'); }}
              disabled={items.length === 0}
              style={{
                width:'100%', padding:'20px 32px', borderRadius:9999, border:'none',
                background: items.length > 0 ? '#102a19' : '#e2e3e0',
                color: items.length > 0 ? '#fff' : '#737972',
                fontFamily:'Manrope,sans-serif', fontSize:11, fontWeight:700,
                textTransform:'uppercase', letterSpacing:'0.2em',
                cursor: items.length > 0 ? 'pointer' : 'not-allowed',
                boxShadow: items.length > 0 ? '0 20px 40px rgba(16,42,25,0.15)' : 'none',
                display:'flex', justifyContent:'space-between', alignItems:'center',
                transition:'all 0.3s', position:'relative', overflow:'hidden',
              }}
            >
              <span style={{ position:'relative', zIndex:1 }}>Proceed to Checkout</span>
              <div style={{ display:'flex', alignItems:'center', gap:8, position:'relative', zIndex:1 }}>
                <span style={{ fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:16, color:'rgba(233,195,73,0.8)' }}>Razorpay</span>
                <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_forward</span>
              </div>
            </button>
            <p style={{ textAlign:'center', marginTop:24, fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.15em', color:'rgba(66,72,66,0.5)' }}>
              Free shipping on orders above ₹500
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
