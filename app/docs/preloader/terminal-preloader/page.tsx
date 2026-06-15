"use client";

import { useState } from "react";
import { TerminalPreloader } from "@/components/ui/terminal-preloader";

const installCommands: Record<string, string> = {
  npm: "npx shadcn@latest add https://kata-ui.vercel.app/r/terminal-preloader.json",
  pnpm: "pnpm dlx shadcn@latest add https://kata-ui.vercel.app/r/terminal-preloader.json",
  bun: "bunx shadcn@latest add https://kata-ui.vercel.app/r/terminal-preloader.json",
  yarn: "yarn dlx shadcn@latest add https://kata-ui.vercel.app/r/terminal-preloader.json",
};

const pkgManagers = [
  { name: "npm", icon: "n", color: "#CB3837" },
  { name: "pnpm", icon: "pn", color: "#F69220" },
  { name: "bun", icon: "b", color: "#FBF0DF" },
  { name: "yarn", icon: "y", color: "#2C8EBB" },
];

const usageCode = `"use client"

import { useState } from "react"
import { TerminalPreloader } from "@/components/ui/terminal-preloader"

export default function Page() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && (
        <TerminalPreloader
          onComplete={() => setLoaded(true)}
          duration={5000}
          skipable={true}
        />
      )}
      <main style={{ opacity: loaded ? 1 : 0 }}>
        {/* your actual page */}
      </main>
    </>
  )
}`;

const customCode = `<TerminalPreloader
  duration={4000}
  accentColor="#00FFFF"
  bgColor="#0D0221"
  skipable={true}
  eventsLines={[
    ">> [BUTTON]   Domain Button",
    ">> [CARD]     Reiatsu Card",
    ">> [INPUT]    Chakra Input",
  ]}
  whoamiLines={[
    ">> [DESIGN]   Your Name",
    ">> [OSS]      Kata UI",
    ">> [MISSION]  Form follows force.",
  ]}
  onComplete={() => setPreloaderDone(true)}
/>`;

const propsData = [
  ["duration", "number", "5000", "Total ms before exit sequence starts"],
  ["onComplete", "() => void", "undefined", "Called after fade out completes"],
  ["contained", "boolean", "false", "Absolute positioning for inline preview"],
  ["terminalLines", "TerminalLine[]", "defaults", "Left panel terminal lines"],
  ["eventsLines", "string[]", "defaults", "Top-right component list lines"],
  ["settingsLines", "SettingsLine[]", "defaults", "Middle-right settings with tag pills"],
  ["whoamiLines", "string[]", "defaults", "Bottom-right whoami lines"],
  ["accentColor", "string", "#4df4fc", "Primary accent color (cyan)"],
  ["bgColor", "string", "#0d0221", "Overlay background color"],
  ["skipable", "boolean", "true", "Allow click/key to skip preloader"],
  ["className", "string", "undefined", "Additional CSS class"],
];

export default function TerminalPreloaderPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [activePkg, setActivePkg] = useState("npm");
  const [copied, setCopied] = useState(false);
  const [preloaderKey, setPreloaderKey] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommands[activePkg]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>

      <div style={{ fontSize: 13, color: "#666", fontFamily: "inherit", marginBottom: 4 }}>
        <span>Components</span>
        <span style={{ margin: "0 8px", color: "#444" }}>/</span>
        <span style={{ color: "#aaa" }}>Terminal Preloader</span>
      </div>

      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "inherit",
          margin: "0 0 6px",
          letterSpacing: "-0.02em",
        }}
      >
        Terminal Preloader
      </h1>

      <p
        style={{
          fontSize: 15,
          color: "#888",
          fontFamily: "inherit",
          marginBottom: 20,
          lineHeight: 1.6,
        }}
      >
        Full-screen cyberpunk terminal boot sequence preloader with typewriter effects, scan lines, and customizable content panels.
      </p>

      {/* Preview/Code tabs + Install command */}
      <div
        className="docs-install-bar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            borderRadius: 8,
            border: "1px solid #333",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {(["preview", "code"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                fontSize: 13,
                fontFamily: "inherit",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                background: activeTab === tab ? "#fff" : "transparent",
                color: activeTab === tab ? "#000" : "#888",
              }}
            >
              {tab === "preview" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              )}
              {tab === "preview" ? "Preview" : "Code"}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flex: 1,
            minWidth: 0,
            padding: "7px 12px",
            borderRadius: 8,
            border: "1px solid #333",
            background: "transparent",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#888",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {installCommands[activePkg]}
          </span>

          <button
            onClick={handleCopy}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
              padding: 2,
              flexShrink: 0,
            }}
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>

          <button
            style={{
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
              padding: 2,
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
        </div>
      </div>

      {/* Preview / Code Panel */}
      {activeTab === "preview" ? (
        <div
          style={{
            position: "relative",
            borderRadius: 12,
            border: "1px solid #1a1a1a",
            overflow: "hidden",
            height: 500,
            marginBottom: 40,
            background: "#0d0221",
          }}
        >
          <TerminalPreloader
            key={preloaderKey}
            duration={5000}
            contained={true}
            skipable={false}
            onComplete={() => setPreloaderKey((k) => k + 1)}
          />
        </div>
      ) : (
        <div
          style={{
            borderRadius: 12,
            border: "1px solid #1a1a1a",
            overflow: "hidden",
            marginBottom: 40,
          }}
        >
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
            app/page.tsx
          </div>
          <div
            style={{
              padding: "14px 0",
              background: "#0d0d0d",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              lineHeight: 1.8,
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {usageCode.split("\n").map((line, i) => (
              <div key={i} style={{ display: "flex" }}>
                <span
                  style={{
                    width: 48,
                    textAlign: "right",
                    paddingRight: 16,
                    color: "#555",
                    userSelect: "none",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    color: line.includes("import") || line.includes("from")
                      ? "#C792EA"
                      : line.includes("export") || line.includes("function")
                        ? "#82AAFF"
                        : line.includes("<") || line.includes("/>")
                          ? "#F07178"
                          : line.includes("true") || line.includes("false")
                            ? "#F78C6C"
                            : line.includes("const") || line.includes("let")
                              ? "#C792EA"
                              : "#C3CEE3",
                    paddingLeft: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Installation */}
      <h2
        id="installation"
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

      {/* CLI / Manual tabs */}
      <div
        style={{
          display: "inline-flex",
          borderRadius: 8,
          border: "1px solid #333",
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        {(["cli", "manual"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setInstallTab(tab)}
            style={{
              padding: "6px 16px",
              fontSize: 13,
              fontFamily: "inherit",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              background: installTab === tab ? "#fff" : "transparent",
              color: installTab === tab ? "#000" : "#888",
              textTransform: "capitalize",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {installTab === "cli" ? (
        <>
          <p
            style={{
              fontSize: 14,
              color: "#888",
              fontFamily: "inherit",
              marginBottom: 12,
            }}
          >
            Run the following command
          </p>

          {/* Package manager tabs + command */}
          <div
            style={{
              borderRadius: 8,
              border: "1px solid #222",
              overflow: "hidden",
              marginBottom: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #222",
                background: "#111",
              }}
            >
              {pkgManagers.map((pkg) => (
                <button
                  key={pkg.name}
                  onClick={() => setActivePkg(pkg.name)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 16px",
                    fontSize: 13,
                    fontFamily: "inherit",
                    fontWeight: 500,
                    border: "none",
                    borderBottom: activePkg === pkg.name ? "2px solid #fff" : "2px solid transparent",
                    cursor: "pointer",
                    background: "transparent",
                    color: activePkg === pkg.name ? "#fff" : "#888",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      fontSize: 10,
                      fontWeight: 700,
                      color: pkg.color,
                      background: `${pkg.color}15`,
                    }}
                  >
                    {pkg.icon}
                  </span>
                  {pkg.name}
                </button>
              ))}

              <button
                onClick={handleCopy}
                style={{
                  marginLeft: "auto",
                  marginRight: 12,
                  background: "none",
                  border: "none",
                  color: "#666",
                  cursor: "pointer",
                  fontSize: 14,
                  padding: 4,
                }}
              >
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>

            <div
              style={{
                padding: "14px 16px",
                background: "#0d0d0d",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
              }}
            >
              <span style={{ color: "#888" }}>{activePkg === "npm" || activePkg === "bun" ? "npx " : activePkg === "pnpm" ? "pnpm dlx " : activePkg === "bun" ? "bunx " : "yarn dlx "}</span>
              <span style={{ color: "#C792EA" }}>shadcn@latest </span>
              <span style={{ color: "#888" }}>add </span>
              <span style={{ color: "#C3E88D" }}>https://kata-ui.vercel.app/r/terminal-preloader.json</span>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            padding: 20,
            borderRadius: 8,
            border: "1px solid #222",
            background: "#0d0d0d",
            marginBottom: 40,
            fontSize: 14,
            color: "#888",
            fontFamily: "inherit",
            lineHeight: 1.7,
          }}
        >
          Copy the component file into your project.
        </div>
      )}

      {/* Usage */}
      <h2
        id="usage"
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

      <div
        style={{
          borderRadius: 8,
          border: "1px solid #222",
          overflow: "hidden",
          marginBottom: 32,
        }}
      >
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
          app/page.tsx
        </div>
        <div
          style={{
            padding: "14px 0",
            background: "#0d0d0d",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            lineHeight: 1.8,
            overflowX: "auto",
          }}
        >
          {usageCode.split("\n").map((line, i) => (
            <div key={i} style={{ display: "flex", whiteSpace: "nowrap" }}>
              <span
                style={{
                  width: 48,
                  textAlign: "right",
                  paddingRight: 16,
                  color: "#555",
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  color: line.includes("import") || line.includes("from")
                    ? "#C792EA"
                    : line.includes("export") || line.includes("function")
                      ? "#82AAFF"
                      : line.includes("<") || line.includes("/>")
                        ? "#F07178"
                        : line.includes("true") || line.includes("false")
                          ? "#F78C6C"
                          : "#C3CEE3",
                  paddingLeft: 8,
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Content */}
      <h2
        id="custom"
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
        }}
      >
        Custom Content
      </h2>

      <div
        style={{
          borderRadius: 8,
          border: "1px solid #222",
          overflow: "hidden",
          marginBottom: 32,
        }}
      >
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
          app/page.tsx
        </div>
        <div
          style={{
            padding: "14px 0",
            background: "#0d0d0d",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            lineHeight: 1.8,
            overflowX: "auto",
          }}
        >
          {customCode.split("\n").map((line, i) => (
            <div key={i} style={{ display: "flex", whiteSpace: "nowrap" }}>
              <span
                style={{
                  width: 48,
                  textAlign: "right",
                  paddingRight: 16,
                  color: "#555",
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  color: line.includes("<") || line.includes("/>")
                    ? "#F07178"
                    : line.includes("\"") || line.includes("'")
                      ? "#C3E88D"
                      : line.includes("{") || line.includes("}")
                        ? "#89DDFF"
                        : "#C3CEE3",
                  paddingLeft: 8,
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Props */}
      <h2
        id="props"
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

      <div className="docs-props-table-wrap">
        <table
          className="docs-props-table"
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
              <th style={{ padding: "10px 16px", textAlign: "left", color: "#888", fontWeight: 500 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {propsData.map(([prop, type, def, desc], i) => (
              <tr key={prop} style={{ borderTop: i > 0 ? "1px solid #222" : "none" }}>
                <td style={{ padding: "10px 16px", color: "#ccc", fontFamily: "monospace" }}>{prop}</td>
                <td style={{ padding: "10px 16px", color: "#888" }}>{type}</td>
                <td style={{ padding: "10px 16px", color: "#666", fontFamily: "monospace" }}>{def}</td>
                <td style={{ padding: "10px 16px", color: "#888" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
