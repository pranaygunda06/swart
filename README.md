# SWART — Hyperlocal Kirana Commerce Platform

**Demo version** of the full SWART product specification.

Firebase-powered hyperlocal marketplace for independent neighborhood Kirana stores.

## Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui
- **Backend**: Firebase Auth, Firestore, Storage, Cloud Functions
- **Auth**: Phone OTP + Email/Password
- **Payments**: Razorpay-ready abstraction
- **Search**: Provider abstraction (ready for Algolia/Typesense)

## Quick Start (Demo)

```bash
# 1. Install
npm install

# 2. Copy env
cp .env.example .env.local
# Fill Firebase web config (or leave empty to use emulators)

# 3. Start Firebase Emulators (recommended for demo)
npm run emulators

# 4. In another terminal
npm run dev
```

Open http://localhost:3000

## Roles

| Role            | Access                                      |
|-----------------|---------------------------------------------|
| CUSTOMER        | Home, Search, Stores, Cart, Orders, Profile |
| VENDOR          | Store management, Products, Orders, Sales   |
| INTERNAL_ADMIN  | Private ops (not in public navigation)      |

## Core Business Rules Implemented

- One order = one store
- Vendor controls price, inventory, delivery fees
- Quick Delivery (optional, vendor fee, <30 min target)
- Scheduled Delivery (min 2h, max 7 days)
- Inventory never goes negative (transactional)
- Server-side quote & order creation
- Monthly platform fee rule (₹99 if ≥15 qualifying orders)

## Project Structure

```
app/
  (customer)/          # Customer experience
  (vendor)/            # Vendor dashboard
  (auth)/              # Login / Signup / OTP
  api/                 # Next.js route handlers + Cloud Function proxies
components/
lib/
  firebase/            # Client + Admin SDK
  types/               # Shared TypeScript types
  services/            # Cart, Checkout, Search, Payment abstractions
functions/             # Firebase Cloud Functions (demo stubs)
firebase/
  firestore.rules
  storage.rules
```

## Demo Credentials (Emulator)

After starting emulators you can create users freely.

## Next Steps for Production

1. Create real Firebase project
2. Deploy Security Rules + Indexes
3. Implement real Cloud Functions
4. Connect Razorpay / chosen gateway
5. Add geo-indexing + search provider
6. Enable App Check + FCM

---

Built according to the official SWART specification pack.
