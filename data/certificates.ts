export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** Only shown when explicitly provided */
  year?: string;
  /** Placeholder path under /public â€” replace with a real certificate scan anytime */
  image: string;
}

/**
 * Verified certifications only â€” exactly these five, nothing else.
 * Do not add IDs, verification URLs, dates, or descriptions that were not provided.
 */
export const certificatesData: Certificate[] = [
  {
    id: "python-essentials-1",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    image: "/certificates/python-essentials-1.png",
  },
  {
    id: "python-essentials-2",
    title: "Python Essentials 2",
    issuer: "Cisco Networking Academy",
    image: "/certificates/python-essentials-2.png",
  },
  {
    id: "ethical-hacking-data-analytics",
    title:
      "Bridging Ethical Hacking and Data Analytics: Building Smarter and Safer Systems",
    issuer: "De La Salle Lipa",
    year: "2026",
    image: "/certificates/ethical-hacking-data-analytics.png",
  },
  {
    id: "devroutes",
    title: "DevRoutes: Learning How to Learn with Roadmaps",
    issuer: "De La Salle Lipa / Swinburne University of Technology",
    year: "2026",
    image: "/certificates/devroutes.png",
  },
  {
    id: "ai-ethics-governance",
    title: "AI Ethics and Governance",
    issuer: "USAID / Asia Open RAN Academy",
    image: "/certificates/ai-ethics-governance.png",
  },
];