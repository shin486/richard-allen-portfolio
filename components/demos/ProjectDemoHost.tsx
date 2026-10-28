"use client";

import React from "react";
import { PalengkeHubDemo } from "./PalengkeHubDemo";
import { ShinPayDemo } from "./ShinPayDemo";
import { ItElectDemo } from "./ItElectDemo";
import { AutoAvenueDemo } from "./AutoAvenueDemo";
import { AvmsDemo } from "./AvmsDemo";
import { CraveCartDemo } from "./CraveCartDemo";
import { Sparkles, Terminal, CheckCircle2, Play } from "lucide-react";

interface ProjectDemoHostProps {
  projectId: string;
  className?: string;
}

export const ProjectDemoHost: React.FC<ProjectDemoHostProps> = ({
  projectId,
  className = "",
}) => {
  const renderDemo = () => {
    switch (projectId) {
      case "palengkehub":
        return <PalengkeHubDemo />;
      case "shinpay-plus":
        return <ShinPayDemo />;
      case "itelect4-project":
        return <ItElectDemo />;
      case "auto-avenue-ims":
        return <AutoAvenueDemo />;
      case "avms":
        return <AvmsDemo />;
      case "crave-cart":
        return <CraveCartDemo />;
      default:
        return (
          <div className="p-8 text-center text-neutral-500">
            Interactive demo is being prepared for this project.
          </div>
        );
    }
  };

  const getRecruiterInsight = () => {
    switch (projectId) {
      case "palengkehub":
        return "Simulates the mobile consumer pre-order workflow & vendor price transparency with Supabase database schema integration.";
      case "shinpay-plus":
        return "Calculates official Philippine statutory payroll (SSS, PhilHealth, Pag-IBIG, TRAIN Tax) with multi-tenant Supabase RLS isolation.";
      case "itelect4-project":
        return "Demonstrates live Google Gemini AI prompt evaluation with Zod schema validation and JWT-authenticated REST CRUD.";
      case "auto-avenue-ims":
        return "Tests real-time POS stock deduction and triggers automated vendor purchase order alerts when thresholds drop.";
      case "avms":
        return "Generates encrypted campus QR access passes and monitors ITSM 99.9% uptime SLA and security audit logs.";
      case "crave-cart":
        return "Interactive food kiosk ordering with dynamic cart calculation, promo codes, and local receipt generation.";
      default:
        return "Interactive live sandbox for evaluating project capabilities.";
    }
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Recruiter Live Verification Pill */}
      <div className="w-full max-w-2xl mb-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-ig-purple/10 via-ig-pink/10 to-ig-orange/10 border border-ig-pink/20 flex items-center justify-between text-[11px] text-neutral-700 dark:text-zinc-300">
        <div className="flex items-center gap-1.5 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-neutral-900 dark:text-white font-bold">
            Interactive Sandbox:
          </span>
          <span className="hidden sm:inline">{getRecruiterInsight()}</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-500 uppercase flex-shrink-0 ml-2">
          Ready to Test
        </span>
      </div>

      {/* Render Selected Interactive Demo */}
      <div className="w-full animate-fade-in">{renderDemo()}</div>
    </div>
  );
};
