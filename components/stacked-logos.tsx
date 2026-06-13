"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface StackedLogosProps {
  logoGroups: React.ReactNode[][];
  duration?: number;
  stagger?: number;
  logoWidth?: string;
  className?: string;
}

export const StackedLogos = ({
  logoGroups,
  duration = 30,
  stagger = 0,
  logoWidth = "200px",
  className,
}: StackedLogosProps) => {
  const columns = logoGroups.length;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className={cn("stacked-logos relative w-auto", className)}
      style={
        {
          "--duration": duration,
          "--items": logoGroups[0]?.length || 0,
          "--lists": columns,
          "--stagger": stagger,
          "--logo-width": logoWidth,
          "--cell-height": "128px",
        } as React.CSSProperties
      }
      onMouseMove={handleMouseMove}
    >
      <div
        ref={gridRef}
        className="grid relative mx-auto w-fit"
        style={{ gridTemplateColumns: `repeat(${columns}, ${logoWidth})` }}
      >
        <div
          className="stacked-logos__glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-10"
          style={{
            background:
              "radial-gradient(500px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(251,191,36,0.08), transparent 70%)",
          }}
        />

        <div
          className="stacked-logos__border-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-20"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(251,191,36,0.8), transparent 40%)",
            maskImage: `repeating-linear-gradient(to right, transparent, transparent calc(${logoWidth} - 1px), black calc(${logoWidth} - 1px), black ${logoWidth}), linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px), black 100%)`,
            WebkitMaskImage: `repeating-linear-gradient(to right, transparent, transparent calc(${logoWidth} - 1px), black calc(${logoWidth} - 1px), black ${logoWidth}), linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px), black 100%)`,
            maskComposite: "add",
            WebkitMaskComposite: "source-over",
          }}
        />

        {logoGroups.map((logos, groupIndex) => (
          <div
            key={groupIndex}
            className="stacked-logos__cell relative grid"
            style={{ "--index": groupIndex, gridTemplate: "1fr / 1fr" } as React.CSSProperties}
          >
            <div className="absolute top-0 bottom-0 right-0 w-px bg-zinc-800" />
            <div className="absolute left-0 right-0 bottom-0 h-px bg-zinc-800" />
            <div className="absolute left-0 right-0 top-0 h-px bg-zinc-800" />
            {groupIndex === 0 && (
              <div className="absolute top-0 bottom-0 left-0 w-px bg-zinc-800" />
            )}

            {logos.map((logo, logoIndex) => (
              <div
                key={logoIndex}
                className="stacked-logos__item col-start-1 row-start-1 grid place-items-center py-16 px-8"
                data-logo
                style={{ "--i": logoIndex } as React.CSSProperties}
              >
                <div className="stacked-logos__logo w-full h-8 flex items-center justify-center [&>svg]:h-full [&>svg]:w-auto [&>svg]:fill-zinc-300 [&>img]:h-full [&>img]:w-auto [&>img]:object-contain">
                  {logo}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

StackedLogos.displayName = "StackedLogos";

export default StackedLogos;
