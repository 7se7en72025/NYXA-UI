"use client";

import React from "react";

interface TocItem {
  label: string;
  href: string;
  active?: boolean;
}

interface DocsTocProps {
  items: TocItem[];
}

export function DocsToc({ items }: DocsTocProps) {
  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        padding: "20px 16px",
        borderLeft: "1px solid #1a1a1a",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#666",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 16,
          fontFamily: "inherit",
        }}
      >
        On This Page
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              fontSize: 13,
              fontFamily: "inherit",
              color: item.active ? "#fff" : "#555",
              textDecoration: "none",
              padding: "4px 0 4px 12px",
              borderLeft: item.active ? "1px solid #fff" : "1px solid transparent",
              transition: "all 0.1s ease",
              lineHeight: 1.5,
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
