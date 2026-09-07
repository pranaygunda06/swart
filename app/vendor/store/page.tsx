"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function VendorStorePage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState("3");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Store details saved (demo)");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/vendor" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold">Store Settings</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSave} className="bg-white rounded-xl border p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Store name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-swart-500"
              placeholder="e.g. Sharma Kirana"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-swart-500"
              placeholder="Full store address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery radius (km)
            </label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-swart-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-swart-600 text-white font-medium hover:bg-swart-700"
          >
            Save store
          </button>
        </form>
      </main>
    </div>
  );
}
