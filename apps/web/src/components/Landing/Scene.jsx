import { useEffect, useRef, useCallback } from "react";
import { useThree } from "@react-three/fiber";
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
    baseRot.current = { x: 0, y: 0, z: 0 };
    gsapOnRender(camera, onMouseMove);
  }, [camera, onMouseMove]);

  useEffect(() => {
    if (state.activeSection === state.targetSection) return;
    const orbit = getOrbit(state.targetSection);
    baseRot.current = { x: orbit.rot[0], y: orbit.rot[1], z: orbit.rot[2] };
    gsapOnSection(camera, state.targetSection, onMouseMove);
  }, [state.targetSection, camera, onMouseMove]);

  return (
    <>
      <AlienPlanetGLTF />
      <directionalLight position={[1, -2, 2]} intensity={6} color={0x2dc79f} />
      <Asteroids />
    </>
  );
}
