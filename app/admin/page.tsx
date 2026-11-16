"use client";

import Link from "next/link";
import {
  Users,
  Store,
  ShoppingCart,
  FileText,
  Shield,
  ArrowLeft,
} from "lucide-react";
import {
  MOCK_CUSTOMERS,
  MOCK_VENDORS,
  MOCK_ORDERS,
  MOCK_LOGS,
  MOCK_STORES,
} from "@/lib/mock-data";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            <span className="font-bold">SWART Admin</span>
            <span className="text-xs bg-red-600 px-2 py-0.5 rounded font-bold">PRIVATE</span>
          </div>
          <Link href="/" className="text-sm text-gray-300 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Customers", value: MOCK_CUSTOMERS.length, icon: Users },
            { label: "Vendors", value: MOCK_VENDORS.length, icon: Store },
            { label: "Orders", value: MOCK_ORDERS.length, icon: ShoppingCart },
            { label: "Stores", value: MOCK_STORES.length, icon: Store },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl border p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Customers */}
        <section className="bg-white rounded-2xl border p-5">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" /> All Customers (IDs)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-2 pr-4">ID</th>
                  <th className="pb-2 pr-4">Name</th>
                  <th className="pb-2 pr-4">Email</th>
                  <th className="pb-2 pr-4">Phone</th>
                  <th className="pb-2">Joined</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CUSTOMERS.map((c) => (
                  <tr key={c.id} className="border-b last:border-0">
                    <td className="py-2.5 pr-4 font-mono text-xs text-red-600">{c.id}</td>
                    <td className="py-2.5 pr-4 font-medium">{c.name}</td>
                    <td className="py-2.5 pr-4">{c.email}</td>
                    <td className="py-2.5 pr-4">{c.phone}</td>
                    <td className="py-2.5">{c.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Vendors */}
        <section className="bg-white rounded-2xl border p-5">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Store className="w-5 h-5" /> All Vendors (IDs)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-2 pr-4">ID</th>
                  <th className="pb-2 pr-4">Owner</th>
                  <th className="pb-2 pr-4">Store</th>
                  <th className="pb-2 pr-4">Email</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_VENDORS.map((v) => (
                  <tr key={v.id} className="border-b last:border-0">
                    <td className="py-2.5 pr-4 font-mono text-xs text-red-600">{v.id}</td>
                    <td className="py-2.5 pr-4 font-medium">{v.name}</td>
                    <td className="py-2.5 pr-4">{v.storeName}</td>
                    <td className="py-2.5 pr-4">{v.email}</td>
                    <td className="py-2.5">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          v.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Orders */}
        <section className="bg-white rounded-2xl border p-5">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" /> All Orders
          </h2>
          <div className="space-y-2">
            {MOCK_ORDERS.map((o) => (
              <div key={o.id} className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
                <div>
                  <p className="font-bold text-sm">{o.orderNumber}</p>
                  <p className="text-xs text-gray-500">
                    {o.customerName} → {o.storeName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">₹{o.total}</p>
                  <p className="text-xs">{o.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Logs */}
        <section className="bg-white rounded-2xl border p-5">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" /> System Logs
          </h2>
          <div className="space-y-2 font-mono text-xs">
            {MOCK_LOGS.map((log) => (
              <div key={log.id} className="flex gap-3 p-2 rounded bg-gray-50">
                <span className="text-gray-400 shrink-0">{log.time}</span>
                <span className="text-red-600 font-bold shrink-0">{log.action}</span>
                <span className="text-gray-600">{log.detail}</span>
                <span className="text-gray-400 ml-auto">{log.user}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
