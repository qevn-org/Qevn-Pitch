"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/build", label: "Build Journal" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-void/90 backdrop-blur-md border-b border-graphite/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 select-none">
          <span className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-bone group-hover:text-acid transition-colors">
            QEVN
          </span>
          <span className="bg-acid text-void font-mono text-[10px] md:text-xs font-bold px-1.5 py-0.5 tracking-widest rounded-sm">
            PITCH
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                  isActive ? "text-acid font-bold" : "text-graphite hover:text-bone"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://qevn.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-void bg-bone hover:bg-acid hover:text-void px-3 py-1.5 font-bold transition-all duration-200"
          >
            Visit QEVN.IN →
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-bone hover:text-acid p-1"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-void border-b border-graphite/10 py-6 px-6 flex flex-col gap-4 animate-fade-in shadow-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-mono text-xs uppercase tracking-wider py-2 border-b border-surface ${
                  isActive ? "text-acid font-bold" : "text-graphite hover:text-bone"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://qevn.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-void bg-bone hover:bg-acid text-center py-2.5 font-bold transition-all duration-200 mt-2"
          >
            Visit QEVN.IN →
          </a>
        </div>
      )}
    </header>
  );
}
