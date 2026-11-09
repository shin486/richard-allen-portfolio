export interface CertificateSignatory {
  name: string;
  role: string;
}

export interface CertificateImageTag {
  /** Horizontal position (0-100%) on the certificate scan */
  x: number;
  /** Vertical position (0-100%) on the certificate scan */
  y: number;
  handle: string;
  sublabel: string;
  type: "issuer" | "credential" | "signatory" | "serial" | "project";
  projectId?: string;
}

export interface CertificateProjectApplication {
  projectId: string;
  projectTitle: string;
  handle: string;
  applicationSummary: string;
}

export interface Certificate {
  id: string;
  title: string;
  shortTitle: string;
  issuer: string;
  coIssuer?: string;
  awardedTo: string;
  /** Exact date printed on the certificate scan */
  issuedDate: string;
  year: string;
  venue?: string;
  /** Official serial / UUID when printed on the certificate scan */
  credentialId?: string;
  domain: string;
  accentColor: string;
  /** Path under /public/certificates */
  image: string;
  /** Official signatories printed on the certificate scan */
  signatories: CertificateSignatory[];
  /** Keycap IDs on the 3D Mechanical Keyboard to highlight/trigger */
  keyboardKeys: { id: string; label: string }[];
  /** Core engineering competencies validated by this certification */
  competencies: string[];
  /** Portfolio projects where these skills are applied */
  appliedProjects: CertificateProjectApplication[];
  /** Instagram-style interactive image tag pins */
  imageTags: CertificateImageTag[];
}

/**
 * Verified certifications only — metadata extracted directly from the 5 official certificate scans.
 */
export const certificatesData: Certificate[] = [
  {
    id: "python-essentials-1",
    title: "Python Essentials 1",
    shortTitle: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    coIssuer: "Python Institute (OpenEDG)",
    awardedTo: "Allen Liman",
    issuedDate: "15 Apr 2026",
    year: "2026",
    credentialId: "a96d7bca-5b46-4ede-b8ca-3a6f2ae88448",
    domain: "Backend & Core Programming",
    accentColor: "#0284C7",
    image: "/certificates/python-essentials-1.png",
    signatories: [
      {
        name: "Lynn Bloomer",
        role: "Director, Cisco Networking Academy",
      },
    ],
    keyboardKeys: [
      { id: "python", label: "Python" },
      { id: "sql", label: "SQL" },
      { id: "linux", label: "Linux CLI" },
      { id: "git-github", label: "Git" },
    ],
    competencies: [
      "Algorithmic control flow, bitwise operations, and structured data collections (lists, tuples, dictionaries)",
      "Functional decomposition, recursion, scoping rules, and structured exception handling",
      "PEP-8 compliant runtime execution and deterministic data processing pipelines",
    ],
    appliedProjects: [
      {
        projectId: "shinpay-plus",
        projectTitle: "ShinPay+",
        handle: "@shinpay_plus",
        applicationSummary:
          "Deterministic statutory payroll formulas, bracket lookups, and zero-allocation deduction logic.",
      },
      {
        projectId: "auto-avenue-ims",
        projectTitle: "Auto Avenue IMS",
        handle: "@auto_avenue",
        applicationSummary:
          "Automated stock reorder threshold calculations and transactional inventory synchronization.",
      },
    ],
    imageTags: [
      {
        x: 24,
        y: 14,
        handle: "@cisco.netacad × @python.institute",
        sublabel: "Issuing Authorities",
        type: "issuer",
      },
      {
        x: 50,
        y: 46,
        handle: "Python Essentials 1",
        sublabel: "Core Python & Algorithmic Foundations",
        type: "credential",
      },
      {
        x: 20,
        y: 80,
        handle: "Lynn Bloomer",
        sublabel: "Director · Cisco Networking Academy",
        type: "signatory",
      },
      {
        x: 50,
        y: 93,
        handle: "ID: a96d7bca...8448",
        sublabel: "Tap to Copy Verified UUID",
        type: "serial",
      },
      {
        x: 80,
        y: 82,
        handle: "Applied → @shinpay_plus",
        sublabel: "Tap to inspect project",
        type: "project",
        projectId: "shinpay-plus",
      },
    ],
  },
  {
    id: "python-essentials-2",
    title: "Python Essentials 2",
    shortTitle: "Python Essentials 2",
    issuer: "Cisco Networking Academy",
    coIssuer: "Python Institute (OpenEDG)",
    awardedTo: "Allen Liman",
    issuedDate: "15 Apr 2026",
    year: "2026",
    credentialId: "ead984f7-22b0-40be-a170-039a1e436394",
    domain: "OOP Architecture & Modules",
    accentColor: "#0D9488",
    image: "/certificates/python-essentials-2.png",
    signatories: [
      {
        name: "Lynn Bloomer",
        role: "Director, Cisco Networking Academy",
      },
    ],
    keyboardKeys: [
      { id: "python", label: "Python" },
      { id: "postgresql", label: "PostgreSQL" },
      { id: "node-express", label: "Node/Express" },
      { id: "vscode", label: "VS Code" },
    ],
    competencies: [
      "Object-Oriented Programming (OOP), class hierarchies, inheritance, polymorphism, and encapsulation",
      "Modular package architecture, file I/O binary/text streams, closures, and custom exception trees",
      "Iterators, generators, list comprehensions, and standard library system interfaces",
    ],
    appliedProjects: [
      {
        projectId: "palengkehub",
        projectTitle: "PalengkeHub",
        handle: "@palengkehub",
        applicationSummary:
          "Modular service architecture, offline queue serialization, and real-time stall price synchronization.",
      },
      {
        projectId: "itelect4-project",
        projectTitle: "IT Elective 4",
        handle: "@itelect4_api",
        applicationSummary:
          "Object-oriented REST controller patterns, payload validation, and structured error middleware.",
      },
    ],
    imageTags: [
      {
        x: 24,
        y: 14,
        handle: "@cisco.netacad × @python.institute",
        sublabel: "OpenEDG Python Institute",
        type: "issuer",
      },
      {
        x: 50,
        y: 46,
        handle: "Python Essentials 2",
        sublabel: "Advanced OOP, Streams & Modules",
        type: "credential",
      },
      {
        x: 20,
        y: 80,
        handle: "Lynn Bloomer",
        sublabel: "Director · Cisco Networking Academy",
        type: "signatory",
      },
      {
        x: 50,
        y: 93,
        handle: "ID: ead984f7...6394",
        sublabel: "Tap to Copy Verified UUID",
        type: "serial",
      },
      {
        x: 80,
        y: 82,
        handle: "Applied → @palengkehub",
        sublabel: "Tap to inspect project",
        type: "project",
        projectId: "palengkehub",
      },
    ],
  },
  {
    id: "ethical-hacking-data-analytics",
    title:
      "Bridging Ethical Hacking and Data Analytics: Building Smarter and Safer Systems",
    shortTitle: "Ethical Hacking & Data Analytics",
    issuer: "De La Salle Lipa",
    coIssuer: "Swinburne University of Technology, Australia",
    awardedTo: "Richard Allen Liman",
    issuedDate: "13 Jan 2026",
    year: "2026",
    venue: "De La Salle Lipa Amphitheater",
    domain: "Cybersecurity & Data Analytics",
    accentColor: "#10B981",
    image: "/certificates/ethical-hacking-data-analytics.png",
    signatories: [
      {
        name: "Engr. Cherrie F. Villafuerte",
        role: "Dean, College of Information Technology and Engineering (CITE)",
      },
      {
        name: "Dr. Caslon Chua",
        role: "Department Chair, Computing Technologies · Swinburne University of Technology, Australia",
      },
    ],
    keyboardKeys: [
      { id: "supabase", label: "Supabase RLS" },
      { id: "postgresql", label: "PostgreSQL" },
      { id: "sql", label: "SQL" },
      { id: "powerbi-uipath", label: "Analytics" },
    ],
    competencies: [
      "Defensive system hardening, vulnerability surface analysis, and zero-trust access control",
      "Security telemetry, encrypted audit trails, and data-driven anomaly detection",
      "Multi-tenant database isolation using Row-Level Security (RLS) and role-based permissions",
    ],
    appliedProjects: [
      {
        projectId: "shinpay-plus",
        projectTitle: "ShinPay+",
        handle: "@shinpay_plus",
        applicationSummary:
          "PostgreSQL Row-Level Security (RLS) policies isolating enterprise payroll tenants at the database engine layer.",
      },
      {
        projectId: "avms",
        projectTitle: "AVMS",
        handle: "@avms_security",
        applicationSummary:
          "Role-Based Access Control (RBAC), Multi-Factor Authentication (MFA), and encrypted campus visitor audit logs.",
      },
    ],
    imageTags: [
      {
        x: 16,
        y: 22,
        handle: "@dlsl.cite × @swinburne",
        sublabel: "De La Salle Lipa & Swinburne Australia",
        type: "issuer",
      },
      {
        x: 58,
        y: 53,
        handle: "Ethical Hacking & Data Analytics",
        sublabel: "13 Jan 2026 · DLSL Amphitheater",
        type: "credential",
      },
      {
        x: 43,
        y: 73,
        handle: "Engr. Cherrie F. Villafuerte",
        sublabel: "Dean · CITE, De La Salle Lipa",
        type: "signatory",
      },
      {
        x: 74,
        y: 73,
        handle: "Dr. Caslon Chua",
        sublabel: "Dept. Chair · Swinburne Univ. Australia",
        type: "signatory",
      },
      {
        x: 58,
        y: 36,
        handle: "Applied → @avms & @shinpay_plus",
        sublabel: "RLS, RBAC & MFA Security · Tap to inspect",
        type: "project",
        projectId: "avms",
      },
    ],
  },
  {
    id: "devroutes",
    title: "DevRoutes: Learning How to Learn with Roadmaps",
    shortTitle: "DevRoutes: Engineering Roadmaps",
    issuer: "De La Salle Lipa / Swinburne University of Technology",
    coIssuer: "Junior Philippine Computer Society (JPCS — DLSL Chapter)",
    awardedTo: "Richard Allen Liman",
    issuedDate: "29 Jan 2026",
    year: "2026",
    venue: "MB Auditorium, De La Salle Lipa",
    domain: "Software Engineering & Roadmaps",
    accentColor: "#E11D48",
    image: "/certificates/devroutes.png",
    signatories: [
      {
        name: "Daniel Luis P. Sahagun",
        role: "Executive President, JPCS — De La Salle Chapter",
      },
      {
        name: "Franze V. Garcia",
        role: "Adviser, JPCS — De La Salle Chapter",
      },
    ],
    keyboardKeys: [
      { id: "react", label: "React" },
      { id: "nextjs", label: "Next.js 14" },
      { id: "react-native", label: "React Native" },
      { id: "git-github", label: "Git & GitHub" },
    ],
    competencies: [
      "Structured full-stack and mobile engineering progression from fundamentals to production deployment",
      "Modern ecosystem architecture selection (Next.js App Router, React Native, TypeScript, Cloud BaaS)",
      "Collaborative version control, iterative milestone delivery, and technical documentation",
    ],
    appliedProjects: [
      {
        projectId: "palengkehub",
        projectTitle: "PalengkeHub",
        handle: "@palengkehub",
        applicationSummary:
          "Full-lifecycle capstone execution from Figma UX prototyping to React Native mobile app and Supabase backend.",
      },
      {
        projectId: "shinpay-plus",
        projectTitle: "ShinPay+",
        handle: "@shinpay_plus",
        applicationSummary:
          "Modern SaaS stack adoption combining Next.js 14 Server Actions, TypeScript strict contracts, and Vercel CI/CD.",
      },
    ],
    imageTags: [
      {
        x: 50,
        y: 13,
        handle: "@jpcs.dlsl",
        sublabel: "Junior Philippine Computer Society",
        type: "issuer",
      },
      {
        x: 50,
        y: 68,
        handle: "DevRoutes · 29 Jan 2026",
        sublabel: "MB Auditorium · De La Salle Lipa",
        type: "credential",
      },
      {
        x: 31,
        y: 86,
        handle: "Daniel Luis P. Sahagun",
        sublabel: "Executive President · JPCS",
        type: "signatory",
      },
      {
        x: 71,
        y: 86,
        handle: "Franze V. Garcia",
        sublabel: "Organization Adviser · JPCS",
        type: "signatory",
      },
      {
        x: 50,
        y: 47,
        handle: "Applied → @palengkehub",
        sublabel: "Full-Stack Capstone Roadmap · Tap to inspect",
        type: "project",
        projectId: "palengkehub",
      },
    ],
  },
  {
    id: "ai-ethics-governance",
    title: "AI Ethics and Governance",
    shortTitle: "AI Ethics & Governance",
    issuer: "USAID / Asia Open RAN Academy",
    coIssuer: "Indo-Pacific Opportunity Program (IPOP)",
    awardedTo: "Richard Allen Liman",
    issuedDate: "19 Oct 2024",
    year: "2024",
    venue: "Advancing Open RAN in Asia (O-RAN Activity)",
    domain: "AI Safety & Responsible LLM Systems",
    accentColor: "#2563EB",
    image: "/certificates/ai-ethics-governance.png",
    signatories: [
      {
        name: "Glenn F.J. Mackenzie-Frazer",
        role: "Chief of Party USAID-IPOP · SE Asia Director, International Development Group (IDG)",
      },
      {
        name: "Vincent B. Atienza",
        role: "Chairperson, Asia Open RAN Academy",
      },
    ],
    keyboardKeys: [
      { id: "nextjs", label: "Next.js 14" },
      { id: "react", label: "React" },
      { id: "supabase", label: "Supabase" },
      { id: "postman", label: "REST / AI API" },
    ],
    competencies: [
      "Responsible AI deployment, hallucination prevention, and grounded system-prompt boundaries",
      "Algorithmic transparency, user data privacy, and ethical AI governance in cloud/telecom systems",
      "Rate-limited, schema-validated LLM inference endpoints in production web applications",
    ],
    appliedProjects: [
      {
        projectId: "itelect4-project",
        projectTitle: "IT Elective 4",
        handle: "@itelect4_api",
        applicationSummary:
          "Grounded Google Gemini AI review endpoint (`POST /api/ai`) with strict JSON schema validation and rate limiting.",
      },
      {
        projectId: "palengkehub",
        projectTitle: "PalengkeHub",
        handle: "@palengkehub",
        applicationSummary:
          "Fair, transparent public market price discovery empowering local Lipa City consumers and stall vendors.",
      },
    ],
    imageTags: [
      {
        x: 17,
        y: 16,
        handle: "@usaid × @openran.asia",
        sublabel: "USAID Indo-Pacific Opportunity Program",
        type: "issuer",
      },
      {
        x: 50,
        y: 64,
        handle: "AI Ethics & Governance",
        sublabel: "19 Oct 2024 · Advancing Open RAN in Asia",
        type: "credential",
      },
      {
        x: 23,
        y: 86,
        handle: "Glenn F.J. Mackenzie-Frazer",
        sublabel: "Chief of Party · USAID-IPOP",
        type: "signatory",
      },
      {
        x: 76,
        y: 86,
        handle: "Vincent B. Atienza",
        sublabel: "Chairperson · Asia Open RAN Academy",
        type: "signatory",
      },
      {
        x: 80,
        y: 34,
        handle: "Applied → @itelect4_api",
        sublabel: "Grounded Gemini AI Endpoint · Tap to inspect",
        type: "project",
        projectId: "itelect4-project",
      },
    ],
  },
];
