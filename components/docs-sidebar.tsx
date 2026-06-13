"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavGroup {
  title: string;
  icon?: string;
  items: { label: string; href: string; isNew?: boolean; comingSoon?: boolean }[];
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
    title: "Buttons",
    icon: "\u25B8",
    items: [
      { label: "Animated Button", href: "#", isNew: true, comingSoon: true },
      { label: "Glow Button", href: "#", isNew: true, comingSoon: true },
      { label: "Liquid Metal", href: "#", comingSoon: true },
    ],
  },
  {
    title: "Text & Motion",
    icon: "T",
    items: [
      { label: "Animated Number", href: "#", comingSoon: true },
      { label: "Flip Text", href: "#", comingSoon: true },
    ],
  },
  {
    title: "Backgrounds",
    icon: "\u25CB",
    items: [
      { label: "Animated Rays", href: "#", comingSoon: true },
    ],
  },
];

export function DocsSidebar() {
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px 16px 6px 36px",
                      fontSize: 13,
                      fontFamily: "inherit",
                      color: item.comingSoon ? "#444" : active ? "#fff" : "#666",
                      textDecoration: "none",
                      background: active && !item.comingSoon ? "rgba(255,255,255,0.06)" : "transparent",
                      borderLeft: active && !item.comingSoon ? "2px solid #fff" : "2px solid transparent",
                      transition: "all 0.1s ease",
                      pointerEvents: item.comingSoon ? "none" : "auto",
                    }}
                  >
                    <span>{item.label}</span>
                    {item.comingSoon && (
                      <span
                        style={{
                          fontSize: 9,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.06)",
                          color: "#555",
                          fontWeight: 500,
                          letterSpacing: "0.02em",
                        }}
                      >
                        Coming Soon!!
                      </span>
                    )}
                    {!item.comingSoon && item.isNew && (
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
