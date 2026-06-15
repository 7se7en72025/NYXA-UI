"use client";

import React, { useState } from "react";

const faqs = [
  { q: "Is Kata UI easy to customise?", a: "Yes, absolutely. All components use CSS variables and Tailwind classes, making it trivial to match your brand." },
  { q: "Is Kata UI optimized for search engines?", a: "Yes. The components are built with semantic HTML and follow accessibility best practices that search engines reward." },
  { q: "How does Kata UI compare to no-code tools?", a: "You get full code ownership, no vendor lock-in, and the flexibility to build anything without limitations." },
  { q: "Why not just coding a website yourself?", a: "You can, but Kata UI saves you hundreds of hours with production-ready, tested components you can copy and paste." },
  { q: "Can I get a refund if I don't like it?", a: "Since all components are open-source and free, there's nothing to refund. Try it risk-free today." },
  { q: "What features will be added in the future?", a: "We're constantly adding new sections, components, and templates based on community feedback." },
];

function FaqItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 720,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "16px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 500, color: "#fafafa", fontFamily: "inherit", lineHeight: "24px", flex: 1 }}>
          {faq.q}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            flexShrink: 0,
            transition: "transform 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path d="M4 6L8 10L12 6" stroke="#fafafa" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 200 : 0,
          transition: "max-height 0.2s ease",
        }}
      >
        <p style={{ margin: 0, padding: "0 0 16px", fontSize: 16, color: "#71717a", fontFamily: "inherit", lineHeight: "24px" }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section
      className="faq-section"
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 48,
        padding: "128px 24px",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(36px, 5vw, 48px)",
          fontWeight: 600,
          lineHeight: "1.1",
          fontFamily: "inherit",
          margin: 0,
          textAlign: "center",
          color: "#fafafa",
        }}
      >
        Questions and Answers
      </h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        {faqs.map((faq) => (
          <FaqItem key={faq.q} faq={faq} />
        ))}
      </div>
    </section>
  );
}
