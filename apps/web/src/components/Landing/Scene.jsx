import { getOrbit, gsapOnSection } from "@components/gsapOnSections";
import { useThree } from "@react-three/fiber";
import gsap from "gsap/gsap-core";
import { useCallback, useEffect, useRef } from "react";
import { subscribe } from "valtio";
import AlienPlanetGLTF from "../Models/AlienPlanetGLTF";
import Asteroids from "../Models/Asteroids";
import state from "../state";
import { gsapOnRender } from "./gsapOnRender";

const PARALLAX_LIMIT = Math.PI / 16;

export function Scene() {
  const { camera } = useThree();
  const baseRot = useRef({ x: 0, y: 0, z: 0 });
  const cleanupRef = useRef(null);
  const rafRef = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      if (rafRef.current) return;
      const { clientX, clientY } = e;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const nx = (window.innerWidth / 2 - clientX) / window.innerWidth;
        const ny = (window.innerHeight / 2 - clientY) / window.innerHeight;
        gsap.to(camera.rotation, {
          x: baseRot.current.x + ny * PARALLAX_LIMIT,
          y: baseRot.current.y + nx * PARALLAX_LIMIT,
          z: 0,
          ease: "power2.out",
          overwrite: true,
        });
      });
    },
    [camera],
  );

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  useEffect(() => {
    baseRot.current.x = 0;
    baseRot.current.y = 0;
    baseRot.current.z = 0;
    cleanupRef.current = gsapOnRender(camera, onMouseMove);
    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [camera, onMouseMove]);

  useEffect(() => {
    let prevTarget = state.targetSection;
    const unsub = subscribe(state, () => {
      if (state.targetSection === prevTarget) return;
      if (state.activeSection === state.targetSection) return;
      prevTarget = state.targetSection;
      const orbit = getOrbit(state.targetSection);
      baseRot.current.x = orbit.rot[0];
      baseRot.current.y = orbit.rot[1];
      baseRot.current.z = orbit.rot[2];
      gsapOnSection(camera, state.targetSection, onMouseMove);
    });
    return unsub;
  }, [camera, onMouseMove]);

  return (
    <>
      <AlienPlanetGLTF />
      <directionalLight position={[1, -2, 2]} intensity={6} color={0x2dc79f} />
      <Asteroids />
    </>
  );
}
