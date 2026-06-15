"use client";

import React from "react";

const stats = [
  { label: "Total Revenue", value: "$45,231.89", sub: "+20.1% from last month", icon: "$", trend: "up" },
  { label: "Subscriptions", value: "+2350", sub: "+180.1% from last month", icon: "+", trend: "up" },
  { label: "Sales", value: "+12,234", sub: "+19% from last month", icon: "", trend: "up" },
  { label: "Active Now", value: "+573", sub: "+201 since last hour", icon: "", trend: "up" },
];

const sales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", color: "#6366f1" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", color: "#f59e0b" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00", color: "#10b981" },
  { name: "William Kim", email: "will@email.com", amount: "+$99.00", color: "#3b82f6" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", color: "#ec4899" },
];

const chartBars = [
  { h: 45, label: "Jan" }, { h: 62, label: "Feb" }, { h: 38, label: "Mar" },
  { h: 72, label: "Apr" }, { h: 55, label: "May" }, { h: 80, label: "Jun" },
  { h: 65, label: "Jul" }, { h: 48, label: "Aug" }, { h: 70, label: "Sep" },
  { h: 52, label: "Oct" }, { h: 42, label: "Nov" }, { h: 35, label: "Dec" },
];

const chartGrid = [0, 1500, 3000, 4500, 6000];

function Avatar({ color, name }: { color: string; name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("");
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: `${color}20`,
        border: `1px solid ${color}40`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 600,
        color: color,
        fontFamily: "inherit",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function StatIcon({ type }: { type: string }) {
  if (type === "$") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }
  if (type === "+") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export function DashboardPreview() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1000,
        margin: "0 auto",
        padding: "0 24px",
        zIndex: 10,
      }}
    >
      <div
        style={{
          borderRadius: 16,
          border: "1px solid #1e1e1e",
          background: "#09090b",
          overflow: "hidden",
          boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        {/* Nav bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            padding: "14px 24px",
            borderBottom: "1px solid #1a1a1a",
            background: "#09090b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #333 0%, #1a1a1a 100%)",
                border: "1px solid #333",
              }}
            />
            <span style={{ fontSize: 14, color: "#eee", fontFamily: "inherit", fontWeight: 500 }}>Kata UI</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Overview", "Components", "Layout", "Effects"].map((item) => (
              <span
                key={item}
                style={{
                  fontSize: 13,
                  color: item === "Overview" ? "#fff" : "#666",
                  fontFamily: "inherit",
                  fontWeight: item === "Overview" ? 500 : 400,
                  cursor: "default",
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 14px",
                borderRadius: 8,
                border: "1px solid #1e1e1e",
                background: "#09090b",
                fontSize: 13,
                color: "#555",
                fontFamily: "inherit",
                minWidth: 180,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search...
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #333 0%, #1a1a1a 100%)",
                border: "1px solid #333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 28px" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "#fff", margin: 0, fontFamily: "inherit", letterSpacing: "-0.01em" }}>Dashboard</h3>
            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: "1px solid #1e1e1e",
                  fontSize: 13,
                  color: "#888",
                  fontFamily: "inherit",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Jan 20, 2026 - Feb 09, 2026
              </div>
              <div
                style={{
                  padding: "7px 16px",
                  borderRadius: 8,
                  background: "#fff",
                  color: "#000",
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "inherit",
                  cursor: "default",
                }}
              >
                Download
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 2, marginBottom: 24, background: "#111", borderRadius: 10, padding: 4, width: "fit-content" }}>
            {["Overview", "Analytics", "Reports", "Notifications"].map((tab) => (
              <div
                key={tab}
                style={{
                  padding: "6px 14px",
                  fontSize: 13,
                  fontFamily: "inherit",
                  fontWeight: 500,
                  color: tab === "Overview" ? "#fff" : "#666",
                  background: tab === "Overview" ? "#222" : "transparent",
                  borderRadius: 8,
                  cursor: "default",
                  transition: "background 0.15s",
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 14 }}>
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  padding: "20px",
                  borderRadius: 12,
                  border: "1px solid #1e1e1e",
                  background: "#09090b",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "#888", fontFamily: "inherit", fontWeight: 400 }}>{s.label}</span>
                  <StatIcon type={s.icon} />
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", fontFamily: "inherit", letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 6, fontFamily: "inherit" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Chart + Recent Sales */}
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}>
            {/* Chart */}
            <div
              style={{
                padding: "20px",
                borderRadius: 12,
                border: "1px solid #1e1e1e",
                background: "#09090b",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 20, fontFamily: "inherit" }}>Overview</div>
              <div style={{ position: "relative", height: 180 }}>
                {/* Grid lines */}
                {chartGrid.map((val, i) => (
                  <div
                    key={val}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: `${(1 - val / 6000) * 100}%`,
                      display: "flex",
                      alignItems: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <span style={{ fontSize: 10, color: "#444", fontFamily: "inherit", width: 36, textAlign: "right", paddingRight: 8, flexShrink: 0 }}>
                      ${val.toLocaleString()}
                    </span>
                    <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
                  </div>
                ))}
                {/* Bars */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: "100%", marginLeft: 44 }}>
                  {chartBars.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${b.h}%`,
                        borderRadius: 4,
                        background: `linear-gradient(180deg, #555 0%, #333 100%)`,
                        transition: "opacity 0.15s",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", marginTop: 10, marginLeft: 44 }}>
                {chartBars.map((b, i) => (
                  <span key={i} style={{ fontSize: 10, color: "#444", flex: 1, textAlign: "center", fontFamily: "inherit" }}>{b.label}</span>
                ))}
              </div>
            </div>

            {/* Recent Sales */}
            <div
              style={{
                padding: "20px",
                borderRadius: 12,
                border: "1px solid #1e1e1e",
                background: "#09090b",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 4, fontFamily: "inherit" }}>Recent Sales</div>
              <div style={{ fontSize: 13, color: "#555", marginBottom: 20, fontFamily: "inherit" }}>You made 265 sales this month.</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {sales.map((s) => (
                  <div key={s.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Avatar color={s.color} name={s.name} />
                      <div>
                        <div style={{ fontSize: 13, color: "#ddd", fontFamily: "inherit", fontWeight: 500 }}>{s.name}</div>
                        <div style={{ fontSize: 12, color: "#555", fontFamily: "inherit" }}>{s.email}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 13, color: "#ddd", fontFamily: "inherit", fontWeight: 500 }}>{s.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
