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

      {/* the console panel — a solid glass "holder" so the readout stays
          legible over the nebula instead of floating loose on it */}
      <div className={s.console}>
        <span className={s.cornerTL} />
        <span className={s.cornerTR} />
        <span className={s.cornerBL} />
        <span className={s.cornerBR} />

        <div className={s.consoleBar}>
          <span className={s.barLabel}>
            <span className={s.pip} />
            <ScrambleText as="span" text="OSS://MANIFEST" />
          </span>
          <span className={s.barStatus}>
            <ScrambleText as="span" text="VERIFIED" />
          </span>
        </div>

        <div className={s.consoleBody}>
          <div className={s.viewport}>
            <div className={s.planet}>{show && <GiantPlanet />}</div>
            <svg
              className={s.reticle}
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden="true"
            >
              <circle className={s.reticleRing} cx="50" cy="50" r="46" />
              <line className={s.reticleTick} x1="50" y1="1" x2="50" y2="7" />
              <line className={s.reticleTick} x1="50" y1="93" x2="50" y2="99" />
              <line className={s.reticleTick} x1="1" y1="50" x2="7" y2="50" />
              <line className={s.reticleTick} x1="93" y1="50" x2="99" y2="50" />
            </svg>
          </div>

          <ul className={s.features}>
            {FEATURES.map((f, i) => (
              <li className={s.feature} key={f} style={{ "--i": i }}>
                <svg
                  className={s.check}
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.consoleFooter}>
          {METRICS.map((m) => (
            <div className={s.metric} key={m.label}>
              <span className={s.metricNum}>{m.num}</span>
              <span className={s.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
