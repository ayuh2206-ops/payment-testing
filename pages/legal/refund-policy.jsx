// pages/legal/refund-policy.jsx
// REQUIRED by Razorpay ToU Part I §6.1(b): display return/refund policy WITH timelines
import LegalLayout from "@/components/LegalLayout";

export default function RefundPolicy() {
  return (
    <LegalLayout title="Refund & Return Policy" lastUpdated="March 2026">

      <div className="highlight-box">
        <strong>Quick Summary:</strong> 7-day returns on eligible items. Refunds processed
        within 5–7 business days to your original payment method via Razorpay.
      </div>

      <h2>1. Return Eligibility</h2>
      <p>Returns are accepted within <strong>7 calendar days of delivery</strong> if:</p>
      <ul>
        <li>The item is unused, in original packaging, with all tags intact</li>
        <li>The item is defective, damaged in transit, or significantly different from description</li>
        <li>You received an incorrect item</li>
      </ul>
      <p><strong>Not eligible for return:</strong></p>
      <ul>
        <li>Used, worn, or tampered items</li>
        <li>Returns requested after 7 days of delivery</li>
        <li>Digital goods once accessed or downloaded</li>
        <li>Items marked "Final Sale" or "Non-Returnable"</li>
      </ul>

      <h2>2. How to Initiate a Return</h2>
      <p>Email us within the return window:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:support@yourdomain.com">support@yourdomain.com</a></li>
        <li><strong>Subject:</strong> Return Request – [Your Order ID]</li>
        <li><strong>Include:</strong> Order ID, reason, and photos if the item is damaged</li>
      </ul>
      <p>We will respond within <strong>2 business days</strong> with return instructions.</p>

      <h2>3. Refund Timelines</h2>
      <p>Once we receive and inspect the returned item:</p>
      <ul>
        <li>Inspection: within 2 business days of receipt</li>
        <li>Refund initiated: within <strong>5–7 business days</strong> of approval</li>
        <li>Credit to your account: additional 2–5 business days depending on your bank/card issuer</li>
      </ul>
      <p>
        All refunds are processed via <strong>Razorpay</strong> back to the original
        payment instrument used (card, UPI, wallet, etc.) as per Razorpay's policy.
        Partial refunds may apply if only part of the order is returned.
      </p>

      <h2>4. Cancellations</h2>
      <p>
        You may cancel an order within <strong>2 hours of placement</strong> at no cost.
        After this window, the order may have been dispatched and the return process applies.
        Email <a href="mailto:support@yourdomain.com">support@yourdomain.com</a> immediately with your Order ID.
      </p>

      <h2>5. Damaged or Wrong Items</h2>
      <p>
        Report damaged or incorrect items within <strong>48 hours of delivery</strong>
        with photographic evidence. We will arrange a replacement or full refund at no
        additional cost to you, including return shipping.
      </p>

      <h2>6. Shipping Costs</h2>
      <ul>
        <li><strong>Our error</strong> (wrong or damaged item): We cover return shipping</li>
        <li><strong>Change of mind:</strong> Customer covers return shipping</li>
      </ul>

      <h2>7. Contact</h2>
      <div className="contact-card">
        <strong>Customer Support</strong>
        Email: <a href="mailto:support@yourdomain.com">support@yourdomain.com</a><br />
        Response: Within 2 business days<br />
        Escalation: <a href="/legal/grievance">Grievance Redressal</a> (within 5 business days)
      </div>

    </LegalLayout>
  );
}
