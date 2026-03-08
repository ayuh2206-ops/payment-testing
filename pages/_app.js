import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartContext";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Navbar />
      <Component {...pageProps} />
      <footer>
        Secured by <strong>Razorpay</strong> · 256-bit AES encryption · PCI DSS Level 1
      </footer>
    </CartProvider>
  );
}
