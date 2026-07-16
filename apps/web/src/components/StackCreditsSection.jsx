import { useSectionVisibility } from "@hooks/useSectionVisibility";
import * as s from "@styles/StackCredits.module.scss";
import GiantPlanet from "./GiantPlanet";
import ScrambleText from "./ScrambleText";

// the tech stack itself is already shown on nav2's hub (Design / Frontend /
// 3D Engine / Animation) — this section covers what that hub doesn't: the
// open-source traits of the library itself.
const FEATURES = [
  "MIT LICENSED",
  "TREE-SHAKEABLE",
  "SSR READY",
  "ZERO CONFIG",
  "FULLY TYPED",
  "NO LOCK-IN",
];

// a flattened Saturn-style ring (the .orbit box itself is wide & short — see
// the stylesheet), not a full orbit around every side — this is the one
// deliberate structural break from nav4's radial hub-and-spoke layout, so the
// two "things arranged around a center" sections don't read as the same idea
// twice. Pills — and the ring line itself — on the far arc tuck behind the
// planet; the near arc passes in front of it.
const RX = 47;
const RY = 40;
const ORBIT = FEATURES.map((label, i) => {
  const a = (i / FEATURES.length) * Math.PI * 2;
  const x = 50 + RX * Math.cos(a);
  const y = 50 + RY * Math.sin(a);
  return { label, x, y, back: Math.sin(a) < 0 };
});

// far (upper) and near (lower) semi-ellipse arcs, split so each can render on
// its own side of the planet's z-index
const RING_BACK_D = `M ${50 - RX},50 A ${RX},${RY} 0 0 1 ${50 + RX},50`;
const RING_FRONT_D = `M ${50 + RX},50 A ${RX},${RY} 0 0 1 ${50 - RX},50`;

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
        <span className={s.eyebrow}>
          <span className={s.pip} />
          <ScrambleText as="span" text="OPEN SOURCE" />
        </span>
        <h2 className={s.title}>
          <ScrambleText as="span" text="BUILT IN THE OPEN" />
        </h2>
      </div>

      <div className={s.orbit}>
        {/* far side — ring arc + pills tucked behind the planet */}
        <svg
          className={`${s.ring} ${s.ringBack}`}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className={s.ringPath} d={RING_BACK_D} />
        </svg>
        <div className={s.badgesBack}>
          {ORBIT.filter((b) => b.back).map((b, i) => (
            <span
              className={`${s.badge} ${s.badgeBack}`}
              key={b.label}
              style={{ "--bx": `${b.x}%`, "--by": `${b.y}%`, "--i": i }}
            >
              {b.label}
            </span>
          ))}
        </div>

        <div className={s.planet}>{show && <GiantPlanet />}</div>

        {/* near side — ring arc + pills passing in front of the planet */}
        <svg
          className={`${s.ring} ${s.ringFront}`}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className={s.ringPath} d={RING_FRONT_D} />
        </svg>
        <div className={s.badges}>
          {ORBIT.filter((b) => !b.back).map((b, i) => (
            <span
              className={s.badge}
              key={b.label}
              style={{ "--bx": `${b.x}%`, "--by": `${b.y}%`, "--i": i }}
            >
              {b.label}
            </span>
          ))}
        </div>
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
