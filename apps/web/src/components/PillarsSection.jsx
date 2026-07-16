import { useSectionVisibility } from "@hooks/useSectionVisibility";
import * as s from "@styles/Pillars.module.scss";
import ScrambleText from "./ScrambleText";

const CARDS = [
  {
    icon: "◉",
    title: "ACCESSIBLE BY DEFAULT",
    desc: "Keyboard-first, screen-reader tested primitives out of the box.",
  },
  {
    icon: "◇",
    title: "FULLY THEMEABLE",
    desc: "Every surface is a token — restyle the whole system in minutes.",
  },
  {
    icon: "△",
    title: "BUILT FOR PERFORMANCE",
    desc: "Zero-bloat components tree-shaken down to what you actually ship.",
  },
  {
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
        <span className={s.eyebrow}>WHY NYXA</span>
        <h2 className={s.title}>
          <ScrambleText as="span" text="FOUR PILLARS, ONE SYSTEM" />
        </h2>
      </div>

      <div className={s.cards}>
        {CARDS.map((c) => (
          <div className={s.card} key={c.title}>
            <span className={s.icon}>{c.icon}</span>
            <span className={s.cardTitle}>{c.title}</span>
            <span className={s.cardDesc}>{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
