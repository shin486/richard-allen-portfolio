"use client";

import React, { useState } from "react";
import PalengkeHubDemo from "./PalengkeHubDemo";
import ShinPayDemo from "./ShinPayDemo";
import ItElectDemo from "./ItElectDemo";
import AutoAvenueDemo from "./AutoAvenueDemo";
import { AvmsDemo } from "./AvmsDemo";
import CraveCartDemo from "./CraveCartDemo";
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
    filePath: "PalengkeHubFinal / src/screens/customer/HomeScreen.js & tokens.js",
    repoUrl: "https://github.com/shin486/PalengkeHubFinal",
    language: "javascript",
    code: `// PalengkeHub Real Customer HomeScreen.js & Theme Tokens (tokens.js)
// Primary Basket Orange: #E8833A | Outline Deep Brown: #261006 | Cream: #F7F5F0
const PresyoCheckCard = ({ item }) => {
  const fillPct = item.maxPrice > 0 ? Math.min(100, (item.minPrice / item.maxPrice) * 100) : 0;
  const tickPct = item.maxPrice > 0 ? Math.min(100, (item.avgPrice / item.maxPrice) * 100) : 0;

  return (
    <TouchableOpacity style={styles.presyoCard} activeOpacity={0.85}>
      <View style={styles.presyoPriceRow}>
        <PriceText price={item.minPrice} unit={item.unit} />
        <VerdictChip verdict="PINAKAMURA" />
      </View>
      <View style={styles.presyoBarTrack}>
        <View style={[styles.presyoBarFill, { width: \`\${fillPct}%\` }]} />
        <View style={[styles.presyoBarTick, { left: \`\${tickPct}%\` }]} />
      </View>
    </TouchableOpacity>
  );
};`,
  },
  "shinpay-plus": {
    filePath: "ShinPay+ / components/Sidebar.tsx & lib/payroll-engine.ts",
    repoUrl: "https://github.com/shin486/ShinPay-",
    language: "typescript",
    code: `// ShinPay+ Tactile Sage Design Tokens (app/globals.css) & Payroll Engine
// --accent: #536c51 | --bg-primary: #fafbfa | --bg-secondary: #f4f6f4
const NAV_GROUPS = [
  { label: 'OVERVIEW', items: [{ label: 'Dashboard', href: '/app' }] },
  { label: 'PEOPLE & ENTITIES', items: [
    { label: 'Businesses', href: '/app/businesses' },
    { label: 'Employees', href: '/app/employees' },
  ]},
  { label: 'PAYROLL WORKFLOW', items: [
    { label: 'Payroll Runs', href: '/app/payroll' },
    { label: 'Payslips', href: '/app/payslips' },
  ]},
];

// Official BIR/DOLE Payslip Batch Reference Format (components/Payslip.tsx)
const batchRef = \`PAY-PH-\${payDate.replace(/-/g, '')}-\${employee.id.toUpperCase()}\`;`,
  },
  "itelect4-project": {
    filePath: "itelect4-project / src/components/Layout.tsx & ReviewPage.tsx",
    repoUrl: "https://github.com/shin486/itelect4-project",
    language: "tsx",
    code: `// ITELECT4 Layout.tsx & Google Gemini 2.5 Flash ReviewPage.tsx
// Deployed Live: https://itelect4-project-nine.vercel.app
const READINESS_STYLE: Record<ReviewResult["readiness"], string> = {
  "Ready for Submission": "bg-emerald-100 text-emerald-700",
  "Needs Minor Revisions": "bg-amber-100 text-amber-700",
  "Needs Major Work": "bg-red-100 text-red-700",
};

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
  return reviewSchema.parse(JSON.parse(response.text));
}`,
  },
  "auto-avenue-ims": {
    filePath: "auto-avenue-ims / dashboard.php & auto_avenue_db.sql",
    repoUrl: "https://github.com/shin486/auto-avenue-ims",
    language: "php",
    code: `<?php
// Auto Avenue IMS Dashboard (dashboard.php)
// Header Gradient: linear-gradient(135deg, rgb(0, 0, 0), rgb(66, 169, 111))
$low_stock_query = "SELECT * FROM products WHERE quantity < min_stock_level";
$low_stock_result = $conn->query($low_stock_query);

$inventory_value = $conn->query(
  "SELECT SUM(quantity * price) as value FROM products"
)->fetch_assoc()['value'];

$recent_sales = $conn->query(
  "SELECT s.sale_id, p.name, s.quantity_sold, p.price, s.sale_date
   FROM sales s JOIN products p ON s.product_id = p.product_id
   ORDER BY s.sale_date DESC LIMIT 5"
);
?>`,
  },
  "crave-cart": {
    filePath: "food-ordering-system / views/cart.html & public/css/style.css",
    repoUrl: "https://github.com/shin486/food-ordering-system",
    language: "javascript",
    code: `// Crave Cart Express Server (server.js) & Cart Logic (public/js/cart.js)
// Brand Header Color: #ff6b6b | Tax Rate: 8%
app.get('/api/menu', (req, res) => {
  const menu = JSON.parse(fs.readFileSync('./data/menu.json'));
  res.json(menu);
});

app.post('/api/orders', (req, res) => {
  const order = { id: Date.now().toString(), ...req.body, createdAt: new Date() };
  const orders = JSON.parse(fs.readFileSync('./data/orders.json'));
  orders.push(order);
  fs.writeFileSync('./data/orders.json', JSON.stringify(orders, null, 2));
  res.json({ success: true, orderId: order.id });
});`,
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
        return "Authentic PalengkeHub UI (#E8833A basket orange, Presyo Check bars, Lipa Public Market stalls & QR Pickup Pass)";
      case "shinpay-plus":
        return "Authentic ShinPay+ Tactile Sage UI (#536c51 sidebar, 2025 PH SSS/PhilHealth/Pag-IBIG/TRAIN engine & BIR Payslip)";
      case "itelect4-project":
        return "Authentic ITELECT4 UI (Layout.tsx navbar, Zustand stores & Gemini 2.5 Flash review schema + Live Vercel link)";
      case "auto-avenue-ims":
        return "Authentic Auto Avenue IMS UI (dashboard.php black-emerald header, autoavelogo.svg, low-stock PO generator)";
      case "avms":
        return "Interactive Campus Vehicle Access Pass generator, live gate scanner & 99.9% SLA telemetry monitor";
      case "crave-cart":
        return "Authentic Crave Cart UI (#ff6b6b header, data/menu.json filter, 8% tax cart summary & 5-star feedback form)";
      default:
        return "Interactive live application UI.";
    }
  };

  const codeEntry = REAL_CODE_SNIPPETS[projectId];

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Top Bar: Real UI Status + [ Real UI | Real Code ] Switcher */}
      <div className="w-full mb-2.5 px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-700 dark:text-zinc-300 shadow-2xs">
        <div className="flex items-center gap-2 font-semibold min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          <span className="truncate">{getRecruiterInsight()}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {codeEntry?.repoUrl && (
            <a
              href={codeEntry.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 rounded-md border border-neutral-200 dark:border-zinc-700 text-[10px] font-bold text-neutral-600 dark:text-zinc-300 hover:text-black dark:hover:text-white inline-flex items-center gap-1"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}

          {codeEntry && (
            <div className="flex items-center bg-neutral-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-neutral-200 dark:border-zinc-700 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setSubMode("app")}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
                  subMode === "app"
                    ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black shadow-2xs"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Real UI</span>
              </button>
              <button
                type="button"
                onClick={() => setSubMode("code")}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
                  subMode === "code"
                    ? "bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black shadow-2xs"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>Real Code</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Render either Authentic Interactive Real UI or Real Repository Source Code */}
      {subMode === "code" && codeEntry ? (
        <div className="w-full rounded-2xl bg-[#0d0d12] border border-zinc-800 shadow-xl overflow-hidden animate-fade-in">
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
          <pre className="p-4 text-[11px] sm:text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed h-[450px]">
            <code>{codeEntry.code}</code>
          </pre>
        </div>
      ) : (
        <div className="w-full h-[480px] sm:h-[510px] rounded-2xl border border-neutral-200 dark:border-zinc-800 shadow-lg overflow-hidden bg-white dark:bg-zinc-950">
          {renderDemo()}
        </div>
      )}
    </div>
  );
};
