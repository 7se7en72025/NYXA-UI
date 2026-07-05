import { useEffect, useRef, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import { subscribe } from "valtio";
import gsap from "gsap/gsap-core";
import state from "../state";
import AlienPlanetGLTF from "../Models/AlienPlanetGLTF";
import Asteroids from "../Models/Asteroids";
import { gsapOnRender } from "./gsapOnRender";
import { gsapOnSection, getOrbit } from "@components/gsapOnSections";

const PARALLAX_LIMIT = Math.PI / 16;

export function Scene() {
  const { camera } = useThree();
  const baseRot = useRef({ x: 0, y: 0, z: 0 });
  const cleanupRef = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const nx = (window.innerWidth / 2 - e.clientX) / window.innerWidth;
      const ny = (window.innerHeight / 2 - e.clientY) / window.innerHeight;
      gsap.to(camera.rotation, {
        x: baseRot.current.x + ny * PARALLAX_LIMIT,
        y: baseRot.current.y + nx * PARALLAX_LIMIT,
        z: 0,
        ease: "power2.out",
        overwrite: true,
      });
    },
    [camera]
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
