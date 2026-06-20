import React from "react";
import Button from "../shared/Button";
import SectionLabel from "../shared/SectionLabel";
import { ArrowUpRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="bg-surface border-2 border-acid/20 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 relative overflow-hidden">
        {/* Design Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-acid/5 rounded-full filter blur-3xl -z-10" />
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-acid" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-acid" />

        <div className="max-w-2xl flex flex-col items-start gap-4">
          <SectionLabel text="The System Behind The System" />
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-bone leading-[1.05]">
            Need the <span className="text-acid">engine</span> behind the sales?
          </h2>
          <p className="text-graphite font-sans text-sm md:text-base leading-relaxed mt-2">
            Writing pitches is step one. Step two is automation. We build custom lead scraping databases, automated LinkedIn outreach, and AI agents that qualify prospects while you sleep.
          </p>
          <div className="font-mono text-[10px] text-acid/80 uppercase tracking-widest mt-2">
            // QEVN — WE SHIELD YOU FROM THE CHORE
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <a
            href="https://www.qevn.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button variant="primary" className="w-full justify-center gap-2">
              Visit QEVN.IN <ArrowUpRight size={16} />
            </Button>
          </a>
          <a
            href="https://calendly.com/hello-qevn/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button variant="secondary" className="w-full justify-center gap-2">
              Book Call <ArrowUpRight size={16} />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
