"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CommandMenu } from "./command-menu";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function playClick() {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04);
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.06);
}

function applyColor(el: HTMLElement, type: string, theme: "light" | "dark") {
  el.style.transition = "none";
  if (type === "text") el.style.color = theme === "dark" ? "#fff" : "#0d0d0d";
  else if (type === "toggle") {
    el.style.borderColor = theme === "dark" ? "#333" : "#d4d4d4";
    el.style.color = theme === "dark" ? "#aaa" : "#555";
  } else if (type === "docs") {
    el.style.background = theme === "dark" ? "#fff" : "#111";
    el.style.color = theme === "dark" ? "#000" : "#fff";
  } else if (type === "logo") {
    const img = el.querySelector("img") as HTMLImageElement;
    if (img) img.src = theme === "dark" ? "/KATAUILOGOWHITE.svg" : "/KATAUILOGOBLACK.svg";
  } else if (type === "search") {
    el.style.borderColor = theme === "dark" ? "#333" : "#d4d4d4";
    el.style.background = theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
    el.style.setProperty("--search-placeholder", theme === "dark" ? "#666" : "#999");
    const icon = el.querySelector<SVGElement>("svg");
    if (icon) icon.style.stroke = theme === "dark" ? "#666" : "#999";
    const input = el.querySelector<HTMLInputElement>("input");
    if (input) input.style.color = theme === "dark" ? "#fff" : "#0d0d0d";
    const badge = el.querySelector<HTMLElement>("[data-nav-search-badge]");
    if (badge) {
      badge.style.color = theme === "dark" ? "#555" : "#aaa";
      badge.style.borderColor = theme === "dark" ? "#333" : "#d4d4d4";
    }
  }
}

function triggerTriangleTransition(
  originX: number,
  originY: number,
  nextTheme: "light" | "dark",
  elements: { el: HTMLElement; type: string }[],
  onDone: () => void
) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    elements.forEach(({ el, type }) => applyColor(el, type, nextTheme));
    onDone();
    return;
  }

  playClick();

  const overlayColor = nextTheme === "light" ? "#ffffff" : "#0d0d0d";
  const W = window.innerWidth;
  const H = window.innerHeight;
  const maxDim = Math.max(W, H) * 3;
  const duration = 500;

  const startClip = `polygon(${originX}px ${originY}px, ${originX}px ${originY}px, ${originX}px ${originY}px)`;
  const endClip = `polygon(${originX}px ${originY - maxDim}px, ${originX - maxDim}px ${originY + maxDim}px, ${originX + maxDim}px ${originY + maxDim}px)`;

  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed; inset:0; width:100vw; height:100vh;
    z-index:99; pointer-events:none;
    background:${overlayColor};
    clip-path:${startClip};
    will-change:clip-path;
  `;
  document.body.appendChild(overlay);
  overlay.getBoundingClientRect();

  const anim = overlay.animate(
    [{ clipPath: startClip }, { clipPath: endClip }],
    { duration, easing: "linear", fill: "forwards" }
  );

  elements.forEach(({ el, type }, i) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - originX;
    const dy = cy - originY;
    const t = Math.max(0, Math.min(1, Math.max((-2 * dx - dy) / maxDim, (2 * dx - dy) / maxDim, dy / maxDim)));
    const delay = Math.round(t * duration);

    setTimeout(() => applyColor(el, type, nextTheme), delay);
  });

  anim.onfinish = () => {
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    overlay.remove();
    onDone();
  };
}

export function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const borderRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [searchHover, setSearchHover] = useState<{ x: number; y: number } | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/docs");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setIsDark(stored === "dark");
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!borderRef.current) return;
    const path = borderRef.current.querySelector("rect");
    if (!path) return;
    if (hovered) {
      path.style.animation = "none";
      path.getBoundingClientRect();
      path.style.animation = "trace-border 300ms linear forwards";
    } else {
      path.style.animation = "trace-border-reverse 200ms linear forwards";
    }
  }, [hovered]);

  const toggleTheme = useCallback(
    (_e: React.MouseEvent<HTMLDivElement>) => {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 1800);
    },
    []
  );

  return (
    <>
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 52,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isDocs ? "0 16px" : "0 16px",
        background: isDark ? "#000000" : "#ffffff",
        pointerEvents: "none",
      }}
    >
      <style>{`
        @media (min-width: 769px) {
          nav { padding-left: ${isDocs ? "24px" : "68px"} !important; padding-right: ${isDocs ? "24px" : "68px"} !important; }
        }
      `}</style>
      <div
        data-nav-logo
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          pointerEvents: "auto",
          flexShrink: 0,
        }}
      >
        <Image
          src={isDark ? "/KATAUILOGOWHITE.svg" : "/KATAUILOGOBLACK.svg"}
          alt="Kata UI"
          width={28}
          height={18}
          style={{ height: 24, width: "auto" }}
        />
        <span
          data-nav-text
          style={{
            fontFamily: "inherit",
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            lineHeight: 1,
            color: isDark ? "#fff" : "#0d0d0d",
          }}
        >
          KataUI
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flex: 1,
          justifyContent: "flex-end",
          pointerEvents: "auto",
        }}
      >
        <div
          ref={searchRef}
          data-nav-search
          className="navbar-search"
          onClick={() => setCmdOpen(true)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setSearchHover({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}
          onMouseLeave={() => setSearchHover(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 8,
            border: `1px solid ${isDark ? (searchHover ? "#555" : "#333") : (searchHover ? "#bbb" : "#d4d4d4")}`,
            background: searchHover
              ? `radial-gradient(circle 140px at ${searchHover.x}px ${searchHover.y}px, ${isDark ? "rgba(255,255,255,0.18)" : "rgba(200,200,200,0.25)"}, ${isDark ? "rgba(255,255,255,0.04)" : "rgba(240,240,240,0.08)"})`
              : isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
            cursor: "pointer",
            height: 36,
            minWidth: 200,
            transition: "border-color 0.15s ease",
          } as React.CSSProperties}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            style={{ stroke: searchHover ? (isDark ? "#ccc" : "#555") : (isDark ? "#666" : "#999"), transition: "stroke 0.15s ease", flexShrink: 0 }}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span
            style={{
              fontSize: 13,
              color: isDark ? "#666" : "#999",
              fontFamily: "inherit",
              flex: 1,
              textAlign: "left",
              minWidth: 0,
            }}
          >
            Search documentation...
          </span>
          <span
            data-nav-search-badge
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              fontSize: 11,
              fontFamily: "inherit",
              color: searchHover ? (isDark ? "#eee" : "#222") : (isDark ? "#555" : "#aaa"),
              border: `1px solid ${isDark ? (searchHover ? "#666" : "#333") : (searchHover ? "#999" : "#d4d4d4")}`,
              background: searchHover ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)") : "transparent",
              transition: "all 0.2s ease",
              borderRadius: 4,
              padding: "2px 5px",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 10 }}>⌘</span>K
          </span>
        </div>
        <a
          href="https://github.com/7se7en72025/kata-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-star"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 12px",
            borderRadius: 8,
            border: `1px solid ${isDark ? "#333" : "#d4d4d4"}`,
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
            color: isDark ? "#ccc" : "#333",
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "inherit",
            textDecoration: "none",
            transition: "all 0.15s ease",
            height: 36,
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = isDark ? "#555" : "#aaa";
            e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = isDark ? "#333" : "#d4d4d4";
            e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          Star
        </a>
        <div
          data-nav-toggle
          className="theme-toggle-wrap"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={toggleTheme}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            color: isDark ? "#aaa" : "#555",
          }}
        >
          <svg
            ref={borderRef}
            className="toggle-border-svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <rect
              x="0.5"
              y="0.5"
              width="35"
              height="35"
              rx="7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
              strokeDasharray="140"
              strokeDashoffset="140"
            />
          </svg>

          <div
            ref={dotsRef}
            className={`orbit-dots ${hovered ? "active" : ""}`}
            style={{
              position: "absolute",
              width: 36,
              height: 36,
              pointerEvents: "none",
            }}
          >
            <span className="orbit-dot" style={{ top: -1, left: "50%", transform: "translateX(-50%)" }} />
            <span className="orbit-dot" style={{ top: "50%", right: -1, transform: "translateY(-50%)" }} />
            <span className="orbit-dot" style={{ bottom: -1, left: "50%", transform: "translateX(-50%)" }} />
            <span className="orbit-dot" style={{ top: "50%", left: -1, transform: "translateY(-50%)" }} />
          </div>

          <span className="toggle-icon toggle-wrap">
            <span className="icon-a">{isDark ? <MoonIcon /> : <SunIcon />}</span>
            <span className="icon-b">{isDark ? <SunIcon /> : <MoonIcon />}</span>
          </span>
        </div>

        <button
          data-nav-docs
          className="navbar-docs-btn"
          style={{
            background: isDark ? "#fff" : "#111",
            color: isDark ? "#000" : "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "inherit",
            letterSpacing: 0,
            cursor: "pointer",
            height: 36,
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = isDark ? "#e8e8e8" : "#2a2a2a")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = isDark ? "#fff" : "#111")
          }
        >
          View Docs
        </button>

        {/* Mobile hamburger */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            width: 36,
            height: 36,
            borderRadius: 8,
            border: `1px solid ${isDark ? "#333" : "#d4d4d4"}`,
            background: "transparent",
            color: isDark ? "#ccc" : "#333",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          {mobileMenuOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>
    </nav>

    {/* Mobile menu */}
    {mobileMenuOpen && (
      <div className="navbar-mobile-menu">
        <a href="/docs" onClick={() => setMobileMenuOpen(false)}>Docs</a>
        <a href="https://github.com/7se7en72025/kata-ui" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>GitHub</a>
        <a href="/docs" onClick={() => setMobileMenuOpen(false)}>View Docs</a>
      </div>
    )}
    {showComingSoon && (
      <div
        style={{
          position: "fixed",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#1a1a1a",
          color: "#fff",
          border: "1px solid #333",
          borderRadius: 8,
          padding: "8px 20px",
          fontSize: 13,
          fontFamily: "inherit",
          zIndex: 9999,
          animation: "fadeInOut 1.8s ease forwards",
        }}
      >
        Light theme coming soon
      </div>
    )}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-4px); }
        15% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; }
        100% { opacity: 0; }
      }
    `}} />
    <CommandMenu open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}