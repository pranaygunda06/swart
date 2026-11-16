"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Truck,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { MOCK_ORDERS, MOCK_PRODUCTS } from "@/lib/mock-data";

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
  const pending = MOCK_ORDERS.filter((o) => o.status === "pending").length;
  const todayRevenue = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-white border-r-2 border-red-100 hidden md:flex flex-col">
        <div className="p-4 border-b-2 border-red-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
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
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600">
            <LogOut className="w-4 h-4" /> Exit to Shop
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Vendor Dashboard</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Today Orders", value: MOCK_ORDERS.length },
            { label: "Pending", value: pending },
            { label: "Revenue", value: `₹${todayRevenue}` },
            { label: "Products", value: MOCK_PRODUCTS.length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border-2 border-red-100 p-4">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border-2 border-red-100 p-6">
          <h2 className="font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/vendor/orders" className="px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold">
              Manage Orders
            </Link>
            <Link href="/vendor/products" className="px-4 py-2.5 rounded-xl border-2 border-red-200 text-sm font-bold">
              Add Products
            </Link>
            <Link href="/vendor/store" className="px-4 py-2.5 rounded-xl border-2 border-red-200 text-sm font-bold">
              Store Settings
            </Link>
            <Link href="/vendor/delivery" className="px-4 py-2.5 rounded-xl border-2 border-red-200 text-sm font-bold">
              Delivery Fees
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
