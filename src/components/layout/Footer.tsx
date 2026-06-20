import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-void border-t border-graphite/10 mt-auto py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Branding Col */}
        <div className="md:col-span-6 flex flex-col items-start gap-4">
          <div className="flex items-center gap-2 select-none">
            <span className="font-display text-xl font-bold uppercase tracking-tight text-bone">
              QEVN
            </span>
            <span className="bg-acid text-void font-mono text-[10px] font-bold px-1.5 py-0.5 tracking-widest rounded-sm">
              PITCH
            </span>
          </div>
          <p className="text-graphite font-sans text-xs md:text-sm max-w-sm leading-relaxed">
            Free high-speed sales pitch builder generated in under 60 seconds. Shipped publicly in 10 days to demonstrate building capabilities of QEVN.
          </p>
          <div className="text-[10px] font-mono text-graphite/60 mt-2 uppercase tracking-widest">
            // SHIPPED IN 10 DAYS BY HUMAN TASTE
          </div>
        </div>

        {/* Links Col 1 */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h4 className="font-mono text-xs text-bone uppercase tracking-widest font-semibold border-b border-surface pb-2">
            Navigation
          </h4>
          <Link href="/" className="font-mono text-[11px] uppercase tracking-wider text-graphite hover:text-acid transition-colors">
            Generator
          </Link>
          <Link href="/build" className="font-mono text-[11px] uppercase tracking-wider text-graphite hover:text-acid transition-colors">
            Build Journal
          </Link>
          <Link href="/about" className="font-mono text-[11px] uppercase tracking-wider text-graphite hover:text-acid transition-colors">
            About Experiment
          </Link>
        </div>

        {/* Links Col 2 */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h4 className="font-mono text-xs text-bone uppercase tracking-widest font-semibold border-b border-surface pb-2">
            The Automation Agency
          </h4>
          <a
            href="https://www.qevn.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-wider text-graphite hover:text-acid transition-colors flex items-center gap-1 group"
          >
            QEVN Main Agency <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="https://www.qevn.in/qevn-decoded"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-wider text-graphite hover:text-acid transition-colors flex items-center gap-1 group"
          >
            Our Case Studies <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="https://calendly.com/hello-qevn/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-wider text-acid font-bold transition-colors flex items-center gap-1 group"
          >
            Book Strategy Call <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-acid" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-surface mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-xs font-mono text-graphite/55">
        <div>
          &copy; {new Date().getFullYear()} QEVN Automation Agency (www.qevn.in). All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="https://www.qevn.in/legal/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-bone cursor-pointer transition-colors">Privacy</a>
          <span>&middot;</span>
          <a href="https://www.qevn.in/legal/terms" target="_blank" rel="noopener noreferrer" className="hover:text-bone cursor-pointer transition-colors">Terms of Service</a>
          <span>&middot;</span>
          <span className="text-acid">// Built with Next.js 15 & OpenAI GPT</span>
        </div>
      </div>
    </footer>
  );
}
