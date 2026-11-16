export type Role = "customer" | "vendor" | "admin";

export const MOCK_STORES = [
  {
    id: "store-1",
    name: "Sharma Kirana",
    distance: "0.3 km",
    address: "Near Metro Station, Hyderabad",
    open: true,
    quickDelivery: true,
    scheduledDelivery: true,
    rating: 4.6,
  },
  {
    id: "store-2",
    name: "Fresh Mart",
    distance: "0.6 km",
    address: "Main Road, Madhapur",
    open: true,
    quickDelivery: true,
    scheduledDelivery: true,
    rating: 4.4,
  },
  {
    id: "store-3",
    name: "Daily Needs Store",
    distance: "0.9 km",
    address: "Beside Park, Gachibowli",
    open: true,
    quickDelivery: false,
    scheduledDelivery: true,
    rating: 4.2,
  },
];

export const MOCK_PRODUCTS = [
  { id: "p1", storeId: "store-1", name: "Amul Taaza 1L", price: 58, category: "Dairy", stock: 40 },
  { id: "p2", storeId: "store-1", name: "Britannia Bread", price: 45, category: "Groceries", stock: 25 },
  { id: "p3", storeId: "store-1", name: "Tata Salt 1kg", price: 28, category: "Groceries", stock: 60 },
  { id: "p4", storeId: "store-1", name: "Fortune Oil 1L", price: 165, category: "Groceries", stock: 18 },
  { id: "p5", storeId: "store-1", name: "Parle-G Family Pack", price: 30, category: "Snacks", stock: 50 },
  { id: "p6", storeId: "store-2", name: "Mother Dairy Curd", price: 35, category: "Dairy", stock: 30 },
  { id: "p7", storeId: "store-2", name: "Lay's Classic", price: 20, category: "Snacks", stock: 45 },
  { id: "p8", storeId: "store-2", name: "Colgate Paste", price: 95, category: "Personal", stock: 22 },
];

export const MOCK_CUSTOMERS = [
  { id: "c1", name: "Gunda Pranay", email: "pranaygunda2006@gmail.com", phone: "9876543210", joined: "2026-09-01" },
  { id: "c2", name: "Ananya Reddy", email: "ananya@example.com", phone: "9876501234", joined: "2026-09-12" },
  { id: "c3", name: "Rahul Sharma", email: "rahul@example.com", phone: "9123456780", joined: "2026-10-02" },
];

export const MOCK_VENDORS = [
  { id: "v1", name: "Ramesh Sharma", storeId: "store-1", storeName: "Sharma Kirana", email: "ramesh@sharma.com", status: "active" },
  { id: "v2", name: "Suresh Kumar", storeId: "store-2", storeName: "Fresh Mart", email: "suresh@fresh.com", status: "active" },
  { id: "v3", name: "Priya Patel", storeId: "store-3", storeName: "Daily Needs Store", email: "priya@daily.com", status: "pending" },
];

export const MOCK_ORDERS = [
  {
    id: "ord-1001",
    orderNumber: "SW202611161001",
    customerId: "c1",
    customerName: "Gunda Pranay",
    storeId: "store-1",
    storeName: "Sharma Kirana",
    items: [
      { name: "Amul Taaza 1L", qty: 2, price: 58 },
      { name: "Tata Salt 1kg", qty: 1, price: 28 },
    ],
    subtotal: 144,
    deliveryFee: 20,
    total: 164,
    status: "delivered",
    deliveryType: "quick",
    createdAt: "2026-11-15T10:30:00",
  },
  {
    id: "ord-1002",
    orderNumber: "SW202611161002",
    customerId: "c2",
    customerName: "Ananya Reddy",
    storeId: "store-2",
    storeName: "Fresh Mart",
    items: [{ name: "Lay's Classic", qty: 3, price: 20 }],
    subtotal: 60,
    deliveryFee: 15,
    total: 75,
    status: "pending",
    deliveryType: "scheduled",
    createdAt: "2026-11-16T14:20:00",
  },
];

export const MOCK_LOGS = [
  { id: "l1", time: "2026-11-16 19:45", action: "ORDER_PLACED", user: "c1", detail: "Order SW202611161001 placed" },
  { id: "l2", time: "2026-11-16 18:12", action: "VENDOR_LOGIN", user: "v1", detail: "Ramesh Sharma logged in" },
  { id: "l3", time: "2026-11-16 17:05", action: "PRODUCT_ADDED", user: "v2", detail: "New product added to Fresh Mart" },
  { id: "l4", time: "2026-11-16 15:30", action: "CUSTOMER_SIGNUP", user: "c3", detail: "New customer Rahul Sharma" },
  { id: "l5", time: "2026-11-16 12:00", action: "ORDER_DELIVERED", user: "v1", detail: "Order SW202611161001 marked delivered" },
];
