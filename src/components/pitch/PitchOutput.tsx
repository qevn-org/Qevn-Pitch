"use client";

import React from "react";
import PitchCard from "./PitchCard";
import SectionLabel from "../shared/SectionLabel";
import Button from "../shared/Button";
import { RotateCcw, Share2 } from "lucide-react";

interface PitchData {
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
}

interface PitchOutputProps {
  pitch: PitchData;
  onReset: () => void;
  onShare: () => void;
  shareSlug?: string;
}

export default function PitchOutput({
  pitch,
  onReset,
  onShare,
  shareSlug,
}: PitchOutputProps) {
  return (
    <div className="w-full flex flex-col gap-8 animate-fade-in">
      {/* Top Output Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-graphite/10 pb-6">
        <div>
          <SectionLabel text="Outbound Materials" className="mb-2" />
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-bone">
            Your Generated <span className="text-acid">Pitches</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary" onClick={onReset} className="gap-2">
            <RotateCcw size={14} /> New Pitch
          </Button>
          <Button variant="primary" onClick={onShare} className="gap-2">
            <Share2 size={14} /> {shareSlug ? "Copy Share Link" : "Save & Share Link"}
          </Button>
        </div>
      </div>

      {/* Grid of 3 Formats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PitchCard
          type="email"
          subject={pitch.cold_email.subject}
          content={pitch.cold_email.body}
          onShareClick={onShare}
        />
        
        <PitchCard
          type="call"
          content={pitch.cold_call.script}
          meta={`Duration: ${pitch.cold_call.duration_estimate}`}
          onShareClick={onShare}
        />

        <PitchCard
          type="dm"
          content={pitch.linkedin_dm.message}
          meta={`Length: ${pitch.linkedin_dm.character_count} chars`}
          onShareClick={onShare}
        />
      </div>
    </div>
  );
}
