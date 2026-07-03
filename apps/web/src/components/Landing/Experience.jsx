import { useRef, useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import Background from "./Background";
import { Scene } from "./Scene";
import { Speed } from "../Speed";
import TwinkleStars from "../TwinkleStars";
import DustParticles from "../DustParticles";
import state from "../state";

export default function Experience() {
  const cam = useRef();

  useEffect(() => {
    state.camera = cam.current;
  }, []);

  return (
    <>
      <PerspectiveCamera ref={cam} position={[0, 0, 0]} zoom={0.7} fov={40} makeDefault />
      <Background />
      <Speed />
      <TwinkleStars />
      <DustParticles />
      <Scene />
    </>
  );
}
