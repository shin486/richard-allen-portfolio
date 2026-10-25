import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { certificatesData } from "@/data/certificates";

// Construct system prompt grounded in verified portfolio data
const SYSTEM_PROMPT = `
You are "Byte" 🐾, the loyal AI Cyber-Pup and Portfolio Assistant for Richard Allen Liman (@shin486), an aspiring Full-Stack and Mobile Developer.
Your role is to answer questions from recruiters, hiring managers, and visitors about Richard's work, experience, technical stack, and availability in a warm, friendly, concise, and professional tone (with an occasional subtle, charming pup pun like "fetching details" or "pawsome" — keep it professional and never overdo it).

VERIFIED FACTS ABOUT RICHARD ALLEN LIMAN:
- Name: Richard Allen Liman (preferred name: Richard Allen, handle: @shin486)
- Education: Bachelor of Science in Information Technology (BSIT) at De La Salle Lipa (Lipa City, Batangas, Philippines). Expected Graduation: June 2027.
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
   - Description: ${p.description}
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
1. Be concise, polite, and enthusiastic. Use formatting (bullet points, bold text) where appropriate for easy reading.
2. Only speak about information grounded in the facts above. Do NOT invent companies, salaries, unverified metrics, or projects.
3. If asked about his availability or hiring, emphasize that he is actively open for OJT / internships and encourage reaching out via email at richardallenliman@gmail.com or his LinkedIn.
4. Keep answers brief (typically 2-4 sentences or a short bulleted list) so they fit nicely in a mobile chat interface.
`;

function getSmartFallbackReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("palengkehub") || lower.includes("capstone") || lower.includes("thesis")) {
    return `🐾 **PalengkeHub** is Richard's Capstone Thesis Project (${projectsData[0].year}). It's a mobile marketplace app bringing real-time commodity price transparency and pre-ordering to the Lipa City Public Market, built with **${projectsData[0].technologies.join(", ")}**. Richard served as the **${projectsData[0].role}**, building the mobile user flows, Supabase schema, and DTI price monitoring compliance logic.`;
  }

  if (lower.includes("shinpay") || lower.includes("payroll") || lower.includes("saas")) {
    return `🐾 **ShinPay+** is an in-progress multi-tenant payroll and HR SaaS application (${projectsData[1].year}). Built with **${projectsData[1].technologies.join(", ")}**, it implements tenant-aware data access control with **Supabase Row-Level Security (RLS)** to support Philippine statutory compliance (SSS, PhilHealth, Pag-IBIG, and BIR).`;
  }

  if (
    lower.includes("ojt") ||
    lower.includes("intern") ||
    lower.includes("available") ||
    lower.includes("hire") ||
    lower.includes("hiring") ||
    lower.includes("work") ||
    lower.includes("opportunity")
  ) {
    return `🐾 **Yes!** Richard is a 4th-year BS Information Technology student at **De La Salle Lipa** (graduating June 2027) and is **actively open for On-the-Job Training (OJT) and internship opportunities** in Full-Stack Web or Mobile Development. You can reach him directly at **richardallenliman@gmail.com** or on **LinkedIn**!`;
  }

  if (
    lower.includes("stack") ||
    lower.includes("skill") ||
    lower.includes("technolog") ||
    lower.includes("language") ||
    lower.includes("framework")
  ) {
    return `🐾 Here's what I fetched on Richard's core technical stack:\n\n• **Frontend & Mobile:** React, Next.js 14, React Native, TypeScript, Tailwind CSS\n• **Backend & Databases:** Supabase, PostgreSQL, Node.js, Express, PHP, MySQL, MongoDB\n• **Tools & Workflow:** Git, GitHub, Vercel, Vite, Figma, Expo`;
  }

  if (
    lower.includes("certificate") ||
    lower.includes("certification") ||
    lower.includes("cisco") ||
    lower.includes("ccna")
  ) {
    return `🐾 Richard holds **5 verified technical certifications**:\n\n• **CCNA: Enterprise Networking, Security, and Automation** (Cisco)\n• **CCNA: Switching, Routing, and Wireless Essentials** (Cisco)\n• **Legacy Responsive Web Design V8** (freeCodeCamp)\n• **Work Immersion Program (80 Hours)** (Creotec Philippines Inc.)\n• **12th Citezen's General Assembly & Tutorial** (DLSL)`;
  }

  if (
    lower.includes("school") ||
    lower.includes("educat") ||
    lower.includes("college") ||
    lower.includes("university") ||
    lower.includes("dlsl") ||
    lower.includes("la salle") ||
    lower.includes("student")
  ) {
    return `🐾 Richard is pursuing his **Bachelor of Science in Information Technology (BSIT)** at **De La Salle Lipa** (2023 – June 2027), focusing on scalable web systems, mobile application architecture, and database design. He is also an active member of the **Junior Philippine Computer Society (JPCS) - DLSL Chapter**.`;
  }

  if (
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("reach") ||
    lower.includes("linkedin") ||
    lower.includes("github")
  ) {
    return `🐾 You can get in touch with Richard directly via:\n\n• **Email:** richardallenliman@gmail.com\n• **GitHub:** https://github.com/shin486\n• **LinkedIn:** https://www.linkedin.com/in/allenliman`;
  }

  if (
    lower.includes("auto avenue") ||
    lower.includes("inventory") ||
    lower.includes("ims")
  ) {
    return `🐾 **Auto Avenue** is a centralized web-based Inventory Management System (IMS) developed for Auto Avenue Car Care Center in Mataas na Kahoy, Batangas, integrating with their POS system for real-time stock updates. Built with **PHP, MySQL, Bootstrap, and Git**.`;
  }

  if (
    lower.includes("visitor") ||
    lower.includes("avms") ||
    lower.includes("itsm")
  ) {
    return `🐾 **Automated Visitor Management System (AVMS)** is an IT Service Management (ITSM) project featuring online pre-registration, QR-coded badges, access levels, and a 99.9% uptime SLA with RBAC, MFA, and audit logs.`;
  }

  if (lower.includes("crave cart") || lower.includes("food")) {
    return `🐾 **Crave Cart** is a lightweight web food ordering system featuring a digital menu browser, cart management, Google Maps integration, and a local file-handling feedback system built with **Node.js, HTML, CSS, and JavaScript**.`;
  }

  if (lower.includes("elective 4") || lower.includes("gemini")) {
    return `🐾 **IT Elective 4 Project** is a full-stack React + Express + MongoDB app with JWT authentication, tenant isolation, and a live Google Gemini AI endpoint (POST /api/ai) returning Zod-validated structured reviews. Deployed on Vercel!`;
  }

  if (lower.includes("project") || lower.includes("built") || lower.includes("portfolio")) {
    return `🐾 Richard has built **6 official projects**:\n\n1. **PalengkeHub** — Mobile Market & Price Transparency App (React Native, Supabase)\n2. **ShinPay+** — Multi-Tenant Payroll & HR SaaS (Next.js, TypeScript, Supabase)\n3. **IT Elective 4 Project** — Full-Stack App + Gemini AI API (React, Express, MongoDB)\n4. **Auto Avenue** — Web Inventory Management System (PHP, MySQL)\n5. **AVMS** — Automated Visitor Management System (ITSM / QR Check-in)\n6. **Crave Cart** — Web Food Ordering System (Node.js, JS)\n\nAsk me about any of these and I'll fetch the details!`;
  }

  return `Woof! 🐾 I'm **Byte**, Richard's AI Cyber-Pup! Richard is an aspiring Full-Stack and Mobile Developer (BSIT student at **De La Salle Lipa**, graduating June 2027) who is actively seeking **OJT / internship opportunities**. Feel free to ask me to fetch details on his **6 projects** (PalengkeHub, ShinPay+, IT Elective 4, Auto Avenue, AVMS, Crave Cart), his **tech stack**, or his **certifications**!`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = typeof body?.message === "string" ? body.message : "";

    if (!message.trim()) {
      return NextResponse.json(
        { reply: getSmartFallbackReply("hello") },
        { status: 200 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is available, try calling Google Gemini AI (with automatic fallback on any model/quota error)
    if (apiKey && apiKey !== "your_gemini_api_key_here") {
      const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
      const genAI = new GoogleGenerativeAI(apiKey);

      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: SYSTEM_PROMPT,
          });

          const result = await model.generateContent(message);
          const reply = result.response.text();
          if (reply && reply.trim()) {
            return NextResponse.json({ reply });
          }
        } catch (geminiErr) {
          console.warn(`Gemini model ${modelName} failed, trying next or fallback:`, geminiErr);
        }
      }
    }

    // Reliable built-in response grounded in Richard's portfolio data
    const reply = getSmartFallbackReply(message);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI chat route error, using fallback:", error);
    return NextResponse.json({
      reply: getSmartFallbackReply(""),
    });
  }
}
