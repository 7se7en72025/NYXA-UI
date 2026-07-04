import { Suspense, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import ErrorBoundary from "@components/ErrorBoundary";
import Experience from "@components/Landing/Experience";
import TopNavbar from "@components/TopNavbar";
import ComponentsSection from "@components/ComponentsSection";
import state from "@components/state";
import * as sc from "@styles/ScrollSection.module.scss";

const SECTIONS = ["nav1", "nav2", "nav3", "nav4", "nav5", "nav6"];
const SECTION_INDEX = Object.fromEntries(SECTIONS.map((s, i) => [s, i]));

export default function App() {
  const root = useRef(null);
  const refs = useRef([]);

  useEffect(() => {
    state.scrollContainer = root.current;

    const c = root.current;
    let timeout;
    const snapToNearest = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const idx = Math.round(c.scrollTop / window.innerHeight);
        c.scrollTop = idx * window.innerHeight;
      }, 150);
    };
    c.addEventListener("wheel", snapToNearest, { passive: true });
    c.addEventListener("touchend", snapToNearest, { passive: true });

    return () => {
      clearTimeout(timeout);
      c.removeEventListener("wheel", snapToNearest);
      c.removeEventListener("touchend", snapToNearest);
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
    <>
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

      <TopNavbar />

      <div className={sc.scrollContainer} ref={root}>
        {SECTIONS.map((name, i) => (
          <div key={name} className={`${sc.section} ${i === 0 ? sc.homeSection : sc.contentSection}`} data-section={name} ref={setRef(i)}>
            {i === 0 && <ComponentsSection />}
          </div>
        ))}
      </div>
    </>
  );
}
