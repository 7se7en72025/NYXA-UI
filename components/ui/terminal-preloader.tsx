"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

/* ─── Types ─── */

interface TerminalLine {
  text: string;
  color?: string;
  type?: "text" | "cursor";
}

interface SettingsLine {
  key: string;
  options: string[];
  activeIndex: number;
}

interface TerminalPreloaderProps {
  duration?: number;
  onComplete?: () => void;
  contained?: boolean;
  terminalLines?: TerminalLine[];
  eventsLines?: string[];
  settingsLines?: SettingsLine[];
  whoamiLines?: string[];
  accentColor?: string;
  bgColor?: string;
  skipable?: boolean;
  className?: string;
}

/* ─── Defaults ─── */

const D_TERMINAL: TerminalLine[] = [
  { text: "KATA-UI --RUN", type: "text" },
  { text: "AN INTERACTIVE UI LIBRARY BY 777", color: "#e03a5b", type: "text" },
  { text: ">> INITIATING BOOT SEQUENCE...", color: "#05dd8b", type: "text" },
  { text: "BUILD VERSION: 0.1.0", type: "text" },
  { text: "SYSTEM: KATA UI", type: "text" },
  { text: "STACK: NEXT.JS + TAILWIND CSS", type: "text" },
  { text: "REGISTRY: SHADCN COMPATIBLE", type: "text" },
  { text: "LICENSE: MIT OPEN SOURCE 2026", type: "text" },
  { text: ">> LOADING COMPONENTS...", color: "#05dd8b", type: "cursor" },
];

const D_EVENTS = [
  ">> [11.04%] Domain Button",
  ">> [12.73%] Reiatsu Card",
  ">> [20.31%] Chakra Input",
  ">> [27.00%] Sharingan Lens",
  ">> [53.00%] Shrine Cards",
  ">> [99.00%] Liquid Metal",
];

const D_SETTINGS: SettingsLine[] = [
  { key: "MODE", options: ["DARK", "LIGHT"], activeIndex: 0 },
  { key: "THEME", options: ["MINIMAL", "ANIME", "CYBER"], activeIndex: 2 },
  { key: "STACK", options: ["NEXT.JS", "VITE", "REMIX"], activeIndex: 0 },
  { key: "LANG", options: ["TYPESCRIPT", "JAVASCRIPT"], activeIndex: 0 },
];

const D_WHOAMI = [
  ">> [CAPTAIN]    Monkey D. Luffy",
  ">> [DESIGN]     Roronoa Zoro",
  ">> [FRONTEND]   Sanji",
  ">> [BACKEND]    Nico Robin",
  ">> [DEVOPS]     Franky",
  ">> [MISSION]    Form follows force.",
];

/* ─── Constants ─── */

const FONT = "var(--font-mono), monospace";
const SPEED_SLOW = 35;
const SPEED_FAST = 18;
const LINE_GAP = 200;
const PANEL_GAP = 250;
const EXIT_MS = 1600;
const CYCLE_MS = 5000;

/* ─── State ─── */

interface AnimState {
  typed: Record<number, string>;
  cursorLine: number;
  cursorOn: boolean;
  checker: boolean;
  ev: number;
  st: number;
  wh: number;
  launch: boolean;
  phase: "boot" | "exit" | "done";
}

const INIT: AnimState = {
  typed: {},
  cursorLine: -1,
  cursorOn: true,
  checker: false,
  ev: 0,
  st: 0,
  wh: 0,
  launch: false,
  phase: "boot",
};

/* ─── Sub-components (pure — no internal state) ─── */

function Hdr({ label, c }: { label: string; c: string }) {
  return (
    <div style={{ padding: "6px 12px", background: c, fontSize: 12, color: "#000", fontFamily: FONT, fontWeight: 700, flexShrink: 0, letterSpacing: 0.5 }}>
      {label}
    </div>
  );
}

function ELine({ line, vis, accent }: { line: string; vis: boolean; accent: string }) {
  const m = line.match(/^(>> )\[(.+?)\]\s+(.+)$/);
  if (!m) return null;
  return (
    <div style={{ fontSize: 11, lineHeight: 1.9, fontFamily: FONT, color: "#fff", opacity: vis ? 1 : 0, transition: "opacity 0.25s ease" }}>
      <span style={{ color: accent, textShadow: `0 0 4px ${accent}` }}>{m[1]}</span>
      <span>[{m[2]}]</span>
      <span>{` ${m[3]}`}</span>
    </div>
  );
}

function SRow({ line, vis, accent }: { line: SettingsLine; vis: boolean; accent: string }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2px 0", fontSize: 11, lineHeight: 2.2, fontFamily: FONT, color: "#fff", opacity: vis ? 1 : 0, transition: "opacity 0.25s ease" }}>
      <span style={{ marginRight: 4 }}>{line.key}:</span>
      {line.options.map((o, i) => {
        const active = i === line.activeIndex;
        return (
          <span key={o} style={{ background: active ? `${accent}30` : "transparent", color: active ? accent : "#fff", padding: "1px 6px", fontSize: 11, fontFamily: FONT, border: `1px solid ${active ? accent : "#444"}`, marginRight: 4 }}>
            [{o}]
          </span>
        );
      })}
    </div>
  );
}

function PanelBox({ border, shadow, label, accent, children }: {
  border: string; shadow: string; label: string; accent: string; children: React.ReactNode;
}) {
  return (
    <div style={{ flex: 1, border, borderRadius: 1, boxShadow: shadow, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Hdr label={label} c={accent} />
      <div className="tp" style={{ flex: 1, padding: "6px 10px", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Main ─── */

export function TerminalPreloader({
  duration = CYCLE_MS,
  onComplete,
  contained = false,
  terminalLines = D_TERMINAL,
  eventsLines = D_EVENTS,
  settingsLines = D_SETTINGS,
  whoamiLines = D_WHOAMI,
  accentColor = "#4df4fc",
  bgColor = "#0d0221",
  skipable = true,
  className,
}: TerminalPreloaderProps) {
  const [s, setS] = useState<AnimState>(INIT);
  const raf = useRef(0);
  const t0 = useRef(0);
  const abort = useRef(false);
  const ocRef = useRef(onComplete);
  ocRef.current = onComplete;
  const durRef = useRef(duration);
  durRef.current = duration;
  const cursorRef = useRef(true);
  const prevTypedRef = useRef<Record<number, string>>({});
  const prevNumsRef = useRef({ ev: 0, st: 0, wh: 0 });

  /* ─── Effects ─── */

  useEffect(() => {
    const id = setInterval(() => { cursorRef.current = !cursorRef.current; }, 530);
    return () => clearInterval(id);
  }, []);

  /* ─── Timeline ─── */

  const tl = useMemo(() => {
    let t = 300;
    const e: { i: number; s: number; d: number }[] = [];
    terminalLines.forEach((l, idx) => {
      const sp = e.length < 3 ? SPEED_SLOW : SPEED_FAST;
      const dur = l.text.length * sp;
      e.push({ i: idx, s: t, d: dur });
      t += dur + LINE_GAP;
    });
    return {
      entries: e,
      chk: t - 600,
      evS: 400,
      stS: 400 + eventsLines.length * PANEL_GAP + 200,
      whS: 400 + eventsLines.length * PANEL_GAP + 200 + settingsLines.length * PANEL_GAP + 200,
      launch: t + 100,
    };
  }, [terminalLines, eventsLines.length, settingsLines.length]);

  /* ─── Exit ─── */

  const doExit = useCallback(() => {
    if (abort.current) return;
    abort.current = true;
    cancelAnimationFrame(raf.current);
    setS((p) => ({ ...p, phase: "exit" }));
    setTimeout(() => ocRef.current?.(), EXIT_MS);
  }, []);

  /* ─── Tick ─── */

  const tickR = useRef<(now: number) => void>(() => {});
  tickR.current = (now: number) => {
    if (abort.current) return;
    const el = now - t0.current;
    const { entries, chk, evS, stS, whS, launch } = tl;

    /* compute typed text */
    const nt: Record<number, string> = {};
    let cl = -1;
    for (const e of entries) {
      if (el < e.s) break;
      const p = Math.min((el - e.s) / e.d, 1);
      const cc = Math.floor(p * terminalLines[e.i].text.length);
      nt[e.i] = terminalLines[e.i].text.slice(0, cc);
      if (p < 1) cl = e.i;
    }

    /* compute panel counts */
    const nev = Math.min(eventsLines.length, Math.max(0, Math.floor((el - evS) / PANEL_GAP)));
    const nst = Math.min(settingsLines.length, Math.max(0, Math.floor((el - stS) / PANEL_GAP)));
    const nwh = Math.min(whoamiLines.length, Math.max(0, Math.floor((el - whS) / PANEL_GAP)));
    const nCheck = el >= chk;
    const nLaunch = el >= launch;
    const cOn = cursorRef.current;

    /* fast exit: skip re-render if only cursor blink changed and nothing else */
    const typedChanged = Object.keys(nt).length !== Object.keys(prevTypedRef.current).length ||
      Object.keys(nt).some((k) => nt[+k] !== prevTypedRef.current[+k]);

    if (!typedChanged && cl === s.cursorLine && nCheck === s.checker && nLaunch === s.launch && nev === prevNumsRef.current.ev && nst === prevNumsRef.current.st && nwh === prevNumsRef.current.wh) {
      /* only cursor blink changed — force minimal update */
      setS((p) => ({ ...p, cursorOn: cOn }));
    } else {
      prevTypedRef.current = nt;
      prevNumsRef.current = { ev: nev, st: nst, wh: nwh };
      setS((p) => ({
        ...p,
        typed: nt,
        cursorLine: cl,
        cursorOn: cOn,
        checker: nCheck,
        ev: nev,
        st: nst,
        wh: nwh,
        launch: nLaunch,
      }));
    }

    if (el >= durRef.current) { doExit(); return; }
    raf.current = requestAnimationFrame((t) => tickR.current(t));
  };

  useEffect(() => {
    if (s.phase !== "boot") return;
    abort.current = false;
    t0.current = performance.now();
    raf.current = requestAnimationFrame((t) => tickR.current(t));
    return () => { abort.current = true; cancelAnimationFrame(raf.current); };
  }, [s.phase]);

  useEffect(() => {
    if (!skipable || s.phase !== "boot") return;
    const h = (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape" && e.key !== " ") return;
      doExit();
    };
    window.addEventListener("keydown", h);
    window.addEventListener("click", h);
    return () => { window.removeEventListener("keydown", h); window.removeEventListener("click", h); };
  }, [skipable, s.phase, doExit]);

  if (s.phase === "done") return null;

  const out = s.phase === "exit";
  const fs = "13px";
  const bdr = `2px solid ${accentColor}`;
  const shd = `0 0 8px ${accentColor}40`;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={className}
      style={{
        position: contained ? "absolute" : "fixed",
        inset: 0,
        zIndex: contained ? 1 : 9999,
        background: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        opacity: out ? 0 : 1,
        transition: "opacity 0.8s ease",
        pointerEvents: out ? "none" : "auto",
        fontFamily: FONT,
        backdropFilter: contained ? "none" : "blur(30px)",
        overflow: "hidden",
      }}
    >
      <style>{`.tp::-webkit-scrollbar{display:none}.tp{scrollbar-width:none}`}</style>

      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: 8,
          justifyContent: "center",
          width: contained ? "100%" : "min(900px, 90vw)",
          height: contained ? "100%" : "min(580px, 88vh)",
        }}
      >
        {/* ── LEFT: TERMINAL ── */}
        <div style={{ flex: 1, border: bdr, borderRadius: 1, boxShadow: shd, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Hdr label=">TERMINAL" c={accentColor} />
          <div className="tp" style={{ flex: 1, padding: "10px 14px", overflowY: "auto" }}>
            {terminalLines.map((line, i) => {
              const txt = s.typed[i] ?? "";
              const typing = i === s.cursorLine;
              if (!txt && !typing) return null;
              const g = line.color === "#05dd8b";
              const r = line.color === "#e03a5b";
              return (
                <React.Fragment key={i}>
                  <div
                    style={{
                      color: line.color ?? "#fff",
                      fontSize: fs,
                      fontFamily: FONT,
                      minHeight: "1.5em",
                      whiteSpace: "nowrap",
                      paddingLeft: 4,
                      marginTop: g ? 10 : 0,
                      marginBottom: g ? 4 : 0,
                      textShadow: g ? `0 0 6px ${line.color}` : r ? `0 0 10px ${line.color}` : "none",
                    }}
                  >
                    {txt}
                    {typing && s.cursorOn && <span style={{ color: accentColor, textShadow: `0 0 6px ${accentColor}` }}>&#9608;</span>}
                    {!typing && line.type === "cursor" && txt.length >= line.text.length && (
                      <span style={{ color: accentColor, textShadow: `0 0 6px ${accentColor}` }}>{s.cursorOn ? "\u2588" : "\u00A0"}</span>
                    )}
                  </div>
                  {r && (
                    <div style={{ display: "flex", gap: 0, paddingLeft: 4, marginTop: 2, marginBottom: 6, opacity: s.checker ? 1 : 0, transition: "opacity 0.3s" }}>
                      {Array.from({ length: 30 }, (_, j) => (
                        <svg key={j} width={11} height={11} viewBox="0 0 100 100" fill="none">
                          <rect width="50" height="50" fill="#e03a5b" />
                          <rect x="50" y="50" width="50" height="50" fill="#e03a5b" />
                        </svg>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div
            style={{
              width: "94%", height: 28, marginBottom: 8,
              borderTopLeftRadius: 4, borderBottomRightRadius: 4,
              backgroundColor: "#fd308e",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontFamily: FONT, color: "#000", fontWeight: 700,
              cursor: "pointer",
              transition: "opacity 0.2s, transform 0.2s",
              opacity: s.launch ? 1 : 0,
              transform: s.launch ? "scale(1)" : "scale(0.95)",
              pointerEvents: s.launch ? "auto" : "none",
              flexShrink: 0, letterSpacing: 1, alignSelf: "center",
            }}
            onClick={doExit}
          >
            {">> LAUNCH <<"}
          </div>
        </div>

        {/* ── RIGHT: PANELS ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <PanelBox border={bdr} shadow={shd} label="#EVENTS" accent={accentColor}>
            {eventsLines.map((l, i) => <ELine key={i} line={l} vis={i < s.ev} accent={accentColor} />)}
          </PanelBox>
          <PanelBox border={bdr} shadow={shd} label="#SETTINGS" accent={accentColor}>
            {settingsLines.map((l, i) => <SRow key={i} line={l} vis={i < s.st} accent={accentColor} />)}
          </PanelBox>
          <PanelBox border={bdr} shadow={shd} label="#WHOAMI" accent={accentColor}>
            {whoamiLines.map((l, i) => <ELine key={i} line={l} vis={i < s.wh} accent={accentColor} />)}
          </PanelBox>
        </div>
      </div>

      {skipable && !out && (
        <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: `${accentColor}30`, letterSpacing: 3, fontFamily: FONT, pointerEvents: "none" }}>
          PRESS ESC OR CLICK TO SKIP
        </div>
      )}
    </div>
  );
}
