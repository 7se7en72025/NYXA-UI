"use client";

import React, { useMemo } from "react";

interface GlitchTextProps {
  text?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  color?: string;
  size?: string;
  weight?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

let _id = 0;
const uid = () => `glt-${++_id}`;

export function GlitchText({
  text = "KATA UI",
  as: Tag = "span",
  color = "#FFD700",
  size = "4rem",
  weight = 900,
  className,
  style,
}: GlitchTextProps) {
  const id = useMemo(uid, []);

  const css = `
@import url('https://fonts.cdnfonts.com/css/doctor-glitch');

/* Glitch slice keyframes — each step clips a thin horizontal band and shifts it */
@keyframes ${id}-a {
  0%   { clip-path: inset(0); transform: translate(0); }
  3%   { clip-path: inset(12% 0 70% 0); transform: translate(-5px, 0); }
  5%   { clip-path: inset(55% 0 15% 0); transform: translate(4px, 0); }
  7%   { clip-path: inset(0); transform: translate(0); }
  40%  { clip-path: inset(0); transform: translate(0); }
  42%  { clip-path: inset(75% 0 5% 0); transform: translate(6px, 0); }
  44%  { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 0); }
  46%  { clip-path: inset(0); transform: translate(0); }
  76%  { clip-path: inset(0); transform: translate(0); }
  78%  { clip-path: inset(35% 0 40% 0); transform: translate(-6px, 0); }
  80%  { clip-path: inset(65% 0 10% 0); transform: translate(5px, 0); }
  82%  { clip-path: inset(0); transform: translate(0); }
  100% { clip-path: inset(0); transform: translate(0); }
}

@keyframes ${id}-b {
  0%   { clip-path: inset(0); transform: translate(0); }
  4%   { clip-path: inset(65% 0 10% 0); transform: translate(5px, 0); }
  6%   { clip-path: inset(15% 0 65% 0); transform: translate(-4px, 0); }
  8%   { clip-path: inset(0); transform: translate(0); }
  41%  { clip-path: inset(0); transform: translate(0); }
  43%  { clip-path: inset(30% 0 45% 0); transform: translate(-5px, 0); }
  45%  { clip-path: inset(80% 0 0% 0); transform: translate(4px, 0); }
  47%  { clip-path: inset(0); transform: translate(0); }
  77%  { clip-path: inset(0); transform: translate(0); }
  79%  { clip-path: inset(10% 0 70% 0); transform: translate(5px, 0); }
  81%  { clip-path: inset(50% 0 25% 0); transform: translate(-6px, 0); }
  83%  { clip-path: inset(0); transform: translate(0); }
  100% { clip-path: inset(0); transform: translate(0); }
}

/* Base text */
.${id} {
  position: relative;
  display: inline-block;
  font-family: 'Doctor Glitch', cursive;
  font-size: ${size};
  font-weight: ${weight};
  color: ${color};
  letter-spacing: 0.04em;
  line-height: 1.1;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Glitch layers — slightly brighter with glow to stand out from base */
.${id}::before,
.${id}::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: 'Doctor Glitch', cursive;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  text-transform: inherit;
  white-space: nowrap;
  pointer-events: none;
  color: ${color};
  mix-blend-mode: screen;
  opacity: 0.8;
}

.${id}::before {
  text-shadow: 2px 0 ${color};
  animation: ${id}-a 4s infinite steps(1);
  z-index: 1;
}

.${id}::after {
  text-shadow: -2px 0 ${color};
  animation: ${id}-b 4s infinite steps(1);
  animation-delay: 0.1s;
  z-index: 2;
}

@media (prefers-reduced-motion: reduce) {
  .${id}::before,
  .${id}::after {
    animation: none;
    clip-path: none;
    transform: none;
  }
}
`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Tag
        className={`${id} ${className ?? ""}`}
        data-text={text}
        style={style}
      >
        {text}
      </Tag>
    </>
  );
}
