"use client";

import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { MOCK_ORDERS } from "@/lib/mock-data";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#FFF5F5]">
      <header className="bg-white border-b-2 border-red-600 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold">My Orders</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4 space-y-3">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border-2 border-red-100 p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-sm">{order.orderNumber}</p>
                <p className="text-xs text-gray-500">{order.storeName}</p>
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-md ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              {order.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold text-red-600">₹{order.total}</span>
              <span className="text-xs text-gray-400">{order.deliveryType}</span>
            </div>
          </div>
        ))}

        {MOCK_ORDERS.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No orders yet</p>
          </div>
        )}
      </main>
    </div>
  );
}
