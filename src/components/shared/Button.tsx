import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono text-xs md:text-sm font-bold uppercase tracking-wider px-6 py-3.5 transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";
  
  const variants = {
    primary:
      "bg-acid text-void hover:bg-signal border border-transparent shadow-[0_4px_20px_rgba(182,247,110,0.15)] hover:shadow-[0_4px_25px_rgba(232,255,176,0.3)]",
    secondary:
      "border-2 border-acid text-acid hover:bg-acid hover:text-void shadow-none",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
