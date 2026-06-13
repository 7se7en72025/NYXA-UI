"use client";

import dynamic from "next/dynamic";
import { SideFrame } from "@/components/side-frame";

const Navbar = dynamic(() => import("@/components/navbar").then(m => ({ default: m.Navbar })), { ssr: false });
const Hero = dynamic(() => import("@/components/hero").then(m => ({ default: m.Hero })), { ssr: false });
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })), { ssr: false });
const StackedLogos = dynamic(() => import("@/components/stacked-logos").then(m => ({ default: m.StackedLogos })), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-[300vh] theme-bg relative">
      <Navbar />
      <SideFrame />
      <Hero />

      {/* Tech Stack */}
      <section
        style={{
          padding: "80px 120px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "inherit",
            textAlign: "center",
            marginBottom: 48,
            letterSpacing: "-0.02em",
          }}
        >
          Tech Stack
        </h2>

        <StackedLogos
          logoWidth="220px"
          logoGroups={[
            [
              <svg key="next" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 40, width: 40 }}>
                <mask id="mask0" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                  <circle cx="90" cy="90" r="90" fill="black"/>
                </mask>
                <g mask="url(#mask0)">
                  <circle cx="90" cy="90" r="90" fill="black"/>
                  <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0)"/>
                  <rect x="115" y="54" width="12" height="72" fill="url(#paint1)"/>
                </g>
                <defs>
                  <linearGradient id="paint0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="paint1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>,
            ],
            [
              <svg key="tailwind" viewBox="0 0 54 33" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 32, width: 52 }}>
                <path d="M27 0C19.8 0 14.4 3.6 10.8 10.8C14.4 7.2 18 6 21.6 7.2C23.76 7.896 25.416 9.216 27.144 10.944C29.952 13.752 33.144 16.8 39.6 16.8C46.8 16.8 52.2 13.2 55.8 6C52.2 9.6 48.6 10.8 45 9.6C42.84 8.904 41.184 7.584 39.456 5.856C36.648 3.048 33.456 0 27 0ZM16.2 16.8C8.64 16.8 3.24 20.4 -0.36 27.6C3.24 24 6.84 22.8 10.44 24C12.6 24.696 14.256 26.016 15.984 27.744C18.792 30.552 21.984 33.6 28.44 33.6C36 33.6 41.4 30 45 22.8C41.4 26.4 37.8 27.6 34.2 26.4C32.04 25.704 30.384 24.384 28.656 22.656C25.848 19.848 22.656 16.8 16.2 16.8Z" fill="#38bdf8"/>
              </svg>,
            ],
            [
              <svg key="ts" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 40, width: 40 }}>
                <rect width="128" height="128" rx="12" fill="#3178c6"/>
                <path d="M82.3891 107.317C85.8478 107.317 88.4902 106.384 90.3162 104.518C92.1422 102.652 93.0552 100.03 93.0552 96.6522V96.1622C93.0552 93.1382 92.5362 90.6902 91.4982 88.8182C90.4602 86.9462 89.0492 85.5352 87.2652 84.5862C85.4812 83.6372 83.4532 83.1632 81.1812 83.1632C78.9092 83.1632 76.8662 83.6372 75.0522 84.5862C73.2382 85.5352 71.8102 86.9462 70.7662 88.8182C69.7222 90.6902 69.2002 93.1382 69.2002 96.1622V96.6522C69.2002 100.03 70.1132 102.652 71.9392 104.518C73.7652 106.384 76.4072 107.317 79.8652 107.317H82.3891ZM80.0052 89.7402C81.0072 89.7402 81.8732 89.4862 82.6032 88.9782C83.3332 88.4702 83.8582 87.7402 84.1782 86.7882C84.4982 85.8362 84.6582 84.6962 84.6582 83.3682V82.9762C84.6582 81.6482 84.4982 80.5082 84.1782 79.5562C83.8582 78.6042 83.3332 77.8742 82.6032 77.3662C81.8732 76.8582 81.0072 76.6042 80.0052 76.6042C79.0032 76.6042 78.1372 76.8582 77.4072 77.3662C76.6772 77.8742 76.1522 78.6042 75.8322 79.5562C75.5122 80.5082 75.3522 81.6482 75.3522 82.9762V83.3682C75.3522 84.6962 75.5122 85.8362 75.8322 86.7882C76.1522 87.7402 76.6772 88.4702 77.4072 88.9782C78.1372 89.4862 79.0032 89.7402 80.0052 89.7402ZM46.6452 107H54.8372V58.1642H46.6452V107ZM47.2292 48.0122C48.5572 48.0122 49.6712 47.5922 50.5712 46.7522C51.4712 45.9122 51.9212 44.8382 51.9212 43.5302C51.9212 42.2222 51.4712 41.1482 50.5712 40.3082C49.6712 39.4682 48.5572 39.0482 47.2292 39.0482C45.9012 39.0482 44.7872 39.4682 43.8872 40.3082C42.9872 41.1482 42.5372 42.2222 42.5372 43.5302C42.5372 44.8382 42.9872 45.9122 43.8872 46.7522C44.7872 47.5922 45.9012 48.0122 47.2292 48.0122Z" fill="white"/>
              </svg>,
            ],
            [
              <svg key="framer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 36, width: 36 }}>
                <path d="M4 0H20V8H12L4 0Z" fill="#facc15"/>
                <path d="M4 8H12L20 16H12V24L4 16V8Z" fill="#facc15"/>
              </svg>,
            ],
          ]}
        />
      </section>

      {/* Open Source CTA */}
      <section
        style={{
          padding: "100px 120px",
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#888",
            fontFamily: "inherit",
            marginBottom: 16,
          }}
        >
          MIT Licensed
        </p>

        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.1,
            fontFamily: "inherit",
            margin: 0,
          }}
        >
          <span style={{ color: "#fff" }}>100% Open Source</span>
          <br />
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px #444",
              backgroundImage: "linear-gradient(180deg, #555 0%, #222 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontStyle: "italic",
            }}
          >
            and Free Forever
          </span>
        </h2>

        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "#888",
            fontFamily: "inherit",
            marginTop: 24,
            maxWidth: 560,
          }}
        >
          KataUI is{" "}
          <span style={{ color: "#ccc", fontWeight: 600 }}>and always will be</span>{" "}
          free and open source. Use in personal and commercial projects. Contribute,
          fork, and make it your own.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 32,
          }}
        >
          <a
            href="https://github.com/7se7en72025/kata-ui"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 8,
              background: "#fff",
              color: "#000",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "inherit",
              textDecoration: "none",
              transition: "background 0.15s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Star on GitHub
          </a>
          <a
            href="/docs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "12px 24px",
              borderRadius: 8,
              border: "1px solid #333",
              background: "transparent",
              color: "#ccc",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "inherit",
              textDecoration: "none",
              transition: "border-color 0.15s ease",
            }}
          >
            Read Documentation
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
