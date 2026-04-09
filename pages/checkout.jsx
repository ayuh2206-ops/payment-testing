// pages/checkout.jsx
// ═══ Checkout — matching Stitch checkout_flow/code.html exactly ═══
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '@/components/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({ email:'', fname:'', lname:'', address:'', city:'', postal:'', phone:'' });
  const [loading, setLoading] = useState(false);
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    width:'100%', background:'transparent', border:'none',
    borderBottom:'1px solid rgba(66,72,66,0.2)', padding:'12px 0',
    fontSize:15, color:'#102a19', outline:'none', fontFamily:'Manrope,sans-serif',
    transition:'border-color 0.3s',
  };
  const labelStyle = {
    fontFamily:'Manrope,sans-serif', fontSize:10, fontWeight:700,
    textTransform:'uppercase', letterSpacing:'0.2em', color:'#424842',
    display:'block', marginBottom:6,
  };

  async function handlePay() {
    if (!form.fname || !form.email || !form.phone || !form.address) return alert('Please fill all fields');
    if (!cart || cart.length === 0) return alert('Cart is empty');
    setLoading(true);
    try {
      const res = await fetch('/api/create-order', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ amount: cartTotal, customer_name: `${form.fname} ${form.lname}`.trim(), customer_email: form.email, customer_phone: form.phone, items: cart }),
      });
      const data = await res.json();
      if (!data.razorpay_order_id) throw new Error(data.error || 'Order creation failed');
      const options = {
        key: data.razorpay_key, amount: data.amount, currency:'INR',
        name:'SB Ayurved', description:'Ayurvedic Products',
        order_id: data.razorpay_order_id, prefill: { name: `${form.fname} ${form.lname}`, email: form.email, contact: form.phone },
        handler: async function(response) {
          const verify = await fetch('/api/verify-payment', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...response, order_ref: data.order_ref }) });
          const vd = await verify.json();
          if (vd.success) { clearCart && clearCart(); router.push(`/order-success?ref=${data.order_ref}`); }
          else alert('Payment verification failed');
        },
        theme: { color:'#102a19' },
      };
      const rzp = new (window).Razorpay(options);
      rzp.open();
    } catch(e) { alert(e.message); }
    finally { setLoading(false); }
  }

  const items = cart && cart.length > 0 ? cart : [];
  const total = cartTotal || 0;

  return (
    <>
      <Head>
        <title>Checkout | SB Ayurved</title>
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </Head>

      <div style={{ background:'#FCFCF9', color:'#1a1c1b', minHeight:'100vh', position:'relative', overflow:'hidden' }}>
        {/* Atmospheric blobs — from Stitch */}
        <div className="botanical-blob" style={{ top:'-10%', left:'-10%', width:'50%', height:'50%', background:'rgba(213,227,216,0.3)' }} />
        <div className="botanical-blob" style={{ bottom:'-10%', right:'-10%', width:'40%', height:'40%', background:'rgba(16,42,25,0.04)' }} />

        {/* Header — from Stitch: brand + back link */}
        <header style={{ width:'100%', maxWidth:1280, margin:'0 auto', padding:'48px 32px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <Link href="/"><span style={{ fontFamily:'Newsreader,serif', fontSize:24, fontWeight:700, color:'#735c00' }}>SB Ayurved</span></Link>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'Manrope,sans-serif', fontSize:12, textTransform:'uppercase', letterSpacing:'0.15em', color:'#424842', transition:'color 0.3s' }}>
            <span className="material-symbols-outlined" style={{ fontSize:14 }}>arrow_back</span>
            Back to Shop
          </Link>
        </header>

        {/* Main — from Stitch: grid 7/5 */}
        <main style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px 96px', display:'grid', gridTemplateColumns:'7fr 5fr', gap:48, alignItems:'start' }} className="checkout-grid">

          {/* LEFT: Shipping Form — from Stitch: glass-directional rounded-[2.5rem] p-16 */}
          <div className="liquid-glass" style={{
            borderRadius:40, padding:'clamp(32px,5vw,64px)',
            boxShadow:'0 40px 80px -10px rgba(16,42,25,0.08)',
          }}>
            <h1 style={{ fontFamily:'Newsreader,serif', fontSize:'clamp(32px,4vw,48px)', color:'#102a19', marginBottom:48, letterSpacing:'-0.02em' }}>Shipping Details</h1>

            <form onSubmit={e => e.preventDefault()} style={{ display:'flex', flexDirection:'column', gap:40 }}>
              {/* Contact — from Stitch: gold label */}
              <section>
                <h2 style={{ fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.2em', color:'#735c00', marginBottom:24, fontWeight:700 }}>Contact Information</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:32 }}>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input value={form.email} onChange={up('email')} type="email" placeholder="you@email.com" style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor='#102a19'} onBlur={e => e.target.style.borderBottomColor='rgba(66,72,66,0.2)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input value={form.phone} onChange={up('phone')} type="tel" placeholder="+91 XXXXX XXXXX" style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor='#102a19'} onBlur={e => e.target.style.borderBottomColor='rgba(66,72,66,0.2)'} />
                  </div>
                </div>
              </section>

              {/* Shipping — from Stitch: grid 2col */}
              <section>
                <h2 style={{ fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.2em', color:'#735c00', marginBottom:24, fontWeight:700 }}>Shipping Address</h2>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px 32px' }} className="form-2col">
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input value={form.fname} onChange={up('fname')} placeholder="First name" style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor='#102a19'} onBlur={e => e.target.style.borderBottomColor='rgba(66,72,66,0.2)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input value={form.lname} onChange={up('lname')} placeholder="Last name" style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor='#102a19'} onBlur={e => e.target.style.borderBottomColor='rgba(66,72,66,0.2)'} />
                  </div>
                  <div style={{ gridColumn:'1 / -1' }}>
                    <label style={labelStyle}>Address</label>
                    <input value={form.address} onChange={up('address')} placeholder="Street address" style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor='#102a19'} onBlur={e => e.target.style.borderBottomColor='rgba(66,72,66,0.2)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>City</label>
                    <input value={form.city} onChange={up('city')} placeholder="City" style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor='#102a19'} onBlur={e => e.target.style.borderBottomColor='rgba(66,72,66,0.2)'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Postal Code</label>
                    <input value={form.postal} onChange={up('postal')} placeholder="440009" style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor='#102a19'} onBlur={e => e.target.style.borderBottomColor='rgba(66,72,66,0.2)'} />
                  </div>
                </div>
              </section>

              {/* Payment — from Stitch: glass card with VISA/MC badges */}
              <section>
                <h2 style={{ fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.2em', color:'#735c00', marginBottom:24, fontWeight:700 }}>Payment Method</h2>
                <div className="liquid-glass" style={{
                  padding:24, borderRadius:16, marginBottom:8,
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                    <span className="material-symbols-outlined" style={{ color:'#102a19' }}>credit_card</span>
                    <span style={{ fontFamily:'Manrope,sans-serif', fontSize:14 }}>Secure Razorpay Payment</span>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    {['UPI','VISA','MC'].map(b => (
                      <div key={b} style={{ width:36, height:22, background:'rgba(26,28,27,0.05)', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, fontWeight:700 }}>{b}</div>
                    ))}
                  </div>
                </div>
              </section>
            </form>
          </div>

          {/* RIGHT: Order Summary — from Stitch: glass rounded-[2.5rem] sticky top-28 */}
          <aside style={{ position:'sticky', top:112 }}>
            <div style={{
              background:'rgba(255,255,255,0.6)', backdropFilter:'blur(48px)', WebkitBackdropFilter:'blur(48px)',
              borderRadius:40, padding:40,
              borderTop:'1.5px solid rgba(255,255,255,0.9)', borderLeft:'1.5px solid rgba(255,255,255,0.9)',
              borderBottom:'1.5px solid rgba(255,255,255,0.4)', borderRight:'1.5px solid rgba(255,255,255,0.4)',
              boxShadow:'0 30px 60px -15px rgba(16,42,25,0.05)',
            }}>
              <h3 style={{ fontFamily:'Newsreader,serif', fontSize:24, color:'#102a19', marginBottom:32 }}>Order Summary</h3>

              {/* Item list */}
              <div style={{ display:'flex', flexDirection:'column', gap:24, marginBottom:40 }}>
                {items.length === 0 ? (
                  <p style={{ fontFamily:'Manrope,sans-serif', fontSize:14, color:'#424842', fontStyle:'italic', textAlign:'center', padding:24 }}>Your cart is empty</p>
                ) : items.map((item, i) => (
                  <div key={i} style={{ display:'flex', gap:16, alignItems:'center' }}>
                    <div style={{
                      width:64, height:64, borderRadius:16, overflow:'hidden', flexShrink:0,
                      background:'rgba(213,227,216,0.3)', border:'1px solid rgba(255,255,255,0.4)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>
                      <span style={{ fontSize:24 }}>{item.emoji || '🌿'}</span>
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontFamily:'Newsreader,serif', fontSize:16, color:'#102a19' }}>{item.name}</p>
                      <p style={{ fontFamily:'Manrope,sans-serif', fontSize:10, color:'rgba(66,72,66,0.6)', textTransform:'uppercase', letterSpacing:'0.12em' }}>
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <p style={{ fontFamily:'Manrope,sans-serif', fontSize:14, fontWeight:600 }}>₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              {/* Totals — from Stitch: border-t, space-y-4 */}
              <div style={{ borderTop:'1px solid rgba(66,72,66,0.1)', paddingTop:32, display:'flex', flexDirection:'column', gap:16, marginBottom:40 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'Manrope,sans-serif', fontSize:14, color:'#424842' }}>
                  <span>Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'Manrope,sans-serif', fontSize:14, color:'#424842' }}>
                  <span>Shipping</span><span style={{ color:'#735c00' }}>Calculated at next step</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', paddingTop:16, fontFamily:'Newsreader,serif', fontSize:24, color:'#102a19' }}>
                  <span>Total</span><span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* CTA — from Stitch: gold bg-tertiary-container rounded-full uppercase */}
              <button onClick={handlePay} disabled={loading || items.length === 0} style={{
                width:'100%', padding:'20px 32px', borderRadius:9999, border:'none',
                background: items.length > 0 ? 'linear-gradient(135deg, #cca830, #e9c349)' : '#e2e3e0',
                color: items.length > 0 ? '#4f3e00' : '#737972',
                fontFamily:'Manrope,sans-serif', fontSize:12, fontWeight:700,
                textTransform:'uppercase', letterSpacing:'0.2em',
                cursor: items.length > 0 ? 'pointer' : 'not-allowed',
                boxShadow: items.length > 0 ? '0 12px 24px rgba(204,168,48,0.2)' : 'none',
                display:'flex', alignItems:'center', justifyContent:'center', gap:12,
                transition:'all 0.3s',
              }}>
                {loading ? 'Processing...' : 'Complete Purchase'}
                <span className="material-symbols-outlined" style={{ fontSize:16 }}>arrow_forward</span>
              </button>
              <p style={{ textAlign:'center', marginTop:24, fontFamily:'Manrope,sans-serif', fontSize:10, textTransform:'uppercase', letterSpacing:'0.15em', color:'rgba(66,72,66,0.4)', display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
                <span className="material-symbols-outlined" style={{ fontSize:10 }}>lock</span>
                Encrypted SSL Secure Checkout
              </p>
            </div>

            {/* Quote — from Stitch: italic font-headline border rounded-3xl */}
            <div style={{
              marginTop:32, padding:'32px 24px', borderRadius:28,
              border:'1px solid rgba(255,255,255,0.2)', background:'rgba(16,42,25,0.03)',
              fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:15,
              color:'rgba(16,42,25,0.6)', textAlign:'center', lineHeight:1.7,
            }}>
              "Each SB Ayurved formulation is crafted following Shastrokt principles to ensure authentic botanical potency."
            </div>
          </aside>
        </main>

        {/* Footer */}
        <footer style={{ width:'100%', paddingTop:80, paddingBottom:40, background:'#FCFCF9', borderTop:'1px solid rgba(213,227,216,0.2)' }}>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'flex-end', gap:32 }}>
            <div style={{ maxWidth:360 }}>
              <span style={{ fontFamily:'Newsreader,serif', fontStyle:'italic', fontSize:20, color:'#102a19', display:'block', marginBottom:8 }}>SB Ayurved</span>
              <p style={{ fontFamily:'Manrope,sans-serif', fontSize:13, color:'rgba(66,72,66,0.5)', maxWidth:320, lineHeight:1.7 }}>
                Crafting authentic Ayurvedic formulations through the intersection of classical Vaidya wisdom and modern manufacturing.
              </p>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:32, fontFamily:'Manrope,sans-serif', fontSize:12, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(66,72,66,0.5)' }}>
              {[{t:'Privacy',h:'/privacy'},{t:'Terms',h:'/terms'},{t:'Shipping',h:'/terms'},{t:'Contact',h:'/contact'}].map(l => (
                <Link key={l.t} href={l.h} style={{ transition:'color 0.2s' }}>{l.t}</Link>
              ))}
            </div>
          </div>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 32px 0', fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(66,72,66,0.3)' }}>
            © 2025 Shree Brahmachaitanya Ayurved. All rights reserved.
          </div>
        </footer>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
