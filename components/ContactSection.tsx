"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import {
  Copy,
  Check,
  FileText,
  ArrowUpRight,
  CornerDownLeft,
  Linkedin,
} from "lucide-react";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";
import { VerifiedBadge } from "./VerifiedBadge";

interface TopicOption {
  id: string;
  label: string;
  subject: string;
  placeholder: string;
  starterText: string;
  note: string;
}

const TOPICS: TopicOption[] = [
  {
    id: "ojt",
    label: "OJT / Internship",
    subject: "OJT / Software Engineering Internship Inquiry",
    placeholder:
      "Hi Richard, we have an opening for a Full-Stack / Mobile Developer intern...",
    starterText:
      "Hi Richard, I reviewed your portfolio and projects. We'd love to discuss an OJT / Software Engineering internship opportunity with our team.",
    note: "Tag message as an OJT / Internship opportunity.",
  },
  {
    id: "role",
    label: "Junior Developer Role",
    subject: "Full-Stack / Mobile Developer Role Inquiry",
    placeholder:
      "Hi Richard, reaching out regarding a Full-Stack / Mobile engineering role...",
    starterText:
      "Hi Richard, I came across your work on PalengkeHub and ShinPay+. Are you available for a quick introductory call regarding a developer role?",
    note: "Tag message for a Full-Stack or Mobile Developer role.",
  },
  {
    id: "collab",
    label: "Project Collaboration",
    subject: "Project & Engineering Collaboration",
    placeholder:
      "Hey Richard, I'm building a web/mobile product and would love to collaborate...",
    starterText:
      "Hey Richard, I checked out your interactive demos and architecture pipelines. Would love to connect about a project collaboration.",
    note: "Tag message for a project build or freelance collaboration.",
  },
  {
    id: "general",
    label: "General Inquiry",
    subject: "Portfolio Inquiry · Richard Allen Liman",
    placeholder: "Write a direct message to Richard Allen Liman...",
    starterText:
      "Hi Richard, just checked out your portfolio and wanted to connect!",
    note: "Send a general direct message.",
  },
];

interface SentMessage {
  id: number;
  topicLabel: string;
  subject: string;
  body: string;
  timestamp: string;
}

interface ContactSectionProps {
  hideHeader?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  hideHeader = false,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>("ojt");
  const [senderEmail, setSenderEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [emailCopied, setEmailCopied] = useState<boolean>(false);
  const [payloadCopiedId, setPayloadCopiedId] = useState<number | null>(null);
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);

  const activeTopic =
    TOPICS.find((t) => t.id === selectedTopicId) || TOPICS[0];

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profileData.socials.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2400);
    } catch {
      // Fallback selection copy
      const input = document.createElement("input");
      input.value = profileData.socials.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2400);
    }
  }, []);

  const handleCopySentPayload = useCallback(
    async (msg: SentMessage) => {
      const fullText = `To: ${profileData.socials.email}\nSubject: ${msg.subject}\n\n${msg.body}`;
      try {
        await navigator.clipboard.writeText(fullText);
        setPayloadCopiedId(msg.id);
        setTimeout(() => setPayloadCopiedId(null), 2200);
      } catch {}
    },
    []
  );

  const dispatchMessage = useCallback(() => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const finalBody = senderEmail.trim()
      ? `${trimmed}\n\n—\nReply-To: ${senderEmail.trim()}`
      : trimmed;

    const newMsg: SentMessage = {
      id: Date.now(),
      topicLabel: activeTopic.label,
      subject: activeTopic.subject,
      body: finalBody,
      timestamp: formattedTime,
    };

    setSentMessages((prev) => [...prev, newMsg]);
    setMessage("");

    const mailtoUrl = `mailto:${profileData.socials.email}?subject=${encodeURIComponent(
      activeTopic.subject
    )}&body=${encodeURIComponent(finalBody)}`;
    window.location.href = mailtoUrl;
  }, [message, senderEmail, activeTopic]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatchMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      dispatchMessage();
    }
  };

  return (
    <section
      id="contact-section"
      className={
        hideHeader
          ? ""
          : "py-8 sm:py-12 border-t border-neutral-200 dark:border-white/[0.08]"
      }
    >
      {/* Clean Editorial Section Header */}
      {!hideHeader && (
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-[#F4F4F6] tracking-tight">
              Direct Inbox
            </h2>
            <span className="text-neutral-300 dark:text-zinc-700">·</span>
            <span className="text-xs font-mono text-neutral-500 dark:text-[#9CA3AF]">
              Richard Allen Liman
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 dark:text-[#6B7280]">
            Lipa City, PH (GMT+8)
          </span>
        </div>
      )}

      {/* Unified Direct Inbox × Linear Precision Card */}
      <div className="bg-white dark:bg-[#111215] border border-neutral-200 dark:border-white/[0.08] dark:border-t-white/[0.14] rounded-2xl overflow-hidden transition-colors duration-200 shadow-2xl">
        {/* Top Bar: Thread Recipient + 1-Click Utility Pills */}
        <div className="px-4 sm:px-6 py-4 border-b border-neutral-200/80 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#111215]">
          {/* Left: Compact Recipient Identity (Single Avatar in Direct Inbox) */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-neutral-200 dark:border-white/[0.14] flex-shrink-0 bg-neutral-900">
              <Image
                src={profilePic}
                alt={profileData.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-xs sm:text-sm text-neutral-900 dark:text-[#F4F4F6] truncate">
                  {profileData.name}
                </span>
                <VerifiedBadge className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-[11px] font-mono text-neutral-400 dark:text-[#6B7280]">
                  · Lipa City, PH (GMT+8)
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-[#9CA3AF] truncate flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block animate-pulse" />
                <span>Active now · Typically replies within 2 hours</span>
              </p>
            </div>
          </div>

          {/* Right: 1-Click Copy Email + Resume + LinkedIn Dock */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              data-note="Click to copy richardallen0901@gmail.com straight to your clipboard."
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all active:scale-95 ${
                emailCopied
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-[#10B981]"
                  : "bg-neutral-100/80 dark:bg-[#17191E] hover:bg-neutral-200/70 dark:hover:border-[#10B981]/45 text-neutral-700 dark:text-[#F4F4F6] border-neutral-200/90 dark:border-white/[0.08]"
              }`}
            >
              {emailCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                  <span>Copied email</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400 dark:text-[#9CA3AF] flex-shrink-0" />
                  <span className="hidden sm:inline">
                    {profileData.socials.email}
                  </span>
                  <span className="sm:hidden">Copy Email</span>
                </>
              )}
            </button>

            <a
              href={profileData.socials.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Richard_Allen_Liman_Resume.pdf"
              data-note="Download a clean PDF copy of my resume for your hiring team."
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100/80 dark:bg-[#17191E] hover:bg-neutral-200/70 dark:hover:border-[#10B981]/45 text-neutral-700 dark:text-[#F4F4F6] border border-neutral-200/90 dark:border-white/[0.08] transition-all active:scale-95"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-500 dark:text-[#9CA3AF]" />
              <span>Download Resume (PDF)</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400 dark:text-[#9CA3AF]" />
            </a>

            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-note="Connect with me directly on LinkedIn."
              aria-label="LinkedIn Profile"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-100/80 dark:bg-[#17191E] hover:bg-neutral-200/70 dark:hover:border-[#10B981]/45 text-neutral-700 dark:text-[#F4F4F6] border border-neutral-200/90 dark:border-white/[0.08] transition-all active:scale-95"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="hidden md:inline">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Middle: Authentic Conversation Stream */}
        <div className="px-4 sm:px-6 py-5 bg-neutral-50/50 dark:bg-[#0D0E11] space-y-4">
          {/* Incoming Message Bubble from Richard (No duplicate avatar or handle spam) */}
          <div className="space-y-1.5 max-w-2xl">
            <div className="px-4 py-3 rounded-xl bg-white dark:bg-[#17191E] border border-neutral-200/80 dark:border-white/[0.08] text-xs sm:text-sm text-neutral-800 dark:text-[#F4F4F6] leading-relaxed">
              Looking for a Full-Stack or Mobile developer for an OJT
              internship, junior engineering role, or project build? Select a
              topic below or send a direct message. It routes straight to my
              inbox ({profileData.socials.email}).
            </div>
            <div className="flex items-center gap-2 pl-1 text-[11px] font-mono text-neutral-400 dark:text-[#6B7280]">
              <span>Direct Inbox</span>
              <span>·</span>
              <span>De La Salle Lipa · BSIT</span>
            </div>
          </div>

          {/* Live Sent Message Bubbles (Appears when visitor dispatches a message) */}
          {sentMessages.map((msg) => (
            <div key={msg.id} className="flex flex-col items-end space-y-1 animate-fade-in">
              <div className="max-w-lg px-4 py-2.5 rounded-2xl rounded-br-sm bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs sm:text-sm leading-relaxed shadow-xs">
                <div className="text-[10px] font-mono uppercase tracking-wider opacity-65 mb-1">
                  re: {msg.topicLabel}
                </div>
                <p className="whitespace-pre-wrap break-words">{msg.body}</p>
              </div>
              <div className="flex items-center gap-2 pr-1 text-[10px] font-mono text-neutral-500 dark:text-zinc-400">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  ✓✓ Delivered · {msg.timestamp}
                </span>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => handleCopySentPayload(msg)}
                  className="underline hover:text-neutral-900 dark:hover:text-zinc-200 transition-colors"
                >
                  {payloadCopiedId === msg.id
                    ? "Copied message + email!"
                    : "Copy text for webmail"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom: Topic Selector Pills & Linear-Clean Message Composer */}
        <form
          onSubmit={handleFormSubmit}
          className="p-4 sm:p-5 bg-white dark:bg-[#111116] border-t border-neutral-200/80 dark:border-zinc-800/80 space-y-3"
        >
          {/* Topic Chips Row + Starter Template Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mr-1">
                Topic:
              </span>
              {TOPICS.map((topic) => {
                const isSelected = topic.id === selectedTopicId;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopicId(topic.id)}
                    data-note={topic.note}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all active:scale-95 border ${
                      isSelected
                        ? "bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-neutral-900 dark:border-zinc-100 font-semibold shadow-2xs"
                        : "bg-neutral-100/70 dark:bg-zinc-900 text-neutral-600 dark:text-zinc-400 border-neutral-200/80 dark:border-zinc-800 hover:text-neutral-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    {topic.label}
                  </button>
                );
              })}
            </div>

            {!message.trim() && (
              <button
                type="button"
                onClick={() => setMessage(activeTopic.starterText)}
                data-note="Auto-fill a quick starter message for this topic."
                className="inline-flex items-center text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-zinc-500 hover:text-neutral-900 dark:hover:text-zinc-200 transition-colors"
              >
                <span>[ INSERT STARTER → ]</span>
              </button>
            )}
          </div>

          {/* Unified Composer Box */}
          <div className="rounded-xl bg-neutral-50 dark:bg-[#15151E] border border-neutral-200 dark:border-zinc-800 focus-within:border-neutral-400 dark:focus-within:border-zinc-600 focus-within:bg-white dark:focus-within:bg-[#181822] transition-all overflow-hidden">
            {/* Optional Sender Email Line (Raycast Argument Style) */}
            <div className="flex items-center gap-2 px-3.5 py-2 border-b border-neutral-200/60 dark:border-zinc-800/70 text-xs">
              <span className="font-mono text-neutral-400 dark:text-zinc-500 flex-shrink-0">
                from:
              </span>
              <input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="your.email@company.com (optional)"
                aria-label="Your email address (optional)"
                className="w-full bg-transparent text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-500 focus:outline-none font-mono text-xs"
              />
            </div>

            {/* Message Textarea */}
            <textarea
              id="contact-message"
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={activeTopic.placeholder}
              aria-label="Message content"
              className="w-full px-3.5 py-2.5 bg-transparent text-sm text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-500 focus:outline-none resize-none leading-relaxed"
            />

            {/* Bottom Composer Action Bar */}
            <div className="flex items-center justify-between gap-2 px-3.5 py-2 bg-neutral-100/50 dark:bg-[#12121A] border-t border-neutral-200/60 dark:border-zinc-800/70">
              <span className="text-[11px] font-mono text-neutral-400 dark:text-zinc-500 flex items-center gap-1.5">
                <CornerDownLeft className="w-3 h-3" />
                <span className="hidden xs:inline">Ctrl + Enter to send</span>
                <span className="xs:hidden">Direct email</span>
              </span>

              <button
                type="submit"
                disabled={!message.trim()}
                data-note="Dispatch message straight to my inbox. Response time: under 2 hours."
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:opacity-90 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95 transition-all shadow-2xs"
              >
                <span>Send Message</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
