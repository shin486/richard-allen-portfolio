"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  MapPin,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Database,
  Store,
} from "lucide-react";

interface ProductItem {
  id: string;
  stallNumber: string;
  stallName: string;
  name: string;
  description: string;
  category: "Rice" | "Fruits" | "Vegetables" | "Meat" | "Poultry" | "Seafood" | "Dry Goods";
  price: number;
  unit: string;
  stock: number;
  coords: string;
}

/**
 * Exact products and vendor stalls from PalengkeHubFinal:
 * - seed-uat-stall-locations.sql
 * - seed-uat-transactions.sql
 */
const REAL_PALENGKE_PRODUCTS: ProductItem[] = [
  {
    id: "uat-01-dinorado",
    stallNumber: "UAT-01",
    stallName: "Rice & Grains ni Aling Rosa",
    name: "Dinorado Rice",
    description: "Premium local dinorado rice",
    category: "Rice",
    price: 58,
    unit: "kg",
    stock: 80,
    coords: "13.9442820, 121.1610582",
  },
  {
    id: "uat-01-sinandomeng",
    stallNumber: "UAT-01",
    stallName: "Rice & Grains ni Aling Rosa",
    name: "Sinandomeng Rice",
    description: "Everyday sinandomeng rice",
    category: "Rice",
    price: 48,
    unit: "kg",
    stock: 100,
    coords: "13.9442820, 121.1610582",
  },
  {
    id: "uat-02-mango",
    stallNumber: "UAT-02",
    stallName: "Sweet Fruits ni Kuya Ben",
    name: "Carabao Mango",
    description: "Sweet carabao mangoes",
    category: "Fruits",
    price: 120,
    unit: "kg",
    stock: 50,
    coords: "13.9441454, 121.1610543",
  },
  {
    id: "uat-02-lakatan",
    stallNumber: "UAT-02",
    stallName: "Sweet Fruits ni Kuya Ben",
    name: "Lakatan Banana",
    description: "Sweet ripe lakatan bananas",
    category: "Fruits",
    price: 70,
    unit: "kg",
    stock: 60,
    coords: "13.9441454, 121.1610543",
  },
  {
    id: "uat-03-kangkong",
    stallNumber: "UAT-03",
    stallName: "Fresh Veggies ni Aling Nena",
    name: "Kangkong",
    description: "Fresh water spinach",
    category: "Vegetables",
    price: 25,
    unit: "kg",
    stock: 70,
    coords: "13.9439624, 121.1611239",
  },
  {
    id: "uat-03-sitaw",
    stallNumber: "UAT-03",
    stallName: "Fresh Veggies ni Aling Nena",
    name: "Sitaw",
    description: "Fresh string beans",
    category: "Vegetables",
    price: 50,
    unit: "kg",
    stock: 45,
    coords: "13.9439624, 121.1611239",
  },
  {
    id: "uat-04-liempo",
    stallNumber: "UAT-04",
    stallName: "Meat Section Stall #04",
    name: "Pork Liempo",
    description: "Fresh pork belly",
    category: "Meat",
    price: 280,
    unit: "kg",
    stock: 40,
    coords: "13.9440112, 121.1612104",
  },
  {
    id: "uat-04-chicken",
    stallNumber: "UAT-04",
    stallName: "Meat Section Stall #04",
    name: "Whole Chicken",
    description: "Fresh dressed chicken",
    category: "Poultry",
    price: 180,
    unit: "kg",
    stock: 35,
    coords: "13.9440112, 121.1612104",
  },
  {
    id: "uat-05-brisket",
    stallNumber: "UAT-05",
    stallName: "Beef & Poultry Stall #05",
    name: "Beef Brisket",
    description: "Fresh beef brisket",
    category: "Meat",
    price: 380,
    unit: "kg",
    stock: 25,
    coords: "13.9440890, 121.1613050",
  },
  {
    id: "uat-06-bangus",
    stallNumber: "UAT-06",
    stallName: "Isda ni Mang Lito",
    name: "Bangus",
    description: "Fresh milkfish",
    category: "Seafood",
    price: 180,
    unit: "kg",
    stock: 45,
    coords: "13.9442100, 121.1614120",
  },
  {
    id: "uat-06-hipon",
    stallNumber: "UAT-06",
    stallName: "Isda ni Mang Lito",
    name: "Hipon",
    description: "Fresh shrimp",
    category: "Seafood",
    price: 320,
    unit: "kg",
    stock: 25,
    coords: "13.9442100, 121.1614120",
  },
  {
    id: "uat-07-kamatis",
    stallNumber: "UAT-07",
    stallName: "Lordwig's Veggies",
    name: "Kamatis",
    description: "Fresh tomatoes",
    category: "Vegetables",
    price: 60,
    unit: "kg",
    stock: 55,
    coords: "13.9438500, 121.1612900",
  },
  {
    id: "uat-08-tokwa",
    stallNumber: "UAT-08",
    stallName: "Dry Goods & Poultry #08",
    name: "Tokwa & Itlog",
    description: "Fresh tofu (₱40/kg)",
    category: "Dry Goods",
    price: 40,
    unit: "kg",
    stock: 60,
    coords: "13.9437900, 121.1611800",
  },
];

const CATEGORIES = ["All", "Seafood", "Meat", "Vegetables", "Fruits", "Rice", "Poultry", "Dry Goods"];

export const PalengkeHubDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"market" | "stalls" | "cart" | "receipt">("market");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<Record<string, number>>({
    "uat-06-bangus": 1,
    "uat-01-dinorado": 2,
  });
  const [orderId, setOrderId] = useState("ORD-20260806-841");
  const [role, setRole] = useState<"consumer" | "vendor">("consumer");
  const [vendorProducts, setVendorProducts] = useState<ProductItem[]>(REAL_PALENGKE_PRODUCTS);

  const filtered = vendorProducts.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // Matches PalengkeHub enforce_order_item_prices trigger: subtotal = total_amount = sum(price * qty)
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
    const randomNum = Math.floor(100 + Math.random() * 900);
    setOrderId(`ORD-20260806-${randomNum}`);
    setActiveTab("receipt");
  };

  const handleReset = () => {
    setCart({ "uat-06-bangus": 1, "uat-01-dinorado": 2 });
    setActiveTab("market");
    setRole("consumer");
    setVendorProducts(REAL_PALENGKE_PRODUCTS);
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
      {/* Top Role Switcher */}
      <div className="w-full max-w-sm mb-2 flex items-center justify-between text-xs px-2">
        <div className="flex items-center gap-1 bg-neutral-200 dark:bg-zinc-800 p-1 rounded-lg">
          <button
            onClick={() => setRole("consumer")}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              role === "consumer"
                ? "bg-white dark:bg-zinc-900 shadow-sm text-ig-pink"
                : "text-neutral-600 dark:text-zinc-400"
            }`}
          >
            Consumer App
          </button>
          <button
            onClick={() => setRole("vendor")}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              role === "vendor"
                ? "bg-white dark:bg-zinc-900 shadow-sm text-emerald-600 dark:text-emerald-400"
                : "text-neutral-600 dark:text-zinc-400"
            }`}
          >
            Vendor Stall Admin
          </button>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Smartphone Mockup Frame */}
      <div className="relative w-full max-w-[350px] h-[540px] bg-neutral-950 rounded-[38px] p-2.5 shadow-2xl border-4 border-neutral-800 dark:border-zinc-700 flex flex-col overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
          <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Phone Screen */}
        <div className="relative w-full h-full bg-neutral-50 dark:bg-[#121216] rounded-[28px] overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="h-9 px-5 pt-1.5 flex items-center justify-between text-[11px] font-semibold text-neutral-800 dark:text-zinc-300">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-[10px]">
              <Database className="w-2.5 h-2.5 text-emerald-500" />
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono">
                Supabase (jjpgmpuf)
              </span>
            </div>
          </div>

          {/* App Header */}
          <div className="px-4 py-2 border-b border-neutral-200 dark:border-zinc-800 bg-white dark:bg-[#18181f] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white text-[11px] font-black">
                P
              </div>
              <div>
                <h4 className="text-xs font-black tracking-tight leading-none text-neutral-900 dark:text-white">
                  PalengkeHub
                </h4>
                <p className="text-[9px] text-neutral-500 dark:text-zinc-400">
                  Wet Market • P. Torres &amp; Rizal St.
                </p>
              </div>
            </div>

            {role === "consumer" && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("stalls")}
                  className={`p-1.5 rounded-full transition-colors ${
                    activeTab === "stalls"
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : "hover:bg-neutral-100 dark:hover:bg-zinc-800 text-neutral-600 dark:text-zinc-300"
                  }`}
                  title="Stall Map Directory"
                >
                  <MapPin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab(activeTab === "cart" ? "market" : "cart")}
                  className="relative p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="View pre-order cart"
                >
                  <ShoppingCart className="w-4 h-4 text-neutral-700 dark:text-zinc-300" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Screen Body */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {role === "vendor" ? (
              /* Vendor Mode */
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-700 dark:text-emerald-300">
                  <strong>public.products</strong> — Update per-kg prices across UAT stalls. Trigger <code>enforce_order_item_prices</code> validates order totals automatically.
                </div>
                {vendorProducts.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold truncate">{item.name}</p>
                      <p className="text-[10px] text-neutral-500 truncate">
                        {item.stallNumber} • {item.stallName}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => updatePrice(item.id, -5)}
                        className="w-6 h-6 rounded-md bg-neutral-200 dark:bg-zinc-800 font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold font-mono min-w-[46px] text-center">
                        ₱{item.price}
                      </span>
                      <button
                        onClick={() => updatePrice(item.id, 5)}
                        className="w-6 h-6 rounded-md bg-neutral-200 dark:bg-zinc-800 font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : activeTab === "stalls" ? (
              /* Real Stall Locations Directory (seed-uat-stall-locations.sql) */
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold">Market Stall Pins (public.stall_locations)</h5>
                  <button
                    onClick={() => setActiveTab("market")}
                    className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 underline"
                  >
                    Back to Goods
                  </button>
                </div>
                <p className="text-[10px] text-neutral-500">
                  Clustered in the Wet Market building near P. Torres St. &amp; Rizal St. (capture_method: <code>manual_no_gps</code>):
                </p>
                {[
                  { code: "UAT-01", name: "Rice & Grains ni Aling Rosa", coords: "13.9442820, 121.1610582", cat: "Rice & Grains" },
                  { code: "UAT-02", name: "Sweet Fruits ni Kuya Ben", coords: "13.9441454, 121.1610543", cat: "Fresh Fruits" },
                  { code: "UAT-03", name: "Fresh Veggies ni Aling Nena", coords: "13.9439624, 121.1611239", cat: "Vegetables" },
                  { code: "UAT-06", name: "Isda ni Mang Lito", coords: "13.9442100, 121.1614120", cat: "Fresh Seafood" },
                  { code: "UAT-07", name: "Lordwig's Veggies", coords: "13.9438500, 121.1612900", cat: "Highland Veggies" },
                ].map((s) => (
                  <div
                    key={s.code}
                    className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{s.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                        {s.code}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-500">
                      <span>{s.cat}</span>
                      <span className="font-mono text-[9px]">{s.coords}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : activeTab === "market" ? (
              /* Consumer Marketplace */
              <>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px]">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-emerald-600 text-white font-semibold"
                          : "bg-white dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400 border border-neutral-200 dark:border-zinc-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {filtered.map((item) => {
                    const inCartQty = cart[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800/80 flex items-center justify-between"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <h5 className="text-xs font-bold truncate text-neutral-900 dark:text-zinc-100">
                              {item.name}
                            </h5>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-zinc-800 text-neutral-500">
                              {item.stallNumber}
                            </span>
                          </div>
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium truncate">
                            {item.stallName}
                          </p>
                          <div className="mt-1 flex items-center gap-1.5">
                            <span className="text-xs font-black text-neutral-900 dark:text-white font-mono">
                              ₱{item.price}.00
                            </span>
                            <span className="text-[9px] text-neutral-400">
                              / {item.unit} • Stock: {item.stock}kg
                            </span>
                          </div>
                        </div>

                        {inCartQty > 0 ? (
                          <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-zinc-800 rounded-lg p-0.5">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-5 h-5 rounded bg-white dark:bg-zinc-700 text-xs font-bold flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold font-mono px-1">
                              {inCartQty}
                            </span>
                            <button
                              onClick={() => addToCart(item.id)}
                              className="w-5 h-5 rounded bg-white dark:bg-zinc-700 text-xs font-bold flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-700 active:scale-95 transition-all"
                          >
                            + Pre-Order
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : activeTab === "cart" ? (
              /* Cart & Pre-Order View */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    public.orders Staging
                  </h5>
                  <button
                    onClick={() => setActiveTab("market")}
                    className="text-[10px] text-emerald-600 font-semibold underline"
                  >
                    + Add More
                  </button>
                </div>

                {cartItemCount === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-xs text-neutral-400">No items selected</p>
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
                                {item.stallName} ({item.stallNumber}) • ₱{item.price} × {qty}kg
                              </p>
                            </div>
                            <span className="font-mono font-bold">
                              ₱{item.price * qty}.00
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-zinc-900/90 space-y-1 text-xs">
                      <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                        <span>Trigger Check:</span>
                        <span className="text-emerald-600 dark:text-emerald-400">
                          enforce_order_item_prices PASS
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-sm pt-1 border-t border-neutral-200 dark:border-zinc-800">
                        <span>total_amount:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                          ₱{cartTotal}.00
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>Insert Pre-Order to public.orders</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            ) : (
              /* Receipt & public.audit_log Confirmation */
              <div className="space-y-3 text-center py-2 animate-fade-in">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-xs font-bold">Order Logged in public.audit_log!</h5>
                  <p className="text-[10px] text-neutral-500 font-mono">
                    action=&apos;order_completed&apos; • status=&apos;completed&apos;
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-left space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">order_number:</span>
                    <span className="font-mono font-bold">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Pickup Window:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      11:00 AM – 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">subtotal / total_amount:</span>
                    <span className="font-bold font-mono">₱{cartTotal}.00</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCart({ "uat-06-bangus": 1 });
                    setActiveTab("market");
                  }}
                  className="w-full py-2 rounded-xl bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black font-semibold text-xs hover:opacity-90 transition-opacity"
                >
                  Place Another Order
                </button>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          {role === "consumer" && activeTab === "market" && cartItemCount > 0 && (
            <div className="p-2.5 border-t border-neutral-200 dark:border-zinc-800 bg-white dark:bg-[#18181f] flex items-center justify-between">
              <div>
                <p className="text-[9px] text-neutral-400 leading-none">
                  Pre-order ({cartItemCount} kg)
                </p>
                <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  ₱{cartTotal}.00
                </p>
              </div>
              <button
                onClick={() => setActiveTab("cart")}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold shadow-sm"
              >
                Review Order ({cartItemCount})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
