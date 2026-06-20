import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/shared/SectionLabel";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/lib/constants";
import { ArrowLeft, Play } from "lucide-react";
import PitchCard from "@/components/pitch/PitchCard";

interface IndustryPageProps {
  params: Promise<{ industry: string }>;
}

export async function generateStaticParams() {
  return INDUSTRIES.map((ind) => ({
    industry: ind.slug,
  }));
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { industry: slug } = await params;
  const config = INDUSTRIES.find((ind) => ind.slug === slug);

  if (!config) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col w-full">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 md:py-16 w-full select-none">
        {/* Navigation */}
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-wider text-graphite hover:text-acid flex items-center gap-1.5 mb-8 transition-colors w-fit"
        >
          <ArrowLeft size={14} /> Back to main tool
        </Link>

        {/* Page Header */}
        <div className="border-b border-graphite/10 pb-8 mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-lg">{config.emoji}</span>
              <SectionLabel text={`Programmatic Landing Page`} />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-bone">
              Sales pitches for <span className="text-acid">{config.name}</span>
            </h1>
            <p className="mt-4 text-graphite font-sans text-sm leading-relaxed">
              {config.description} Browse our pre-compiled high-converting sales scripts below, or use the generator to customize pitches with your exact business details.
            </p>
          </div>

          <Link href="/">
            <Button variant="primary" className="gap-2 shrink-0">
              Run Generator Now <Play size={12} fill="currentColor" />
            </Button>
          </Link>
        </div>

        {/* Pre-seeded example pitches for SEO value */}
        <div className="mb-16">
          <SectionLabel text="Static Examples Archive" className="mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PitchCard
              type="email"
              subject={config.examples.email.subject.replace("{{Company}}", "prospect").replace("{{City}}", "your region")}
              content={config.examples.email.body.replace("{{Company}}", "prospect").replace("{{Name}}", "there").replace("{{City}}", "your region")}
            />
            <PitchCard
              type="call"
              content={config.examples.call.script.replace("{{Company}}", "prospect").replace("{{Name}}", "there")}
              meta={`Estimated duration: ${config.examples.call.duration}`}
            />
            <PitchCard
              type="dm"
              content={config.examples.dm.message.replace("{{Name}}", "there")}
              meta="LinkedIn Direct Message"
            />
          </div>
        </div>

        {/* Informational SEO Content Section */}
        <section className="bg-surface border border-graphite/10 p-8 md:p-12 flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/2 flex flex-col gap-4">
            <span className="font-mono text-xs text-acid uppercase tracking-wider">// PERSUASION PSYCHOLOGY</span>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-bone">
              How to write outreach scripts for {config.name}
            </h3>
            <p className="text-graphite font-sans text-xs md:text-sm leading-relaxed">
              When launching outbound sales sequences targeting clients in the {config.name} space, remember that decision-makers are heavily analytical. They get bombarded with templated fluff and generalities.
            </p>
            <p className="text-graphite font-sans text-xs md:text-sm leading-relaxed">
              Make sure to open with a specific observed friction point (like page speeds, conversion dropoffs, or occupancy metrics) instead of a standard greeting. Quantify your claim, outline the immediate value, and offer a soft low-barrier call to action.
            </p>
          </div>
          
          <div className="lg:w-1/2 flex flex-col justify-center gap-6 border-l-0 lg:border-l border-graphite/10 lg:pl-10">
            <h4 className="font-display text-lg font-bold text-bone uppercase tracking-tight">
              Looking for custom sales tools?
            </h4>
            <p className="text-graphite font-sans text-xs md:text-sm leading-relaxed">
              We construct tailormade automation sequences, data lead pipes, and CRM integrations to fully automate your outbound sales motions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://www.qevn.in" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="w-full text-center">
                  Visit QEVN.IN
                </Button>
              </a>
              <Link href="/">
                <Button variant="primary" className="w-full text-center">
                  Try Generator
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
