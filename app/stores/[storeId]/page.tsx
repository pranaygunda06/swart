"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Store, MapPin, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { MOCK_STORES, getProductsByStore } from "@/lib/mock-data";
import { addToCart, getCart } from "@/lib/cart-store";
import { useEffect, useState } from "react";

export default function StorePage() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.storeId as string;
  const store = MOCK_STORES.find((s) => s.id === storeId);
  const products = store ? getProductsByStore(store.id) : [];
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCart().reduce((s, i) => s + i.quantity, 0));
  }, []);

  if (!store) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="text-ink-500">Shop not found</p>
        <Link href="/" className="btn-primary">
          Back to shops
        </Link>
      </div>
    );
  }

  function handleAdd(product: (typeof products)[0]) {
    try {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        storeId: store!.id,
        storeName: store!.name,
      });
      setCartCount((c) => c + 1);
      toast.success(`${product.name} added`);
    } catch {
      toast.error("Cart has items from another shop — clear cart first");
    }
  }

  return (
    <div className="min-h-screen pb-28">
      <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-lg items-center gap-3 px-4">
          <button type="button" onClick={() => router.push("/")} className="rounded-full p-1.5 hover:bg-brand-50">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="truncate font-bold text-ink-900">{store.name}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-brand-100 bg-white p-4"
        >
          <div className="flex gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50">
              <Store className="h-8 w-8 text-brand-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink-900">{store.name}</h2>
              <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-500">
                <MapPin className="h-3 w-3" />
                <span>{store.address}</span>
              </div>
              <p className="mt-1 text-xs font-medium text-ink-500">
                {store.distance} · ★ {store.rating} · Open now
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            {store.quickDelivery && (
              <span className="chip bg-brand-600 text-white">Quick Delivery</span>
            )}
            {store.scheduledDelivery && (
              <span className="chip border border-brand-200 bg-brand-50 text-brand-700">Scheduled</span>
            )}
          </div>
        </motion.div>

        <div className="p-4">
          <h3 className="mb-3 font-bold text-ink-900">Products in this shop</h3>
          {products.length === 0 ? (
            <p className="py-10 text-center text-sm text-ink-400">No products yet</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {products.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="card p-3"
                >
                  <div className="mb-2 flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-cream-100 text-3xl">
                    📦
                  </div>
                  <p className="truncate text-sm font-bold text-ink-900">{p.name}</p>
                  <p className="text-xs text-ink-400">{p.category}</p>
                  <p className="mt-0.5 text-base font-extrabold text-brand-600">₹{p.price}</p>
                  <button
                    type="button"
                    onClick={() => handleAdd(p)}
                    className="mt-2 w-full rounded-xl bg-brand-600 py-2 text-xs font-bold text-white transition hover:bg-brand-500 active:scale-[0.98]"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-4 left-0 right-0 px-4">
        <div className="mx-auto max-w-lg">
          <Link href="/cart" className="btn-primary flex w-full shadow-glow">
            <ShoppingBag className="h-4 w-4" />
            Go to Cart{cartCount > 0 ? ` · ${cartCount}` : ""}
          </Link>
        </div>
      </div>
    </div>
  );
}
