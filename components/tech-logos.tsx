"use client";

import React from "react";

const tools = [
  {
    name: "Figma",
    version: null,
    icon: (
      <svg width="24" height="24" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    name: "React.js",
    version: "18.3.1",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="10.5" ry="4.1" stroke="#61DAFB" strokeWidth="1.2"/>
        <ellipse cx="12" cy="12" rx="10.5" ry="4.1" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10.5" ry="4.1" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },
  {
    name: "Shadcn",
    version: "2.0.7",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#F5F5F5"/>
        <path
          d="M17.25 6.75L6.75 17.25"
          stroke="#18181B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M12.25 17.25L1.75 6.75"
          stroke="#18181B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    version: "3.4.11",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 6C9.33 6 8 7.5 6 7.5C4 7.5 3 6 3 6V13.5C3 13.5 4 15 6 15C8 15 9.33 13.5 12 13.5C14.67 13.5 16 15 18 15C20 15 21 13.5 21 13.5V6C21 6 20 7.5 18 7.5C16 7.5 14.67 6 12 6Z"
          fill="#38BDF8"
        />
        <path
          d="M12 18C9.33 18 8 19.5 6 19.5C4 19.5 3 18 3 18V25.5C3 25.5 4 27 6 27C8 27 9.33 25.5 12 25.5C14.67 25.5 16 27 18 27C20 27 21 25.5 21 25.5V18C21 18 20 19.5 18 19.5C16 19.5 14.67 18 12 18Z"
          fill="#38BDF8"
        />
      </svg>
    ),
  },
  {
    name: "Next.js",
    version: "15.1",
    icon: (
      <svg width="24" height="24" viewBox="0 0 180 180" fill="none">
        <mask id="mask0_377_658" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="black"/>
        </mask>
        <g mask="url(#mask0_377_658)">
          <circle cx="90" cy="90" r="90" fill="black"/>
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_377_658)"/>
          <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_377_658)"/>
        </g>
        <defs>
          <linearGradient id="paint0_linear_377_658" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint1_linear_377_658" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Vercel",
    version: null,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L24 22H0L12 2Z" fill="white"/>
      </svg>
    ),
  },
];

export function TechLogos() {
  return (
    <section
      style={{
        padding: "64px 0",
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
      }}
    >


      <h3
        style={{
          fontSize: "clamp(20px, 3vw, 28px)",
          fontWeight: 600,
          lineHeight: "1.2",
          color: "#fafafa",
          fontFamily: "inherit",
          marginBottom: 40,
          textAlign: "center",
          letterSpacing: "-0.02em",
        }}
      >
        Built with the{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #fb923c, #f97316, #ea580c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          best tools
        </span>
      </h3>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tech-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
          will-change: transform;
        }
        .tech-marquee:hover {
          animation-play-state: paused;
        }
        .tech-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 28px;
          margin: 0 10px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.25s ease, background 0.25s ease;
          white-space: nowrap;
        }
        .tech-item:hover {
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
        }
        .tech-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
        }
        .tech-name {
          font-size: 15px;
          font-weight: 500;
          color: #e4e4e7;
          font-family: inherit;
          letter-spacing: -0.01em;
        }
        .tech-version {
          font-size: 13px;
          color: #52525b;
          font-family: inherit;
          margin-left: 4px;
        }
      `}</style>

      <div style={{ overflow: "hidden" }}>
        <div className="tech-marquee">
          {[...tools, ...tools].map((tool, i) => (
            <div key={i} className="tech-item">
              <div className="tech-icon">{tool.icon}</div>
              <span className="tech-name">{tool.name}</span>
              {tool.version && <span className="tech-version">{tool.version}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechLogos;
