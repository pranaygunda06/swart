/**
 * Clean mock data — each store belongs to ONE vendor.
 * Products are scoped by storeId. Vendors never share inventory.
 */

export type Role = "customer" | "vendor" | "admin";

export const MOCK_STORES = [
  {
    id: "store-1",
    vendorId: "v1",
    name: "Sharma Kirana",
    ownerName: "Ramesh Sharma",
    distance: "0.3 km",
    address: "Near Metro Station, Hyderabad",
    latitude: 17.4485,
    longitude: 78.3908,
    open: true,
    quickDelivery: true,
    scheduledDelivery: true,
    rating: 4.6,
  },
  {
    id: "store-2",
    vendorId: "v2",
    name: "Fresh Mart",
    ownerName: "Suresh Kumar",
    distance: "0.6 km",
    address: "Main Road, Madhapur",
    latitude: 17.4482,
    longitude: 78.3915,
    open: true,
    quickDelivery: true,
    scheduledDelivery: true,
    rating: 4.4,
  },
  {
    id: "store-3",
    vendorId: "v3",
    name: "Daily Needs Store",
    ownerName: "Priya Patel",
    distance: "0.9 km",
    address: "Beside Park, Gachibowli",
    latitude: 17.4401,
    longitude: 78.3489,
    open: true,
    quickDelivery: false,
    scheduledDelivery: true,
    rating: 4.2,
  },
];

/** Products belong only to their store — no shared catalog across vendors */
export const MOCK_PRODUCTS = [
  // Sharma Kirana (store-1 / v1)
  { id: "p1", storeId: "store-1", name: "Amul Taaza 1L", price: 58, category: "Dairy", stock: 40 },
  { id: "p2", storeId: "store-1", name: "Britannia Bread", price: 45, category: "Groceries", stock: 25 },
  { id: "p3", storeId: "store-1", name: "Tata Salt 1kg", price: 28, category: "Groceries", stock: 60 },
  { id: "p4", storeId: "store-1", name: "Fortune Oil 1L", price: 165, category: "Groceries", stock: 18 },
  { id: "p5", storeId: "store-1", name: "Parle-G Family Pack", price: 30, category: "Snacks", stock: 50 },
  // Fresh Mart (store-2 / v2) — different products
  { id: "p6", storeId: "store-2", name: "Mother Dairy Curd", price: 35, category: "Dairy", stock: 30 },
  { id: "p7", storeId: "store-2", name: "Lay's Classic", price: 20, category: "Snacks", stock: 45 },
  { id: "p8", storeId: "store-2", name: "Colgate Paste", price: 95, category: "Personal", stock: 22 },
  { id: "p9", storeId: "store-2", name: "Aashirvaad Atta 5kg", price: 280, category: "Groceries", stock: 12 },
  // Daily Needs (store-3 / v3)
  { id: "p10", storeId: "store-3", name: "Surf Excel 1kg", price: 210, category: "Personal", stock: 15 },
  { id: "p11", storeId: "store-3", name: "Maggi Pack of 4", price: 56, category: "Snacks", stock: 40 },
  { id: "p12", storeId: "store-3", name: "Nestle Milkmaid", price: 132, category: "Dairy", stock: 20 },
];

export const MOCK_CUSTOMERS: {
  id: string;
  name: string;
  email: string;
  phone: string;
  joined: string;
}[] = [];

export const MOCK_VENDORS = [
  {
    id: "v1",
    name: "Ramesh Sharma",
    storeId: "store-1",
    storeName: "Sharma Kirana",
    email: "ramesh@sharma.com",
    status: "active" as const,
  },
  {
    id: "v2",
    name: "Suresh Kumar",
    storeId: "store-2",
    storeName: "Fresh Mart",
    email: "suresh@fresh.com",
    status: "active" as const,
  },
  {
    id: "v3",
    name: "Priya Patel",
    storeId: "store-3",
    storeName: "Daily Needs Store",
    email: "priya@daily.com",
    status: "pending" as const,
  },
];

/** Orders scoped by storeId — vendor only sees their store's orders */
export const MOCK_ORDERS: {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  storeId: string;
  storeName: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: string;
  deliveryType: string;
  createdAt: string;
}[] = [];

export const MOCK_LOGS: {
  id: string;
  time: string;
  action: string;
  user: string;
  detail: string;
}[] = [];

/** Helpers for vendor isolation */
export function getStoreByVendor(vendorId: string) {
  return MOCK_STORES.find((s) => s.vendorId === vendorId);
}

export function getProductsByStore(storeId: string) {
  return MOCK_PRODUCTS.filter((p) => p.storeId === storeId);
}

export function getOrdersByStore(storeId: string) {
  return MOCK_ORDERS.filter((o) => o.storeId === storeId);
}
