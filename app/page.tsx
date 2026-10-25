"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Highlights } from "@/components/Highlights";
import { PortfolioTabs, PortfolioTabType } from "@/components/PortfolioTabs";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SkillsSection } from "@/components/SkillsSection";
import { CertificateGrid } from "@/components/CertificateGrid";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Reveal } from "@/components/Reveal";
import { HighlightViewer } from "@/components/highlights/HighlightViewer";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { certificatesData } from "@/data/certificates";
import { highlightsData } from "@/data/highlights";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("projects");

  // Instagram Story Highlight Viewer State
  const [isHighlightViewerOpen, setIsHighlightViewerOpen] = useState(false);
  const [selectedHighlightIndex, setSelectedHighlightIndex] = useState(0);

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

  const handleOpenHighlight = (index: number) => {
    setSelectedHighlightIndex(index);
    setIsHighlightViewerOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Layered Animated Background (radial glows + floating technical lines) */}
      <AnimatedBackground />

      {/* Sticky Top Navigation (entrance animation lives on the header itself to preserve stickiness) */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSelectTab={setActiveTab}
      />

      {/* Main Profile Layout Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 relative z-10">
        {/* Instagram Profile Header (entrance: after navbar) */}
        <div className="rise-in" style={{ animationDelay: "90ms" }}>
          <ProfileHeader
            onSelectTab={setActiveTab}
            onNavigateToSection={scrollToSection}
          />
        </div>

        {/* Story / Highlight Bubbles (entrance: after profile) */}
        <div className="rise-in" style={{ animationDelay: "180ms" }}>
          <Highlights onOpenHighlight={handleOpenHighlight} />
        </div>

        {/* Instagram Post & Navigation Tabs */}
        <div id="portfolio-tabs">
          <Reveal>
            <PortfolioTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              projectCount={projectsData.length}
              skillCategoriesCount={skillsData.length}
              certCount={certificatesData.length}
            />
          </Reveal>
        </div>

        {/* Active Tab Content — only renders the selected tab when clicked */}
        <div key={activeTab} className="animate-fade-in">
          {activeTab === "projects" && (
            <ProjectGrid
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
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

      {/* Full-Screen Instagram Highlight Viewer Overlay */}
      <HighlightViewer
        isOpen={isHighlightViewerOpen}
        initialHighlightIndex={selectedHighlightIndex}
        highlights={highlightsData}
        onClose={() => setIsHighlightViewerOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
