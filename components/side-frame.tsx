"use client";

import { useEffect, useRef, useCallback, memo } from "react";

const TICK = 50;
const VB_W = 48;

function getThemeColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    bg: style.getPropertyValue("--ruler-bg").trim() || "#0d0d0d",
    border: style.getPropertyValue("--ruler-border").trim() || "#252525",
    tick: style.getPropertyValue("--ruler-tick").trim() || "#2a2a2a",
    text: style.getPropertyValue("--ruler-text").trim() || "#3a3a3a",
    activeTick: style.getPropertyValue("--ruler-active-tick").trim() || "#555555",
    activeText: style.getPropertyValue("--ruler-active-text").trim() || "#aaaaaa",
  };
}

const Ruler = memo(function Ruler({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseY = useRef(-1);
  const rafId = useRef(0);

  const render = useCallback(() => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    const colors = getThemeColors();
    const h = window.innerHeight;
    const scrollY = window.scrollY;
    const centerScreen = mouseY.current >= 0 ? mouseY.current : h / 2;
    const centerVirtual = scrollY + centerScreen;
    const centerVal = Math.round(centerVirtual / TICK) * TICK;
    const totalTicks = Math.ceil(h / TICK) + 2;

    container.style.background = colors.bg;
    container.style.borderRightColor = colors.border;
    container.style.borderLeftColor = colors.border;

    const tickX1 = isLeft ? 48 : 0;
    const tickX2 = isLeft ? 38 : 10;
    const labelX = isLeft ? 26 : 22;

    let svgContent = `<line x1="${tickX1}" y1="0" x2="${tickX1}" y2="${h}" stroke="${colors.border}" stroke-width="1"/>`;

    for (let i = -totalTicks; i <= totalTicks; i++) {
      const val = centerVal + i * TICK;
      if (val < 50) continue;
      const y = val - scrollY;
      const isActive = val === centerVal;

      svgContent += `<line x1="${tickX1}" y1="${y}" x2="${tickX2}" y2="${y}" stroke="${isActive ? colors.activeTick : colors.tick}" stroke-width="${isActive ? 1.5 : 0.8}"/>`;
      svgContent += `<text x="${labelX}" y="${y}" text-anchor="middle" dominant-baseline="central" fill="${isActive ? colors.activeText : colors.text}" font-family="monospace" font-size="${isActive ? 14 : 11}" opacity="${isActive ? 0.9 : 0.5}" transform="rotate(-90 ${labelX} ${y})">${val}</text>`;
    }

    svg.setAttribute("viewBox", `0 0 ${VB_W} ${h}`);
    svg.innerHTML = svgContent;
  }, [isLeft]);

  const scheduleRender = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(render);
  }, [render]);

  useEffect(() => {
    render();

    const observer = new MutationObserver(scheduleRender);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const onMouseMove = (e: MouseEvent) => {
      mouseY.current = e.clientY;
      scheduleRender();
    };

    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", scheduleRender);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", scheduleRender);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [render, scheduleRender]);

  return (
    <div
      ref={containerRef}
      className="side-frame"
      style={{
        position: "fixed",
        top: 0,
        height: "100vh",
        width: 48,
        zIndex: 50,
        overflow: "hidden",
        background: "#0d0d0d",
        transition: "none",
        ...(isLeft
          ? { left: 0, borderRight: "1px solid #252525" }
          : { right: 0, borderLeft: "1px solid #252525" }),
      }}
    >
      <svg
        ref={svgRef}
        style={{ position: "absolute", inset: 0, width: 48, height: "100vh" }}
      />
      <div
        style={{ position: "absolute", inset: 0, pointerEvents: "auto" }}
        onMouseMove={(e) => {
          mouseY.current = e.clientY;
          scheduleRender();
        }}
        onMouseLeave={() => {
          mouseY.current = -1;
          scheduleRender();
        }}
      />
    </div>
  );
});

export function SideFrame() {
  return (
    <>
      <Ruler side="left" />
      <Ruler side="right" />
    </>
  );
}
