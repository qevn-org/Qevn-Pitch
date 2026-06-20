"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import ExamplePitches from "@/components/home/ExamplePitches";
import CTABanner from "@/components/home/CTABanner";
import TerminalReveal from "@/components/pitch/TerminalReveal";
import PitchOutput from "@/components/pitch/PitchOutput";
import EmailCapture from "@/components/shared/EmailCapture";
import { useGeneratePitch } from "@/hooks/useGeneratePitch";

export default function Home() {
  const {
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
  } = useGeneratePitch();

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailReason, setEmailReason] = useState<"rate_limit" | "share">("rate_limit");
  const [hasEmail, setHasEmail] = useState(false);

  // Check if lead-email cookie exists
  useEffect(() => {
    const checkEmail = () => {
      const cookies = document.cookie.split(";");
      const emailCookie = cookies.find((c) => c.trim().startsWith("lead-email="));
      setHasEmail(!!emailCookie);
    };
    checkEmail();
  }, []);

  // Handle rate limit state
  useEffect(() => {
    if (rateLimitReached) {
      setEmailReason("rate_limit");
      setIsEmailModalOpen(true);
    }
  }, [rateLimitReached]);

  const handleFormSubmit = (data: {
    description: string;
    targetCustomer: string;
    industry: string;
  }) => {
    generatePitch(data);
  };

  const handleShareClick = () => {
    if (hasEmail) {
      // Direct copy link to clipboard since email is captured
      const shareUrl = `${window.location.origin}/pitch/${shareSlug || "demo"}`;
      navigator.clipboard.writeText(shareUrl);
      alert("Shareable link copied to clipboard!");
    } else {
      // Trigger email capture modal
      setEmailReason("share");
      setIsEmailModalOpen(true);
    }
  };

  const handleEmailSuccess = (email: string) => {
    setHasEmail(true);
    setRateLimitReached(false);
    
    if (emailReason === "share") {
      const shareUrl = `${window.location.origin}/pitch/${shareSlug || "demo"}`;
      navigator.clipboard.writeText(shareUrl);
      setTimeout(() => {
        alert("Success! Permanent shareable link copied to clipboard!");
      }, 500);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full relative">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* If terminal is active, show the terminal reveal centered */}
        {showTerminal ? (
          <div className="flex-1 max-w-2xl mx-auto px-6 py-24 flex items-center justify-center w-full">
            <TerminalReveal
              industry={activeIndustry}
              onComplete={handleTerminalComplete}
            />
          </div>
        ) : pitch ? (
          /* If pitch is generated, show output */
          <div className="max-w-7xl mx-auto px-6 py-16 w-full">
            <PitchOutput
              pitch={pitch}
              onReset={resetGenerator}
              onShare={handleShareClick}
              shareSlug={shareSlug || undefined}
            />
          </div>
        ) : (
          /* Default state: Hero containing form, and info sections */
          <>
            <Hero onSubmit={handleFormSubmit} isLoading={isLoading} />
            
            {error && !rateLimitReached && (
              <div className="max-w-md mx-auto px-6 mb-8 w-full">
                <div className="bg-red-950/20 border border-red-900/50 p-4 font-mono text-xs text-red-400 text-center">
                  {error}
                </div>
              </div>
            )}

            <HowItWorks />
            <ExamplePitches />
            <CTABanner />
          </>
        )}
      </main>

      <Footer />

      {/* Gating modal */}
      <EmailCapture
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSuccess={handleEmailSuccess}
        reason={emailReason}
        pitchId={shareSlug}
      />
    </div>
  );
}
