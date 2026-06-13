"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

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
  const navRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const borderRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [searchHover, setSearchHover] = useState<{ x: number; y: number } | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchHasValue, setSearchHasValue] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setIsDark(stored === "dark");
      document.documentElement.setAttribute("data-theme", stored);
    }
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
    (e: React.MouseEvent<HTMLDivElement>) => {
      const x = Math.round(window.innerWidth / 2);
      const y = Math.round(window.innerHeight / 2);
      const next = isDark ? "light" : "dark";

      const items: { el: HTMLElement; type: string }[] = [];
      if (navRef.current) {
        navRef.current.querySelectorAll<HTMLElement>("[data-nav-text]").forEach((el) => items.push({ el, type: "text" }));
        navRef.current.querySelectorAll<HTMLElement>("[data-nav-toggle]").forEach((el) => items.push({ el, type: "toggle" }));
        navRef.current.querySelectorAll<HTMLElement>("[data-nav-docs]").forEach((el) => items.push({ el, type: "docs" }));
        navRef.current.querySelectorAll<HTMLElement>("[data-nav-logo]").forEach((el) => items.push({ el, type: "logo" }));
        navRef.current.querySelectorAll<HTMLElement>("[data-nav-search]").forEach((el) => items.push({ el, type: "search" }));
      }

      triggerTriangleTransition(x, y, next, items, () => {
        setIsDark(!isDark);
      });
    },
    [isDark]
  );

  return (
    <>
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 48,
        right: 48,
        height: 52,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 68px",
        background: "transparent",
        pointerEvents: "none",
      }}
    >
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
            fontFamily: "sans-serif",
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
            border: `1px solid ${isDark ? ((searchHover || searchFocused || searchHasValue) ? "#555" : "#333") : ((searchHover || searchFocused || searchHasValue) ? "#bbb" : "#d4d4d4")}`,
            background: (searchHover || searchFocused || searchHasValue)
              ? searchHover
                ? `radial-gradient(circle 140px at ${searchHover.x}px ${searchHover.y}px, ${isDark ? "rgba(255,255,255,0.18)" : "rgba(200,200,200,0.25)"}, ${isDark ? "rgba(255,255,255,0.04)" : "rgba(240,240,240,0.08)"})`
                : isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"
              : isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
            cursor: "text",
            height: 36,
            minWidth: 200,
            transition: "border-color 0.15s ease",
            "--search-placeholder-hover": isDark ? "#bbb" : "#444",
          } as React.CSSProperties}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            style={{ stroke: (searchHover || searchFocused || searchHasValue) ? (isDark ? "#ccc" : "#555") : (isDark ? "#666" : "#999"), transition: "stroke 0.15s ease", flexShrink: 0 }}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            data-nav-search-text
            type="text"
            placeholder="Search documentation..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onInput={(e) => setSearchHasValue((e.target as HTMLInputElement).value.length > 0)}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 13,
              color: isDark ? "#fff" : "#0d0d0d",
              fontFamily: "sans-serif",
              flex: 1,
              minWidth: 0,
              caretColor: isDark ? "#fff" : "#000",
            }}
          />
          <span
            data-nav-search-badge
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              fontSize: 11,
              fontFamily: "sans-serif",
              color: (searchHover || searchFocused || searchHasValue) ? (isDark ? "#eee" : "#222") : (isDark ? "#555" : "#aaa"),
              border: `1px solid ${isDark ? ((searchHover || searchFocused || searchHasValue) ? "#666" : "#333") : ((searchHover || searchFocused || searchHasValue) ? "#999" : "#d4d4d4")}`,
              background: (searchHover || searchFocused || searchHasValue) ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)") : "transparent",
              boxShadow: (searchHover || searchFocused || searchHasValue)
                ? isDark
                  ? "0 0 10px rgba(255,255,255,0.15), inset 0 0 6px rgba(255,255,255,0.05)"
                  : "0 0 10px rgba(0,0,0,0.1), inset 0 0 6px rgba(0,0,0,0.03)"
                : "none",
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
          style={{
            background: isDark ? "#fff" : "#111",
            color: isDark ? "#000" : "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "sans-serif",
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
      </div>
    </nav>
    <div
      style={{
        position: "fixed",
        top: 51,
        left: 48,
        right: 48,
        height: 1,
        zIndex: 100,
        pointerEvents: "none",
        backgroundImage: `radial-gradient(circle, ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"} 1.2px, transparent 1.2px)`,
        backgroundSize: "6px 1px",
        backgroundRepeat: "repeat-x",
      }}
    />
    </>
  );
}