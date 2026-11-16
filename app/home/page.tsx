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

export default function CustomerHome() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
              <MapPin className="w-3 h-3" />
              <span>Deliver to</span>
            </div>
            <p className="text-sm font-semibold truncate">Set your location</p>
          </div>
          <Link href="/" className="p-2 rounded-full hover:bg-gray-100">
            <User className="w-5 h-5 text-gray-600" />
          </Link>
        </div>

        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, stores..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4 space-y-6">
        <section>
          <h2 className="font-semibold mb-3">Categories</h2>
          <div className="grid grid-cols-4 gap-3">
            {["Groceries", "Dairy", "Snacks", "Personal"].map((cat) => (
              <div
                key={cat}
                className="bg-white rounded-xl p-3 text-center border shadow-sm"
              >
                <div className="w-10 h-10 mx-auto mb-1 rounded-full bg-green-100" />
                <span className="text-xs font-medium">{cat}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Nearby Stores</h2>
            <span className="text-sm text-green-600">See all</span>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Link
                key={i}
                href={`/stores/demo-store-${i}`}
                className="flex gap-3 bg-white rounded-xl p-3 border shadow-sm"
              >
                <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <Store className="w-7 h-7 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">Demo Kirana Store {i}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">0.{i * 3} km · Open now</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                      Quick available
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-semibold mb-3">Popular near you</h2>
          <div className="grid grid-cols-2 gap-3">
            {["Amul Milk 1L", "Britannia Bread", "Tata Salt", "Fortune Oil"].map(
              (name) => (
                <div
                  key={name}
                  className="bg-white rounded-xl p-3 border shadow-sm"
                >
                  <div className="aspect-square rounded-lg bg-gray-100 mb-2" />
                  <p className="text-sm font-medium truncate">{name}</p>
                  <p className="text-xs text-gray-500">from ₹45</p>
                </div>
              )
            )}
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-lg mx-auto flex">
          {[
            { icon: Store, label: "Home", href: "/home" },
            { icon: Search, label: "Search", href: "/search" },
            { icon: ShoppingBag, label: "Cart", href: "/cart" },
            { icon: Clock, label: "Orders", href: "/orders" },
            { icon: Heart, label: "Saved", href: "/saved" },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex-1 flex flex-col items-center py-2 text-xs text-gray-500 hover:text-green-600"
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
