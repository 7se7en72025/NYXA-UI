import { useState, useCallback } from "react";
import { useSectionVisibility } from "@hooks/useSectionVisibility";
import * as s from "@styles/ComponentsSection.module.scss";
import ScrambleText from "./ScrambleText";

const COMPONENTS = [
  { name: "COMPONENT 1", category: "CATEGORY A" },
  { name: "COMPONENT 2", category: "CATEGORY B" },
  { name: "COMPONENT 3", category: "CATEGORY C" },
  { name: "COMPONENT 4", category: "CATEGORY D" },
  { name: "COMPONENT 5", category: "CATEGORY E" },
  { name: "COMPONENT 6", category: "CATEGORY F" },
];

const COUNT = COMPONENTS.length;

const circleStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(154,240,244,0.15) 0%, rgba(154,240,244,0.02) 70%, transparent 100%)",
  border: "1px solid rgba(154,240,244,0.2)",
};

const hiddenAnimStyle = {
  opacity: 0,
  transform: "translateX(60px)",
  transition: "opacity 0.6s ease-in-out 0.8s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
};

const visibleAnimStyle = {
  opacity: 1,
  transform: "translateX(0)",
  transition: "opacity 0.6s ease-in-out 0.8s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
};

export default function ComponentsSection() {
  const [index, setIndex] = useState(0);
  const show = useSectionVisibility(0);

  const prev = useCallback(() => setIndex((i) => (i - 1 + COUNT) % COUNT), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % COUNT), []);

  const current = COMPONENTS[index];

  return (
    <div className={s.wrapper}>
      <div className={s.animWrapper} style={show ? visibleAnimStyle : hiddenAnimStyle}>
        <h1 className={s.title}><ScrambleText as="span" text="COMPONENTS 4 U" /></h1>
        <div className={s.eventsWrapper}>
          <div className={s.carousel}>
            <div className={s.arrow} onClick={prev} />
            <div className={s.carouselWindow}>
              <div style={circleStyle} />
            </div>
            <div className={s.arrowRight} onClick={next} />
          </div>
          <img src="/images/components_sep.svg" alt="" draggable={false} loading="lazy" />
          <div className={s.info}>
            <h2 key={current.name}><ScrambleText as="span" text={current.name} /></h2>
            <span><ScrambleText as="span" text={current.category} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
