"use client";

import { useState } from "react";

function CodeBlock({ code, filename, tabs }: { code: string; filename?: string; tabs?: string[] }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
      {tabs && (
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #222",
            background: "#0d0d0d",
          }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "8px 16px",
                fontSize: 12,
                fontFamily: "monospace",
                border: "none",
                background: activeTab === i ? "#1a1a1a" : "transparent",
                color: activeTab === i ? "#ccc" : "#666",
                cursor: "pointer",
                borderBottom: activeTab === i ? "1px solid #444" : "1px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: 8,
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

export default function CliPage() {
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
        CLI
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
        Installing Kata UI with the shadcn CLI
      </p>

      {/* Initialization */}
      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
        }}
      >
        Initialization
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
        Use the <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>init</code> command to initialize a new shadcn project before adding registry components.
      </p>

      <CodeBlock code="npx shadcn@latest init" tabs={["npm", "pnpm", "yarn", "bun"]} />

      <CodeBlock
        code={`Which style would you like to use? New York
Which color would you like to use as base color? Zinc
Do you want to use CSS variables for colors? yes`}
      />

      {/* Add components */}
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
        Add components
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
        Use the <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>add</code> command with the Kata UI registry URL from any component page.
      </p>

      <CodeBlock
        code="npx shadcn@latest add https://kata-ui.vercel.app/r/animated-rays.json"
        tabs={["npm", "pnpm", "yarn", "bun"]}
      />

      <CodeBlock
        code={`Usage: shadcn add [options] [components...]

add a component to your project

Arguments:
  components        the components to add or a url to the component.

Options:
  -y, --yes         skip confirmation prompt
  -o, --overwrite   overwrite existing files
  -c, --cwd <cwd>   the working directory
  -p, --path <path> the path to add the component to
  -h, --help        display help for command`}
      />

      {/* Monorepo */}
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
        Monorepo
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
        In a monorepo, pass the workspace path with <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>-c</code> or <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>--cwd</code>.
      </p>

      <CodeBlock
        code="npx shadcn@latest add https://kata-ui.vercel.app/r/animated-rays.json -c ./apps/web"
        tabs={["npm", "pnpm", "yarn", "bun"]}
      />

      {/* Namespaced registry */}
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
        Namespaced registry
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
        If you prefer short component names, add a registry alias to <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>components.json</code>.
      </p>

      <CodeBlock
        filename="components.json"
        code={`{
  "registries": {
    "@kataui": "https://kata-ui.vercel.app/r/{name}.json"
  }
}`}
      />

      <CodeBlock
        code="npx shadcn@latest add @kataui/animated-rays"
        tabs={["npm", "pnpm", "yarn", "bun"]}
      />
    </div>
  );
}
