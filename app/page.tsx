"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Highlights } from "@/components/Highlights";
import { HighlightViewer } from "@/components/highlights/HighlightViewer";
import { PortfolioTabs, PortfolioTabType } from "@/components/PortfolioTabs";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SkillsSection } from "@/components/SkillsSection";
import { CertificateGrid } from "@/components/CertificateGrid";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { AiChatDrawer } from "@/components/AiChatDrawer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Reveal } from "@/components/Reveal";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { certificatesData } from "@/data/certificates";
import { highlightsData } from "@/data/highlights";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("projects");

  // Lets the Journey Timeline jump the Projects carousel to a specific project
  const [projectFocus, setProjectFocus] = useState<{
    projectId: string;
    nonce: number;
  } | null>(null);

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);

  const handleOpenHighlight = (index: number) => {
    setActiveHighlightIndex(index);
    setIsViewerOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const targetId =
      sectionId === "portfolio-grid" ||
      sectionId === "skills-section" ||
      sectionId === "certificates-section" ||
      sectionId === "about-section"
        ? "portfolio-tabs"
        : sectionId;

    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const navOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 30);
  };

  const handleTabChange = (tab: PortfolioTabType) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && activeTab !== "projects") {
      setActiveTab("projects");
      scrollToSection("portfolio-grid");
    }
  };

  const handleViewProject = (projectId: string) => {
    setSearchQuery("");
    setActiveTab("projects");
    setProjectFocus({ projectId, nonce: Date.now() });
    scrollToSection("portfolio-grid");
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Layered Animated Background (radial glows + floating technical lines) */}
      <AnimatedBackground />

      {/* Fixed Desktop Left Sidebar Rail + Mobile Sticky Top Bar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Editorial Content Column (offset by fixed sidebar on lg+) */}
      <div className="flex-1 lg:pl-60 xl:pl-64 dot-grid min-h-screen flex flex-col relative z-10">
        <main className="flex-1 max-w-3xl w-full mx-auto px-5 sm:px-8 py-4 sm:py-6">
          {/* Minimalist Editorial Profile Hero + 2x3 Hairline Matrix */}
          <div className="rise-in" style={{ animationDelay: "90ms" }}>
            <ProfileHeader
              onSelectTab={setActiveTab}
              onNavigateToSection={scrollToSection}
              onOpenHighlight={handleOpenHighlight}
            />
          </div>

          {/* Compact Minimalist Story Highlights Strip */}
          <div className="rise-in" style={{ animationDelay: "160ms" }}>
            <Highlights onOpenHighlight={handleOpenHighlight} />
          </div>

          {/* Numbered Monospace Portfolio Navigation Tabs */}
          <div id="portfolio-tabs">
            <Reveal>
              <PortfolioTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
                projectCount={projectsData.length}
                skillCategoriesCount={skillsData.reduce(
                  (total, cat) => total + cat.skills.length,
                  0
                )}
                certCount={certificatesData.length}
              />
            </Reveal>
          </div>

          {/* Active Tab Content — only renders the selected tab when clicked */}
          <div key={activeTab} className="stagger-item">
            {activeTab === "projects" && (
              <ProjectGrid
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                focusRequest={projectFocus}
              />
            )}

            {activeTab === "skills" && <SkillsSection />}

            {activeTab === "certificates" && <CertificateGrid />}

            {activeTab === "about" && <AboutSection />}
          </div>

          {/* Contact / Direct Message Section */}
          <Reveal>
            <ContactSection />
          </Reveal>
        </main>

        {/* Footer aligned with main column */}
        <Footer />
      </div>

      {/* Instagram Story Viewer Modal */}
      <HighlightViewer
        isOpen={isViewerOpen}
        initialHighlightIndex={activeHighlightIndex}
        highlights={highlightsData}
        onClose={() => setIsViewerOpen(false)}
      />

      {/* Instagram DM AI Portfolio Assistant */}
      <AiChatDrawer />
    </div>
  );
}
