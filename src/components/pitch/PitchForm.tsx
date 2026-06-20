"use client";

import React, { useState } from "react";
import SectionLabel from "../shared/SectionLabel";
import Button from "../shared/Button";
import { INDUSTRIES } from "@/lib/constants";

interface PitchFormProps {
  onSubmit: (data: {
    description: string;
    targetCustomer: string;
    industry: string;
  }) => void;
  isLoading: boolean;
}

export default function PitchForm({ onSubmit, isLoading }: PitchFormProps) {
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry) {
      setError("Please select your industry.");
      return;
    }
    if (!description.trim() || description.length < 10) {
      setError("Please provide a description of what you sell (min 10 characters).");
      return;
    }
    if (!targetCustomer.trim() || targetCustomer.length < 5) {
      setError("Please describe your target customer (min 5 characters).");
      return;
    }

    setError("");
    onSubmit({ description, targetCustomer, industry });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-surface border-2 border-graphite/10 p-6 md:p-8 flex flex-col gap-6 md:gap-8 acid-border-glow shadow-2xl relative"
    >
      {/* Decorative corners for maximalist aesthetic */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-acid" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-acid" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-acid" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-acid" />

      <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-bone mb-2">
        Start Generation
      </h3>

      {/* Field 1: Industry */}
      <div className="flex flex-col gap-2">
        <SectionLabel text="01 — Your Niche / Industry" />
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          disabled={isLoading}
          className="w-full bg-void border-2 border-graphite/20 hover:border-acid/50 text-bone font-mono text-xs px-4 py-3 rounded-none outline-none focus:border-acid transition-all duration-200 cursor-pointer disabled:opacity-50"
        >
          <option value="" disabled>
            Select Niche...
          </option>
          {INDUSTRIES.map((ind) => (
            <option key={ind.slug} value={ind.slug}>
              {ind.emoji} {ind.name}
            </option>
          ))}
        </select>
      </div>

      {/* Field 2: Description */}
      <div className="flex flex-col gap-2">
        <SectionLabel text="02 — What do you sell?" />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          rows={3}
          placeholder="e.g. I run a digital marketing agency that helps local restaurants get bookings via Instagram Ads..."
          className="w-full bg-void border-2 border-graphite/20 hover:border-acid/50 text-bone font-mono text-xs px-4 py-3 rounded-none outline-none focus:border-acid transition-all duration-200 resize-none disabled:opacity-50"
        />
      </div>

      {/* Field 3: Target Customer */}
      <div className="flex flex-col gap-2">
        <SectionLabel text="03 — Target Customer" />
        <input
          type="text"
          value={targetCustomer}
          onChange={(e) => setTargetCustomer(e.target.value)}
          disabled={isLoading}
          placeholder="e.g. Restaurant owners doing $500K–$2M revenue"
          className="w-full bg-void border-2 border-graphite/20 hover:border-acid/50 text-bone font-mono text-xs px-4 py-3 rounded-none outline-none focus:border-acid transition-all duration-200 disabled:opacity-50"
        />
      </div>

      {/* Error state */}
      {error && (
        <div className="font-mono text-xs text-red-400 bg-red-950/20 border border-red-900/50 px-3 py-2">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} variant="primary" className="w-full justify-center">
        {isLoading ? "Analyzing..." : "Generate my pitch"}
      </Button>

      <div className="font-mono text-[10px] text-graphite/50 text-center select-none">
        * No registration required for first 3 generations.
      </div>
    </form>
  );
}
