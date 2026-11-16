"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { getUser } from "@/lib/auth-store";
import { getStoreByVendor, MOCK_STORES } from "@/lib/mock-data";

export default function VendorStorePage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  useEffect(() => {
    const u = getUser();
    const store =
      (u?.id && getStoreByVendor(u.id)) ||
      MOCK_STORES.find((s) => s.id === u?.storeId) ||
      MOCK_STORES[0];
    if (store) {
      setName(store.name);
      setAddress(store.address);
      setLat(String(store.latitude));
      setLng(String(store.longitude));
    }
  }, []);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Store location saved (demo)");
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="border-b border-brand-100 bg-white">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
          <Link href="/vendor" className="rounded-full p-1 hover:bg-brand-50">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-bold">Store & location</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <p className="mb-4 text-sm text-ink-500">
          Shop name is your store identity. Set coordinates for delivery radius (map pin later).
        </p>
        <form onSubmit={handleSave} className="card space-y-4 p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Shop name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border-2 border-brand-100 px-3.5 py-2.5 focus:border-brand-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border-2 border-brand-100 px-3.5 py-2.5 focus:border-brand-400 focus:outline-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 flex items-center gap-1 text-sm font-medium">
                <MapPin className="h-3.5 w-3.5 text-brand-600" /> Latitude
              </label>
              <input
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                type="number"
                step="any"
                className="w-full rounded-xl border-2 border-brand-100 px-3.5 py-2.5 focus:border-brand-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Longitude</label>
              <input
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                type="number"
                step="any"
                className="w-full rounded-xl border-2 border-brand-100 px-3.5 py-2.5 focus:border-brand-400 focus:outline-none"
                required
              />
            </div>
          </div>
          <p className="text-xs text-ink-400">
            Map picker can be added next — for now enter lat/lng of the shop.
          </p>
          <button type="submit" className="btn-primary">
            Save store
          </button>
        </form>
      </main>
    </div>
  );
}
