"use client";

import { Navbar } from "@/components/navbar";
import { ResizablePanels } from "@/components/resizable-panels";
import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsToc } from "@/components/docs-toc";

const tocItems = [
  { label: "Overview", href: "#overview", active: true },
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
  return (
    <main className="theme-bg" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1, paddingTop: 52, display: "flex", flexDirection: "column" }}>
        <ResizablePanels
          defaultLeftWidth={240}
          defaultRightWidth={200}
          left={<DocsSidebar />}
          right={<DocsToc items={tocItems} />}
        >
          <div style={{ padding: "32px 40px", maxWidth: 900 }}>
            {children}
          </div>
        </ResizablePanels>
      </div>
    </main>
  );
}
