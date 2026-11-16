"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, Lock } from "lucide-react";
import { getCart, updateQty, clearCart, type CartItem } from "@/lib/cart-store";
import { getUser } from "@/lib/auth-store";

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const user = typeof window !== "undefined" ? getUser() : null;

  useEffect(() => {
    setItems(getCart());
    setReady(true);
  }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = items.length > 0 ? 20 : 0;
  const total = subtotal + deliveryFee;

  function changeQty(productId: string, qty: number) {
    setItems([...updateQty(productId, qty)]);
  }

  function handleClear() {
    clearCart();
    setItems([]);
  }

  function handleCheckout() {
    const u = getUser();
    if (!u || u.role !== "customer") {
      router.push("/auth/login?next=/checkout");
      return;
    }
    router.push("/checkout");
  }

  if (!ready) return null;

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-lg items-center gap-3 px-4">
          <Link href="/" className="rounded-full p-1 hover:bg-brand-50">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-bold">Cart</h1>
          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-auto flex items-center gap-1 text-xs font-semibold text-brand-600"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-4">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center"
          >
            <p className="mb-4 text-ink-500">Your cart is empty</p>
            <Link href="/" className="btn-primary">
              Browse shops
            </Link>
          </motion.div>
        ) : (
          <>
            <p className="mb-3 text-sm text-ink-500">
              From <span className="font-bold text-ink-900">{items[0]?.storeName}</span>
            </p>
            <div className="mb-6 space-y-3">
              {items.map((item, i) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="card flex gap-3 p-3.5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                    📦
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="font-bold text-brand-600">₹{item.price}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => changeQty(item.productId, item.quantity - 1)}
                        className="h-7 w-7 rounded-lg border-2 border-brand-200 font-bold"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => changeQty(item.productId, item.quantity + 1)}
                        className="h-7 w-7 rounded-lg border-2 border-brand-200 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-bold">₹{item.price * item.quantity}</p>
                </motion.div>
              ))}
            </div>

            <div className="card mb-4 p-4">
              <div className="mb-1 flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Delivery</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between border-t border-brand-100 pt-2 text-lg font-bold">
                <span>Total</span>
                <span className="text-brand-600">₹{total}</span>
              </div>
            </div>

            {(!user || user.role !== "customer") && (
              <div className="mb-3 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs font-medium text-amber-800">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                Login required to place order
              </div>
            )}

            <button type="button" onClick={handleCheckout} className="btn-primary w-full">
              {user?.role === "customer"
                ? `Proceed to Checkout · ₹${total}`
                : "Login to Checkout"}
            </button>
          </>
        )}
      </main>
    </div>
  );
}
