"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function VendorOrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/vendor" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold">Orders</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border p-8 text-center shadow-sm">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h2 className="font-semibold mb-1">No orders yet</h2>
          <p className="text-sm text-gray-500">
            Incoming orders will appear here for accept / reject / status updates.
          </p>
        </div>
      </main>
    </div>
  );
}
