"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Store, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { MOCK_STORES, MOCK_PRODUCTS } from "@/lib/mock-data";
import { addToCart } from "@/lib/cart-store";

export default function StorePage() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.storeId as string;
  const store = MOCK_STORES.find((s) => s.id === storeId) || MOCK_STORES[0];
  const products = MOCK_PRODUCTS.filter((p) => p.storeId === store.id);

  function handleAdd(product: (typeof MOCK_PRODUCTS)[0]) {
    try {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        storeId: store.id,
        storeName: store.name,
      });
      toast.success(`${product.name} added to cart`);
    } catch {
      toast.error("Clear cart first — only one store per order");
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF5F5] pb-8">
      <header className="bg-white border-b-2 border-red-600 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.back()} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold truncate">{store.name}</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        <div className="bg-white p-4 border-b-2 border-red-100">
          <div className="flex gap-3">
            <div className="w-16 h-16 rounded-xl bg-red-50 border-2 border-red-100 flex items-center justify-center">
              <Store className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="font-bold text-lg">{store.name}</h2>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>{store.address}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {store.distance} · ★ {store.rating} · Open now
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            {store.quickDelivery && (
              <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-md font-bold">
                Quick Delivery
              </span>
            )}
            {store.scheduledDelivery && (
              <span className="text-xs border border-red-300 text-red-600 px-2 py-1 rounded-md font-semibold">
                Scheduled
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold mb-3">Products</h3>
          <div className="grid grid-cols-2 gap-3">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3 border-2 border-red-100">
                <div className="aspect-square rounded-xl bg-red-50 mb-2 flex items-center justify-center text-3xl">
                  📦
                </div>
                <p className="text-sm font-bold truncate">{p.name}</p>
                <p className="text-sm font-extrabold text-red-600">₹{p.price}</p>
                <button
                  onClick={() => handleAdd(p)}
                  className="mt-2 w-full py-2 text-xs font-bold rounded-xl bg-red-600 text-white"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-0 right-0 px-4">
        <div className="max-w-lg mx-auto">
          <Link
            href="/cart"
            className="block w-full py-3.5 rounded-2xl bg-red-600 text-white font-bold text-center shadow-lg"
          >
            Go to Cart →
          </Link>
        </div>
      </div>
    </div>
  );
}
