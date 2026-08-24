"use client";

import React from "react";
import Image from "next/image";
import { Award, Calendar } from "lucide-react";
import { certificatesData } from "@/data/certificates";

export const CertificateGrid: React.FC = () => {
  return (
    <section id="certificates-section" className="py-8 sm:py-10 border-t border-neutral-200 dark:border-zinc-800">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg p-[1.5px] animated-ig-ring">
            <div className="w-full h-full bg-white dark:bg-[#0B0B0F] rounded-[6.5px] flex items-center justify-center">
              <Award className="w-4 h-4 text-ig-orange" />
            </div>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">
              Certifications
            </h2>
            <p className="text-xs text-neutral-500 dark:text-zinc-400">
              Verified certifications and training
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300">
          {certificatesData.length} Certifications
        </span>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {certificatesData.map((cert) => (
          <article
            key={cert.id}
            className="group bg-white dark:bg-[#111116] border border-neutral-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-zinc-700 transition-all cursor-pointer"
          >
            {/* Certificate Image */}
            <div className="relative aspect-[4/3] w-full bg-neutral-50 dark:bg-zinc-900 overflow-hidden border-b border-neutral-100 dark:border-zinc-800">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>

            {/* Info */}
            <div className="p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg p-[1.5px] static-ig-ring flex-shrink-0">
                <div className="w-full h-full bg-white dark:bg-[#111116] rounded-[6.5px] flex items-center justify-center">
                  <Award className="w-4 h-4 text-ig-orange transition-transform duration-200 group-hover:scale-110" />
                </div>
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <h3 className="font-bold text-sm text-neutral-900 dark:text-zinc-100 leading-snug">
                  {cert.title}
                </h3>
                <span className="text-xs font-medium text-neutral-500 dark:text-zinc-400">
                  {cert.issuer}
                </span>
                {cert.year && (
                  <span className="text-[11px] text-neutral-400 dark:text-zinc-500 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    {cert.year}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};