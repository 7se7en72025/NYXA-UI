"use client";

import React from "react";
import Image from "next/image";

const features = [
  {
    title: "Choose your sections",
    desc: "Choose among 100+ components to build a landing page suited to the needs of your product.",
    active: true,
  },
  {
    title: "Add your content",
    desc: "Fill the blanks with screenshots, videos, and other content featuring your product.",
    active: false,
  },
  {
    title: "Customize",
    desc: "Make design yours in no time by changing the variables that control colors, typography, and other styles.",
    active: false,
  },
];

export function ImpressionSection() {
  return (
    <section
      className="impression-section"
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        padding: "128px 24px 0",
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
          color: "#fff",
        }}
      >
        Make the right impression
      </h2>
      <p
        style={{
          fontSize: 20,
          lineHeight: "28px",
          color: "#71717a",
          fontFamily: "inherit",
          margin: 0,
          textAlign: "center",
          maxWidth: 578,
        }}
      >
        Falak makes it easy to build an unforgettable website that resonates with professional
        design-centric audiences.
      </p>

      <div
        className="impression-layout"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
          width: "100%",
          maxWidth: 1248,
          marginTop: 32,
        }}
      >
        {/* Left: Feature tabs */}
        <div
          className="impression-tabs"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            minWidth: 240,
            width: 373,
            flexShrink: 0,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                borderRadius: 6,
                padding: "12px 20px 12px 12px",
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
                background: f.active
                  ? "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
                  : "transparent",
                border: f.active ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  flexShrink: 0,
                  marginTop: 2,
                  color: f.active ? "#fff" : "#71717a",
                }}
              >
                <svg viewBox="0 0 16 16" fill="none" style={{ width: "100%", height: "100%" }}>
                  {f.active ? (
                    <>
                      <rect
                        x="2"
                        y="2"
                        width="5"
                        height="5"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="9"
                        y="2"
                        width="5"
                        height="5"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="2"
                        y="9"
                        width="5"
                        height="5"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="9"
                        y="9"
                        width="5"
                        height="5"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </>
                  ) : f.title === "Add your content" ? (
                    <>
                      <rect
                        x="3"
                        y="3"
                        width="10"
                        height="10"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M6 7L8 5L10 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  ) : (
                    <>
                      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M8 6V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 8H10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </>
                  )}
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: "20px",
                    color: f.active ? "#fff" : "#71717a",
                    marginBottom: 2,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: "16px",
                    color: "#71717a",
                  }}
                >
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Dashboard mockup with orange glow */}
        <div
          className="impression-dashboard"
          style={{
            flex: "1 0 0",
            minWidth: 240,
            position: "relative",
            borderRadius: 12,
            aspectRatio: "859 / 482",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: 12,
            }}
          >
            {/* Orange glow behind dashboard */}
            <div
              style={{
                position: "absolute",
                top: -285,
                left: -217,
                right: -248,
                bottom: 0,
                overflow: "hidden",
              }}
            >
              <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                fill="none"
                viewBox="0 0 1260 1069"
              >
                <defs>
                  <clipPath id="impression-clip">
                    <rect width="1260" height="1069" fill="white" />
                  </clipPath>
                  <filter
                    id="impression-glow1"
                    x="-31"
                    y="-14"
                    width="1134"
                    height="913"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="bg1" />
                    <feBlend in="SourceGraphic" in2="bg1" mode="normal" result="shape1" />
                    <feGaussianBlur result="blur1" stdDeviation="156" />
                  </filter>
                  <filter
                    id="impression-glow2"
                    x="311"
                    y="239"
                    width="638"
                    height="276"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="bg2" />
                    <feBlend in="SourceGraphic" in2="bg2" mode="normal" result="shape2" />
                    <feGaussianBlur result="blur2" stdDeviation="32" />
                  </filter>
                </defs>
                <g clipPath="url(#impression-clip)">
                  <ellipse
                    cx="630"
                    cy="442.5"
                    fill="#FDBA74"
                    fillOpacity="0.6"
                    rx="255"
                    ry="144.5"
                    filter="url(#impression-glow1)"
                  />
                  <ellipse
                    cx="630"
                    cy="377"
                    fill="#FB923C"
                    rx="255"
                    ry="74"
                    filter="url(#impression-glow2)"
                  />
                </g>
              </svg>
            </div>

            <div
              style={{
                position: "relative",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 16,
                padding: 8,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                boxShadow:
                  "0px 25px 50px -12px rgba(0,0,0,0.5), 0px 0px 40px rgba(251,146,60,0.15)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  flex: 1,
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Image
                  src="/dashboard-mockup.png"
                  alt="Dashboard preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top left",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
