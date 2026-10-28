"use client";

import React, { useState } from "react";
import {
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Building,
  UserCheck,
  Activity,
  KeyRound,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export const AvmsDemo: React.FC = () => {
  const [visitorName, setVisitorName] = useState("Sarah Jenkins");
  const [affiliation, setAffiliation] = useState("Tech Talent Acquisition");
  const [hostDept, setHostDept] = useState("CITE Department");
  const [tier, setTier] = useState<"Guest" | "Contractor" | "VIP Recruiter">("VIP Recruiter");
  const [passGenerated, setPassGenerated] = useState(true);
  const [passId, setPassId] = useState("AVMS-DLSL-8491");
  const [activeTab, setActiveTab] = useState<"pass" | "itsm">("pass");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) return;
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setPassId(`AVMS-DLSL-${randomCode}`);
    setPassGenerated(true);
    setActiveTab("pass");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 text-zinc-900 dark:text-zinc-100 select-none">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111116] rounded-2xl border border-neutral-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-800 dark:text-zinc-200 block leading-tight">
                Automated Visitor Management System (AVMS)
              </span>
              <span className="text-[10px] text-neutral-500">
                De La Salle Lipa Campus Security • ITSM Compliant
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SLA: 99.9% Uptime</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-neutral-200 dark:border-zinc-800 text-xs font-semibold bg-neutral-50 dark:bg-zinc-900/50">
          <button
            onClick={() => setActiveTab("pass")}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "pass"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-zinc-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital QR Gate Pass</span>
          </button>
          <button
            onClick={() => setActiveTab("itsm")}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "itsm"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-zinc-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>ITSM Operations &amp; Audit Logs</span>
          </button>
        </div>

        {/* Viewport Content */}
        <div className="p-4 sm:p-5 flex-1 min-h-[360px] flex flex-col justify-between">
          {activeTab === "pass" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Form Input */}
              <form onSubmit={handleGenerate} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                    Visitor Full Name
                  </label>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full p-2 text-xs font-semibold rounded-lg border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                    Organization / Affiliation
                  </label>
                  <input
                    type="text"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    className="w-full p-2 text-xs font-semibold rounded-lg border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                      Host Department
                    </label>
                    <select
                      value={hostDept}
                      onChange={(e) => setHostDept(e.target.value)}
                      className="w-full p-2 text-xs font-semibold rounded-lg border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none"
                    >
                      <option>CITE Department</option>
                      <option>Dean's Office</option>
                      <option>Registrar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                      Access Tier
                    </label>
                    <select
                      value={tier}
                      onChange={(e) => setTier(e.target.value as any)}
                      className="w-full p-2 text-xs font-semibold rounded-lg border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none"
                    >
                      <option>VIP Recruiter</option>
                      <option>Guest</option>
                      <option>Contractor</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Issue Encrypted Campus Pass</span>
                </button>
              </form>

              {/* Digital Pass Card */}
              {passGenerated && (
                <div className="p-4 rounded-2xl bg-neutral-900 text-white border-2 border-emerald-500/40 shadow-xl flex flex-col justify-between relative overflow-hidden animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
                        DE LA SALLE LIPA • SECURE ACCESS
                      </span>
                      <p className="text-xs font-bold">{visitorName}</p>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                      {tier}
                    </span>
                  </div>

                  {/* QR Code Mockup */}
                  <div className="my-3 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-xl p-2 flex flex-col items-center justify-center shadow-md">
                      <QrCode className="w-full h-full text-black stroke-[1.5]" />
                    </div>
                  </div>

                  <div className="space-y-1 text-[10px] text-zinc-300 pt-2 border-t border-white/10">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Pass Code:</span>
                      <span className="font-mono font-bold text-emerald-300">{passId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Host:</span>
                      <span>{hostDept}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Validity:</span>
                      <span className="text-emerald-400">Active (Until 6:00 PM Today)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ITSM SLA & Operations Log */
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800">
                  <span className="text-[10px] text-neutral-400 block">SLA Commitment</span>
                  <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
                    99.9% Uptime
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800">
                  <span className="text-[10px] text-neutral-400 block">Security Framework</span>
                  <span className="text-xs font-bold text-neutral-800 dark:text-zinc-200">
                    RBAC &amp; MFA
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800">
                  <span className="text-[10px] text-neutral-400 block">Incident Status</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    0 Critical
                  </span>
                </div>
              </div>

              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Live Audit &amp; Gate Entry Logs
                </h5>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="p-2 rounded-lg bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-emerald-600 dark:text-emerald-400">
                      [GATE 1 SCAN] {passId} — VIP Access Granted
                    </span>
                    <span className="text-neutral-400 text-[10px]">Just now</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-neutral-700 dark:text-zinc-300">
                      [SMS NOTIFY] Automated SMS sent to {hostDept} host
                    </span>
                    <span className="text-neutral-400 text-[10px]">1m ago</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-neutral-700 dark:text-zinc-300">
                      [ITSM HEALTH] Automated ping verified campus API latency (14ms)
                    </span>
                    <span className="text-neutral-400 text-[10px]">5m ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
