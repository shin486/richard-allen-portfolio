"use client";

import React, { useState } from "react";
import {
  Database,
  Terminal,
  Send,
  Plus,
  Trash2,
  CheckCircle2,
  Lock,
  Cpu,
  AlertCircle,
} from "lucide-react";

/**
 * Exact courses and AI Review schema from ITELECT4:
 * - itelect4-backend/src/data/courses.ts
 * - itelect4-backend/src/ai/prompt.ts & gemini.ts
 * - itelect4-project/src/pages/ReviewPage.tsx
 */
export interface CourseSubmission {
  id: string;
  courseCode: "ITELECT4" | "ITELECT3" | "CSSWENG";
  courseTitle: string;
  githubUrl: string;
  notes: string;
}

export interface AiReview {
  summary: string;
  strengths: string[];
  improvements: string[];
  readiness: "ready" | "almost" | "not-yet";
}

const READINESS_STYLE: Record<AiReview["readiness"], string> = {
  ready: "bg-green-100 text-green-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-500/30",
  almost: "bg-yellow-100 text-yellow-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-500/30",
  "not-yet": "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-500/30",
};

const REAL_EXAMPLES: { label: string; description: string; review: AiReview }[] = [
  {
    label: "Complete Submission (Ready)",
    description:
      "A full-stack React + Express + MongoDB course tracker deployed on Vercel. Uses JWT authentication, Zod schema validation on both client and server, and integrates Google Gemini Flash on POST /api/ai with rate limiting and a full README.",
    review: {
      summary:
        "You built and deployed a full-stack React and Express course tracker with JWT login, Zod validation, and a rate-limited Gemini AI review endpoint.",
      strengths: [
        "Both frontend and backend are deployed on Vercel with complete README documentation.",
        "Input and AI responses are strictly validated at runtime using Zod schemas.",
        "Protected routes enforce tenant isolation per authenticated student.",
      ],
      improvements: [
        "Add end-to-end Playwright tests for the token expiration edge case.",
      ],
      readiness: "ready",
    },
  },
  {
    label: "Missing README (Almost)",
    description:
      "A React and TypeScript app that lists my courses and lets me save a GitHub link for each one. The data comes from my own Express API on Vercel and login uses JWT. No README yet.",
    review: {
      summary:
        "You built a React app that saves a GitHub link per course, backed by your own Express API with JWT login.",
      strengths: [
        "Both halves are deployed, so the whole app can be checked.",
        "Login uses a token from your own API, not a made-up one.",
      ],
      improvements: [
        "Write the README: what the app does, how to run both repos, and both live URLs.",
      ],
      readiness: "almost",
    },
  },
  {
    label: "Vague Description (Not-Yet)",
    description: "It is a website. It has some pages and it uses a database.",
    review: {
      summary:
        "You describe a website with pages and a database, but not what it does.",
      strengths: [
        "Pages and a database means the main parts already exist.",
      ],
      improvements: [
        "Say in one sentence what the app is for and who uses it.",
        "Name the features someone can try, like logging in.",
        "Say where it is deployed so it can be opened and checked.",
      ],
      readiness: "not-yet",
    },
  },
];

const INITIAL_SUBMISSIONS: CourseSubmission[] = [
  {
    id: "sub-1",
    courseCode: "ITELECT4",
    courseTitle: "IT Elective 4 - TypeScript Advanced Types",
    githubUrl: "https://github.com/shin486/itelect4-project",
    notes: "Full-Stack CRUD + Gemini AI endpoint (POST /api/ai)",
  },
  {
    id: "sub-2",
    courseCode: "ITELECT3",
    courseTitle: "IT Elective 3 - Web Development",
    githubUrl: "https://github.com/shin486/auto-avenue-ims",
    notes: "Inventory Management & POS Integration",
  },
  {
    id: "sub-3",
    courseCode: "CSSWENG",
    courseTitle: "Software Engineering",
    githubUrl: "https://github.com/shin486/PalengkeHubFinal",
    notes: "Mobile Public-Market Price Transparency & Pre-Ordering",
  },
];

export const ItElectDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ai" | "crud">("ai");
  const [prompt, setPrompt] = useState(REAL_EXAMPLES[0].description);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AiReview>(REAL_EXAMPLES[0].review);

  const [submissions, setSubmissions] = useState<CourseSubmission[]>(INITIAL_SUBMISSIONS);
  const [selectedCourse, setSelectedCourse] = useState<"ITELECT4" | "ITELECT3" | "CSSWENG">("ITELECT4");
  const [newGithubUrl, setNewGithubUrl] = useState("https://github.com/shin486/ShinPay-");
  const [newNotes, setNewNotes] = useState("Multi-Tenant Payroll SaaS");
  const [apiLog, setApiLog] = useState<string>(
    "POST /api/ai 200 OK • model: gemini-flash-latest • reviewSchema.safeParse: true"
  );

  const handleRunAiReview = () => {
    if (!prompt.trim()) return;
    setIsAiLoading(true);
    setApiLog("POST /api/ai • Wrapping <submission> tags & validating JSON schema...");

    setTimeout(() => {
      const matched = REAL_EXAMPLES.find((ex) => ex.description === prompt);
      if (matched) {
        setAiResult(matched.review);
      } else {
        const isShort = prompt.trim().length < 50;
        setAiResult({
          summary: isShort
            ? "Your submission description is brief and needs more architectural detail."
            : `You described: "${prompt.slice(0, 70)}..." with full-stack integration.`,
          strengths: isShort
            ? ["Core concept is stated."]
            : [
                "Clear explanation of the tech stack and user workflow.",
                "Demonstrates separation between frontend UI and backend API.",
              ],
          improvements: isShort
            ? [
                "Specify the frontend and backend frameworks used.",
                "Include the live deployment URL and authentication method.",
              ]
            : [
                "Include instructions for environment variables (.env.example) in the repository.",
              ],
          readiness: isShort ? "not-yet" : "ready",
        });
      }
      setIsAiLoading(false);
      setApiLog("POST /api/ai 200 OK • responseMimeType: application/json • Zod verified");
    }, 450);
  };

  const handleAddSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGithubUrl.trim()) return;
    const courseTitles: Record<"ITELECT4" | "ITELECT3" | "CSSWENG", string> = {
      ITELECT4: "IT Elective 4 - TypeScript Advanced Types",
      ITELECT3: "IT Elective 3 - Web Development",
      CSSWENG: "Software Engineering",
    };
    const item: CourseSubmission = {
      id: `sub-${Date.now()}`,
      courseCode: selectedCourse,
      courseTitle: courseTitles[selectedCourse],
      githubUrl: newGithubUrl.trim(),
      notes: newNotes.trim() || "Submitted via Course Portal",
    };
    setSubmissions((prev) => [item, ...prev]);
    setNewNotes("");
    setApiLog(`POST /api/submissions 201 Created • Course: ${selectedCourse}`);
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((item) => item.id !== id));
    setApiLog(`DELETE /api/submissions/${id} 204 No Content`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 text-zinc-900 dark:text-zinc-100 select-none">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111116] rounded-2xl border border-neutral-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="px-4 py-3 bg-neutral-100 dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-ig-purple text-white flex items-center justify-center font-bold text-xs">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-800 dark:text-zinc-200 block leading-none">
                DLSL Course &amp; AI Review Portal (ITELECT4)
              </span>
              <span className="text-[10px] text-neutral-500">
                React + Express + MongoDB + Google GenAI SDK
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Lock className="w-2.5 h-2.5" />
            JWT Bearer Active
          </span>
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
            <span>AI Submission Review (ReviewPage.tsx)</span>
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
            <span>Course Submissions CRUD ({submissions.length})</span>
          </button>
        </div>

        {/* Viewport Content */}
        <div className="p-4 sm:p-5 flex-1 min-h-[360px] flex flex-col justify-between">
          {activeTab === "ai" ? (
            <div className="space-y-3.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-neutral-700 dark:text-zinc-300">
                    Project Description (wrapped in <code>&lt;submission&gt;</code> tags):
                  </label>
                </div>
                <textarea
                  rows={2}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="What it does, how it is built, where it runs..."
                  className="w-full p-2.5 text-xs rounded-xl border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-medium focus:outline-none"
                />

                {/* Worked Examples from src/ai/prompt.ts */}
                <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-[10px] text-neutral-400">Few-Shot Examples:</span>
                    {REAL_EXAMPLES.map((ex, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setPrompt(ex.description);
                          setAiResult(ex.review);
                        }}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300 hover:bg-neutral-200 border border-neutral-200 dark:border-zinc-700"
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleRunAiReview}
                    disabled={isAiLoading || !prompt.trim()}
                    className="px-3.5 py-1.5 rounded-lg bg-ig-gradient text-white text-xs font-bold hover:opacity-95 active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>{isAiLoading ? "Reviewing..." : "Review with Gemini"}</span>
                  </button>
                </div>
              </div>

              {/* Exact Review Output Matching ReviewPage.tsx */}
              <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-zinc-900/80 border border-neutral-200 dark:border-zinc-800 space-y-2.5 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-zinc-800">
                  <span className="text-xs font-mono font-bold text-neutral-800 dark:text-zinc-200">
                    Zod Schema: <code>reviewSchema.safeParse(data)</code>
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wide ${
                      READINESS_STYLE[aiResult.readiness]
                    }`}
                  >
                    Readiness: {aiResult.readiness}
                  </span>
                </div>

                <p className="text-xs text-neutral-800 dark:text-zinc-200 font-medium leading-relaxed">
                  {aiResult.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Strengths
                    </p>
                    {aiResult.strengths.map((str, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 text-[11px] text-neutral-600 dark:text-zinc-400"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Actionable Improvements
                    </p>
                    {aiResult.improvements.map((imp, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 text-[11px] text-neutral-600 dark:text-zinc-400"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Protected Course Submissions CRUD */
            <div className="space-y-3">
              <form onSubmit={handleAddSubmission} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value as any)}
                  className="p-2 text-xs font-bold rounded-xl border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                >
                  <option value="ITELECT4">ITELECT4 (TS Adv Types)</option>
                  <option value="ITELECT3">ITELECT3 (Web Dev)</option>
                  <option value="CSSWENG">CSSWENG (Soft Eng)</option>
                </select>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Submission title / notes..."
                  className="p-2 text-xs rounded-xl border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-neutral-900 dark:bg-zinc-100 text-white dark:text-black text-xs font-bold hover:opacity-90 flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Submission</span>
                </button>
              </form>

              <div className="space-y-2 max-h-[220px] overflow-y-auto">
                {submissions.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-ig-purple/10 text-ig-purple">
                          {item.courseCode}
                        </span>
                        <span className="font-bold truncate">{item.notes}</span>
                      </div>
                      <p className="text-[10px] text-neutral-500 font-mono truncate mt-0.5">
                        {item.githubUrl}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteSubmission(item.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                      title="Delete submission"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mini Console Log */}
          <div className="mt-4 pt-2.5 border-t border-neutral-200 dark:border-zinc-800 flex items-center justify-between text-[10px] font-mono text-neutral-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 truncate">
              <Terminal className="w-3 h-3 text-ig-purple flex-shrink-0" />
              <span className="truncate">{apiLog}</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 ml-2">
              ● Express API
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
