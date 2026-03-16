// pages/legal/terms.jsx
// REQUIRED by Razorpay ToU Part I §6.1(b): display general terms of use to customers
import LegalLayout from "@/components/LegalLayout";

export default function TermsOfUse() {
  return (
    <LegalLayout title="Terms of Use" lastUpdated="March 2026">

      <div className="highlight-box">
        By using this website and making purchases, you agree to these Terms. Please read
        them carefully. Payments are processed by Razorpay and subject to their{" "}
        <a href="https://razorpay.com/terms/" target="_blank" rel="noreferrer">Terms of Use</a>.
      </div>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing this website or placing an order, you agree to these Terms of Use
        and our <a href="/legal/privacy-policy">Privacy Policy</a> and{" "}
        <a href="/legal/refund-policy">Refund Policy</a>. If you disagree, please do not
        use this site.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be 18 years or older and legally capable of entering into binding contracts
        under Indian law to make purchases on this site.
      </p>

      <h2>3. Products &amp; Pricing</h2>
      <p>
        All prices are in Indian Rupees (INR) and inclusive of applicable taxes unless
        stated otherwise. We reserve the right to modify prices or discontinue products
        at any time. In case of a pricing error, we may cancel and refund the order.
      </p>

      <h2>4. Orders &amp; Payment</h2>
      <p>
        Orders are subject to availability and acceptance. All payments are processed
        securely through <strong>Razorpay</strong> (PCI DSS Level 1 certified).
        We <strong>do not store</strong> your card number, CVV, or UPI PIN — these are
        handled directly and exclusively by Razorpay.
      </p>
      <p>
        By completing checkout, you explicitly consent to your name, email, phone, and
        order details being shared with Razorpay and its affiliated financial institutions
        for payment processing, fraud prevention, and regulatory compliance, as required
        under Razorpay Terms of Use §2.16.
      </p>

      <h2>5. Delivery</h2>
      <p>
        Estimated delivery times are displayed at checkout. We are not liable for delays
        caused by courier partners, natural events, or circumstances beyond our control.
        Risk passes to you upon confirmed delivery.
      </p>

      <h2>6. Refunds &amp; Returns</h2>
      <p>
        Our full return and refund policy — including timelines — is available at{" "}
        <a href="/legal/refund-policy">Refund &amp; Return Policy</a>. Refunds are processed
        to the original payment method via Razorpay within 5–7 business days of approval.
      </p>

      <h2>7. Prohibited Use</h2>
      <p>You agree not to use this site to:</p>
      <ul>
        <li>Conduct fraudulent or unlawful transactions</li>
        <li>Purchase any product prohibited under Razorpay terms (crypto, gambling, weapons, adult content, etc.)</li>
        <li>Submit false information during checkout</li>
        <li>Attempt to circumvent our payment or security systems</li>
      </ul>

      <h2>8. Intellectual Property</h2>
      <p>
        All content on this site is owned by us or licensed to us. You may not reproduce,
        distribute, or create derivative works without prior written permission.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        Our liability for any claim shall not exceed the amount you paid for the specific
        product. We are not liable for indirect, incidental, or consequential damages, nor
        for Razorpay service availability or payment gateway performance.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms are governed by the laws of India. All disputes are subject to
        the exclusive jurisdiction of courts in [Your City], India.
      </p>

      <h2>11. Grievance Redressal</h2>
      <p>
        All complaints are responded to within <strong>5 business days</strong> as
        required under the RBI Payment Aggregator Guidelines.
        See <a href="/legal/grievance">Grievance Redressal</a> for details.
      </p>

      <h2>12. Changes to Terms</h2>
      <p>
        We may update these Terms at any time. Continued use after changes constitutes
        acceptance of the revised Terms.
      </p>

    </LegalLayout>
  );
}
