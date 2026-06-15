"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { EmberParticles } from "@/components/ember-particles";
import { TechLogos } from "@/components/tech-logos";
import { ComponentShowcase } from "@/components/component-showcase";
import { ImpressionSection } from "@/components/impression-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqSection } from "@/components/faq-section";
import { SideFrame } from "@/components/side-frame";

const Navbar = dynamic(() => import("@/components/navbar").then(m => ({ default: m.Navbar })), { ssr: false });
const Hero = dynamic(() => import("@/components/hero").then(m => ({ default: m.Hero })), { ssr: false });
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })), { ssr: false });

function DashboardPreview() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 1248,
        margin: "0 auto",
        padding: "0 24px",
        marginTop: -20,
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          padding: 8,
          background: "rgba(255,255,255,0.05)",
          boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.5), 0px 0px 40px rgba(251,146,60,0.15)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1232 / 753",
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <img
            src="/dashboard-mockup.png"
            alt="Dashboard preview"
            style={{
              width: "100.16%",
              height: "100.21%",
              objectFit: "cover",
              position: "absolute",
              top: "-0.1%",
              left: "-0.08%",
            }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [stars, setStars] = useState(3);

  useEffect(() => {
    fetch("https://api.github.com/repos/7se7en72025/kata-ui")
      .then((r) => r.json())
      .then((d) => { if (d.stargazers_count) setStars(d.stargazers_count); })
      .catch(() => {});
  }, []);

  return (
    <main className="theme-bg relative" style={{ overflow: "hidden" }}>
      <Navbar />
      <SideFrame />

      {/* Hero */}
      <div style={{ position: "relative" }}>
        <EmberParticles />
        <Hero />
      </div>

      {/* Dashboard preview */}
      <DashboardPreview />

      {/* Built with the best tools */}
      <TechLogos />
      <ComponentShowcase />

      {/* Make the right impression */}
      <ImpressionSection />

      {/* Loved by designers and developers */}
      <TestimonialsSection />

      {/* Questions and Answers */}
      <FaqSection />

      {/* Start building CTA */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          alignItems: "center",
          paddingTop: 128,
          paddingBottom: 192,
        }}
      >
        <style>{`
          @keyframes cta-pulse {
            0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.25; transform: translate(-50%, -50%) scale(1.1); }
          }
          @keyframes cta-shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          .cta-get-started {
            transition: all 0.3s ease;
          }
          .cta-get-started:hover {
            transform: translateY(-1px);
            box-shadow: 0 0 20px rgba(251,146,60,0.25), 0 4px 12px rgba(0,0,0,0.4);
          }
          .cta-get-started:active {
            transform: translateY(0);
          }
          .cta-github {
            transition: all 0.3s ease;
          }
          .cta-github:hover {
            transform: translateY(-1px);
            border-color: rgba(255,255,255,0.2);
            background: rgba(255,255,255,0.06);
          }
          .cta-github:active {
            transform: translateY(0);
          }
          .cta-star-badge {
            transition: all 0.2s ease;
          }
          .cta-star-badge:hover {
            border-color: rgba(251,146,60,0.4);
            background: rgba(251,146,60,0.08);
          }
        `}</style>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 500,
              height: 200,
              background: "radial-gradient(ellipse, rgba(251,146,60,0.15) 0%, transparent 70%)",
              filter: "blur(60px)",
              pointerEvents: "none",
              animation: "cta-pulse 4s ease-in-out infinite",
            }}
          />
          <h2
            style={{
              fontSize: "clamp(44px, 6vw, 72px)",
              fontWeight: 700,
              lineHeight: "1.1",
              fontFamily: "inherit",
              margin: 0,
              textAlign: "center",
              color: "#fafafa",
              letterSpacing: "-0.03em",
              position: "relative",
            }}
          >
            Start building
          </h2>
        </div>

        <p
          style={{
            fontSize: 20,
            lineHeight: "28px",
            color: "#71717a",
            fontFamily: "inherit",
            margin: 0,
            textAlign: "center",
            maxWidth: 480,
          }}
        >
          Ship faster with beautiful, accessible components.
          <br />
          Open source and free forever.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16 }}>
          <a
            href="/docs"
            className="cta-get-started"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 8,
              background: "linear-gradient(180deg, #18181b 0%, rgba(9,9,11,0.8) 100%)",
              color: "#fafafa",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "inherit",
              textDecoration: "none",
              boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.1), 0px 1px 3px 0px rgba(0,0,0,0.1)",
            }}
          >
            Get started
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="https://github.com/7se7en72025/kata-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-github"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 8,
              background: "linear-gradient(0deg, rgba(9,9,11,0.05) 0%, rgba(9,9,11,0.1) 100%)",
              color: "#fafafa",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "inherit",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Star on GitHub
            <span
              className="cta-star-badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "2px 8px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: 12,
                fontWeight: 500,
                color: "#a1a1aa",
                marginLeft: 4,
              }}
            >
              {stars}
            </span>
          </a>
        </div>
      </section>

      {/* Bottom orange glow */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 200,
          marginTop: -120,
          zIndex: 5,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <svg
          style={{
            position: "absolute",
            bottom: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 400,
          }}
          fill="none"
          viewBox="0 0 800 400"
        >
          <defs>
            <filter id="cta-glow-1" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="bg" />
              <feBlend in="SourceGraphic" in2="bg" mode="normal" />
              <feGaussianBlur stdDeviation="80" />
            </filter>
            <filter id="cta-glow-2" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="bg" />
              <feBlend in="SourceGraphic" in2="bg" mode="normal" />
              <feGaussianBlur stdDeviation="30" />
            </filter>
          </defs>
          <ellipse cx="400" cy="350" fill="#FDBA74" fillOpacity="0.4" rx="350" ry="120" filter="url(#cta-glow-1)" />
          <ellipse cx="400" cy="370" fill="#FB923C" rx="300" ry="60" filter="url(#cta-glow-2)" />
        </svg>
      </div>

      <Footer />
    </main>
  );
}
