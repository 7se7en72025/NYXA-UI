"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Something went wrong</h2>
      <button
        onClick={() => reset()}
        style={{
          background: "var(--fg)",
          color: "var(--bg)",
          border: "none",
          borderRadius: 8,
          padding: "8px 18px",
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
