"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  X,
  RotateCcw,
  Sparkles,
  Code2,
  Briefcase,
  GraduationCap,
  Mail,
  Layers,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

/**
 * Custom Animated SVG AI Dog Mascot ("Byte")
 * Features perky ears, cyber visor / glowing eyes, nose/snout, and IG gradient collar tag.
 */
const AiDogAvatar: React.FC<{
  size?: "sm" | "md" | "lg";
  isThinking?: boolean;
}> = ({ size = "md", isThinking = false }) => {
  const dimensions =
    size === "lg" ? "w-11 h-11" : size === "md" ? "w-9 h-9" : "w-7 h-7";

  return (
    <div className={`relative ${dimensions} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="igPupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F58529" />
            <stop offset="50%" stopColor="#DD2A7B" />
            <stop offset="100%" stopColor="#8134AF" />
          </linearGradient>
          <linearGradient id="headGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#27272A" />
            <stop offset="100%" stopColor="#18181B" />
          </linearGradient>
          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#090D16" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>
        </defs>

        {/* Antenna / AI Signal */}
        <line
          x1="32"
          y1="5"
          x2="32"
          y2="13"
          stroke="url(#igPupGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle
          cx="32"
          cy="4.5"
          r="2.8"
          fill="url(#igPupGrad)"
          className={isThinking ? "animate-ping" : "animate-pulse"}
        />
        <circle cx="32" cy="4.5" r="2.2" fill="#DD2A7B" />

        {/* Left Perky Dog Ear */}
        <path
          d="M12 25 L8 9 L23 16 Z"
          fill="url(#headGrad)"
          stroke="url(#igPupGrad)"
          strokeWidth="2"
          strokeLinejoin="round"
          className="origin-bottom-right transition-transform duration-300 group-hover:-rotate-6"
        />
        <path d="M13 21 L11 12 L20 16 Z" fill="#DD2A7B" fillOpacity="0.35" />

        {/* Right Perky Dog Ear */}
        <path
          d="M52 25 L56 9 L41 16 Z"
          fill="url(#headGrad)"
          stroke="url(#igPupGrad)"
          strokeWidth="2"
          strokeLinejoin="round"
          className="origin-bottom-left transition-transform duration-300 group-hover:rotate-6"
        />
        <path d="M51 21 L53 12 L44 16 Z" fill="#8134AF" fillOpacity="0.35" />

        {/* Main Dog Head */}
        <rect
          x="11"
          y="14"
          width="42"
          height="36"
          rx="16"
          fill="url(#headGrad)"
          stroke="url(#igPupGrad)"
          strokeWidth="2.2"
        />

        {/* Cheek Fur / Shiba Muzzle Patch */}
        <path
          d="M15 36 C15 30, 49 30, 49 36 C49 44, 42 49, 32 49 C22 49, 15 44, 15 36 Z"
          fill="#3F3F46"
          fillOpacity="0.55"
        />

        {/* Cyber Visor Screen */}
        <rect
          x="16"
          y="21"
          width="32"
          height="13"
          rx="6.5"
          fill="url(#visorGrad)"
          stroke="#52525B"
          strokeWidth="1"
        />

        {/* Glowing Cyber Dog Eyes */}
        {isThinking ? (
          <>
            {/* Happy ^ ^ arches when fetching */}
            <path
              d="M21 28 Q24 24 27 28"
              stroke="#38BDF8"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M37 28 Q40 24 43 28"
              stroke="#38BDF8"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : (
          <>
            <circle cx="24" cy="27.5" r="3" fill="#38BDF8" />
            <circle cx="25" cy="26.5" r="1" fill="#FFFFFF" />
            <circle cx="40" cy="27.5" r="3" fill="#38BDF8" />
            <circle cx="41" cy="26.5" r="1" fill="#FFFFFF" />
          </>
        )}

        {/* Cute Dog Nose */}
        <ellipse cx="32" cy="38.5" rx="4" ry="2.8" fill="#F43F5E" />
        <ellipse cx="31" cy="37.8" rx="1.2" ry="0.7" fill="#FDA4AF" />

        {/* Happy Dog Smile & Tongue */}
        <path
          d="M28 42 Q32 45 36 42"
          stroke="#E4E4E7"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M30.5 43.5 Q32 47.5 33.5 43.5"
          fill="#FB7185"
        />

        {/* Collar & Tag */}
        <rect
          x="20"
          y="49"
          width="24"
          height="4"
          rx="2"
          fill="url(#igPupGrad)"
        />
        <circle cx="32" cy="54.5" r="3" fill="#FCAF45" stroke="#18181B" strokeWidth="1" />
      </svg>
    </div>
  );
};

/**
 * Formats markdown-style **bold** and line breaks cleanly into React nodes
 */
const formatMessageText = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <span key={lineIdx} className="block min-h-[1.1em]">
        {parts.map((part, partIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong
                key={partIdx}
                className="font-bold text-neutral-950 dark:text-white"
              >
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <React.Fragment key={partIdx}>{part}</React.Fragment>;
        })}
      </span>
    );
  });
};

export const AiChatDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Woof! 🐾 I'm **Byte**, Richard's AI cyber-pup! I can fetch anything you'd like to know about his **6 projects**, **tech stack**, or **OJT / internship availability**.",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setShowGreetingBubble(false);
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const botReply =
        data.reply ||
        "Ruff! I had trouble fetching that. Please try asking again!";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: "bot",
          text: "Sorry, my connection dropped while fetching that! You can always reach Richard directly at **richardallenliman@gmail.com**.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: "Ready to fetch! 🐾 Ask me anything about Richard's projects, tech stack, or OJT availability.",
        timestamp: "Just now",
      },
    ]);
  };

  const quickPrompts = [
    {
      label: "PalengkeHub",
      icon: Layers,
      query: "Tell me about the PalengkeHub capstone project",
    },
    {
      label: "ShinPay+ SaaS",
      icon: Briefcase,
      query: "What is ShinPay+ and what technologies does it use?",
    },
    {
      label: "Open for OJT?",
      icon: GraduationCap,
      query: "Is Richard open to OJT or internship opportunities?",
    },
    {
      label: "Core Stack",
      icon: Code2,
      query: "What is Richard's core technical stack?",
    },
    {
      label: "Contact Info",
      icon: Mail,
      query: "How can I contact Richard directly?",
    },
  ];

  return (
    <>
      {/* Floating AI Dog Mascot Button + Callout Pill */}
      <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6 flex items-center gap-3">
        {/* Dismissible Speech Bubble Teaser */}
        {!isOpen && showGreetingBubble && (
          <div className="hidden sm:flex items-center gap-2 pl-3.5 pr-2.5 py-2 rounded-2xl rounded-br-sm bg-white dark:bg-[#16161D] border border-neutral-200 dark:border-zinc-800 shadow-lg text-xs text-neutral-800 dark:text-zinc-200 animate-fade-in">
            <button
              onClick={() => setIsOpen(true)}
              className="text-left hover:text-ig-pink transition-colors"
            >
              <span className="font-bold">Woof! I&apos;m Byte</span> · Ask me about Richard!
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowGreetingBubble(false);
              }}
              aria-label="Dismiss greeting"
              className="p-0.5 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-zinc-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Floating Pup Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2.5px] animated-ig-ring shadow-xl transition-transform hover:scale-105 active:scale-95 focus:outline-none"
          aria-label={isOpen ? "Close Byte AI chat" : "Chat with Byte, Richard's AI dog"}
          title="Chat with Byte (AI Portfolio Companion)"
        >
          <div className="w-full h-full rounded-full bg-white dark:bg-[#111116] flex items-center justify-center transition-colors">
            {isOpen ? (
              <X className="w-6 h-6 text-neutral-800 dark:text-zinc-100" />
            ) : (
              <AiDogAvatar size="lg" />
            )}
          </div>

          {/* Live green status badge */}
          {!isOpen && (
            <span className="absolute top-0.5 right-0.5 flex w-3.5 h-3.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#111116]" />
            </span>
          )}
        </button>
      </div>

      {/* Chat Drawer Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Byte AI Portfolio Companion"
          className="fixed inset-x-3 bottom-22 z-50 sm:inset-x-auto sm:right-6 sm:bottom-24 w-auto sm:w-[400px] h-[540px] max-h-[82vh] bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-up"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-zinc-800/80 bg-white dark:bg-[#111116] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative rounded-full p-[1.5px] animated-ig-ring flex-shrink-0">
                <div className="rounded-full bg-white dark:bg-[#111116] p-0.5">
                  <AiDogAvatar size="md" isThinking={isLoading} />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#111116]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-neutral-900 dark:text-zinc-100">
                    Byte
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-ig-gradient text-white shadow-sm">
                    <Sparkles className="w-2.5 h-2.5" />
                    AI Cyber-Pup
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                  {isLoading
                    ? "Fetching your answer..."
                    : "Richard's loyal companion • Always online"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Viewport */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3.5 overscroll-contain bg-neutral-50/50 dark:bg-[#0D0D12]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="flex-shrink-0 mb-0.5">
                    <AiDogAvatar size="sm" />
                  </div>
                )}

                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed max-w-[82%] ${
                    msg.sender === "user"
                      ? "bg-ig-gradient text-white rounded-br-sm shadow-sm"
                      : "bg-white dark:bg-[#16161D] text-neutral-700 dark:text-zinc-200 rounded-bl-sm border border-neutral-200/80 dark:border-zinc-800 shadow-sm"
                  }`}
                >
                  {msg.sender === "bot" ? formatMessageText(msg.text) : msg.text}
                </div>
              </div>
            ))}

            {/* Loading / Fetching Indicator */}
            {isLoading && (
              <div className="flex items-end gap-2">
                <div className="flex-shrink-0 mb-0.5">
                  <AiDogAvatar size="sm" isThinking />
                </div>
                <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-white dark:bg-[#16161D] text-neutral-500 dark:text-zinc-400 border border-neutral-200/80 dark:border-zinc-800 flex items-center gap-2 text-xs">
                  <span>Byte is fetching</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ig-pink animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-ig-purple animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-ig-orange animate-bounce" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Strip */}
          <div className="px-3 py-2 border-t border-neutral-100 dark:border-zinc-800/80 bg-white dark:bg-[#111116] flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
            {quickPrompts.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.label}
                  onClick={() => handleSendMessage(p.query)}
                  disabled={isLoading}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-neutral-100 dark:bg-zinc-800/90 text-neutral-700 dark:text-zinc-300 border border-neutral-200/70 dark:border-zinc-700/70 hover:border-ig-pink hover:text-ig-pink dark:hover:text-ig-pink transition-colors disabled:opacity-50"
                >
                  <Icon className="w-3 h-3 text-ig-pink" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Message Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-neutral-100 dark:border-zinc-800/80 bg-white dark:bg-[#111116] flex items-center gap-2 flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask Byte about Richard's projects..."
              disabled={isLoading}
              className="flex-1 bg-neutral-100 dark:bg-zinc-900 text-xs sm:text-sm text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-500 px-3.5 py-2 rounded-xl border border-transparent focus:border-neutral-300 dark:focus:border-zinc-700 outline-none transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isLoading}
              className="p-2.5 rounded-xl text-white bg-ig-gradient hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
