"use client";

import { useRouter } from "next/navigation";
import AnimatedButton from "./animated-button";
import GlowButton from "./glow-button";
import { LiquidMetalBadge } from "./liquid-metal";

export function Hero() {
  const router = useRouter();

  return (
    <div
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
        <span style={{ color: "#888" }}>MIT Licensed</span>
        <span style={{ display: "inline-block", width: 6 }} />
        <span style={{ color: "#fff", fontWeight: 500 }}>100% Open Source</span>
      </LiquidMetalBadge>

      <h1
        style={{
          fontSize: "clamp(44px, 7vw, 88px)",
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          margin: 0,
          fontFamily: "inherit",
          maxWidth: 900,
          color: "transparent",
          backgroundImage: "linear-gradient(to right, #fafafa 50%, #52525b 85%, #3f3f46 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        Form follows force.
      </h1>

      <p
        style={{
          fontSize: "clamp(15px, 1.6vw, 18px)",
          lineHeight: 1.7,
          color: "#71717a",
          fontFamily: "inherit",
          marginTop: 24,
          maxWidth: 560,
        }}
      >
        Components built around motion, intention, and weight.
        Not just what things look like, how they feel.
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 36,
        }}
      >
        <GlowButton onClick={() => router.push("/docs")}>
          View components
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
