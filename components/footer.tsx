"use client";

import { memo } from "react";
import Image from "next/image";

export const Footer = memo(function Footer() {
  return (
    <footer
      className="footer-bar"
      style={{
        position: "absolute",
        bottom: 0,
        left: 48,
        right: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        borderTop: "1px dashed",
        borderColor: "var(--ruler-border)",
      }}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/falak-logo.svg"
          alt="Falak"
          width={40}
          height={40}
          className="h-10 w-auto"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold" style={{ color: "var(--fg)" }}>
            Falak
          </span>
          <span className="text-xs" style={{ color: "#888" }}>
            made with ❤ by 7se7en72025
          </span>
        </div>
      </div>

      <div className="text-sm" style={{ color: "#888" }}>
        © 2026 Falak. MIT License.
      </div>
    </footer>
  );
});
