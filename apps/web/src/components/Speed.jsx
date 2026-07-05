import { useRef, useEffect, useMemo } from "react";
import { Instances, Instance } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, DoubleSide } from "three";
import state from "./state";

const COUNT = 300;
const SPEED_MIN = 16;
const SPEED_MAX = 20;
const FADE = 0.2;
const SPREAD_X = 8;
const SPREAD_Y = 5;
const SPREAD_Z = 80;
const RESET_Z = 5;

function initData() {
  const pos = new Float32Array(COUNT * 3);
  const spd = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * SPREAD_X;
    pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
    pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z - 40;
    spd[i] = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
  }
  return { pos, spd };
}

const INSTANCES = Array.from({ length: COUNT }, (_, i) => i);

export function Speed() {
  const groupRef = useRef();
  const matRef = useRef();
  const data = useRef(initData());
  const groupReady = useRef(false);

  useEffect(() => {
    if (!groupRef.current) return;
    const { pos } = data.current;
    const children = groupRef.current.children;
    for (let i = 0; i < COUNT; i++) {
      if (children[i]) {
        children[i].position.x = pos[i * 3];
        children[i].position.y = pos[i * 3 + 1];
        children[i].position.z = pos[i * 3 + 2];
      }
    }
    groupReady.current = true;
  }, []);

  useFrame((_, dt) => {
    if (!matRef.current || !groupRef.current) return;

    const target = state.isMoving ? 0.75 : 0;
    const cur = matRef.current.opacity;
    matRef.current.opacity = state.isMoving
      ? cur < target ? cur + dt * 3 : cur - dt * FADE
      : Math.max(0, cur - dt * FADE);

    const { pos, spd } = data.current;
    const children = groupRef.current.children;
    for (let i = 0; i < COUNT; i++) {
      const child = children[i];
      if (!child) continue;
      child.position.z += spd[i] * dt;
      if (child.position.z > RESET_Z) {
        child.position.x = (Math.random() - 0.5) * SPREAD_X;
        child.position.y = (Math.random() - 0.5) * SPREAD_Y;
        child.position.z = (Math.random() - 0.5) * SPREAD_Z - 40;
        spd[i] = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
      }
    }
  });

  return (
    <Instances limit={COUNT}>
      <planeGeometry args={[1, 0.004]} />
      <meshBasicMaterial ref={matRef} side={DoubleSide} blending={AdditiveBlending} opacity={0} transparent depthWrite={false} />
      <group ref={groupRef}>
        {INSTANCES.map((i) => (
          <Instance key={i} color="white" rotation-y={Math.PI / 2} />
        ))}
      </group>
    </Instances>
  );
}
