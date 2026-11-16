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
  Home,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFF5F5] pb-24">
      {/* Header */}
      <header className="bg-white border-b-2 border-red-600 sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium mb-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Deliver to</span>
            </div>
            <p className="text-sm font-bold text-gray-900 truncate">
              Hyderabad · Set location
            </p>
          </div>
          <Link
            href="/auth/login"
            className="w-10 h-10 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center"
          >
            <User className="w-5 h-5 text-red-600" />
          </Link>
        </div>

        <div className="px-4 pb-3">
          <Link href="/search" className="relative block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
            <div className="w-full pl-10 pr-4 py-3 bg-white border-2 border-red-200 rounded-xl text-sm text-gray-500 font-medium">
              Search products, stores...
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-7">
        {/* Categories */}
        <section>
          <h2 className="font-bold text-lg text-gray-900 mb-3">Categories</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: "Groceries", emoji: "🛒" },
              { name: "Dairy", emoji: "🥛" },
              { name: "Snacks", emoji: "🍪" },
              { name: "Personal", emoji: "🧴" },
            ].map((cat) => (
              <div
                key={cat.name}
                className="bg-white rounded-2xl p-3 text-center border-2 border-red-100 shadow-sm active:scale-95 transition"
              >
                <div className="text-2xl mb-1.5">{cat.emoji}</div>
                <span className="text-xs font-semibold text-gray-800">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Nearby Stores */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg text-gray-900">Nearby Stores</h2>
            <span className="text-sm text-red-600 font-bold">See all</span>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, name: "Sharma Kirana", distance: "0.3 km" },
              { id: 2, name: "Fresh Mart", distance: "0.6 km" },
              { id: 3, name: "Daily Needs Store", distance: "0.9 km" },
            ].map((store) => (
              <Link
                key={store.id}
                href={`/stores/demo-store-${store.id}`}
                className="flex gap-3.5 bg-white rounded-2xl p-3.5 border-2 border-red-100 shadow-sm active:scale-[0.98] transition"
              >
                <div className="w-16 h-16 rounded-xl bg-red-50 border-2 border-red-100 flex items-center justify-center shrink-0">
                  <Store className="w-7 h-7 text-red-600" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 truncate">{store.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">
                    {store.distance} · Open now
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] bg-red-600 text-white px-2 py-0.5 rounded-md font-bold">
                      Quick Delivery
                    </span>
                    <span className="text-[11px] bg-white text-red-600 border border-red-300 px-2 py-0.5 rounded-md font-semibold">
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
          <h2 className="font-bold text-lg text-gray-900 mb-3">Popular near you</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Amul Taaza 1L", price: 58 },
              { name: "Britannia Bread", price: 45 },
              { name: "Tata Salt 1kg", price: 28 },
              { name: "Fortune Oil 1L", price: 165 },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-2xl p-3 border-2 border-red-100 shadow-sm"
              >
                <div className="aspect-square rounded-xl bg-red-50 border border-red-100 mb-2.5 flex items-center justify-center text-3xl">
                  📦
                </div>
                <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                <p className="text-base font-extrabold text-red-600 mt-0.5">
                  ₹{item.price}
                </p>
                <button className="mt-2.5 w-full py-2 text-sm font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 active:scale-95 transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-red-600 shadow-[0_-4px_12px_rgba(220,38,38,0.1)]">
        <div className="max-w-lg mx-auto flex">
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
              className={`flex-1 flex flex-col items-center py-2.5 text-[11px] font-semibold ${
                href === "/"
                  ? "text-red-600"
                  : "text-gray-500 hover:text-red-600"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" strokeWidth={href === "/" ? 2.5 : 2} />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
