"use client";

import { CodeBlock } from "@/components/code-block";

export default function InstallNextjsPage() {
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
        Install Next.js
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
        Install Next.js with Create Next App
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
        Create a new project
      </h2>

      <CodeBlock code="npx create-next-app@latest my-app" />

      <p
        style={{
          fontSize: 14,
          color: "#888",
          fontFamily: "inherit",
          marginBottom: 12,
          lineHeight: 1.6,
        }}
      >
        On installation, you'll see the following prompts:
      </p>

      <CodeBlock
        code={`What is your project named? my-app
Would you like to use the recommended Next.js defaults?
  Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, AGENTS.md
  No, reuse previous settings
  No, customize settings - Choose your own preferences`}
      />

      <p
        style={{
          fontSize: 14,
          color: "#888",
          fontFamily: "inherit",
          marginBottom: 12,
          lineHeight: 1.6,
        }}
      >
        If you customize settings:
      </p>

      <CodeBlock
        code={`Would you like to use TypeScript? No / Yes
Which linter would you like to use? ESLint / Biome / None
Would you like to use React Compiler? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a src/ directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the import alias (@/* by default)? No / Yes`}
      />

      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
          marginTop: 36,
        }}
      >
        Start the app
      </h2>

      <CodeBlock code={`cd my-app\nnpm run dev`} />

      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
          marginTop: 36,
        }}
      >
        Recommended project shape
      </h2>

      <p
        style={{
          fontSize: 14,
          color: "#888",
          fontFamily: "inherit",
          lineHeight: 1.7,
        }}
      >
        Use the App Router, TypeScript, Tailwind CSS, and the default <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>@/*</code> import alias. That matches how Kata UI examples and registry components are written.
      </p>
    </div>
  );
}
