"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingBag,
  MapPin,
  Store,
  Clock,
  Heart,
  User,
  Home,
  Sparkles,
  Navigation,
} from "lucide-react";
import { MOCK_STORES } from "@/lib/mock-data";

const CATEGORIES = [
  { name: "Groceries", emoji: "🛒", color: "from-orange-400 to-brand-500" },
  { name: "Dairy", emoji: "🥛", color: "from-sky-400 to-blue-500" },
  { name: "Snacks", emoji: "🍪", color: "from-amber-400 to-orange-500" },
  { name: "Personal", emoji: "🧴", color: "from-violet-400 to-purple-500" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Header — no admin button */}
      <header className="sticky top-0 z-40 border-b border-brand-100/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-center gap-1.5 text-xs font-semibold text-brand-600">
              <MapPin className="h-3.5 w-3.5" />
              <span>Deliver to</span>
            </div>
            <p className="truncate text-sm font-bold text-ink-900">Hyderabad · Set location</p>
          </div>
          <Link
            href="/auth/login"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-200 bg-brand-50 transition hover:bg-brand-100"
          >
            <User className="h-5 w-5 text-brand-600" />
          </Link>
        </div>

        <div className="px-4 pb-3">
          <Link href="/search" className="relative block">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
            <div className="w-full rounded-2xl border-2 border-brand-100 bg-cream-50 py-3 pl-10 pr-4 text-sm font-medium text-ink-400">
              Search shops & products...
            </div>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-8 px-4 py-5">
        {/* Hero banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-orange-400 p-5 text-white shadow-glow"
        >
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-8 left-10 h-24 w-24 rounded-full bg-mint-400/30 blur-2xl" />
          <div className="relative">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Hyperlocal kirana
            </div>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight">
              Your neighborhood
              <br />
              shops, delivered
            </h1>
            <p className="mt-2 max-w-[240px] text-sm text-white/85">
              Pick a shop near you. Fresh stock from real local stores.
            </p>
          </div>
        </motion.section>

        {/* Categories */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-ink-900">Categories</h2>
          <div className="grid grid-cols-4 gap-3">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="card p-3 text-center"
              >
                <div
                  className={`mx-auto mb-1.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} text-xl shadow-sm`}
                >
                  {cat.emoji}
                </div>
                <span className="text-xs font-semibold text-ink-800">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Nearby shops — entry to shop pages */}
        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold text-ink-900">Shops near you</h2>
              <p className="text-xs text-ink-500">Tap a shop to browse its products</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-brand-600">
              <Navigation className="h-3.5 w-3.5" />
              Nearby
            </span>
          </div>
          <div className="space-y-3">
            {MOCK_STORES.map((store, i) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link
                  href={`/stores/${store.id}`}
                  className="card flex gap-3.5 p-3.5 transition hover:border-brand-300 hover:shadow-soft active:scale-[0.99]"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50">
                    <Store className="h-7 w-7 text-brand-600" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <h3 className="truncate font-bold text-ink-900">{store.name}</h3>
                    <p className="mt-0.5 text-xs font-medium text-ink-500">
                      {store.distance} · ★ {store.rating} · Open now
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {store.quickDelivery && (
                        <span className="chip bg-brand-600 text-white">Quick</span>
                      )}
                      {store.scheduledDelivery && (
                        <span className="chip border border-brand-200 bg-brand-50 text-brand-700">
                          Scheduled
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom nav — no admin */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-brand-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg">
          {[
            { icon: Home, label: "Home", href: "/" },
            { icon: Search, label: "Search", href: "/search" },
            { icon: ShoppingBag, label: "Cart", href: "/cart" },
            { icon: Clock, label: "Orders", href: "/orders" },
            { icon: Heart, label: "Saved", href: "/saved" },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className={`flex flex-1 flex-col items-center py-2.5 text-[11px] font-semibold ${
                href === "/" ? "text-brand-600" : "text-ink-400"
              }`}
            >
              <Icon className="mb-0.5 h-5 w-5" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
