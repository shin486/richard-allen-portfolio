"use client";

import React, { useState, useMemo } from "react";
import { Plus, Minus, ShoppingCart, FileText, CheckCircle2 } from "lucide-react";

interface AutoProduct {
  product_id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  supplier: string;
  min_stock_level: number;
}

interface SaleRecord {
  sale_id: number;
  product_id: number;
  name: string;
  quantity_sold: number;
  price: number;
  sale_date: string;
}

// Synced directly with auto_avenue_db.sql from https://github.com/shin486/auto-avenue-ims
const INITIAL_PRODUCTS: AutoProduct[] = [
  {
    product_id: 21,
    name: "Mags (16-inch Alloy)",
    category: "Wheels",
    quantity: 4,
    price: 8000.0,
    supplier: " Rota Philippines",
    min_stock_level: 10,
  },
  {
    product_id: 19,
    name: "Exhaust Pipe (Stainless)",
    category: "Exhaust",
    quantity: 3,
    price: 2500.0,
    supplier: "HKS Performance PH",
    min_stock_level: 8,
  },
  {
    product_id: 25,
    name: "Ceramic Brake Pads",
    category: "Brakes",
    quantity: 5,
    price: 1850.0,
    supplier: "Brembo Dist. Manila",
    min_stock_level: 10,
  },
  {
    product_id: 20,
    name: " Side Mirror Assembly",
    category: "Body Parts",
    quantity: 12,
    price: 500.0,
    supplier: "Toyota Genuine Parts",
    min_stock_level: 10,
  },
  {
    product_id: 23,
    name: "Motolite Gold 1SMF Battery",
    category: "Electrical",
    quantity: 14,
    price: 5400.0,
    supplier: "Motolite Batangas",
    min_stock_level: 8,
  },
  {
    product_id: 24,
    name: "Synthetic Engine Oil 5W-40",
    category: "Lubricants",
    quantity: 28,
    price: 2150.0,
    supplier: "Shell Helix PH",
    min_stock_level: 12,
  },
];

const INITIAL_SALES: SaleRecord[] = [
  {
    sale_id: 104,
    product_id: 21,
    name: "Mags (16-inch Alloy)",
    quantity_sold: 2,
    price: 8000.0,
    sale_date: "Oct 28, 2026 03:40 PM",
  },
  {
    sale_id: 103,
    product_id: 23,
    name: "Motolite Gold 1SMF Battery",
    quantity_sold: 1,
    price: 5400.0,
    sale_date: "Oct 28, 2026 01:15 PM",
  },
  {
    sale_id: 102,
    product_id: 19,
    name: "Exhaust Pipe (Stainless)",
    quantity_sold: 2,
    price: 2500.0,
    sale_date: "Oct 27, 2026 11:20 AM",
  },
  {
    sale_id: 101,
    product_id: 20,
    name: "Side Mirror Assembly",
    quantity_sold: 3,
    price: 500.0,
    sale_date: "Oct 27, 2026 09:05 AM",
  },
];

export default function AutoAvenueDemo() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "products" | "purchase_order" | "sales"
  >("dashboard");
  const [products, setProducts] = useState<AutoProduct[]>(INITIAL_PRODUCTS);
  const [sales, setSales] = useState<SaleRecord[]>(INITIAL_SALES);
  const [poGenerated, setPoGenerated] = useState(false);

  const lowStockProducts = useMemo(
    () => products.filter((p) => p.quantity < p.min_stock_level),
    [products]
  );

  const inventoryValue = useMemo(
    () => products.reduce((sum, p) => sum + p.quantity * p.price, 0),
    [products]
  );

  const adjustStock = (productId: number, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.product_id === productId
          ? { ...p, quantity: Math.max(0, p.quantity + delta) }
          : p
      )
    );
  };

  const recordQuickSale = (product: AutoProduct) => {
    if (product.quantity <= 0) return;
    adjustStock(product.product_id, -1);
    const newSale: SaleRecord = {
      sale_id: sales[0] ? sales[0].sale_id + 1 : 105,
      product_id: product.product_id,
      name: product.name,
      quantity_sold: 1,
      price: product.price,
      sale_date: "Just now",
    };
    setSales((prev) => [newSale, ...prev]);
  };

  const handleRestockLowItems = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.quantity < p.min_stock_level
          ? { ...p, quantity: p.min_stock_level + 5 }
          : p
      )
    );
    setPoGenerated(true);
  };

  return (
    /* Exact CSS & HTML structure from shin486/auto-avenue-ims/dashboard.php:
       --primary: rgb(0, 0, 0), --primary-light: rgb(66, 169, 111), --bg-color: #f4f6f8 */
    <div className="w-full h-full flex flex-col bg-[#f4f6f8] text-[#333333] font-sans select-none overflow-hidden">
      {/* Real Auto Avenue IMS Header (linear-gradient(135deg, rgb(0,0,0), rgb(66,169,111))) */}
      <header
        className="px-3.5 py-2.5 text-white shadow-sm shrink-0"
        style={{
          background: "linear-gradient(135deg, rgb(0, 0, 0), rgb(66, 169, 111))",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <img
              src="/projects/autoavelogo.svg"
              alt="Auto Avenue Logo"
              className="h-8 w-auto object-contain bg-white/95 rounded px-1.5 py-0.5"
            />
            <div>
              <h1 className="text-[14px] font-bold tracking-tight text-white leading-tight">
                Auto Avenue IMS
              </h1>
              <span className="inline-block bg-white/15 px-2 py-0.5 rounded text-[9.5px] text-white/95">
                Logged in as: <strong>Admin</strong>
              </span>
            </div>
          </div>

          {/* Exact <nav> links from dashboard.php */}
          <nav className="flex items-center gap-1">
            {(
              [
                { id: "dashboard", label: "Dashboard" },
                { id: "products", label: "Products" },
                { id: "purchase_order", label: "Purchase Order" },
                { id: "sales", label: "Sales" },
              ] as const
            ).map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                    active
                      ? "bg-white text-black shadow-2xs"
                      : "text-white/90 hover:bg-white/15"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content from dashboard.php / products.php / purchase_order.php / sales.php */}
      <main className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* 4 Dashboard Grid Cards from dashboard.php */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="bg-white rounded-lg p-2.5 shadow-2xs border-t-4 border-[#4CAF50]">
            <h3 className="text-[10px] font-bold uppercase text-[#666666]">
              Total Products
            </h3>
            <div className="text-[16px] font-extrabold text-[#333333] mt-0.5">
              {products.length}
            </div>
            <div className="text-[9.5px] text-[#666666]">All products in inventory</div>
          </div>

          <div className="bg-white rounded-lg p-2.5 shadow-2xs border-t-4 border-[#2196F3]">
            <h3 className="text-[10px] font-bold uppercase text-[#666666]">
              Total Sales
            </h3>
            <div className="text-[16px] font-extrabold text-[#333333] mt-0.5">
              {sales.length}
            </div>
            <div className="text-[9.5px] text-[#666666]">All-time sales transactions</div>
          </div>

          <div className="bg-white rounded-lg p-2.5 shadow-2xs border-t-4 border-[#9C27B0]">
            <h3 className="text-[10px] font-bold uppercase text-[#666666]">
              Inventory Value
            </h3>
            <div className="text-[15px] font-extrabold text-[#333333] mt-0.5">
              ₱{inventoryValue.toLocaleString("en-PH")}
            </div>
            <div className="text-[9.5px] text-[#666666]">Total stock valuation</div>
          </div>

          <div className="bg-white rounded-lg p-2.5 shadow-2xs border-t-4 border-[#ff9800]">
            <h3 className="text-[10px] font-bold uppercase text-[#666666]">
              Low Stock Items
            </h3>
            <div className="text-[16px] font-extrabold text-[#f44336] mt-0.5">
              {lowStockProducts.length}
            </div>
            <div className="text-[9.5px] text-[#666666]">Below minimum level</div>
          </div>
        </div>

        {/* TAB 1: DASHBOARD.PHP */}
        {activeTab === "dashboard" && (
          <>
            {/* Low Stock Alerts Section from dashboard.php */}
            <div className="bg-white rounded-lg p-3 shadow-2xs border border-[#e0e0e0]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[13px] font-bold text-[#333333] flex items-center gap-1.5">
                  Low Stock Alerts
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#f44336] text-white text-[10px] font-bold">
                    {lowStockProducts.length}
                  </span>
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab("purchase_order")}
                  className="px-3 py-1 rounded bg-black hover:bg-[#42a96f] text-white text-[10.5px] font-semibold transition-colors"
                >
                  Generate Purchase Order
                </button>
              </div>

              {lowStockProducts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-[#f8f9fa] border-b border-[#e0e0e0] text-[#555555]">
                        <th className="py-1.5 px-2">ID</th>
                        <th className="py-1.5 px-2">Product Name</th>
                        <th className="py-1.5 px-2">Current Stock</th>
                        <th className="py-1.5 px-2">Min Level</th>
                        <th className="py-1.5 px-2">Category</th>
                        <th className="py-1.5 px-2">Supplier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowStockProducts.map((row) => (
                        <tr
                          key={row.product_id}
                          className="border-b border-[#eeeeee] hover:bg-[#f9f9f9]"
                        >
                          <td className="py-1.5 px-2 font-mono">{row.product_id}</td>
                          <td className="py-1.5 px-2 font-semibold">{row.name}</td>
                          <td className="py-1.5 px-2 font-extrabold text-[#f44336]">
                            {row.quantity}
                          </td>
                          <td className="py-1.5 px-2">{row.min_stock_level}</td>
                          <td className="py-1.5 px-2">{row.category}</td>
                          <td className="py-1.5 px-2 text-[#666666]">{row.supplier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-[11.5px] text-[#4CAF50] font-semibold py-2">
                  All automotive parts are above minimum stock thresholds!
                </p>
              )}
            </div>

            {/* Recent Sales Section from dashboard.php */}
            <div className="bg-white rounded-lg p-3 shadow-2xs border border-[#e0e0e0]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[13px] font-bold text-[#333333]">Recent Sales</h2>
                <button
                  type="button"
                  onClick={() => setActiveTab("products")}
                  className="text-[10.5px] font-bold text-[#42a96f] hover:underline"
                >
                  + Record New Sale in Products →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-[#f8f9fa] border-b border-[#e0e0e0] text-[#555555]">
                      <th className="py-1.5 px-2">Sale ID</th>
                      <th className="py-1.5 px-2">Product</th>
                      <th className="py-1.5 px-2">Qty</th>
                      <th className="py-1.5 px-2">Unit Price</th>
                      <th className="py-1.5 px-2">Total</th>
                      <th className="py-1.5 px-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.slice(0, 4).map((sale) => {
                      const totalSale = sale.quantity_sold * sale.price;
                      const isHighSale = totalSale > 10000;
                      return (
                        <tr
                          key={sale.sale_id}
                          className={`border-b border-[#eeeeee] ${
                            isHighSale ? "bg-[#e8f5e9] font-semibold" : ""
                          }`}
                        >
                          <td className="py-1.5 px-2 font-mono">#{sale.sale_id}</td>
                          <td className="py-1.5 px-2">{sale.name}</td>
                          <td className="py-1.5 px-2">{sale.quantity_sold}</td>
                          <td className="py-1.5 px-2">
                            ₱{sale.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-1.5 px-2 font-bold text-[#2e7d32]">
                            ₱{totalSale.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-1.5 px-2 text-[#666666]">{sale.sale_date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: PRODUCTS.PHP */}
        {activeTab === "products" && (
          <div className="bg-white rounded-lg p-3 shadow-2xs border border-[#e0e0e0] space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[13px] font-bold text-[#333333]">
                  Products Inventory (auto_avenue_db.products)
                </h2>
                <p className="text-[10.5px] text-[#666666]">
                  Adjust stock quantities or click &quot;Sell 1 Unit&quot; to test low-stock triggers
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#f8f9fa] border-b border-[#e0e0e0] text-[#555555]">
                    <th className="py-1.5 px-2">ID</th>
                    <th className="py-1.5 px-2">Part Name</th>
                    <th className="py-1.5 px-2">Category</th>
                    <th className="py-1.5 px-2">Price</th>
                    <th className="py-1.5 px-2">Stock / Min</th>
                    <th className="py-1.5 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => {
                    const isLow = prod.quantity < prod.min_stock_level;
                    return (
                      <tr
                        key={prod.product_id}
                        className="border-b border-[#eeeeee] hover:bg-[#f9f9f9]"
                      >
                        <td className="py-1.5 px-2 font-mono">{prod.product_id}</td>
                        <td className="py-1.5 px-2 font-semibold">{prod.name}</td>
                        <td className="py-1.5 px-2">{prod.category}</td>
                        <td className="py-1.5 px-2 font-mono">
                          ₱{prod.price.toLocaleString("en-PH")}
                        </td>
                        <td className="py-1.5 px-2">
                          <span
                            className={`font-bold ${
                              isLow ? "text-[#f44336]" : "text-[#4CAF50]"
                            }`}
                          >
                            {prod.quantity}
                          </span>{" "}
                          <span className="text-[#888888]">/ {prod.min_stock_level}</span>
                        </td>
                        <td className="py-1.5 px-2 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => adjustStock(prod.product_id, -1)}
                              className="w-5 h-5 rounded bg-[#eeeeee] hover:bg-[#dddddd] flex items-center justify-center"
                              title="Decrease Stock"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => adjustStock(prod.product_id, 1)}
                              className="w-5 h-5 rounded bg-[#eeeeee] hover:bg-[#dddddd] flex items-center justify-center"
                              title="Increase Stock"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => recordQuickSale(prod)}
                              className="ml-1 px-2 py-0.5 rounded bg-[#42a96f] hover:bg-[#368f5c] text-white text-[10px] font-semibold inline-flex items-center gap-1"
                            >
                              <ShoppingCart className="w-2.5 h-2.5" /> Sell 1
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PURCHASE_ORDER.PHP */}
        {activeTab === "purchase_order" && (
          <div className="bg-white rounded-lg p-3 shadow-2xs border border-[#e0e0e0] space-y-3">
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-2">
              <div>
                <h2 className="text-[13px] font-bold text-[#333333] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#42a96f]" />
                  Automated Purchase Order Generator (purchase_order.php)
                </h2>
                <p className="text-[10.5px] text-[#666666]">
                  Automatically calculates restock quantities for items below min_stock_level
                </p>
              </div>
              <button
                type="button"
                onClick={handleRestockLowItems}
                className="px-3 py-1.5 rounded bg-black hover:bg-[#42a96f] text-white text-[11px] font-semibold transition-colors"
              >
                Approve & Restock All Low Items
              </button>
            </div>

            {poGenerated && (
              <div className="p-2.5 rounded bg-[#e8f5e9] border border-[#4CAF50] text-[#2e7d32] text-[11px] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Purchase Order #PO-2026-089 approved! All low-stock automotive parts have been replenished.
              </div>
            )}

            {lowStockProducts.length > 0 ? (
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#f8f9fa] border-b border-[#e0e0e0] text-[#555555]">
                    <th className="py-1.5 px-2">Part Name</th>
                    <th className="py-1.5 px-2">Supplier</th>
                    <th className="py-1.5 px-2">Current</th>
                    <th className="py-1.5 px-2">Order Qty</th>
                    <th className="py-1.5 px-2">Est. Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((item) => {
                    const orderQty = item.min_stock_level + 5 - item.quantity;
                    return (
                      <tr key={item.product_id} className="border-b border-[#eeeeee]">
                        <td className="py-1.5 px-2 font-semibold">{item.name}</td>
                        <td className="py-1.5 px-2">{item.supplier}</td>
                        <td className="py-1.5 px-2 text-[#f44336] font-bold">
                          {item.quantity}
                        </td>
                        <td className="py-1.5 px-2 font-bold text-[#42a96f]">
                          +{orderQty} units
                        </td>
                        <td className="py-1.5 px-2 font-mono">
                          ₱{(orderQty * item.price).toLocaleString("en-PH")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-[11.5px] text-[#666666]">
                No low-stock items require a purchase order right now.
              </p>
            )}
          </div>
        )}

        {/* TAB 4: SALES.PHP */}
        {activeTab === "sales" && (
          <div className="bg-white rounded-lg p-3 shadow-2xs border border-[#e0e0e0] space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-[#333333]">
                Sales Ledger (sales.php)
              </h2>
              <span className="text-[10.5px] text-[#666666]">
                Green rows indicate high-value sales (&gt; ₱10,000)
              </span>
            </div>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-[#e0e0e0] text-[#555555]">
                  <th className="py-1.5 px-2">Sale ID</th>
                  <th className="py-1.5 px-2">Product</th>
                  <th className="py-1.5 px-2">Qty Sold</th>
                  <th className="py-1.5 px-2">Unit Price</th>
                  <th className="py-1.5 px-2">Total Sale</th>
                  <th className="py-1.5 px-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => {
                  const totalSale = sale.quantity_sold * sale.price;
                  const isHighSale = totalSale > 10000;
                  return (
                    <tr
                      key={sale.sale_id}
                      className={`border-b border-[#eeeeee] ${
                        isHighSale ? "bg-[#e8f5e9] font-semibold" : ""
                      }`}
                    >
                      <td className="py-1.5 px-2 font-mono">#{sale.sale_id}</td>
                      <td className="py-1.5 px-2">{sale.name}</td>
                      <td className="py-1.5 px-2">{sale.quantity_sold}</td>
                      <td className="py-1.5 px-2">₱{sale.price.toLocaleString("en-PH")}</td>
                      <td className="py-1.5 px-2 font-bold text-[#2e7d32]">
                        ₱{totalSale.toLocaleString("en-PH")}
                      </td>
                      <td className="py-1.5 px-2 text-[#666666]">{sale.sale_date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
