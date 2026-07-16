import { useSectionVisibility } from "@hooks/useSectionVisibility";
import * as s from "@styles/Nav3.module.scss";
import { Suspense } from "react";
import Nav3Model from "./Nav3Model";
import ScrambleText from "./ScrambleText";

const STEPS = [
  { title: "INSTALL", code: "pnpm add @nyxa/ui" },
  { title: "IMPORT", code: "import { Button } from '@nyxa/ui'" },
  { title: "SHIP", code: '<Button variant="nova" />' },
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
        <span className={s.eyebrow}>LAUNCH SEQUENCE</span>
        <h2 className={s.title}>
          <ScrambleText as="span" text="FROM ZERO TO SHIPPED" />
        </h2>
      </div>

      <div className={s.body}>
        <div className={s.stage}>
          {show && (
            <Suspense fallback={null}>
              <Nav3Model />
            </Suspense>
          )}
        </div>

        <div className={s.steps}>
          {STEPS.map((step, i) => (
            <div className={s.step} key={step.title}>
              <span className={s.stepIndex}>{i + 1}</span>
              <div className={s.stepBody}>
                <span className={s.stepTitle}>{step.title}</span>
                <span className={s.stepCode}>{step.code}</span>
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
    </div>
  );
}
