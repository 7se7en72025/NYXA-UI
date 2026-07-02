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
  text = "Falak",
  as: Tag = "span",
  color = "#FFD700",
  size = "4rem",
  weight = 900,
  className,
  style,
}: GlitchTextProps) {
  const id = useMemo(uid, []);

  const css = `
@keyframes ${id} {
  0%, 100% {
    transform: translate(0) skewX(0deg);
    text-shadow: none;
  }
  2% {
    transform: translate(-3px, 0) skewX(-2deg);
    text-shadow: 3px 0 ${color};
  }
  4% {
    transform: translate(3px, 0) skewX(1deg);
    text-shadow: -2px 0 ${color};
  }
  5% {
    transform: translate(0) skewX(0deg);
    text-shadow: none;
  }
  41% {
    transform: translate(0) skewX(0deg);
    text-shadow: none;
  }
  42% {
    transform: translate(4px, 0) skewX(3deg);
    text-shadow: -3px 0 ${color};
  }
  43% {
    transform: translate(-2px, 0) skewX(-1deg);
    text-shadow: 2px 0 ${color};
  }
  44% {
    transform: translate(0) skewX(0deg);
    text-shadow: none;
  }
  77% {
    transform: translate(0) skewX(0deg);
    text-shadow: none;
  }
  78% {
    transform: translate(-4px, 0) skewX(-3deg);
    text-shadow: 3px 0 ${color};
  }
  79% {
    transform: translate(2px, 0) skewX(1deg);
    text-shadow: -2px 0 ${color};
  }
  80% {
    transform: translate(0) skewX(0deg);
    text-shadow: none;
  }
}

.${id} {
  display: inline-block;
  font-family: 'Doctor Glitch', cursive;
  font-size: ${size};
  font-weight: ${weight};
  color: ${color};
  letter-spacing: 0.04em;
  line-height: 1.1;
  text-transform: uppercase;
  white-space: nowrap;
  animation: ${id} 3s infinite steps(1);
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .${id} {
    animation: none;
  }
}
`;

  return (
    <>
      <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/doctor-glitch" />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Tag className={`${id} ${className ?? ""}`} style={style}>
        {text}
      </Tag>
    </>
  );
}
