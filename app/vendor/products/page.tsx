"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { getUser } from "@/lib/auth-store";
import { getProductsByStore, MOCK_VENDORS } from "@/lib/mock-data";

export default function VendorProductsPage() {
  const [storeId, setStoreId] = useState<string | null>(null);
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const u = getUser();
    if (u?.role === "vendor" && u.storeId) {
      setStoreId(u.storeId);
      setShopName(u.storeName || "");
    } else {
      const v = MOCK_VENDORS[0];
      setStoreId(v.storeId);
      setShopName(v.storeName);
    }
  }, []);

  const products = storeId ? getProductsByStore(storeId) : [];

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="border-b border-brand-100 bg-white">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
          <Link href="/vendor" className="rounded-full p-1 hover:bg-brand-50">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-bold">Products</h1>
            <p className="text-[10px] text-ink-400">{shopName} only</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <p className="mb-4 text-sm text-ink-500">
          These products belong only to your shop. Other vendors cannot see or edit them.
        </p>
        {products.length === 0 ? (
          <div className="card py-12 text-center">
            <Package className="mx-auto mb-2 h-8 w-8 text-ink-300" />
            <p className="text-ink-500">No products yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {products.map((p) => (
              <div key={p.id} className="card flex items-center justify-between p-4">
                <div>
                  <p className="font-bold text-ink-900">{p.name}</p>
                  <p className="text-xs text-ink-400">
                    {p.category} · Stock {p.stock}
                  </p>
                </div>
                <p className="font-bold text-brand-600">₹{p.price}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
