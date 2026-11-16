# SWART — Hyperlocal Kirana Commerce

Shop-first platform for independent neighborhood Kirana stores.

## Product rules

- **Shop pages first** — customers enter a specific shop to browse its products
- **One vendor = one store** — shop name is the vendor identity
- **Hard isolation** — vendors only see their own products & orders
- **Auth required** for checkout / placing orders
- **No admin button** on customer UI
- **Store location** via lat/lng (map pin next)

## Stack

- Next.js 14 + TypeScript + Tailwind + Framer Motion
- Firebase Auth / Firestore ready
- Demo auth via localStorage for now

## Quick start

```bash
npm install
npm run dev
```

## Demo login

- **Customer**: any email + password → checkout enabled
- **Vendor**: `ramesh@sharma.com` (or other vendor emails) → only that shop’s data

## Deploy

Vercel project linked to this repo.
