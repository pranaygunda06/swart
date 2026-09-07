"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Package } from "lucide-react";

export default function VendorProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/vendor" className="p-1">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-semibold">Products</h1>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-swart-600 text-white text-sm font-medium">
            <Plus className="w-4 h-4" />
            Add product
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border p-8 text-center shadow-sm">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h2 className="font-semibold mb-1">No products yet</h2>
          <p className="text-sm text-gray-500 mb-4">
            Add products manually, by barcode, or from the shared catalog.
          </p>
          <button className="px-4 py-2 rounded-lg bg-swart-600 text-white text-sm font-medium">
            Add your first product
          </button>
        </div>
      </main>
    </div>
  );
}
