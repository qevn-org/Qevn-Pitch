import React from "react";
import SectionLabel from "../shared/SectionLabel";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Tell Us What You Do",
      desc: "Specify your industry niche, describe your offer, and identify your ideal customer. Just 3 fields, no registration required.",
    },
    {
      num: "02",
      title: "Wait 60 Seconds",
      desc: "Claude engine parses your business profile, applies industry copywriting psychology, and writes 3 distinct sales copy variations.",
    },
    {
      num: "03",
      title: "Get The Outputs",
      desc: "Instantly copy the cold email, phone opener script, or LinkedIn message. Gate a shareable link or keep generating by saving leads.",
    },
  ];

  return (
    <section className="w-full bg-surface/30 border-y border-graphite/10 py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Background grid layer */}
      <div className="absolute inset-0 grid-bg opacity-[0.3] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div>
            <SectionLabel text="Process System" className="mb-2" />
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-bone">
              How the <span className="text-acid">Generator</span> works
            </h2>
          </div>
          <p className="text-graphite font-sans text-xs md:text-sm max-w-md md:text-right leading-relaxed">
            Standard AI generators write generic paragraphs. Our model uses structured inputs to output specialized formats for different channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-surface/50 border border-graphite/10 p-6 md:p-8 flex flex-col justify-between group hover:border-acid/30 transition-all duration-300 relative"
            >
              {/* Top notch */}
              <div className="absolute top-0 right-0 font-mono text-[10px] text-graphite/40 bg-void border-l border-b border-graphite/10 px-3 py-1">
                STEP {step.num}
              </div>

              <div>
                <span className="font-display text-4xl md:text-5xl font-bold text-acid/20 group-hover:text-acid transition-colors duration-300 block mb-6">
                  {step.num}
                </span>
                <h3 className="font-display text-lg md:text-xl font-bold text-bone uppercase tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-graphite font-sans text-xs md:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
