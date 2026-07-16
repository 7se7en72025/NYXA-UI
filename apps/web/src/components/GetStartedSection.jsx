import { useSectionVisibility } from "@hooks/useSectionVisibility";
import * as s from "@styles/Nav3.module.scss";
import ConsolePanel from "./ConsolePanel";
import Nav3Model from "./Nav3Model";
import ScrambleText from "./ScrambleText";

const STEPS = [
  { k: "01", title: "INSTALL", code: "pnpm add @nyxa/ui" },
  { k: "02", title: "IMPORT", code: "import { Button } from '@nyxa/ui'" },
  { k: "03", title: "DEPLOY", code: '<Button variant="nova" />' },
];

const STATS = [
  { num: "40+", label: "COMPONENTS" },
  { num: "12", label: "THEMES" },
  { num: "0", label: "DEPENDENCIES" },
];

export default function GetStartedSection() {
  const show = useSectionVisibility(2);

  return (
    <div className={`${s.wrapper} ${show ? s.visible : ""}`}>
      <div className={s.header}>
        <span className={s.eyebrow}>
          <span className={s.pip} />
          <ScrambleText as="span" text="ARTIFACT SCAN // ONLINE" />
        </span>
        <h2 className={s.title}>
          <ScrambleText as="span" text="FROM ZERO TO SHIPPED" />
        </h2>
      </div>

      <ConsolePanel
        show={show}
        label="SCAN://NYXA-07"
        status="STABLE"
        className={s.panel}
      >
        <div className={s.body}>
          <div className={s.scanner}>
            <div className={s.stage}>{show && <Nav3Model />}</div>

            {/* targeting reticle overlay */}
            <svg
              className={s.reticle}
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden="true"
            >
              <circle className={s.ringOuter} cx="50" cy="50" r="47" />
              <circle className={s.ringInner} cx="50" cy="50" r="38" />

              <path className={s.corner} d="M6 20 L6 6 L20 6" />
              <path className={s.corner} d="M94 20 L94 6 L80 6" />
              <path className={s.corner} d="M6 80 L6 94 L20 94" />
              <path className={s.corner} d="M94 80 L94 94 L80 94" />

              <line className={s.scanLine} x1="10" y1="50" x2="90" y2="50" />
              <circle className={s.centerDot} cx="50" cy="50" r="1.1" />
            </svg>
          </div>

          <div className={s.readouts}>
            {STEPS.map((step) => (
              <div className={s.readout} key={step.k}>
                <span className={s.node} />
                <div className={s.readoutBody}>
                  <span className={s.readoutHead}>
                    <span className={s.readoutKey}>{step.k}</span>
                    <span className={s.readoutTitle}>{step.title}</span>
                  </span>
                  <code className={s.readoutCode}>{step.code}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={s.stats}>
          {STATS.map((stat) => (
            <div className={s.stat} key={stat.label}>
              <span className={s.statNum}>{stat.num}</span>
              <span className={s.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </ConsolePanel>
    </div>
  );
}
