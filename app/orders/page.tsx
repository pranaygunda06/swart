"use client";

import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/home" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold">My Orders</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="font-semibold text-lg mb-1">No orders yet</h2>
        <p className="text-sm text-gray-500 mb-6">
          Your past and active orders will appear here.
        </p>
        <Link
          href="/home"
          className="inline-block px-5 py-2.5 rounded-lg bg-swart-600 text-white text-sm font-medium"
        >
          Start shopping
        </Link>
      </main>
    </div>
  );
}
