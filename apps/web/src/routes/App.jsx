import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import ErrorBoundary from "@components/ErrorBoundary";
import Experience from "@components/Landing/Experience";
import TopNavbar from "@components/TopNavbar";
import ComponentsSection from "@components/ComponentsSection";
import LeftPanel from "@components/LeftPanel";
import TechStack from "@components/TechStack";
import Nav3 from "@components/Nav3";
import state, { setScrollContainer } from "@components/state";
import * as sc from "@styles/ScrollSection.module.scss";

const SECTIONS = ["nav1", "nav2", "nav3", "nav4", "nav5", "nav6"];
const SECTION_INDEX = Object.fromEntries(SECTIONS.map((s, i) => [s, i]));

const canvasStyle = { position: "fixed", top: 0, left: 0, zIndex: 0, width: "100vw", height: "100vh" };
const helmLStyle = { position: "fixed", top: 0, left: 0, height: "100vh", pointerEvents: "none", zIndex: 10 };
const helmRStyle = { position: "fixed", top: 0, right: 0, height: "100vh", pointerEvents: "none", zIndex: 10 };

export default function App() {
  const root = useRef(null);
  const sectionRefs = useRef([]);

  const setRef = useRef(null);
  if (!setRef.current) {
    setRef.current = (i) => (el) => { sectionRefs.current[i] = el; };
  }

  useEffect(() => {
    setScrollContainer(root.current);

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

  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean);
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
        <Canvas style={canvasStyle}>
          <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <Experience />
          </Suspense>
        </Canvas>
      </ErrorBoundary>

      <img draggable={false} src="/images/Left%20helm.png" alt="" style={helmLStyle} loading="eager" />
      <img draggable={false} src="/images/Right%20helm.png" alt="" style={helmRStyle} loading="eager" />

      <LeftPanel />
      <TechStack />
      <Nav3 />

      <TopNavbar />

      <div className={sc.scrollContainer} ref={root}>
        {SECTIONS.map((name, i) => (
          <div
            key={name}
            ref={setRef.current(i)}
            data-section={name}
            className={`${sc.section} ${i === 0 ? sc.homeSection : sc.contentSection}`}
          >
            {i === 0 && <ComponentsSection />}
          </div>
        ))}
      </div>
    </>
  );
}
