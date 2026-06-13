"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";

type GlowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

const GlowButton = memo(function GlowButton({
  children,
  className = "",
  ...rest
}: GlowButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "group inline-flex items-center justify-center px-6 py-2 rounded-md relative overflow-hidden font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
        "bg-neutral-900 dark:bg-white text-white dark:text-black border-0",
        "[--shine-glow:rgba(255,255,255,.5)] dark:[--shine-glow:rgba(0,0,0,.5)]",
        "hover:scale-[1.01] active:scale-[0.97] transition-transform duration-150",
        className,
      )}
    >
      <span
        className="tracking-wide font-light flex items-center justify-center h-full w-full relative z-10 animate-shine-mask-reverse"
        style={{
          WebkitMaskImage:
            "linear-gradient(75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
          maskImage:
            "linear-gradient(75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
        }}
      >
        {children}
      </span>

      <span
        className="block absolute inset-0 rounded-md p-px animate-shine-border pointer-events-none"
        style={{
          background:
            "linear-gradient(75deg, transparent 30%, var(--shine-glow) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />
    </button>
  );
});

export default GlowButton;
