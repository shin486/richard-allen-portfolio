"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Send, MessageSquare, Check } from "lucide-react";
import { profileData } from "@/data/profile";

export const ContactSection: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sentNotice, setSentNotice] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${profileData.socials.email}?subject=${encodeURIComponent(
      subject || "Portfolio Inquiry / OJT Opportunity"
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 5000);
  };

  return (
    <section id="contact-section" className="py-8 sm:py-12 border-t border-neutral-200 dark:border-zinc-800">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded-lg p-[1.5px] animated-ig-ring">
          <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-[6.5px] flex items-center justify-center">
            <Mail className="w-4 h-4 text-ig-pink" />
          </div>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">
            Let&apos;s Connect
          </h2>
          <p className="text-xs text-neutral-500 dark:text-zinc-400">
            Send a direct message or connect across professional networks
          </p>
        </div>
      </div>

      {/* Instagram DM Box Layout */}
      <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row transition-colors duration-200">
        {/* Left Side: Direct Message Profile Card */}
        <div className="p-6 sm:p-8 bg-neutral-50 dark:bg-zinc-900/60 border-b md:border-b-0 md:border-r border-neutral-200/80 dark:border-zinc-800 md:w-5/12 flex flex-col justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] animated-ig-ring shadow-md">
              <div className="w-full h-full bg-white dark:bg-[#111116] rounded-full p-[2px]">
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
              <h3 className="font-bold text-lg text-neutral-900 dark:text-zinc-100">
                {profileData.name}
              </h3>
              <p className="text-xs font-mono text-neutral-500 dark:text-zinc-400">
                @{profileData.username}
              </p>
              <p className="text-xs text-neutral-600 dark:text-zinc-300 mt-2 leading-relaxed font-normal">
                I&apos;m always open to discussing new projects, learning opportunities, and OJT / internship roles.
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for OJT
            </div>
          </div>
        </div>

        {/* Right Side: DM Composer Form */}
        <div className="p-6 sm:p-8 md:w-7/12 flex flex-col justify-between bg-white dark:bg-[#111116]">
          <form onSubmit={handleSendMessage} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-ig-purple" />
                Direct Message
              </span>
              <span className="text-[11px] text-neutral-400 dark:text-zinc-500">via default email</span>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-semibold text-neutral-800 dark:text-zinc-200 mb-1">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. OJT / Internship Opportunity, Project Collaboration"
                className="w-full px-3.5 py-2 text-sm bg-neutral-50 dark:bg-zinc-900 text-neutral-900 dark:text-zinc-100 border border-neutral-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-neutral-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-950 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-neutral-800 dark:text-zinc-200 mb-1">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full px-3.5 py-2 text-sm bg-neutral-50 dark:bg-zinc-900 text-neutral-900 dark:text-zinc-100 border border-neutral-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-neutral-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-950 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg text-sm font-bold text-white bg-ig-gradient hover:opacity-95 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 -rotate-45" />
              <span>Send Message</span>
            </button>

            {sentNotice && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1 animate-fade-in">
                <Check className="w-4 h-4" /> Opening your email application...
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
