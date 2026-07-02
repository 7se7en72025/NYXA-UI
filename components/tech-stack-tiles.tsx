"use client";

import React from "react";

export function TechStackTiles() {
  return (
    <section className="relative w-full overflow-hidden py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative rounded-2xl border border-cyan-500/20 bg-black/80 p-8 backdrop-blur-sm">
          {/* HUD corner accents */}
          <div className="pointer-events-none absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-cyan-400/60" />
          <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-cyan-400/60" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-cyan-400/60" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-cyan-400/60" />

          {/* Top status bar */}
          <div className="mb-8 flex items-center justify-between text-xs font-mono text-cyan-400/80">
            <div className="flex gap-6">
              <span>CLEN</span>
              <span>MSL</span>
              <span>FUEL</span>
              <span>HBRT</span>
            </div>
            <span>PWR</span>
          </div>

          {/* Tech stack SVG */}
          <div className="flex justify-center">
            <img
              src="/techstack.svg"
              alt="Tech Stack - Department of Visual Media"
              className="h-auto w-full max-w-4xl drop-shadow-[0_0_30px_rgba(0,242,254,0.3)]"
            />
          </div>

          {/* Bottom status bar */}
          <div className="mt-8 border-t border-cyan-500/20 pt-4 text-center font-mono text-xs text-cyan-400/60">
            DEPARTMENT OF VISUAL MEDIA
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechStackTiles;
