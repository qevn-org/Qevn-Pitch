import React from "react";

interface BadgeProps {
  text: string;
  className?: string;
}

export default function Badge({ text, className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-sm bg-surface border border-graphite/20 px-2 py-1 font-mono text-[10px] md:text-xs font-medium text-bone uppercase tracking-wider ${className}`}>
      {text}
    </span>
  );
}
