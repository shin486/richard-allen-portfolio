"use client";

import React, { useState } from "react";
import {
  Utensils,
  ShoppingCart,
  Receipt,
  RotateCcw,
  Star,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: "Burgers" | "Pizzas" | "Sides" | "Drinks";
  image: string;
}

/**
 * Exact menu items from data/menu.json in shin486/food-ordering-system:
 * Default cart items & 8% tax formula from public/js/cart.js
 * Feedback fs.writeFileSync from server.js & public/js/feedback.js
 */
const REAL_MENU_ITEMS: MenuItem[] = [
  { id: 1, name: "Cheeseburger", price: 5.99, category: "Burgers", image: "burger.jpg" },
  { id: 2, name: "Pepperoni Pizza", price: 8.99, category: "Pizzas", image: "pizza.jpg" },
  { id: 3, name: "French Fries", price: 2.99, category: "Sides", image: "fries.jpg" },
  { id: 4, name: "Soda", price: 1.49, category: "Drinks", image: "soda.jpg" },
];

export const CraveCartDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"menu" | "feedback">("menu");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  // Matches default cartItems in public/js/cart.js: 2x Cheeseburger, 1x French Fries
  const [cart, setCart] = useState<Record<number, number>>({ 1: 2, 3: 1 });
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Feedback state matching public/js/feedback.js
  const [rating, setRating] = useState<number>(5);
  const [comments, setComments] = useState<string>("Fast ordering and great cheeseburger!");
  const [feedbackJson, setFeedbackJson] = useState<
    { rating: number; comments: string; date: string }[]
  >([
    {
      rating: 5,
      comments: "Smooth checkout flow from /menu to /cart!",
      date: "2026-10-28T14:20:00.000Z",
    },
  ]);

  const filteredMenu =
    selectedCategory === "all"
      ? REAL_MENU_ITEMS
      : REAL_MENU_ITEMS.filter(
          (item) => item.category.toLowerCase() === selectedCategory
        );

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // Exact formula from public/js/cart.js:
  // const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // const tax = subtotal * 0.08; // 8% tax
  // const total = subtotal + tax;
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = REAL_MENU_ITEMS.find((m) => m.id === Number(id));
    return sum + (item ? item.price * qty : 0);
  }, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setOrderConfirmed(false);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id] > 1) copy[id] -= 1;
      else delete copy[id];
      return copy;
    });
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) return;
    const entry = {
      rating,
      comments: comments.trim(),
      date: new Date().toISOString(),
    };
    setFeedbackJson((prev) => [entry, ...prev]);
    setComments("");
  };

  const handleReset = () => {
    setCart({ 1: 2, 3: 1 });
    setOrderConfirmed(false);
    setSelectedCategory("all");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 text-zinc-900 dark:text-zinc-100 select-none">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111116] rounded-2xl border border-neutral-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-500 text-white flex items-center justify-center text-xs">
              <Utensils className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-800 dark:text-zinc-200 block leading-tight">
                Crave Cart (server.js • Express 4.18)
              </span>
              <span className="text-[10px] text-neutral-500">
                GET /api/menu • POST /api/feedback (data/feedback.json)
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Navigation matching views/menu.html & views/feedback.html */}
        <div className="flex border-b border-neutral-200 dark:border-zinc-800 text-xs font-semibold bg-neutral-50 dark:bg-zinc-900/50">
          <button
            onClick={() => setActiveTab("menu")}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "menu"
                ? "border-orange-500 text-orange-600 dark:text-orange-400 bg-white dark:bg-zinc-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>/menu &amp; /cart (data/menu.json)</span>
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "feedback"
                ? "border-orange-500 text-orange-600 dark:text-orange-400 bg-white dark:bg-zinc-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>/feedback (fs.writeFileSync)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 flex-1 min-h-[350px]">
          {activeTab === "menu" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Menu Browser (public/js/menu.js) */}
              <div className="md:col-span-2 space-y-3">
                {/* Category Filter Buttons from views/menu.html */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                  {[
                    { key: "all", label: "All Items" },
                    { key: "burgers", label: "Burgers" },
                    { key: "pizzas", label: "Pizzas" },
                    { key: "sides", label: "Sides" },
                    { key: "drinks", label: "Drinks" },
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                        selectedCategory === cat.key
                          ? "bg-orange-500 text-white"
                          : "bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredMenu.map((item) => {
                    const qty = cart[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-neutral-400">
                              {item.category}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400">
                              {item.image}
                            </span>
                          </div>
                          <h5 className="text-xs font-bold mt-0.5">{item.name}</h5>
                          <span className="text-sm font-black font-mono text-orange-600 dark:text-orange-400 block mt-1">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-end">
                          {qty > 0 ? (
                            <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-zinc-800 rounded-lg p-0.5">
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="w-6 h-6 rounded bg-white dark:bg-zinc-700 text-xs font-bold"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold font-mono px-1.5">
                                {qty}
                              </span>
                              <button
                                onClick={() => addToCart(item.id)}
                                className="w-6 h-6 rounded bg-white dark:bg-zinc-700 text-xs font-bold"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item.id)}
                              className="px-3 py-1 rounded-lg bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cart Container (public/js/cart.js) */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-zinc-900/80 border border-neutral-200 dark:border-zinc-800 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-zinc-800">
                    <span className="text-xs font-bold">#cartContainer</span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {cartCount} items
                    </span>
                  </div>

                  {orderConfirmed ? (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1.5 animate-fade-in">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                      <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        Order Placed!
                      </p>
                      <p className="text-[10px] font-mono text-neutral-500">
                        Redirected to /order-confirm.html
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-xs max-h-[130px] overflow-y-auto">
                      {Object.entries(cart).map(([id, qty]) => {
                        const item = REAL_MENU_ITEMS.find((m) => m.id === Number(id));
                        if (!item) return null;
                        return (
                          <div
                            key={id}
                            className="flex justify-between items-center text-[11px]"
                          >
                            <span className="truncate pr-1">
                              {item.name} (${item.price.toFixed(2)} × {qty})
                            </span>
                            <span className="font-mono font-bold">
                              ${(item.price * qty).toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-neutral-200 dark:border-zinc-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">#subtotal:</span>
                    <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">#tax (8%):</span>
                    <span className="font-mono font-bold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black pt-1 border-t border-neutral-200 dark:border-zinc-800">
                    <span>#total:</span>
                    <span className="text-orange-600 dark:text-orange-400 font-mono">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => setOrderConfirmed(true)}
                    disabled={cartCount === 0}
                    className="w-full mt-2 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>#placeOrderBtn</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Local File-Handling Feedback System (public/js/feedback.js & server.js) */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              <form onSubmit={handleSubmitFeedback} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1">
                    Star Rating (<code>.star</code> selector):
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setRating(val)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            val <= rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-300 dark:text-zinc-700"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold ml-1">
                      {rating} / 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">
                    Customer Comments:
                  </label>
                  <textarea
                    rows={3}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Write feedback to append to ./data/feedback.json..."
                    className="w-full p-2.5 text-xs rounded-xl border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-sm"
                >
                  POST /api/feedback (fs.writeFileSync)
                </button>
              </form>

              <div className="p-3 rounded-xl bg-neutral-900 text-zinc-200 font-mono text-[11px] flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-zinc-400">
                  <span>./data/feedback.json</span>
                  <span className="text-emerald-400">200 OK</span>
                </div>
                <pre className="mt-2 overflow-x-auto text-[10px] leading-relaxed text-emerald-300 max-h-[190px]">
                  {JSON.stringify(feedbackJson, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
