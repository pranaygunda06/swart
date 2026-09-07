"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  Store,
  LogOut,
  Truck,
  BarChart3,
} from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/vendor" },
  { icon: ShoppingCart, label: "Orders", href: "/vendor/orders" },
  { icon: Package, label: "Products", href: "/vendor/products" },
  { icon: Store, label: "Store", href: "/vendor/store" },
  { icon: Truck, label: "Delivery", href: "/vendor/delivery" },
  { icon: BarChart3, label: "Sales", href: "/vendor/sales" },
  { icon: Settings, label: "Settings", href: "/vendor/settings" },
];

export default function VendorDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getClientAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push("/auth/login");
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-white border-r hidden md:flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-swart-600 flex items-center justify-center">
              <Store className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">SWART Vendor</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-swart-50 hover:text-swart-700"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t">
          <button
            onClick={() => signOut(getClientAuth())}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 w-full"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Today Orders", value: "0" },
            { label: "Pending", value: "0" },
            { label: "Revenue Today", value: "₹0" },
            { label: "Low Stock", value: "0" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border p-4 shadow-sm"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="font-semibold mb-2">Get started</h2>
          <p className="text-sm text-gray-600 mb-4">
            Complete your store setup to start receiving orders.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/vendor/store"
              className="px-4 py-2 rounded-lg bg-swart-600 text-white text-sm font-medium"
            >
              Set up store
            </Link>
            <Link
              href="/vendor/products"
              className="px-4 py-2 rounded-lg border text-sm font-medium"
            >
              Add products
            </Link>
            <Link
              href="/vendor/delivery"
              className="px-4 py-2 rounded-lg border text-sm font-medium"
            >
              Delivery settings
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
