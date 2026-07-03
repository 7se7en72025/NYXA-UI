import gsap from "gsap/gsap-core";

export function gsapOnRender(camera, onMove) {
  gsap.set(camera.position, { x: 0, y: 0, z: 0 });
  gsap.set(camera.rotation, { x: -Math.PI / 2, y: Math.PI / 2, z: 0 });

  gsap.to(camera.rotation, {
    x: 0,
    y: 0,
    z: 0,
    duration: 2,
    delay: 1.5,
    ease: "power2.inOut",
    onComplete: () => window?.addEventListener("mousemove", onMove),
  });
}
