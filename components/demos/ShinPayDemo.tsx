"use client";

import React, { useState } from "react";
import {
  Calculator,
  Building2,
  Users,
  ShieldCheck,
  FileSpreadsheet,
  CheckCircle2,
  TrendingUp,
  Receipt,
  RotateCcw,
} from "lucide-react";

export const ShinPayDemo: React.FC = () => {
  const [basicSalary, setBasicSalary] = useState<number>(35000);
  const [allowance, setAllowance] = useState<number>(3000);
  const [tenant, setTenant] = useState<"tenant-a" | "tenant-b">("tenant-a");
  const [activeTab, setActiveTab] = useState<"calculator" | "roster">(
    "calculator"
  );
  const [showPayslip, setShowPayslip] = useState(false);

  // Philippine Statutory Calculations (2024–2026 Standards)
  // SSS: ~4.5% Employee share with standard ₱30k cap (max ₱1,350 for regular SS)
  const sssContribution = Math.min(Math.round(basicSalary * 0.045), 1350);

  // PhilHealth: 5% total premium -> 2.5% employee share (Cap: ₱100k, Min: ₱10k)
  const philHealthBase = Math.min(Math.max(basicSalary, 10000), 100000);
  const philHealthContribution = Math.round(philHealthBase * 0.025);

  // Pag-IBIG: Standard ₱200 max mandatory contribution for employee
  const pagIbigContribution = basicSalary >= 5000 ? 200 : 100;

  const totalMandatoryDeductions =
    sssContribution + philHealthContribution + pagIbigContribution;

  // Taxable Income = Basic - Mandatory statutory contributions
  const taxableIncome = Math.max(0, basicSalary - totalMandatoryDeductions);

  // BIR TRAIN Law Graduated Withholding Tax Bracket (Monthly)
  let withholdingTax = 0;
  if (taxableIncome <= 20833) {
    withholdingTax = 0;
  } else if (taxableIncome <= 33332) {
    withholdingTax = Math.round((taxableIncome - 20833) * 0.15);
  } else if (taxableIncome <= 66666) {
    withholdingTax = Math.round(1875 + (taxableIncome - 33333) * 0.2);
  } else if (taxableIncome <= 166666) {
    withholdingTax = Math.round(8541.8 + (taxableIncome - 66667) * 0.25);
  } else {
    withholdingTax = Math.round(33541.8 + (taxableIncome - 166667) * 0.3);
  }

  const totalDeductions = totalMandatoryDeductions + withholdingTax;
  const netTakeHomePay = basicSalary + allowance - totalDeductions;

  const rosterA = [
    { id: "EMP-001", name: "Maria Santos", role: "Frontend Dev", salary: 38000, dept: "Engineering" },
    { id: "EMP-002", name: "Juan Dela Cruz", role: "QA Engineer", salary: 32000, dept: "Product" },
    { id: "EMP-003", name: "Camille Reyes", role: "UI Designer", salary: 35000, dept: "Design" },
  ];

  const rosterB = [
    { id: "EMP-101", name: "David Bautista", role: "Warehouse Mgr", salary: 28000, dept: "Logistics" },
    { id: "EMP-102", name: "Ana Mercado", role: "Inventory Lead", salary: 26000, dept: "Operations" },
  ];

  const activeRoster = tenant === "tenant-a" ? rosterA : rosterB;

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 text-zinc-900 dark:text-zinc-100 select-none">
      {/* SaaS Dashboard Container */}
      <div className="w-full max-w-2xl bg-white dark:bg-[#111116] rounded-2xl border border-neutral-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col">
        {/* Top Window Bar */}
        <div className="px-4 py-3 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
            </div>
            <span className="text-xs font-mono font-bold text-neutral-600 dark:text-zinc-300 ml-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ShinPay+ Multi-Tenant Hub
            </span>
          </div>

          {/* Tenant Switcher (Simulates Row-Level Security in Supabase) */}
          <div className="flex items-center gap-2 text-xs">
            <Building2 className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={tenant}
              onChange={(e) => setTenant(e.target.value as any)}
              className="bg-white dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none"
            >
              <option value="tenant-a">Org: Batangas Tech Hub (RLS)</option>
              <option value="tenant-b">Org: Lipa Logistics (RLS)</option>
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-200 dark:border-zinc-800 text-xs font-semibold bg-neutral-50 dark:bg-zinc-900/50">
          <button
            onClick={() => {
              setActiveTab("calculator");
              setShowPayslip(false);
            }}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "calculator"
                ? "border-ig-pink text-ig-pink bg-white dark:bg-zinc-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>PH Statutory Engine</span>
          </button>
          <button
            onClick={() => setActiveTab("roster")}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "roster"
                ? "border-ig-pink text-ig-pink bg-white dark:bg-zinc-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Tenant Roster ({activeRoster.length} staff)</span>
          </button>
        </div>

        {/* Content Viewport */}
        <div className="p-4 sm:p-5 flex-1 min-h-[360px] flex flex-col justify-between">
          {activeTab === "calculator" ? (
            showPayslip ? (
              /* Generated Payslip View */
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-zinc-800">
                  <div>
                    <h4 className="text-sm font-bold">OFFICIAL PAYSLIP (CONFIDENTIAL)</h4>
                    <p className="text-xs text-neutral-500">
                      Period: October 2026 • Bi-Monthly Cycle
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                    APPROVED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200 dark:border-zinc-800 space-y-1">
                    <p className="font-semibold text-neutral-500 text-[10px] uppercase">
                      Earnings
                    </p>
                    <div className="flex justify-between">
                      <span>Basic Pay:</span>
                      <span className="font-mono font-bold">₱{basicSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>De Minimis:</span>
                      <span className="font-mono font-bold">₱{allowance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-neutral-900 dark:text-white pt-1 border-t border-neutral-200 dark:border-zinc-800">
                      <span>Gross Earnings:</span>
                      <span className="font-mono">₱{(basicSalary + allowance).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200 dark:border-zinc-800 space-y-1">
                    <p className="font-semibold text-neutral-500 text-[10px] uppercase">
                      Statutory Deductions
                    </p>
                    <div className="flex justify-between">
                      <span>SSS EE Share:</span>
                      <span className="font-mono text-red-500">-₱{sssContribution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PhilHealth (2.5%):</span>
                      <span className="font-mono text-red-500">-₱{philHealthContribution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pag-IBIG:</span>
                      <span className="font-mono text-red-500">-₱{pagIbigContribution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Withholding Tax:</span>
                      <span className="font-mono text-red-500">-₱{withholdingTax}</span>
                    </div>
                  </div>
                </div>

                {/* Net Pay Callout */}
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                      Net Take-Home Pay
                    </p>
                    <p className="text-xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                      ₱{netTakeHomePay.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPayslip(false)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity"
                  >
                    Adjust Numbers
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive Calculator View */
              <div className="space-y-4">
                {/* Inputs */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Monthly Basic Salary:</span>
                      <span className="font-mono text-ig-pink text-sm">
                        ₱{basicSalary.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={15000}
                      max={95000}
                      step={1000}
                      value={basicSalary}
                      onChange={(e) => setBasicSalary(Number(e.target.value))}
                      className="w-full accent-pink-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
                      <span>₱15,000 (Entry)</span>
                      <span>₱35,000 (Mid)</span>
                      <span>₱95,000 (Lead)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                        Monthly Allowance (Non-Taxable)
                      </label>
                      <input
                        type="number"
                        value={allowance}
                        onChange={(e) => setAllowance(Math.max(0, Number(e.target.value)))}
                        className="w-full p-2 text-xs font-mono font-bold rounded-lg border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                        TRAIN Tax Bracket
                      </label>
                      <div className="p-2 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300">
                        {basicSalary <= 20833
                          ? "0% Tax Exempt"
                          : basicSalary <= 33333
                          ? "15% on excess"
                          : "20% bracket"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statutory Calculation Result Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-200 dark:border-zinc-800">
                  <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-zinc-900 text-center border border-neutral-200 dark:border-zinc-800">
                    <span className="text-[10px] text-neutral-500 block">SSS (4.5%)</span>
                    <span className="text-xs font-mono font-bold text-red-500">
                      ₱{sssContribution}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-zinc-900 text-center border border-neutral-200 dark:border-zinc-800">
                    <span className="text-[10px] text-neutral-500 block">PhilHealth (2.5%)</span>
                    <span className="text-xs font-mono font-bold text-red-500">
                      ₱{philHealthContribution}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-zinc-900 text-center border border-neutral-200 dark:border-zinc-800">
                    <span className="text-[10px] text-neutral-500 block">Pag-IBIG</span>
                    <span className="text-xs font-mono font-bold text-red-500">
                      ₱{pagIbigContribution}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-zinc-900 text-center border border-neutral-200 dark:border-zinc-800">
                    <span className="text-[10px] text-neutral-500 block">BIR Tax</span>
                    <span className="text-xs font-mono font-bold text-red-500">
                      ₱{withholdingTax}
                    </span>
                  </div>
                </div>

                {/* Net Pay Engine Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-50 dark:bg-zinc-900/80 p-3 rounded-xl border border-neutral-200 dark:border-zinc-800">
                  <div>
                    <span className="text-[11px] text-neutral-500 block">
                      Estimated Take-Home (Net):
                    </span>
                    <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                      ₱{netTakeHomePay.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowPayslip(true)}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-ig-gradient text-white font-bold text-xs hover:opacity-95 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>Generate Payslip View</span>
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Tenant Roster (Simulating Supabase PostgreSQL RLS) */
            <div className="space-y-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>
                  Supabase Row-Level Security (RLS) restricts access strictly to{" "}
                  <strong>{tenant === "tenant-a" ? "Batangas Tech Hub" : "Lipa Logistics"}</strong>.
                </span>
              </div>

              <div className="space-y-2">
                {activeRoster.map((emp) => (
                  <div
                    key={emp.id}
                    className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-neutral-700 dark:text-zinc-300">
                        {emp.name[0]}
                      </div>
                      <div>
                        <p className="font-bold">{emp.name}</p>
                        <p className="text-[11px] text-neutral-500">
                          {emp.role} • {emp.dept}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold block">
                        ₱{emp.salary.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        Active Payee
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
