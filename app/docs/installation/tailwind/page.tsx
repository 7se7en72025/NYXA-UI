"use client";

import { useState } from "react";

function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 8,
        border: "1px solid #222",
        overflow: "hidden",
        marginBottom: 20,
      }}
    >
      {filename && (
        <div
          style={{
            padding: "8px 16px",
            background: "#111",
            borderBottom: "1px solid #222",
            fontSize: 12,
            fontFamily: "monospace",
            color: "#888",
          }}
        >
          {filename}
        </div>
      )}
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: filename ? 8 : 8,
          right: 8,
          background: "none",
          border: "1px solid #333",
          borderRadius: 6,
          color: "#888",
          cursor: "pointer",
          fontSize: 11,
          padding: "4px 10px",
          fontFamily: "inherit",
          zIndex: 1,
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <div
        style={{
          padding: "14px 16px",
          background: "#0d0d0d",
          fontFamily: "monospace",
          fontSize: 13,
          color: "#aaa",
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
          overflowX: "auto",
        }}
      >
        {code}
      </div>
    </div>
  );
}

export default function InstallTailwindPage() {
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
        Install Tailwind CSS
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
        Install Tailwind CSS with Next.js
      </p>

      <div
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          border: "1px solid #222",
          background: "#111",
          fontSize: 14,
          fontFamily: "inherit",
          color: "#999",
          marginBottom: 32,
        }}
      >
        <strong style={{ color: "#ccc" }}>Tailwind CSS v4 Installation</strong>
      </div>

      {/* Create your project */}
      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
        }}
      >
        Create your project
      </h2>

      <CodeBlock code={`npx create-next-app@latest my-project --typescript --eslint --app\ncd my-project`} />

      {/* Install Tailwind CSS */}
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
        Install Tailwind CSS
      </h2>

      <CodeBlock code="npm install tailwindcss @tailwindcss/postcss" />

      {/* Create your CSS file */}
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
        Create your CSS file
      </h2>

      <p
        style={{
          fontSize: 14,
          color: "#888",
          fontFamily: "inherit",
          marginBottom: 12,
          lineHeight: 1.6,
        }}
      >
        Add the Tailwind import to your global CSS file.
      </p>

      <CodeBlock
        filename="app/globals.css"
        code={`@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-mono: "Geist Mono", monospace;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}`}
      />

      {/* Configure PostCSS */}
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
        Configure PostCSS
      </h2>

      <CodeBlock
        filename="postcss.config.mjs"
        code={`const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;`}
      />

      {/* Start your build process */}
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
        Start your build process
      </h2>

      <CodeBlock code="npm run dev" />

      {/* Start using Tailwind */}
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
        Start using Tailwind
      </h2>

      <CodeBlock
        filename="app/page.tsx"
        code={`export default function Home() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}`}
      />

      {/* Key differences */}
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
        Key differences in v4
      </h2>

      <p
        style={{
          fontSize: 14,
          color: "#888",
          fontFamily: "inherit",
          lineHeight: 1.7,
        }}
      >
        Tailwind v4 is CSS-first. Theme values can live in <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>@theme inline</code>, custom variants can live in CSS, and the PostCSS plugin is now <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>@tailwindcss/postcss</code>.
      </p>
    </div>
  );
}
