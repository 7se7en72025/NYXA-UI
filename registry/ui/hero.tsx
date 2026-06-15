"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import AnimatedButton from "./animated-button";
import GlowButton from "./glow-button";
import { LiquidMetalBadge } from "./liquid-metal";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        overflow: "hidden",
        zIndex: 10,
        textAlign: "center",
      }}
    >
      <LiquidMetalBadge
        metalConfig={{
          colorBack: "#1a1a1a",
          colorTint: "#444",
          speed: 0.3,
          repetition: 3,
          distortion: 0.1,
        }}
      >
        <span style={{ color: "#888" }}>Kata UI v0.1</span>
        <span style={{ display: "inline-block", width: 6 }} />
        <span style={{ color: "#fff", fontWeight: 500 }}>Now in Development</span>
      </LiquidMetalBadge>

      <h1
        style={{
          fontSize: "clamp(44px, 7vw, 88px)",
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          margin: 0,
          fontFamily: "inherit",
          color: "#fff",
          maxWidth: 900,
        }}
      >
        Form follows force.
      </h1>

      <p
        style={{
          fontSize: "clamp(15px, 1.6vw, 18px)",
          lineHeight: 1.7,
          color: "#888",
          fontFamily: "inherit",
          marginTop: 24,
          maxWidth: 560,
        }}
      >
        A component library built for developers who move fast.
        Copy/paste into your project and ship.
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 36,
        }}
      >
        <GlowButton onClick={() => router.push("/docs")}>
          Explore components
        </GlowButton>
        <AnimatedButton
          onClick={() => window.open("https://github.com/7se7en72025/kata-ui", "_blank")}
        >
          View GitHub
        </AnimatedButton>
      </div>
    </div>
  );
}
