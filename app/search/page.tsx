"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { searchProductsAndStores } from "@/lib/services/search";
import type { SearchResult } from "@/lib/services/search";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(q: string) {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await searchProductsAndStores({ query: q });
      setResults(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/home" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products or stores..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-swart-500"
            />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4">
        {loading && <p className="text-sm text-gray-500">Searching...</p>}
        {!loading && query && results.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">No results for “{query}”</p>
        )}
        <div className="space-y-3">
          {results.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-xl border p-3 shadow-sm flex gap-3"
            >
              <div className="w-14 h-14 rounded-lg bg-gray-100 shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{r.name}</p>
                {r.storeName && (
                  <p className="text-xs text-gray-500">{r.storeName}</p>
                )}
                {r.price != null && (
                  <p className="text-sm font-semibold text-swart-700 mt-0.5">
                    ₹{r.price}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
