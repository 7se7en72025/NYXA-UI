"use client";

import React, { memo } from "react";

const testimonials = [
  [
    {
      name: "Zara Qadir",
      handle: "@zaraprints",
      text: [
        "Playing around with ",
        "@Falak",
        " suddenly made me feeling inspired to launch that side project.",
      ],
    },
    {
      name: "Fabrizio Fernandez",
      handle: "@fab3304",
      text: [
        "Testing out ",
        "@Falak",
        "'s responsive design. That's the template we've all been waiting for.",
      ],
    },
    {
      name: "Felix Beaumont",
      handle: "@felixbs",
      text: ["Digging into ", "@Falak", ". Those shadows are giving me serious design envy."],
    },
    {
      name: "Olivia Blackwood",
      handle: "@olivia1992",
      text: ["", "@Falak", " is not messing around with its component library game."],
    },
  ],
  [
    {
      name: "Esme Rothschild",
      handle: "@EsmeRothArt",
      text: [
        "",
        "@Falak",
        " is siiiiick. That globe graphic though. Making me feel like I'm building websites for a sci-fi movie.",
      ],
    },
    {
      name: "Darius Flynn",
      handle: "@flynnn",
      text: ["Exploring ", "@Falak", "'s sleek UI. It's like a dark mode enthusiast's playground."],
    },
    {
      name: "Kai Nakamura",
      handle: "@KaiNakWaves",
      text: [
        "Just made my first website with ",
        "@Falak",
        ". Its flexibility is speaking my language.",
      ],
    },
  ],
];

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0][0];
}) {
  return (
    <div
      className="testimonial-card"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.1)",
        padding: 24,
        minWidth: 320,
        width: 400,
        height: 176,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center", width: "100%" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 9999,
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
            background: `linear-gradient(135deg, hsl(${testimonial.name.length * 40}, 50%, 40%) 0%, hsl(${testimonial.name.length * 60}, 40%, 25%) 100%)`,
          }}
        />
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, lineHeight: "28px", color: "#fafafa" }}>
            {testimonial.name}
          </div>
          <div style={{ fontSize: 16, fontWeight: 400, lineHeight: "24px", color: "#71717a" }}>
            {testimonial.handle}
          </div>
        </div>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 16,
          lineHeight: "24px",
          color: "#71717a",
          fontFamily: "inherit",
        }}
      >
        {testimonial.text.map((part, i) =>
          part.startsWith("@") ? (
            <span key={i} style={{ color: "#fb923c" }}>
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </p>
    </div>
  );
});

function ScrollingRow({ row, reverse }: { row: (typeof testimonials)[0]; reverse?: boolean }) {
  const doubled = [...row, ...row];

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        className="testimonial-scroll-track"
        style={{
          display: "flex",
          gap: 24,
          width: "max-content",
          animation: `testimonial-scroll ${reverse ? "35s linear infinite reverse" : "35s linear infinite"}`,
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className="testimonials-section"
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 36,
        padding: "128px 24px",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
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
          Loved by designers and
          <br />
          developers across the planet
        </h2>
        <p
          style={{
            fontSize: 20,
            lineHeight: "28px",
            color: "#71717a",
            fontFamily: "inherit",
            margin: 0,
            textAlign: "center",
            maxWidth: 580,
          }}
        >
          Here&apos;s what people are saying about Falak
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <ScrollingRow row={testimonials[0]} />
        <ScrollingRow row={testimonials[1]} reverse />
      </div>
    </section>
  );
}
