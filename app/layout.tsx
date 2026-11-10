import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://richard-allen-portfolio.vercel.app"),
  title: "Richard Allen Liman | Full-Stack & Mobile Developer",
  description: "Portfolio of Richard Allen Liman, an Information Technology student and Full-Stack & Mobile Developer showcasing projects, skills, and experience.",
  keywords: [
    "Richard Allen Liman",
    "Richard Allen",
    "Full-Stack Developer",
    "IT Student Portfolio",
    "De La Salle Lipa",
    "React Native",
    "Next.js",
    "TypeScript",
    "Supabase",
    "OJT Portfolio",
    "Web Developer Philippines",
  ],
  authors: [{ name: "Richard Allen Liman" }],
  creator: "Richard Allen Liman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://richard-allen-portfolio.vercel.app",
    title: "Richard Allen Liman | Full-Stack & Mobile Developer",
    description: "Portfolio of Richard Allen Liman, an Information Technology student and Full-Stack & Mobile Developer showcasing projects, skills, and experience.",
    siteName: "Richard Allen Liman Portfolio",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Richard Allen Liman — Full-Stack & Mobile Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Richard Allen Liman | Full-Stack & Mobile Developer",
    description: "Information Technology student passionate about building practical, user-focused web and mobile applications.",
    images: ["/og-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans bg-white dark:bg-[#0A0A0B] text-[#111111] dark:text-[#F4F4F6] min-h-screen flex flex-col antialiased selection:bg-emerald-500/20 selection:text-emerald-400 transition-colors duration-200`}
      >
        {children}
      </body>
    </html>
  );
}
