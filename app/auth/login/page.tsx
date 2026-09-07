"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      router.push("/home");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-swart-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-swart-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-1">Welcome back</h1>
        <p className="text-center text-gray-500 text-sm mb-6">Log in to SWART</p>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-swart-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-swart-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-swart-600 text-white font-medium hover:bg-swart-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-swart-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
