"use client";

import React from "react";

const components = [
  { category: "Interactive", name: "Reiatsu Card", slug: null },
  { category: "Form", name: "Chakra Input", slug: null },
  { category: "Display", name: "Shrine Cards", slug: "/docs/layout/shrine-cards" },
  { category: "Navigation", name: "Arc Selector", slug: null },
  { category: "Feedback", name: "Terminal Preloader", slug: "/docs/preloader/terminal-preloader" },
  { category: "Effect", name: "Liquid Metal", slug: null },
  { category: "Motion", name: "Glitch Text", slug: "/docs/effects/glitch-text" },
  { category: "Action", name: "Domain Button", slug: null },
];

export function ComponentShowcase() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        padding: "0 24px 128px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 700,
          lineHeight: 1.1,
          fontFamily: "inherit",
          margin: 0,
          marginBottom: 64,
          textAlign: "center",
          color: "transparent",
          backgroundImage: "linear-gradient(to right, #fafafa 50%, #52525b 85%, #3f3f46 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          letterSpacing: "-0.03em",
        }}
      >
        Built to be felt, not just seen.
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {components.map((comp, i) => (
          <a
            key={i}
            href={comp.slug || "#"}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 220,
              padding: "20px 24px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              textDecoration: "none",
              transition: "all 0.25s ease",
              cursor: comp.slug ? "pointer" : "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontFamily: "var(--font-mono), monospace",
                color: "#71717a",
                letterSpacing: "0.02em",
              }}
            >
              {comp.category}
            </span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                fontFamily: "inherit",
                color: "#fafafa",
                letterSpacing: "-0.01em",
              }}
            >
              {comp.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
