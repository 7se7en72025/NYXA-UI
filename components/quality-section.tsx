"use client";

import React from "react";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l2 2"/>
        <rect x="3" y="3" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: "Accessibility first",
    desc: "Fully WCAG 2.0 compliant, made with best a11y practices",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Responsive design",
    desc: "Looks and works great on any device and screen size",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a10 10 0 0 1 0 20 7 7 0 0 1 0-14 3 3 0 0 0 0-6"/>
      </svg>
    ),
    title: "Light and dark mode",
    desc: "Seamless switching between color schemes, 6 themes included",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: "Easy to customize",
    desc: "Flexible options to match your product or brand",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "Top-level performance",
    desc: "Made for lightning-fast load times and smooth interactions",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "Production ready",
    desc: "Thoroughly tested and launch-prepared",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 8 6 6"/>
        <path d="m4 14 6-6 2-3"/>
        <path d="M2 5h12"/>
        <path d="M7 2h1"/>
        <path d="m22 22-5-10-5 10"/>
        <path d="M14 18h6"/>
      </svg>
    ),
    title: "Made for localisation",
    desc: "Easy to implement support for multiple languages and regions",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: "CMS friendly",
    desc: "Built to work with any headless content management system",
  },
];

export function QualitySection() {
  return (
    <section
      style={{
        padding: "80px 24px 80px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "48px 48px",
        }}
      >
        {features.map((f) => (
          <div key={f.title} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ color: "#a1a1aa", display: "flex", alignItems: "center" }}>
                {f.icon}
              </div>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#fafafa",
                  fontFamily: "inherit",
                }}
              >
                {f.title}
              </span>
            </div>
            <p
              style={{
                fontSize: 15,
                color: "#71717a",
                fontFamily: "inherit",
                lineHeight: "24px",
                margin: 0,
              }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QualitySection;
