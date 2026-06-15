"use client";

import React from "react";

export function GlobeSection() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        background: "#09090b",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "128px 24px 0",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 700,
            lineHeight: 1,
            fontFamily: "inherit",
            margin: 0,
            color: "transparent",
            backgroundImage: "linear-gradient(116deg, #fff 24%, #71717a 74%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Quality you can trust.
          <br />
          And build on.
        </h2>
        <p
          style={{
            fontSize: 20,
            lineHeight: "28px",
            color: "#71717a",
            fontFamily: "inherit",
            marginTop: 32,
            maxWidth: 580,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          You can trust that all of the designs are taking the full advantage of newest Figma&apos;s features and that code is written following best practices out there.
        </p>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1248,
          height: 535,
          marginTop: 96,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Wide ambient glow */}
        <svg
          style={{
            position: "absolute",
            top: -285,
            left: -217,
            right: -216,
            width: "calc(100% + 433px)",
            height: 1069,
          }}
          fill="none"
          viewBox="0 0 1587 913"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="globe-ambient" x="0" y="0" width="1587" height="913" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="bg" />
              <feBlend in="SourceGraphic" in2="bg" mode="normal" result="shape" />
              <feGaussianBlur stdDeviation="156" />
            </filter>
          </defs>
          <ellipse cx="793.5" cy="456.5" fill="#FDBA74" fillOpacity="0.6" rx="481.5" ry="144.5" filter="url(#globe-ambient)" />
        </svg>

        {/* Sphere body with gradient fill */}
        <svg
          style={{
            position: "absolute",
            top: -4,
            left: 101,
            right: 101,
            width: "calc(100% - 202px)",
            height: 539,
          }}
          viewBox="0 0 1046 539"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="sphere-body-grad" x1="523" y1="0" x2="523" y2="446" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="0.16253" stopColor="white" stopOpacity="0.2" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
            <mask id="sphere-mask" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="1046" height="539" x="0" y="0">
              <ellipse cx="523" cy="300" rx="523" ry="300" fill="white" />
            </mask>
          </defs>
          <ellipse cx="523" cy="300" rx="523" ry="300" fill="url(#sphere-body-grad)" />
        </svg>

        {/* Group2: layered glow shapes inside sphere mask */}
        <svg
          style={{
            position: "absolute",
            top: -4,
            left: 101,
            right: 101,
            width: "calc(100% - 202px)",
            height: 539,
          }}
          viewBox="0 0 1046 539"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <mask id="group2-mask" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="1046" height="539" x="0" y="0">
              <ellipse cx="523" cy="269.5" rx="523" ry="269.5" fill="white" />
            </mask>
            <filter id="group2-blur-1" x="-31.7" y="-72" width="106%" height="130%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="bg" />
              <feBlend in="SourceGraphic" in2="bg" mode="normal" />
              <feGaussianBlur stdDeviation="20" />
            </filter>
            <filter id="group2-blur-2" x="-3.5" y="-72" width="106%" height="130%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="bg" />
              <feBlend in="SourceGraphic" in2="bg" mode="normal" />
              <feGaussianBlur stdDeviation="20" />
            </filter>
            <filter id="group2-blur-3" x="5%" y="-72" width="95%" height="130%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="bg" />
              <feBlend in="SourceGraphic" in2="bg" mode="normal" />
              <feGaussianBlur stdDeviation="20" />
            </filter>
          </defs>
          <g mask="url(#group2-mask)">
            <ellipse cx="523" cy="269.5" rx="555" ry="300" fill="#FDBA74" opacity="0.2" filter="url(#group2-blur-1)" />
            <ellipse cx="523" cy="269.5" rx="526" ry="300" fill="#FB923C" opacity="0.5" filter="url(#group2-blur-2)" />
            <ellipse cx="523" cy="269.5" rx="467" ry="264" fill="#09090B" filter="url(#group2-blur-3)" />
          </g>
        </svg>

        {/* Rim arc stroke with orange glow */}
        <svg
          style={{
            position: "absolute",
            top: -76,
            left: -65,
            right: -65,
            width: "calc(100% + 130px)",
            height: 669.5,
          }}
          viewBox="0 0 1179 669.5"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="rim-arc-grad" x1="589.5" y1="66.5" x2="589.5" y2="605.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB923C" />
              <stop offset="0.491922" stopColor="#FDBA74" stopOpacity="0.1" />
              <stop offset="1" stopColor="#FDBA74" stopOpacity="0" />
            </linearGradient>
            <filter id="rim-arc-glow" x="0" y="0" width="1179" height="669.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="bg" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="32" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.992157 0 0 0 0 0.729412 0 0 0 0 0.454902 0 0 0 1 0" />
              <feBlend in2="bg" mode="normal" result="blur1" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.992157 0 0 0 0 0.729412 0 0 0 0 0.454902 0 0 0 0.5 0" />
              <feBlend in2="blur1" mode="normal" result="blur2" />
              <feBlend in="SourceGraphic" in2="blur2" mode="normal" />
            </filter>
          </defs>
          <ellipse
            cx="589.5"
            cy="334.75"
            rx="530"
            ry="260"
            stroke="url(#rim-arc-grad)"
            strokeWidth="5"
            fill="none"
            filter="url(#rim-arc-glow)"
          />
        </svg>

        {/* Bottom fade to background */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 434,
            background: "linear-gradient(to bottom, rgba(9,9,11,0), #09090b 85.5%)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}
