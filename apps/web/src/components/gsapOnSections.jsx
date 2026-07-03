import gsap from "gsap";
import state from "./state";

const PLANET = [0.75, -1.5, -2];
const RADIUS = 8;
const ARC = Math.PI * 1.5;

export function getOrbit(section) {
  if (section === 0) return { pos: [0, 0, 0], rot: [0, 0, 0] };

  const a = ((section - 1) / 6) * ARC;
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
}

export function getInitialOrbit() {
  return getOrbit(0);
}

export function gsapOnSection(camera, target, onMove) {
  const { pos, rot } = getOrbit(target);

  const tl = gsap.timeline({
    onStart: () => {
      window?.removeEventListener("mousemove", onMove);
      state.isMoving = true;
    },
    onComplete: () => {
      state.activeSection = target;
      state.isMoving = false;
      if (target === 0) window?.addEventListener("mousemove", onMove);
    },
  });

  tl.to(camera.position, { x: pos[0], y: pos[1], z: pos[2], duration: 2, ease: "power2.inOut" })
    .to(camera.rotation, { x: rot[0], y: rot[1], z: rot[2], duration: 2, ease: "power2.inOut" }, "<");
}
