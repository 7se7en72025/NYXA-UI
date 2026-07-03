import { Suspense, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import ErrorBoundary from "@components/ErrorBoundary";
import Experience from "@components/Landing/Experience";
import state from "@components/state";
import * as sc from "@styles/ScrollSection.module.scss";

const SECTIONS = ["home", "about", "sponsors", "armageddon", "register", "developers", "contact"];
const SECTION_INDEX = Object.fromEntries(SECTIONS.map((s, i) => [s, i]));

export default function App() {
  const root = useRef(null);
  const refs = useRef([]);

  useEffect(() => {
    state.isHamOpen = false;
    state.activeSection = 0;
    state.targetSection = 0;
    return () => {
      state.isHamOpen = false;
      state.activeSection = 0;
      state.isMoving = false;
      state.targetSection = 0;
    };
  }, []);

  const setRef = useCallback((i) => (el) => { refs.current[i] = el; }, []);

  useEffect(() => {
    const els = refs.current.filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = SECTION_INDEX[e.target.dataset.section];
          if (idx !== undefined && state.targetSection !== idx) {
            state.targetSection = idx;
          }
        }
      },
      { root: root.current, threshold: 0.55 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className={sc.scrollContainer} ref={root}>
      <ErrorBoundary>
        <Canvas style={{ position: "fixed", top: 0, left: 0, zIndex: 0, width: "100vw", height: "100vh" }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <Experience />
          </Suspense>
        </Canvas>
      </ErrorBoundary>

      <img draggable={false} src="/images/Left%20helm.png" alt="" style={{ position: "fixed", top: 0, left: 0, height: "100vh", pointerEvents: "none", zIndex: 10 }} />
      <img draggable={false} src="/images/Right%20helm.png" alt="" style={{ position: "fixed", top: 0, right: 0, height: "100vh", pointerEvents: "none", zIndex: 10 }} />

      <div className={`${sc.section} ${sc.homeSection}`} data-section="home" ref={setRef(0)} />

      {SECTIONS.slice(1).map((name, i) => (
          <div key={name} className={`${sc.section} ${sc.contentSection}`} data-section={name} ref={setRef(i + 1)} />
      ))}
    </div>
  );
}
