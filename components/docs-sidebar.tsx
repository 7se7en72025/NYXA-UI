"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavGroup {
  title: string;
  icon?: string;
  items: { label: string; href: string; isNew?: boolean }[];
}

const navigation: NavGroup[] = [
  {
    title: "Installation",
    icon: "\u2193",
    items: [
      { label: "Install Next.js", href: "/docs/installation/nextjs" },
      { label: "Install Tailwind CSS", href: "/docs/installation/tailwind" },
      { label: "Add utilities", href: "/docs/installation/utilities" },
      { label: "CLI", href: "/docs/installation/cli" },
    ],
  },
  {
    title: "Layout",
    icon: "\u25A2",
    items: [
      { label: "Shrine Cards", href: "/docs/layout/shrine-cards" },
    ],
  },
  {
    title: "Preloader",
    icon: "\u25B6",
    items: [
      { label: "Terminal Preloader", href: "/docs/preloader/terminal-preloader", isNew: true },
    ],
  },
  {
    title: "Effects",
    icon: "\u26A1",
    items: [
      { label: "Glitch Text", href: "/docs/effects/glitch-text", isNew: true },
    ],
  },
];

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(navigation.map((g) => [g.title, true]))
  );

  const toggle = (title: string) =>
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <nav
      style={{
        height: "100%",
        overflowY: "auto",
        padding: "20px 0",
        borderRight: "1px solid #1a1a1a",
        background: "transparent",
      }}
    >
      <div style={{ padding: "0 16px", marginBottom: 24 }}>
        <Link
          href="/"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            textDecoration: "none",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Home
        </Link>
      </div>

      {navigation.map((group) => (
        <div key={group.title} style={{ marginBottom: 4 }}>
          <button
            onClick={() => toggle(group.title)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              padding: "8px 16px",
              background: "none",
              border: "none",
              color: "#999",
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "inherit",
              cursor: "pointer",
              textAlign: "left",
              letterSpacing: "0.02em",
            }}
          >
            <span
              style={{
                fontSize: 10,
                transition: "transform 0.15s ease",
                transform: openGroups[group.title] ? "rotate(90deg)" : "rotate(0deg)",
                display: "inline-block",
              }}
            >
              &#9654;
            </span>
            {group.title}
          </button>

          {openGroups[group.title] && (
            <div style={{ paddingBottom: 8 }}>
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px 16px 6px 36px",
                      fontSize: 13,
                      fontFamily: "inherit",
                      color: active ? "#fff" : "#666",
                      textDecoration: "none",
                      background: active ? "rgba(255,255,255,0.06)" : "transparent",
                      borderLeft: active ? "2px solid #fff" : "2px solid transparent",
                      transition: "all 0.1s ease",
                    }}
                  >
                    <span>{item.label}</span>
                    {item.isNew && (
                      <span
                        style={{
                          fontSize: 10,
                          padding: "1px 6px",
                          borderRadius: 4,
                          background: "#1a4a3a",
                          color: "#4ade80",
                          fontWeight: 500,
                        }}
                      >
                        New
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
