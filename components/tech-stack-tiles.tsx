"use client";

import React from "react";

function FloatingIconsIllustration() {
  const icons = [
    {
      name: "react",
      x: "50%",
      y: "50%",
      offsetX: 100,
      offsetY: -8,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="2.1" fill="#09090b" />
          <ellipse cx="12" cy="12" rx="10.5" ry="4.1" stroke="#09090b" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10.5" ry="4.1" stroke="#09090b" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10.5" ry="4.1" stroke="#09090b" strokeWidth="1.5" transform="rotate(120 12 12)" />
        </svg>
      ),
    },
    {
      name: "tailwind",
      x: "50%",
      y: "50%",
      offsetX: -116,
      offsetY: -8,
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 12" fill="none">
          <path
            d="M5.02356 0C3.13422 0 1.65486 0.569163 0.587239 1.70749C-0.480381 2.84582 -0.500887 4.28056 0.425668 6.15103C1.35222 8.0215 2.76263 9.18064 4.65688 9.62855C6.55114 10.0765 8.04084 9.5974 9.126 8.19116C10.2112 6.78493 10.4317 5.08285 9.78763 3.08494C9.54417 2.33173 9.19536 1.69467 8.7412 1.17378C8.28704 0.652884 7.74166 0.264039 7.10507 0.00724483C6.46848 -0.249544 5.78726 -0.132112 5.02356 0ZM12.392 0C10.5027 0 9.02333 0.569163 7.95571 1.70749C6.88809 2.84582 6.86758 4.28056 7.79414 6.15103C8.72069 8.0215 10.1311 9.18064 12.0254 9.62855C13.9196 10.0765 15.4093 9.5974 16.4945 8.19116C17.5797 6.78493 17.8002 5.08285 17.1561 3.08494C16.9127 2.33173 16.5639 1.69467 16.1097 1.17378C15.6555 0.652884 15.1102 0.264039 14.4736 0.00724483C13.837 -0.249544 13.1558 -0.132112 12.392 0Z"
            fill="#09090b"
          />
        </svg>
      ),
    },
    {
      name: "typescript",
      x: "50%",
      y: "50%",
      offsetX: 208,
      offsetY: -62,
      icon: (
        <svg width="24" height="24" viewBox="0 0 22 22" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 5.79113e-08C21.1046 6.1465e-08 22 0.892318 22 1.99689C22 7.68454 22 16.1774 22 20.0041C22 21.1086 21.1077 22 20.0031 22C14.3155 22 5.82262 22 1.99593 22C0.891354 22 0 21.108 0 20.0034C0 14.2015 0 5.79323 0 1.99497C0 0.890395 0.895427 0 2 0L20 5.79113e-08ZM12.2296 11.7043V9.9H4.39998V11.7043H7.1953V19.7382H9.42061V11.7043H12.2296Z"
            fill="#09090b"
          />
        </svg>
      ),
    },
    {
      name: "figma",
      x: "50%",
      y: "50%",
      offsetX: -8,
      offsetY: -62,
      icon: (
        <svg width="24" height="24" viewBox="0 0 15.5 22.5" fill="none">
          <path
            d="M7.75 0.750214V14.75M7.75 14.75V18.25C7.75 20.1831 6.183 21.75 4.25 21.75C2.317 21.75 0.75 20.1831 0.75 18.25C0.75 16.317 2.317 14.75 4.25 14.75M7.75 14.75H4.25M4.25 14.75C2.317 14.75 0.75 13.183 0.75 11.25C0.75 9.317 2.317 7.75 4.25 7.75M4.25 7.75H7.75M4.25 7.75H11.25M4.25 7.75C2.317 7.75 0.75 6.183 0.75 4.25C0.75 2.317 2.317 0.75 4.25 0.75H11.25C13.183 0.75 14.75 2.317 14.75 4.25C14.75 6.183 13.183 7.75 11.25 7.75M11.25 7.75C13.183 7.75 14.75 9.317 14.75 11.25C14.75 13.183 13.183 14.75 11.25 14.75C9.317 14.75 7.75 13.183 7.75 11.25C7.75 9.317 9.317 7.75 11.25 7.75Z"
            stroke="#09090b"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      name: "shadcn",
      x: "50%",
      y: "50%",
      offsetX: -8,
      offsetY: 46,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22.5 6.75L6.75 22.5" stroke="#09090b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M17.25 22.5L1.5 6.75" stroke="#09090b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        flex: 1,
        minHeight: 300,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orange glow */}
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(253,186,116,0.35) 0%, rgba(251,146,60,0.15) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Floating icon tiles */}
      {icons.map((item) => (
        <div
          key={item.name}
          style={{
            position: "absolute",
            left: `calc(${item.x} + ${item.offsetX}px)`,
            top: `calc(${item.y} + ${item.offsetY}px)`,
            width: 84,
            height: 84,
            borderRadius: 12,
            background: "linear-gradient(to top, rgba(9,9,11,0), rgba(9,9,11,0.05))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translate(-50%, -50%)",
            filter: "drop-shadow(0 0 4px rgba(253,186,116,0.5)) drop-shadow(0 0 16px rgba(253,186,116,0.5)) drop-shadow(0 0 24px rgba(253,186,116,0.5))",
            border: "4px solid rgba(255,255,255,0.2)",
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}

function ChatIllustration() {
  const messages = [
    { text: "We need to update this heading before launch", align: "left" as const, name: "Sofia G.", color: "#FDBA74", borderColor: "#FB923C" },
    { text: "Let me quickly jump into Sanity and fix it", align: "right" as const, name: "Erik D.", color: "#18181b", borderColor: "#09090b" },
    { text: "Done!", align: "right" as const, name: "Erik D.", color: "#18181b", borderColor: "#09090b" },
  ];

  return (
    <div
      style={{
        flex: 1,
        minHeight: 300,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Orange glow */}
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(253,186,116,0.35) 0%, rgba(251,146,60,0.15) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div style={{ position: "relative", width: "100%", maxWidth: 400, zIndex: 2, display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Message 1 - left */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, alignSelf: "flex-start" }}>
          <div
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              background: "linear-gradient(to top, rgba(9,9,11,0.05), rgba(9,9,11,0.1))",
              border: "1px solid rgba(9,9,11,0.2)",
              maxWidth: 289,
            }}
          >
            <p style={{ fontSize: 12, color: "#888", fontFamily: "inherit", margin: 0, lineHeight: "16px" }}>
              {messages[0].text}
            </p>
          </div>
          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, position: "relative" }}>
            <svg width="16" height="22" viewBox="0 0 16.658 22.0689" fill="none">
              <ellipse cx="8.329" cy="11.034" rx="8.329" ry="11.034" fill={messages[0].color} stroke={messages[0].borderColor} strokeWidth="1.2" />
            </svg>
            <div
              style={{
                position: "absolute",
                right: -42,
                top: -8,
                padding: "4px 8px",
                borderRadius: 7.2,
                background: messages[0].color,
                border: `1.2px solid ${messages[0].borderColor}`,
                boxShadow: "0 0 4px rgba(253,186,116,0.5), 0 0 32px rgba(253,186,116,0.5)",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 500, color: "#09090b", fontFamily: "inherit" }}>{messages[0].name}</span>
            </div>
          </div>
        </div>

        {/* Message 2 - right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, alignSelf: "flex-end" }}>
          <div
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              background: "linear-gradient(to top, rgba(9,9,11,0.05), rgba(9,9,11,0.1))",
              border: "1px solid rgba(9,9,11,0.2)",
              maxWidth: 256,
            }}
          >
            <p style={{ fontSize: 12, color: "#888", fontFamily: "inherit", margin: 0, lineHeight: "16px" }}>
              {messages[1].text}
            </p>
          </div>
        </div>

        {/* Message 3 - right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, alignSelf: "flex-end" }}>
          <div
            style={{
              padding: "8px 12px",
              borderRadius: 12,
              background: "linear-gradient(to top, rgba(9,9,11,0.05), rgba(9,9,11,0.1))",
              border: "1px solid rgba(9,9,11,0.2)",
            }}
          >
            <p style={{ fontSize: 12, color: "#888", fontFamily: "inherit", margin: 0, lineHeight: "16px" }}>
              {messages[2].text}
            </p>
          </div>
          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="16" height="22" viewBox="0 0 16.658 22.0689" fill="none">
              <ellipse cx="8.329" cy="11.034" rx="8.329" ry="11.034" fill="#18181b" stroke="#09090b" strokeWidth="1.2" />
            </svg>
            <div
              style={{
                padding: "4px 8px",
                borderRadius: 7.2,
                background: "#18181b",
                border: "1.2px solid #09090b",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 500, color: "#fafafa", fontFamily: "inherit" }}>{messages[1].name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TechStackTiles() {
  return (
    <section
      style={{
        padding: "0 24px 64px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {/* Left tile: Fits right into your stack */}
        <div
          style={{
            flex: "1 1 0",
            minWidth: 360,
            minHeight: 560,
            background: "#0a0a0a",
            borderRadius: 12,
            border: "1px solid #222",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            padding: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            <p
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#fff",
                fontFamily: "inherit",
                lineHeight: "32px",
                margin: 0,
              }}
            >
              Fits right into your stack
            </p>
            <p
              style={{
                fontSize: 16,
                color: "#888",
                fontFamily: "inherit",
                lineHeight: "24px",
                margin: 0,
              }}
            >
              Built with modern web technologies and tools that fit right into any React project.
              <br />
              No bloat, no extra dependencies, no risk of conflicts.
            </p>
          </div>
          <FloatingIconsIllustration />
        </div>

        {/* Right tile: Data-agnostic */}
        <div
          style={{
            flex: "1 1 0",
            minWidth: 360,
            minHeight: 560,
            background: "#0a0a0a",
            borderRadius: 12,
            border: "1px solid #222",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            padding: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            <p
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#fff",
                fontFamily: "inherit",
                lineHeight: "32px",
                margin: 0,
              }}
            >
              Data-agnostic
            </p>
            <p
              style={{
                fontSize: 16,
                color: "#888",
                fontFamily: "inherit",
                lineHeight: "24px",
                margin: 0,
              }}
            >
              All the data is separate from components so you can edit it in seconds or make it dynamic.
              <br />
              Easily connect to a CMS of your choice.
            </p>
          </div>
          <ChatIllustration />
        </div>
      </div>
    </section>
  );
}

export default TechStackTiles;
