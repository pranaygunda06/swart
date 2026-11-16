"use client";

import Link from "next/link";
import {
  Search,
  ShoppingBag,
  MapPin,
  Store,
  Clock,
  Heart,
  User,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
              <MapPin className="w-3 h-3" />
              <span>Deliver to</span>
            </div>
            <p className="text-sm font-semibold truncate">Hyderabad · Set location</p>
          </div>
          <Link href="/auth/login" className="p-2 rounded-full hover:bg-gray-100">
            <User className="w-5 h-5 text-gray-600" />
          </Link>
        </div>

        <div className="px-4 pb-3">
          <Link href="/search" className="relative block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <div className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-500">
              Search products, stores...
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4 space-y-6">
        {/* Categories */}
        <section>
          <h2 className="font-semibold mb-3">Categories</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: "Groceries", emoji: "🛒" },
              { name: "Dairy", emoji: "🥛" },
              { name: "Snacks", emoji: "🍪" },
              { name: "Personal", emoji: "🧴" },
            ].map((cat) => (
              <div
                key={cat.name}
                className="bg-white rounded-xl p-3 text-center border shadow-sm active:scale-95 transition"
              >
                <div className="text-2xl mb-1">{cat.emoji}</div>
                <span className="text-xs font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Nearby Stores */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Nearby Stores</h2>
            <span className="text-sm text-green-600 font-medium">See all</span>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, name: "Sharma Kirana", distance: "0.3 km", open: true },
              { id: 2, name: "Fresh Mart", distance: "0.6 km", open: true },
              { id: 3, name: "Daily Needs Store", distance: "0.9 km", open: true },
            ].map((store) => (
              <Link
                key={store.id}
                href={`/stores/demo-store-${store.id}`}
                className="flex gap-3 bg-white rounded-xl p-3 border shadow-sm active:scale-[0.98] transition"
              >
                <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <Store className="w-7 h-7 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{store.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {store.distance} · Open now
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium">
                      Quick Delivery
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      Scheduled
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Products */}
        <section>
          <h2 className="font-semibold mb-3">Popular near you</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Amul Taaza 1L", price: 58 },
              { name: "Britannia Bread", price: 45 },
              { name: "Tata Salt 1kg", price: 28 },
              { name: "Fortune Oil 1L", price: 165 },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-xl p-3 border shadow-sm"
              >
                <div className="aspect-square rounded-lg bg-gray-100 mb-2 flex items-center justify-center text-3xl">
                  📦
                </div>
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-sm font-semibold text-green-700 mt-0.5">
                  ₹{item.price}
                </p>
                <button className="mt-2 w-full py-1.5 text-xs font-medium rounded-lg border border-green-600 text-green-700 hover:bg-green-50">
                  Add
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t safe-bottom">
        <div className="max-w-lg mx-auto flex">
          {[
            { icon: Store, label: "Home", href: "/" },
            { icon: Search, label: "Search", href: "/search" },
            { icon: ShoppingBag, label: "Cart", href: "/cart" },
            { icon: Clock, label: "Orders", href: "/orders" },
            { icon: Heart, label: "Saved", href: "/saved" },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className={`flex-1 flex flex-col items-center py-2 text-xs ${
                href === "/"
                  ? "text-green-600 font-medium"
                  : "text-gray-500 hover:text-green-600"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
