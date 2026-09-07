"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function VendorDeliveryPage() {
  const [quickEnabled, setQuickEnabled] = useState(true);
  const [quickFee, setQuickFee] = useState("20");
  const [scheduledEnabled, setScheduledEnabled] = useState(true);
  const [scheduledFee, setScheduledFee] = useState("15");
  const [freeThreshold, setFreeThreshold] = useState("499");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Delivery settings saved (demo)");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/vendor" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold">Delivery Settings</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Quick Delivery */}
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold">Quick Delivery</h2>
                <p className="text-xs text-gray-500">Target under 30 minutes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={quickEnabled}
                  onChange={(e) => setQuickEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-swart-600" />
              </label>
            </div>
            {quickEnabled && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Fee (₹) — you keep this
                </label>
                <input
                  type="number"
                  min="0"
                  value={quickFee}
                  onChange={(e) => setQuickFee(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-swart-500"
                />
                <p className="text-xs text-gray-500 mt-1">Set to 0 for free quick delivery</p>
              </div>
            )}
          </div>

          {/* Scheduled */}
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold">Scheduled Delivery</h2>
                <p className="text-xs text-gray-500">Min 2 hours · Max 7 days</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={scheduledEnabled}
                  onChange={(e) => setScheduledEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-swart-600" />
              </label>
            </div>
            {scheduledEnabled && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Base fee (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={scheduledFee}
                    onChange={(e) => setScheduledFee(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-swart-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Free delivery above (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={freeThreshold}
                    onChange={(e) => setFreeThreshold(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-swart-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty or 0 to always charge the base fee
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-swart-600 text-white font-medium hover:bg-swart-700"
          >
            Save delivery settings
          </button>
        </form>
      </main>
    </div>
  );
}
