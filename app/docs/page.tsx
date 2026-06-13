"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/code-block";

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const installCmd = "npx shadcn@latest add https://kata-ui.vercel.app/r/liquid-metal.json";

  return (
    <div>
      <div style={{ marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: "#666", fontFamily: "inherit" }}>
          Components
        </span>
        <span style={{ fontSize: 13, color: "#444", margin: "0 8px", fontFamily: "inherit" }}>/</span>
        <span style={{ fontSize: 13, color: "#888", fontFamily: "inherit" }}>
          Liquid Metal
        </span>
      </div>

      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "inherit",
          margin: "8px 0 12px",
          letterSpacing: "-0.02em",
        }}
      >
        Liquid Metal
      </h1>

      <p
        style={{
          fontSize: 15,
          color: "#888",
          fontFamily: "inherit",
          marginBottom: 24,
          lineHeight: 1.6,
        }}
      >
        Metallic fluid shader effect
      </p>

      {/* Tabs + Install */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid #222",
          }}
        >
          {(["preview", "code"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 16px",
                fontSize: 13,
                fontFamily: "inherit",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                background: activeTab === tab ? "#fff" : "transparent",
                color: activeTab === tab ? "#000" : "#666",
                transition: "all 0.15s ease",
              }}
            >
              {tab === "preview" ? "Preview" : "Code"}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #222",
            fontSize: 12,
            fontFamily: "monospace",
            color: "#888",
            flex: 1,
            overflow: "hidden",
          }}
        >
          <span style={{ color: "#555" }}>$</span>
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {installCmd}
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(installCmd)}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
              fontSize: 14,
              padding: 2,
              flexShrink: 0,
            }}
          >
            &#x2398;
          </button>
        </div>
      </div>

      {/* Preview / Code Panel */}
      <div
        style={{
          borderRadius: 12,
          border: "1px solid #1a1a1a",
          overflow: "hidden",
        }}
      >
        {activeTab === "preview" ? (
          <div
            style={{
              minHeight: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0a0a0a",
            }}
          >
            <span style={{ color: "#444", fontSize: 14, fontFamily: "inherit" }}>
              Component Preview
            </span>
          </div>
        ) : (
          <div
            style={{
              padding: 24,
              background: "#0a0a0a",
              fontFamily: "monospace",
              fontSize: 13,
              color: "#aaa",
              lineHeight: 1.7,
            }}
          >
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
{`import { LiquidMetal } from "@/components/liquid-metal";

<LiquidMetal
  colorBack="#1a1a1a"
  colorTint="#444"
  speed={0.3}
  repetition={3}
  distortion={0.1}
>
  <span>Content here</span>
</LiquidMetal>`}
            </pre>
          </div>
        )}
      </div>

      {/* Sections */}
      <section id="overview" style={{ marginTop: 48 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#fff",
            fontFamily: "inherit",
            marginBottom: 12,
          }}
        >
          Overview
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "#888",
            fontFamily: "inherit",
            lineHeight: 1.7,
          }}
        >
          The LiquidMetal component creates a metallic fluid shader effect using WebGL.
          It responds to mouse movement and can be customized with various props for
          color, speed, and distortion.
        </p>
      </section>

      <section id="installation" style={{ marginTop: 40 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#fff",
            fontFamily: "inherit",
            marginBottom: 12,
          }}
        >
          Installation
        </h2>
        <CodeBlock code={installCmd} />
      </section>

      <section id="usage" style={{ marginTop: 40 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#fff",
            fontFamily: "inherit",
            marginBottom: 12,
          }}
        >
          Usage
        </h2>
        <CodeBlock
          filename="app/page.tsx"
          code={`import { LiquidMetal } from "@/components/liquid-metal";

export default function App() {
  return (
    <LiquidMetal
      colorBack="#1a1a1a"
      colorTint="#444"
      speed={0.3}
    >
      Hello World
    </LiquidMetal>
  );
}`}
        />
      </section>

      <section id="props" style={{ marginTop: 40, marginBottom: 80 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#fff",
            fontFamily: "inherit",
            marginBottom: 16,
          }}
        >
          Props
        </h2>
        <div style={{ border: "1px solid #222", borderRadius: 8, overflow: "hidden" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
              fontFamily: "inherit",
            }}
          >
            <thead>
              <tr style={{ background: "#111" }}>
                <th style={{ padding: "10px 16px", textAlign: "left", color: "#888", fontWeight: 500 }}>Prop</th>
                <th style={{ padding: "10px 16px", textAlign: "left", color: "#888", fontWeight: 500 }}>Type</th>
                <th style={{ padding: "10px 16px", textAlign: "left", color: "#888", fontWeight: 500 }}>Default</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["colorBack", "string", "#1a1a1a"],
                ["colorTint", "string", "#444"],
                ["speed", "number", "0.3"],
                ["repetition", "number", "3"],
                ["distortion", "number", "0.1"],
              ].map(([prop, type, def], i) => (
                <tr key={prop} style={{ borderTop: i > 0 ? "1px solid #222" : "none" }}>
                  <td style={{ padding: "10px 16px", color: "#ccc", fontFamily: "monospace" }}>{prop}</td>
                  <td style={{ padding: "10px 16px", color: "#888" }}>{type}</td>
                  <td style={{ padding: "10px 16px", color: "#666", fontFamily: "monospace" }}>{def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
