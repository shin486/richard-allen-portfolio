"use client";

import React, { useState, useMemo } from "react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "mains" | "sides" | "drinks";
  emoji: string;
}

// Synced directly with data/menu.json from https://github.com/shin486/food-ordering-system
const MENU_DATA: MenuItem[] = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    price: 8.99,
    category: "mains",
    emoji: "🍔",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Traditional pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    category: "mains",
    emoji: "🍕",
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 6.99,
    category: "sides",
    emoji: "🥗",
  },
  {
    id: 4,
    name: "French Fries",
    description: "Crispy golden fries with a pinch of salt",
    price: 3.99,
    category: "sides",
    emoji: "🍟",
  },
  {
    id: 5,
    name: "Iced Tea",
    description: "Refreshing brewed iced tea with lemon",
    price: 2.49,
    category: "drinks",
    emoji: "🍹",
  },
];

export default function CraveCartDemo() {
  const [activeView, setActiveView] = useState<
    "home" | "menu" | "cart" | "feedback" | "confirmation"
  >("menu");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "mains" | "sides" | "drinks"
  >("all");
  const [cart, setCart] = useState<Record<number, number>>({
    1: 1,
    4: 1,
  });
  const [orderId, setOrderId] = useState<string>("1793208941205");
  const [rating, setRating] = useState<number>(5);
  const [comments, setComments] = useState<string>("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const filteredMenu = useMemo(() => {
    if (selectedCategory === "all") return MENU_DATA;
    return MENU_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const cartList = useMemo(() => {
    return Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = MENU_DATA.find((m) => m.id === Number(id))!;
        return { item, qty, lineTotal: item.price * qty };
      });
  }, [cart]);

  const totalItems = cartList.reduce((acc, c) => acc + c.qty, 0);
  const subtotal = cartList.reduce((acc, c) => acc + c.lineTotal, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const updateCart = (id: number, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  // POST /api/orders from app.js
  const handlePlaceOrder = () => {
    if (cartList.length === 0) return;
    setOrderId(Date.now().toString());
    setActiveView("confirmation");
  };

  // POST /api/feedback from app.js
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  return (
    /* Exact CSS from shin486/food-ordering-system/public/css/style.css:
       header { background: #ff6b6b; color: white; padding: 1rem; display: flex; justify-content: space-between; }
       .category-filter button.active { background: #ff6b6b; color: white; }
       .menu-item { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; text-align: center; } */
    <div className="w-full h-full flex flex-col bg-white text-[#333333] font-sans select-none overflow-hidden">
      {/* Exact <header> from views/menu.html & public/css/style.css */}
      <header className="bg-[#ff6b6b] text-white px-4 py-2.5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-2">
          <h1
            onClick={() => setActiveView("home")}
            className="text-[16px] font-bold tracking-tight cursor-pointer"
          >
            Crave Cart
          </h1>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-semibold">
            Express.js + JSON Store
          </span>
        </div>

        <nav className="flex items-center gap-3 text-[12px]">
          {(
            [
              { id: "home", label: "Home" },
              { id: "menu", label: "Menu" },
              { id: "cart", label: `Cart (${totalItems})` },
              { id: "feedback", label: "Feedback" },
            ] as const
          ).map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => setActiveView(nav.id)}
              className={`transition-opacity ${
                activeView === nav.id
                  ? "font-bold underline underline-offset-4"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Container (max-width: 1200px) */}
      <main className="flex-1 overflow-y-auto p-3.5">
        {/* VIEW 1: views/index.html */}
        {activeView === "home" && (
          <div className="space-y-3 text-center py-2">
            <div className="rounded-xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white p-5 shadow-xs">
              <span className="inline-block bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">
                Special Offer · Fresh Daily
              </span>
              <h2 className="text-xl font-extrabold">Hungry? Order Now!</h2>
              <p className="text-xs text-white/90 mt-1 max-w-md mx-auto">
                Freshly grilled Classic Burgers, wood-fired Margherita Pizza, and crispy golden sides delivered hot from Crave Cart.
              </p>
              <button
                type="button"
                onClick={() => setActiveView("menu")}
                className="mt-3 px-4 py-1.5 rounded bg-white text-[#ff6b6b] font-bold text-xs hover:bg-white/95 shadow-xs"
              >
                Browse Menu →
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-left">
              {MENU_DATA.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveView("menu")}
                  className="border border-[#dddddd] rounded-lg p-2.5 text-center cursor-pointer hover:border-[#ff6b6b] transition-colors"
                >
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-xs font-bold text-[#333333]">{item.name}</div>
                  <div className="text-[11px] font-bold text-[#ff6b6b]">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: views/menu.html */}
        {activeView === "menu" && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-[15px] font-bold text-[#333333]">Our Menu</h2>

              {/* Exact .category-filter buttons from views/menu.html & public/css/style.css */}
              <div className="flex items-center gap-1.5">
                {(
                  [
                    { id: "all", label: "All" },
                    { id: "mains", label: "Mains" },
                    { id: "sides", label: "Sides" },
                    { id: "drinks", label: "Drinks" },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded text-[11px] font-semibold transition-colors ${
                      selectedCategory === cat.id
                        ? "bg-[#ff6b6b] text-white"
                        : "bg-[#f0f0f0] text-[#333333] hover:bg-[#e4e4e4]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Exact .menu-items grid with .menu-item cards from public/css/style.css */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {filteredMenu.map((item) => {
                const qty = cart[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="border border-[#dddddd] rounded-[8px] p-3 text-center flex flex-col justify-between hover:border-[#ff6b6b] transition-colors bg-white"
                  >
                    <div>
                      <div className="w-full h-16 rounded bg-[#fff5f5] border border-[#ffe0e0] flex items-center justify-center text-3xl mb-2">
                        {item.emoji}
                      </div>
                      <h3 className="text-[13px] font-bold text-[#333333]">
                        {item.name}
                      </h3>
                      <p className="text-[10.5px] text-[#666666] mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#eeeeee] flex items-center justify-between">
                      <span className="text-[13px] font-bold text-[#333333]">
                        ${item.price.toFixed(2)}
                      </span>

                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => updateCart(item.id, 1)}
                          className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[4px] transition-colors"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => updateCart(item.id, -1)}
                            className="w-6 h-6 rounded bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#333333] font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-[#ff6b6b] min-w-[16px]">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCart(item.id, 1)}
                            className="w-6 h-6 rounded bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: views/cart.html */}
        {activeView === "cart" && (
          <div className="space-y-3">
            <h2 className="text-[15px] font-bold text-[#333333]">Your Order</h2>

            {cartList.length === 0 ? (
              <div className="border border-[#dddddd] rounded-lg p-6 text-center">
                <p className="text-xs text-[#666666] mb-2">Your cart is empty.</p>
                <button
                  type="button"
                  onClick={() => setActiveView("menu")}
                  className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-xs font-semibold px-3 py-1.5 rounded-[4px]"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* .cart-items */}
                <div className="sm:col-span-7 border border-[#dddddd] rounded-lg divide-y divide-[#dddddd]">
                  {cartList.map(({ item, qty, lineTotal }) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2.5 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.emoji}</span>
                        <div>
                          <div className="font-bold text-[#333333]">{item.name}</div>
                          <div className="text-[10.5px] text-[#666666]">
                            ${item.price.toFixed(2)} × {qty}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#333333]">
                          ${lineTotal.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCart(item.id, -1)}
                          className="w-5 h-5 rounded bg-[#f0f0f0] text-[#333333] font-bold"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => updateCart(item.id, 1)}
                          className="w-5 h-5 rounded bg-[#ff6b6b] text-white font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Exact .order-summary from views/cart.html & public/css/style.css */}
                <div className="sm:col-span-5 bg-[#f9f9f9] border border-[#e5e5e5] rounded-[8px] p-3 flex flex-col justify-between">
                  <div className="space-y-1.5 text-xs">
                    <h3 className="font-bold text-[13px] text-[#333333] border-b border-[#dddddd] pb-1">
                      Order Summary
                    </h3>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%):</span>
                      <span className="font-mono">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[13px] pt-1 border-t border-[#dddddd]">
                      <span>Total:</span>
                      <span className="font-mono text-[#ff6b6b]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="mt-3 w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-semibold py-2 rounded-[4px] text-xs transition-colors"
                  >
                    Place Order (POST /api/orders)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: views/confirmation.html (.confirmation-box) */}
        {activeView === "confirmation" && (
          <div className="py-4 text-center">
            <div className="bg-[#f9f9f9] border border-[#dddddd] rounded-[8px] p-5 max-w-md mx-auto space-y-2">
              <div className="text-2xl">🎉</div>
              <h2 className="text-base font-bold text-[#333333]">
                Order Confirmed!
              </h2>
              <p className="text-xs text-[#666666]">
                Thank you for ordering from Crave Cart. Your order has been saved to{" "}
                <code className="bg-white px-1 py-0.5 rounded border">
                  data/orders.json
                </code>
                .
              </p>
              <p className="text-xs font-mono font-bold text-[#ff6b6b]">
                Order ID: #{orderId} · Total: ${total.toFixed(2)}
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveView("menu")}
                  className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-xs font-semibold px-3 py-1.5 rounded-[4px]"
                >
                  Order More
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView("feedback")}
                  className="bg-[#f0f0f0] hover:bg-[#e2e2e2] text-[#333333] text-xs font-semibold px-3 py-1.5 rounded-[4px]"
                >
                  Leave Feedback
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: views/feedback.html */}
        {activeView === "feedback" && (
          <div className="max-w-md mx-auto space-y-3">
            <h2 className="text-[15px] font-bold text-[#333333]">
              Share Your Experience
            </h2>

            {feedbackSubmitted ? (
              <div className="bg-[#f9f9f9] border border-[#dddddd] rounded-[8px] p-4 text-center space-y-1.5">
                <h3 className="text-sm font-bold text-[#333333]">Thank You!</h3>
                <p className="text-xs text-[#666666]">
                  Your {rating}-star feedback has been submitted to{" "}
                  <code>POST /api/feedback</code>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFeedbackSubmitted(false);
                    setComments("");
                  }}
                  className="mt-2 bg-[#ff6b6b] text-white text-xs font-semibold px-3 py-1 rounded-[4px]"
                >
                  Submit Another Review
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleFeedbackSubmit}
                className="bg-[#f9f9f9] border border-[#dddddd] rounded-[8px] p-3.5 space-y-2.5"
              >
                <div>
                  <label className="block text-xs font-bold text-[#333333] mb-1">
                    Rating:
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl leading-none transition-colors ${
                          star <= rating ? "text-[#ffcc00]" : "text-[#cccccc]"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#333333] mb-1">
                    Comments:
                  </label>
                  <textarea
                    rows={3}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Tell us about your Classic Burger or Margherita Pizza..."
                    className="w-full rounded border border-[#cccccc] bg-white p-2 text-xs text-[#333333] focus:border-[#ff6b6b] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-xs font-semibold px-4 py-1.5 rounded-[4px] transition-colors"
                >
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
