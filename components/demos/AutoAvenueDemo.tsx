"use client";

import React, { useState } from "react";
import {
  Wrench,
  AlertTriangle,
  ShoppingCart,
  CheckCircle2,
  RotateCcw,
  Package,
  Layers,
  ArrowRight,
  TrendingDown,
  Building,
} from "lucide-react";

interface PartItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  minThreshold: number;
  supplier: string;
}

const INITIAL_PARTS: PartItem[] = [
  {
    id: "part-1",
    name: "Motul 8100 X-cess 5W-40 (1L)",
    sku: "OIL-MTL-5W40",
    price: 680,
    stock: 5,
    minThreshold: 4,
    supplier: "Motul Philippines Direct",
  },
  {
    id: "part-2",
    name: "Brembo Ceramic Front Brake Pads",
    sku: "BRK-BRM-049",
    price: 2450,
    stock: 7,
    minThreshold: 4,
    supplier: "Brembo Asia Pacific",
  },
  {
    id: "part-3",
    name: "Bosch Heavy Duty Oil Filter",
    sku: "FLT-BSH-020",
    price: 380,
    stock: 3,
    minThreshold: 4, // Already near alert
    supplier: "Bosch Automotive Manila",
  },
  {
    id: "part-4",
    name: "Denso Iridium Spark Plugs (Set of 4)",
    sku: "SPK-DNS-IK20",
    price: 1850,
    stock: 12,
    minThreshold: 6,
    supplier: "Denso Auto Parts PH",
  },
];

export const AutoAvenueDemo: React.FC = () => {
  const [parts, setParts] = useState<PartItem[]>(INITIAL_PARTS);
  const [cart, setCart] = useState<{ partId: string; qty: number }>({
    partId: "part-1",
    qty: 2,
  });
  const [recentPO, setRecentPO] = useState<{
    poNumber: string;
    partName: string;
    orderQty: number;
    supplier: string;
  } | null>({
    poNumber: "PO-AA-8921",
    partName: "Bosch Heavy Duty Oil Filter",
    orderQty: 20,
    supplier: "Bosch Automotive Manila",
  });
  const [posSuccessMessage, setPosSuccessMessage] = useState<string | null>(null);

  const selectedPart = parts.find((p) => p.id === cart.partId) || parts[0];

  const handleCheckout = () => {
    if (selectedPart.stock < cart.qty) return;

    const newStock = selectedPart.stock - cart.qty;
    const isBelowThreshold = newStock < selectedPart.minThreshold;

    setParts((prev) =>
      prev.map((p) => (p.id === selectedPart.id ? { ...p, stock: newStock } : p))
    );

    setPosSuccessMessage(
      `POS Sale Complete: ${cart.qty}x ${selectedPart.name} (₱${(
        selectedPart.price * cart.qty
      ).toLocaleString()})`
    );

    if (isBelowThreshold) {
      const generatedPO = `PO-AA-${Math.floor(1000 + Math.random() * 9000)}`;
      setRecentPO({
        poNumber: generatedPO,
        partName: selectedPart.name,
        orderQty: 25,
        supplier: selectedPart.supplier,
      });
    }

    setTimeout(() => {
      setPosSuccessMessage(null);
    }, 4000);
  };

  const handleRestock = () => {
    setParts(INITIAL_PARTS);
    setPosSuccessMessage(null);
    setRecentPO(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 text-zinc-900 dark:text-zinc-100 select-none">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111116] rounded-2xl border border-neutral-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center text-xs">
              <Wrench className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-800 dark:text-zinc-200 block leading-tight">
                Auto Avenue Car Care IMS
              </span>
              <span className="text-[10px] text-neutral-500">
                Mataas na Kahoy, Batangas • POS Sync Active
              </span>
            </div>
          </div>

          <button
            onClick={handleRestock}
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restock Demo</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* POS Alert Notification */}
          {posSuccessMessage && (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500" />
              <span className="font-medium">{posSuccessMessage}</span>
            </div>
          )}

          {/* Automated Reordering Alert Callout */}
          {recentPO && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 flex items-start gap-2.5 animate-fade-in">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-300 block">
                  Automated Purchase Order Dispatched! ({recentPO.poNumber})
                </span>
                <p className="text-amber-700 dark:text-amber-400 mt-0.5">
                  Stock fell below critical threshold. System automatically triggered purchase order for{" "}
                  <strong>{recentPO.orderQty} units</strong> of {recentPO.partName} to{" "}
                  <strong>{recentPO.supplier}</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Parts Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Live Stock Inventory
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {parts.map((p) => {
                const isLow = p.stock < p.minThreshold;
                const isSelected = cart.partId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setCart({ ...cart, partId: p.id })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-amber-500 bg-amber-50/30 dark:bg-amber-950/20 shadow-sm"
                        : "border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 pr-2">
                        <p className="text-xs font-bold truncate">{p.name}</p>
                        <p className="text-[10px] font-mono text-neutral-400">{p.sku}</p>
                      </div>
                      <span className="text-xs font-black font-mono">
                        ₱{p.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-neutral-100 dark:border-zinc-800">
                      <div className="flex items-center gap-1.5">
                        <span className="text-neutral-500">In Stock:</span>
                        <span
                          className={`font-mono font-bold ${
                            isLow ? "text-red-500" : "text-neutral-900 dark:text-white"
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </div>
                      {isLow ? (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                          CRITICAL LOW (Min {p.minThreshold})
                        </span>
                      ) : (
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          Optimal
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* POS Checkout Simulation Action Box */}
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-zinc-900/90 border border-neutral-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="w-full sm:w-auto">
              <span className="text-[11px] font-semibold text-neutral-500 block">
                Simulate POS Sale for: <strong>{selectedPart.name}</strong>
              </span>
              <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">
                Total Bill: ₱{(selectedPart.price * cart.qty).toLocaleString()} (
                {cart.qty} units)
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center bg-white dark:bg-zinc-800 rounded-lg border border-neutral-300 dark:border-zinc-700 p-0.5">
                <button
                  onClick={() =>
                    setCart((c) => ({ ...c, qty: Math.max(1, c.qty - 1) }))
                  }
                  className="w-7 h-7 rounded text-xs font-bold hover:bg-neutral-100 dark:hover:bg-zinc-700"
                >
                  -
                </button>
                <span className="px-2 font-mono font-bold text-xs">{cart.qty}</span>
                <button
                  onClick={() =>
                    setCart((c) => ({
                      ...c,
                      qty: Math.min(selectedPart.stock, c.qty + 1),
                    }))
                  }
                  className="w-7 h-7 rounded text-xs font-bold hover:bg-neutral-100 dark:hover:bg-zinc-700"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleCheckout}
                disabled={selectedPart.stock === 0}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Trigger POS Sale &amp; Stock Sync</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
