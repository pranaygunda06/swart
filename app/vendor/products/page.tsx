"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import toast from "react-hot-toast";

export default function VendorProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b-2 border-red-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/vendor" className="p-1">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-bold">Products</h1>
          </div>
          <button
            onClick={() => toast.success("Add product form (demo)")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm font-bold"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MOCK_PRODUCTS.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border-2 border-red-100 p-4">
              <p className="font-bold">{p.name}</p>
              <p className="text-red-600 font-bold">₹{p.price}</p>
              <p className="text-xs text-gray-500 mt-1">Stock: {p.stock} · {p.category}</p>
              <div className="flex gap-2 mt-3">
                <button className="text-xs font-bold text-red-600">Edit</button>
                <button className="text-xs font-bold text-gray-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
