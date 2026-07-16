import ComponentsSection from "@components/ComponentsSection";
import GetStartedSection from "@components/GetStartedSection";
import JoinSection from "@components/JoinSection";
import Experience from "@components/Landing/Experience";
import LeftPanel from "@components/LeftPanel";
import PillarsSection from "@components/PillarsSection";
import StackCreditsSection from "@components/StackCreditsSection";
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
    const ANIM_MS = 650; // duration of one section transition
    const QUIET_MS = 140; // gesture is "done" once no input for this long
    let locked = false;
    let lastEventAt = 0;
    let unlockTimer;
    let animFrame;
    const sectionH = () => c.clientHeight;
    // source of truth for the current section — never read mid-animation
    let currentIndex = Math.round(c.scrollTop / sectionH());

    // self-driven tween — the browser's native `behavior: "smooth"` is
    // unreliable across environments, so we animate scrollTop ourselves.
    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

    const animateTo = (targetTop) => {
      cancelAnimationFrame(animFrame);
      const startTop = c.scrollTop;
      const dist = targetTop - startTop;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / ANIM_MS);
        c.scrollTop = startTop + dist * easeInOut(p);
        if (p < 1) animFrame = requestAnimationFrame(step);
      };
      animFrame = requestAnimationFrame(step);
    };

    const tryUnlock = () => {
      const quietFor = performance.now() - lastEventAt;
      if (quietFor >= QUIET_MS) {
        locked = false;
      } else {
        // momentum still arriving; keep waiting until it goes quiet
        unlockTimer = setTimeout(tryUnlock, QUIET_MS - quietFor);
      }
    };

    const goToSection = (index) => {
      const clamped = Math.max(0, Math.min(SECTIONS.length - 1, index));
      if (clamped === currentIndex) {
        // edge of the deck — release so the next real gesture is heard
        clearTimeout(unlockTimer);
        unlockTimer = setTimeout(tryUnlock, ANIM_MS);
        return;
      }
      currentIndex = clamped;
      locked = true;
      animateTo(clamped * sectionH());
      clearTimeout(unlockTimer);
      unlockTimer = setTimeout(tryUnlock, ANIM_MS);
    };

    const onWheel = (e) => {
      e.preventDefault();
      lastEventAt = performance.now();
      if (locked) return;
      goToSection(currentIndex + (e.deltaY > 0 ? 1 : -1));
    };

    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      lastEventAt = performance.now();
      if (locked) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      goToSection(currentIndex + (dy > 0 ? 1 : -1));
    };

    const onKeyDown = (e) => {
      let dir = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown") dir = 1;
      else if (e.key === "ArrowUp" || e.key === "PageUp") dir = -1;
      else return;
      e.preventDefault();
      lastEventAt = performance.now();
      if (locked) return;
      goToSection(currentIndex + dir);
    };

    // keep currentIndex honest if anything else moves the scroll (resize, etc.)
    const syncIndex = () => {
      if (!locked) currentIndex = Math.round(c.scrollTop / sectionH());
    };

    c.addEventListener("wheel", onWheel, { passive: false });
    c.addEventListener("touchstart", onTouchStart, { passive: true });
    c.addEventListener("touchend", onTouchEnd, { passive: true });
    c.addEventListener("scroll", syncIndex, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(unlockTimer);
      cancelAnimationFrame(animFrame);
      c.removeEventListener("wheel", onWheel);
      c.removeEventListener("touchstart", onTouchStart);
      c.removeEventListener("touchend", onTouchEnd);
      c.removeEventListener("scroll", syncIndex);
      window.removeEventListener("keydown", onKeyDown);
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
            {i === 2 && <GetStartedSection />}
            {i === 3 && <PillarsSection />}
            {i === 4 && <StackCreditsSection />}
            {i === 5 && <JoinSection />}
          </div>
        ))}
      </div>
    </>
  );
}
