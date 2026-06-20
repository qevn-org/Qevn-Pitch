"use client";

import React, { useState } from "react";
import { Clipboard, Check, Share2 } from "lucide-react";
import Badge from "../shared/Badge";

interface PitchCardProps {
  type: "email" | "call" | "dm";
  content: string;
  subject?: string;
  meta?: string;
  onShareClick?: () => void;
}

export default function PitchCard({
  type,
  content,
  subject,
  meta,
  onShareClick,
}: PitchCardProps) {
  const [copied, setCopied] = useState(false);

  const typeConfig = {
    email: {
      badge: "📧 Cold Email",
      label: "Format: Email Outreach",
    },
    call: {
      badge: "📞 Call Opener",
      label: "Format: 15s Opener",
    },
    dm: {
      badge: "💬 LinkedIn DM",
      label: "Format: Direct Message",
    },
  };

  const handleCopy = () => {
    const textToCopy = subject ? `Subject: ${subject}\n\n${content}` : content;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface border-l-4 border-l-acid border-y border-r border-graphite/10 p-6 flex flex-col justify-between group hover:border-r-acid/30 transition-all duration-300 relative">
      <div>
        {/* Top Info */}
        <div className="flex items-center justify-between gap-4 mb-4 border-b border-void pb-3">
          <span className="font-mono text-[10px] font-bold text-acid uppercase tracking-widest">
            {typeConfig[type].badge}
          </span>
          <span className="font-mono text-[9px] text-graphite uppercase tracking-wider">
            {typeConfig[type].label}
          </span>
        </div>

        {/* Content Area */}
        <div className="font-sans text-xs md:text-sm text-bone/90 leading-relaxed mb-6 whitespace-pre-wrap select-all">
          {type === "email" && subject && (
            <div className="mb-4 bg-void/50 border border-graphite/10 px-3 py-2">
              <span className="font-mono text-[10px] text-graphite block uppercase tracking-wider mb-1">
                Subject Line:
              </span>
              <strong className="text-bone font-sans font-bold">{subject}</strong>
            </div>
          )}
          
          <div className="bg-void/35 p-3 border border-graphite/5 font-mono text-[11px] md:text-xs">
            {content}
          </div>

          {meta && (
            <div className="font-mono text-[9px] text-acid/80 uppercase tracking-widest mt-3">
              // {meta}
            </div>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between border-t border-void pt-4 mt-auto">
        <button
          onClick={handleCopy}
          className="font-mono text-[10px] uppercase tracking-wider text-graphite hover:text-acid flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={12} className="text-acid" /> Copied!
            </>
          ) : (
            <>
              <Clipboard size={12} /> Copy Pitch
            </>
          )}
        </button>

        {onShareClick && (
          <button
            onClick={onShareClick}
            className="font-mono text-[10px] uppercase tracking-wider text-bone hover:text-acid flex items-center gap-1.5 transition-colors cursor-pointer font-bold"
          >
            <Share2 size={12} /> Share & Save
          </button>
        )}
      </div>
    </div>
  );
}
