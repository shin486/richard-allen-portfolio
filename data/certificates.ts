export interface Certificate {
  id: string;
  title: string;
  shortTitle: string;
  issuer: string;
  caption: string;
  postDate: string;
  year?: string;
  image: string;
}

/**
 * Verified certifications only — presented as clean Instagram posts.
 */
export const certificatesData: Certificate[] = [
  {
    id: "python-essentials-1",
    title: "Python Essentials 1",
    shortTitle: "Python Essentials 1",
    issuer: "Cisco Networking Academy · Python Institute",
    caption:
      "Completed Python Essentials 1 via Cisco Networking Academy & OpenEDG Python Institute.",
    postDate: "APRIL 15, 2026",
    year: "2026",
    image: "/certificates/python-essentials-1.png",
  },
  {
    id: "python-essentials-2",
    title: "Python Essentials 2",
    shortTitle: "Python Essentials 2",
    issuer: "Cisco Networking Academy · Python Institute",
    caption:
      "Completed Python Essentials 2 covering OOP, modules, and standard library architecture.",
    postDate: "APRIL 15, 2026",
    year: "2026",
    image: "/certificates/python-essentials-2.png",
  },
  {
    id: "ethical-hacking-data-analytics",
    title:
      "Bridging Ethical Hacking and Data Analytics: Building Smarter and Safer Systems",
    shortTitle: "Ethical Hacking & Data",
    issuer: "De La Salle Lipa · Swinburne University",
    caption:
      "Building Smarter and Safer Systems seminar at the De La Salle Lipa Amphitheater.",
    postDate: "JANUARY 13, 2026",
    year: "2026",
    image: "/certificates/ethical-hacking-data-analytics.png",
  },
  {
    id: "devroutes",
    title: "DevRoutes: Learning How to Learn with Roadmaps",
    shortTitle: "DevRoutes",
    issuer: "JPCS — De La Salle Lipa Chapter",
    caption:
      "Developer roadmaps & engineering progression seminar at MB Auditorium, De La Salle Lipa.",
    postDate: "JANUARY 29, 2026",
    year: "2026",
    image: "/certificates/devroutes.png",
  },
  {
    id: "ai-ethics-governance",
    title: "AI Ethics and Governance",
    shortTitle: "AI Ethics & Governance",
    issuer: "USAID · Asia Open RAN Academy",
    caption:
      "Advancing Open RAN in Asia under the USAID Indo-Pacific Opportunity Program.",
    postDate: "OCTOBER 19, 2024",
    year: "2024",
    image: "/certificates/ai-ethics-governance.png",
  },
];
