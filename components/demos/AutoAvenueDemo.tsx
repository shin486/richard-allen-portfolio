"use client";

import React, { useState } from "react";
import {
  Wrench,
  AlertTriangle,
  ShoppingCart,
  CheckCircle2,
  RotateCcw,
  FileSpreadsheet,
  ShieldAlert,
} from "lucide-react";

interface AutoAvenueProduct {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  category: string;
  min_stock_level: number;
  warranty_period: string;
  warranty_terms: string;
  supplier: string;
}

/**
 * Exact products and warranty records from auto_avenue_db.sql:
 * Repository: https://github.com/shin486/auto-avenue-ims
 */
const INITIAL_AUTO_PRODUCTS: AutoAvenueProduct[] = [
  {
    product_id: 16,
    name: "AC Delco 41-993",
    quantity: 12,
    price: 200.0,
    category: "Chevrolet Parts PH",
    min_stock_level: 10,
    warranty_period: "7 days replacement",
    warranty_terms:
      "Defect-only warranty. No coverage for installation errors or misfiring engines.",
    supplier: "Spark Plug Division",
  },
  {
    product_id: 17,
    name: "NGK BKR6E-11",
    quantity: 11,
    price: 180.0,
    category: "NGK Philippines",
    min_stock_level: 10,
    warranty_period: "7 days replacement",
    warranty_terms:
      "Replacement only for factory defects. Must return with packaging and receipt.",
    supplier: "Spark Plug Division",
  },
  {
    product_id: 18,
    name: "LODWIG Brake Pad Set",
    quantity: 14,
    price: 200.0,
    category: "Chevrolet Parts PH",
    min_stock_level: 10,
    warranty_period: "1 year",
    warranty_terms: "Standard manufacturer brake component warranty.",
    supplier: "Brake Division",
  },
];

export const AutoAvenueDemo: React.FC = () => {
  const [products, setProducts] = useState<AutoAvenueProduct[]>(INITIAL_AUTO_PRODUCTS);
  const [selectedId, setSelectedId] = useState<number>(17);
  const [saleQty, setSaleQty] = useState<number>(3);
  const [alerts, setAlerts] = useState<
    { alert_id: number; product_id: number; message: string; poNumber: string }[]
  >([
    {
      alert_id: 44,
      product_id: 17,
      message: "Low stock alert for product ID 17 - NGK BKR6E-11 (Threshold: 10)",
      poNumber: "PO-20250604-004",
    },
  ]);
  const [lastSaleMsg, setLastSaleMsg] = useState<string | null>(null);

  const selectedProduct =
    products.find((p) => p.product_id === selectedId) || products[0];

  const handleRecordSale = () => {
    if (selectedProduct.quantity < saleQty) return;
    const newQty = selectedProduct.quantity - saleQty;

    setProducts((prev) =>
      prev.map((p) =>
        p.product_id === selectedProduct.product_id
          ? { ...p, quantity: newQty }
          : p
      )
    );

    setLastSaleMsg(
      `INSERT INTO sales (product_id: ${selectedProduct.product_id}, quantity_sold: ${saleQty}) — Total: ₱${(
        selectedProduct.price * saleQty
      ).toFixed(2)}`
    );

    if (newQty <= selectedProduct.min_stock_level) {
      const randPo = `PO-20250604-00${Math.floor(5 + Math.random() * 9)}`;
      setAlerts((prev) => [
        {
          alert_id: Math.floor(50 + Math.random() * 50),
          product_id: selectedProduct.product_id,
          message: `Low stock alert for product ID ${selectedProduct.product_id} (${selectedProduct.name} — Current: ${newQty})`,
          poNumber: randPo,
        },
        ...prev.slice(0, 2),
      ]);
    }
  };

  const handleReset = () => {
    setProducts(INITIAL_AUTO_PRODUCTS);
    setAlerts([]);
    setLastSaleMsg(null);
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
                Auto Avenue IMS (auto_avenue_db)
              </span>
              <span className="text-[10px] text-neutral-500">
                sales.php • purchase_order.php • alerts table
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset DB</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {lastSaleMsg && (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500" />
              <span>{lastSaleMsg}</span>
            </div>
          )}

          {/* Alerts & Purchase Orders from auto_avenue_db.sql */}
          {alerts.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 flex items-start gap-2.5 animate-fade-in">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 dark:text-amber-300 font-mono">
                    alerts.alert_id #{alerts[0].alert_id} → {alerts[0].poNumber}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-semibold">
                    Cash on Delivery
                  </span>
                </div>
                <p className="text-amber-700 dark:text-amber-400">
                  {alerts[0].message}. Auto-generated purchase order in{" "}
                  <code>purchase_orders</code> (50 units queued).
                </p>
              </div>
            </div>
          )}

          {/* Real Products Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              products Table (min_stock_level = 10)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {products.map((p) => {
                const isLow = p.quantity <= p.min_stock_level;
                const isSelected = p.product_id === selectedId;
                return (
                  <div
                    key={p.product_id}
                    onClick={() => setSelectedId(p.product_id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-amber-500 bg-amber-50/30 dark:bg-amber-950/20 shadow-sm"
                        : "border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-neutral-400">
                          ID #{p.product_id}
                        </span>
                        <span className="text-xs font-black font-mono text-amber-600 dark:text-amber-400">
                          ₱{p.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs font-bold mt-0.5">{p.name}</p>
                      <p className="text-[10px] text-neutral-500">{p.category}</p>
                      <p className="text-[9px] text-neutral-400 mt-1 line-clamp-2">
                        Warranty: {p.warranty_period} ({p.warranty_terms})
                      </p>
                    </div>

                    <div className="mt-2.5 pt-1.5 border-t border-neutral-100 dark:border-zinc-800 flex items-center justify-between text-[11px]">
                      <span
                        className={`font-mono font-bold ${
                          isLow ? "text-red-500" : "text-neutral-900 dark:text-white"
                        }`}
                      >
                        Qty: {p.quantity}
                      </span>
                      {isLow ? (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                          LOW (≤10)
                        </span>
                      ) : (
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* POS Sales Trigger Box */}
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-zinc-900/90 border border-neutral-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="w-full sm:w-auto">
              <span className="text-[11px] font-semibold text-neutral-500 block">
                Record Sale in <code>sales.php</code>: <strong>{selectedProduct.name}</strong>
              </span>
              <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">
                Amount: ₱{(selectedProduct.price * saleQty).toFixed(2)} ({saleQty} units)
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center bg-white dark:bg-zinc-800 rounded-lg border border-neutral-300 dark:border-zinc-700 p-0.5">
                <button
                  onClick={() => setSaleQty((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded text-xs font-bold hover:bg-neutral-100 dark:hover:bg-zinc-700"
                >
                  -
                </button>
                <span className="px-2 font-mono font-bold text-xs">{saleQty}</span>
                <button
                  onClick={() =>
                    setSaleQty((q) => Math.min(selectedProduct.quantity, q + 1))
                  }
                  className="w-7 h-7 rounded text-xs font-bold hover:bg-neutral-100 dark:hover:bg-zinc-700"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleRecordSale}
                disabled={selectedProduct.quantity === 0}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Execute POS Sale</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
