import React from "react";
import PitchForm from "../pitch/PitchForm";
import Badge from "../shared/Badge";

interface HeroProps {
  onSubmit: (data: {
    description: string;
    targetCustomer: string;
    industry: string;
  }) => void;
  isLoading: boolean;
}

export default function Hero({ onSubmit, isLoading }: HeroProps) {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-28 overflow-visible">
      {/* Scattered background chips - Asymmetric positioning */}
      <div className="absolute top-8 left-1/4 hidden lg:block transform -rotate-6">
        <Badge text="⚡️ 3 formats generated" />
      </div>
      <div className="absolute bottom-12 left-1/3 hidden lg:block transform rotate-3">
        <Badge text="⏱️ < 60s generation" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Headlines */}
        <div className="lg:col-span-7 flex flex-col items-start text-left select-none relative">
          <div className="font-mono text-xs uppercase tracking-widest text-acid mb-4">
            // FREE SALES ACCELERATOR TOOL
          </div>
          
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[90px] xl:text-[105px] font-bold uppercase tracking-tighter leading-[0.85] text-bone">
            Tell us
            <br />
            what you
            <br />
            <span className="text-acid">do.</span>
          </h1>

          <p className="mt-8 text-graphite font-sans text-lg md:text-xl max-w-xl leading-relaxed">
            Get a high-converting pitch that actually lands — written in{" "}
            <span className="text-bone font-mono text-sm border-b border-acid pb-0.5">
              three formats
            </span>{" "}
            in under a minute. No boring SaaS templates, no generic fluff.
          </p>

          <div className="flex items-center gap-6 mt-8 flex-wrap">
            <div className="flex flex-col animate-fade-in">
              <span className="font-display text-3xl font-bold text-bone">99.8%</span>
              <span className="font-mono text-[10px] text-graphite uppercase tracking-wider">
                Gemini 1.5 Engine
              </span>
            </div>
            <div className="w-px bg-surface self-stretch h-8 hidden sm:block" />
            <div className="flex flex-col animate-fade-in">
              <span className="font-display text-3xl font-bold text-bone">10 Days</span>
              <span className="font-mono text-[10px] text-graphite uppercase tracking-wider">
                Public Build Journal
              </span>
            </div>
            <div className="w-px bg-surface self-stretch h-8 hidden sm:block" />
            <div className="transform rotate-3 shrink-0 select-none">
              <Badge text="🔥 0% boilerplate cliches" />
            </div>
          </div>
        </div>

        {/* Right Side: Generator Form */}
        <div className="lg:col-span-5 relative">
          {/* Subtle backglow behind the card */}
          <div className="absolute inset-0 bg-acid/5 rounded-none filter blur-2xl -z-10" />
          <PitchForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
}
