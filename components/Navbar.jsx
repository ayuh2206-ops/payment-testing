// components/Navbar.jsx
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="logo">Secure<span>Pay</span> Store</Link>
          <div className="nav-links">
            <Link href="/">Shop</Link>
            <a href="#">About</a>
            <a href="#">Support</a>
          </div>
          <button className="cart-btn" onClick={() => setOpen(true)}>
            🛒 Cart {count > 0 && <span style={{background:"var(--accent)",color:"#041a12",borderRadius:"50%",width:18,height:18,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700}}>{count}</span>}
          </button>
        </div>
      </nav>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
