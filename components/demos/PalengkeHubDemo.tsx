"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  ShoppingBag,
  QrCode,
  CheckCircle2,
  Plus,
  Minus,
  Store,
  Heart,
  Bell,
  ChevronDown,
  ChevronRight,
  Clock,
  Star,
  Tag,
  Navigation,
  Sparkles,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  englishName: string;
  stallId: string;
  stallName: string;
  stallNumber: string;
  section: "Fish" | "Vegetables" | "Meat" | "Grains" | "Fruits";
  categoryChip: string;
  price: number;
  minMarketPrice: number;
  avgMarketPrice: number;
  maxMarketPrice: number;
  stallCount: number;
  unit: string;
  stock: number;
  verdict: "PINAKAMURA" | "MURA" | "KATAMTAMAN";
  promoDiscount?: string;
  soldThisMonth: number;
  emoji: string;
}

interface Stall {
  id: string;
  stallNumber: string;
  name: string;
  owner: string;
  section: "Fish" | "Vegetables" | "Meat" | "Grains";
  rating: number;
  reviews: number;
  priceRange: string;
  isOpen: boolean;
  gcashNumber: string;
}

const STALLS: Stall[] = [
  {
    id: "st-1",
    stallNumber: "Stall F-12",
    name: "Aling Nena's Fresh Catch",
    owner: "Nena Macaraig",
    section: "Fish",
    rating: 4.9,
    reviews: 84,
    priceRange: "₱180 - ₱320 / kg",
    isOpen: true,
    gcashNumber: "0917-552-8810",
  },
  {
    id: "st-2",
    stallNumber: "Stall V-04",
    name: "Kuya Ben's Bukid Harvest",
    owner: "Benjie Katigbak",
    section: "Vegetables",
    rating: 4.8,
    reviews: 62,
    priceRange: "₱65 - ₱140 / kg",
    isOpen: true,
    gcashNumber: "0918-334-1290",
  },
  {
    id: "st-3",
    stallNumber: "Stall M-08",
    name: "Mang Berting's Prime Cuts",
    owner: "Roberto Villanueva",
    section: "Meat",
    rating: 4.9,
    reviews: 115,
    priceRange: "₱210 - ₱360 / kg",
    isOpen: true,
    gcashNumber: "0920-911-4402",
  },
  {
    id: "st-4",
    stallNumber: "Stall G-02",
    name: "Lipa Grain & Bigas Center",
    owner: "Tessie Dimayuga",
    section: "Grains",
    rating: 4.7,
    reviews: 49,
    priceRange: "₱52 - ₱64 / kg",
    isOpen: true,
    gcashNumber: "0917-809-2215",
  },
];

// Synced with PalengkeHub HomeScreen.js, ProductCard.js & seed-uat-transactions.sql
const PRODUCTS: Product[] = [
  {
    id: "ph-1",
    name: "Bangus (Dagupan Medium)",
    englishName: "Milkfish · De-boned option",
    stallId: "st-1",
    stallName: "Aling Nena's Fresh Catch",
    stallNumber: "Stall F-12",
    section: "Fish",
    categoryChip: "Isda",
    price: 220,
    minMarketPrice: 220,
    avgMarketPrice: 245,
    maxMarketPrice: 265,
    stallCount: 4,
    unit: "kg",
    stock: 18,
    verdict: "PINAKAMURA",
    promoDiscount: "10% OFF",
    soldThisMonth: 142,
    emoji: "🐟",
  },
  {
    id: "ph-2",
    name: "Kamatis Tagalog (Ripe)",
    englishName: "Native Plum Tomatoes",
    stallId: "st-2",
    stallName: "Kuya Ben's Bukid Harvest",
    stallNumber: "Stall V-04",
    section: "Vegetables",
    categoryChip: "Gulay",
    price: 75,
    minMarketPrice: 75,
    avgMarketPrice: 92,
    maxMarketPrice: 110,
    stallCount: 6,
    unit: "kg",
    stock: 25,
    verdict: "PINAKAMURA",
    soldThisMonth: 198,
    emoji: "🍅",
  },
  {
    id: "ph-3",
    name: "Pork Liempo (Fresh Cut)",
    englishName: "Fresh Pork Belly",
    stallId: "st-3",
    stallName: "Mang Berting's Prime Cuts",
    stallNumber: "Stall M-08",
    section: "Meat",
    categoryChip: "Karne",
    price: 340,
    minMarketPrice: 340,
    avgMarketPrice: 365,
    maxMarketPrice: 385,
    stallCount: 5,
    unit: "kg",
    stock: 12,
    verdict: "PINAKAMURA",
    soldThisMonth: 164,
    emoji: "🥩",
  },
  {
    id: "ph-4",
    name: "Sinandomeng Special",
    englishName: "Well-milled Local White Rice",
    stallId: "st-4",
    stallName: "Lipa Grain & Bigas Center",
    stallNumber: "Stall G-02",
    section: "Grains",
    categoryChip: "Bigas",
    price: 54,
    minMarketPrice: 54,
    avgMarketPrice: 58,
    maxMarketPrice: 62,
    stallCount: 3,
    unit: "kg",
    stock: 50,
    verdict: "MURA",
    soldThisMonth: 310,
    emoji: "🌾",
  },
  {
    id: "ph-5",
    name: "Sibuyas Pula (Bongabon)",
    englishName: "Local Red Onions",
    stallId: "st-2",
    stallName: "Kuya Ben's Bukid Harvest",
    stallNumber: "Stall V-04",
    section: "Vegetables",
    categoryChip: "Gulay",
    price: 120,
    minMarketPrice: 115,
    avgMarketPrice: 135,
    maxMarketPrice: 150,
    stallCount: 5,
    unit: "kg",
    stock: 20,
    verdict: "MURA",
    soldThisMonth: 128,
    emoji: "🧅",
  },
  {
    id: "ph-6",
    name: "Hipon Suaje (Live Catch)",
    englishName: "Fresh Medium Shrimp",
    stallId: "st-1",
    stallName: "Aling Nena's Fresh Catch",
    stallNumber: "Stall F-12",
    section: "Fish",
    categoryChip: "Isda",
    price: 310,
    minMarketPrice: 310,
    avgMarketPrice: 335,
    maxMarketPrice: 360,
    stallCount: 3,
    unit: "kg",
    stock: 9,
    verdict: "PINAKAMURA",
    soldThisMonth: 87,
    emoji: "🦐",
  },
];

const CATEGORY_CHIPS = [
  { id: "All", label: "Lahat", icon: "🧺", bg: "#FDF3E7", border: "#E8833A" },
  { id: "Gulay", label: "Gulay", icon: "🥬", bg: "#EEF6E8", border: "#9EBF5C" },
  { id: "Isda", label: "Isda", icon: "🐟", bg: "#EBF4FA", border: "#84BEE0" },
  { id: "Karne", label: "Karne", icon: "🥩", bg: "#FDECEB", border: "#D34638" },
  { id: "Bigas", label: "Bigas", icon: "🌾", bg: "#FEF6E6", border: "#F5A623" },
];

export default function PalengkeHubDemo() {
  const [activeTab, setActiveTab] = useState<"home" | "stalls" | "map" | "cart" | "pass">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({ "ph-1": true });
  const [cart, setCart] = useState<Record<string, number>>({
    "ph-1": 1,
    "ph-2": 2,
  });
  const [pickupSlot, setPickupSlot] = useState("9:00 AM – 10:00 AM");
  const [paymentMethod, setPaymentMethod] = useState<"gcash" | "cash">("gcash");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderCode, setOrderCode] = useState("PKH-8492-LIPA");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCat = selectedCategory === "All" || p.categoryChip === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stallName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const product = PRODUCTS.find((p) => p.id === id)!;
        return { product, qty, subtotal: product.price * qty };
      });
  }, [cart]);

  const totalItems = cartItems.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = cartItems.reduce((acc, i) => acc + i.subtotal, 0);

  const updateQty = (id: string, delta: number) => {
    setOrderConfirmed(false);
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

  const toggleFav = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckout = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setOrderCode(`PKH-${randomNum}-LIPA`);
    setOrderConfirmed(true);
    setActiveTab("pass");
  };

  return (
    /* PalengkeHub Real Design System Tokens from src/theme/tokens.js:
       Woven Warm Cream Surface (#F7F5F0 / #FDF9F3), Basket Orange Primary (#E8833A),
       Deep Outline Brown (#261006), Lettuce Green (#2E7D5B / #9EBF5C), Mango Gold (#F5A623) */
    <div className="w-full h-full flex flex-col bg-[#F7F5F0] text-[#261006] font-sans select-none overflow-hidden">
      {/* Real PalengkeHub Customer Top Header (from HomeScreen.js) */}
      <div className="bg-[#FDF9F3] border-b border-[#E6DEC8] px-3.5 pt-2.5 pb-2 shrink-0 shadow-xs">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo + Location */}
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="/projects/palengkehub-logo.jpg"
              alt="PalengkeHub Logo"
              className="w-9 h-9 rounded-xl object-cover border border-[#E2BA87] shadow-xs shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-[14px] tracking-tight text-[#261006]">
                  PalengkeHub
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#E8833A]/15 text-[#C96A28] border border-[#E8833A]/30">
                  LIPA LIVE
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#261006] truncate">
                <MapPin className="w-3 h-3 text-[#E8833A] shrink-0" />
                <span className="truncate">Lipa City Public Market</span>
                <ChevronDown className="w-3 h-3 text-[#8C7A6B] shrink-0" />
              </div>
              <p className="text-[9.5px] text-[#7A6855] leading-none">
                Lipa, Batangas 4217 · Pickup only
              </p>
            </div>
          </div>

          {/* Right Header Icons (Favorites & Bell Notification with red dot from HomeScreen.js) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("stalls")}
              className="w-8 h-8 rounded-full bg-[#F3ECE0] hover:bg-[#EAE0CE] flex items-center justify-center text-[#261006] transition-colors relative"
              title="Saved Items"
            >
              <Heart className="w-4 h-4 text-[#D34638] fill-[#D34638]" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("pass")}
              className="w-8 h-8 rounded-full bg-[#F3ECE0] hover:bg-[#EAE0CE] flex items-center justify-center text-[#261006] transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-[#261006]" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#D34638] text-white text-[9px] font-bold flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar from HomeScreen.js */}
        <div className="mt-2 relative">
          <Search className="w-3.5 h-3.5 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== "home") setActiveTab("home");
            }}
            placeholder="Maghanap ng bangus, kamatis, liempo, bigas..."
            className="w-full bg-white border border-[#E0D6C3] focus:border-[#E8833A] rounded-xl pl-8 pr-3 py-1.5 text-[11px] text-[#261006] placeholder:text-[#9A8978] focus:outline-none shadow-2xs"
          />
        </div>
      </div>

      {/* Main Scrollable Screen Content */}
      <div className="flex-1 overflow-y-auto px-3.5 py-2.5 space-y-3">
        {activeTab === "home" && (
          <>
            {/* Greeting & Live Market Banner (with real Lipa Public Market image) */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-extrabold text-[#261006]">
                  Magandang Araw, Ka-Palengke! 👋
                </h3>
                <p className="text-[10.5px] text-[#6E5D4F]">
                  Order now for fast, zero-haggle stall pickup
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("stalls")}
                className="text-[10.5px] font-bold text-[#C96A28] hover:underline flex items-center gap-0.5"
              >
                4 Stalls Open <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Market Hours + Promo Banner Carousel (from HomeScreen.js) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="relative rounded-2xl overflow-hidden h-24 border border-[#DFD3BD] shadow-xs group">
                <img
                  src="/projects/lipa-public-market.jpg"
                  alt="Lipa City Public Market"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D06]/90 via-[#1A0D06]/45 to-transparent p-2.5 flex flex-col justify-end">
                  <span className="inline-flex items-center gap-1 self-start px-2 py-0.5 rounded-md bg-[#2E7D5B] text-white text-[9px] font-extrabold tracking-wide mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A7F3D0] animate-pulse" />
                    BUKAS NGAYON · 4AM–7PM
                  </span>
                  <p className="text-white font-extrabold text-[12px] leading-tight">
                    Lipa City Public Market
                  </p>
                  <p className="text-[#F5E6D3] text-[10px]">
                    Real-time stall inventory & Presyo Check
                  </p>
                </div>
              </div>

              {/* Promo Banner Card from HomeScreen.js */}
              <div
                onClick={() => updateQty("ph-1", 1)}
                className="relative rounded-2xl overflow-hidden h-24 border border-[#E8833A]/40 bg-gradient-to-br from-[#261006] via-[#4A220E] to-[#C96A28] p-2.5 flex flex-col justify-between cursor-pointer hover:brightness-105 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-[#F5A623] text-[#261006] text-[9px] font-extrabold uppercase tracking-wider">
                    May Diskwento · 10% OFF
                  </span>
                  <span className="text-lg">🐟</span>
                </div>
                <div>
                  <p className="text-white font-extrabold text-[12px] leading-tight">
                    ₱220/kg — Bangus (Dagupan)
                  </p>
                  <p className="text-[#F7D7B5] text-[10px]">
                    sa Aling Nena&apos;s Fresh Catch (Stall F-12) · Tap to add
                  </p>
                </div>
              </div>
            </div>

            {/* Shop by Category Round Chips (from HomeScreen.js) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5C4B3B]">
                  Shop by Category
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {CATEGORY_CHIPS.map((cat) => {
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 border ${
                        active
                          ? "bg-[#E8833A] text-white border-[#C96A28] shadow-xs"
                          : "bg-white text-[#261006] border-[#E0D6C3] hover:border-[#E8833A]"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRESYO CHECK (Price Comparison Bar Track from HomeScreen.js) */}
            <div className="bg-[#FDF9F3] border border-[#E2D6C1] rounded-2xl p-2.5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#2E7D5B]" />
                  <span className="text-[11.5px] font-extrabold text-[#261006]">
                    Presyo Check · Ikumpara sa Palengke
                  </span>
                </div>
                <span className="text-[9.5px] font-bold text-[#2E7D5B] bg-[#2E7D5B]/10 px-2 py-0.5 rounded-full">
                  Updated Today
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredProducts.slice(0, 4).map((item) => {
                  const qty = cart[item.id] || 0;
                  const fillPct = Math.round((item.minMarketPrice / item.maxMarketPrice) * 100);
                  const tickPct = Math.round((item.avgMarketPrice / item.maxMarketPrice) * 100);
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-[#E6DEC8] hover:border-[#E8833A] rounded-xl p-2.5 flex flex-col justify-between transition-all shadow-2xs"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-[#F7F2E7] border border-[#E6DEC8] flex items-center justify-center text-lg shrink-0">
                              {item.emoji}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[12px] font-extrabold text-[#261006] truncate">
                                {item.name}
                              </p>
                              <p className="text-[10px] text-[#7A6855] truncate">
                                {item.stallName} · {item.stallNumber}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleFav(item.id)}
                            className="text-[#D34638] p-0.5 shrink-0"
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${
                                favorites[item.id] ? "fill-[#D34638]" : "text-[#B8A99A]"
                              }`}
                            />
                          </button>
                        </div>

                        {/* Price + VerdictChip ("PINAKAMURA" / "MURA") */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-[14px] font-extrabold text-[#C96A28]">
                              ₱{item.price}
                            </span>
                            <span className="text-[10px] text-[#7A6855]">/ {item.unit}</span>
                          </div>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                              item.verdict === "PINAKAMURA"
                                ? "bg-[#2E7D5B]/15 text-[#2E7D5B] border border-[#2E7D5B]/30"
                                : "bg-[#F5A623]/20 text-[#9E6300] border border-[#F5A623]/40"
                            }`}
                          >
                            {item.verdict}
                          </span>
                        </div>

                        {/* Presyo Bar Track from HomeScreen.js */}
                        <div className="mt-1.5">
                          <div className="h-1.5 w-full bg-[#EFE9DC] rounded-full overflow-hidden relative">
                            <div
                              className="h-full bg-[#2E7D5B] rounded-full"
                              style={{ width: `${fillPct}%` }}
                            />
                            <div
                              className="absolute top-0 bottom-0 w-0.5 bg-[#261006]"
                              style={{ left: `${tickPct}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[9.5px] text-[#7A6855] mt-0.5">
                            <span>₱{item.minMarketPrice} pinakamura</span>
                            <span>avg ₱{item.avgMarketPrice} ({item.stallCount} stalls)</span>
                          </div>
                        </div>
                      </div>

                      {/* Add to Basket Footer */}
                      <div className="mt-2 pt-2 border-t border-[#F0E9DA] flex items-center justify-between">
                        <span className="text-[9.5px] font-semibold text-[#6E5D4F]">
                          🔥 {item.soldThisMonth} sold this month
                        </span>
                        {qty === 0 ? (
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, 1)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E8833A] hover:bg-[#C96A28] text-white text-[10.5px] font-bold transition-colors shadow-2xs"
                          >
                            <Plus className="w-3 h-3" /> Add to Basket
                          </button>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 bg-[#FDF3E7] border border-[#E8833A] rounded-lg px-1.5 py-0.5">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, -1)}
                              className="w-5 h-5 rounded bg-white text-[#261006] flex items-center justify-center hover:bg-[#F3ECE0]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-[11px] font-extrabold text-[#C96A28] min-w-[22px] text-center">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, 1)}
                              className="w-5 h-5 rounded bg-[#E8833A] text-white flex items-center justify-center hover:bg-[#C96A28]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* STALLS DIRECTORY SCREEN (from StallsDirectoryScreen.js + real STALL_CARD_SHOT) */}
        {activeTab === "stalls" && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-extrabold text-[#261006]">
                  Lipa Public Market Stalls Directory
                </h3>
                <p className="text-[10.5px] text-[#6E5D4F]">
                  Verified market vendors with live GCash & Presyo Range
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#2E7D5B]/15 text-[#2E7D5B] text-[10px] font-extrabold">
                4 Active Vendors
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STALLS.map((stall) => (
                <div
                  key={stall.id}
                  className="bg-white border border-[#E2D6C1] rounded-2xl p-3 flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded bg-[#FDF3E7] border border-[#E8833A]/30 text-[#C96A28] text-[9.5px] font-extrabold">
                          {stall.stallNumber} · {stall.section} Section
                        </span>
                        <h4 className="text-[13px] font-extrabold text-[#261006] mt-1">
                          {stall.name}
                        </h4>
                        <p className="text-[10.5px] text-[#7A6855]">
                          Vendor: {stall.owner}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5 bg-[#FEF6E6] border border-[#F5A623]/40 px-1.5 py-0.5 rounded-lg text-[10.5px] font-extrabold text-[#9E6300]">
                        <Star className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                        {stall.rating} ({stall.reviews})
                      </div>
                    </div>

                    {/* TopStallCard Price Range Strip from HomeScreen.js */}
                    <div className="mt-2.5 px-2.5 py-1.5 rounded-xl bg-[#EEF6E8] border border-[#9EBF5C]/50 flex items-center justify-between">
                      <span className="text-[11px] font-extrabold text-[#2E7D5B]">
                        {stall.priceRange}
                      </span>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#2E7D5B]">
                        PRESYO RANGE
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#F0E9DA] flex items-center justify-between">
                    <span className="text-[10px] text-[#6E5D4F]">
                      GCash: <strong>{stall.gcashNumber}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory("All");
                        setActiveTab("home");
                      }}
                      className="text-[10.5px] font-extrabold text-[#C96A28] hover:underline flex items-center gap-0.5"
                    >
                      View Products <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MARKET MAP SCREEN (from MarketMapScreen.js) */}
        {activeTab === "map" && (
          <div className="bg-white border border-[#E2D6C1] rounded-2xl p-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-extrabold text-[#261006]">
                  Interactive Palengke Section Map
                </h3>
                <p className="text-[10.5px] text-[#6E5D4F]">
                  Tap any section to locate your pickup stall inside Lipa Public Market
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#C96A28]">
                <Navigation className="w-3 h-3" /> Gate 2 Main Entrance
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-[#EBF4FA] border-2 border-[#84BEE0] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-[#1E5B82]">
                    Fish & Seafood (Wet)
                  </span>
                  <span className="text-base">🐟</span>
                </div>
                <p className="text-[12px] font-extrabold text-[#261006] mt-1">
                  Stall F-12 · Aling Nena&apos;s
                </p>
                <p className="text-[10px] text-[#4A6B82]">Aisle B · Near East Ice Station</p>
              </div>

              <div className="p-3 rounded-xl bg-[#EEF6E8] border-2 border-[#9EBF5C] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-[#2E7D5B]">
                    Gulay / Vegetables
                  </span>
                  <span className="text-base">🥬</span>
                </div>
                <p className="text-[12px] font-extrabold text-[#261006] mt-1">
                  Stall V-04 · Kuya Ben&apos;s
                </p>
                <p className="text-[10px] text-[#3E6B48]">Aisle A · Gate 1 Bagsakan Wing</p>
              </div>

              <div className="p-3 rounded-xl bg-[#FDECEB] border-2 border-[#D34638]/60 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-[#9E2A1F]">
                    Karne / Meat Section
                  </span>
                  <span className="text-base">🥩</span>
                </div>
                <p className="text-[12px] font-extrabold text-[#261006] mt-1">
                  Stall M-08 · Mang Berting&apos;s
                </p>
                <p className="text-[10px] text-[#7D352E]">Center Hall · Butcher Row</p>
              </div>

              <div className="p-3 rounded-xl bg-[#FEF6E6] border-2 border-[#F5A623] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-[#9E6300]">
                    Bigas & Dry Goods
                  </span>
                  <span className="text-base">🌾</span>
                </div>
                <p className="text-[12px] font-extrabold text-[#261006] mt-1">
                  Stall G-02 · Lipa Grain Center
                </p>
                <p className="text-[10px] text-[#805B1E]">Front Arcade · Pickup Bay 1</p>
              </div>
            </div>
          </div>
        )}

        {/* CART SCREEN (from CartScreen.js) */}
        {activeTab === "cart" && (
          <div className="bg-white border border-[#E2D6C1] rounded-2xl p-3 space-y-3">
            <div className="flex items-center justify-between border-b border-[#F0E9DA] pb-2">
              <div>
                <h3 className="text-[13px] font-extrabold text-[#261006]">
                  My Palengke Basket ({totalItems} items)
                </h3>
                <p className="text-[10px] text-[#7A6855]">
                  Direct stall reservation · Zero platform markup
                </p>
              </div>
              <span className="text-[14px] font-extrabold text-[#C96A28]">₱{subtotal}</span>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-[12px] text-[#7A6855]">Walang laman ang basket mo.</p>
                <button
                  type="button"
                  onClick={() => setActiveTab("home")}
                  className="mt-2 px-3 py-1.5 rounded-xl bg-[#E8833A] text-white text-[11px] font-bold"
                >
                  Mamili Ngayon
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {cartItems.map(({ product, qty, subtotal: itemSub }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-2 rounded-xl bg-[#FDF9F3] border border-[#E6DEC8]"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base">{product.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-[11.5px] font-extrabold text-[#261006] truncate">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-[#7A6855]">
                            {product.stallNumber} · ₱{product.price}/{product.unit} × {qty}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[12px] font-extrabold text-[#261006]">
                          ₱{itemSub}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => updateQty(product.id, -1)}
                            className="w-5 h-5 rounded bg-white border border-[#D8CBB8] flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => updateQty(product.id, 1)}
                            className="w-5 h-5 rounded bg-[#E8833A] text-white flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-[#6E5D4F] mb-1">
                      Pickup Time Window
                    </label>
                    <select
                      value={pickupSlot}
                      onChange={(e) => setPickupSlot(e.target.value)}
                      className="w-full bg-[#FDF9F3] border border-[#D8CBB8] rounded-xl px-2.5 py-1.5 text-[11px] font-bold text-[#261006]"
                    >
                      <option>7:00 AM – 8:00 AM (Morning Rush)</option>
                      <option>9:00 AM – 10:00 AM</option>
                      <option>11:00 AM – 12:00 PM</option>
                      <option>4:00 PM – 5:00 PM (Uwian)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-[#6E5D4F] mb-1">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("gcash")}
                        className={`py-1.5 rounded-xl text-[11px] font-extrabold border ${
                          paymentMethod === "gcash"
                            ? "bg-[#0057E7] text-white border-[#0057E7]"
                            : "bg-[#FDF9F3] text-[#261006] border-[#D8CBB8]"
                        }`}
                      >
                        GCash Direct
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cash")}
                        className={`py-1.5 rounded-xl text-[11px] font-extrabold border ${
                          paymentMethod === "cash"
                            ? "bg-[#2E7D5B] text-white border-[#2E7D5B]"
                            : "bg-[#FDF9F3] text-[#261006] border-[#D8CBB8]"
                        }`}
                      >
                        Cash at Stall
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-2 rounded-xl bg-[#E8833A] hover:bg-[#C96A28] text-white font-extrabold text-[12px] shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  Confirm Reservation & Generate Pickup Pass (₱{subtotal})
                </button>
              </>
            )}
          </div>
        )}

        {/* PICKUP PASS SCREEN (from PickupPassScreen.js) */}
        {activeTab === "pass" && (
          <div className="bg-white border-2 border-[#E8833A] rounded-2xl p-3.5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#F0E9DA] pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#2E7D5B]/15 border border-[#2E7D5B]/30 flex items-center justify-center text-[#2E7D5B]">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#2E7D5B]">
                    {orderConfirmed ? "Confirmed Digital Pickup Pass" : "Active Pickup Pass Preview"}
                  </span>
                  <h4 className="text-[14px] font-mono font-extrabold text-[#261006]">
                    {orderCode}
                  </h4>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#2E7D5B] text-white text-[10px] font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> READY FOR PICKUP
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] bg-[#FDF9F3] p-2.5 rounded-xl border border-[#E6DEC8]">
              <div>
                <span className="text-[9.5px] text-[#7A6855] block">Market Location</span>
                <span className="font-extrabold text-[#261006]">Lipa Public Market</span>
              </div>
              <div>
                <span className="text-[9.5px] text-[#7A6855] block">Pickup Slot</span>
                <span className="font-extrabold text-[#C96A28] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {pickupSlot}
                </span>
              </div>
              <div>
                <span className="text-[9.5px] text-[#7A6855] block">Payment & Total</span>
                <span className="font-extrabold text-[#2E7D5B]">
                  ₱{subtotal} ({paymentMethod === "gcash" ? "GCash Paid" : "Pay at Stall"})
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-extrabold uppercase text-[#6E5D4F]">
                Stall Pickup Breakdown:
              </p>
              {cartItems.map(({ product, qty, subtotal: itemSub }) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between text-[11px] py-1 border-b border-[#F3ECE0] last:border-0"
                >
                  <span className="font-bold text-[#261006]">
                    {product.emoji} {product.name} × {qty} {product.unit}
                  </span>
                  <span className="text-[#7A6855] font-semibold">
                    {product.stallNumber} · <strong className="text-[#261006]">₱{itemSub}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Real PalengkeHub Mobile Bottom Tab Navigation Bar */}
      <div className="bg-[#FDF9F3] border-t border-[#E2D6C1] px-2 py-1.5 grid grid-cols-5 gap-1 shrink-0">
        {[
          { id: "home", label: "Home", icon: Store },
          { id: "stalls", label: "Stalls", icon: Sparkles },
          { id: "map", label: "Market Map", icon: MapPin },
          { id: "cart", label: `Basket (${totalItems})`, icon: ShoppingBag },
          { id: "pass", label: "Pickup Pass", icon: QrCode },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                isActive
                  ? "bg-[#E8833A]/15 text-[#C96A28] font-extrabold"
                  : "text-[#7A6855] hover:text-[#261006] font-semibold"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#E8833A]" : ""}`} />
              <span className="text-[9.5px] mt-0.5 truncate max-w-full px-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
