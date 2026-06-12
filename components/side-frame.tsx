"use client";

import { useEffect, useRef, useCallback } from "react";

const TICK = 50;
const VB_W = 48;

function Ruler({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  const svgRef = useRef<SVGSVGElement>(null);
  const mouseY = useRef(-1);

  const render = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const h = window.innerHeight;
    const scrollY = window.scrollY;
    const centerScreen = mouseY.current >= 0 ? mouseY.current : h / 2;
    const centerVirtual = scrollY + centerScreen;
    const centerVal = Math.round(centerVirtual / TICK) * TICK;
    const totalTicks = Math.ceil(h / TICK) + 2;

    const lines: string[] = [];
    const texts: string[] = [];

    for (let i = -totalTicks; i <= totalTicks; i++) {
      const val = centerVal + i * TICK;
      if (val < 50) continue;
      const y = val - scrollY;
      const isActive = val === centerVal;

      const tickX1 = isLeft ? 48 : 0;
      const tickX2 = isLeft ? 38 : 10;

      lines.push(
        `<line x1="${tickX1}" y1="${y}" x2="${tickX2}" y2="${y}" stroke="${isActive ? "#777" : "#333"}" stroke-width="${isActive ? 1.5 : 0.8}"/>`
      );

      const labelX = isLeft ? 22 : 26;
      texts.push(
        `<text x="${labelX}" y="${y}" text-anchor="middle" dominant-baseline="central" fill="${isActive ? "#999" : "#444"}" font-family="monospace" font-size="${isActive ? 14 : 11}" opacity="${isActive ? 0.9 : 0.5}" transform="rotate(-90 ${labelX} ${y})">${val}</text>`
      );
    }

    svg.setAttribute("viewBox", `0 0 ${VB_W} ${h}`);
    svg.innerHTML = `
      <style>line, text { transition: all 0.15s ease-out; }</style>
      <line x1="${isLeft ? 48 : 0}" y1="0" x2="${isLeft ? 48 : 0}" y2="${h}" stroke="#333" stroke-width="1"/>
      ${lines.join("")}
      ${texts.join("")}
    `;
  }, [isLeft]);

  useEffect(() => {
    render();

    function onMouseMove(e: MouseEvent) {
      mouseY.current = e.clientY;
      render();
    }

    window.addEventListener("scroll", render, { passive: true });
    window.addEventListener("resize", render);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("scroll", render);
      window.removeEventListener("resize", render);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [render]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        height: "100vh",
        width: 48,
        zIndex: 50,
        overflow: "hidden",
        background: "#0d0d0d",
        ...(isLeft
          ? { left: 0, borderRight: "1px solid #333" }
          : { right: 0, borderLeft: "1px solid #333" }),
      }}
    >
      <svg
        ref={svgRef}
        style={{ position: "absolute", inset: 0, width: 48, height: "100vh" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "auto",
        }}
        onMouseMove={(e) => {
          mouseY.current = e.clientY;
          render();
        }}
        onMouseLeave={() => {
          mouseY.current = -1;
          render();
        }}
      />
    </div>
  );
}

export function SideFrame() {
  return (
    <>
      <Ruler side="left" />
      <Ruler side="right" />
    </>
  );
}
