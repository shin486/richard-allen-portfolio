export type BlogTag =
  | "Mobile"
  | "Backend"
  | "Database"
  | "AI"
  | "Frontend"
  | "Cloud"
  | "Career";

export type BlogCoverIcon =
  | "WifiOff"
  | "Calculator"
  | "ShieldCheck"
  | "Sparkles"
  | "Keyboard"
  | "Cloud"
  | "Briefcase";

export interface BlogCodeBlock {
  filename: string;
  language: string;
  code: string;
}

export interface BlogSlide {
  kicker: string;
  heading: string;
  body: string;
  bullets?: string[];
  codeSnippet?: BlogCodeBlock;
  image?: string;
  quote?: string;
}

export interface BlogArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  code?: BlogCodeBlock;
}

export interface BlogDeepLink {
  label: string;
  action:
    | { type: "project"; projectId: string }
    | { type: "tab"; tab: "projects" | "skills" | "certificates" | "about" }
    | { type: "section"; sectionId: string }
    | { type: "resume" };
}

export interface DevBlogPost {
  id: string;
  shortTitle: string;
  readTime: string;
  date: string;
  tag: BlogTag;
  coverIcon: BlogCoverIcon;
  accentGradient: string;
  coverTintClass: string;
  isCloseFriends?: boolean;
  headline: string;
  subtitle: string;
  summary: string;
  slides: BlogSlide[];
  articleSections: BlogArticleSection[];
  keyTakeaways: string[];
  deepLink: BlogDeepLink;
}

export const BLOG_TAGS: BlogTag[] = [
  "Mobile",
  "Backend",
  "Database",
  "AI",
  "Frontend",
  "Cloud",
  "Career",
];

export const devBlogPosts: DevBlogPost[] = [
  {
    id: "offline-sync",
    shortTitle: "Offline Sync",
    readTime: "2 min",
    date: "OCT 2026",
    tag: "Mobile",
    coverIcon: "WifiOff",
    accentGradient: "from-emerald-950/90 via-[#0B0E11] to-teal-950/85",
    coverTintClass:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
    headline:
      "Designing Offline-First Pre-Ordering for Spotty Public Market Signal",
    subtitle: "PalengkeHub Capstone · React Native, Expo & Supabase Realtime",
    summary:
      "How we kept pre-orders and live stall pricing resilient inside the Lipa City Public Market when cellular bars drop to zero.",
    slides: [
      {
        kicker: "01 // THE REAL-WORLD PROBLEM",
        heading: "Public markets don't have fiber Wi-Fi",
        body: "Inside dense wet-market concrete stalls, LTE drops mid-checkout. A naive fetch() leaves buyers staring at infinite spinners — or creates duplicate pre-orders when they tap retry.",
        quote:
          "If the network disappears mid-order, the app shouldn't punish the buyer.",
      },
      {
        kicker: "02 // ARCHITECTURE",
        heading: "Optimistic Queue + Sub-250ms Sync",
        body: "In PalengkeHub, every pre-order writes locally first with an idempotent client key, updates the UI immediately, and replays automatically once signal returns — while Supabase Realtime streams price updates across 20+ SKUs in under 250ms.",
        bullets: [
          "Idempotent client_mutation_id prevents duplicate stall orders on retry",
          "8+ normalized PostgreSQL tables isolated by Supabase Row-Level Security",
          "DTI Suggested Retail Price (SRP) comparison runs deterministically on-device",
        ],
      },
      {
        kicker: "03 // CODE PATTERN",
        heading: "Reconciling queued mutations cleanly",
        body: "Treating the local queue as a FIFO log with explicit upsert keys made reconnect recovery completely predictable.",
        codeSnippet: {
          filename: "src/lib/offlineQueue.ts",
          language: "TypeScript",
          code: `export async function flushOrderQueue(queue: PendingOrder[]) {
  for (const item of queue) {
    const { error } = await supabase
      .from("pre_orders")
      .upsert(item.payload, { onConflict: "client_mutation_id" });

    if (error) break; // Preserve FIFO order until signal stabilizes
    await markMutationSynced(item.client_mutation_id);
  }
}`,
        },
      },
    ],
    articleSections: [
      {
        heading: "Why Online-Only Fails in Local Commerce",
        paragraphs: [
          "While engineering PalengkeHub for the Lipa City Public Market, our earliest field tests surfaced an immediate reality: indoor market stalls frequently lose 4G signal right when vendors update morning fish and vegetable prices or when shoppers submit pre-orders.",
          "Treating offline states as an error screen made the app unusable. Instead, we designed around an offline-first assumption: local state is always responsive, and the server is a synchronized source of truth that catches up cleanly.",
        ],
      },
      {
        heading: "Idempotent Upserts & Sub-250ms WebSocket Updates",
        paragraphs: [
          "Each pre-order mutation carries a UUID generated on the device (client_mutation_id). When connectivity returns, our flush loop pushes pending items via PostgreSQL UPSERT constrained on that key — eliminating double-charging or duplicate vendor tickets even on flaky reconnects.",
        ],
        code: {
          filename: "src/lib/offlineQueue.ts",
          language: "TypeScript",
          code: `export interface PendingOrder {
  client_mutation_id: string;
  stall_id: string;
  items: Array<{ sku_id: string; qty_kg: number }>;
  created_at: string;
}

export async function flushOrderQueue(queue: PendingOrder[]) {
  for (const item of queue) {
    const { error } = await supabase
      .from("pre_orders")
      .upsert(item, { onConflict: "client_mutation_id" });

    if (error) {
      // Halt FIFO replay cleanly; retry on next NetInfo reconnect event
      break;
    }
    await markMutationSynced(item.client_mutation_id);
  }
}`,
        },
      },
    ],
    keyTakeaways: [
      "Generate idempotency keys on the client so retries never create duplicate transactions.",
      "Separate realtime price broadcasts (WebSockets) from durable write queues.",
      "Always test mobile apps under throttled or toggled airplane-mode conditions before defense.",
    ],
    deepLink: {
      label: "Test PalengkeHub Live Sandbox",
      action: { type: "project", projectId: "palengkehub" },
    },
  },
  {
    id: "ph-tax-math",
    shortTitle: "PH Tax Math",
    readTime: "3 min",
    date: "OCT 2026",
    tag: "Backend",
    coverIcon: "Calculator",
    accentGradient: "from-sky-950/90 via-[#0B0D13] to-indigo-950/85",
    coverTintClass:
      "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/25",
    headline:
      "Building a Zero-Dependency Philippine Payroll Engine (TRAIN, SSS 2025, PhilHealth)",
    subtitle: "ShinPay+ SaaS · Next.js 14, TypeScript & Deterministic Math",
    summary:
      "Avoiding floating-point drift when computing BIR TRAIN withholding tax, SSS 2025 brackets, and PhilHealth 5% splits.",
    slides: [
      {
        kicker: "01 // WHY PAYROLL MATH BREAKS",
        heading: "0.1 + 0.2 !== 0.3 in JavaScript",
        body: "When computing statutory deductions across hundreds of employees, IEEE-754 floating-point drift creates 1-centavo mismatches on BIR Form 2316 exports. Payroll code must be pure, deterministic, and testable down to the centavo.",
      },
      {
        kicker: "02 // STATUTORY PIPELINE",
        heading: "Exact Philippine Deduction Order",
        body: "ShinPay+ runs every payslip through a zero-dependency pure TypeScript pipeline paired with an in-browser assertion test runner so hiring managers can verify live calculations.",
        bullets: [
          "SSS 2025 MSC bracket lookup (EE/ER + WISP separation)",
          "PhilHealth 5.0% split (2.5% employee / 2.5% employer, capped at ₱100k)",
          "Pag-IBIG 2% employee cap (₱200 max) deducted prior to BIR TRAIN taxable income",
        ],
      },
      {
        kicker: "03 // DETERMINISTIC SNIPPET",
        heading: "Pure functions + centavo rounding",
        body: "Keeping the statutory engine pure lets us execute the exact same module inside Next.js Server Actions and client-side live previews.",
        codeSnippet: {
          filename: "lib/payroll/statutoryEngine.ts",
          language: "TypeScript",
          code: `const roundCentavos = (n: number) =>
  Math.round((n + Number.EPSILON) * 100) / 100;

export function computePhilHealthShare(monthlyBasic: number) {
  const clamped = Math.min(Math.max(monthlyBasic, 10_000), 100_000);
  const totalPremium = roundCentavos(clamped * 0.05);
  return {
    employeeShare: roundCentavos(totalPremium / 2),
    employerShare: roundCentavos(totalPremium / 2),
  };
}`,
        },
      },
    ],
    articleSections: [
      {
        heading: "Why Zero-Dependency Pure Functions Matter in FinTech",
        paragraphs: [
          "Payroll compliance in the Philippines requires strict sequencing: mandatory contributions (SSS 2025 schedule, PhilHealth 5% split, and Pag-IBIG) must be subtracted from gross compensation before locating the employee's BIR TRAIN Law withholding tax bracket.",
          "By isolating all statutory rules into pure, side-effect-free TypeScript functions, ShinPay+ executes deterministic calculations in sub-millisecond time without external libraries that can drift or break.",
        ],
      },
      {
        heading: "Verifying Rules With Live Assertions",
        paragraphs: [
          "Rather than asking reviewers to trust a screenshot, I shipped an interactive test runner inside the ShinPay+ portfolio demo so hiring managers can trigger real statutory edge cases (minimum wage tax exemptions, ceiling caps, and 13th-month de minimis rules) right in the browser.",
        ],
        code: {
          filename: "lib/payroll/trainTax.ts",
          language: "TypeScript",
          code: `export function computeMonthlyTrainTax(taxableMonthly: number): number {
  if (taxableMonthly <= 20_833) return 0;
  if (taxableMonthly <= 33_332) return round((taxableMonthly - 20_833) * 0.15);
  if (taxableMonthly <= 66_666) return round(1_875 + (taxableMonthly - 33_333) * 0.20);
  if (taxableMonthly <= 166_666) return round(8_541.80 + (taxableMonthly - 66_667) * 0.25);
  if (taxableMonthly <= 666_666) return round(33_541.80 + (taxableMonthly - 166_667) * 0.30);
  return round(183_541.80 + (taxableMonthly - 666_667) * 0.35);
}`,
        },
      },
    ],
    keyTakeaways: [
      "Model statutory brackets as pure functions so server calculations and browser tests share 100% identical logic.",
      "Always deduct SSS, PhilHealth, and Pag-IBIG before evaluating BIR TRAIN Law brackets.",
      "Normalize rounding at every intermediate deduction line to prevent 1-centavo reconciliation drift.",
    ],
    deepLink: {
      label: "Run ShinPay+ Live Tax Suite",
      action: { type: "project", projectId: "shinpay-plus" },
    },
  },
  {
    id: "rls-security",
    shortTitle: "RLS Security",
    readTime: "2 min",
    date: "SEP 2026",
    tag: "Database",
    coverIcon: "ShieldCheck",
    accentGradient: "from-indigo-950/90 via-[#0B0C14] to-slate-950/90",
    coverTintClass:
      "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/25",
    headline:
      "Multi-Tenant Isolation Without Trusting the Frontend: Supabase RLS in Practice",
    subtitle: "PostgreSQL Policies Across ShinPay+ & PalengkeHub",
    summary:
      "Why client-side filters are not a security boundary — and how PostgreSQL Row-Level Security enforces tenant walls inside the database.",
    slides: [
      {
        kicker: "01 // THE COMMON MISTAKE",
        heading: "Client filters are UX, not security",
        body: "Filtering rows with .eq('company_id', id) in React protects your UI layout — not your data. Any authenticated user can inspect requests and query another company's payroll rows if RLS isn't enforced.",
      },
      {
        kicker: "02 // DATABASE-LEVEL WALLS",
        heading: "Enforcing tenant_id inside PostgreSQL",
        body: "Across ShinPay+ (multi-tenant payroll) and PalengkeHub (buyer / vendor / admin roles), every table enables RLS so PostgreSQL rejects unauthorized reads and writes automatically.",
        codeSnippet: {
          filename: "supabase/migrations/004_tenant_rls.sql",
          language: "SQL",
          code: `ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_select"
ON payroll_runs FOR SELECT
USING (
  tenant_id IN (
    SELECT tenant_id FROM company_members
    WHERE user_id = auth.uid()
  )
);`,
        },
      },
      {
        kicker: "03 // THE PAYOFF",
        heading: "Simpler APIs, zero cross-tenant leaks",
        body: "Once RLS policies are verified and indexed on (user_id, tenant_id), even a forgotten WHERE clause in an endpoint can never leak another company's payslips.",
        bullets: [
          "Index foreign keys referenced inside RLS policies to keep latency low",
          "Separate SELECT, INSERT, and UPDATE policies by role",
          "Verify policies with secondary non-admin test accounts, never only service_role",
        ],
      },
    ],
    articleSections: [
      {
        heading: "Defense in Depth for Multi-Tenant SaaS",
        paragraphs: [
          "In a payroll platform like ShinPay+, cross-tenant data leakage is catastrophic. Rather than relying solely on API middleware checks, we push authorization down into PostgreSQL using Row-Level Security (RLS).",
          "Every request executes under the authenticated user's JWT context (auth.uid()). Even if a developer forgets a filter clause in a Server Component, PostgreSQL itself enforces tenant boundaries before a single row leaves disk.",
        ],
      },
      {
        heading: "Indexing RLS Membership Lookups",
        paragraphs: [
          "A common performance pitfall with RLS is running unindexed subqueries on every row scan. Pairing CREATE POLICY with a composite index on company_members(user_id, tenant_id) keeps queries fast and predictable.",
        ],
        code: {
          filename: "supabase/migrations/004_tenant_rls.sql",
          language: "SQL",
          code: `CREATE INDEX idx_company_members_user_tenant
  ON company_members (user_id, tenant_id);

ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tenant_members_read_payroll"
ON payroll_runs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM company_members cm
    WHERE cm.tenant_id = payroll_runs.tenant_id
      AND cm.user_id = auth.uid()
  )
);`,
        },
      },
    ],
    keyTakeaways: [
      "Enable RLS on every user-facing table from day one — never bolt it on right before launch.",
      "Always add composite indexes supporting your RLS EXISTS / IN predicates.",
      "Test with two real non-admin accounts to prove cross-tenant queries return 0 rows.",
    ],
    deepLink: {
      label: "Inspect ShinPay+ Multi-Tenant Demo",
      action: { type: "project", projectId: "shinpay-plus" },
    },
  },
  {
    id: "gemini-zod",
    shortTitle: "Gemini + Zod",
    readTime: "2 min",
    date: "SEP 2026",
    tag: "AI",
    coverIcon: "Sparkles",
    accentGradient: "from-violet-950/90 via-[#0E0B16] to-fuchsia-950/80",
    coverTintClass:
      "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/25",
    headline:
      "Taming LLM Outputs: Rate-Limited Gemini APIs with Strict Zod Schemas",
    subtitle: "IT Elective 4 Microservice & Byte AI Assistant",
    summary:
      "Turning unpredictable Google Gemini responses into schema-validated JSON endpoints with rate limiting and deterministic fallbacks.",
    slides: [
      {
        kicker: "01 // THE LLM RELIABILITY GAP",
        heading: "Never trust raw AI text in production UI",
        body: "LLMs love wrapping JSON in markdown fences, renaming keys, or timing out under burst traffic. Treating an AI response like a typed REST contract requires strict runtime parsing and quota protection.",
      },
      {
        kicker: "02 // VALIDATION + GUARDRAILS",
        heading: "Zod Schema + Rate Limiter + Fallback",
        body: "In my IT Elective 4 Express API (POST /api/ai) and this portfolio's Byte assistant, every LLM call passes through rate limiting, Zod validation, and a deterministic fallback synthesizer.",
        codeSnippet: {
          filename: "server/routes/aiReview.ts",
          language: "TypeScript",
          code: `const ReviewSchema = z.object({
  summary: z.string().min(10).max(280),
  sentiment: z.enum(["positive", "neutral", "critical"]),
  score: z.number().int().min(1).max(5),
});

const parsed = ReviewSchema.safeParse(JSON.parse(rawModelText));
if (!parsed.success) return res.status(502).json({ error: "Schema mismatch" });`,
        },
      },
      {
        kicker: "03 // PRODUCTION LESSON",
        heading: "Graceful degradation beats broken chat",
        body: "On this portfolio, if an API key is absent or rate-limited, Byte seamlessly falls back to a verified synthesizer grounded strictly in projectsData, skillsData, and certificatesData — zero hallucinations.",
      },
    ],
    articleSections: [
      {
        heading: "Treating AI Endpoints Like Real Backend Contracts",
        paragraphs: [
          "When integrating Google Gemini into my IT Elective 4 full-stack project (React + Express + MongoDB), the goal wasn't just getting text back — it was returning structured JSON reviews that the frontend could safely render without crashing.",
          "We paired Express rate limiting (to protect API quota from accidental loops or abuse) with strict Zod runtime validation so malformed model responses are caught before reaching the client.",
        ],
        code: {
          filename: "server/routes/aiReview.ts",
          language: "TypeScript",
          code: `import { z } from "zod";

const AiReviewSchema = z.object({
  summary: z.string().min(10).max(280),
  sentiment: z.enum(["positive", "neutral", "critical"]),
  highlights: z.array(z.string()).max(4),
  score: z.number().int().min(1).max(5),
});

export function parseGeminiPayload(rawText: string) {
  const cleaned = rawText.replace(/^\\\`\\\`\\\`json|\\\`\\\`\\\`$/g, "").trim();
  return AiReviewSchema.safeParse(JSON.parse(cleaned));
}`,
        },
      },
    ],
    keyTakeaways: [
      "Always validate LLM JSON outputs at runtime with Zod before persisting or rendering.",
      "Rate-limit AI routes at the server boundary to protect free/paid quota budgets.",
      "Design a deterministic fallback path so your UX never dead-ends when an external API hiccups.",
    ],
    deepLink: {
      label: "Test IT Elective 4 Gemini Endpoint",
      action: { type: "project", projectId: "itelect4-project" },
    },
  },
  {
    id: "3d-keycaps",
    shortTitle: "3D Keycaps",
    readTime: "2 min",
    date: "NOV 2026",
    tag: "Frontend",
    coverIcon: "Keyboard",
    accentGradient: "from-rose-950/85 via-[#110D12] to-amber-950/80",
    coverTintClass:
      "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/25",
    headline:
      "Why I Replaced Static Skill Bars With a 3D Mechanical Keyboard in Three.js",
    subtitle: "Portfolio Engineering · SHIN-32 Hardware Matrix",
    summary:
      "Replacing arbitrary 'React: 90%' progress bars with an interactive 32-key mechanical keyboard synced to whichever project post you're viewing.",
    slides: [
      {
        kicker: "01 // THE DESIGN CRITIQUE",
        heading: "Nobody believes 'TypeScript: 88%' bars",
        body: "Arbitrary percentage bars tell hiring managers nothing about how you actually use a tool. Proof comes from linking every technology directly to the production system where it shipped.",
      },
      {
        kicker: "02 // TACTILE CRAFT",
        heading: "32 Keys, Real Sound, Live Project Sync",
        body: "The SHIN-32 right-rail keyboard listens to IntersectionObserver events from the classified Projects feed — illuminating the exact tech keys used in whichever project post you're currently reading.",
        bullets: [
          "Custom Web Audio mechanical switch click synthesis (zero MP3 asset bloat)",
          "Full keyboard triggers (A–Z, 1–6) + click-to-jump directly to reference projects",
          "Respects prefers-reduced-motion so motion-sensitive visitors stay comfortable",
        ],
      },
    ],
    articleSections: [
      {
        heading: "Proof Over Self-Assigned Percentages",
        paragraphs: [
          "When building this portfolio, I wanted my tech stack section to feel physical and verifiable. Instead of flat badges, every keycap on the SHIN-32 matrix maps to a real technology, its architectural tier, a concrete file path, and clickable pills that jump directly to the project using it.",
          "Using IntersectionObserver across the classified Instagram project posts lets the sticky right-rail keyboard react naturally as you scroll — turning a decorative sidebar into an interactive live legend.",
        ],
      },
    ],
    keyTakeaways: [
      "Link every claimed skill directly to concrete shipped projects instead of arbitrary percentages.",
      "Synthesize crisp micro-interaction audio with Web Audio API rather than shipping heavy audio files.",
      "Always pair 3D / interactive flourishes with keyboard accessibility and prefers-reduced-motion.",
    ],
    deepLink: {
      label: "Inspect 32-Key Skills Matrix",
      action: { type: "tab", tab: "skills" },
    },
  },
  {
    id: "cloud-ai-track",
    shortTitle: "Cloud & AI",
    readTime: "2 min",
    date: "NOV 2026",
    tag: "Cloud",
    coverIcon: "Cloud",
    accentGradient: "from-cyan-950/90 via-[#0A1016] to-emerald-950/80",
    coverTintClass:
      "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/25",
    headline:
      "Connecting 5 Cloud & AI Credentials Into Everyday Full-Stack Architecture",
    subtitle: "Google Gemini · AWS Cloud & AI · Azure AI · TESDA Track",
    summary:
      "How completing 5 Cloud & AI credentials in November 2026 sharpened how I think about IAM least privilege, RAG pipelines, and responsible AI.",
    slides: [
      {
        kicker: "01 // BEYOND PASSING EXAMS",
        heading: "5 Cloud & AI milestones in one sprint",
        body: "Alongside building full-stack apps, I completed Google's Gemini Certified Student (University) certification and four TESDA tracks covering AWS Cloud Practitioner, AWS AI Practitioner, Azure AI Fundamentals, and Fundamentals of AI.",
        image: "/certificates/gemini-certified-student-university.png",
      },
      {
        kicker: "02 // REAL ARCHITECTURAL IMPACT",
        heading: "How cloud principles show up in my code",
        body: "Cloud coursework directly changed how I structure apps — separating secrets via env config, thinking in least-privilege IAM/RLS scopes, and grounding LLM prompts with RAG & verified schemas.",
        bullets: [
          "AWS Cloud (CLF-C02): EC2, S3, Lambda, IAM least privilege, VPC boundaries",
          "AWS AI (AIF-C01) & Azure AI: Foundation models, RAG, Amazon Bedrock, responsible AI",
          "USAID AI Ethics & Governance: Bias mitigation and auditable AI guardrails",
        ],
      },
    ],
    articleSections: [
      {
        heading: "Turning Coursework Into Engineering Instincts",
        paragraphs: [
          "Credentials only matter if they influence how you write and deploy software. Studying AWS Cloud Practitioner (CLF-C02), AWS AI Practitioner (AIF-C01), Azure AI Fundamentals, and Google's Gemini Certification gave me a shared mental model across cloud providers.",
          "Instead of treating deployment as an afterthought, I now think early about least-privilege database roles, rate-limited API boundaries, structured RAG context grounding, and verifiable credentials — all classified cleanly in my Certifications tab.",
        ],
      },
    ],
    keyTakeaways: [
      "Least-privilege IAM in AWS mirrors Row-Level Security discipline in Supabase PostgreSQL.",
      "Structured prompting + RAG grounding turns general LLMs into trustworthy product assistants.",
      "Organizing credentials by domain (AI & ML, Cloud & DevOps, Engineering, Security) clarifies technical breadth.",
    ],
    deepLink: {
      label: "Browse All 10 Classified Certs",
      action: { type: "tab", tab: "certificates" },
    },
  },
  {
    id: "ojt-log",
    shortTitle: "OJT Log",
    readTime: "1 min",
    date: "OPEN NOW",
    tag: "Career",
    coverIcon: "Briefcase",
    accentGradient: "from-emerald-950/95 via-[#09120E] to-zinc-950/95",
    coverTintClass:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/40",
    isCloseFriends: true,
    headline:
      "From 80-Hour Creotec Immersion to Seeking My 500+ Hr OJT Engineering Team",
    subtitle: "★ Close Friends · De La Salle Lipa BSIT (Class of June 2027)",
    summary:
      "What corporate software immersion taught me about team sprints, code reviews, and how I'm ready to contribute on Day 1 of my OJT.",
    slides: [
      {
        kicker: "★ CLOSE FRIENDS // INDUSTRY IMMERSION",
        heading: "80 hours inside corporate software workflows",
        body: "My 80-hour work immersion at Creotec Philippines Inc. bridged classroom coding and real engineering teams — practicing Agile sprint boards, clean PR reviews, and clear technical documentation.",
        bullets: [
          "4th-year BS Information Technology at De La Salle Lipa (Graduating June 2027)",
          "Active JPCS — DLSL Chapter member (DevRoutes & Ethical Hacking symposiums)",
          "Ready for on-site, hybrid, or remote Full-Stack & Mobile OJT placements",
        ],
      },
      {
        kicker: "★ CLOSE FRIENDS // OPEN FOR OJT",
        heading: "Ready to ship production code with your team",
        body: "I'm actively looking for a 500+ hour OJT / Software Engineering Internship where I can contribute across Next.js, React Native, TypeScript, Supabase/PostgreSQL, and AI integrations while learning from senior engineers.",
        quote:
          "Available immediately — let's build something reliable together.",
      },
    ],
    articleSections: [
      {
        heading: "What I Bring to an Engineering Team on Day 1",
        paragraphs: [
          "Through my 80-hour immersion at Creotec Philippines and shipping 6 end-to-end systems during my BSIT at De La Salle Lipa, I've learned that great junior engineers do three things consistently: write readable strict TypeScript, test their own edge cases before opening a PR, and communicate blockers early.",
          "If your team is hiring a Full-Stack Web, Mobile (React Native / Expo), or Software Engineering OJT intern for 500+ hours, I would love to walk you through my live codebases or take on a technical assessment.",
        ],
      },
    ],
    keyTakeaways: [
      "500+ hour OJT availability for Full-Stack Web (Next.js / React) or Mobile (React Native / Expo).",
      "Comfortable with Git PR workflows, relational SQL schemas, RLS security, and REST APIs.",
      "Based in Batangas / Lipa City — open to On-site, Hybrid, or Remote setups.",
    ],
    deepLink: {
      label: "Send an OJT / Internship Message",
      action: { type: "section", sectionId: "contact-section" },
    },
  },
];
