"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import {
  FileText,
  Github,
  Linkedin,
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Play,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  Check,
} from "lucide-react";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";
import { Project, projectsData } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { ProjectDemoHost } from "./demos/ProjectDemoHost";
import { cloudAiStackGroups } from "@/data/skills";
import { certificatesData } from "@/data/certificates";
import {
  KEYCAP_SKILLS,
  Keycap3DSurface,
  KeycapSkill,
  getEngineeringSpecForSkill,
} from "./TechKeyboard3D";
import { ContactSection } from "./ContactSection";

interface RecruiterDossierViewProps {
  onSwitchToStudio?: () => void;
}

const HERO_STATUS_NOTES: string[] = [
  "Open to Full-Stack & Mobile Developer roles",
  "Available for 500+ Hour OJT / Software Engineering Internship",
  "Building cross-platform React Native & Supabase PostgreSQL systems",
  "4th-year BS Information Technology at De La Salle Lipa",
];

interface ArchitectureStage {
  stageNumber: string;
  layer: string;
  tech: string;
  techKey: string;
  description: string;
}

interface ProjectArchitectureSpec {
  qualityBadge: string;
  timelineBadge: string;
  cleanSubtitle: string;
  stages: ArchitectureStage[];
}

const getProjectArchitectureSpec = (
  project: Project
): ProjectArchitectureSpec => {
  const dynamicTimelineBadge = `${project.role.toUpperCase()} · ${project.year.toUpperCase()}`;

  switch (project.id) {
    case "palengkehub":
      return {
        qualityBadge: "✓ iOS & Android Tested",
        timelineBadge: dynamicTimelineBadge,
        cleanSubtitle:
          "Public-Market Price Transparency & Offline-First Pre-Ordering",
        stages: [
          {
            stageNumber: "01",
            layer: "Client",
            tech: "React Native (Expo)",
            techKey: "React Native",
            description:
              "Cross-platform mobile client with gesture navigation, offline caching, and camera integration.",
          },
          {
            stageNumber: "02",
            layer: "Logic",
            tech: "TypeScript",
            techKey: "TypeScript",
            description:
              "Strict type contracts across buyer, vendor, and admin transactional flows.",
          },
          {
            stageNumber: "03",
            layer: "DB & Auth",
            tech: "Supabase (PostgreSQL)",
            techKey: "Supabase",
            description:
              "ACID PostgreSQL schemas, Row-Level Security (RLS), and realtime price updates.",
          },
        ],
      };
    case "shinpay-plus":
      return {
        qualityBadge: "✓ Multi-Tenant RLS Verified",
        timelineBadge: dynamicTimelineBadge,
        cleanSubtitle:
          "Multi-Tenant Payroll & Statutory Compliance Engine",
        stages: [
          {
            stageNumber: "01",
            layer: "Frontend",
            tech: "Next.js 14 App Router",
            techKey: "Next.js",
            description:
              "Server Components, Server Actions, and responsive enterprise payroll dashboards deployed on Vercel.",
          },
          {
            stageNumber: "02",
            layer: "Logic & UI",
            tech: "TypeScript",
            techKey: "TypeScript",
            description:
              "Deterministic Philippine statutory math engine (BIR TRAIN, SSS 2025, PhilHealth 5%, Pag-IBIG).",
          },
          {
            stageNumber: "03",
            layer: "Database",
            tech: "Supabase (PostgreSQL)",
            techKey: "PostgreSQL",
            description:
              "Multi-tenant isolated PostgreSQL tables enforced by strict Row-Level Security policies.",
          },
        ],
      };
    case "itelect4-project":
      return {
        qualityBadge: "✓ Google Gemini AI Integrated",
        timelineBadge: dynamicTimelineBadge,
        cleanSubtitle:
          "AI-Powered Review & Full-Stack Microservice Platform",
        stages: [
          {
            stageNumber: "01",
            layer: "Client",
            tech: "React (Vite)",
            techKey: "React",
            description:
              "High-performance single-page application with protected JWT auth state and real-time review cards.",
          },
          {
            stageNumber: "02",
            layer: "Server & AI",
            tech: "Express + Gemini AI",
            techKey: "Express",
            description:
              "Rate-limited POST /api/ai microservice returning Zod-validated JSON evaluations from Google Gemini.",
          },
          {
            stageNumber: "03",
            layer: "Database",
            tech: "MongoDB",
            techKey: "MongoDB",
            description:
              "Document collections with indexed Mongoose ODM schemas and Bcrypt credential hashing.",
          },
        ],
      };
    case "auto-avenue-ims":
      return {
        qualityBadge: "✓ Real-Time POS Integration",
        timelineBadge: dynamicTimelineBadge,
        cleanSubtitle:
          "Automotive Inventory Management & Point-of-Sale Synchronization",
        stages: [
          {
            stageNumber: "01",
            layer: "UI Layer",
            tech: "Bootstrap UI",
            techKey: "Bootstrap",
            description:
              "Accessible inventory and checkout console built for service bay technicians and cashiers.",
          },
          {
            stageNumber: "02",
            layer: "Backend",
            tech: "PHP REST Engine",
            techKey: "PHP",
            description:
              "Automated stock reorder threshold engine and transactional Point-of-Sale synchronization.",
          },
          {
            stageNumber: "03",
            layer: "Database",
            tech: "MySQL Relational DB",
            techKey: "MySQL",
            description:
              "Normalized relational inventory schemas tracking 150+ automotive spare parts and supplier orders.",
          },
        ],
      };
    case "avms":
      return {
        qualityBadge: "✓ 99.9% SLA ITSM Framework",
        timelineBadge: dynamicTimelineBadge,
        cleanSubtitle:
          "Automated Campus Visitor Management & QR Access Control",
        stages: [
          {
            stageNumber: "01",
            layer: "Access Portal",
            tech: "Campus QR Scanner",
            techKey: "QR Access Control",
            description:
              "Visitor pre-registration, dynamic QR pass generation, and automated host check-in alerts.",
          },
          {
            stageNumber: "02",
            layer: "Security Core",
            tech: "RBAC + MFA + Encryption",
            techKey: "RBAC & MFA",
            description:
              "Role-based access control, multi-factor verification, and encrypted visitor audit trails.",
          },
          {
            stageNumber: "03",
            layer: "Operations",
            tech: "ITSM Framework (99.9% SLA)",
            techKey: "ITSM",
            description:
              "Structured incident, problem, and change management lifecycles engineered for campus security.",
          },
        ],
      };
    case "crave-cart":
    default:
      return {
        qualityBadge: "✓ Full-Stack Ordering Flow",
        timelineBadge: dynamicTimelineBadge,
        cleanSubtitle:
          "Interactive Food Kiosk Browser & Express Order Server",
        stages: [
          {
            stageNumber: "01",
            layer: "Client UI",
            tech: "Interactive Menu + Maps",
            techKey: "JavaScript",
            description:
              "Responsive food kiosk interface with dynamic cart state and embedded Google Maps branch locator.",
          },
          {
            stageNumber: "02",
            layer: "API Server",
            tech: "Node.js + Express",
            techKey: "Node.js",
            description:
              "Lightweight REST routing for order validation, receipt calculation, and customer feedback.",
          },
          {
            stageNumber: "03",
            layer: "Storage",
            tech: "Local Storage & JSON Store",
            techKey: "Local Storage",
            description:
              "Client-side cart persistence paired with server-side JSON order and feedback logging.",
          },
        ],
      };
  }
};

type StackFilterDomain = "all" | "frontend" | "mobile" | "backend" | "tools";

const STACK_FILTER_TABS: { id: StackFilterDomain; label: string }[] = [
  { id: "all", label: "All 32 Keys" },
  { id: "frontend", label: "Frontend" },
  { id: "mobile", label: "Mobile" },
  { id: "backend", label: "Backend & DB" },
  { id: "tools", label: "Tools" },
];

const matchesStackDomain = (
  skill: KeycapSkill,
  domain: StackFilterDomain
): boolean => {
  if (domain === "all") return true;
  if (domain === "frontend") {
    return (
      skill.category === "frontend" ||
      ["typescript", "javascript", "html5", "css3"].includes(skill.id)
    );
  }
  if (domain === "mobile") {
    return [
      "react-native",
      "expo",
      "react",
      "typescript",
      "supabase",
    ].includes(skill.id);
  }
  if (domain === "backend") {
    return (
      skill.category === "backend" ||
      ["sql", "php", "typescript"].includes(skill.id)
    );
  }
  if (domain === "tools") {
    return skill.category === "tools" || skill.category === "macro";
  }
  return true;
};

const SHORT_PROJECT_NAMES: Record<string, string> = {
  palengkehub: "PalengkeHub",
  "shinpay-plus": "ShinPay+",
  "itelect4-project": "IT Elective 4",
  "auto-avenue-ims": "Auto Avenue",
  avms: "AVMS",
  "crave-cart": "Crave Cart",
};

/**
 * Live Coded PalengkeHub HTML/CSS UI Fragment
 * Preserves the exact Lipa City Public Market interface and stall price comparisons
 * inside a bounded mobile device stage, with a 1-click switch to the full multi-tab sandbox.
 */
const PalengkeHubLiveStage: React.FC<{
  onLaunchFullSandbox: () => void;
}> = ({ onLaunchFullSandbox }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [reservedItems, setReservedItems] = useState<Record<string, boolean>>({
    "bangus-deal": false,
  });
  const [activePriceItem, setActivePriceItem] = useState<
    "bangus" | "kamatis" | "liempo" | "bigas"
  >("bangus");

  const toggleReserve = (key: string) => {
    setReservedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "Isda & Seafood") {
      setActivePriceItem("bangus");
    } else if (cat === "Gulay") {
      setActivePriceItem("kamatis");
    } else if (cat === "Karne") {
      setActivePriceItem("liempo");
    } else if (cat === "Bigas") {
      setActivePriceItem("bigas");
    }
  };

  const handleCommoditySelect = (id: "bangus" | "kamatis" | "liempo" | "bigas") => {
    setActivePriceItem(id);
    if (id === "bangus") setSelectedCategory("Isda & Seafood");
    else if (id === "kamatis") setSelectedCategory("Gulay");
    else if (id === "liempo") setSelectedCategory("Karne");
    else if (id === "bigas") setSelectedCategory("Bigas");
  };

  const FEATURED_DEALS: Record<
    "bangus" | "kamatis" | "liempo" | "bigas",
    {
      title: string;
      stall: string;
      dealPrice: string;
      origPrice: string;
      discount: string;
      stockNote: string;
      reserveKey: string;
    }
  > = {
    bangus: {
      title: "Bangus (Dagupan Medium)",
      stall: "Aling Nena's Fresh Catch · Stall A-04",
      dealPrice: "₱180/kg",
      origPrice: "₱200/kg",
      discount: "May Diskwento · 10% OFF",
      stockNote: "18 kg stock · Pickup 5:00 AM–6:30 PM",
      reserveKey: "bangus-deal",
    },
    kamatis: {
      title: "Kamatis Tagalog (Fresh Harvest)",
      stall: "Ate Lorna Gulayan · Stall B-12",
      dealPrice: "₱60/kg",
      origPrice: "₱75/kg",
      discount: "Sariwang Ani · 20% OFF",
      stockNote: "25 kg stock · Morning Harvest",
      reserveKey: "kamatis-deal",
    },
    liempo: {
      title: "Pork Liempo (Fresh Cut)",
      stall: "Kuya Bong Meat Shop · Stall C-02",
      dealPrice: "₱340/kg",
      origPrice: "₱360/kg",
      discount: "Batangas Native · 5% OFF",
      stockNote: "12 kg remaining · Batangas Local",
      reserveKey: "liempo-deal",
    },
    bigas: {
      title: "Sinandomeng Special (Bagong Ani)",
      stall: "Bigasan ni Mang Nestor · Stall D-01",
      dealPrice: "₱52/kg",
      origPrice: "₱56/kg",
      discount: "Direct Mill · 7% OFF",
      stockNote: "40 sacks on hand · Wholesale/Retail",
      reserveKey: "bigas-deal",
    },
  };

  const PRICE_COMPARISONS = {
    bangus: {
      name: "Bangus (Dagupan Medium)",
      unit: "per kg",
      stalls: [
        {
          stall: "Aling Nena's Fresh Catch",
          section: "Fish Sec · Stall A-04",
          price: "₱180",
          tag: "PINAKAMURA",
          isLowest: true,
        },
        {
          stall: "Mang Tonyo Dagupan Seafood",
          section: "Fish Sec · Stall A-09",
          price: "₱195",
          tag: "+₱15 vs lowest",
          isLowest: false,
        },
        {
          stall: "Batangas Bay Catch",
          section: "Fish Sec · Stall A-12",
          price: "₱200",
          tag: "Avg Market Price",
          isLowest: false,
        },
      ],
    },
    kamatis: {
      name: "Kamatis Tagalog (Fresh Harvest)",
      unit: "per kg",
      stalls: [
        {
          stall: "Ate Lorna Gulayan",
          section: "Produce · Stall B-12",
          price: "₱60",
          tag: "PINAKAMURA",
          isLowest: true,
        },
        {
          stall: "Highland Farm Produce",
          section: "Produce · Stall B-03",
          price: "₱68",
          tag: "+₱8 vs lowest",
          isLowest: false,
        },
        {
          stall: "Lipa Verde Stall",
          section: "Produce · Stall B-18",
          price: "₱75",
          tag: "Avg Market Price",
          isLowest: false,
        },
      ],
    },
    liempo: {
      name: "Pork Liempo (Fresh Cut)",
      unit: "per kg",
      stalls: [
        {
          stall: "Kuya Bong Meat Shop",
          section: "Meat Sec · Stall C-02",
          price: "₱340",
          tag: "PINAKAMURA",
          isLowest: true,
        },
        {
          stall: "Batangas Livestock Stall",
          section: "Meat Sec · Stall C-08",
          price: "₱355",
          tag: "+₱15 vs lowest",
          isLowest: false,
        },
        {
          stall: "San Sebastian Prime Cuts",
          section: "Meat Sec · Stall C-14",
          price: "₱360",
          tag: "Avg Market Price",
          isLowest: false,
        },
      ],
    },
    bigas: {
      name: "Sinandomeng Special (Bagong Ani)",
      unit: "per kg",
      stalls: [
        {
          stall: "Bigasan ni Mang Nestor",
          section: "Grains · Stall D-01",
          price: "₱52",
          tag: "PINAKAMURA",
          isLowest: true,
        },
        {
          stall: "Golden Grain Lipa",
          section: "Grains · Stall D-05",
          price: "₱54",
          tag: "+₱2 vs lowest",
          isLowest: false,
        },
        {
          stall: "Mindoro Rice Depot",
          section: "Grains · Stall D-11",
          price: "₱56",
          tag: "Avg Market Price",
          isLowest: false,
        },
      ],
    },
  };

  const currentDeal = FEATURED_DEALS[activePriceItem];
  const currentComparison = PRICE_COMPARISONS[activePriceItem];

  return (
    <div className="w-full max-w-[360px] mx-auto rounded-[28px] border-[4px] border-[#22242A] bg-[#0D0E11] overflow-hidden shadow-2xl">
      {/* Device Top Status Bar */}
      <div className="px-4 py-2.5 bg-[#111215] border-b border-white/[0.08] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#F4F4F6]">PalengkeHub</span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            LIPA LIVE
          </span>
        </div>
        <span className="text-[10px] text-[#9CA3AF]">
          BUKAS NGAYON · 4AM–7PM
        </span>
      </div>

      {/* Scrollable 460px Live Coded App Viewport */}
      <div className="h-[460px] overflow-y-auto p-3.5 space-y-3.5 text-left scrollbar-thin">
        {/* Welcome Banner */}
        <div className="p-3 rounded-xl bg-[#17191E] border border-white/[0.08]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#10B981]">
              Lipa City Public Market
            </span>
            <span className="text-[10px] font-mono text-[#9CA3AF]">
              8 Tables · RLS Sync
            </span>
          </div>
          <h4 className="text-sm font-semibold text-[#F4F4F6] mt-1">
            Magandang Araw, Ka-Palengke!
          </h4>
          <p className="text-xs text-[#9CA3AF] mt-0.5 leading-snug">
            Real-time stall price transparency &amp; offline-first pre-ordering across Lipa City stalls.
          </p>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-0.5 no-scrollbar">
            {["All", "Isda & Seafood", "Gulay", "Karne", "Bigas"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono whitespace-nowrap border transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981] font-semibold"
                    : "bg-[#111215] border-white/[0.08] text-[#9CA3AF] hover:text-[#F4F4F6]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Deal Card: Dynamically updates with active category / commodity */}
        <div className="p-3 rounded-xl bg-[#111215] border border-[#10B981]/35 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] font-mono text-[10px] font-semibold">
              {currentDeal.discount}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#10B981] text-[#0A0A0B] font-mono text-[10px] font-bold">
              PINAKAMURA
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-xs font-semibold text-[#F4F4F6]">
                {currentDeal.title}
              </div>
              <div className="text-xs text-[#9CA3AF]">
                {currentDeal.stall}
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-sm font-bold text-[#10B981]">{currentDeal.dealPrice}</div>
              <div className="text-[10px] text-[#9CA3AF] line-through">
                {currentDeal.origPrice}
              </div>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between gap-2 border-t border-white/[0.06]">
            <span className="text-[10px] font-mono text-[#9CA3AF]">
              {currentDeal.stockNote}
            </span>
            <button
              type="button"
              onClick={() => toggleReserve(currentDeal.reserveKey)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                reservedItems[currentDeal.reserveKey]
                  ? "bg-[#10B981] text-[#0A0A0B]"
                  : "bg-[#17191E] hover:border-[#10B981]/45 text-[#F4F4F6] border border-white/[0.12]"
              }`}
            >
              {reservedItems[currentDeal.reserveKey] ? "✓ Reserved" : "Pre-Order"}
            </button>
          </div>
        </div>

        {/* Presyo Check · Ikumpara sa Palengke (4 Commodities) */}
        <div className="p-3 rounded-xl bg-[#17191E] border border-white/[0.08] space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-xs font-semibold text-[#F4F4F6]">
                Presyo Check · Ikumpara sa Palengke
              </div>
              <div className="text-[10px] font-mono text-[#9CA3AF]">
                Compare live stall prices across 4 commodities
              </div>
            </div>
          </div>

          {/* 4 Commodity Switcher Pills */}
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "bangus", label: "Bangus · ₱180" },
              { id: "kamatis", label: "Kamatis Tagalog · ₱60" },
              { id: "liempo", label: "Pork Liempo · ₱340" },
              { id: "bigas", label: "Sinandomeng Special · ₱52" },
            ].map((item) => {
              const active = activePriceItem === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleCommoditySelect(
                      item.id as "bangus" | "kamatis" | "liempo" | "bigas"
                    )
                  }
                  className={`px-2 py-1.5 rounded-lg text-xs font-mono text-left truncate border transition-colors ${
                    active
                      ? "bg-[#111215] border-[#10B981]/50 text-[#F4F4F6] font-semibold"
                      : "bg-[#111215]/60 border-white/[0.06] text-[#9CA3AF] hover:text-[#F4F4F6]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Stall Comparison List for Active Commodity */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF]">
              <span>{currentComparison.name}</span>
              <span>{currentComparison.unit}</span>
            </div>

            {currentComparison.stalls.map((s) => (
              <div
                key={s.stall}
                className={`p-2 rounded-lg border flex items-center justify-between gap-2 ${
                  s.isLowest
                    ? "bg-[#111215] border-[#10B981]/40"
                    : "bg-[#111215]/60 border-white/[0.06]"
                }`}
              >
                <div className="min-w-0">
                  <div className="text-xs font-medium text-[#F4F4F6] truncate">
                    {s.stall}
                  </div>
                  <div className="text-[10px] font-mono text-[#9CA3AF]">
                    {s.section}
                  </div>
                </div>
                <div className="text-right shrink-0 font-mono">
                  <div
                    className={`text-xs font-bold ${
                      s.isLowest ? "text-[#10B981]" : "text-[#F4F4F6]"
                    }`}
                  >
                    {s.price}
                  </div>
                  <div
                    className={`text-[10px] ${
                      s.isLowest
                        ? "text-[#10B981] font-semibold"
                        : "text-[#9CA3AF]"
                    }`}
                  >
                    {s.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Device Action Bar */}
      <div className="px-3.5 py-2.5 bg-[#111215] border-t border-white/[0.08] flex items-center justify-between gap-2">
        <span className="text-xs font-mono text-[#9CA3AF]">
          Interactive UI Preview
        </span>
        <button
          type="button"
          onClick={onLaunchFullSandbox}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#17191E] hover:border-[#10B981]/45 text-[#F4F4F6] border border-white/[0.12] text-xs font-mono font-medium transition-colors"
        >
          <Play className="w-3 h-3 text-[#10B981] fill-current" />
          <span>Full Sandbox</span>
        </button>
      </div>
    </div>
  );
};

export const RecruiterDossierView: React.FC<RecruiterDossierViewProps> = ({
  onSwitchToStudio,
}) => {
  // Hero cycling status thought
  const [statusIndex, setStatusIndex] = useState<number>(0);

  // Selected project in Section 3 (All 6 portfolio projects preserved: 1/6 through 6/6)
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [selectedProjectForModal, setSelectedProjectForModal] =
    useState<Project | null>(null);
  const [showInteractiveSandboxInStage, setShowInteractiveSandboxInStage] =
    useState<boolean>(false);

  // Section 4 SHIN-28 Keyboard & Credentials Ledger state
  const [stackFilter, setStackFilter] = useState<StackFilterDomain>("all");
  const [selectedSkill, setSelectedSkill] = useState<KeycapSkill>(
    KEYCAP_SKILLS.find((s) => s.id === "react") || KEYCAP_SKILLS[0]
  );
  const [credentialFilter, setCredentialFilter] = useState<"recent" | "all">(
    "recent"
  );
  const visibleCredentials =
    credentialFilter === "recent"
      ? certificatesData.slice(0, 5)
      : certificatesData;

  const activeProject =
    projectsData[activeProjectIndex] || projectsData[0];
  const archSpec = getProjectArchitectureSpec(activeProject);

  const handleCycleStatus = useCallback(() => {
    setStatusIndex((prev) => (prev + 1) % HERO_STATUS_NOTES.length);
  }, []);

  const handleSelectProjectByIndex = useCallback((idx: number) => {
    setActiveProjectIndex(idx);
    setShowInteractiveSandboxInStage(false);
  }, []);

  const handleSelectProjectById = useCallback((projectId: string) => {
    const foundIdx = projectsData.findIndex((p) => p.id === projectId);
    if (foundIdx !== -1) {
      setActiveProjectIndex(foundIdx);
      setShowInteractiveSandboxInStage(false);
    }
    const workEl = document.getElementById("work");
    if (workEl) {
      workEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const activeKeySpec = getEngineeringSpecForSkill(selectedSkill);

  // Group 32 skill keys into 4 physical rows (8 keys per row)
  const skillKeysOnly = KEYCAP_SKILLS.filter((s) => s.category !== "macro");
  const keyboardRows = [0, 1, 2, 3].map((rowIdx) =>
    skillKeysOnly.slice(rowIdx * 8, (rowIdx + 1) * 8)
  );

  return (
    <div className="min-h-screen w-full bg-[#0A0A0B] text-[#F4F4F6] font-sans selection:bg-[#10B981]/20 selection:text-[#10B981]">
      {/* =====================================================================
          SECTION 1: FIXED TOP NAVIGATION BAR (<header>)
         ===================================================================== */}
      <header className="sticky top-0 z-50 h-[60px] w-full bg-[#0A0A0B]/82 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto h-full px-6 md:px-10 flex items-center justify-between gap-4">
          {/* Left: shin.dev wordmark + Lipa City, PH (GMT+8) monospace badge */}
          <div className="flex items-center gap-3 min-w-0">
            <a
              href="#"
              className="text-base font-semibold tracking-[-0.025em] text-[#F4F4F6] hover:text-white transition-colors font-mono"
            >
              shin.dev
            </a>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-[#111215] border border-white/[0.08] font-mono text-xs tracking-[0.05em] text-[#9CA3AF]">
              Lipa City, PH (GMT+8)
            </span>
          </div>

          {/* Center/Right: Clean anchor links, external icon links, and Resume CTA */}
          <div className="flex items-center gap-1 sm:gap-5">
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center gap-6 text-xs font-mono tracking-[0.05em] text-[#9CA3AF]"
            >
              <a
                href="#work"
                className="hover:text-[#F4F4F6] transition-colors"
              >
                Work
              </a>
              <a
                href="#architecture"
                className="hover:text-[#F4F4F6] transition-colors"
              >
                Architecture
              </a>
              <a
                href="#stack"
                className="hover:text-[#F4F4F6] transition-colors"
              >
                Stack
              </a>
              <a
                href="#contact"
                className="hover:text-[#F4F4F6] transition-colors"
              >
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-2">
              {onSwitchToStudio && (
                <button
                  type="button"
                  onClick={onSwitchToStudio}
                  title="Switch to Interactive Instagram Feed Mode (?view=studio)"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111215] hover:bg-[#17191E] hover:border-[#10B981]/45 text-[#9CA3AF] hover:text-[#F4F4F6] border border-white/[0.08] font-mono text-xs transition-colors"
                >
                  <span>Social View</span>
                </button>
              )}

              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#F4F4F6] hover:bg-[#111215] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#F4F4F6] hover:bg-[#111215] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={profileData.socials.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4F4F6] hover:bg-white text-[#0A0A0B] font-medium text-xs transition-all active:scale-95"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Unified Centered 1200px Container (padding-inline: 24px on mobile 390px, 40px on tablet/desktop) */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* =====================================================================
            SECTION 2: HERO SECTION (First Screen — copy.md §2 Compliant)
           ===================================================================== */}
        <section className="py-16 lg:py-24">
          {/* Top Status Pill with Pulsing #10B981 Emerald Dot & Optional Thought Cycler */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleCycleStatus}
              title="Click to cycle status note"
              className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#111215] border border-white/[0.08] hover:border-[#10B981]/45 text-xs font-mono tracking-[0.03em] text-[#F4F4F6] transition-colors text-left"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
              <span>{HERO_STATUS_NOTES[statusIndex]}</span>
              <RotateCw className="w-3 h-3 text-[#9CA3AF] group-hover:text-[#10B981] transition-colors shrink-0 ml-0.5" />
            </button>
          </div>

          {/* Clean Identity Avatar + Headline (<h1>) */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-white/[0.14] bg-[#111215] shrink-0">
              <Image
                src={profilePic}
                alt={profileData.name}
                fill
                priority
                sizes="64px"
                className="object-cover"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[#F4F4F6] leading-[1.08]">
              Richard Allen Liman
            </h1>
          </div>

          {/* Supporting Sentence (32px / mt-8 directly below <h1>) */}
          <p className="mt-8 max-w-3xl text-base sm:text-lg lg:text-xl text-[#9CA3AF] leading-[1.6] font-normal">
            Full-Stack &amp; Mobile Developer specializing in cross-platform React
            Native applications and scalable PostgreSQL backends. 4th-year
            BSIT at De La Salle Lipa.
          </p>

          {/* Primary Action Row (32px / mt-8 below supporting sentence) */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F4F4F6] hover:bg-white text-[#0A0A0B] font-medium text-sm transition-all active:scale-95"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href={profileData.socials.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111215] hover:bg-[#17191E] hover:border-[#10B981]/45 text-[#F4F4F6] border border-white/[0.08] font-medium text-sm transition-all active:scale-95"
            >
              <span>Download Resume (PDF)</span>
              <ArrowUpRight className="w-4 h-4 text-[#9CA3AF]" />
            </a>
          </div>

          {/* Quick-Proof Metrics Row (Bottom of Hero) */}
          <div className="mt-12 pt-8 border-t border-white/[0.08] grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                spec: "React Native & Expo",
                sub: "Offline-First Mobile Clients",
              },
              {
                spec: "TypeScript Strict",
                sub: "End-to-End Type Contracts",
              },
              {
                spec: "Supabase & PostgreSQL",
                sub: "8+ Normalized RLS Tables",
              },
              {
                spec: "32-Key Interactive Stack",
                sub: "SHIN-32 Hardware Matrix",
              },
            ].map((pill) => (
              <div
                key={pill.spec}
                className="px-4 py-3 rounded-xl bg-[#111215] border border-white/[0.08] border-t-white/[0.14] flex flex-col justify-between"
              >
                <span className="font-mono text-xs font-semibold tracking-[0.05em] text-[#F4F4F6]">
                  {pill.spec}
                </span>
                <span className="text-xs text-[#9CA3AF] mt-1">{pill.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            SECTION 3: SELECTED WORK SHOWCASE (#work — 2-Column Split Studio Card)
           ===================================================================== */}
        <section
          id="work"
          className="py-16 border-t border-white/[0.08] scroll-mt-16"
        >
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="font-mono text-xs tracking-[0.05em] text-[#10B981] uppercase">
                01 // SELECTED ENGINEERING WORK
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#F4F4F6] mt-2">
                Production Systems &amp; Case Studies
              </h2>
            </div>

            {/* Slide Counter + Prev/Next Controls */}
            <div className="flex items-center gap-2 self-start lg:self-auto">
              <span className="font-mono text-xs tracking-[0.05em] text-[#9CA3AF] mr-2">
                {activeProjectIndex + 1} / {projectsData.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  handleSelectProjectByIndex(
                    (activeProjectIndex - 1 + projectsData.length) %
                      projectsData.length
                  )
                }
                aria-label="Previous project"
                className="p-2 rounded-lg bg-[#111215] hover:bg-[#17191E] hover:border-[#10B981]/45 border border-white/[0.08] text-[#F4F4F6] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSelectProjectByIndex(
                    (activeProjectIndex + 1) % projectsData.length
                  )
                }
                aria-label="Next project"
                className="p-2 rounded-lg bg-[#111215] hover:bg-[#17191E] hover:border-[#10B981]/45 border border-white/[0.08] text-[#F4F4F6] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Executive Bento Quick-Scan Grid (All 6 Systems Visible in 5 Seconds) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {projectsData.map((proj, idx) => {
              const isSelected = idx === activeProjectIndex;
              const numLabel = `0${idx + 1}`;
              const shortTitle = SHORT_PROJECT_NAMES[proj.id] || proj.title;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => {
                    handleSelectProjectByIndex(idx);
                    const showcaseEl = document.getElementById("project-showcase-stage");
                    if (showcaseEl) {
                      showcaseEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    }
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2.5 group cursor-pointer ${
                    isSelected
                      ? "bg-[#17191E] border-[#10B981]/60 shadow-lg ring-1 ring-[#10B981]/30"
                      : "bg-[#111215] border-white/[0.08] hover:bg-[#15171D] hover:border-white/[0.18]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-xs font-semibold text-[#10B981] shrink-0">
                        {numLabel}
                      </span>
                      <span className="text-sm font-semibold text-[#F4F4F6] group-hover:text-white transition-colors truncate">
                        {shortTitle}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-white/[0.06] text-[#9CA3AF] shrink-0">
                      {proj.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed">
                    {proj.subtitle}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/[0.06] text-xs font-mono text-[#9CA3AF]">
                    <span className="truncate max-w-[170px]">{proj.technologies.slice(0, 2).join(" · ")}</span>
                    <span className={`inline-flex items-center gap-1 shrink-0 ${isSelected ? "text-[#10B981] font-medium" : "text-[#9CA3AF] group-hover:text-[#F4F4F6]"}`}>
                      <span>{isSelected ? "Active View" : "Inspect"}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Named Project Switcher Tabs (All 6 Portfolio Projects: 01 through 06) */}
          <div
            role="tablist"
            aria-label="Portfolio Projects"
            className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar"
          >
            {projectsData.map((proj, idx) => {
              const isSelected = idx === activeProjectIndex;
              const numLabel = `0${idx + 1}`;
              const shortTitle = SHORT_PROJECT_NAMES[proj.id] || proj.title;
              return (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectProjectByIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl font-mono text-xs tracking-[0.05em] whitespace-nowrap border transition-all ${
                    isSelected
                      ? "bg-[#17191E] text-[#F4F4F6] border-[#10B981]/50 font-semibold shadow-sm"
                      : "bg-[#111215] text-[#9CA3AF] border-white/[0.08] hover:text-[#F4F4F6] hover:border-white/[0.16]"
                  }`}
                >
                  <span className="text-[#10B981] mr-1.5">{numLabel}</span>
                  <span>{shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* 2-Column Split Studio Showcase Card */}
          <div
            id="project-showcase-stage"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-10 rounded-2xl bg-[#111215] border border-white/[0.08] border-t-white/[0.14]"
          >
            {/* Left Column (lg:col-span-5) — Bounded Interactive Product Stage */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {activeProject.id === "palengkehub" &&
              !showInteractiveSandboxInStage ? (
                <PalengkeHubLiveStage
                  onLaunchFullSandbox={() =>
                    setShowInteractiveSandboxInStage(true)
                  }
                />
              ) : (
                <div className="w-full flex flex-col gap-2">
                  {activeProject.id === "palengkehub" && (
                    <div className="flex items-center justify-between px-1">
                      <button
                        type="button"
                        onClick={() => setShowInteractiveSandboxInStage(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#10B981] hover:underline"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Return to Lipa Market View</span>
                      </button>
                      <span className="text-xs font-mono text-[#9CA3AF]">
                        Multi-Tab Sandbox
                      </span>
                    </div>
                  )}
                  <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
                    <ProjectDemoHost projectId={activeProject.id} />
                  </div>
                </div>
              )}

              {/* Stage Caption & Fullscreen Modal Launcher */}
              <div className="flex items-center justify-between gap-3 px-1">
                <span className="font-mono text-xs text-[#9CA3AF] tracking-[0.05em]">
                  STAGE {activeProjectIndex + 1} / {projectsData.length} · LIVE
                  CODED ARTIFACT
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProjectForModal(activeProject)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#10B981] hover:underline"
                >
                  <span>Expand Fullscreen</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column (lg:col-span-7) — Full Engineering Case Study & Exposed Architecture */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Top Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs tracking-[0.05em] text-[#9CA3AF] uppercase">
                    {archSpec.timelineBadge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#10B981]/10 border border-[#10B981]/30 font-mono text-xs font-medium text-[#10B981]">
                    {archSpec.qualityBadge}
                  </span>
                </div>

                {/* Project Title (<h3>) & Clean Subtitle (Zero inline handles or em-dashes) */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#F4F4F6]">
                    {activeProject.title}
                  </h3>
                  <p className="text-base sm:text-lg text-[#9CA3AF] mt-1 font-normal">
                    {archSpec.cleanSubtitle}
                  </p>
                </div>

                {/* Full Un-truncated Engineering Summary */}
                <p className="text-sm sm:text-base text-[#F4F4F6]/90 leading-[1.6]">
                  {activeProject.description}
                </p>

                {/* Key Engineering Features List */}
                {activeProject.keyFeatures &&
                  activeProject.keyFeatures.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {activeProject.keyFeatures.slice(0, 4).map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-[#17191E]/70 border border-white/[0.06] text-xs text-[#9CA3AF] leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Exposed 3-Stage Architecture Pipeline Diagram (#architecture) */}
                <div
                  id="architecture"
                  className="pt-4 border-t border-white/[0.08] space-y-3 scroll-mt-20"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#10B981]" />
                      <span className="font-mono text-xs tracking-[0.05em] uppercase text-[#F4F4F6] font-semibold">
                        Architecture Pipeline
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#9CA3AF]">
                      3-Stage Verified Spec
                    </span>
                  </div>

                  {/* 3 Exposed Stage Cards (Permanent Sub-Copy, Zero Hidden Tooltips) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {archSpec.stages.map((stage) => (
                      <div
                        key={stage.stageNumber}
                        className="p-3.5 rounded-xl bg-[#17191E] border border-white/[0.08] hover:border-[#10B981]/45 transition-colors flex flex-col justify-between gap-2"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 font-mono text-xs tracking-[0.05em] text-[#9CA3AF] uppercase">
                            <span>
                              Stage {stage.stageNumber} · {stage.layer}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-[#F4F4F6] mt-1 font-mono">
                            {stage.tech}
                          </div>
                        </div>
                        <p className="text-xs text-[#9CA3AF] leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer: Tech Stack Tags + GitHub / Live Sandbox Links */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#0A0A0B] border border-white/[0.08] font-mono text-xs text-[#9CA3AF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2.5">
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#17191E] hover:border-[#10B981]/45 text-[#F4F4F6] border border-white/[0.08] text-xs font-mono font-medium transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedProjectForModal(activeProject)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4F4F6] hover:bg-white text-[#0A0A0B] text-xs font-semibold transition-all active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Full Case Study</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 4: INTERACTIVE TECH STACK (#stack — SHIN-28 Mechanical Keyboard Stage)
           ===================================================================== */}
        <section
          id="stack"
          className="py-16 border-t border-white/[0.08] scroll-mt-16"
        >
          {/* Section Header + Domain Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="font-mono text-xs tracking-[0.05em] text-[#10B981] uppercase">
                02 // INTERACTIVE TECH STACK
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#F4F4F6] mt-2">
                SHIN-32 Hardware Matrix
              </h2>
              <p className="text-sm text-[#9CA3AF] mt-1">
                Click or hover any of the 32 mechanical keycaps (or press A–Z, 1–6) to inspect its
                architectural role and production usage.
              </p>
            </div>

            {/* Domain Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {STACK_FILTER_TABS.map((tab) => {
                const active = stackFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStackFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs tracking-[0.05em] border transition-colors ${
                      active
                        ? "bg-[#17191E] text-[#F4F4F6] border-[#10B981]/50 font-semibold"
                        : "bg-[#111215] text-[#9CA3AF] border-white/[0.08] hover:text-[#F4F4F6]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Split Keyboard + Live Inspector Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left (lg:col-span-7): Interactive 32-Key SHIN-32 Dark-Chassis Keyboard */}
            <div className="lg:col-span-7 p-4 sm:p-6 rounded-2xl bg-[#111215] border border-white/[0.08] border-t-white/[0.14] shadow-2xl overflow-x-auto">
              {/* Top Anodized Chassis Bar */}
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.08] min-w-[300px]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="font-mono text-xs tracking-[0.05em] text-[#F4F4F6] font-semibold">
                    SHIN-32 · DARK CHASSIS
                  </span>
                </div>
                <span className="font-mono text-xs text-[#9CA3AF]">
                  32 SWITCHES · 4×8 ORTHOLINEAR
                </span>
              </div>

              {/* 4 Rows of 8 Keys — Scaled Responsively */}
              <div className="space-y-2 sm:space-y-2.5 min-w-[300px]">
                {keyboardRows.map((rowSkills, rIdx) => (
                  <div
                    key={rIdx}
                    className="grid grid-cols-8 gap-1.5 sm:gap-2 justify-items-center"
                  >
                    {rowSkills.map((skill) => {
                      const isDomainMatch = matchesStackDomain(
                        skill,
                        stackFilter
                      );
                      const isSelected = selectedSkill.id === skill.id;
                      return (
                        <button
                          key={skill.id}
                          type="button"
                          onClick={() => setSelectedSkill(skill)}
                          onMouseEnter={() => setSelectedSkill(skill)}
                          aria-label={`${skill.name} [${skill.keyTrigger}]`}
                          className={`group relative w-10 h-10 sm:w-11 sm:h-11 rounded-[8px] focus:outline-none transition-all duration-150 ${
                            isDomainMatch ? "opacity-100" : "opacity-25"
                          } ${
                            isSelected
                              ? "ring-2 ring-[#10B981] ring-offset-2 ring-offset-[#111215]"
                              : ""
                          }`}
                        >
                          <Keycap3DSurface
                            skill={skill}
                            isDark={true}
                            isPressed={isSelected}
                          />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Bottom Chassis Legend */}
              <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#9CA3AF] min-w-[300px]">
                <span>PBT DOUBLE-SHOT KEYCAPS</span>
                <span>ACTIVE KEY: [{selectedSkill.keyTrigger}]</span>
              </div>
            </div>

            {/* Right (lg:col-span-5): Live Key Inspector Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111215] border border-white/[0.08] border-t-white/[0.14] space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#17191E] border border-white/[0.1] font-mono text-xs text-[#10B981]">
                      [{selectedSkill.keyTrigger}]
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.05em] text-[#9CA3AF]">
                      {selectedSkill.categoryLabel}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[#F4F4F6] mt-2">
                    {selectedSkill.name}
                  </h3>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs text-[#9CA3AF]">STATUS</div>
                  <div className="text-sm font-semibold text-[#10B981] mt-0.5">
                    Production Verified
                  </div>
                </div>
              </div>

              {/* Full Engineering Usage Description */}
              <p className="text-sm text-[#9CA3AF] leading-[1.6]">
                {selectedSkill.description}
              </p>

              {/* Architectural Spec Rows */}
              <div className="grid grid-cols-1 gap-2.5 pt-2 border-t border-white/[0.08] font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#17191E] border border-white/[0.06]">
                  <span className="text-[10px] uppercase tracking-[0.05em] text-[#9CA3AF] block">
                    Architectural Tier
                  </span>
                  <span className="text-[#F4F4F6] mt-0.5 block">
                    {activeKeySpec.architectureTier}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#17191E] border border-white/[0.06]">
                  <span className="text-[10px] uppercase tracking-[0.05em] text-[#9CA3AF] block">
                    Reference Implementation
                  </span>
                  <span className="text-[#F4F4F6] mt-0.5 block truncate">
                    {activeKeySpec.filePath}
                  </span>
                </div>
              </div>

              {/* Used In Project Pills (Clickable to jump to project in Section 3) */}
              <div className="pt-2 border-t border-white/[0.08]">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-[#9CA3AF] block mb-2.5">
                  Used in:
                </span>
                {selectedSkill.usedIn.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.usedIn.map((usage) => (
                      <button
                        key={usage.label}
                        type="button"
                        onClick={() => {
                          if (usage.projectId) {
                            handleSelectProjectById(usage.projectId);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#17191E] hover:border-[#10B981]/45 text-[#F4F4F6] border border-white/[0.08] font-mono text-xs transition-colors"
                      >
                        <span>{usage.label}</span>
                        {usage.projectId && (
                          <ArrowUpRight className="w-3 h-3 text-[#10B981]" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs font-mono text-[#9CA3AF]">
                    Core Development &amp; CI/CD Workflow Tooling
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Cloud, Infrastructure & Applied AI Stack Strip */}
          <div className="mt-8 pt-8 border-t border-white/[0.08] grid grid-cols-1 lg:grid-cols-2 gap-4">
            {cloudAiStackGroups.map((group) => (
              <div
                key={group.id}
                className="p-5 rounded-2xl bg-[#111215] border border-white/[0.08] border-t-white/[0.14]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs tracking-[0.05em] uppercase text-[#F4F4F6] font-semibold">
                    {group.label}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-[#9CA3AF]">
                    {group.id === "cloud-infra" ? "CLOUD & DEPLOY" : "LLM & RAG"}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-[#17191E] border border-white/[0.08] text-xs font-medium text-[#F4F4F6] leading-snug"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Verified Credentials & TESDA Course Completions Ledger */}
          <div className="mt-8 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
              <div>
                <div className="font-mono text-xs tracking-[0.05em] text-[#9CA3AF] uppercase">
                  CREDENTIAL &amp; COURSEWORK LEDGER
                </div>
                <h3 className="text-lg sm:text-xl font-semibold tracking-[-0.02em] text-[#F4F4F6] mt-1">
                  Cloud, AI &amp; Verified Credentials
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCredentialFilter("recent")}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs tracking-[0.04em] border transition-colors ${
                    credentialFilter === "recent"
                      ? "bg-[#17191E] text-[#F4F4F6] border-[#10B981]/50 font-semibold"
                      : "bg-[#111215] text-[#9CA3AF] border-white/[0.08] hover:text-[#F4F4F6]"
                  }`}
                >
                  Nov 2026 Cloud &amp; AI (5)
                </button>
                <button
                  type="button"
                  onClick={() => setCredentialFilter("all")}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs tracking-[0.04em] border transition-colors ${
                    credentialFilter === "all"
                      ? "bg-[#17191E] text-[#F4F4F6] border-[#10B981]/50 font-semibold"
                      : "bg-[#111215] text-[#9CA3AF] border-white/[0.08] hover:text-[#F4F4F6]"
                  }`}
                >
                  All Credentials ({certificatesData.length})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {visibleCredentials.map((cert, index) => {
                const isCertification = cert.credentialType === "Certification";
                const spanFullRow =
                  credentialFilter === "recent" && index === 0;

                return (
                  <article
                    key={cert.id}
                    className={`p-4 sm:p-5 rounded-2xl bg-[#111215] border border-white/[0.08] border-t-white/[0.14] flex flex-col justify-between gap-3 ${
                      spanFullRow ? "md:col-span-2" : ""
                    }`}
                  >
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3">
                        <h4 className="text-sm font-semibold text-[#F4F4F6] leading-snug min-w-0">
                          {cert.title}
                        </h4>
                        <span
                          className={`self-start flex-shrink-0 px-2.5 py-0.5 rounded-md font-mono text-[10px] uppercase tracking-[0.05em] font-semibold border ${
                            isCertification
                              ? "border-[#10B981]/45 bg-[#10B981]/10 text-[#10B981]"
                              : "border-white/[0.14] bg-[#17191E] text-[#E5E7EB]"
                          }`}
                        >
                          {cert.credentialType ?? "Credential"}
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-[#9CA3AF]">
                        <span>{cert.issuer}</span>
                        <span aria-hidden="true">·</span>
                        <span>Issued {cert.postDate}</span>
                        {cert.validThrough && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#10B981]">
                              Valid through {cert.validThrough}
                            </span>
                          </>
                        )}
                      </div>

                      <p className="mt-2.5 text-xs text-[#D1D5DB] leading-relaxed">
                        {cert.focus ?? cert.caption}
                      </p>
                    </div>

                    {(cert.credentialId || cert.verifyUrl) && (
                      <div className="pt-2.5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                        {cert.credentialId ? (
                          <span className="text-[#9CA3AF]">
                            Credential ID:{" "}
                            <span className="text-[#F4F4F6] font-semibold">
                              {cert.credentialId}
                            </span>
                          </span>
                        ) : (
                          <span />
                        )}
                        {cert.verifyUrl && (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#10B981] hover:underline font-medium"
                          >
                            <span>e-tesda.gov.ph</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 5: DIRECT INBOX CLOSING (#contact) & MINIMAL FOOTER
           ===================================================================== */}
        <section
          id="contact"
          className="py-16 border-t border-white/[0.08] scroll-mt-16"
        >
          <div className="mb-8">
            <div className="font-mono text-xs tracking-[0.05em] text-[#10B981] uppercase">
              03 // DIRECT LINE
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#F4F4F6] mt-2">
              Start a Conversation
            </h2>
          </div>

          <ContactSection hideHeader />
        </section>

        {/* Minimal Footer */}
        <footer className="py-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9CA3AF]">
          <div>
            Richard Allen Liman · De La Salle Lipa · Lipa City, PH
          </div>
          <div className="flex items-center gap-5">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F4F6] transition-colors"
            >
              GitHub
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F4F6] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profileData.socials.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F4F6] transition-colors"
            >
              Resume (PDF)
            </a>
            <span>© 2026</span>
          </div>
        </footer>
      </div>

      {/* Fullscreen Case Study & Interactive Sandbox Modal */}
      <ProjectModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
      />
    </div>
  );
};
