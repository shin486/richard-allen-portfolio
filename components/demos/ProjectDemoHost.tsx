"use client";

import React, { useState } from "react";
import { PalengkeHubDemo } from "./PalengkeHubDemo";
import { ShinPayDemo } from "./ShinPayDemo";
import { ItElectDemo } from "./ItElectDemo";
import { AutoAvenueDemo } from "./AutoAvenueDemo";
import { AvmsDemo } from "./AvmsDemo";
import { CraveCartDemo } from "./CraveCartDemo";
import { Code2, Play, ExternalLink } from "lucide-react";

interface ProjectDemoHostProps {
  projectId: string;
  className?: string;
}

const REAL_CODE_SNIPPETS: Record<
  string,
  { filePath: string; repoUrl?: string; language: string; code: string }
> = {
  palengkehub: {
    filePath: "PalengkeHubFinal / seed-uat-transactions.sql & App.js",
    repoUrl: "https://github.com/shin486/PalengkeHubFinal",
    language: "sql",
    code: `-- PalengkeHub Supabase Product & Price Enforcement Schema
insert into public.products (stall_id, name, description, price, unit, category, is_available, stock_quantity)
select s.id, v.name, v.description, v.price, 'kg', v.category, true, v.stock
from public.stalls s
join (
  values
    ('UAT-01', 'Dinorado Rice',     'Premium local dinorado rice',  58.00, 'Rice',       80),
    ('UAT-02', 'Carabao Mango',     'Sweet carabao mangoes',       120.00, 'Fruits',     50),
    ('UAT-03', 'Kangkong',          'Fresh water spinach',          25.00, 'Vegetables', 70),
    ('UAT-04', 'Pork Liempo',       'Fresh pork belly',            280.00, 'Meat',       40),
    ('UAT-06', 'Bangus',            'Fresh milkfish',              180.00, 'Seafood',    45),
    ('UAT-07', 'Kamatis',           'Fresh tomatoes',               60.00, 'Vegetables', 55)
) as v(stall_number, name, description, price, category, stock)
  on s.stall_number = v.stall_number;

-- BEFORE INSERT trigger enforce_order_item_prices recomputes each item's
-- price from products.price using unit multiplier (kg=1.00, piece=0.25)
-- and requires subtotal = total_amount = sum(price * qty) exactly.`,
  },
  "shinpay-plus": {
    filePath: "RA Payroll System / lib/payroll-engine.ts & lib/seed-data.ts",
    repoUrl: "https://github.com/shin486/ShinPay-",
    language: "typescript",
    code: `// ShinPay+ Payroll Calculation Engine (lib/payroll-engine.ts)
const YEARLY_PERIODS: Record<string, number> = {
  monthly: 12,
  'semi-monthly': 24,
  'bi-weekly': 26,
  weekly: 52,
};

const STATUTORY_NAMES = ['sss', 'philhealth', 'pag-ibig', 'withholding tax'];

export function earningBucket(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('basic')) return 'basic';
  if (n.includes('overtim') || n.includes('ot')) return 'overtime';
  if (n.includes('bonus')) return 'bonuses';
  if (n.includes('allow') || n.includes('meal') || n.includes('transpo')) return 'allowances';
  return 'other_earnings';
}

export const SAMPLE_BUSINESSES = [
  { name: "R'S Place Water Refilling Station", code: 'RSPLACE' },
  { name: 'AutoAvenue Car Care Center', code: 'AUTOCARE' },
  { name: 'DVL Pharmacy', code: 'DVLPH' },
  { name: 'Auto Avenue Automotive Parts Store', code: 'AUTOPARTS' },
  { name: "RA's Shuttle Services", code: 'RASHUTTLE' },
];`,
  },
  "itelect4-project": {
    filePath: "itelect4-backend / src/ai/gemini.ts & src/schemas/review.ts",
    repoUrl: "https://github.com/shin486/itelect4-project",
    language: "typescript",
    code: `// Google Gemini AI Review Endpoint with Zod Runtime Validation
export async function reviewProject(description: string): Promise<Review> {
  const response = await getClient().models.generateContent({
    model: "gemini-flash-latest",
    contents: buildContents(description),
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseJsonSchema: reviewJsonSchema,
    },
  });

  const text = response.text;
  if (!text) throw new AiReplyError("Gemini sent back no text");

  const data: unknown = JSON.parse(text);
  const result = reviewSchema.safeParse(data);
  if (!result.success) {
    throw new AiReplyError("Gemini's reply did not match the schema");
  }
  return result.data; // { summary, strengths, improvements, readiness }
}`,
  },
  "auto-avenue-ims": {
    filePath: "auto-avenue-ims / auto_avenue_db.sql & purchase_order.php",
    repoUrl: "https://github.com/shin486/auto-avenue-ims",
    language: "sql",
    code: `-- Auto Avenue IMS Schema (Products, Low-Stock Alerts & Purchase Orders)
CREATE TABLE products (
  product_id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  quantity int(11) NOT NULL DEFAULT 0,
  price decimal(10,2) NOT NULL,
  category varchar(50) DEFAULT NULL,
  min_stock_level int(11) DEFAULT 10,
  warranty_period varchar(50) DEFAULT NULL,
  warranty_terms text DEFAULT NULL,
  PRIMARY KEY (product_id)
);

INSERT INTO products (product_id, name, quantity, price, category, min_stock_level, warranty_period) VALUES
(16, 'AC Delco 41-993', 1062, 200.00, 'Chevrolet Parts PH', 10, '7 days replacement'),
(17, 'NGK BKR6E-11', 38, 180.00, 'NGK Philippines', 10, '7 days replacement'),
(18, 'LODWIG', 500, 200.00, 'Chevrolet Parts PH', 10, '1 year');`,
  },
  "crave-cart": {
    filePath: "food-ordering-system / server.js & public/js/cart.js",
    repoUrl: "https://github.com/shin486/food-ordering-system",
    language: "javascript",
    code: `// Crave Cart Express Server & Local JSON File Handling (server.js)
app.get('/api/menu', (req, res) => {
  const menu = JSON.parse(fs.readFileSync('./data/menu.json'));
  res.json(menu);
});

app.post('/api/feedback', (req, res) => {
  const feedbackData = req.body;
  const feedbackPath = './data/feedback.json';
  let feedback = fs.existsSync(feedbackPath)
    ? JSON.parse(fs.readFileSync(feedbackPath))
    : [];
  feedback.push(feedbackData);
  fs.writeFileSync(feedbackPath, JSON.stringify(feedback, null, 2));
  res.json({ success: true });
});

// Cart Calculation (public/js/cart.js)
function updateOrderSummary(items) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
}`,
  },
};

export const ProjectDemoHost: React.FC<ProjectDemoHostProps> = ({
  projectId,
  className = "",
}) => {
  const [subMode, setSubMode] = useState<"app" | "code">("app");

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
        return "Synced with real PalengkeHubFinal UAT stalls (Aling Rosa, Mang Lito, Aling Nena) & price triggers.";
      case "shinpay-plus":
        return "Synced with real ShinPay+ seed businesses (R'S Place, AutoAvenue, DVL Pharmacy, RA's Shuttle) & payroll engine.";
      case "itelect4-project":
        return "Synced with real ITELECT4 courses, Gemini Flash prompt wrapper, and Zod reviewSchema.";
      case "auto-avenue-ims":
        return "Synced with real auto_avenue_db.sql products (AC Delco 41-993, NGK BKR6E-11, LODWIG) & alerts table.";
      case "avms":
        return "Generates encrypted campus QR access passes and monitors ITSM 99.9% uptime SLA and security audit logs.";
      case "crave-cart":
        return "Synced with real Crave Cart data/menu.json, 8% tax calculation, and fs.writeFileSync feedback API.";
      default:
        return "Interactive live sandbox for evaluating project capabilities.";
    }
  };

  const codeEntry = REAL_CODE_SNIPPETS[projectId];

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Top Bar: Recruiter Insight + App vs Source Code Switcher */}
      <div className="w-full max-w-2xl mb-2 px-3 py-2 rounded-xl bg-gradient-to-r from-ig-purple/10 via-ig-pink/10 to-ig-orange/10 border border-ig-pink/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-700 dark:text-zinc-300">
        <div className="flex items-center gap-1.5 font-semibold min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          <span className="truncate">{getRecruiterInsight()}</span>
        </div>

        {codeEntry && (
          <div className="flex items-center bg-white/80 dark:bg-zinc-900/90 p-0.5 rounded-lg border border-neutral-200 dark:border-zinc-700 text-[10px] font-bold flex-shrink-0">
            <button
              onClick={() => setSubMode("app")}
              className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
                subMode === "app"
                  ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Use App</span>
            </button>
            <button
              onClick={() => setSubMode("code")}
              className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
                subMode === "code"
                  ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Real Code</span>
            </button>
          </div>
        )}
      </div>

      {/* Render either Interactive App or Real Repository Source Code */}
      {subMode === "code" && codeEntry ? (
        <div className="w-full max-w-2xl rounded-2xl bg-[#0d0d12] border border-zinc-800 shadow-xl overflow-hidden animate-fade-in my-2">
          <div className="px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-300 font-mono">
            <span className="truncate">{codeEntry.filePath}</span>
            {codeEntry.repoUrl && (
              <a
                href={codeEntry.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-ig-pink hover:underline flex items-center gap-1 flex-shrink-0 ml-2"
              >
                <span>Open Repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <pre className="p-4 text-[11px] sm:text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed max-h-[420px]">
            <code>{codeEntry.code}</code>
          </pre>
        </div>
      ) : (
        <div className="w-full animate-fade-in">{renderDemo()}</div>
      )}
    </div>
  );
};
