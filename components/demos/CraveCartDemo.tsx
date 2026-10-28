"use client";

import React, { useState } from "react";
import {
  Utensils,
  ShoppingCart,
  Receipt,
  CheckCircle2,
  Tag,
  Plus,
  Minus,
  RotateCcw,
  FileCode,
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "f1", name: "Crave Double Cheeseburger", category: "Burgers", price: 149, badge: "Best Seller" },
  { id: "f2", name: "Crispy Chicken Rice Bowl", category: "Mains", price: 139, badge: "Popular" },
  { id: "f3", name: "Loaded Truffle Wedges", category: "Sides", price: 89 },
  { id: "f4", name: "Iced Caramel Macchiato", category: "Drinks", price: 99 },
];

export const CraveCartDemo: React.FC = () => {
  const [cart, setCart] = useState<Record<string, number>>({ f1: 1, f3: 1 });
  const [promoCode, setPromoCode] = useState("CRAVE10");
  const [discountApplied, setDiscountApplied] = useState(true);
  const [orderSlip, setOrderSlip] = useState<{
    orderNum: string;
    items: { name: string; qty: number; total: number }[];
    subtotal: number;
    discount: number;
    total: number;
  } | null>(null);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const discount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = Math.max(0, subtotal - discount);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id] > 1) copy[id] -= 1;
      else delete copy[id];
      return copy;
    });
  };

  const handlePlaceOrder = () => {
    const items = Object.entries(cart).map(([id, qty]) => {
      const m = MENU_ITEMS.find((item) => item.id === id)!;
      return { name: m.name, qty, total: m.price * qty };
    });

    const randomNum = Math.floor(100 + Math.random() * 900);
    setOrderSlip({
      orderNum: `CC-${randomNum}`,
      items,
      subtotal,
      discount,
      total: grandTotal,
    });
  };

  const handleReset = () => {
    setCart({ f1: 1 });
    setOrderSlip(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 text-zinc-900 dark:text-zinc-100 select-none">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111116] rounded-2xl border border-neutral-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-500 text-white flex items-center justify-center text-xs">
              <Utensils className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-800 dark:text-zinc-200 block leading-tight">
                Crave Cart Food Ordering Kiosk
              </span>
              <span className="text-[10px] text-neutral-500">
                Node.js Backend • Local File-Handling System
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Kiosk</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 flex-1 min-h-[360px]">
          {orderSlip ? (
            /* Printed Thermal Receipt Simulator */
            <div className="max-w-xs mx-auto p-4 rounded-xl bg-white dark:bg-zinc-900 border border-dashed border-neutral-300 dark:border-zinc-700 shadow-md font-mono text-xs space-y-3 animate-fade-in text-neutral-800 dark:text-zinc-200">
              <div className="text-center pb-2 border-b border-dashed border-neutral-300 dark:border-zinc-700">
                <h4 className="font-bold text-sm tracking-widest uppercase">CRAVE CART FOOD HUB</h4>
                <p className="text-[10px] text-neutral-500">Order ID: {orderSlip.orderNum}</p>
                <p className="text-[10px] text-neutral-400">Node.js fs.writeFile confirmation</p>
              </div>

              <div className="space-y-1.5 text-[11px]">
                {orderSlip.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {item.qty}x {item.name}
                    </span>
                    <span className="font-bold">₱{item.total}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-dashed border-neutral-300 dark:border-zinc-700 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₱{orderSlip.subtotal}</span>
                </div>
                {orderSlip.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Promo (CRAVE10):</span>
                    <span>-₱{orderSlip.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold pt-1 border-t border-neutral-200 dark:border-zinc-800">
                  <span>Total Paid:</span>
                  <span className="text-ig-pink">₱{orderSlip.total}</span>
                </div>
              </div>

              <button
                onClick={() => setOrderSlip(null)}
                className="w-full py-2 rounded-lg bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black font-sans font-bold text-xs hover:opacity-90 transition-opacity"
              >
                Order More Items
              </button>
            </div>
          ) : (
            /* Menu and Cart View */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Menu Browser (2 cols) */}
              <div className="md:col-span-2 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Digital Menu Browser
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MENU_ITEMS.map((item) => {
                    const inCart = cart[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between">
                            <h5 className="text-xs font-bold">{item.name}</h5>
                            {item.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-black font-mono text-ig-pink block mt-1">
                            ₱{item.price}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-end">
                          {inCart > 0 ? (
                            <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-zinc-800 rounded-lg p-0.5">
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="w-5 h-5 rounded bg-white dark:bg-zinc-700 text-xs font-bold flex items-center justify-center hover:bg-neutral-200"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold font-mono px-1">
                                {inCart}
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
                              className="px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity"
                            >
                              + Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cart Summary (1 col) */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-zinc-900/80 border border-neutral-200 dark:border-zinc-800 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-zinc-800">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Cart Summary
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {cartCount} items
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs max-h-[140px] overflow-y-auto">
                    {Object.entries(cart).map(([id, qty]) => {
                      const item = MENU_ITEMS.find((m) => m.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex justify-between items-center text-[11px]">
                          <span className="truncate pr-1">
                            {qty}x {item.name}
                          </span>
                          <span className="font-mono font-bold">₱{item.price * qty}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-zinc-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Subtotal:</span>
                    <span className="font-mono font-bold">₱{subtotal}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400">
                      <span>Promo (10%):</span>
                      <span className="font-mono font-bold">-₱{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black pt-1 border-t border-neutral-200 dark:border-zinc-800">
                    <span>Total:</span>
                    <span className="text-ig-pink font-mono">₱{grandTotal}</span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={cartCount === 0}
                    className="w-full py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>Place Order &amp; Print Slip</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
