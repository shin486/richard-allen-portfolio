"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Send,
  X,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  MessageCircle,
} from "lucide-react";
import { profileData } from "@/data/profile";
import profilePic from "@/assets/PROFILEPIC.png";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export const AiChatDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hi! I'm Richard's portfolio AI assistant. Ask me anything about his **6 projects**, technical skills, or **OJT / internship availability**!",
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
        "I had trouble answering that question. Please try asking again!";

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
          text: "Sorry, I encountered a temporary connection issue. Please feel free to reach Richard directly at **richardallenliman@gmail.com**!",
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
        text: "Chat cleared! Ask me anything about Richard's projects, tech stack, or OJT availability.",
        timestamp: "Just now",
      },
    ]);
  };

  const quickPrompts = [
    { label: "📱 PalengkeHub Capstone", query: "Tell me about PalengkeHub capstone project" },
    { label: "💼 ShinPay+ SaaS", query: "What is ShinPay+ and what technologies does it use?" },
    { label: "🎓 Open for OJT?", query: "Is Richard open to OJT or internship opportunities?" },
    { label: "⚡ Core Tech Stack", query: "What is Richard's core technical stack?" },
    { label: "✉️ How to Contact", query: "How can I contact Richard directly?" },
  ];

  return (
    <>
      {/* Floating Instagram Direct Message (DM) Button */}
      <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full p-[2.5px] animated-ig-ring shadow-xl transition-transform hover:scale-105 active:scale-95 focus:outline-none"
          aria-label={isOpen ? "Close AI chat" : "Open AI portfolio chat"}
          title="Chat with Richard's AI Assistant"
        >
          <div className="w-full h-full rounded-full bg-white dark:bg-[#111116] flex items-center justify-center text-neutral-900 dark:text-zinc-100 transition-colors">
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <div className="relative">
                <Sparkles className="w-6 h-6 text-ig-pink transition-transform group-hover:rotate-12" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#111116] animate-pulse" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Instagram DM Chat Drawer Overlay / Box */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Portfolio Assistant Chat"
          className="fixed inset-x-3 bottom-20 z-50 sm:inset-x-auto sm:right-6 sm:bottom-24 w-auto sm:w-[400px] h-[540px] max-h-[85vh] bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-up"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-neutral-100 dark:border-zinc-800/80 bg-white dark:bg-[#111116] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full p-[1.5px] animated-ig-ring flex-shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                  <Image
                    src={profilePic}
                    alt={profileData.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-[#111116]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-zinc-100">
                    {profileData.username}
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-ig-pink/10 text-ig-pink border border-ig-pink/20">
                    AI Assistant
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                  Active now • Answers instantly
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-zinc-200 transition-colors"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-zinc-200 transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Viewport */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 overscroll-contain">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 text-ig-pink mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                    msg.sender === "user"
                      ? "bg-ig-gradient text-white rounded-tr-sm shadow-sm"
                      : "bg-neutral-100 dark:bg-zinc-800/90 text-neutral-900 dark:text-zinc-100 rounded-tl-sm border border-neutral-200/60 dark:border-zinc-700/60 whitespace-pre-line"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 text-ig-pink mt-1">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl rounded-tl-sm bg-neutral-100 dark:bg-zinc-800/90 text-neutral-500 dark:text-zinc-400 border border-neutral-200/60 dark:border-zinc-700/60 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-ig-pink animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-ig-pink animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-ig-pink animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Strip */}
          <div className="px-3 py-2 border-t border-neutral-100 dark:border-zinc-800/80 bg-neutral-50 dark:bg-[#16161D] flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
            {quickPrompts.map((p) => (
              <button
                key={p.label}
                onClick={() => handleSendMessage(p.query)}
                disabled={isLoading}
                className="flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300 border border-neutral-200 dark:border-zinc-700 hover:border-ig-pink hover:text-neutral-900 dark:hover:text-zinc-100 transition-colors disabled:opacity-50"
              >
                {p.label}
              </button>
            ))}
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
              placeholder="Ask about projects, stack, OJT..."
              disabled={isLoading}
              className="flex-1 bg-neutral-100 dark:bg-zinc-900 text-xs sm:text-sm text-neutral-900 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-500 px-3.5 py-2 rounded-xl border border-transparent focus:border-neutral-300 dark:focus:border-zinc-700 outline-none transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isLoading}
              className="p-2 rounded-xl text-white bg-ig-gradient hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center flex-shrink-0"
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

