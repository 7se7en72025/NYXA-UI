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
          src="/KATAUILOGOWHITE.svg"
          alt="Kata UI"
          width={40}
          height={40}
          className="h-10 w-auto"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold" style={{ color: "var(--fg)" }}>
            KataUI
          </span>
          <span className="text-xs" style={{ color: "#888" }}>
            made with ❤ by 777
          </span>
        </div>
      </div>

      <div className="text-sm" style={{ color: "#888" }}>
        © 2026 KataUI. MIT License.
      </div>
    </footer>
  );
});
