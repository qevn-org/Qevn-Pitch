"use client";

import React, { useState } from "react";
import SectionLabel from "../shared/SectionLabel";
import Badge from "../shared/Badge";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/constants";
import { Clipboard, Check } from "lucide-react";

export default function ExamplePitches() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // We take 3 industries to showcase
  const featured = [
    {
      industry: INDUSTRIES[0], // SaaS
      type: "📧 Cold Email",
      title: "Activation Flow Optimization Offer",
      content: INDUSTRIES[0].examples.email.body,
      subject: INDUSTRIES[0].examples.email.subject,
    },
    {
      industry: INDUSTRIES[1], // Real Estate
      type: "💬 LinkedIn DM",
      title: "Local Seller Leads Hook",
      content: INDUSTRIES[1].examples.dm.message,
    },
    {
      industry: INDUSTRIES[4], // Hospitality
      type: "📞 Cold Call Opener",
      title: "OTA Margin Rescue Pitch",
      content: INDUSTRIES[4].examples.call.script,
      meta: `Estimate: ${INDUSTRIES[4].examples.call.duration}`,
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="w-full py-16 md:py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <SectionLabel text="Social Evidence" className="mb-2" />
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-bone">
            Pitches that <span className="text-acid">actually</span> land
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <p className="text-graphite font-sans text-xs md:text-sm max-w-xs md:text-right leading-relaxed mb-2">
            Click to view pre-generated pages by industry for search optimization.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {featured.map((item, idx) => {
          const uniqueId = `example-${idx}`;
          const fullCopyText = item.subject
            ? `Subject: ${item.subject}\n\n${item.content}`
            : item.content;

          return (
            <div
              key={idx}
              className="bg-surface border border-graphite/10 p-6 flex flex-col justify-between relative group hover:border-acid/20 transition-all duration-300"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] font-bold text-acid uppercase tracking-widest">
                    {item.type}
                  </span>
                  <Link href={`/for/${item.industry.slug}`}>
                    <Badge text={item.industry.name} className="hover:border-acid/40 hover:text-acid cursor-pointer transition-colors" />
                  </Link>
                </div>

                <h3 className="font-display text-base font-bold text-bone uppercase tracking-tight mb-4">
                  {item.title}
                </h3>

                {/* Pitch Body Frame */}
                <div className="bg-void border border-surface/80 p-4 font-mono text-[11px] leading-relaxed text-bone/90 select-all mb-4 relative overflow-hidden max-h-[220px] overflow-y-auto">
                  {item.subject && (
                    <div className="border-b border-surface/50 pb-2 mb-2">
                      <span className="text-graphite font-semibold">Subject:</span> {item.subject}
                    </div>
                  )}
                  <p className="whitespace-pre-line">{item.content}</p>
                  {item.meta && (
                    <div className="text-[10px] text-acid font-semibold mt-2">
                      // {item.meta}
                    </div>
                  )}
                </div>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between border-t border-surface/50 pt-4 mt-auto">
                <button
                  onClick={() => handleCopy(fullCopyText, uniqueId)}
                  className="font-mono text-[10px] uppercase tracking-wider text-graphite hover:text-acid flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === uniqueId ? (
                    <>
                      <Check size={12} className="text-acid" /> Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard size={12} /> Copy Template
                    </>
                  )}
                </button>

                <Link
                  href={`/for/${item.industry.slug}`}
                  className="font-mono text-[10px] uppercase tracking-wider text-bone hover:text-acid font-bold transition-colors"
                >
                  View Industry Page →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Taxonomies list */}
      <div className="mt-12 border-t border-surface pt-8">
        <h4 className="font-mono text-xs uppercase tracking-widest text-graphite mb-4 text-center">
          Browse programmatically generated SEO niches:
        </h4>
        <div className="flex flex-wrap justify-center gap-3">
          {INDUSTRIES.map((ind) => (
            <Link key={ind.slug} href={`/for/${ind.slug}`}>
              <span className="bg-surface/50 border border-graphite/10 px-3 py-1.5 font-mono text-[10px] md:text-xs text-graphite hover:text-acid hover:border-acid/30 transition-all duration-200 uppercase cursor-pointer">
                {ind.emoji} {ind.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
