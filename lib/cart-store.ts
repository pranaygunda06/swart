"use client";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  storeId: string;
  storeName: string;
};

const CART_KEY = "swart_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  if (cart.length > 0 && cart[0].storeId !== item.storeId) {
    throw new Error("ONE_STORE_ONLY");
  }
  const existing = cart.find((c) => c.productId === item.productId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart(cart);
  return cart;
}

export function updateQty(productId: string, quantity: number) {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((c) => c.productId !== productId);
  } else {
    cart = cart.map((c) => (c.productId === productId ? { ...c, quantity } : c));
  }
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
}
