"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  Users,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  LayoutDashboard,
  Wallet,
  Play,
  Printer,
} from "lucide-react";

interface EmployeeSeed {
  id: string;
  businessId: string;
  fullName: string;
  position: string;
  department: string;
  employmentType: "Regular" | "Probationary";
  monthlySalary: number;
  allowances: number;
  bankName: string;
}

const BUSINESSES = [
  {
    id: "biz-1",
    name: "Shinon Labs PH",
    tin: "612-894-102-000",
    industry: "Tech & Product Studio",
    paySchedule: "Semi-Monthly (15th / 30th)",
    address: "Lipa City, Batangas",
  },
  {
    id: "biz-2",
    name: "Kape Lipa Roastery",
    tin: "409-221-884-000",
    industry: "F&B Retail & Roastery",
    paySchedule: "Semi-Monthly (15th / 30th)",
    address: "Ayala Highway, Lipa City",
  },
];

// Synced directly with ShinPay+ lib/seed-data.ts
const SEED_EMPLOYEES: EmployeeSeed[] = [
  {
    id: "emp-01",
    businessId: "biz-1",
    fullName: "Andrea Villanueva",
    position: "Senior Product Designer",
    department: "Design",
    employmentType: "Regular",
    monthlySalary: 72000,
    allowances: 4500,
    bankName: "BPI •••• 4821",
  },
  {
    id: "emp-02",
    businessId: "biz-1",
    fullName: "Marco Reyes",
    position: "Full-Stack Engineer",
    department: "Engineering",
    employmentType: "Regular",
    monthlySalary: 65000,
    allowances: 3500,
    bankName: "UnionBank •••• 9912",
  },
  {
    id: "emp-03",
    businessId: "biz-1",
    fullName: "Patricia Santos",
    position: "QA Automation Lead",
    department: "Engineering",
    employmentType: "Regular",
    monthlySalary: 48000,
    allowances: 2500,
    bankName: "BDO •••• 1104",
  },
  {
    id: "emp-04",
    businessId: "biz-1",
    fullName: "Jerome Mendoza",
    position: "People Operations Specialist",
    department: "HR & Admin",
    employmentType: "Probationary",
    monthlySalary: 32000,
    allowances: 2000,
    bankName: "GCash •••• 7731",
  },
  {
    id: "emp-05",
    businessId: "biz-2",
    fullName: "Carlo Bautista",
    position: "Head Roaster & Store Manager",
    department: "Operations",
    employmentType: "Regular",
    monthlySalary: 36000,
    allowances: 2500,
    bankName: "BPI •••• 3390",
  },
  {
    id: "emp-06",
    businessId: "biz-2",
    fullName: "Alyssa De Chavez",
    position: "Senior Barista Trainer",
    department: "Store Front",
    employmentType: "Regular",
    monthlySalary: 22000,
    allowances: 1500,
    bankName: "GCash •••• 5520",
  },
];

// Exact PH Statutory Payroll Engine from ShinPay+ lib/payroll-engine.ts
function computePhPayroll(
  monthlySalary: number,
  monthlyAllowances: number,
  daysWorked: number,
  overtimeHours: number,
  lateMinutes: number
) {
  const semiMonthlyBasic = monthlySalary / 2;
  const dailyRate = monthlySalary / 22;
  const hourlyRate = dailyRate / 8;

  const attendanceDiffDays = daysWorked - 11;
  const attendanceAdjustment = attendanceDiffDays * dailyRate;
  const basicEarned = Math.max(0, semiMonthlyBasic + attendanceAdjustment);
  const overtimePay = overtimeHours * hourlyRate * 1.25;
  const lateDeduction = (lateMinutes / 60) * hourlyRate;
  const allowancePeriod = monthlyAllowances / 2;

  const grossPay = basicEarned + overtimePay + allowancePeriod - lateDeduction;

  // 1. SSS 2025 Schedule (5% employee, 10% employer, MSC ₱5k–₱35k)
  const msc = Math.min(35000, Math.max(5000, Math.round(monthlySalary / 500) * 500));
  const sssEE = (msc * 0.05) / 2;
  const sssER = (msc * 0.1 + (msc >= 15000 ? 30 : 10)) / 2;

  // 2. PhilHealth 2025 (5% total rate split 2.5% EE / 2.5% ER, floor ₱10k, ceiling ₱100k)
  const phBase = Math.min(100000, Math.max(10000, monthlySalary));
  const philhealthEE = (phBase * 0.025) / 2;
  const philhealthER = (phBase * 0.025) / 2;

  // 3. Pag-IBIG HDMF (₱200/month max -> ₱100 per semi-monthly cutoff)
  const pagibigEE = Math.min(100, (monthlySalary * 0.02) / 2);
  const pagibigER = 100;

  // 4. BIR TRAIN Law Semi-Monthly Withholding Tax Table
  const taxableIncome = Math.max(
    0,
    basicEarned + overtimePay - lateDeduction - (sssEE + philhealthEE + pagibigEE)
  );
  let withholdingTax = 0;
  if (taxableIncome <= 10417) {
    withholdingTax = 0;
  } else if (taxableIncome <= 16666) {
    withholdingTax = (taxableIncome - 10417) * 0.15;
  } else if (taxableIncome <= 33332) {
    withholdingTax = 937.5 + (taxableIncome - 16667) * 0.2;
  } else if (taxableIncome <= 83332) {
    withholdingTax = 4270.7 + (taxableIncome - 33333) * 0.25;
  } else {
    withholdingTax = 16770.7 + (taxableIncome - 83333) * 0.3;
  }

  const totalDeductions = sssEE + philhealthEE + pagibigEE + withholdingTax;
  const netPay = Math.max(0, grossPay - totalDeductions);

  return {
    basicEarned,
    overtimePay,
    lateDeduction,
    allowancePeriod,
    grossPay,
    sssEE,
    sssER,
    philhealthEE,
    philhealthER,
    pagibigEE,
    pagibigER,
    taxableIncome,
    withholdingTax,
    totalDeductions,
    netPay,
  };
}

export default function ShinPayDemo() {
  const [activeNav, setActiveNav] = useState<"dashboard" | "employees" | "payroll" | "payslip">(
    "dashboard"
  );
  const [selectedBusinessId, setSelectedBusinessId] = useState("biz-1");
  const [selectedEmpId, setSelectedEmpId] = useState("emp-01");
  const [customSalary, setCustomSalary] = useState<number>(72000);
  const [daysWorked, setDaysWorked] = useState<number>(11);
  const [overtimeHours, setOvertimeHours] = useState<number>(4);
  const [lateMinutes, setLateMinutes] = useState<number>(0);
  const [disbursed, setDisbursed] = useState(false);

  const activeBusiness =
    BUSINESSES.find((b) => b.id === selectedBusinessId) || BUSINESSES[0];

  const businessEmployees = useMemo(
    () => SEED_EMPLOYEES.filter((e) => e.businessId === selectedBusinessId),
    [selectedBusinessId]
  );

  const selectedEmployee =
    SEED_EMPLOYEES.find((e) => e.id === selectedEmpId) || businessEmployees[0];

  const handleSelectEmployee = (emp: EmployeeSeed) => {
    setSelectedEmpId(emp.id);
    setCustomSalary(emp.monthlySalary);
    setDisbursed(false);
  };

  const handleSelectBusiness = (bizId: string) => {
    setSelectedBusinessId(bizId);
    const firstEmp = SEED_EMPLOYEES.find((e) => e.businessId === bizId);
    if (firstEmp) {
      setSelectedEmpId(firstEmp.id);
      setCustomSalary(firstEmp.monthlySalary);
    }
    setDisbursed(false);
  };

  const calc = useMemo(
    () =>
      computePhPayroll(
        customSalary,
        selectedEmployee.allowances,
        daysWorked,
        overtimeHours,
        lateMinutes
      ),
    [customSalary, selectedEmployee.allowances, daysWorked, overtimeHours, lateMinutes]
  );

  const fmt = (n: number) =>
    "₱" +
    n.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const batchRef = `PAY-PH-20261030-${selectedEmployee.id.toUpperCase()}`;

  return (
    /* Exact ShinPay+ Tactile Sage Design System from app/globals.css & Sidebar.tsx:
       --bg-primary: #fafbfa, --bg-secondary: #f4f6f4, --surface: #ffffff,
       --accent: #536c51, --accent-hover: #435641, --text-primary: #0f172a */
    <div className="w-full h-full flex bg-[#fafbfa] text-[#0f172a] font-sans select-none overflow-hidden">
      {/* Real ShinPay+ Left Sidebar (from components/Sidebar.tsx) */}
      <aside className="w-40 sm:w-48 bg-[#f4f6f4] border-r border-black/8 flex flex-col justify-between p-2.5 shrink-0">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-2 px-1.5 pb-2.5 mb-2 border-b border-black/6">
            <div className="w-7 h-7 rounded-lg bg-[#536c51] text-white font-extrabold text-[13px] flex items-center justify-center shadow-xs shrink-0">
              S
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-[13px] tracking-tight text-[#0f172a] leading-none">
                ShinPay+
              </div>
              <span className="text-[9px] font-semibold text-[#536c51]">
                PH Enterprise v2.4
              </span>
            </div>
          </div>

          {/* Entity Switcher */}
          <div className="mb-2.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#889687] px-1.5 block mb-1">
              Active Business
            </span>
            <div className="space-y-1">
              {BUSINESSES.map((biz) => {
                const active = biz.id === selectedBusinessId;
                return (
                  <button
                    key={biz.id}
                    type="button"
                    onClick={() => handleSelectBusiness(biz.id)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center gap-1.5 ${
                      active
                        ? "bg-white text-[#0f172a] shadow-2xs border border-[#536c51]/30"
                        : "text-[#475569] hover:bg-black/4"
                    }`}
                  >
                    <Building2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        active ? "text-[#536c51]" : "text-[#889687]"
                      }`}
                    />
                    <span className="truncate">{biz.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Exact NAV_GROUPS from components/Sidebar.tsx */}
          <div className="space-y-2">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#889687] px-1.5 block mb-0.5">
                Overview & People
              </span>
              {[
                { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                { id: "employees", label: "Employees", icon: Users },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveNav(item.id as typeof activeNav)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                      active
                        ? "bg-[#536c51] text-white shadow-2xs"
                        : "text-[#475569] hover:bg-black/4"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#889687] px-1.5 block mb-0.5">
                Payroll Workflow
              </span>
              {[
                { id: "payroll", label: "Payroll Runs", icon: Wallet },
                { id: "payslip", label: "BIR/DOLE Payslip", icon: FileSpreadsheet },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveNav(item.id as typeof activeNav)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                      active
                        ? "bg-[#536c51] text-white shadow-2xs"
                        : "text-[#475569] hover:bg-black/4"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom System Operational Pill from Sidebar.tsx */}
        <div className="p-2 rounded-lg bg-white border border-black/8 text-[9.5px]">
          <div className="flex items-center gap-1.5 font-bold text-[#15803d]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            PH Tax Engine 2025
          </div>
          <p className="text-[#889687] text-[9px] mt-0.5 leading-tight">
            SSS · PhilHealth 5% · HDMF · TRAIN
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Action Bar */}
        <header className="bg-white border-b border-black/8 px-3.5 py-2 flex items-center justify-between shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-[13px] font-extrabold text-[#0f172a] truncate">
                {activeBusiness.name}
              </h2>
              <span className="px-1.5 py-0.5 rounded bg-[#536c51]/12 text-[#536c51] text-[9.5px] font-bold">
                TIN: {activeBusiness.tin}
              </span>
            </div>
            <p className="text-[10px] text-[#889687] truncate">
              {activeBusiness.industry} · Cutoff: Oct 16–30, 2026
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setDisbursed(true);
              setActiveNav("payslip");
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#536c51] hover:bg-[#435641] text-white text-[10.5px] font-bold transition-colors shadow-2xs shrink-0"
          >
            <Play className="w-3 h-3 fill-white" />
            Run Payroll & View Payslip
          </button>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* DashStatCard KPI Row (with signature top linear-gradient(90deg, #536c51 0%, #4ade80 100%) from app/app/page.tsx) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {
                label: "GROSS PAYROLL",
                value: fmt(calc.grossPay),
                sub: `${daysWorked}d worked · ${overtimeHours}h OT`,
              },
              {
                label: "STATUTORY + TAX",
                value: fmt(calc.totalDeductions),
                sub: "SSS + PHIC + HDMF + BIR",
              },
              {
                label: "NET DISBURSAL",
                value: fmt(calc.netPay),
                sub: selectedEmployee.bankName,
              },
              {
                label: "EMPLOYER SHARE",
                value: fmt(calc.sssER + calc.philhealthER + calc.pagibigER),
                sub: "ER Statutory Contribution",
              },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="bg-white rounded-xl border border-black/8 overflow-hidden shadow-2xs"
              >
                <div
                  className="h-1 w-full"
                  style={{
                    background: "linear-gradient(90deg, #536c51 0%, #4ade80 100%)",
                  }}
                />
                <div className="p-2.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#889687] block">
                    {kpi.label}
                  </span>
                  <div className="text-[13px] font-extrabold font-mono text-[#0f172a] mt-0.5">
                    {kpi.value}
                  </div>
                  <span className="text-[9.5px] text-[#475569] truncate block">
                    {kpi.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* VIEW 1 & 2 & 3: Interactive Dashboard / Employees / Payroll Run Simulator */}
          {activeNav !== "payslip" ? (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              {/* Left: Employee Roster & Live Attendance/Salary Adjuster */}
              <div className="sm:col-span-5 bg-white rounded-xl border border-black/8 p-2.5 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#475569]">
                    Select Employee ({businessEmployees.length})
                  </span>
                  <span className="text-[9.5px] font-semibold text-[#536c51]">
                    Click to compute
                  </span>
                </div>

                <div className="space-y-1">
                  {businessEmployees.map((emp) => {
                    const isSelected = emp.id === selectedEmployee.id;
                    return (
                      <button
                        key={emp.id}
                        type="button"
                        onClick={() => handleSelectEmployee(emp)}
                        className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-[#536c51]/10 border-[#536c51] text-[#0f172a]"
                            : "bg-[#fafbfa] border-black/6 text-[#475569] hover:border-black/15"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-[11.5px] font-bold text-[#0f172a] truncate">
                            {emp.fullName}
                          </div>
                          <div className="text-[9.5px] text-[#889687] truncate">
                            {emp.position} · {emp.department}
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <div className="text-[11px] font-mono font-bold text-[#536c51]">
                            ₱{emp.monthlySalary.toLocaleString()}/mo
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/5 text-[#475569]">
                            {emp.employmentType}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Live Salary & Attendance Controls */}
                <div className="pt-2 border-t border-black/6 space-y-2">
                  <div>
                    <div className="flex justify-between text-[10.5px] mb-0.5">
                      <span className="font-semibold text-[#475569]">Monthly Basic Salary</span>
                      <span className="font-mono font-bold text-[#536c51]">
                        ₱{customSalary.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={18000}
                      max={120000}
                      step={1000}
                      value={customSalary}
                      onChange={(e) => setCustomSalary(Number(e.target.value))}
                      className="w-full accent-[#536c51] cursor-pointer h-1.5 bg-[#e2e8f0] rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="bg-[#fafbfa] border border-black/8 rounded-lg p-1.5">
                      <label className="text-[9px] text-[#889687] block">Days (11 std)</label>
                      <input
                        type="number"
                        min={1}
                        max={15}
                        value={daysWorked}
                        onChange={(e) => setDaysWorked(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-transparent text-[11.5px] font-mono font-bold text-[#0f172a] focus:outline-none"
                      />
                    </div>
                    <div className="bg-[#fafbfa] border border-black/8 rounded-lg p-1.5">
                      <label className="text-[9px] text-[#889687] block">OT Hours</label>
                      <input
                        type="number"
                        min={0}
                        max={40}
                        value={overtimeHours}
                        onChange={(e) => setOvertimeHours(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-transparent text-[11.5px] font-mono font-bold text-[#0f172a] focus:outline-none"
                      />
                    </div>
                    <div className="bg-[#fafbfa] border border-black/8 rounded-lg p-1.5">
                      <label className="text-[9px] text-[#889687] block">Late (mins)</label>
                      <input
                        type="number"
                        min={0}
                        max={240}
                        value={lateMinutes}
                        onChange={(e) => setLateMinutes(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-transparent text-[11.5px] font-mono font-bold text-[#0f172a] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Live Statutory Breakdown Card */}
              <div className="sm:col-span-7 bg-white rounded-xl border border-black/8 p-3 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-black/8">
                    <div>
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#536c51] block">
                        Semi-Monthly Statutory Computation
                      </span>
                      <h3 className="text-[13px] font-extrabold text-[#0f172a]">
                        {selectedEmployee.fullName} · {selectedEmployee.position}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveNav("payslip")}
                      className="text-[10.5px] font-bold text-[#536c51] hover:underline flex items-center gap-1"
                    >
                      <Printer className="w-3 h-3" /> Official Payslip
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-2.5 text-[11px]">
                    {/* Earnings Column */}
                    <div className="space-y-1.5">
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#889687] block">
                        Gross Earnings
                      </span>
                      <div className="flex justify-between">
                        <span className="text-[#475569]">Basic Pay ({daysWorked}d)</span>
                        <span className="font-mono font-semibold">{fmt(calc.basicEarned)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#475569]">De Minimis Allowance</span>
                        <span className="font-mono font-semibold">{fmt(calc.allowancePeriod)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#475569]">Overtime ({overtimeHours}h × 1.25)</span>
                        <span className="font-mono font-semibold text-[#15803d]">
                          +{fmt(calc.overtimePay)}
                        </span>
                      </div>
                      {calc.lateDeduction > 0 && (
                        <div className="flex justify-between">
                          <span className="text-[#475569]">Tardiness ({lateMinutes}m)</span>
                          <span className="font-mono font-semibold text-[#dc2626]">
                            -{fmt(calc.lateDeduction)}
                          </span>
                        </div>
                      )}
                      <div className="pt-1 border-t border-black/8 flex justify-between font-bold">
                        <span>Total Gross</span>
                        <span className="font-mono">{fmt(calc.grossPay)}</span>
                      </div>
                    </div>

                    {/* Statutory Deductions Column */}
                    <div className="space-y-1.5">
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#889687] block">
                        PH Mandatory Deductions
                      </span>
                      <div className="flex justify-between">
                        <span className="text-[#475569]">SSS (2025 MSC Table)</span>
                        <span className="font-mono text-[#dc2626]">-{fmt(calc.sssEE)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#475569]">PhilHealth (2.5% EE)</span>
                        <span className="font-mono text-[#dc2626]">-{fmt(calc.philhealthEE)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#475569]">Pag-IBIG HDMF</span>
                        <span className="font-mono text-[#dc2626]">-{fmt(calc.pagibigEE)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#475569]">BIR TRAIN Withholding</span>
                        <span className="font-mono text-[#dc2626]">
                          -{fmt(calc.withholdingTax)}
                        </span>
                      </div>
                      <div className="pt-1 border-t border-black/8 flex justify-between font-bold text-[#dc2626]">
                        <span>Total Deductions</span>
                        <span className="font-mono">-{fmt(calc.totalDeductions)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Take-Home Pay Banner */}
                <div className="mt-3 pt-2.5 border-t border-black/8 flex items-center justify-between bg-[#f4f6f4] rounded-xl p-2.5">
                  <div>
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#536c51] block">
                      Net Disbursal Amount ({selectedEmployee.bankName})
                    </span>
                    <span className="text-[16px] font-mono font-extrabold text-[#0f172a]">
                      {fmt(calc.netPay)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDisbursed(true);
                      setActiveNav("payslip");
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#536c51] hover:bg-[#435641] text-white text-[11px] font-bold transition-colors"
                  >
                    Generate Official Payslip →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW 4: Exact Official BIR / DOLE Payslip Component (from components/Payslip.tsx) */
            <div className="bg-white rounded-xl border-2 border-[#0f172a] p-3.5 space-y-3 shadow-xs">
              <div className="flex items-start justify-between border-b-2 border-[#0f172a] pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#536c51] text-white text-[9.5px] font-extrabold uppercase tracking-wider">
                      Official BIR / DOLE Compliant Payslip
                    </span>
                    {disbursed && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#15803d]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Disbursed
                      </span>
                    )}
                  </div>
                  <h3 className="text-[14px] font-extrabold text-[#0f172a] mt-1">
                    {activeBusiness.name}
                  </h3>
                  <p className="text-[10px] text-[#475569]">
                    TIN: {activeBusiness.tin} · {activeBusiness.address}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[9.5px] text-[#889687] block">Batch Reference</span>
                  <span className="font-mono text-[11px] font-bold text-[#0f172a]">
                    {batchRef}
                  </span>
                  <span className="text-[10px] text-[#536c51] font-bold block">
                    Period: Oct 16 – Oct 30, 2026
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-[#f4f6f4] p-2 rounded-lg text-[10.5px]">
                <div>
                  <span className="text-[9px] text-[#889687] block">EMPLOYEE NAME</span>
                  <strong className="text-[#0f172a]">{selectedEmployee.fullName}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-[#889687] block">POSITION / DEPT</span>
                  <strong className="text-[#0f172a]">
                    {selectedEmployee.position} ({selectedEmployee.department})
                  </strong>
                </div>
                <div>
                  <span className="text-[9px] text-[#889687] block">DISBURSAL ACCOUNT</span>
                  <strong className="text-[#536c51]">{selectedEmployee.bankName}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="border border-black/10 rounded-lg p-2">
                  <div className="font-extrabold text-[10px] uppercase text-[#536c51] border-b border-black/8 pb-1 mb-1">
                    Earnings
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>Basic Pay ({daysWorked} days)</span>
                    <span className="font-mono">{fmt(calc.basicEarned)}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>Allowances (Non-Taxable)</span>
                    <span className="font-mono">{fmt(calc.allowancePeriod)}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>Overtime Pay ({overtimeHours} hrs)</span>
                    <span className="font-mono">{fmt(calc.overtimePay)}</span>
                  </div>
                  <div className="flex justify-between pt-1 mt-1 border-t border-black/10 font-extrabold">
                    <span>GROSS PAY</span>
                    <span className="font-mono">{fmt(calc.grossPay)}</span>
                  </div>
                </div>

                <div className="border border-black/10 rounded-lg p-2">
                  <div className="font-extrabold text-[10px] uppercase text-[#dc2626] border-b border-black/8 pb-1 mb-1">
                    Statutory Deductions
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>SSS Employee Share</span>
                    <span className="font-mono">-{fmt(calc.sssEE)}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>PhilHealth (5% Rate Split)</span>
                    <span className="font-mono">-{fmt(calc.philhealthEE)}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>Pag-IBIG Fund (HDMF)</span>
                    <span className="font-mono">-{fmt(calc.pagibigEE)}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>BIR Withholding Tax (TRAIN)</span>
                    <span className="font-mono">-{fmt(calc.withholdingTax)}</span>
                  </div>
                  <div className="flex justify-between pt-1 mt-1 border-t border-black/10 font-extrabold text-[#dc2626]">
                    <span>TOTAL DEDUCTIONS</span>
                    <span className="font-mono">-{fmt(calc.totalDeductions)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#536c51] text-white rounded-xl p-2.5 flex items-center justify-between">
                <div>
                  <span className="text-[9.5px] uppercase tracking-wider font-bold text-white/80 block">
                    NET PAY (CREDITED VIA {selectedEmployee.bankName})
                  </span>
                  <span className="text-[16px] font-mono font-extrabold">{fmt(calc.netPay)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNav("dashboard")}
                  className="px-2.5 py-1 rounded-lg bg-white text-[#0f172a] text-[10.5px] font-bold hover:bg-white/90"
                >
                  ← Back to Payroll Run
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
