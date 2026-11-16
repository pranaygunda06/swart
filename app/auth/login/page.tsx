"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { setUser } from "@/lib/auth-store";
import { MOCK_VENDORS } from "@/lib/mock-data";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (role === "vendor") {
        const v = MOCK_VENDORS.find((x) => x.email === email) || MOCK_VENDORS[0];
        setUser({
          id: v.id,
          name: v.name,
          email: v.email,
          role: "vendor",
          storeId: v.storeId,
          storeName: v.storeName,
        });
        toast.success(`Welcome, ${v.storeName}`);
        router.push("/vendor");
      } else {
        setUser({
          id: "c-demo",
          name: email.split("@")[0] || "Customer",
          email,
          role: "customer",
        });
        toast.success("Welcome back");
        router.push(next.startsWith("/") ? next : "/");
      }
      setLoading(false);
    }, 500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-md p-8"
      >
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-glow">
            <ShoppingBag className="h-7 w-7 text-white" />
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold text-ink-900">Welcome back</h1>
        <p className="mb-6 text-center text-sm text-ink-500">Log in to SWART</p>

        <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-brand-50 p-1">
          {(["customer", "vendor"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`rounded-xl py-2 text-sm font-bold capitalize transition ${
                role === r ? "bg-white text-brand-700 shadow-sm" : "text-ink-500"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-2 border-brand-100 px-3.5 py-2.5 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
              placeholder={role === "vendor" ? "ramesh@sharma.com" : "you@example.com"}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border-2 border-brand-100 px-3.5 py-2.5 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>

        {role === "vendor" && (
          <p className="mt-3 text-center text-[11px] text-ink-400">
            Demo: any password · try ramesh@sharma.com for Sharma Kirana
          </p>
        )}

        <p className="mt-6 text-center text-sm text-ink-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-semibold text-brand-600 hover:underline">
            Sign up
          </Link>
        </p>
        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-ink-400 hover:underline">
            ← Back to shops
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
