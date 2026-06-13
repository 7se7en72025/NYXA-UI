"use client";

import { CodeBlock } from "@/components/code-block";

export default function UtilitiesPage() {
  return (
    <div>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "inherit",
          margin: "0 0 8px",
          letterSpacing: "-0.02em",
        }}
      >
        Add Utilities
      </h1>

      <p
        style={{
          fontSize: 15,
          color: "#888",
          fontFamily: "inherit",
          marginBottom: 32,
          lineHeight: 1.6,
        }}
      >
        Commonly used utilities for Kata UI
      </p>

      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
        }}
      >
        Install dependencies
      </h2>

      <CodeBlock code="npm install clsx tailwind-merge framer-motion" />

      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
          marginTop: 32,
        }}
      >
        Add util file
      </h2>

      <CodeBlock
        filename="lib/utils.ts"
        code={`import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
      />

      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
          marginTop: 32,
        }}
      >
        Use the utility
      </h2>

      <p
        style={{
          fontSize: 14,
          color: "#888",
          fontFamily: "inherit",
          marginBottom: 12,
          lineHeight: 1.7,
        }}
      >
        Use <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>cn</code> anywhere you need conditional classes that should still merge Tailwind conflicts cleanly.
      </p>

      <CodeBlock
        filename="components/example.tsx"
        code={`import { cn } from "@/lib/utils";

export function Example({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "rounded-md border px-4 py-2 text-sm",
        active && "border-neutral-950 bg-neutral-950 text-white"
      )}
    >
      Kata UI
    </div>
  );
}`}
      />

      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
          marginTop: 32,
        }}
      >
        Motion components
      </h2>

      <p
        style={{
          fontSize: 14,
          color: "#888",
          fontFamily: "inherit",
          lineHeight: 1.7,
        }}
      >
        Many animated components use <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>framer-motion</code>. Components that need a different dependency list still show the exact package command on their own component page.
      </p>
    </div>
  );
}
