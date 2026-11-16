import Link from "next/link";
import { ShoppingBag, Store, Truck, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">SWART</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-gray-700 hover:text-green-700"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Your neighborhood Kirana,
          <br />
          <span className="text-green-600">now digital</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Discover local stores, compare prices, get quick or scheduled delivery.
          Retailers stay in full control of their prices, stock and delivery.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/auth/signup"
            className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            Start Shopping
          </Link>
          <Link
            href="/auth/signup?role=vendor"
            className="px-6 py-3 rounded-xl border-2 border-green-600 text-green-700 font-semibold hover:bg-green-50 transition"
          >
            Sell on SWART
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <Store className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Local Stores</h3>
            <p className="text-gray-600 text-sm">
              Shop from independent Kirana stores near you. Support your neighborhood.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Quick or Scheduled</h3>
            <p className="text-gray-600 text-sm">
              Under 30 min delivery when available, or schedule up to a week ahead.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Retailer Controlled</h3>
            <p className="text-gray-600 text-sm">
              Stores set their own prices, inventory, delivery fees and hours.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-gray-500">
        SWART Demo · Built with Next.js + Firebase
      </footer>
    </div>
  );
}
