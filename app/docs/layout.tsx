"use client";

import { useState, useCallback } from "react";
import { Navbar } from "@/components/navbar";
import { ResizablePanels } from "@/components/resizable-panels";
import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsToc } from "@/components/docs-toc";

const tocItems = [
  { label: "Overview", href: "#overview" },
  { label: "Preview", href: "#preview" },
  { label: "Installation", href: "#installation" },
  { label: "Usage", href: "#usage" },
  { label: "Props", href: "#props" },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((p) => !p), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <main className="theme-bg docs-layout" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Mobile sidebar toggle */}
      <button
        className="docs-mobile-toggle"
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: 10,
          left: 16,
          zIndex: 101,
          width: 32,
          height: 32,
          borderRadius: 6,
          border: "1px solid #333",
          background: "#000",
          color: "#ccc",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {sidebarOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </>
          )}
        </svg>
      </button>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="docs-sidebar-backdrop" onClick={closeSidebar} />
      )}

      {/* Mobile sidebar overlay */}
      <div className={`docs-sidebar-overlay ${sidebarOpen ? "" : "hidden"}`}>
        <DocsSidebar onNavigate={closeSidebar} />
      </div>

      <div style={{ flex: 1, paddingTop: 52, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <ResizablePanels
          defaultLeftWidth={240}
          left={<DocsSidebar />}
        >
          <div className="docs-content-area" style={{ padding: "32px 40px", maxWidth: 900, marginRight: 220 }}>
            {children}
          </div>
        </ResizablePanels>
      </div>

      {/* Fixed right TOC panel */}
      <div
        className="docs-toc-panel"
        style={{
          position: "fixed",
          top: 52,
          right: 0,
          width: 200,
          bottom: 0,
          zIndex: 5,
        }}
      >
        <DocsToc items={tocItems} />
      </div>
    </main>
  );
}
