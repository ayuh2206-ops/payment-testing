# 🛒 Razorpay × Next.js — Deploy-Ready Store

## ✅ Is the code ready for your Vercel API keys?

**YES — 100%.** The only thing you need to do is paste 4 values into Vercel's
Environment Variables. Zero code changes required.

---

## 🔑 Step 1 — Add these 4 keys in Vercel

Go to: **Vercel → Your Project → Settings → Environment Variables**

| Variable Name                    | Where to get it                                         |
|----------------------------------|---------------------------------------------------------|
| `RAZORPAY_KEY_ID`                | Razorpay Dashboard → Settings → API Keys               |
| `RAZORPAY_KEY_SECRET`            | Razorpay Dashboard → Settings → API Keys               |
| `RAZORPAY_WEBHOOK_SECRET`        | Razorpay Dashboard → Settings → Webhooks → Secret      |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID`    | Same as `RAZORPAY_KEY_ID` (this one goes to the browser)|

> ⚠️ Use `rzp_test_...` keys for testing. Switch to `rzp_live_...` when going live.

---

## 🚀 Step 2 — Deploy to Vercel

### Option A — GitHub (recommended)
1. Push this folder to a GitHub repo
2. Import repo in Vercel → it auto-detects Next.js
3. Add the 4 env vars above
4. Click Deploy ✅

### Option B — Vercel CLI
```bash
npm install -g vercel
cd razorpay-nextjs-store
vercel
```

---

## 🪝 Step 3 — Register Webhook (after deploy)

In Razorpay Dashboard → Settings → Webhooks → Add New:
- **URL**: `https://your-project.vercel.app/api/webhook`
- **Events**: `payment.captured`, `payment.failed`, `refund.processed`
- Copy the generated **Webhook Secret** → paste into Vercel env as `RAZORPAY_WEBHOOK_SECRET`

---

## 🧪 Test Cards (Razorpay Sandbox)

| Card Number          | Result             |
|----------------------|--------------------|
| 4111 1111 1111 1111  | ✅ Payment success |
| 5267 3181 8797 5449  | ✅ Payment success |
| 4000 0000 0000 0002  | ❌ Card declined   |

Expiry: any future date · CVV: any 3 digits · OTP: 1234

---

## 📁 File Structure

```
razorpay-nextjs-store/
├── .env.local.example          ← Copy → .env.local for local dev
├── package.json
├── next.config.js
├── styles/
│   └── globals.css             ← Full design system
├── lib/
│   └── razorpay.js             ← Razorpay SDK singleton
├── components/
│   ├── CartContext.jsx         ← Global cart state
│   ├── Navbar.jsx              ← Top nav with cart button
│   ├── CartDrawer.jsx          ← Slide-out cart
├── pages/
│   ├── _app.js                 ← App wrapper
│   ├── index.jsx               ← Product listing page
│   ├── checkout.jsx            ← Checkout + Razorpay integration
│   ├── order-success.jsx       ← Post-payment confirmation
│   └── api/
│       ├── create-order.js     ← POST /api/create-order
│       ├── verify-payment.js   ← POST /api/verify-payment
│       └── webhook.js          ← POST /api/webhook
```

---

## 💰 Payment Flow

```
User clicks "Pay Securely"
        │
        ▼
POST /api/create-order          Server sets amount — client cannot tamper
        │ returns order_id
        ▼
Razorpay Popup opens            User pays via Card / UPI / Wallet
        │
        ▼
handler() callback fires        Razorpay returns 3 cryptographic tokens
        │
        ▼
POST /api/verify-payment        HMAC-SHA256 signature verified server-side
        │ ✅ authentic
        ▼
Redirect → /order-success       Cart cleared, order confirmed

(independently, async)
        ▼
POST /api/webhook               Razorpay server → your server confirmation
                                Handles captures, failures, refunds
```

---

## 🔐 Security Checklist

- ✅ Amount set **server-side** — client cannot modify it
- ✅ **HMAC-SHA256** signature verified before confirming order
- ✅ Webhook signature verified before processing events
- ✅ `RAZORPAY_KEY_SECRET` **never exposed** to the browser
- ✅ Raw body used for webhook verification (not parsed)
- ✅ All API routes validate input before processing

---

## 🛠 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up env
cp .env.local.example .env.local
# Fill in your Razorpay test keys

# 3. Run dev server
npm run dev
# → http://localhost:3000
```
