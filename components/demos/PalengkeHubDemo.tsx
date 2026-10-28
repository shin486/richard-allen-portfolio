"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  MapPin,
  CheckCircle2,
  Search,
  ArrowRight,
  RotateCcw,
  Store,
  QrCode,
  Tag,
  Clock,
  Sparkles,
  Database,
  Smartphone,
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  category: "seafood" | "meat" | "produce" | "spices";
  price: number;
  unit: string;
  stall: string;
  stallNumber: string;
  status: string;
}

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "p1",
    name: "Fresh Bangus (Milkfish)",
    category: "seafood",
    price: 220,
    unit: "kg",
    stall: "Aling Nena's Fresh Catch",
    stallNumber: "Stall #14",
    status: "Daily Morning Harvest",
  },
  {
    id: "p2",
    name: "Pork Liempo (Pork Belly)",
    category: "meat",
    price: 360,
    unit: "kg",
    stall: "Mang Tonyo's Meats",
    stallNumber: "Stall #08",
    status: "NMIS Certified",
  },
  {
    id: "p3",
    name: "Batangas Native Tomatoes",
    category: "produce",
    price: 80,
    unit: "kg",
    stall: "Tita Belen Farm Produce",
    stallNumber: "Stall #22",
    status: "Direct from Farm",
  },
  {
    id: "p4",
    name: "Red Onions (Sibuyas)",
    category: "spices",
    price: 130,
    unit: "kg",
    stall: "Mang Lando Spices",
    stallNumber: "Stall #05",
    status: "Stable Market Price",
  },
  {
    id: "p5",
    name: "Live Fresh Tilapia",
    category: "seafood",
    price: 150,
    unit: "kg",
    stall: "Taal Lake Fresh Fish",
    stallNumber: "Stall #17",
    status: "Live Tank Catch",
  },
];

export const PalengkeHubDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"market" | "cart" | "receipt">(
    "market"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<Record<string, number>>({ p1: 1 });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("PLK-9402");
  const [role, setRole] = useState<"consumer" | "vendor">("consumer");
  const [vendorProducts, setVendorProducts] =
    useState<ProductItem[]>(INITIAL_PRODUCTS);

  const filtered = vendorProducts.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = vendorProducts.find((p) => p.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id] > 1) {
        copy[id] -= 1;
      } else {
        delete copy[id];
      }
      return copy;
    });
  };

  const handleCheckout = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setOrderId(`PLK-${randomNum}`);
    setOrderConfirmed(true);
    setActiveTab("receipt");
  };

  const handleReset = () => {
    setCart({ p1: 1 });
    setActiveTab("market");
    setOrderConfirmed(false);
    setRole("consumer");
  };

  const updatePrice = (id: string, delta: number) => {
    setVendorProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, price: Math.max(10, item.price + delta) }
          : item
      )
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 text-zinc-900 dark:text-zinc-100 select-none">
      {/* Recruiter Controller Ribbon */}
      <div className="w-full max-w-sm mb-2 flex items-center justify-between text-xs px-2">
        <div className="flex items-center gap-1.5 bg-neutral-200 dark:bg-zinc-800 p-1 rounded-lg">
          <button
            onClick={() => setRole("consumer")}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              role === "consumer"
                ? "bg-white dark:bg-zinc-900 shadow-sm text-ig-pink"
                : "text-neutral-600 dark:text-zinc-400"
            }`}
          >
            Consumer View
          </button>
          <button
            onClick={() => setRole("vendor")}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              role === "vendor"
                ? "bg-white dark:bg-zinc-900 shadow-sm text-emerald-600 dark:text-emerald-400"
                : "text-neutral-600 dark:text-zinc-400"
            }`}
          >
            Vendor Mode
          </button>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          title="Reset Interactive Simulator"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Realistic Mobile Device Frame */}
      <div className="relative w-full max-w-[340px] h-[520px] bg-neutral-950 rounded-[38px] p-2.5 shadow-2xl border-4 border-neutral-800 dark:border-zinc-700 flex flex-col overflow-hidden">
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
          <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Smartphone Screen Viewport */}
        <div className="relative w-full h-full bg-neutral-50 dark:bg-[#121216] rounded-[28px] overflow-hidden flex flex-col">
          {/* Mobile Status Bar */}
          <div className="h-9 px-5 pt-1.5 flex items-center justify-between text-[11px] font-semibold text-neutral-800 dark:text-zinc-300">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-[10px]">
              <Database className="w-2.5 h-2.5 text-emerald-500" />
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono">
                Supabase Live
              </span>
            </div>
          </div>

          {/* Mobile App Header */}
          <div className="px-4 py-2 border-b border-neutral-200 dark:border-zinc-800 bg-white dark:bg-[#18181f] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-ig-gradient flex items-center justify-center text-white text-[11px] font-black">
                P
              </div>
              <div>
                <h4 className="text-xs font-black tracking-tight leading-none text-neutral-900 dark:text-white">
                  PalengkeHub
                </h4>
                <p className="text-[9px] text-neutral-500 dark:text-zinc-400">
                  Lipa City Public Market
                </p>
              </div>
            </div>

            {role === "consumer" && (
              <button
                onClick={() => setActiveTab(activeTab === "cart" ? "market" : "cart")}
                className="relative p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="View pre-order cart"
              >
                <ShoppingCart className="w-4 h-4 text-neutral-700 dark:text-zinc-300" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Vendor Mode Banner */}
          {role === "vendor" && (
            <div className="bg-emerald-500/10 dark:bg-emerald-950/40 border-b border-emerald-500/20 px-3 py-1 flex items-center justify-between text-[10px] text-emerald-700 dark:text-emerald-300 font-medium">
              <span>Vendor Stall Management</span>
              <span className="font-mono text-[9px]">Realtime Supabase RLS</span>
            </div>
          )}

          {/* Screen Body */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {role === "vendor" ? (
              /* Vendor Price Adjustment View */
              <div className="space-y-2">
                <p className="text-[11px] text-neutral-600 dark:text-zinc-400">
                  Adjust market prices in real-time. Consumers instantly see updated prices across stalls:
                </p>
                {vendorProducts.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold">{item.name}</p>
                      <p className="text-[10px] text-neutral-500">{item.stallNumber}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updatePrice(item.id, -10)}
                        className="w-6 h-6 rounded-md bg-neutral-200 dark:bg-zinc-800 font-bold text-xs hover:bg-neutral-300"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold font-mono min-w-[50px] text-center">
                        ₱{item.price}
                      </span>
                      <button
                        onClick={() => updatePrice(item.id, 10)}
                        className="w-6 h-6 rounded-md bg-neutral-200 dark:bg-zinc-800 font-bold text-xs hover:bg-neutral-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : activeTab === "market" ? (
              /* Consumer Market View */
              <>
                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px]">
                  {["all", "seafood", "meat", "produce", "spices"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-1 rounded-full capitalize whitespace-nowrap font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black font-semibold"
                          : "bg-white dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400 border border-neutral-200 dark:border-zinc-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Products List */}
                <div className="space-y-2">
                  {filtered.map((item) => {
                    const inCartQty = cart[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800/80 hover:border-neutral-300 dark:hover:border-zinc-700 transition-all flex items-center justify-between"
                      >
                        <div className="min-w-0 pr-2">
                          <h5 className="text-xs font-bold truncate text-neutral-900 dark:text-zinc-100">
                            {item.name}
                          </h5>
                          <div className="flex items-center gap-1.5 text-[9px] text-neutral-500 dark:text-zinc-400 mt-0.5">
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                              {item.stallNumber}
                            </span>
                            <span>•</span>
                            <span className="truncate">{item.stall}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-1">
                            <span className="text-xs font-black text-ig-pink">
                              ₱{item.price}
                            </span>
                            <span className="text-[9px] text-neutral-400">
                              / {item.unit}
                            </span>
                          </div>
                        </div>

                        {inCartQty > 0 ? (
                          <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-zinc-800 rounded-lg p-0.5">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-5 h-5 rounded bg-white dark:bg-zinc-700 text-xs font-bold flex items-center justify-center hover:bg-neutral-200"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold font-mono px-1">
                              {inCartQty}
                            </span>
                            <button
                              onClick={() => addToCart(item.id)}
                              className="w-5 h-5 rounded bg-white dark:bg-zinc-700 text-xs font-bold flex items-center justify-center hover:bg-neutral-200"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black text-[10px] font-bold hover:opacity-90 active:scale-95 transition-all flex items-center gap-1"
                          >
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : activeTab === "cart" ? (
              /* Cart & Checkout View */
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Pre-Order Staging
                </h5>
                {cartItemCount === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-xs text-neutral-400">Cart is empty</p>
                    <button
                      onClick={() => setActiveTab("market")}
                      className="mt-2 text-xs text-ig-pink font-semibold underline"
                    >
                      Browse fresh market goods
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      {Object.entries(cart).map(([id, qty]) => {
                        const item = vendorProducts.find((p) => p.id === id);
                        if (!item) return null;
                        return (
                          <div
                            key={id}
                            className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-between text-xs"
                          >
                            <div className="min-w-0 pr-2">
                              <p className="font-semibold truncate">{item.name}</p>
                              <p className="text-[10px] text-neutral-500">
                                ₱{item.price} × {qty}
                              </p>
                            </div>
                            <span className="font-mono font-bold">
                              ₱{item.price * qty}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-zinc-900/90 space-y-1.5 text-xs">
                      <div className="flex justify-between text-neutral-500 text-[11px]">
                        <span>Stall Handling:</span>
                        <span>₱0 (Free Pre-Order)</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm pt-1 border-t border-neutral-200 dark:border-zinc-800">
                        <span>Total:</span>
                        <span className="text-ig-pink font-mono">₱{cartTotal}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full py-2.5 rounded-xl bg-ig-gradient text-white font-bold text-xs hover:opacity-95 active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>Submit Pre-Order to Supabase</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            ) : (
              /* Receipt & Confirmation View */
              <div className="space-y-3 text-center py-2 animate-fade-in">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-xs font-bold">Pre-Order Dispatched!</h5>
                  <p className="text-[10px] text-neutral-500">
                    Row stored with Row-Level Security in Supabase
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-left space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Order ID:</span>
                    <span className="font-mono font-bold">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Pickup Counter:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Stall #14 (Wet Market Sec.)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Amount Due at Stall:</span>
                    <span className="font-bold font-mono">₱{cartTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCart({ p1: 1 });
                    setActiveTab("market");
                  }}
                  className="w-full py-2 rounded-xl bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black font-semibold text-xs hover:opacity-90 transition-opacity"
                >
                  Create Another Test Order
                </button>
              </div>
            )}
          </div>

          {/* Bottom Bar for Consumer */}
          {role === "consumer" && activeTab === "market" && cartItemCount > 0 && (
            <div className="p-2 border-t border-neutral-200 dark:border-zinc-800 bg-white dark:bg-[#18181f] flex items-center justify-between">
              <div>
                <p className="text-[9px] text-neutral-400 leading-none">Pre-order Total</p>
                <p className="text-xs font-black text-ig-pink font-mono">
                  ₱{cartTotal}
                </p>
              </div>
              <button
                onClick={() => setActiveTab("cart")}
                className="px-3 py-1.5 rounded-lg bg-ig-gradient text-white text-[10px] font-bold shadow-sm"
              >
                Checkout ({cartItemCount})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
