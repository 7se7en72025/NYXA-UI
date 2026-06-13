"use client";

import { useEffect, useState, useRef } from "react";
import { LiquidMetalBadge } from "./liquid-metal";
import { AnimatedRays } from "./animated-rays";
import AnimatedButton from "./animated-button";
import GlowButton from "./glow-button";

export function Hero() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  return (
    <AnimatedRays className="min-h-screen">
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 120px",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: theme === "dark"
            ? "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: theme === "dark"
            ? "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
            : "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 720, position: "relative", zIndex: 1 }}>
        <LiquidMetalBadge
          metalConfig={{
            colorBack: theme === "dark" ? "#1a1a1a" : "#d4d4d4",
            colorTint: theme === "dark" ? "#444" : "#fff",
            speed: 0.3,
            repetition: 3,
            distortion: 0.1,
          }}
        >
          <span style={{ color: theme === "dark" ? "#888" : "#666" }}>MIT Licensed</span>
          <span style={{ display: "inline-block", width: 6 }} />
          <span style={{ color: theme === "dark" ? "#fff" : "#000", fontWeight: 500 }}>Open Source 2026</span>
        </LiquidMetalBadge>

        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0,
            fontFamily: "inherit",
          }}
        >
          <span style={{ color: theme === "dark" ? "#fff" : "#0d0d0d" }}>Form follows </span>
          <span
            style={{
              color: theme === "dark" ? "transparent" : "transparent",
              WebkitTextStroke: theme === "dark" ? "1.5px #444" : "0px transparent",
              backgroundImage: theme === "dark"
                ? "linear-gradient(180deg, #555 0%, #222 100%)"
                : "linear-gradient(180deg, #888 0%, #bbb 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            force.
          </span>
        </h1>

        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: theme === "dark" ? "#999" : "#666",
            fontFamily: "inherit",
            marginTop: 24,
            maxWidth: 480,
            letterSpacing: "0.01em",
          }}
        >
          Components built around motion, intention, and weight. How they move and respond matters more than how they sit on a screen.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 40,
          }}
        >
          <GlowButton>
            Explore components
          </GlowButton>
          <AnimatedButton
            onClick={() => window.open("https://github.com/7se7en72025/kata-ui", "_blank")}
          >
            View GitHub
          </AnimatedButton>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 60,
          top: "50%",
          transform: "translateY(-50%)",
          width: 400,
          height: 400,
          opacity: 0.9,
        }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme === "dark" ? "#333" : "#ccc"} />
              <stop offset="100%" stopColor={theme === "dark" ? "#1a1a1a" : "#e0e0e0"} />
            </linearGradient>
          </defs>

          <g transform="translate(200, 180)">
            <g>
              <polygon points="0,-100 100,-40 -100,-40" fill="none" stroke={theme === "dark" ? "#333" : "#bbb"} strokeWidth="1" opacity="0.6">
                <animate attributeName="opacity" values="0.4;0.7;0.4" dur="4s" repeatCount="indefinite" />
              </polygon>
              <polygon points="0,-100 100,-40 0,20" fill="none" stroke={theme === "dark" ? "#2a2a2a" : "#ccc"} strokeWidth="0.5" opacity="0.4" />
              <polygon points="0,-100 -100,-40 0,20" fill="none" stroke={theme === "dark" ? "#2a2a2a" : "#ccc"} strokeWidth="0.5" opacity="0.4" />
            </g>

            <g>
              <polygon points="0,20 100,-40 100,80" fill="none" stroke={theme === "dark" ? "#333" : "#bbb"} strokeWidth="1" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.5s" repeatCount="indefinite" />
              </polygon>
              <polygon points="0,20 -100,-40 -100,80" fill="none" stroke={theme === "dark" ? "#333" : "#bbb"} strokeWidth="1" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.3;0.5" dur="3.8s" repeatCount="indefinite" />
              </polygon>
            </g>

            <g>
              <polygon points="0,20 100,80 0,140" fill="none" stroke={theme === "dark" ? "#2a2a2a" : "#ccc"} strokeWidth="0.5" opacity="0.3" />
              <polygon points="0,20 -100,80 0,140" fill="none" stroke={theme === "dark" ? "#2a2a2a" : "#ccc"} strokeWidth="0.5" opacity="0.3" />
              <line x1="100" y1="80" x2="0" y2="140" stroke={theme === "dark" ? "#333" : "#bbb"} strokeWidth="1" opacity="0.4" />
              <line x1="-100" y1="80" x2="0" y2="140" stroke={theme === "dark" ? "#333" : "#bbb"} strokeWidth="1" opacity="0.4" />
            </g>

            <circle cx="0" cy="-100" r="3" fill={theme === "dark" ? "#555" : "#999"} filter="url(#glow)">
              <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="-40" r="3" fill={theme === "dark" ? "#555" : "#999"} filter="url(#glow)">
              <animate attributeName="r" values="3;2;3" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="-100" cy="-40" r="3" fill={theme === "dark" ? "#555" : "#999"} filter="url(#glow)">
              <animate attributeName="r" values="2;3;2" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="20" r="4" fill={theme === "dark" ? "#666" : "#888"} filter="url(#glow)">
              <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="80" r="2.5" fill={theme === "dark" ? "#444" : "#aaa"} filter="url(#glow)">
              <animate attributeName="r" values="2;3;2" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="-100" cy="80" r="2.5" fill={theme === "dark" ? "#444" : "#aaa"} filter="url(#glow)">
              <animate attributeName="r" values="3;2;3" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="140" r="3" fill={theme === "dark" ? "#555" : "#999"} filter="url(#glow)">
              <animate attributeName="r" values="2;4;2" dur="1.6s" repeatCount="indefinite" />
            </circle>

            <g opacity="0.15">
              <line x1="0" y1="-100" x2="0" y2="140" stroke={theme === "dark" ? "#fff" : "#000"} strokeWidth="0.3" strokeDasharray="4 4" />
              <line x1="-100" y1="-40" x2="100" y2="-40" stroke={theme === "dark" ? "#fff" : "#000"} strokeWidth="0.3" strokeDasharray="4 4" />
              <line x1="-100" y1="80" x2="100" y2="80" stroke={theme === "dark" ? "#fff" : "#000"} strokeWidth="0.3" strokeDasharray="4 4" />
            </g>

            <g>
              <rect x="-30" y="-15" width="60" height="30" rx="6" stroke={theme === "dark" ? "#444" : "#999"} strokeWidth="0.8" fill="none" opacity="0.4">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" />
              </rect>
              <text x="0" y="4" textAnchor="middle" fill={theme === "dark" ? "#666" : "#777"} fontSize="9" fontFamily="monospace" letterSpacing="0.1em">
                KATA
              </text>
            </g>
          </g>

          <g transform="translate(200, 360)" opacity="0.3">
            <ellipse cx="0" cy="0" rx="80" ry="15" fill={theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} />
          </g>
        </svg>
      </div>
    </div>
    </AnimatedRays>
  );
}
