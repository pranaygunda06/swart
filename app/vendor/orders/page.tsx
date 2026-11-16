"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MOCK_ORDERS } from "@/lib/mock-data";
import toast from "react-hot-toast";

export default function VendorOrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b-2 border-red-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/vendor" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold">Orders</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-3">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border-2 border-red-100 p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">{order.orderNumber}</p>
                <p className="text-sm text-gray-500">{order.customerName}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {order.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">₹{order.total}</p>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    order.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
            {order.status === "pending" && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => toast.success("Order accepted")}
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold"
                >
                  Accept
                </button>
                <button
                  onClick={() => toast.error("Order rejected")}
                  className="px-3 py-1.5 rounded-lg border text-xs font-bold"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
