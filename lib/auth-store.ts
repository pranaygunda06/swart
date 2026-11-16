"use client";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "vendor";
  /** Only for vendors — their single store */
  storeId?: string;
  storeName?: string;
};

const AUTH_KEY = "swart_auth";

export function getUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setUser(user: DemoUser | null) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  else localStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn() {
  return !!getUser();
}

export function requireCustomer(): DemoUser | null {
  const u = getUser();
  if (!u || u.role !== "customer") return null;
  return u;
}

export function requireVendor(): DemoUser | null {
  const u = getUser();
  if (!u || u.role !== "vendor") return null;
  return u;
}

export function logout() {
  setUser(null);
}
