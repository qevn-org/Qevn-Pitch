"use client";

import { useState } from "react";

export interface PitchData {
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

export function useGeneratePitch() {
  const [pitch, setPitch] = useState<PitchData | null>(null);
  const [shareSlug, setShareSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [rateLimitReached, setRateLimitReached] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep track of parameters for terminal styling
  const [activeIndustry, setActiveIndustry] = useState("");

  const generatePitch = async (inputs: {
    description: string;
    targetCustomer: string;
    industry: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setRateLimitReached(false);
    setActiveIndustry(inputs.industry);

    try {
      // Trigger API generate
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 && data.error === "RATE_LIMIT_EXCEEDED") {
          setRateLimitReached(true);
          setError(data.message);
          setIsLoading(false);
          return;
        }
        throw new Error(data.message || "Something went wrong.");
      }

      // API returned data successfully. Let's start the terminal animation!
      setShowTerminal(true);

      // Store the result temporarily
      setPitch(data.pitch);
      setShareSlug(data.shareSlug);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Couldn't generate that one. Try a sharper description.");
      setIsLoading(false);
    }
  };

  const handleTerminalComplete = () => {
    setShowTerminal(false);
    setIsLoading(false);
  };

  const resetGenerator = () => {
    setPitch(null);
    setShareSlug(null);
    setIsLoading(false);
    setShowTerminal(false);
    setError(null);
  };

  return {
    pitch,
    shareSlug,
    isLoading,
    showTerminal,
    rateLimitReached,
    error,
    activeIndustry,
    generatePitch,
    handleTerminalComplete,
    resetGenerator,
    setRateLimitReached,
  };
}
