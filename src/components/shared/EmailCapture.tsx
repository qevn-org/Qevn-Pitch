"use client";

import React, { useState } from "react";
import SectionLabel from "./SectionLabel";
import Button from "./Button";
import { X, Lock, Mail, Check } from "lucide-react";

interface EmailCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
  pitchId?: string | null;
  reason: "rate_limit" | "share";
}

export default function EmailCapture({
  isOpen,
  onClose,
  onSuccess,
  pitchId,
  reason,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pitchId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit email.");
      }

      setSubmitted(true);
      setTimeout(() => {
        onSuccess(email);
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const texts = {
    rate_limit: {
      tag: "Rate Limit Reached",
      title: "Keep generating pitches",
      desc: "You've generated 3 pitches this session. Drop your email to unlock unlimited generations.",
      button: "Unlock Unlimited Access",
    },
    share: {
      tag: "Convenience Layer Gate",
      title: "Save & Share Pitch",
      desc: "Drop your email to generate a permanent shareable link and copy these scripts anytime.",
      button: "Save & Get Share Link",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-void/85 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="bg-surface border-2 border-acid/30 max-w-md w-full p-6 md:p-8 relative z-10 shadow-[0_0_50px_rgba(182,247,110,0.1)] select-none">
        {/* Decorative corner blocks */}
        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-acid" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-acid" />
        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-acid" />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-acid" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-graphite hover:text-acid transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full border-2 border-acid flex items-center justify-center text-acid mb-4 animate-bounce">
              <Check size={24} />
            </div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-bone mb-2">
              Access Granted
            </h3>
            <p className="font-mono text-xs text-graphite">
              Loading generation sequence capabilities...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <SectionLabel text={texts[reason].tag} />
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-bone">
                {texts[reason].title}
              </h3>
              <p className="text-graphite font-sans text-xs md:text-sm leading-relaxed">
                {texts[reason].desc}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  placeholder="name@company.com"
                  className="w-full bg-void border-2 border-graphite/20 hover:border-acid/50 text-bone font-mono text-xs pl-10 pr-4 py-3.5 rounded-none outline-none focus:border-acid transition-all duration-200"
                />
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite"
                />
              </div>
              {error && <span className="font-mono text-[10px] text-red-400 mt-1">{error}</span>}
            </div>

            <Button type="submit" disabled={isLoading} variant="primary" className="w-full">
              {isLoading ? "Unlocking..." : texts[reason].button}
            </Button>

            <div className="flex items-center justify-center gap-1.5 font-mono text-[9px] text-graphite/50">
              <Lock size={10} />
              <span>SPAM SHIELD ACTIVE. WE NEVER LEAK DATA.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
