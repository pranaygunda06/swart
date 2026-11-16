"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { getOrdersByStore, MOCK_VENDORS } from "@/lib/mock-data";
import { getUser } from "@/lib/auth-store";

export default function VendorOrdersPage() {
  const [storeId, setStoreId] = useState<string | null>(null);
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const u = getUser();
    if (u?.role === "vendor" && u.storeId) {
      setStoreId(u.storeId);
      setShopName(u.storeName || "");
    } else {
      const v = MOCK_VENDORS[0];
      setStoreId(v.storeId);
      setShopName(v.storeName);
    }
  }, []);

  const orders = storeId ? getOrdersByStore(storeId) : [];

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="sticky top-0 z-40 border-b border-brand-100 bg-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-3 px-4">
          <Link href="/vendor" className="rounded-full p-1 hover:bg-brand-50">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-bold">Orders</h1>
            <p className="text-[10px] text-ink-400">{shopName} only</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-3 px-4 py-6">
        {orders.length === 0 ? (
          <div className="card py-12 text-center text-ink-500">
            No orders for your shop yet
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold">{order.orderNumber}</p>
                  <p className="text-sm text-ink-500">{order.customerName}</p>
                  <p className="mt-1 text-xs text-ink-400">
                    {order.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-600">₹{order.total}</p>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-bold ${
                      order.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-mint-400/20 text-mint-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              {order.status === "pending" && (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => toast.success("Order accepted")}
                    className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.error("Order rejected")}
                    className="rounded-lg border-2 border-brand-100 px-3 py-1.5 text-xs font-bold"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
}
