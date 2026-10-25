import { NextResponse } from "next/server";
import { projectsData, Project } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { certificatesData } from "@/data/certificates";

export const dynamic = "force-dynamic";

// Construct system prompt grounded in verified portfolio data
const SYSTEM_PROMPT = `
You are "Byte" 🐾, the friendly, intelligent AI Cyber-Pup and Portfolio Assistant for Richard Allen Liman (@shin486), an aspiring Full-Stack and Mobile Developer.
Speak naturally, conversationally, and directly to the user (like ChatGPT or Gemini), with a warm and helpful tone. Never output your internal reasoning, prompt analysis, or meta-notes — only output your direct conversational reply to the user.

VERIFIED FACTS ABOUT RICHARD ALLEN LIMAN:
- Name: Richard Allen Liman (preferred name: Richard Allen, handle: @shin486)
- Education: Bachelor of Science in Information Technology (BSIT) at De La Salle Lipa (Lipa City, Batangas, Philippines), 2023 – June 2027 (Expected Graduation: June 2027).
- Organization: Active Member, Junior Philippine Computer Society (JPCS) - De La Salle Lipa Chapter (2023 – Present).
- Career Goal: Open and actively seeking On-the-Job Training (OJT), internship, and junior full-stack / mobile developer opportunities.
- Contact: richardallenliman@gmail.com | GitHub: https://github.com/shin486 | LinkedIn: https://www.linkedin.com/in/allenliman

OFFICIAL PROJECTS (Exactly these 6):
${projectsData
  .map(
    (p, i) => `
${i + 1}. ${p.title} (${p.subtitle})
   - Role: ${p.role}
   - Timeline / Date: ${p.year}
   - Category: ${p.category}
   - Tech Stack: ${p.technologies.join(", ")}
   - What Richard Did / Description: ${p.description}
   ${p.operationsNote ? `- Operations / ITSM: ${p.operationsNote}` : ""}
   ${p.keyFeatures ? `- Key Features: ${p.keyFeatures.join("; ")}` : ""}
   ${p.githubUrl ? `- GitHub: ${p.githubUrl}` : ""}
`
  )
  .join("")}

TECHNICAL SKILLS:
${skillsData
  .map(
    (cat) =>
      `- ${cat.title}: ${cat.skills.map((s) => `${s.name}${s.usedIn ? ` (used in ${s.usedIn.join(", ")})` : ""}`).join("; ")}`
  )
  .join("\n")}

CERTIFICATIONS:
${certificatesData.map((c) => `- ${c.title} (Issued by: ${c.issuer}${c.year ? `, ${c.year}` : ""})`).join("\n")}

GUIDELINES FOR YOUR RESPONSES:
1. Respond directly and conversationally to the user's message. Never include "* User Input:", "* Persona:", or internal chain-of-thought notes.
2. If the user asks about multiple projects (e.g., "what did Richard do in ShinPay+ and PalengkeHub"), address ALL mentioned projects clearly.
3. Only speak about information grounded in the facts above. Do NOT invent companies, salaries, unverified metrics, or projects.
4. If asked about his availability or hiring, emphasize that he is actively open for OJT / internships and encourage reaching out via email at richardallenliman@gmail.com or his LinkedIn.
5. Keep answers well-structured (using bold text and bullet points • where helpful) and concise.
`;

interface HistoryItem {
  sender: "user" | "bot";
  text: string;
}

/**
 * Multi-intent synthesizer fallback when no external LLM API key is configured or rate-limited.
 */
function synthesizePortfolioReply(message: string, history: HistoryItem[] = []): string {
  const lower = message.toLowerCase().trim();

  const projectMatchers: { project: Project; keywords: string[]; whatHeDid: string }[] = [
    {
      project: projectsData[0], // PalengkeHub
      keywords: ["palengkehub", "palengke", "capstone", "thesis", "public market", "market app"],
      whatHeDid:
        "Served as **Full-Stack Developer**, building the React Native mobile marketplace for consumer price viewing, stall locating, and pre-ordering, plus integrating **Supabase** authentication and database operations across consumer, vendor, and administrator workflows (product management, transaction processing, and admin reporting).",
    },
    {
      project: projectsData[1], // ShinPay+
      keywords: ["shinpay", "shin pay", "payroll", "hr saas", "multi-tenant", "multitenant"],
      whatHeDid:
        "Serving as **Full-Stack Developer**, architecting the multi-tenant payroll and HR SaaS using **Next.js 14 App Router** and **TypeScript**, implementing **Supabase PostgreSQL** database services, authentication, file storage, and tenant-aware **Row-Level Security (RLS)** for Philippine statutory compliance, deployed on Vercel.",
    },
    {
      project: projectsData[2], // IT Elective 4 Project
      keywords: ["elective 4", "itelect4", "it elective 4", "gemini", "zod"],
      whatHeDid:
        "Served as **Full-Stack Developer**, building a **React + Express + MongoDB** app with JWT-authenticated CRUD, protected routes, and tenant-isolated data, and integrating a live **Google Gemini AI** endpoint (`POST /api/ai`) with Zod-validated JSON reviews and rate limiting, deployed on Vercel.",
    },
    {
      project: projectsData[3], // Auto Avenue
      keywords: ["auto avenue", "inventory", "ims", "car care", "pos"],
      whatHeDid:
        "Served as **Full-Stack Developer**, developing a centralized web-based Inventory Management System (**PHP, MySQL, Bootstrap**) for Auto Avenue Car Care Center in Mataas na Kahoy, Batangas, integrating directly with their Point of Sale (POS) system for real-time stock updates and automated reordering alerts.",
    },
    {
      project: projectsData[4], // AVMS
      keywords: ["avms", "visitor", "itsm", "qr", "service management"],
      whatHeDid:
        "Engineered an **IT Service Management (ITSM)** campus visitor management system featuring online pre-registration, QR-coded access badges, visitor category access levels, SMS/email host alerts, a **99.9% uptime SLA**, and RBAC, MFA, encryption, and audit logs.",
    },
    {
      project: projectsData[5], // Crave Cart
      keywords: ["crave cart", "cravecart", "food ordering", "food", "elective 1"],
      whatHeDid:
        "Served as **Full-Stack Developer**, building a web-based food ordering system (**Node.js, HTML, CSS, JavaScript**) with an interactive digital menu browser, cart management, order confirmation, Google Maps store locator, and a local file-handling customer feedback system.",
    },
  ];

  let matchedEntries = projectMatchers.filter((entry) =>
    entry.keywords.some((kw) => lower.includes(kw))
  );

  if (
    matchedEntries.length === 0 &&
    history.length > 0 &&
    /\b(it|its|that|those|them|both|he do there|role there|tech stack for that)\b/.test(lower)
  ) {
    const lastContext = history
      .slice(-2)
      .map((h) => h.text.toLowerCase())
      .join(" ");
    matchedEntries = projectMatchers.filter((entry) =>
      entry.keywords.some((kw) => lastContext.includes(kw))
    );
  }

  const isAskingWhatHeDidOrRole =
    /\b(what did richard do|what did he do|what does he do|his role|role in|contribute|contribution|responsible|how did he build|what he built|work on|did in)\b/.test(
      lower
    );
  const isAskingTechStack =
    /\b(tech|stack|technolog|built with|language|framework|database|tool|use in|used in)\b/.test(
      lower
    );
  const isAskingGithubOrLink =
    /\b(github|repo|repository|source code|link|url|code)\b/.test(lower);
  const isAskingWhenOrTimeline =
    /\b(when|date|year|timeline|how long|started|completed)\b/.test(lower);

  if (matchedEntries.length > 0) {
    if (matchedEntries.length > 1) {
      const intro = isAskingWhatHeDidOrRole
        ? `🐾 Here is what Richard did as **Full-Stack Developer** in ${matchedEntries.map((m) => `**${m.project.title}**`).join(" and ")}:`
        : isAskingTechStack
        ? `🐾 Here is the tech stack Richard used in ${matchedEntries.map((m) => `**${m.project.title}**`).join(" and ")}:`
        : `🐾 Here are the details on ${matchedEntries.map((m) => `**${m.project.title}**`).join(" and ")}:`;

      const bullets = matchedEntries.map(({ project, whatHeDid }) => {
        if (isAskingWhatHeDidOrRole) {
          return `• **${project.title}** (${project.year}): ${whatHeDid}`;
        }
        if (isAskingTechStack) {
          return `• **${project.title}:** Built with **${project.technologies.join(", ")}** — ${project.subtitle}.`;
        }
        if (isAskingGithubOrLink) {
          return `• **${project.title}:** ${project.githubUrl ? project.githubUrl : "Private / In-Progress repository (demo available upon request)"}`;
        }
        if (isAskingWhenOrTimeline) {
          return `• **${project.title}:** ${project.year} (${project.badge || project.category})`;
        }
        return `• **${project.title}** (${project.subtitle}, ${project.year}): ${whatHeDid}`;
      });

      return `${intro}\n\n${bullets.join("\n\n")}`;
    }

    const { project, whatHeDid } = matchedEntries[0];
    if (isAskingWhatHeDidOrRole) {
      return `🐾 In **${project.title}** (${project.year}), Richard ${whatHeDid.charAt(0).toLowerCase() + whatHeDid.slice(1)}`;
    }
    if (isAskingTechStack) {
      return `🐾 **${project.title}** was built using **${project.technologies.join(", ")}**. ${whatHeDid}`;
    }
    if (isAskingGithubOrLink) {
      return project.githubUrl
        ? `🐾 You can check out the source code for **${project.title}** on GitHub: **${project.githubUrl}**`
        : `🐾 **${project.title}** is an ${project.inProgress ? "in-progress SaaS build" : "academic ITSM project"}, so its repository is private, but Richard is happy to walk through the architecture and demo it live!`;
    }
    if (isAskingWhenOrTimeline) {
      return `🐾 **${project.title}** timeline: **${project.year}** (${project.subtitle}).`;
    }

    return `🐾 **${project.title}** — *${project.subtitle}* (${project.year})\n\n• **What Richard Did:** ${whatHeDid}\n• **Tech Stack:** **${project.technologies.join(", ")}**${project.githubUrl ? `\n• **GitHub:** ${project.githubUrl}` : ""}`;
  }

  if (
    /\b(ojt|intern|internship|available|availability|hire|hiring|open to work|job|opportunity|recruit)\b/.test(
      lower
    )
  ) {
    return `🐾 **Yes!** Richard is a 4th-year BS Information Technology student at **De La Salle Lipa** (graduating June 2027) and is **actively open for On-the-Job Training (OJT) and internship opportunities** in Full-Stack Web or Mobile Development.\n\n• **Email:** richardallenliman@gmail.com\n• **LinkedIn:** https://www.linkedin.com/in/allenliman\n• **GitHub:** https://github.com/shin486`;
  }

  if (
    /\b(stack|skill|technolog|language|framework|database|frontend|backend|mobile|tools)\b/.test(
      lower
    )
  ) {
    return `🐾 Here's what I fetched on Richard's technical stack and where he used each tool:\n\n• **Frontend & Mobile:** React (IT Elective 4), Next.js 14 (ShinPay+), React Native (PalengkeHub), TypeScript (ShinPay+, IT Elective 4), JavaScript, Tailwind CSS, Bootstrap\n• **Backend & Databases:** Supabase & PostgreSQL (PalengkeHub, ShinPay+), Node.js & Express (IT Elective 4, Crave Cart), PHP & MySQL (Auto Avenue), MongoDB (IT Elective 4)\n• **Workflow & Security:** Git, GitHub, Vercel, Row-Level Security (RLS), JWT Auth, ITSM / RBAC`;
  }

  if (/\b(certificate|certification|certified|cisco|ccna|freecodecamp|creotec)\b/.test(lower)) {
    return `🐾 Richard holds **5 verified certifications**:\n\n• **CCNA: Enterprise Networking, Security, and Automation** — Cisco (2026)\n• **CCNA: Switching, Routing, and Wireless Essentials** — Cisco (2025)\n• **Legacy Responsive Web Design V8** — freeCodeCamp (2024)\n• **Work Immersion Program (80 Hours)** — Creotec Philippines Inc. (2023)\n• **12th Citezen's General Assembly & Tutorial** — De La Salle Lipa (2023)`;
  }

  if (
    /\b(school|educat|college|university|dlsl|la salle|degree|course|graduate|graduation|jpcs|organization)\b/.test(
      lower
    )
  ) {
    return `🐾 Richard is pursuing his **Bachelor of Science in Information Technology (BSIT)** at **De La Salle Lipa** in Lipa City, Batangas (2023 – June 2027). He is also an active member of the **Junior Philippine Computer Society (JPCS) - DLSL Chapter**.`;
  }

  if (/\b(contact|email|reach|linkedin|github|social|message)\b/.test(lower)) {
    return `🐾 You can reach Richard directly via:\n\n• **Email:** richardallenliman@gmail.com\n• **GitHub:** https://github.com/shin486\n• **LinkedIn:** https://www.linkedin.com/in/allenliman`;
  }

  if (
    /\b(project|built|portfolio|work|experience|what has he made|apps|applications)\b/.test(
      lower
    ) ||
    isAskingWhatHeDidOrRole
  ) {
    return `🐾 Richard has served as **Full-Stack Developer** across **6 official projects**:\n\n1. **PalengkeHub** (2025–2026) — Mobile public-market price transparency & pre-ordering app (**React Native, Supabase**)\n2. **ShinPay+** (2026–Present) — Multi-tenant payroll & HR SaaS with RLS (**Next.js 14, TypeScript, Supabase**)\n3. **IT Elective 4 Project** (2026–Present) — Full-stack JWT CRUD app + live Google Gemini AI endpoint (**React, Express, MongoDB**)\n4. **Auto Avenue** (2025) — Web Inventory Management System integrated with POS (**PHP, MySQL, Bootstrap**)\n5. **AVMS** (2024) — Automated Visitor Management System with QR badges & 99.9% SLA (**ITSM, RBAC & MFA**)\n6. **Crave Cart** — Web food ordering system with cart & Google Maps (**Node.js, JavaScript**)\n\nAsk me about any combination of these and I'll fetch the exact details!`;
  }

  if (/\b(who is richard|about richard|tell me about him|introduce|bio|summary)\b/.test(lower)) {
    return `🐾 **Richard Allen Liman (@shin486)** is a 4th-year **BS Information Technology** student at **De La Salle Lipa** (graduating June 2027) and an aspiring **Full-Stack & Mobile Developer**.\n\nHe has built **6 projects** spanning React Native mobile apps (**PalengkeHub**), multi-tenant Next.js/Supabase SaaS (**ShinPay+**), Express/MongoDB + Gemini AI (**IT Elective 4**), and PHP/MySQL inventory systems (**Auto Avenue**). He is currently **open for OJT and internship opportunities**!`;
  }

  return `Woof! 🐾 I'm **Byte**, Richard's AI Cyber-Pup! Here's a quick summary of what I can help you with:\n\n• **His 6 Projects:** PalengkeHub, ShinPay+, IT Elective 4 Project, Auto Avenue, AVMS, and Crave Cart\n• **His Role & Contributions:** Full-Stack Web & Mobile architecture, Supabase RLS, REST APIs, and database design\n• **Education & Availability:** 4th-year BSIT at **De La Salle Lipa** (June 2027), actively open for **OJT / internships**\n\nTry asking: *"What did Richard do in ShinPay+ and PalengkeHub?"* or *"Compare his mobile and web projects!"*`;
}

function sanitizeApiKey(raw?: string): string {
  if (!raw) return "";
  let cleaned = raw.trim();
  if (cleaned.includes("=")) {
    const parts = cleaned.split("=");
    if (parts[0].trim().toUpperCase().includes("KEY")) {
      cleaned = parts.slice(1).join("=").trim();
    }
  }
  cleaned = cleaned.replace(/^["'`]+|["'`]+$/g, "").trim();
  if (cleaned === "your_gemini_api_key_here") return "";
  return cleaned;
}

/**
 * Strips any leaked internal reasoning blocks if a model ever outputs meta-bullets
 */
function cleanModelOutput(rawText: string): string {
  let cleaned = rawText.trim();
  // Remove any lines starting with "* User Input:", "* Persona:", "* Goal:", etc.
  if (cleaned.includes("* User Input:") || cleaned.includes("* Persona:")) {
    const lines = cleaned.split("\n");
    const filtered = lines.filter(
      (line) =>
        !/^\s*\*\s*(User Input|Persona|Goal|Name|Role|Capabilities|Projects|Tone|Context|Analysis|Constraint|Plan):/i.test(
          line
        )
    );
    cleaned = filtered.join("\n").trim();
  }
  return cleaned;
}

/**
 * Calls Google Gemini REST API directly, disabling internal thinking tokens on 2.5 models
 * and filtering out `thought: true` parts so only the clean conversational response is returned.
 */
async function callGeminiRestApi(
  apiKey: string,
  message: string,
  history: HistoryItem[]
): Promise<{ reply?: string; error?: string; modelUsed?: string }> {
  const historyText =
    history.length > 0
      ? `\nCONVERSATION HISTORY:\n${history
          .slice(-6)
          .map((h) => `${h.sender === "user" ? "Visitor" : "Byte"}: ${h.text}`)
          .join("\n")}\n`
      : "";

  const fullPrompt = `${SYSTEM_PROMPT}${historyText}\nVisitor message: "${message}"\n\nRespond directly to the visitor as Byte (do not include any reasoning steps or meta notes):`;

  const candidateModels = [
    "models/gemini-2.5-flash",
    "models/gemini-2.5-flash-lite",
    "models/gemini-2.0-flash",
    "models/gemini-2.0-flash-lite",
    "models/gemini-flash-latest",
    "models/gemini-1.5-flash",
    "models/gemini-1.5-flash-latest",
    "models/gemma-3-27b-it",
  ];

  let modelsToTry = [...candidateModels];
  try {
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`,
      { method: "GET", cache: "no-store" }
    );
    if (listRes.ok) {
      const listData = await listRes.json();
      const available: string[] = (listData.models || [])
        .filter(
          (m: { name?: string; supportedGenerationMethods?: string[] }) =>
            m.name &&
            Array.isArray(m.supportedGenerationMethods) &&
            m.supportedGenerationMethods.includes("generateContent")
        )
        .map((m: { name: string }) => m.name);

      if (available.length > 0) {
        const prioritized = candidateModels.filter((c) => available.includes(c));
        const remaining = available.filter(
          (a) =>
            !prioritized.includes(a) &&
            (a.includes("gemini") || a.includes("gemma")) &&
            !a.includes("vision") &&
            !a.includes("embedding") &&
            !a.includes("tts") &&
            !a.includes("imagen")
        );
        modelsToTry = [...prioritized, ...remaining].slice(0, 5);
      }
    } else {
      const errBody = await listRes.text();
      return { error: `ListModels HTTP ${listRes.status}: ${errBody.slice(0, 200)}` };
    }
  } catch (e) {
    console.warn("Could not list Gemini models:", e);
  }

  let lastError = "";
  for (const modelPath of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/${modelPath}:generateContent?key=${encodeURIComponent(
        apiKey
      )}`;

      const is25Model = modelPath.includes("2.5");
      const generationConfig: Record<string, unknown> = {
        temperature: 0.6,
        maxOutputTokens: 1024,
      };
      if (is25Model) {
        generationConfig.thinkingConfig = { thinkingBudget: 0 };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: fullPrompt }],
            },
          ],
          generationConfig,
        }),
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        const rawParts: Array<{ text?: string; thought?: boolean }> =
          data?.candidates?.[0]?.content?.parts || [];

        // Filter out internal thinking parts (`thought: true`)
        const visibleParts = rawParts.filter((p) => !p.thought && typeof p.text === "string");
        const rawText = visibleParts.map((p) => p.text || "").join("").trim();
        const cleanedText = cleanModelOutput(rawText);

        if (cleanedText) {
          return { reply: cleanedText, modelUsed: modelPath };
        }
      } else {
        const errText = await res.text();
        lastError = `${modelPath} -> HTTP ${res.status}: ${errText.slice(0, 150)}`;
      }
    } catch (err) {
      lastError = `${modelPath} -> ${String(err)}`;
    }
  }

  return { error: lastError || "All candidate models failed" };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = typeof body?.message === "string" ? body.message : "";
    const history: HistoryItem[] = Array.isArray(body?.history) ? body.history : [];

    if (!message.trim()) {
      return NextResponse.json({
        reply: synthesizePortfolioReply("hello", history),
        source: "synthesizer",
      });
    }

    const rawKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const apiKey = sanitizeApiKey(rawKey);

    if (apiKey) {
      const geminiResult = await callGeminiRestApi(apiKey, message, history);
      if (geminiResult.reply) {
        return NextResponse.json({
          reply: geminiResult.reply,
          source: "gemini",
          model: geminiResult.modelUsed,
        });
      }
      console.warn("Gemini API fallback triggered:", geminiResult.error);
      return NextResponse.json({
        reply: synthesizePortfolioReply(message, history),
        source: "synthesizer",
        debugHint: geminiResult.error,
      });
    }

    return NextResponse.json({
      reply: synthesizePortfolioReply(message, history),
      source: "synthesizer",
      debugHint: "GEMINI_API_KEY environment variable is not set",
    });
  } catch (error) {
    console.error("AI chat route error:", error);
    return NextResponse.json({
      reply: synthesizePortfolioReply(""),
      source: "synthesizer",
    });
  }
}
