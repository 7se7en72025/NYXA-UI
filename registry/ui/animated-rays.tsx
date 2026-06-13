"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedRaysProps {
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedRays({
  className = "",
  children,
}: AnimatedRaysProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTheme = () => {
      const html = document.documentElement;
      const currentTheme = html.getAttribute("data-theme") as "dark" | "light";
      setTheme(currentTheme || "dark");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  const stripeColor = theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)";
  const stripes = `repeating-linear-gradient(
    100deg,
    ${stripeColor} 0%,
    ${stripeColor} 7%,
    transparent 10%,
    transparent 12%,
    ${stripeColor} 16%
  )`;
  const rainbow = `repeating-linear-gradient(
    100deg,
    #60a5fa 10%,
    #e879f9 15%,
    #60a5fa 20%,
    #5eead4 25%,
    #60a5fa 30%
  )`;

  return (
    <section className={cn("relative w-full h-full overflow-hidden", className)}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `${stripes}, ${rainbow}`,
          backgroundSize: "300%, 200%",
          backgroundPosition: "50% 50%, 50% 50%",
          filter:
            theme === "dark"
              ? "blur(6px) opacity(70%) saturate(150%)"
              : "blur(6px) invert(100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 52px, black 52px)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 52px, black 52px)",
          maskComposite: "intersect",
          WebkitMaskComposite: "destination-in",
        }}
      >
        <div
          className="absolute inset-0 animate-aurora-bg"
          style={{
            backgroundImage: `${stripes}, ${rainbow}`,
            backgroundSize: "200%, 100%",
            backgroundAttachment: "fixed",
            mixBlendMode: "difference",
          }}
        />
      </div>

      {children && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          {children}
        </div>
      )}
    </section>
  );
}

export default AnimatedRays;
