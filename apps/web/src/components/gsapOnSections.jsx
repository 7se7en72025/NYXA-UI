import gsap from "gsap/gsap-core";
import state from "./state";

const PLANET = [0.75, -1.5, -2];
const RADIUS = 8;
const ARC = Math.PI * 1.5;

const ORBITS = Array.from({ length: 6 }, (_, i) => {
  if (i === 0) return { pos: [0, 0, 0], rot: [0, 0, 0] };
  const a = ((i - 1) / 5) * ARC;
  const x = PLANET[0] + RADIUS * Math.sin(a);
  const y = PLANET[1] + Math.sin(a * 0.5) * 1.5;
  const z = PLANET[2] + RADIUS * Math.cos(a);
  const dx = PLANET[0] - x;
  const dy = PLANET[1] - y;
  const dz = PLANET[2] - z;
  return {
    pos: [x, y, z],
    rot: [Math.atan2(dy, Math.hypot(dx, dz)), -Math.atan2(dx, dz), 0],
  };
});

export function getOrbit(section) {
  return ORBITS[section] || ORBITS[0];
}

export function getInitialOrbit() {
  return ORBITS[0];
}

export function gsapOnSection(camera, target, onMove) {
  const { pos, rot } = ORBITS[target] || ORBITS[0];

  gsap.killTweensOf(camera.position);
  gsap.killTweensOf(camera.rotation);

  let listenerAdded = false;

  const tl = gsap.timeline({
    onStart: () => {
      window.removeEventListener("mousemove", onMove);
      listenerAdded = false;
      state.isMoving = true;
    },
    onComplete: () => {
      state.activeSection = target;
      state.isMoving = false;
      if (
        target === 0 &&
        !listenerAdded &&
        !window.matchMedia("(pointer: coarse)").matches
      ) {
        window.addEventListener("mousemove", onMove, { passive: true });
        listenerAdded = true;
      }
    },
  });

  tl.to(camera.position, {
    x: pos[0],
    y: pos[1],
    z: pos[2],
    duration: 2,
    ease: "power2.inOut",
    overwrite: true,
  }).to(
    camera.rotation,
    {
      x: rot[0],
      y: rot[1],
      z: rot[2],
      duration: 2,
      ease: "power2.inOut",
      overwrite: true,
    },
    "<",
  );
}
