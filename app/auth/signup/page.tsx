"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "vendor" ? "vendor" : "customer";

  const [role, setRole] = useState<"customer" | "vendor">(initialRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Pure demo mode - no Firebase call
    setTimeout(() => {
      toast.success("Account created (demo)");
      router.push(role === "vendor" ? "/vendor" : "/");
      setLoading(false);
    }, 600);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-1">Create account</h1>
        <p className="text-center text-gray-500 text-sm mb-6">Join SWART</p>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition ${
              role === "customer"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole("vendor")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition ${
              role === "vendor"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            Vendor / Store
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              {role === "vendor" ? "Owner Name" : "Full Name"}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 transition"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-green-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
