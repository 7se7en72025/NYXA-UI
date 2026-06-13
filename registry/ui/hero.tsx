"use client";

import { useEffect, useState, useRef } from "react";

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
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 120px",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 99,
            border: `1px solid ${theme === "dark" ? "#222" : "#e0e0e0"}`,
            background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 13, color: theme === "dark" ? "#888" : "#666", fontFamily: "sans-serif" }}>
            MIT Licensed
          </span>
          <span style={{ fontSize: 13, color: theme === "dark" ? "#fff" : "#000", fontFamily: "sans-serif", fontWeight: 500 }}>
            Open Source 2026
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0,
            fontFamily: "sans-serif",
          }}
        >
          <span style={{ color: theme === "dark" ? "#fff" : "#0d0d0d" }}>Form follows </span>
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: `1.5px ${theme === "dark" ? "#444" : "#ccc"}`,
              background: theme === "dark"
                ? "linear-gradient(180deg, #555 0%, #222 100%)"
                : "linear-gradient(180deg, #bbb 0%, #ddd 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            force.
          </span>
        </h1>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: theme === "dark" ? "#888" : "#666",
            fontFamily: "monospace",
            marginTop: 24,
            maxWidth: 520,
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
          <button
            style={{
              padding: "10px 22px",
              borderRadius: 8,
              border: "none",
              background: theme === "dark" ? "#fff" : "#111",
              color: theme === "dark" ? "#000" : "#fff",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "sans-serif",
              cursor: "pointer",
              height: 40,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = theme === "dark" ? "#e8e8e8" : "#333")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = theme === "dark" ? "#fff" : "#111")
            }
          >
            Explore components
          </button>
          <button
            style={{
              padding: "10px 22px",
              borderRadius: 8,
              border: `1px solid ${theme === "dark" ? "#333" : "#d4d4d4"}`,
              background: "transparent",
              color: theme === "dark" ? "#fff" : "#000",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "sans-serif",
              cursor: "pointer",
              height: 40,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme === "dark" ? "#555" : "#aaa";
              e.currentTarget.style.background = theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme === "dark" ? "#333" : "#d4d4d4";
              e.currentTarget.style.background = "transparent";
            }}
          >
            View GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
