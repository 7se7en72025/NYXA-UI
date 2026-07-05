import { useRef, useEffect } from "react";
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

export function Speed() {
  const groupRef = useRef();
  const matRef = useRef();
  const speeds = useRef(new Float32Array(COUNT));
  const initPos = useRef(null);

  const positions = useRef(null);
  if (!positions.current) {
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * SPREAD_X;
      p[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
      p[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z - 40;
      speeds.current[i] = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
    }
    positions.current = p;
    initPos.current = p.slice();
  }

  useEffect(() => {
    if (initPos.current && groupRef.current) {
      const children = groupRef.current.children;
      for (let i = 0; i < COUNT; i++) {
        if (children[i]) {
          children[i].position.x = initPos.current[i * 3];
          children[i].position.y = initPos.current[i * 3 + 1];
          children[i].position.z = initPos.current[i * 3 + 2];
        }
      }
    }
  }, []);

  useFrame((_, dt) => {
    if (!matRef.current || !groupRef.current) return;

    const target = state.isMoving ? 0.75 : 0;
    const cur = matRef.current.opacity;
    if (state.isMoving) {
      matRef.current.opacity = cur < target ? cur + dt * 3 : cur - dt * FADE;
    } else {
      matRef.current.opacity = Math.max(0, cur - dt * FADE);
    }

    const children = groupRef.current.children;
    for (let i = 0; i < COUNT; i++) {
      const child = children[i];
      if (!child) continue;
      child.position.z += speeds.current[i] * dt;
      if (child.position.z > RESET_Z) {
        child.position.x = (Math.random() - 0.5) * SPREAD_X;
        child.position.y = (Math.random() - 0.5) * SPREAD_Y;
        child.position.z = (Math.random() - 0.5) * SPREAD_Z - 40;
        speeds.current[i] = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
      }
    }
  });

  const instances = useRef(null);
  if (!instances.current) {
    instances.current = Array.from({ length: COUNT }, (_, i) => i);
  }

  return (
    <Instances limit={COUNT}>
      <planeGeometry args={[1, 0.004]} />
      <meshBasicMaterial ref={matRef} side={DoubleSide} blending={AdditiveBlending} opacity={0} transparent depthWrite={false} />
      <group ref={groupRef}>
        {instances.current.map((i) => (
          <Instance key={i} color="white" rotation-y={Math.PI / 2} />
        ))}
      </group>
    </Instances>
  );
}
