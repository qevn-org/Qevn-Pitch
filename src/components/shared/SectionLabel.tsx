import React from "react";

interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = "" }: SectionLabelProps) {
  return (
    <div className={`section-label flex items-center gap-2 select-none ${className}`}>
      <span className="text-acid">//</span>
      <span className="font-mono text-xs uppercase tracking-widest text-graphite">{text}</span>
    </div>
  );
}
