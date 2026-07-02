"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { TechStackTiles } from "@/components/tech-stack-tiles";

const EmberParticles = dynamic(
  () => import("@/components/ember-particles").then((m) => ({ default: m.EmberParticles })),
  { ssr: false },
);
const ComponentShowcase = dynamic(
  () => import("@/components/component-showcase").then((m) => ({ default: m.ComponentShowcase })),
  { ssr: false },
);
const ImpressionSection = dynamic(
  () => import("@/components/impression-section").then((m) => ({ default: m.ImpressionSection })),
  { ssr: false },
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/testimonials-section").then((m) => ({ default: m.TestimonialsSection })),
  { ssr: false },
);
const FaqSection = dynamic(
  () => import("@/components/faq-section").then((m) => ({ default: m.FaqSection })),
  { ssr: false },
);

export default function Home() {
  return (
    <main className="theme-bg relative overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center">
        <Suspense fallback={null}>
          <EmberParticles />
        </Suspense>
        <Hero />
      </section>

      {/* Tech Stack */}
      <TechStackTiles />

      {/* Component Showcase */}
      <Suspense fallback={null}>
        <ComponentShowcase />
      </Suspense>

      {/* Make the right impression */}
      <Suspense fallback={null}>
        <ImpressionSection />
      </Suspense>

      {/* Loved by designers and developers */}
      <Suspense fallback={null}>
        <TestimonialsSection />
      </Suspense>

      {/* Questions and Answers */}
      <Suspense fallback={null}>
        <FaqSection />
      </Suspense>

      {/* CTA */}
      <section className="relative z-10 flex flex-col items-center gap-8 px-4 pb-48 pt-32 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,254,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

        <h2 className="relative text-5xl font-bold tracking-tight text-white md:text-7xl">
          Start building
        </h2>
        <p className="relative max-w-md text-lg text-zinc-400">
          Ship faster with beautiful, accessible components.
          <br />
          Open source and free forever.
        </p>

        <div className="relative flex gap-4">
          <a
            href="/docs"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(0,242,254,0.5)]"
          >
            Get started
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="https://github.com/7se7en72025/kata-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
