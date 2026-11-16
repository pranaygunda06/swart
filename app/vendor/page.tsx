"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Truck,
  Settings,
  LogOut,
} from "lucide-react";
import {
  getStoreByVendor,
  getProductsByStore,
  getOrdersByStore,
  MOCK_VENDORS,
} from "@/lib/mock-data";
import { getUser, setUser, logout, type DemoUser } from "@/lib/auth-store";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/vendor" },
  { icon: ShoppingCart, label: "Orders", href: "/vendor/orders" },
  { icon: Package, label: "Products", href: "/vendor/products" },
  { icon: Store, label: "Store", href: "/vendor/store" },
  { icon: Truck, label: "Delivery", href: "/vendor/delivery" },
  { icon: Settings, label: "Settings", href: "/vendor/settings" },
];

/** Demo: auto-bind to vendor v1 if not logged in as vendor */
function ensureVendorSession(): DemoUser {
  let u = getUser();
  if (u?.role === "vendor" && u.storeId) return u;
  const v = MOCK_VENDORS[0];
  u = {
    id: v.id,
    name: v.name,
    email: v.email,
    role: "vendor",
    storeId: v.storeId,
    storeName: v.storeName,
  };
  setUser(u);
  return u;
}

export default function VendorDashboard() {
  const router = useRouter();
  const [vendor, setVendor] = useState<DemoUser | null>(null);

  useEffect(() => {
    setVendor(ensureVendorSession());
  }, []);

  if (!vendor?.storeId) {
    return (
      <div className="flex min-h-screen items-center justify-center text-ink-500">Loading…</div>
    );
  }

  const store = getStoreByVendor(vendor.id) || getStoreByVendor("v1");
  const storeId = vendor.storeId;
  const myProducts = getProductsByStore(storeId);
  const myOrders = getOrdersByStore(storeId);
  const pending = myOrders.filter((o) => o.status === "pending").length;
  const revenue = myOrders.reduce((s, o) => s + o.total, 0);
  const shopName = vendor.storeName || store?.name || "My Shop";

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="flex min-h-screen bg-cream-50">
      <aside className="hidden w-56 flex-col border-r border-brand-100 bg-white md:flex">
        <div className="border-b border-brand-100 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
              <Store className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink-900">{shopName}</p>
              <p className="text-[10px] font-medium text-ink-400">Vendor</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-brand-50 hover:text-brand-700"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-brand-100 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-600 hover:bg-brand-50"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-1 text-2xl font-bold text-ink-900">{shopName}</h1>
          <p className="mb-6 text-sm text-ink-500">Only your products & orders — fully isolated</p>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Orders", value: myOrders.length },
              { label: "Pending", value: pending },
              { label: "Revenue", value: `₹${revenue}` },
              { label: "Products", value: myProducts.length },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="card p-4"
              >
                <p className="text-sm text-ink-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-ink-900">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="card p-6">
            <h2 className="mb-4 font-bold text-ink-900">Quick actions</h2>
            <div className="flex flex-wrap gap-2">
              <Link href="/vendor/orders" className="btn-primary">
                Manage Orders
              </Link>
              <Link href="/vendor/products" className="btn-secondary">
                Products
              </Link>
              <Link href="/vendor/store" className="btn-secondary">
                Store & location
              </Link>
              <Link href={`/stores/${storeId}`} className="btn-secondary">
                View shop page
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
