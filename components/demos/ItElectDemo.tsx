"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Database,
  Terminal,
  Send,
  Plus,
  Trash2,
  CheckCircle2,
  Lock,
  Code2,
  Cpu,
  Layers,
  RotateCcw,
} from "lucide-react";

interface CrudItem {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "approved";
  score?: number;
}

const SAMPLE_PROMPTS = [
  "Supabase Row-Level Security policy for tenant data isolation",
  "React Native offline SQLite cache with background sync",
  "JWT access token rotation with Redis blacklist",
];

export const ItElectDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ai" | "crud">("ai");
  const [prompt, setPrompt] = useState(SAMPLE_PROMPTS[0]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{
    score: number;
    verdict: string;
    strengths: string[];
    improvements: string[];
    zodValidated: boolean;
  } | null>({
    score: 9.6,
    verdict: "Enterprise-grade multi-tenant architecture with zero data leakage risk.",
    strengths: [
      "Strict auth.uid() check prevents cross-tenant data traversal",
      "Indexed tenant_id column ensures sub-10ms query execution",
      "Defends against IDOR (Insecure Direct Object Reference) vulnerabilities",
    ],
    improvements: [
      "Ensure service_role key is strictly confined to server-side edge functions",
    ],
    zodValidated: true,
  });

  const [crudItems, setCrudItems] = useState<CrudItem[]>([
    { id: "c1", title: "Implement Supabase RLS Schema", status: "approved", score: 9.6 },
    { id: "c2", title: "Zod Schema Validation for /api/ai", status: "approved", score: 9.8 },
    { id: "c3", title: "Rate Limiting with Upstash Redis", status: "in-progress", score: 9.2 },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [apiLog, setApiLog] = useState<string>(
    "POST /api/ai 200 OK • Token verify: valid • Response time: 240ms"
  );

  const handleRunAiReview = async () => {
    if (!prompt.trim()) return;
    setIsAiLoading(true);
    setApiLog(`POST /api/ai • Processing prompt through Gemini AI...`);

    // Simulate smart dynamic Zod-validated response tailored to the prompt
    setTimeout(() => {
      const generatedScore = (9.2 + Math.random() * 0.7).toFixed(1);
      setAiResult({
        score: parseFloat(generatedScore),
        verdict: `Evaluated "${prompt.slice(0, 45)}...": High architectural viability with clean separation of concerns.`,
        strengths: [
          "Follows 12-factor application guidelines and decoupled design",
          "Zod schema validation guarantees deterministic runtime typing",
          "REST endpoint adheres to idempotent HTTP semantics",
        ],
        improvements: [
          "Maintain automated unit test coverage across edge-case payloads",
        ],
        zodValidated: true,
      });
      setIsAiLoading(false);
      setApiLog(`POST /api/ai 200 OK • Zod schema valid • Output: 462 bytes`);
    }, 600);
  };

  const handleAddCrud = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newItem: CrudItem = {
      id: `c-${Date.now()}`,
      title: newTitle.trim(),
      status: "pending",
    };
    setCrudItems((prev) => [newItem, ...prev]);
    setNewTitle("");
    setApiLog(`POST /api/items 201 Created • Item ID: ${newItem.id}`);
  };

  const handleDeleteCrud = (id: string) => {
    setCrudItems((prev) => prev.filter((item) => item.id !== id));
    setApiLog(`DELETE /api/items/${id} 204 No Content`);
  };

  const handleToggleStatus = (id: string) => {
    setCrudItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "pending"
                  ? "in-progress"
                  : item.status === "in-progress"
                  ? "approved"
                  : "pending",
            }
          : item
      )
    );
    setApiLog(`PATCH /api/items/${id} 200 OK • Status updated`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 text-zinc-900 dark:text-zinc-100 select-none">
      {/* Workbench Container */}
      <div className="w-full max-w-2xl bg-white dark:bg-[#111116] rounded-2xl border border-neutral-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="px-4 py-3 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-ig-purple text-white flex items-center justify-center font-bold text-xs">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-neutral-800 dark:text-zinc-200">
              IT Elective 4 Workbench
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Lock className="w-2.5 h-2.5" />
              JWT Auth Active
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-neutral-200 dark:border-zinc-800 text-xs font-semibold bg-neutral-50 dark:bg-zinc-900/50">
          <button
            onClick={() => setActiveTab("ai")}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "ai"
                ? "border-ig-purple text-ig-purple bg-white dark:bg-zinc-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-ig-purple" />
            <span>Live Gemini AI Reviewer (POST /api/ai)</span>
          </button>
          <button
            onClick={() => setActiveTab("crud")}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === "crud"
                ? "border-ig-purple text-ig-purple bg-white dark:bg-zinc-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-500" />
            <span>Protected REST CRUD</span>
          </button>
        </div>

        {/* Viewport Content */}
        <div className="p-4 sm:p-5 flex-1 min-h-[360px] flex flex-col justify-between">
          {activeTab === "ai" ? (
            /* Gemini AI Endpoint Tester */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-zinc-300 mb-1.5">
                  Input Code / Feature Spec to Review:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter an architecture feature or API endpoint..."
                    className="flex-1 p-2.5 text-xs rounded-xl border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-medium focus:outline-none"
                  />
                  <button
                    onClick={handleRunAiReview}
                    disabled={isAiLoading || !prompt.trim()}
                    className="px-4 py-2.5 rounded-xl bg-ig-gradient text-white text-xs font-bold hover:opacity-95 active:scale-95 transition-all shadow-sm flex items-center gap-1.5 flex-shrink-0 disabled:opacity-50"
                  >
                    {isAiLoading ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>Run /api/ai</span>
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-neutral-400">Presets:</span>
                  {SAMPLE_PROMPTS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPrompt(p)}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400 hover:text-black dark:hover:text-white border border-neutral-200 dark:border-zinc-700"
                    >
                      {p.slice(0, 26)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Structured Response Container */}
              {aiResult && (
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-zinc-900/80 border border-neutral-200 dark:border-zinc-800 space-y-2.5 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-mono font-bold text-neutral-800 dark:text-zinc-200">
                        Zod Validated Output
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      <span>Viability:</span>
                      <span className="text-sm px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                        {aiResult.score} / 10
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-700 dark:text-zinc-300 font-medium leading-relaxed">
                    {aiResult.verdict}
                  </p>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Validated Strengths
                    </p>
                    {aiResult.strengths.map((str, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 text-xs text-neutral-600 dark:text-zinc-400"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Protected CRUD Manager */
            <div className="space-y-3">
              <form onSubmit={handleAddCrud} className="flex gap-2">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="New feature task (e.g. Add rate limit middleware)..."
                  className="flex-1 p-2 text-xs rounded-xl border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create</span>
                </button>
              </form>

              <div className="space-y-2 max-h-[220px] overflow-y-auto">
                {crudItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <button
                        onClick={() => handleToggleStatus(item.id)}
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          item.status === "approved"
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-neutral-400"
                        }`}
                        title="Click to toggle status"
                      >
                        {item.status === "approved" && <CheckCircle2 className="w-3 h-3" />}
                      </button>
                      <span
                        className={`truncate font-medium ${
                          item.status === "approved"
                            ? "line-through text-neutral-400"
                            : "text-neutral-900 dark:text-zinc-100"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        onClick={() => handleToggleStatus(item.id)}
                        className={`cursor-pointer px-2 py-0.5 rounded text-[10px] font-semibold capitalize ${
                          item.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : item.status === "in-progress"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-neutral-100 dark:bg-zinc-800 text-neutral-500"
                        }`}
                      >
                        {item.status}
                      </span>
                      <button
                        onClick={() => handleDeleteCrud(item.id)}
                        className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mini REST API Console Log Bar */}
          <div className="mt-4 pt-2.5 border-t border-neutral-200 dark:border-zinc-800 flex items-center justify-between text-[10px] font-mono text-neutral-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 truncate">
              <Terminal className="w-3 h-3 text-ig-purple flex-shrink-0" />
              <span className="truncate">{apiLog}</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 ml-2">
              ● API Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
