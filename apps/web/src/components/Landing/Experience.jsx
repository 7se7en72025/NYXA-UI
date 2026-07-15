import { useIsMobile } from "@hooks/useIsMobile";
import { DustParticles, SpeedLines, TwinkleStars } from "@nyxa/ui";
import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import state, { setCamera } from "../state";
import Background from "./Background";
import { Scene } from "./Scene";

export default function Experience() {
  const cam = useRef();
  const { isMoving } = useSnapshot(state);
  const isMobile = useIsMobile();

  useEffect(() => {
    setCamera(cam.current);
  }, []);

  return (
    <>
      <PerspectiveCamera
        ref={cam}
        position={[0, 0, 0]}
        zoom={0.7}
        fov={40}
        makeDefault
      />
      <Background />
      <SpeedLines active={isMoving} count={isMobile ? 150 : 300} />
      <TwinkleStars count={isMobile ? 500 : 1000} size={0.4} />
      <DustParticles
        count={isMobile ? 120 : 250}
        size={0.15}
        opacity={0.4}
        bounds={[
          [-30, 30],
          [-20, 20],
          [-30, 30],
        ]}
      />
      <Scene />
    </>
  );
}
