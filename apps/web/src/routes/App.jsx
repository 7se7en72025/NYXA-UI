import ComingSoon from "@components/ComingSoon";
import ComponentsSection from "@components/ComponentsSection";
import Experience from "@components/Landing/Experience";
import LeftPanel from "@components/LeftPanel";
import state, { setScrollContainer } from "@components/state";
import TechStack from "@components/TechStack";
import TopNavbar from "@components/TopNavbar";
import { ErrorBoundary } from "@nyxa/ui";
import { Canvas } from "@react-three/fiber";
import * as sc from "@styles/ScrollSection.module.scss";
import { Suspense, useEffect, useRef } from "react";

const SECTIONS = ["nav1", "nav2", "nav3", "nav4", "nav5", "nav6"];
const SECTION_INDEX = Object.fromEntries(SECTIONS.map((s, i) => [s, i]));

const canvasStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 0,
  width: "100vw",
  height: "100vh",
};
const helmLStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  pointerEvents: "none",
  zIndex: 10,
};
const helmRStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  pointerEvents: "none",
  zIndex: 10,
};

export default function App() {
  const root = useRef(null);
  const sectionRefs = useRef([]);

  const setRef = useRef(null);
  if (!setRef.current) {
    setRef.current = (i) => (el) => {
      sectionRefs.current[i] = el;
    };
  }

  useEffect(() => {
    setScrollContainer(root.current);

    const c = root.current;
    const ANIM_MS = 700;
    let isAnimating = false;
    let animTimeout;

    const goToSection = (index) => {
      const clamped = Math.max(0, Math.min(SECTIONS.length - 1, index));
      isAnimating = true;
      c.scrollTo({ top: clamped * window.innerHeight, behavior: "smooth" });
      clearTimeout(animTimeout);
      animTimeout = setTimeout(() => {
        isAnimating = false;
      }, ANIM_MS);
    };

    const onWheel = (e) => {
      e.preventDefault();
      if (isAnimating) return;
      const currentIndex = Math.round(c.scrollTop / window.innerHeight);
      goToSection(currentIndex + (e.deltaY > 0 ? 1 : -1));
    };

    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (isAnimating) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      const currentIndex = Math.round(c.scrollTop / window.innerHeight);
      goToSection(currentIndex + (dy > 0 ? 1 : -1));
    };

    c.addEventListener("wheel", onWheel, { passive: false });
    c.addEventListener("touchstart", onTouchStart, { passive: true });
    c.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      clearTimeout(animTimeout);
      c.removeEventListener("wheel", onWheel);
      c.removeEventListener("touchstart", onTouchStart);
      c.removeEventListener("touchend", onTouchEnd);
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
      { root: root.current, threshold: 0.55 },
    );

    els.forEach((el) => {
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <ErrorBoundary>
        <Canvas
          style={canvasStyle}
          dpr={[1, 2]}
          gl={{ powerPreference: "high-performance", antialias: false }}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <Experience />
          </Suspense>
        </Canvas>
      </ErrorBoundary>

      <img
        draggable={false}
        src="/images/Left%20helm.png"
        alt=""
        style={helmLStyle}
        loading="eager"
      />
      <img
        draggable={false}
        src="/images/Right%20helm.png"
        alt=""
        style={helmRStyle}
        loading="eager"
      />

      <LeftPanel />
      <TechStack />
      <ComingSoon />

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
