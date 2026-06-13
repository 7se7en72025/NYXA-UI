"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "inherit",
      }}
    >
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>404 — Page Not Found</h2>
      <Link
        href="/"
        style={{
          background: "var(--fg)",
          color: "var(--bg)",
          border: "none",
          borderRadius: 8,
          padding: "8px 18px",
          fontSize: 14,
          fontWeight: 500,
          textDecoration: "none",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
