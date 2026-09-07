/**
 * Search provider abstraction
 * Ready for Algolia / Typesense / Meilisearch later.
 * Current demo uses simple client-side filter (not for production scale).
 */

export interface SearchResult {
  id: string;
  name: string;
  type: "product" | "store";
  price?: number;
  storeName?: string;
  imageUrl?: string;
}

export interface SearchOptions {
  query: string;
  lat?: number;
  lng?: number;
  radiusKm?: number;
  limit?: number;
}

export async function searchProductsAndStores(
  options: SearchOptions
): Promise<SearchResult[]> {
  // Demo: return empty or mock. Real implementation will call search provider.
  if (!options.query.trim()) return [];

  // Placeholder results for demo UI
  return [
    {
      id: "demo-1",
      name: `${options.query} - Demo Product`,
      type: "product",
      price: 45,
      storeName: "Demo Kirana",
    },
  ];
}
