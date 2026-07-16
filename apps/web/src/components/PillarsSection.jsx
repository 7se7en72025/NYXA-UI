import { useSectionVisibility } from "@hooks/useSectionVisibility";
import * as s from "@styles/Pillars.module.scss";
import HudEmblem from "./HudEmblem";
import PillarCluster from "./PillarCluster";
import ScrambleText from "./ScrambleText";

// Each pillar sits at a fixed point (percent of the constellation box). The
// SAME coordinates drive the card position AND the spoke line endpoint, so the
// hub-and-spoke wiring always stays perfectly aligned at any size.
const CARDS = [
  {
    x: 15,
    y: 22,
    icon: "◉",
    title: "ACCESSIBLE BY DEFAULT",
    desc: "Keyboard-first, screen-reader tested primitives out of the box.",
  },
  {
    x: 85,
    y: 22,
    icon: "◇",
    title: "FULLY THEMEABLE",
    desc: "Every surface is a token — restyle the whole system in minutes.",
  },
  {
    x: 15,
    y: 78,
    icon: "△",
    title: "BUILT FOR PERFORMANCE",
    desc: "Zero-bloat components tree-shaken down to what you actually ship.",
  },
  {
    x: 85,
    y: 78,
    icon: "◈",
    title: "TYPE-SAFE CORE",
    desc: "First-class TypeScript definitions for every prop, every variant.",
  },
];

export default function PillarsSection() {
  const show = useSectionVisibility(3);

  return (
    <div className={`${s.wrapper} ${show ? s.visible : ""}`}>
      <div className={s.header}>
        <span className={s.eyebrow}>
          <span className={s.pip} />
          <ScrambleText as="span" text="WHY NYXA" />
        </span>
        <h2 className={s.title}>
          <ScrambleText as="span" text="FOUR PILLARS, ONE SYSTEM" />
        </h2>
      </div>

      <div className={s.constellation}>
        {/* spoke wiring — hub at center out to each pillar */}
        <svg
          className={s.wires}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {CARDS.map((c) => (
            <line
              key={c.title}
              className={s.wire}
              x1="50"
              y1="50"
              x2={c.x}
              y2={c.y}
            />
          ))}
          {CARDS.map((c) => (
            <circle
              key={c.title}
              className={s.wireNode}
              cx={c.x}
              cy={c.y}
              r="0.9"
            />
          ))}
        </svg>

        <div className={s.core}>
          {show && (
            <HudEmblem tags={{ tl: "CORE", tr: "v1.0" }}>
              <PillarCluster />
            </HudEmblem>
          )}
        </div>

        {CARDS.map((c, i) => (
          <div
            className={s.card}
            key={c.title}
            style={{ "--cx": `${c.x}%`, "--cy": `${c.y}%`, "--i": i }}
          >
            <span className={s.icon}>{c.icon}</span>
            <span className={s.cardTitle}>{c.title}</span>
            <span className={s.cardDesc}>{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
