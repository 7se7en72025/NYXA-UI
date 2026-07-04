import { useState, useEffect } from "react";
import state from "@components/state";
import { subscribe } from "valtio";
import * as s from "@styles/ComponentsSection.module.scss";

const COMPONENTS = [
  { name: "COMPONENT 1", category: "CATEGORY A" },
  { name: "COMPONENT 2", category: "CATEGORY B" },
  { name: "COMPONENT 3", category: "CATEGORY C" },
  { name: "COMPONENT 4", category: "CATEGORY D" },
  { name: "COMPONENT 5", category: "CATEGORY E" },
  { name: "COMPONENT 6", category: "CATEGORY F" },
];

export default function ComponentsSection() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const unsub = subscribe(state, () => {
      setShow(state.targetSection === 0);
    });
    setShow(state.targetSection === 0);
    return unsub;
  }, []);

  const visible = ready && show;

  const prev = () => setIndex((index - 1 + COMPONENTS.length) % COMPONENTS.length);
  const next = () => setIndex((index + 1) % COMPONENTS.length);

  const current = COMPONENTS[index];

  return (
    <div className={s.wrapper}>
      <div className={s.animWrapper} style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(60px)",
        transition: "opacity 0.6s ease-in-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <h1 className={s.title}>COMPONENTS 4 U</h1>
        <div className={s.eventsWrapper}>
          <div className={s.carousel}>
            <div className={s.arrow} onClick={prev} />
            <div className={s.carouselWindow}>
              <div style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(154,240,244,0.15) 0%, rgba(154,240,244,0.02) 70%, transparent 100%)",
                border: "1px solid rgba(154,240,244,0.2)",
              }} />
            </div>
            <div className={s.arrowRight} onClick={next} />
          </div>
          <img src="/images/components_sep.svg" alt="" draggable={false} />
          <div className={s.info}>
            <h2>{current.name}</h2>
            <span>{current.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
