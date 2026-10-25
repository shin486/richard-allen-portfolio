import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { certificatesData } from "@/data/certificates";
import { profileData } from "@/data/profile";

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

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is available, call Google Gemini AI
    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_PROMPT,
      });

      const result = await model.generateContent(message);
      const reply = result.response.text();

      return NextResponse.json({ reply });
    }

    // Graceful fallback when GEMINI_API_KEY is not yet added in environment variables
    const lower = message.toLowerCase();
    let reply = "";

    if (lower.includes("palengkehub")) {
      reply = `**PalengkeHub** is Richard's Capstone Thesis Project (${projectsData[0].year}). It's a mobile marketplace app bringing real-time commodity price transparency and pre-ordering to the Lipa City Public Market, built with **${projectsData[0].technologies.join(", ")}**. Richard served as the ${projectsData[0].role}.`;
    } else if (lower.includes("shinpay")) {
      reply = `**ShinPay+** is an in-progress multi-tenant payroll and HR SaaS application (${projectsData[1].year}). Built with **${projectsData[1].technologies.join(", ")}**, it implements tenant-aware data access control with Supabase Row-Level Security (RLS) to support Philippine statutory compliance.`;
    } else if (
      lower.includes("ojt") ||
      lower.includes("internship") ||
      lower.includes("available") ||
      lower.includes("hire")
    ) {
      reply = `**Yes!** Richard is currently a 4th-year BS Information Technology student at **De La Salle Lipa** (graduating June 2027) and is **actively open for On-the-Job Training (OJT) and internship opportunities**. You can connect with him directly at **richardallenliman@gmail.com** or via LinkedIn!`;
    } else if (
      lower.includes("stack") ||
      lower.includes("skill") ||
      lower.includes("technolog")
    ) {
      reply = `Richard's core technical stack spans:\n\n• **Frontend & Mobile:** React, Next.js 14, React Native, TypeScript, Tailwind CSS\n• **Backend & Databases:** Supabase, PostgreSQL, Node.js, Express, MySQL, MongoDB\n• **Tools & Workflow:** Git, GitHub, Vercel, Vite, Figma, Expo`;
    } else if (
      lower.includes("contact") ||
      lower.includes("email") ||
      lower.includes("reach")
    ) {
      reply = `You can get in touch with Richard directly via:\n\n• **Email:** richardallenliman@gmail.com\n• **GitHub:** https://github.com/shin486\n• **LinkedIn:** https://www.linkedin.com/in/allenliman`;
    } else if (
      lower.includes("auto avenue") ||
      lower.includes("inventory") ||
      lower.includes("ims")
    ) {
      reply = `**Auto Avenue** is a centralized web-based Inventory Management System (IMS) developed for Auto Avenue Car Care Center in Mataas na Kahoy, Batangas, integrating with their POS system for real-time stock updates. Built with **PHP, MySQL, Bootstrap, and Git**.`;
    } else if (
      lower.includes("visitor") ||
      lower.includes("avms") ||
      lower.includes("itsm")
    ) {
      reply = `**Automated Visitor Management System (AVMS)** is an IT Service Management (ITSM) project featuring online pre-registration, QR-coded badges, access levels, and a 99.9% uptime SLA with RBAC, MFA, and audit logs.`;
    } else if (lower.includes("crave cart") || lower.includes("food")) {
      reply = `**Crave Cart** is a lightweight web food ordering system featuring a digital menu browser, cart management, Google Maps integration, and a local file-handling feedback system built with **Node.js, HTML, CSS, and JavaScript**.`;
    } else if (lower.includes("elective 4") || lower.includes("gemini")) {
      reply = `**IT Elective 4 Project** is a full-stack React + Express + MongoDB app with JWT authentication, tenant isolation, and a live Google Gemini AI endpoint (POST /api/ai) returning Zod-validated structured reviews. Deployed on Vercel!`;
    } else {
      reply = `Woof! 🐾 I'm **Byte**, Richard's AI Cyber-Pup! Richard is an aspiring Full-Stack and Mobile Developer (BSIT student at **De La Salle Lipa**, graduating June 2027) who is actively seeking **OJT / internship opportunities**. Feel free to ask me to fetch details on his **6 projects** (PalengkeHub, ShinPay+, IT Elective 4, Auto Avenue, AVMS, Crave Cart) or his **tech stack**!`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message." },
      { status: 500 }
    );
  }
}

