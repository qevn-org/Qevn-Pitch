import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/shared/SectionLabel";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { Calendar, Hammer, ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface BuildLogEntry {
  day: number;
  title: string;
  date: string;
  summary: string;
  details: string[];
  shipped: string[];
}

const STATIC_BUILD_LOGS: BuildLogEntry[] = [
  {
    day: 3,
    title: "Routing & Gated Conversions",
    date: "June 20, 2026",
    summary: "Wired up shareable routes so users can send generated pitches directly to teammates. Configured cookie-based rate limits and structured lead capture API routes.",
    details: [
      "Built out shareable result page under /pitch/[id] fetching from Supabase.",
      "Implemented standard rate limiting of 3 pitches per session.",
      "Configured lead-capture popup modal that unlocks copies/shares when email is submitted."
    ],
    shipped: ["Shareable pitch URLs", "Rate limit enforcement cookies", "Email lead capture popup"]
  },
  {
    day: 2,
    title: "The Signature Terminal Engine",
    date: "June 19, 2026",
    summary: "Built the custom CLI typing animation. Implemented structured sales prompt templates with Claude 3.5 Sonnet to output email, phone opener, and LinkedIn DM scripts.",
    details: [
      "Programmed typewriter component simulating server-side log processing.",
      "Constructed prompt guidelines enforcing strict output lengths.",
      "Styled individual pitch cards with copy actions and clipboard feedbacks."
    ],
    shipped: ["Interactive CLI generator", "Claude JSON pipeline prompts", "Format-specific pitch cards"]
  },
  {
    day: 1,
    title: "Design Tokens & Foundations",
    date: "June 18, 2026",
    summary: "Initialized the Next.js 15 application. Built the maximalist visual identity using void-black backgrounds, neon-acid green border accents, and high-impact custom grotesk typography.",
    details: [
      "Scaffolded Next.js App Router with Tailwind CSS v4 support.",
      "Loaded Clash Display, General Sans, and Space Mono fonts.",
      "Styled global grids, scrollbars, and noise grain textures in CSS."
    ],
    shipped: ["Project setup", "Design system theme variables", "Layout base grids"]
  }
];

async function getBuildLogs() {
  if (!supabase) {
    return STATIC_BUILD_LOGS;
  }

  const { data, error } = await supabase
    .from("build_log")
    .select("*")
    .order("day_number", { ascending: false });

  if (error || !data || data.length === 0) {
    return STATIC_BUILD_LOGS;
  }

  return data.map((entry: any) => ({
    day: entry.day_number,
    title: entry.title,
    date: new Date(entry.published_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    summary: entry.body,
    details: [], // dynamic fallback
    shipped: [],
  }));
}

export default async function BuildJournalPage() {
  const logs = await getBuildLogs();

  return (
    <div className="flex-1 flex flex-col w-full">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 md:py-20 w-full select-none">
        {/* Page Header */}
        <div className="border-b border-graphite/10 pb-8 mb-12">
          <SectionLabel text="Experiment Logbook" className="mb-2" />
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-bone">
            The Public <span className="text-acid">Build</span> Journal
          </h1>
          <p className="mt-4 text-graphite font-sans text-sm max-w-xl leading-relaxed">
            We are shipping this product publicly in 10 days. Follow along as we build, tweak, and launch every single day. Every line of code is proof of agency speed.
          </p>
        </div>

        {/* Build Entries list */}
        <div className="flex flex-col gap-12 md:gap-16">
          {logs.map((log) => (
            <article
              key={log.day}
              className="relative pl-8 md:pl-12 border-l-2 border-graphite/15 hover:border-acid/30 transition-colors"
            >
              {/* Timeline dot */}
              <div className="absolute top-1 -left-[9px] w-4 h-4 bg-void border-2 border-acid flex items-center justify-center rounded-none">
                <div className="w-1.5 h-1.5 bg-acid" />
              </div>

              {/* Day Badge */}
              <div className="flex items-center gap-3 mb-3">
                <Badge text={`Day ${log.day}`} className="border-acid/30 text-acid font-bold" />
                <div className="flex items-center gap-1 font-mono text-[10px] text-graphite">
                  <Calendar size={12} /> {log.date}
                </div>
              </div>

              {/* Header Title */}
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-bone mb-3">
                {log.title}
              </h2>

              {/* Summary Description */}
              <p className="text-graphite font-sans text-xs md:text-sm leading-relaxed mb-4">
                {log.summary}
              </p>

              {/* Bullet points & shipped lists */}
              {log.details.length > 0 && (
                <div className="mb-4">
                  <span className="font-mono text-[10px] text-acid uppercase tracking-widest block mb-2">
                    // KEY TASKS COMPLETED
                  </span>
                  <ul className="list-none flex flex-col gap-1.5">
                    {log.details.map((detail, idx) => (
                      <li key={idx} className="font-sans text-xs text-bone/85 flex items-start gap-2">
                        <span className="text-acid font-mono text-[10px] select-none mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {log.shipped.length > 0 && (
                <div className="border-t border-surface/50 pt-3 mt-4 flex flex-wrap gap-2">
                  <span className="font-mono text-[9px] text-graphite uppercase tracking-widest self-center mr-2">
                    Shipped:
                  </span>
                  {log.shipped.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-surface border border-graphite/10 px-2 py-0.5 font-mono text-[9px] text-bone"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* CTA section */}
        <div className="bg-surface border border-graphite/10 p-6 md:p-8 mt-16 text-center flex flex-col items-center gap-4">
          <Hammer size={32} className="text-acid animate-pulse-slow" />
          <h3 className="font-display text-lg font-bold text-bone uppercase tracking-tight">
            Follow our day-by-day agency builds
          </h3>
          <p className="text-graphite font-sans text-xs md:text-sm max-w-md leading-relaxed">
            Interested in building your own automated products? Let's strategize together. We build custom applications in record time.
          </p>
          <a
            href="https://cal.com/qevn"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2"
          >
            <Button variant="primary" className="gap-2">
              Book a Strategy Call <ArrowUpRight size={14} />
            </Button>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
