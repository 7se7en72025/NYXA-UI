"use client";

import React from "react";

const testimonials = [
  [
    {
      name: "Zara Qadir",
      handle: "@zaraprints",
      text: ["Playing around with ", "@kataui", " suddenly made me feeling inspired to launch that side project."],
    },
    {
      name: "Fabrizio Fernandez",
      handle: "@fab3304",
      text: ["Testing out ", "@kataui", "'s responsive design. That's the template we've all been waiting for. My mobile-first heart is doing a happy dance."],
    },
    {
      name: "Felix Beaumont",
      handle: "@felixbs",
      text: ["Digging into ", "@kataui", ". Those shadows are giving me serious design envy."],
    },
    {
      name: "Olivia Blackwood",
      handle: "@olivia1992",
      text: ["", "@kataui", " is not messing around with its component library game."],
    },
  ],
  [
    {
      name: "Esme Rothschild",
      handle: "@EsmeRothArt",
      text: ["", "@kataui", " is siiiiick. That globe graphic though. Making me feel like I'm building websites for a sci-fi movie."],
    },
    {
      name: "Darius Flynn",
      handle: "@flynnn",
      text: ["Exploring ", "@kataui", "'s sleek UI. It's like a dark mode enthusiast's playground."],
    },
    {
      name: "Kai Nakamura",
      handle: "@KaiNakWaves",
      text: ["Just made my first website with ", "@kataui", ". Its flexibility is speaking my language. No drama, just seamless integration."],
    },
  ],
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0][0] }) {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
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
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 9999,
              background: "#09090b",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: 9999,
            }}
          >
            <div
              style={{
                width: "186.67%",
                height: "124.44%",
                position: "absolute",
                top: "-0.7%",
                left: "-69.07%",
                borderRadius: 9999,
                background: `linear-gradient(135deg, hsl(${testimonial.name.length * 40}, 50%, 40%) 0%, hsl(${testimonial.name.length * 60}, 40%, 25%) 100%)`,
              }}
            />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, lineHeight: "28px", color: "#fafafa" }}>
            {testimonial.name}
          </div>
          <div style={{ fontSize: 16, fontWeight: 400, lineHeight: "24px", color: "#71717a" }}>
            {testimonial.handle}
          </div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 16, lineHeight: "24px", color: "#71717a", fontFamily: "inherit" }}>
        {testimonial.text.map((part, i) =>
          part.startsWith("@") ? (
            <span key={i} style={{ color: "#fb923c" }}>
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    </div>
  );
}

function ScrollingRow({ row, reverse }: { row: typeof testimonials[0]; reverse?: boolean }) {
  const doubled = [...row, ...row, ...row];

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <style>{`
        @keyframes scroll-row {
          0% { transform: translateX(${reverse ? "0" : "-33.333%"}); }
          100% { transform: translateX(${reverse ? "-33.333%" : "0"}); }
        }
        .scroll-row-${reverse ? "right" : "left"} {
          display: flex;
          gap: 24;
          animation: scroll-row 30s linear infinite;
          width: max-content;
        }
        .scroll-row-${reverse ? "right" : "left"}:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className={`scroll-row-${reverse ? "right" : "left"}`}>
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
          Here&apos;s what people are saying about Kata UI
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
        }}
      >
        <ScrollingRow row={testimonials[0]} />
        <ScrollingRow row={testimonials[1]} reverse />
      </div>
    </section>
  );
}
