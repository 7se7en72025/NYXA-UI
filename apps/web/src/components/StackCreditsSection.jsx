import { useSectionVisibility } from "@hooks/useSectionVisibility";
import * as s from "@styles/StackCredits.module.scss";
import ScrambleText from "./ScrambleText";

const BADGES = ["REACT", "THREE.JS", "GSAP", "VITE", "VALTIO", "BIOME"];

const METRICS = [
  { num: "60fps", label: "SMOOTH BY DEFAULT" },
  { num: "<10kb", label: "PER COMPONENT" },
  { num: "A11Y", label: "AA CONTRAST" },
];

export default function StackCreditsSection() {
  const show = useSectionVisibility(4);

  return (
    <div className={`${s.wrapper} ${show ? s.visible : ""}`}>
      <div className={s.header}>
        <span className={s.eyebrow}>POWERED BY</span>
        <h2 className={s.title}>
          <ScrambleText as="span" text="STANDING ON GIANTS" />
        </h2>
      </div>

      <div className={s.orbit}>
        {BADGES.map((b) => (
          <span className={s.badge} key={b}>
            {b}
          </span>
        ))}
      </div>

      <div className={s.metrics}>
        {METRICS.map((m) => (
          <div className={s.metric} key={m.label}>
            <span className={s.metricNum}>{m.num}</span>
            <span className={s.metricLabel}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
