"use client";

import React from "react";
import Image from "next/image";
import { User, Code2, Sparkles, Laptop, Smartphone, GraduationCap, MapPin } from "lucide-react";
import { profileData } from "@/data/profile";

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-8 sm:py-10 border-t border-neutral-200 dark:border-zinc-800">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded-lg p-[1.5px] animated-ig-ring">
          <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-[6.5px] flex items-center justify-center">
            <User className="w-4 h-4 text-ig-pink" />
          </div>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">
            About Me
          </h2>
          <p className="text-xs text-neutral-500 dark:text-zinc-400">
            Background, focus areas, and technical aspirations
          </p>
        </div>
      </div>

      {/* Main About Card (Instagram Post Caption Style) */}
      <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-sm flex flex-col gap-6 transition-colors duration-200">
        {/* Caption Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-zinc-800">
          <div className="w-10 h-10 rounded-full p-[1.5px] animated-ig-ring flex-shrink-0">
            <div className="w-full h-full bg-white dark:bg-[#111116] rounded-full p-[1px]">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                <Image
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-neutral-900 dark:text-zinc-100">
                {profileData.username}
              </span>
              <span className="text-xs text-neutral-400 dark:text-zinc-500">• De La Salle Lipa</span>
            </div>
            <span className="text-xs text-neutral-500 dark:text-zinc-400">{profileData.title}</span>
          </div>
        </div>

        {/* Narrative Text */}
        <div className="space-y-4 text-sm sm:text-[15px] text-neutral-700 dark:text-zinc-300 leading-relaxed font-normal">
          <p>
            Hello! I&apos;m <strong className="text-neutral-900 dark:text-white">{profileData.name}</strong>, an Information Technology student at <strong>De La Salle Lipa</strong> with a passion for full-stack web and mobile application engineering.
          </p>

          <p>
            I enjoy transforming everyday problems into practical, user-focused digital solutions — like building <strong>PalengkeHub</strong>, my capstone project bringing stall-level price transparency to our local public market. I love the full process of ideating, prototyping in Figma, and writing clean, scalable code.
          </p>

          <p>
            As an aspiring full-stack developer preparing for <strong>On-the-Job Training (OJT)</strong> and internship opportunities, I am eager to contribute to real-world engineering teams, learn industry best practices, and expand my technical depth across modern web and mobile architectures.
          </p>
        </div>

        {/* Focus Areas Grid (No Emojis - Lucide Icons!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/70 dark:border-zinc-800 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-zinc-100 font-semibold text-xs sm:text-sm">
              <Laptop className="w-4 h-4 text-ig-purple" />
              <span>Full-Stack &amp; Web</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-zinc-400 leading-normal">
              Building responsive frontend interfaces with React/Next.js and connecting robust SQL/Supabase backends.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/70 dark:border-zinc-800 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-zinc-100 font-semibold text-xs sm:text-sm">
              <Smartphone className="w-4 h-4 text-ig-pink" />
              <span>Mobile App Dev</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-zinc-400 leading-normal">
              Developing cross-platform mobile apps with React Native and Expo for everyday utility.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200/70 dark:border-zinc-800 flex flex-col gap-1.5 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-zinc-100 font-semibold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-ig-orange" />
              <span>UI/UX &amp; Prototyping</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-zinc-400 leading-normal">
              Wireframing intuitive user flows in Figma and turning them into accessible components with Tailwind CSS.
            </p>
          </div>
        </div>

        {/* Education Highlight Card */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 dark:from-zinc-900 dark:to-zinc-950 text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-neutral-700/50 dark:border-zinc-800">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
                Education
              </span>
              <h4 className="font-bold text-base sm:text-lg text-white">
                {profileData.educationSummary.school}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 dark:text-zinc-300">
                {profileData.educationSummary.degree}
              </p>
            </div>
          </div>

          <div className="sm:text-right flex flex-col sm:items-end text-xs text-neutral-300 dark:text-zinc-300">
            <span className="font-semibold text-white">
              Expected: {profileData.educationSummary.expectedGraduation}
            </span>
            <span className="flex items-center gap-1 text-neutral-400 dark:text-zinc-400">
              <MapPin className="w-3.5 h-3.5" />
              {profileData.educationSummary.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
