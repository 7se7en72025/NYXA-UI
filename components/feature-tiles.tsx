"use client";

import React from "react";

function GlobeIllustration() {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 300,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Orange glow */}
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(253,186,116,0.35) 0%, rgba(251,146,60,0.15) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Globe */}
      <svg
        width="353"
        height="353"
        viewBox="0 0 353 353"
        fill="none"
        style={{ position: "relative", zIndex: 2 }}
      >
        <path
          d="M176.5 353C176.5 353 176.5 0 176.5 0"
          stroke="rgba(251,146,60,0.3)"
          strokeWidth="1"
        />
        <ellipse
          cx="176.5"
          cy="176.5"
          rx="176.5"
          ry="176.5"
          fill="url(#globeGrad)"
        />
        <defs>
          <linearGradient
            id="globeGrad"
            x1="176.5"
            y1="353"
            x2="176.5"
            y2="0"
          >
            <stop stopColor="#FB923C" stopOpacity="0.8" />
            <stop offset="1" stopColor="#FDBA74" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {/* Rotated ellipse rings */}
      <svg
        width="512"
        height="512"
        viewBox="0 0 512 512"
        fill="none"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) rotate(-45deg)",
          zIndex: 3,
        }}
      >
        <ellipse
          cx="256"
          cy="256"
          rx="118.7"
          ry="243.3"
          stroke="url(#ringGrad1)"
          strokeWidth="2"
          filter="drop-shadow(0 4px 12px rgba(253,186,116,0.24))"
        />
        <defs>
          <linearGradient
            id="ringGrad1"
            x1="193.1"
            y1="70.96"
            x2="58.76"
            y2="132.48"
          >
            <stop stopColor="#09090b" />
            <stop offset="1" stopColor="#FB923C" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        width="450"
        height="450"
        viewBox="0 0 191.15 450.323"
        fill="none"
        style={{
          position: "absolute",
          left: "55%",
          top: "55%",
          transform: "translate(-50%, -50%) rotate(-105deg)",
          zIndex: 3,
        }}
      >
        <ellipse
          cx="95.57"
          cy="225.16"
          rx="86.57"
          ry="216.16"
          stroke="url(#ringGrad2)"
          strokeWidth="2"
          filter="drop-shadow(0 4px 12px rgba(253,186,116,0.24))"
        />
        <defs>
          <linearGradient
            id="ringGrad2"
            x1="177.12"
            y1="133.71"
            x2="40.72"
            y2="121.95"
          >
            <stop stopColor="#09090b" stopOpacity="0.7" />
            <stop offset="0.395" stopColor="#FB923C" stopOpacity="0.1" />
            <stop offset="1" stopColor="#FB923C" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function RippleIllustration() {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 300,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Orange glow */}
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(253,186,116,0.35) 0%, rgba(251,146,60,0.15) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Nested circular rings */}
      <div
        style={{
          position: "relative",
          width: 356,
          height: 356,
          zIndex: 2,
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: `${100 - i * 9}%`,
                height: `${100 - i * 9}%`,
                borderRadius: "50%",
                border: `${1 - i * 0.05}px solid rgba(9,9,11,${0.1 + i * 0.05})`,
                overflow: "hidden",
              }}
            />
          </div>
        ))}
        {/* Center icon */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 64,
            height: 64,
            borderRadius: 12,
            background: "linear-gradient(to top, rgba(253,186,116,0.3), rgba(253,186,116,0.1))",
            border: "1px solid rgba(253,186,116,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(0 0 16px rgba(253,186,116,0.5))",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="2.1" fill="#09090b" />
            <ellipse cx="12" cy="12" rx="10.5" ry="4.1" stroke="#09090b" strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="10.5" ry="4.1" stroke="#09090b" strokeWidth="1.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10.5" ry="4.1" stroke="#09090b" strokeWidth="1.5" transform="rotate(120 12 12)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function FeatureTiles() {
  return (
    <section
      style={{
        padding: "0 24px 64px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {/* Left tile: 100+ sections */}
        <div
          style={{
            flex: "1 1 0",
            minWidth: 360,
            minHeight: 496,
            background: "#0a0a0a",
            borderRadius: 12,
            border: "1px solid #222",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            padding: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            <p
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#fff",
                fontFamily: "inherit",
                lineHeight: "32px",
                margin: 0,
              }}
            >
              100+ sections and components
            </p>
            <p
              style={{
                fontSize: 16,
                color: "#888",
                fontFamily: "inherit",
                lineHeight: "24px",
                margin: 0,
              }}
            >
              All the elements you need to build a modern, responsive, and accessible landing page.
            </p>
          </div>
          <GlobeIllustration />
        </div>

        {/* Right tile: You're in control */}
        <div
          style={{
            flex: "1 1 0",
            minWidth: 360,
            minHeight: 496,
            background: "#0a0a0a",
            borderRadius: 12,
            border: "1px solid #222",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            padding: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            <p
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#fff",
                fontFamily: "inherit",
                lineHeight: "32px",
                margin: 0,
              }}
            >
              You&apos;re in control
            </p>
            <p
              style={{
                fontSize: 16,
                color: "#888",
                fontFamily: "inherit",
                lineHeight: "24px",
                margin: 0,
              }}
            >
              This is not a component library. It&apos;s a collection of re-usable components that you can copy and paste into your apps.
            </p>
          </div>
          <RippleIllustration />
        </div>
      </div>
    </section>
  );
}

export default FeatureTiles;
