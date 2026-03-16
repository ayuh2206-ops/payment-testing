// pages/legal/privacy-policy.jsx
// REQUIRED: Merchant must have their OWN privacy policy
// Razorpay ToU §4, IT (Amendment) Act 2008, DPDPA 2023
import LegalLayout from "@/components/LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="March 2026">

      <div className="highlight-box">
        This Privacy Policy explains how <strong>[Your Business Name]</strong> collects, uses,
        and protects your personal information when you shop with us. Payments are processed
        by Razorpay — a PCI DSS Level 1 certified gateway — and are subject to{" "}
        <a href="https://razorpay.com/privacy/" target="_blank" rel="noreferrer">
          Razorpay's Privacy Policy
        </a> as well.
      </div>

      <h2>1. Information We Collect</h2>
      <p>When you place an order or contact us, we collect:</p>
      <ul>
        <li><strong>Identity data:</strong> name, email address, phone number</li>
        <li><strong>Delivery data:</strong> shipping address, city, PIN code</li>
        <li><strong>Transaction data:</strong> order ID, amount, Razorpay payment ID, payment status</li>
        <li><strong>Technical data:</strong> IP address, browser type, device type (for fraud prevention)</li>
      </ul>
      <p>
        <strong>We do not collect or store</strong> your card number, CVV, UPI PIN, or any
        sensitive payment credentials. All payment data is handled exclusively by Razorpay
        in compliance with PCI DSS standards.
      </p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To process and fulfil your orders</li>
        <li>To send order confirmations and delivery updates</li>
        <li>To handle returns, refunds, and customer support queries</li>
        <li>To comply with legal obligations, including RBI and tax regulations</li>
        <li>To detect and prevent fraudulent transactions</li>
        <li>To improve our website and customer experience</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>We share your personal data only in the following cases:</p>
      <ul>
        <li>
          <strong>Razorpay:</strong> Your name, email, phone, and order amount are shared
          with Razorpay to process your payment. By proceeding to checkout, you explicitly
          consent to this sharing as required under Razorpay's Terms of Use §2.16.
          Razorpay may share your data with partner banks, financial institutions, and
          regulatory authorities as required by RBI guidelines.
        </li>
        <li>
          <strong>Delivery partners:</strong> Your name, phone, and address are shared
          with our logistics partner solely to fulfil your delivery.
        </li>
        <li>
          <strong>Legal compliance:</strong> We may disclose your data to government
          authorities or law enforcement agencies when required by applicable law.
        </li>
      </ul>
      <p>We do <strong>not</strong> sell your personal data to third parties.</p>

      <h2>4. Data Retention</h2>
      <p>
        We retain transaction records for a minimum of <strong>10 years</strong> from the
        date of the transaction, as required under Razorpay's merchant terms and applicable
        Indian law. Order and customer data is retained for as long as necessary to
        provide services or as required by law.
      </p>

      <h2>5. Cookies</h2>
      <p>
        Our website uses session cookies to maintain your shopping cart and improve your
        browsing experience. We do not use tracking cookies for advertising. You may
        disable cookies in your browser settings, though this may affect cart functionality.
      </p>

      <h2>6. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data (subject to legal retention requirements)</li>
        <li>Withdraw consent to marketing communications at any time</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at{" "}
        <a href="mailto:privacy@yourdomain.com">privacy@yourdomain.com</a>.
      </p>

      <h2>7. Security</h2>
      <p>
        We implement industry-standard security measures to protect your data. However,
        no internet transmission is 100% secure. If you suspect a security breach involving
        your data, please contact us immediately at{" "}
        <a href="mailto:grievance@yourdomain.com">grievance@yourdomain.com</a>.
        We will also notify Razorpay at{" "}
        <a href="https://razorpay.com/grievances/" target="_blank" rel="noreferrer">
          razorpay.com/grievances
        </a>{" "}
        as required under our merchant agreement.
      </p>

      <h2>8. Third-Party Links</h2>
      <p>
        Our site may link to third-party websites. We are not responsible for their privacy
        practices. We recommend reviewing the privacy policy of any site you visit.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. The "Last updated" date at the top
        will reflect any changes. Continued use of our site constitutes acceptance of the
        updated policy.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        This Privacy Policy is governed by the laws of India including the Information
        Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.
        Disputes shall be subject to the jurisdiction of courts in [Your City], India.
      </p>

      <h2>11. Contact</h2>
      <div className="contact-card">
        <strong>Privacy / Data Queries</strong>
        Email: <a href="mailto:privacy@yourdomain.com">privacy@yourdomain.com</a><br />
        For grievances: <a href="/legal/grievance">Grievance Redressal</a>
      </div>

    </LegalLayout>
  );
}
