"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { getCart, clearCart, type CartItem } from "@/lib/cart-store";

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryType, setDeliveryType] = useState<"quick" | "scheduled">("quick");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = deliveryType === "quick" ? 20 : 15;
  const total = subtotal + deliveryFee;

  function handlePay() {
    if (items.length === 0) return;
    setPaying(true);

    // Fake payment simulation
    setTimeout(() => {
      const orderId = `SW${Date.now().toString().slice(-8)}`;
      clearCart();
      toast.success("Payment successful!");
      router.push(`/orders/success?order=${orderId}&total=${total}`);
    }, 1500);
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5F5]">
        <div className="text-center">
          <p className="mb-4">Cart is empty</p>
          <Link href="/" className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold">
            Go shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F5]">
      <header className="bg-white border-b-2 border-red-600 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/cart" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold">Checkout</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <div className="bg-white rounded-2xl border-2 border-red-100 p-4">
          <h2 className="font-bold mb-3">Delivery option</h2>
          <label className="flex items-center gap-3 p-3 rounded-xl border-2 mb-2 cursor-pointer">
            <input
              type="radio"
              checked={deliveryType === "quick"}
              onChange={() => setDeliveryType("quick")}
            />
            <div className="flex-1">
              <p className="font-bold text-sm">Quick Delivery</p>
              <p className="text-xs text-gray-500">Under 30 minutes</p>
            </div>
            <span className="font-bold">₹20</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer">
            <input
              type="radio"
              checked={deliveryType === "scheduled"}
              onChange={() => setDeliveryType("scheduled")}
            />
            <div className="flex-1">
              <p className="font-bold text-sm">Scheduled</p>
              <p className="text-xs text-gray-500">Choose a slot later</p>
            </div>
            <span className="font-bold">₹15</span>
          </label>
        </div>

        <div className="bg-white rounded-2xl border-2 border-red-100 p-4">
          <h2 className="font-bold mb-3">Order summary</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
              <span>Total</span>
              <span className="text-red-600">₹{total}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={paying}
          className="w-full py-3.5 rounded-2xl bg-red-600 text-white font-bold disabled:opacity-60"
        >
          {paying ? "Processing payment..." : `Pay ₹${total} (Demo)`}
        </button>
        <p className="text-xs text-center text-gray-400">
          Fake payment · No real money charged
        </p>
      </main>
    </div>
  );
}
