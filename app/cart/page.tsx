"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { getCart, updateQty, clearCart, type CartItem } from "@/lib/cart-store";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = items.length > 0 ? 20 : 0;
  const total = subtotal + deliveryFee;

  function changeQty(productId: string, qty: number) {
    const next = updateQty(productId, qty);
    setItems([...next]);
  }

  function handleClear() {
    clearCart();
    setItems([]);
  }

  return (
    <div className="min-h-screen bg-[#FFF5F5]">
      <header className="bg-white border-b-2 border-red-600 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold">Cart</h1>
          {items.length > 0 && (
            <button onClick={handleClear} className="ml-auto text-xs text-red-600 font-semibold flex items-center gap-1">
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link href="/" className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold">
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-3">
              From <span className="font-bold text-gray-900">{items[0]?.storeName}</span>
            </p>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.productId} className="bg-white rounded-2xl p-3.5 border-2 border-red-100 flex gap-3">
                  <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center text-2xl">📦</div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-red-600 font-bold">₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => changeQty(item.productId, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg border-2 border-red-200 font-bold"
                      >
                        −
                      </button>
                      <span className="font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => changeQty(item.productId, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg border-2 border-red-200 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-bold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border-2 border-red-100 p-4 mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Delivery</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span className="text-red-600">₹{total}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full py-3.5 rounded-2xl bg-red-600 text-white font-bold text-center"
            >
              Proceed to Checkout · ₹{total}
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
