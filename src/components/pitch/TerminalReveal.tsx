"use client";

import React, { useState, useEffect, useRef } from "react";

interface TerminalRevealProps {
  onComplete: () => void;
  industry: string;
}

export default function TerminalReveal({ onComplete, industry }: TerminalRevealProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [text, setText] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const logs = [
    `> INITIALIZING ENGINE: connect_claude_api_3.5...`,
    `> ANALYZING INPUT: industry_slug="${industry}"`,
    `> ANALYZING VALUE PROPOSITION: searching market gaps...`,
    `> GENERATING FORMAT 01: cold_email_sequence (Subject + 4 Paragraphs)...`,
    `> GENERATING FORMAT 02: cold_call_opener (15-second conversational script)...`,
    `> GENERATING FORMAT 03: linkedin_direct_message (under 300 characters)...`,
    `> SYNCHRONIZING STRUCTURES: parsing JSON response...`,
    `> SYSTEM SUCCESS: 3 outputs compiled.`,
  ];

  useEffect(() => {
    if (currentLineIndex < logs.length) {
      const fullLine = logs[currentLineIndex];
      let charIndex = 0;
      setText("");

      const interval = setInterval(() => {
        if (charIndex < fullLine.length) {
          setText((prev) => prev + fullLine[charIndex]);
          charIndex++;
        } else {
          clearInterval(interval);
          setLines((prev) => [...prev, fullLine]);
          setCurrentLineIndex((prev) => prev + 1);
        }
      }, 15); // Fast typing speed

      return () => clearInterval(interval);
    } else {
      // Terminal animations finished, wait 1s before showing results
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, text]);

  return (
    <div className="w-full bg-void border-2 border-acid/30 font-mono text-[10px] md:text-xs text-bone p-6 relative shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-surface pb-3 mb-4 select-none">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-acid/50" />
        </div>
        <span className="text-graphite font-bold uppercase tracking-wider text-[9px] md:text-[10px]">
          qevn-generator-terminal.sh
        </span>
        <div className="w-10" />
      </div>

      {/* Terminal logs content */}
      <div className="min-h-[220px] max-h-[300px] overflow-y-auto flex flex-col gap-2 leading-relaxed">
        {lines.map((line, idx) => (
          <div key={idx} className={line.includes("SYSTEM SUCCESS") ? "text-acid font-bold" : ""}>
            {line}
          </div>
        ))}
        {currentLineIndex < logs.length && (
          <div className="terminal-cursor">
            {text}
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
