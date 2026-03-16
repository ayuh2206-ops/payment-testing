# Razorpay Compliance Checklist
### Maps every mandatory clause to the exact file implementing it

---

## ✅ MANDATORY — Customer-Facing Pages (ToU Part I §6.1 & §6.2)

| Requirement | Clause | File | Status |
|---|---|---|---|
| Display Refund & Return Policy **with timelines** | §6.1(b)(a) | `pages/legal/refund-policy.jsx` | ✅ Done |
| Display Terms of Use | §6.1(b)(b) | `pages/legal/terms.jsx` | ✅ Done |
| Display Privacy Policy | ToU §4 | `pages/legal/privacy-policy.jsx` | ✅ Done |
| Grievance redressal with Grievance Officer details | §6.2 | `pages/legal/grievance.jsx` | ✅ Done |
| Policy links accessible from every page | §6.1(b) | `components/Footer.jsx` | ✅ Done |
| Respond to grievances within **5 business days** | §6.2 | `pages/legal/grievance.jsx` + `pages/api/grievance.js` | ✅ Done |
| Complaints via phone, email, **and** electronic means | §6.2 | `pages/legal/grievance.jsx` (form + contact info) | ✅ Done |

---

## ✅ MANDATORY — Customer Consent (ToU §2.16)

| Requirement | Clause | File | Status |
|---|---|---|---|
| Explicit informed customer consent before payment | §2.16 | `pages/checkout.jsx` — consent checkbox | ✅ Done |
| Consent NOT pre-checked (must be deliberate action) | §2.16 | `pages/checkout.jsx` — `useState(false)` | ✅ Done |
| Payment **blocked** if consent not given | §2.16 | `pages/checkout.jsx` — `consentError` gate | ✅ Done |
| Consent wording covers Razorpay data sharing + affiliates + fraud prevention + RBI | §2.16 | `pages/checkout.jsx` — consent label text | ✅ Done |

---

## ✅ MANDATORY — Payment Data Security (ToU §6.1(iii)(iv))

| Requirement | Clause | File | Status |
|---|---|---|---|
| NEVER store card number, CVV, UPI PIN | §6.1(iii)(iv) | `pages/api/verify-payment.js` — only stores Razorpay IDs | ✅ Done |
| All card data handled exclusively by Razorpay | §6.1(iii) | `pages/checkout.jsx` — Standard Checkout SDK | ✅ Done |
| Security note visible to customers at checkout | §6.1 | `pages/checkout.jsx` — security note box | ✅ Done |
| PCI DSS compliance via Razorpay (not storing data) | §6.3 | `components/Footer.jsx` — PCI badge + statement | ✅ Done |
| Report security breach to razorpay.com/grievances | §6.6 | `pages/legal/privacy-policy.jsx` — §7 Security | ✅ Done |

---

## ✅ MANDATORY — Transaction Record Retention (ToU §2.19)

| Requirement | Clause | File | Status |
|---|---|---|---|
| Retain transaction records for **10 years** | §2.19 | `pages/api/verify-payment.js` — full record logged | ✅ Done |
| Payment ID shown to customer post-purchase | §2.19 | `pages/order-success.jsx` — Payment ID + Order ID | ✅ Done |
| Order ID logged on creation | §2.19 | `pages/api/create-order.js` — notes + console log | ✅ Done |
| Customer info stored with transaction | §2.19 | `pages/api/verify-payment.js` — transactionRecord | ✅ Done |

> **Action required:** Replace `console.log` with actual database writes. Razorpay and government agencies can audit records without prior notice.

---

## ✅ MANDATORY — No Misrepresentation of Razorpay (ToU §2.20 & §14.2(c))

| Requirement | Clause | File | Status |
|---|---|---|---|
| Must NOT claim to be Razorpay's agent/representative | §2.20 | `components/Footer.jsx` — disclaimer text | ✅ Done |
| Must NOT claim Razorpay's liability for your products | §2.20 | `pages/legal/terms.jsx` — §9 Limitation of Liability | ✅ Done |

---

## ✅ MANDATORY — Webhook & Async Events

| Requirement | Clause | File | Status |
|---|---|---|---|
| Handle `payment.captured` | Part I §1 | `pages/api/webhook.js` | ✅ Done |
| Handle `payment.failed` | Part I §4 | `pages/api/webhook.js` | ✅ Done |
| Handle `refund.processed` | Part I §3 | `pages/api/webhook.js` | ✅ Done |
| Handle chargebacks (3-day response window) | Part I §2.1 | `pages/api/webhook.js` — dispute.created | ✅ Done |

---

## ✅ MANDATORY — Razorpay SDK Loading (Bug Fix)

| Requirement | Clause | File | Status |
|---|---|---|---|
| SDK loads with `strategy="afterInteractive"` (not lazyOnload) | Implementation | `pages/checkout.jsx` | ✅ Done |

---

## 🔴 ACTIONS REQUIRED BEFORE GO-LIVE

These are **cannot-ship** blockers your client must complete:

### 1. Fill in all `[placeholders]` in legal pages
Replace every `[Your Business Name]`, `[Your City]`, `[Your Phone]`, `[Your Address]` in:
- `pages/legal/terms.jsx`
- `pages/legal/privacy-policy.jsx`
- `pages/legal/refund-policy.jsx`
- `pages/legal/grievance.jsx`
- `components/Footer.jsx`

### 2. Set environment variables in Vercel
```
RAZORPAY_KEY_ID          → Dashboard → Settings → API Keys
RAZORPAY_KEY_SECRET      → Dashboard → Settings → API Keys
NEXT_PUBLIC_RAZORPAY_KEY_ID → Same as KEY_ID
RAZORPAY_WEBHOOK_SECRET  → Dashboard → Settings → Webhooks
```

### 3. Connect a database for transaction records (§2.19)
Current: `console.log` in `verify-payment.js`
Required: Write to a database. Records must be retained 10 years and auditable by Razorpay/RBI.
Suggested: Supabase (free tier), PlanetScale, or MongoDB Atlas.

### 4. Register webhook URL in Razorpay Dashboard
Path: Dashboard → Settings → Webhooks
URL: `https://your-domain.vercel.app/api/webhook`
Events to select: `payment.captured`, `payment.failed`, `refund.processed`, `payment.dispute.created`

### 5. Wire grievance form to email (§6.2)
Current: `console.log` in `api/grievance.js`
Required: Email goes to your designated Grievance Officer within 24hr of submission.
Suggested: Nodemailer + Gmail SMTP, or Resend.com (free tier), or SendGrid.

### 6. Complete Razorpay KYC (for UPI & higher limits)
Path: Razorpay Dashboard → Home → Activate Account
Required for: UPI payments, higher transaction limits, production key activation.

### 7. GST Registration Number (§3.6)
Add your GSTIN to Razorpay Dashboard before first invoice is generated.
Path: Dashboard → Settings → Business Profile

---

## 📋 Prohibited Products Check (ToU §17)

Ensure your client's products are NOT in this list. Razorpay will terminate without notice if they are:
- Alcohol, tobacco, weapons, drugs
- Crypto / NFTs / virtual currency
- Gambling / lottery / betting
- Adult content
- Counterfeit goods
- Drop-shipped merchandise (§17 item 32)

> ⚠️ Item 32 says **drop-shipped merchandise** is prohibited. If the client uses dropshipping, this must be discussed with Razorpay directly.

---

## 📋 Reconciliation Requirement (ToU §3.4)
You must reconcile transactions **daily**. Discrepancies must be reported to Razorpay within **3 days** of receiving funds. Build a daily reconciliation check using the Razorpay Dashboard or their Settlements API.
