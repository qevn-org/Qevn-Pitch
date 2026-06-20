import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PitchCard from "@/components/pitch/PitchCard";
import SectionLabel from "@/components/shared/SectionLabel";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { INDUSTRIES } from "@/lib/constants";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface PitchPageData {
  id: string;
  industry: string;
  description: string;
  targetCustomer: string;
  cold_email: {
    subject: string;
    body: string;
  };
  cold_call: {
    script: string;
    duration_estimate: string;
  };
  linkedin_dm: {
    message: string;
    character_count: number;
  };
  isMock?: boolean;
}

async function getPitch(id: string): Promise<PitchPageData> {
  if (!supabase) {
    return getFallbackPitch(id);
  }

  const { data, error } = await supabase
    .from("pitches")
    .select("*")
    .eq("share_slug", id)
    .single();

  if (error || !data) {
    return getFallbackPitch(id);
  }

  return {
    id: data.id,
    industry: data.industry,
    description: data.business_description,
    targetCustomer: data.target_customer,
    cold_email: data.generated_email as any,
    cold_call: data.generated_call_script as any,
    linkedin_dm: data.generated_dm as any,
  };
}

function getFallbackPitch(id: string): PitchPageData {
  // Use first industry (SaaS) as a mockup fallback
  const ind = INDUSTRIES[0];
  return {
    id,
    industry: ind.slug,
    description: "Cloud infrastructure provisioning dashboard",
    targetCustomer: "DevOps leads at high-growth startups",
    cold_email: {
      subject: ind.examples.email.subject.replace("{{Company}}", "startup"),
      body: ind.examples.email.body.replace("{{Company}}", "startup").replace("{{Name}}", "DevOps Lead").replace("{{City}}", "your region"),
    },
    cold_call: {
      script: ind.examples.call.script.replace("{{Company}}", "startup").replace("{{Name}}", "there"),
      duration_estimate: ind.examples.call.duration,
    },
    linkedin_dm: {
      message: ind.examples.dm.message.replace("{{Name}}", "there"),
      character_count: ind.examples.dm.message.length,
    },
    isMock: true,
  };
}

export default async function PitchPage({ params }: PageProps) {
  const { id } = await params;
  const pitch = await getPitch(id);

  return (
    <div className="flex-1 flex flex-col w-full">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 md:py-16 w-full">
        {/* Back Link */}
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-wider text-graphite hover:text-acid flex items-center gap-1.5 mb-8 transition-colors w-fit select-none"
        >
          <ArrowLeft size={14} /> Back to generator
        </Link>

        {/* Database warning if running in mock mode */}
        {pitch.isMock && (
          <div className="bg-yellow-950/20 border border-yellow-900/50 p-4 font-mono text-[10px] md:text-xs text-yellow-400 mb-8 select-none">
            [MOCK DATA ACTIVE] Supabase connection parameters are currently unconfigured. Showing fallback SaaS pitch example.
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-graphite/10 pb-6 mb-8 select-none">
          <div>
            <SectionLabel text={`Pitch Result: #${id}`} className="mb-2" />
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-bone">
              Tailored <span className="text-acid">Outbound</span> Kit
            </h1>
            <p className="text-graphite font-mono text-[10px] md:text-xs mt-1">
              Generated for: {pitch.description.slice(0, 50)}... targeting {pitch.targetCustomer}
            </p>
          </div>

          <Link href="/">
            <Button variant="primary" className="gap-2">
              Generate Your Pitch <ArrowUpRight size={14} />
            </Button>
          </Link>
        </div>

        {/* Display Output Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <PitchCard
            type="email"
            subject={pitch.cold_email.subject}
            content={pitch.cold_email.body}
          />
          
          <PitchCard
            type="call"
            content={pitch.cold_call.script}
            meta={`Duration: ${pitch.cold_call.duration_estimate}`}
          />

          <PitchCard
            type="dm"
            content={pitch.linkedin_dm.message}
            meta={`Length: ${pitch.linkedin_dm.character_count} chars`}
          />
        </div>

        {/* CTA section */}
        <div className="bg-surface border border-graphite/10 p-6 md:p-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 select-none">
          <div>
            <h3 className="font-display text-lg font-bold text-bone uppercase tracking-tight mb-2">
              Want to scale your sales prospecting?
            </h3>
            <p className="text-graphite font-sans text-xs md:text-sm max-w-xl">
              We help high-growth companies build targeted lead generation systems, automated outreach funnels, and data scraping dashboards.
            </p>
          </div>
          <a
            href="https://www.qevn.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" className="gap-2 shrink-0">
              Explore QEVN Agency <ArrowUpRight size={14} />
            </Button>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
