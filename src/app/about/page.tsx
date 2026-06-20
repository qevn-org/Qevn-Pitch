import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/shared/SectionLabel";
import Button from "@/components/shared/Button";
import { ArrowUpRight, Flame, ShieldAlert, Cpu } from "lucide-react";

export default function AboutPage() {
  const pillars = [
    {
      icon: <Flame size={20} className="text-acid" />,
      title: "Built in 10 Days",
      desc: "An experiment in rapid deployment. Shipped publicly to prove the build speed and taste behind our digital product studio.",
    },
    {
      icon: <Cpu size={20} className="text-acid" />,
      title: "Engineered, Not Wrapped",
      desc: "Integrates Next.js 15 App router streaming capabilities with structured Anthropic prompts for consistent JSON format outputs.",
    },
    {
      icon: <ShieldAlert size={20} className="text-acid" />,
      title: "Agency Lead-Gen Feed",
      desc: "Designed to fuel the top-of-funnel pipeline for QEVN, showcasing software capability to founders, freelancers, and builders.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col w-full">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 md:py-20 w-full select-none">
        {/* Page Header */}
        <div className="border-b border-graphite/10 pb-8 mb-12">
          <SectionLabel text="Agency Foundations" className="mb-2" />
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-bone">
            About the <span className="text-acid">Experiment</span>
          </h1>
          <p className="mt-4 text-graphite font-sans text-sm max-w-xl leading-relaxed">
            QEVN Pitch is a direct demonstration of how fast high-quality SaaS tools can be shipped. We design, code, and deploy custom software products in record time.
          </p>
        </div>

        {/* Story Section */}
        <section className="flex flex-col gap-6 font-sans text-xs md:text-sm text-graphite leading-relaxed mb-16">
          <h3 className="font-display text-xl font-bold text-bone uppercase tracking-tight">
            Who is QEVN?
          </h3>
          <p>
            QEVN (<a href="https://qevn.in" target="_blank" rel="noopener noreferrer" className="text-bone hover:text-acid underline transition-colors">qevn.in</a>) is an AI automation agency. We build custom applications, automated databases, data pipelines, and AI workflows that save hundreds of hours of manual labor for startups and SMB operators.
          </p>
          <p>
            We believe that software should be built with speed, precision, and taste. That's why we launched the 10-day public build journal: to pull back the curtain and show exactly how we build and launch products, day by day. No mystery, no hidden timelines.
          </p>
        </section>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-surface border border-graphite/10 p-6 flex flex-col gap-4"
            >
              <div className="bg-void w-10 h-10 border border-graphite/10 flex items-center justify-center">
                {p.icon}
              </div>
              <h4 className="font-display text-base font-bold text-bone uppercase tracking-tight">
                {p.title}
              </h4>
              <p className="text-graphite font-sans text-xs leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <section className="bg-surface border-2 border-acid/20 p-8 text-center flex flex-col items-center gap-4">
          <SectionLabel text="Consultation Hook" />
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-bone">
            Want to automate your systems?
          </h3>
          <p className="text-graphite font-sans text-xs md:text-sm max-w-md leading-relaxed">
            Let's design your lead pipeline, scrape your target databases, or build your custom AI agents. Book a strategy session today.
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
