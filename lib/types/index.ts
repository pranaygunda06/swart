export type UserRole = "customer" | "vendor" | "internal_admin";

export interface UserDoc {
  role: UserRole;
  phone?: string;
  email?: string;
  status: "active" | "suspended" | "pending";
  createdAt: any;
  updatedAt: any;
}

export interface CustomerProfile {
  name: string;
  profileImageUrl?: string;
  createdAt: any;
  updatedAt: any;
}

export interface VendorProfile {
  ownerName: string;
  verificationStatus: "pending" | "verified" | "rejected";
  businessInformation?: string;
  createdAt: any;
  updatedAt: any;
}

export interface Store {
  id: string;
  vendorId: string;
  name: string;
  description?: string;
  logoUrl?: string;
  address: string;
  latitude: number;
  longitude: number;
  deliveryRadiusKm: number;
  status: "open" | "closed" | "temporarily_closed";
  createdAt: any;
  updatedAt: any;
}

export interface StoreProduct {
  id: string;
  productId: string;
  sellingPrice: number;
  vendorImageUrl?: string;
  isAvailable: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface Inventory {
  stockQuantity: number;
  lowStockThreshold: number;
  stockStatus: "in_stock" | "low" | "out_of_stock";
  updatedAt: any;
}

export interface DeliverySettings {
  quickEnabled: boolean;
  quickFee: number;
  quickRadiusKm: number;
  scheduledEnabled: boolean;
  scheduledFee: number;
  freeDeliveryThreshold?: number;
  scheduledRadiusKm: number;
  minimumScheduleMinutes: number; // default 120
  maximumScheduleDays: number; // default 7
}

export interface CartItem {
  storeProductId: string;
  productId: string;
  quantity: number;
  createdAt: any;
  updatedAt: any;
}

export interface Cart {
  storeId: string | null;
  status: "active" | "checked_out";
  createdAt: any;
  updatedAt: any;
}

export type DeliveryType = "quick" | "scheduled";

export type OrderStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  storeId: string;
  addressSnapshot: any;
  subtotal: number;
  deliveryFee: number;
  discountTotal: number;
  grandTotal: number;
  deliveryType: DeliveryType;
  scheduledStart?: any;
  scheduledEnd?: any;
  status: OrderStatus;
  customerNotes?: string;
  idempotencyKey: string;
  createdAt: any;
  updatedAt: any;
}

export interface OrderItem {
  productId: string;
  productNameSnapshot: string;
  variantSnapshot?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface CheckoutQuote {
  subtotal: number;
  deliveryFee: number;
  discountTotal: number;
  grandTotal: number;
  availableDeliveryModes: DeliveryType[];
  availableSlots?: { start: string; end: string }[];
  storeId: string;
  expiresAt: number;
}
