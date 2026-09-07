"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/home" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold">Saved</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Heart className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="font-semibold text-lg mb-1">No saved stores yet</h2>
        <p className="text-sm text-gray-500">
          Save your favorite Kirana stores for quick access.
        </p>
      </main>
    </div>
  );
}
