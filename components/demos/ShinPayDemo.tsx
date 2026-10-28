"use client";

import React, { useState } from "react";
import {
  Calculator,
  Building2,
  Users,
  ShieldCheck,
  Receipt,
  CheckCircle2,
} from "lucide-react";

/**
 * Exact businesses and employees from RA Payroll System (ShinPay+):
 * Source: lib/seed-data.ts & lib/payroll-engine.ts
 */
export const SAMPLE_BUSINESSES = [
  { name: "R'S Place Water Refilling Station", code: "RSPLACE", description: "Water refilling station" },
  { name: "AutoAvenue Car Care Center", code: "AUTOCARE", description: "Car care and detailing center" },
  { name: "DVL Pharmacy", code: "DVLPH", description: "Retail pharmacy" },
  { name: "Auto Avenue Automotive Parts Store", code: "AUTOPARTS", description: "Automotive parts retailer" },
  { name: "RA's Shuttle Services", code: "RASHUTTLE", description: "Shuttle and transport services" },
];

export interface SampleEmployee {
  employee_id: string;
  business_code: string;
  first_name: string;
  last_name: string;
  position: string;
  salary_type: "monthly" | "daily";
  basic_rate: number;
  payroll_frequency: "semi-monthly" | "weekly" | "monthly";
  employment_status: string;
}

export const SAMPLE_EMPLOYEES: SampleEmployee[] = [
  // R'S Place Water Refilling Station
  { employee_id: "RSP-001", business_code: "RSPLACE", first_name: "Maria", last_name: "Santos", position: "Station Manager", salary_type: "monthly", basic_rate: 16000, payroll_frequency: "semi-monthly", employment_status: "Regular" },
  { employee_id: "RSP-002", business_code: "RSPLACE", first_name: "Juan", last_name: "Dela Cruz", position: "Refiller", salary_type: "daily", basic_rate: 400, payroll_frequency: "weekly", employment_status: "Regular" },
  { employee_id: "RSP-003", business_code: "RSPLACE", first_name: "Pedro", last_name: "Reyes", position: "Delivery Driver", salary_type: "daily", basic_rate: 420, payroll_frequency: "weekly", employment_status: "Regular" },
  // AutoAvenue Car Care Center
  { employee_id: "AAC-001", business_code: "AUTOCARE", first_name: "Carlo", last_name: "Mendoza", position: "Service Manager", salary_type: "monthly", basic_rate: 18000, payroll_frequency: "semi-monthly", employment_status: "Regular" },
  { employee_id: "AAC-002", business_code: "AUTOCARE", first_name: "Ramon", last_name: "Garcia", position: "Auto Detailer", salary_type: "daily", basic_rate: 450, payroll_frequency: "weekly", employment_status: "Regular" },
  // DVL Pharmacy
  { employee_id: "DVL-001", business_code: "DVLPH", first_name: "Liza", last_name: "Torres", position: "Pharmacist", salary_type: "monthly", basic_rate: 20000, payroll_frequency: "semi-monthly", employment_status: "Regular" },
  // Auto Avenue Automotive Parts Store
  { employee_id: "AAP-001", business_code: "AUTOPARTS", first_name: "Mark", last_name: "Villanueva", position: "Store Clerk", salary_type: "monthly", basic_rate: 14000, payroll_frequency: "semi-monthly", employment_status: "Regular" },
  // RA's Shuttle Services
  { employee_id: "RAS-001", business_code: "RASHUTTLE", first_name: "Antonio", last_name: "Ramos", position: "Operations Manager", salary_type: "monthly", basic_rate: 22000, payroll_frequency: "semi-monthly", employment_status: "Regular" },
  { employee_id: "RAS-010", business_code: "RASHUTTLE", first_name: "Kevin", last_name: "Alvarez", position: "Route Supervisor", salary_type: "monthly", basic_rate: 17000, payroll_frequency: "semi-monthly", employment_status: "Regular" },
  { employee_id: "RAS-002", business_code: "RASHUTTLE", first_name: "Jose", last_name: "Aquino", position: "Shuttle Driver", salary_type: "daily", basic_rate: 480, payroll_frequency: "weekly", employment_status: "Regular" },
  { employee_id: "RAS-003", business_code: "RASHUTTLE", first_name: "Ben", last_name: "Lim", position: "Shuttle Driver", salary_type: "daily", basic_rate: 480, payroll_frequency: "weekly", employment_status: "Regular" },
];

export const ShinPayDemo: React.FC = () => {
  const [selectedBiz, setSelectedBiz] = useState<string>("RSPLACE");
  const [selectedEmpId, setSelectedEmpId] = useState<string>("RSP-001");
  const [workingDays, setWorkingDays] = useState<number>(6);
  const [allowances, setAllowances] = useState<number>(1500);
  const [overtimePay, setOvertimePay] = useState<number>(500);
  const [activeTab, setActiveTab] = useState<"calculator" | "roster">("calculator");
  const [showPayslip, setShowPayslip] = useState(false);

  const bizEmployees = SAMPLE_EMPLOYEES.filter((e) => e.business_code === selectedBiz);
  const currentEmp =
    SAMPLE_EMPLOYEES.find((e) => e.employee_id === selectedEmpId) || bizEmployees[0];
  const currentBizObj =
    SAMPLE_BUSINESSES.find((b) => b.code === selectedBiz) || SAMPLE_BUSINESSES[0];

  // Equivalent monthly base for statutory calculation (lib/payroll-engine.ts)
  const monthlyEquivalent =
    currentEmp.salary_type === "monthly"
      ? currentEmp.basic_rate
      : currentEmp.basic_rate * 26;

  // Period basic pay
  const periodBasic =
    currentEmp.salary_type === "monthly"
      ? currentEmp.payroll_frequency === "semi-monthly"
        ? Math.round(currentEmp.basic_rate / 2)
        : currentEmp.basic_rate
      : currentEmp.basic_rate * workingDays;

  // Statutory Calculations (Monthly -> prorated by frequency)
  const freqDivisor =
    currentEmp.payroll_frequency === "weekly"
      ? 4
      : currentEmp.payroll_frequency === "semi-monthly"
      ? 2
      : 1;

  const sssContribution = Math.round(
    Math.min(Math.round(monthlyEquivalent * 0.045), 1350) / freqDivisor
  );
  const philHealthBase = Math.min(Math.max(monthlyEquivalent, 10000), 100000);
  const philHealthContribution = Math.round((philHealthBase * 0.025) / freqDivisor);
  const pagIbigContribution = Math.round(
    (monthlyEquivalent >= 5000 ? 200 : 100) / freqDivisor
  );

  const totalStatutory = sssContribution + philHealthContribution + pagIbigContribution;
  const taxableMonthly = Math.max(0, monthlyEquivalent - totalStatutory * freqDivisor);

  let monthlyTax = 0;
  if (taxableMonthly > 20833 && taxableMonthly <= 33332) {
    monthlyTax = Math.round((taxableMonthly - 20833) * 0.15);
  } else if (taxableMonthly > 33332) {
    monthlyTax = Math.round(1875 + (taxableMonthly - 33333) * 0.2);
  }
  const withholdingTax = Math.round(monthlyTax / freqDivisor);

  const grossPay = periodBasic + allowances + overtimePay;
  const totalDeductions = totalStatutory + withholdingTax;
  const netPay = grossPay - totalDeductions;

  const handleSelectBiz = (code: string) => {
    setSelectedBiz(code);
    const first = SAMPLE_EMPLOYEES.find((e) => e.business_code === code);
    if (first) setSelectedEmpId(first.employee_id);
    setShowPayslip(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 text-zinc-900 dark:text-zinc-100 select-none">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111116] rounded-2xl border border-neutral-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col">
        {/* Top Window Bar */}
        <div className="px-4 py-3 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
            </div>
            <span className="text-xs font-mono font-bold text-neutral-700 dark:text-zinc-200 ml-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ShinPay+ Multi-Tenant Engine
            </span>
          </div>

          {/* Real 5 Businesses Switcher from lib/seed-data.ts */}
          <div className="flex items-center gap-1.5 text-xs">
            <Building2 className="w-3.5 h-3.5 text-ig-pink flex-shrink-0" />
            <select
              value={selectedBiz}
              onChange={(e) => handleSelectBiz(e.target.value)}
              className="bg-white dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none"
            >
              {SAMPLE_BUSINESSES.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.code}: {b.name}
                </option>
              ))}
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
            <span>Payroll Engine ({currentEmp.employee_id})</span>
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
            <span>{currentBizObj.code} Roster ({bizEmployees.length})</span>
          </button>
        </div>

        {/* Content Viewport */}
        <div className="p-4 sm:p-5 flex-1 min-h-[360px] flex flex-col justify-between">
          {activeTab === "calculator" ? (
            showPayslip ? (
              /* Payslip Snapshot View */
              <div className="space-y-3.5 animate-fade-in">
                <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200 dark:border-zinc-800">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-ig-pink font-bold block">
                      {currentBizObj.name} ({currentBizObj.code})
                    </span>
                    <h4 className="text-sm font-bold">
                      {currentEmp.first_name} {currentEmp.last_name} ({currentEmp.employee_id})
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {currentEmp.position} • {currentEmp.payroll_frequency} ({currentEmp.salary_type})
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                    FINALIZED SNAPSHOT
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200 dark:border-zinc-800 space-y-1">
                    <p className="font-semibold text-neutral-500 text-[10px] uppercase">
                      Earning Buckets
                    </p>
                    <div className="flex justify-between">
                      <span>Basic ({currentEmp.salary_type}):</span>
                      <span className="font-mono font-bold">₱{periodBasic.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Allowances:</span>
                      <span className="font-mono font-bold">₱{allowances.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overtime (OT):</span>
                      <span className="font-mono font-bold">₱{overtimePay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-1 border-t border-neutral-200 dark:border-zinc-800">
                      <span>Gross Pay:</span>
                      <span className="font-mono">₱{grossPay.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/70 border border-neutral-200 dark:border-zinc-800 space-y-1">
                    <p className="font-semibold text-neutral-500 text-[10px] uppercase">
                      Statutory Deductions
                    </p>
                    <div className="flex justify-between">
                      <span>SSS:</span>
                      <span className="font-mono text-red-500">-₱{sssContribution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PhilHealth:</span>
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

                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                      Net Disbursed Pay ({currentEmp.payroll_frequency})
                    </p>
                    <p className="text-xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                      ₱{netPay.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPayslip(false)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black text-xs font-bold"
                  >
                    Edit Inputs
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive Payroll Engine Form */
              <div className="space-y-4">
                {/* Employee Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                      Select Tenant Employee
                    </label>
                    <select
                      value={currentEmp.employee_id}
                      onChange={(e) => setSelectedEmpId(e.target.value)}
                      className="w-full p-2 text-xs font-bold rounded-lg border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                    >
                      {bizEmployees.map((emp) => (
                        <option key={emp.employee_id} value={emp.employee_id}>
                          {emp.employee_id} — {emp.first_name} {emp.last_name} ({emp.position})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-2 rounded-lg bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex flex-col justify-center">
                    <span className="text-[10px] text-neutral-400">
                      Configured Compensation ({currentEmp.salary_type})
                    </span>
                    <span className="text-xs font-mono font-bold text-ig-pink">
                      ₱{currentEmp.basic_rate.toLocaleString()} / {currentEmp.salary_type === "daily" ? "day" : "month"} • {currentEmp.payroll_frequency}
                    </span>
                  </div>
                </div>

                {/* Earning Buckets from lib/payroll-engine.ts */}
                <div className="grid grid-cols-3 gap-2">
                  {currentEmp.salary_type === "daily" ? (
                    <div>
                      <label className="block text-[10px] font-semibold text-neutral-500 mb-1">
                        Days Worked (Weekly)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={7}
                        value={workingDays}
                        onChange={(e) => setWorkingDays(Math.max(1, Number(e.target.value)))}
                        className="w-full p-2 text-xs font-mono font-bold rounded-lg border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-semibold text-neutral-500 mb-1">
                        Period Basic
                      </label>
                      <div className="p-2 text-xs font-mono font-bold rounded-lg bg-neutral-100 dark:bg-zinc-800">
                        ₱{periodBasic.toLocaleString()}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-500 mb-1">
                      Allowances (Meal/Transpo)
                    </label>
                    <input
                      type="number"
                      step={250}
                      value={allowances}
                      onChange={(e) => setAllowances(Math.max(0, Number(e.target.value)))}
                      className="w-full p-2 text-xs font-mono font-bold rounded-lg border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-500 mb-1">
                      Overtime Pay (OT)
                    </label>
                    <input
                      type="number"
                      step={100}
                      value={overtimePay}
                      onChange={(e) => setOvertimePay(Math.max(0, Number(e.target.value)))}
                      className="w-full p-2 text-xs font-mono font-bold rounded-lg border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                    />
                  </div>
                </div>

                {/* Statutory Breakdown */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-neutral-200 dark:border-zinc-800">
                  <div className="p-2 rounded-lg bg-neutral-50 dark:bg-zinc-900 text-center border border-neutral-200 dark:border-zinc-800">
                    <span className="text-[10px] text-neutral-500 block">SSS</span>
                    <span className="text-xs font-mono font-bold text-red-500">-₱{sssContribution}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 dark:bg-zinc-900 text-center border border-neutral-200 dark:border-zinc-800">
                    <span className="text-[10px] text-neutral-500 block">PhilHealth</span>
                    <span className="text-xs font-mono font-bold text-red-500">-₱{philHealthContribution}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 dark:bg-zinc-900 text-center border border-neutral-200 dark:border-zinc-800">
                    <span className="text-[10px] text-neutral-500 block">Pag-IBIG</span>
                    <span className="text-xs font-mono font-bold text-red-500">-₱{pagIbigContribution}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 dark:bg-zinc-900 text-center border border-neutral-200 dark:border-zinc-800">
                    <span className="text-[10px] text-neutral-500 block">W/Tax</span>
                    <span className="text-xs font-mono font-bold text-red-500">-₱{withholdingTax}</span>
                  </div>
                </div>

                {/* Net Summary Action */}
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/90 border border-neutral-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">
                      Computed Net Pay ({currentEmp.payroll_frequency} period):
                    </span>
                    <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                      ₱{netPay.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowPayslip(true)}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-ig-gradient text-white font-bold text-xs hover:opacity-95 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>Finalize &amp; View Payslip</span>
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Multi-Tenant Roster View */
            <div className="space-y-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>
                  Tenant RLS Active: Showing employees scoped to{" "}
                  <strong>{currentBizObj.name}</strong> (<code>{currentBizObj.code}</code>).
                </span>
              </div>

              <div className="space-y-2 max-h-[240px] overflow-y-auto">
                {bizEmployees.map((emp) => (
                  <div
                    key={emp.employee_id}
                    onClick={() => {
                      setSelectedEmpId(emp.employee_id);
                      setActiveTab("calculator");
                    }}
                    className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 hover:border-ig-pink cursor-pointer flex items-center justify-between text-xs transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-zinc-800 font-bold">
                          {emp.employee_id}
                        </span>
                        <span className="font-bold">
                          {emp.first_name} {emp.last_name}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {emp.position} • {emp.payroll_frequency}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold block">
                        ₱{emp.basic_rate.toLocaleString()} / {emp.salary_type === "daily" ? "day" : "mo"}
                      </span>
                      <span className="text-[10px] text-ig-pink font-semibold">
                        Compute Pay →
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
