"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

interface CommandItem {
  title: string;
  desc: string;
  href: string;
  category: string;
  badge?: string;
}

const items: CommandItem[] = [
  { title: "Introduction", desc: "Start here and browse the component index.", href: "/docs", category: "Docs", badge: "⌘ I" },
  { title: "Installation (Next.js)", desc: "Install Kata UI in a Next.js app.", href: "/docs/installation/nextjs", category: "Docs" },
  { title: "Installation (Tailwind)", desc: "Configure Tailwind CSS for Kata UI.", href: "/docs/installation/tailwind", category: "Docs" },
  { title: "Installation (CLI)", desc: "Add components with the CLI.", href: "/docs/installation/cli", category: "Docs" },
  { title: "Installation (Utilities)", desc: "Utility functions and helpers.", href: "/docs/installation/utilities", category: "Docs" },
  { title: "Shrine Cards", desc: "Stacked card layout with hover expand.", href: "/docs/layout/shrine-cards", category: "Components" },
  { title: "Terminal Preloader", desc: "Animated terminal-style loading screen.", href: "/docs/preloader/terminal-preloader", category: "Components" },
  { title: "Glitch Text", desc: "Glitch slice animation effect for text.", href: "/docs/effects/glitch-text", category: "Components" },
  { title: "Home", desc: "Back to the landing page.", href: "/", category: "Navigation" },
];

export function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) => i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((item) => {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    });
    return map;
  }, [filtered]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const navigate = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selected]) navigate(filtered[selected].href);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, navigate, onClose]);

  if (!open) return null;

  let globalIndex = -1;

  return (
    <div
      onClick={onClose}
      className="command-menu-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "15vh",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="command-menu"
        style={{
          width: 560,
          maxHeight: 480,
          borderRadius: 12,
          background: "#18181b",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px 0",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "#a1a1aa", fontFamily: "inherit" }}>
            Kata UI command menu
          </span>
          <span
            style={{
              fontSize: 11,
              fontFamily: "var(--font-mono), monospace",
              color: "#71717a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 4,
              padding: "2px 6px",
              lineHeight: "14px",
            }}
          >
            Esc
          </span>
        </div>

        {/* Search input */}
        <div style={{ padding: "12px 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search docs and components..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 14,
                color: "#fafafa",
                fontFamily: "inherit",
                flex: 1,
              }}
            />
          </div>
        </div>

        {/* Results */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 8px 8px",
          }}
        >
          {filtered.length === 0 && (
            <div style={{ padding: "32px 16px", textAlign: "center", color: "#52525b", fontSize: 14 }}>
              No results found.
            </div>
          )}

          {Array.from(grouped.entries()).map(([category, categoryItems]) => (
            <div key={category} style={{ marginBottom: 8 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#52525b",
                  padding: "8px 12px 4px",
                  fontFamily: "var(--font-mono), monospace",
                  letterSpacing: "0.02em",
                }}
              >
                {category}
              </div>
              {categoryItems.map((item) => {
                globalIndex++;
                const idx = globalIndex;
                const isSelected = idx === selected;
                return (
                  <button
                    key={item.title}
                    onClick={() => navigate(item.href)}
                    onMouseEnter={() => setSelected(idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "none",
                      background: isSelected ? "rgba(251,146,60,0.12)" : "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.1s ease",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#fafafa", fontFamily: "inherit" }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 13, color: "#71717a", fontFamily: "inherit", marginTop: 2 }}>
                        {item.desc}
                      </div>
                    </div>
                    {item.badge && (
                      <span
                        style={{
                          fontSize: 11,
                          fontFamily: "var(--font-mono), monospace",
                          color: "#71717a",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 4,
                          padding: "2px 6px",
                          lineHeight: "14px",
                          flexShrink: 0,
                          marginLeft: 12,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ fontSize: 12, color: "#52525b", fontFamily: "inherit" }}>
            Arrow keys to move
          </span>
          <span style={{ fontSize: 12, color: "#52525b", fontFamily: "inherit" }}>
            Enter to open
          </span>
        </div>
      </div>
    </div>
  );
}
