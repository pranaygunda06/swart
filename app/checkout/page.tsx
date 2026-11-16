"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { getCart, clearCart, type CartItem } from "@/lib/cart-store";
import { getUser } from "@/lib/auth-store";

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryType, setDeliveryType] = useState<"quick" | "scheduled">("quick");
  const [paying, setPaying] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u || u.role !== "customer") {
      router.replace("/auth/login?next=/checkout");
      return;
    }
    setAuthed(true);
    setItems(getCart());
  }, [router]);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = deliveryType === "quick" ? 20 : 15;
  const total = subtotal + deliveryFee;

  function handlePay() {
    if (items.length === 0) return;
    const u = getUser();
    if (!u || u.role !== "customer") {
      router.push("/auth/login?next=/checkout");
      return;
    }
    setPaying(true);
    setTimeout(() => {
      const orderId = `SW${Date.now().toString().slice(-8)}`;
      clearCart();
      toast.success("Payment successful!");
      router.push(`/orders/success?order=${orderId}&total=${total}`);
    }, 1200);
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <Lock className="h-6 w-6 text-brand-500" />
        <p className="text-sm text-ink-500">Login required…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-ink-500">Cart is empty</p>
          <Link href="/" className="btn-primary">
            Browse shops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-lg items-center gap-3 px-4">
          <Link href="/cart" className="rounded-full p-1 hover:bg-brand-50">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-bold">Checkout</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-4 px-4 py-4">
        <p className="text-sm text-ink-500">
          From <span className="font-bold text-ink-900">{items[0]?.storeName}</span>
        </p>

        <div className="card p-4">
          <h2 className="mb-3 font-bold">Delivery option</h2>
          <label className="mb-2 flex cursor-pointer items-center gap-3 rounded-xl border-2 border-brand-100 p-3">
            <input
              type="radio"
              checked={deliveryType === "quick"}
              onChange={() => setDeliveryType("quick")}
            />
            <div className="flex-1">
              <p className="text-sm font-bold">Quick Delivery</p>
              <p className="text-xs text-ink-500">Under 30 minutes</p>
            </div>
            <span className="font-bold">₹20</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-brand-100 p-3">
            <input
              type="radio"
              checked={deliveryType === "scheduled"}
              onChange={() => setDeliveryType("scheduled")}
            />
            <div className="flex-1">
              <p className="text-sm font-bold">Scheduled</p>
              <p className="text-xs text-ink-500">Choose a slot later</p>
            </div>
            <span className="font-bold">₹15</span>
          </label>
        </div>

        <div className="card p-4">
          <h2 className="mb-3 font-bold">Order summary</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-brand-100 pt-2 text-lg font-bold">
              <span>Total</span>
              <span className="text-brand-600">₹{total}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePay}
          disabled={paying}
          className="btn-primary w-full disabled:opacity-60"
        >
          {paying ? "Processing payment..." : `Pay ₹${total} (Demo)`}
        </button>
        <p className="text-center text-xs text-ink-400">Demo payment · no real charge</p>
      </main>
    </div>
  );
}
