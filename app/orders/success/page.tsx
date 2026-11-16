"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

function SuccessContent() {
  const params = useSearchParams();
  const order = params.get("order") || "SWXXXXXX";
  const total = params.get("total") || "0";

  return (
    <div className="min-h-screen bg-[#FFF5F5] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl border-2 border-red-100 p-8 max-w-sm w-full text-center shadow-lg">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-9 h-9 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-1">Order Confirmed!</h1>
        <p className="text-gray-500 text-sm mb-4">Payment successful (demo)</p>
        <div className="bg-red-50 rounded-xl p-3 mb-6 text-left">
          <p className="text-xs text-gray-500">Order ID</p>
          <p className="font-bold">{order}</p>
          <p className="text-xs text-gray-500 mt-2">Amount paid</p>
          <p className="font-bold text-red-600 text-lg">₹{total}</p>
        </div>
        <Link
          href="/orders"
          className="block w-full py-3 rounded-xl bg-red-600 text-white font-bold mb-2"
        >
          View Orders
        </Link>
        <Link href="/" className="block w-full py-3 rounded-xl border-2 border-red-200 font-bold text-red-600">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
