"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createDemoQuote } from "@/lib/services/checkout";
import { formatINR } from "@/lib/utils";
import type { DeliveryType } from "@/lib/types";

export default function CheckoutPage() {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("quick");

  // Demo quote
  const quote = createDemoQuote({
    storeId: "demo-store",
    items: [
      { unitPrice: 45, quantity: 2 },
      { unitPrice: 30, quantity: 1 },
    ],
    deliveryType,
    deliveryFee: deliveryType === "quick" ? 20 : 15,
    freeDeliveryThreshold: 499,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/cart" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold">Checkout</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Delivery type */}
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <h2 className="font-semibold text-sm mb-3">Delivery option</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="delivery"
                checked={deliveryType === "quick"}
                onChange={() => setDeliveryType("quick")}
                className="text-swart-600"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">Quick Delivery</p>
                <p className="text-xs text-gray-500">Target under 30 min</p>
              </div>
              <span className="text-sm font-medium">{formatINR(20)}</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="delivery"
                checked={deliveryType === "scheduled"}
                onChange={() => setDeliveryType("scheduled")}
                className="text-swart-600"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">Scheduled</p>
                <p className="text-xs text-gray-500">Choose a slot (min 2h ahead)</p>
              </div>
              <span className="text-sm font-medium">{formatINR(15)}</span>
            </label>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <h2 className="font-semibold text-sm mb-3">Order summary</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatINR(quote.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span>{formatINR(quote.deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base pt-2 border-t mt-2">
              <span>Total</span>
              <span>{formatINR(quote.grandTotal)}</span>
            </div>
          </div>
        </div>

        <button className="w-full py-3 rounded-xl bg-swart-600 text-white font-semibold hover:bg-swart-700">
          Place order · {formatINR(quote.grandTotal)}
        </button>
        <p className="text-xs text-center text-gray-400">
          Demo mode — no real payment charged
        </p>
      </main>
    </div>
  );
}
