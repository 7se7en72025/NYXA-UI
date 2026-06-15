"use client";

import { useState, memo } from "react";

interface CodeBlockProps {
  code: string;
  filename?: string;
  tabs?: string[];
  onTabChange?: (index: number) => void;
  activeTabIndex?: number;
}

export const CodeBlock = memo(function CodeBlock({
  code,
  filename,
  tabs,
  onTabChange,
  activeTabIndex: controlledTab,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [internalTab, setInternalTab] = useState(0);
  const activeTab = controlledTab ?? internalTab;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTab = (i: number) => {
    if (onTabChange) onTabChange(i);
    else setInternalTab(i);
  };

  return (
    <div
      style={{
        borderRadius: 8,
        border: "1px solid #222",
        overflow: "hidden",
        marginBottom: 20,
      }}
    >
      {(tabs || filename) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #222",
            background: "#111",
          }}
        >
          {tabs ? (
            <div style={{ display: "flex", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => handleTab(i)}
                  style={{
                    padding: "8px 14px",
                    fontSize: 12,
                    fontFamily: "inherit",
                    fontWeight: activeTab === i ? 600 : 400,
                    border: "none",
                    borderBottom: activeTab === i ? "2px solid #fff" : "2px solid transparent",
                    cursor: "pointer",
                    background: "transparent",
                    color: activeTab === i ? "#fff" : "#666",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          ) : (
            <span
              style={{
                padding: "8px 16px",
                fontSize: 12,
                fontFamily: "monospace",
                color: "#888",
              }}
            >
              {filename}
            </span>
          )}

          <button
            onClick={handleCopy}
            style={{
              marginRight: 8,
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
              padding: 4,
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
        </div>
      )}

      {!tabs && !filename && (
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
      )}

      <div
        style={{
          padding: "14px 16px",
          background: "#0d0d0d",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          color: "#aaa",
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
          overflowX: "auto",
          position: (!tabs && !filename) ? "relative" : undefined,
        }}
      >
        {code}
      </div>
    </div>
  );
});
