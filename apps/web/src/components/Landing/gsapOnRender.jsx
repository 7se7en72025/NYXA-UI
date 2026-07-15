import gsap from "gsap/gsap-core";

export function gsapOnRender(camera, onMove) {
  gsap.set(camera.position, { x: 0, y: 0, z: 0 });
  gsap.set(camera.rotation, { x: -Math.PI / 2, y: Math.PI / 2, z: 0 });

  let added = false;
  const add = () => {
    // touch/coarse-pointer devices don't have a hover mouse to parallax against
    if (!added && !window.matchMedia("(pointer: coarse)").matches) {
      window.addEventListener("mousemove", onMove, { passive: true });
      added = true;
    }
  };

  const tl = gsap.to(camera.rotation, {
    x: 0,
    y: 0,
    z: 0,
    duration: 2,
    delay: 1.5,
    ease: "power2.inOut",
    onComplete: add,
  });

  return () => {
    tl.kill();
    if (added) {
      window.removeEventListener("mousemove", onMove);
      added = false;
    }
  };
}
