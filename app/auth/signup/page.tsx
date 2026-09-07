"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "vendor" ? "vendor" : "customer";

  const [role, setRole] = useState<"customer" | "vendor">(initialRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      await setDoc(doc(db, "users", uid), {
        role,
        email,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      if (role === "customer") {
        await setDoc(doc(db, "customerProfiles", uid), {
          name,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success("Account created!");
        router.push("/home");
      } else {
        await setDoc(doc(db, "vendorProfiles", uid), {
          ownerName: name,
          verificationStatus: "pending",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success("Vendor account created!");
        router.push("/vendor");
      }
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
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
        <h1 className="text-2xl font-bold text-center mb-1">Create account</h1>
        <p className="text-center text-gray-500 text-sm mb-6">Join SWART</p>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium border ${
              role === "customer"
                ? "bg-swart-600 text-white border-swart-600"
                : "bg-white text-gray-700"
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole("vendor")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium border ${
              role === "vendor"
                ? "bg-swart-600 text-white border-swart-600"
                : "bg-white text-gray-700"
            }`}
          >
            Vendor / Store
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {role === "vendor" ? "Owner Name" : "Full Name"}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-swart-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-swart-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-swart-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-swart-600 text-white font-medium hover:bg-swart-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-swart-600 font-medium hover:underline">
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
