"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Store, Clock, MapPin } from "lucide-react";

export default function StorePage() {
  const params = useParams();
  const storeId = params?.storeId as string;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/home" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold truncate">Store</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        <div className="bg-white p-4 border-b">
          <div className="flex gap-3">
            <div className="w-16 h-16 rounded-xl bg-swart-100 flex items-center justify-center shrink-0">
              <Store className="w-8 h-8 text-swart-600" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Demo Kirana ({storeId})</h2>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>0.5 km away</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-swart-600 mt-1">
                <Clock className="w-3 h-3" />
                <span>Open now · Closes 10 PM</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <span className="text-xs bg-swart-50 text-swart-700 px-2 py-1 rounded-full">
              Quick Delivery available
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              Scheduled available
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold mb-3">Products</h3>
          <div className="grid grid-cols-2 gap-3">
            {["Amul Taaza 1L", "Britannia Bread", "Tata Salt 1kg", "Parle-G"].map(
              (name) => (
                <div
                  key={name}
                  className="bg-white rounded-xl border p-3 shadow-sm"
                >
                  <div className="aspect-square rounded-lg bg-gray-100 mb-2" />
                  <p className="text-sm font-medium truncate">{name}</p>
                  <p className="text-sm font-semibold text-swart-700 mt-0.5">
                    ₹{Math.floor(Math.random() * 80) + 20}
                  </p>
                  <button className="mt-2 w-full py-1.5 text-xs font-medium rounded-lg border border-swart-600 text-swart-700 hover:bg-swart-50">
                    Add
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
