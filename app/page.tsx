import Image from "next/image";
import { EmberParticles } from "@/components/ember-particles";
import { TechLogos } from "@/components/tech-logos";
import { ComponentShowcase } from "@/components/component-showcase";
import { ImpressionSection } from "@/components/impression-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqSection } from "@/components/faq-section";
import { SideFrame } from "@/components/side-frame";
import { LazySection } from "@/components/lazy-section";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";

function DashboardPreview() {
  return (
    <div
      className="dashboard-preview"
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
          <Image
            src="/dashboard-mockup.png"
            alt="Dashboard preview"
            width={1232}
            height={753}
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{
              width: "100.16%",
              height: "100.21%",
              objectFit: "cover",
              position: "absolute",
              top: "-0.1%",
              left: "-0.08%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="theme-bg relative" style={{ overflow: "hidden", overflowX: "hidden" }}>
      <Navbar />
      <SideFrame />

      {/* Hero */}
      <div className="hero-section" style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <EmberParticles />
        <Hero />
      </div>

      {/* Dashboard preview */}
      <DashboardPreview />

      {/* Built with the best tools */}
      <TechLogos />
      <LazySection minHeight={500}>
        <ComponentShowcase />
      </LazySection>

      {/* Make the right impression */}
      <LazySection minHeight={600}>
        <ImpressionSection />
      </LazySection>

      {/* Loved by designers and developers */}
      <LazySection minHeight={500}>
        <TestimonialsSection />
      </LazySection>

      {/* Questions and Answers */}
      <LazySection minHeight={400}>
        <FaqSection />
      </LazySection>

      {/* Start building CTA */}
      <section
        className="cta-section"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          alignItems: "center",
          paddingTop: 128,
          paddingBottom: 192,
          overflow: "hidden",
        }}
      >
        {/* Background grid pattern */}
        <div
          className="cta-grid-bg"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            animation: "cta-grid-fade 6s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Floating orbs */}
        <div
          className="cta-orb"
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            top: "10%",
            left: "15%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            animation: "cta-float 8s ease-in-out infinite",
          }}
        />
        <div
          className="cta-orb"
          style={{
            position: "absolute",
            width: 240,
            height: 240,
            bottom: "20%",
            right: "20%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(253,186,116,0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            animation: "cta-float 10s ease-in-out infinite 2s",
          }}
        />
        <div
          className="cta-orb"
          style={{
            position: "absolute",
            width: 180,
            height: 180,
            top: "40%",
            right: "10%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            animation: "cta-float 7s ease-in-out infinite 1s",
          }}
        />

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 600,
              height: 250,
              background: "radial-gradient(ellipse, rgba(251,146,60,0.12) 0%, transparent 70%)",
              filter: "blur(80px)",
              pointerEvents: "none",
              animation: "cta-pulse 4s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 400,
              height: 150,
              background: "radial-gradient(ellipse, rgba(249,115,22,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
              animation: "cta-pulse-2 5s ease-in-out infinite 1s",
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
            position: "relative",
          }}
        >
          Ship faster with beautiful, accessible components.
          <br />
          Open source and free forever.
        </p>

        <div className="cta-buttons" style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16, position: "relative" }}>
          <a
            href="/docs"
            className="cta-get-started"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 10,
              background: "linear-gradient(180deg, #fb923c 0%, #f97316 50%, #ea580c 100%)",
              color: "#000",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "inherit",
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(251,146,60,0.2), 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
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
              padding: "14px 28px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              color: "#fafafa",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "inherit",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Star on GitHub
          </a>
        </div>
      </section>

      {/* Bottom orange glow */}
      <div
        className="bottom-glow"
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
