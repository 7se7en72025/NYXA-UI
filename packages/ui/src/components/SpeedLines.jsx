import { useRef, useMemo } from "react";
import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, DoubleSide } from "three";

const SPEED_MIN = 16;
const SPEED_MAX = 20;
const FADE = 0.2;
const SPREAD_X = 8;
const SPREAD_Y = 5;
const SPREAD_Z = 80;
const RESET_Z = 5;

export function SpeedLines({ count = 300, active = false }) {
  const matRef = useRef();
  const speeds = useRef(new Float32Array(count));
  const groupRef = useRef();

  const instances = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);

  const initPos = useRef(null);
  if (!initPos.current) {
    const p = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * SPREAD_X;
      const y = (Math.random() - 0.5) * SPREAD_Y;
      const z = (Math.random() - 0.5) * SPREAD_Z - 40;
      p.push({ x, y, z });
      speeds.current[i] = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
    }
    initPos.current = p;
  }

  useFrame((_, dt) => {
    if (!matRef.current) return;

    const target = active ? 0.75 : 0;
    const cur = matRef.current.opacity;
    if (active) {
      matRef.current.opacity = cur < target ? cur + dt * 3 : cur - dt * FADE;
    } else {
      matRef.current.opacity = Math.max(0, cur - dt * FADE);
    }

    if (!groupRef.current) return;
    const children = groupRef.current.children;
    for (let i = 0; i < count; i++) {
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

  return (
    <Instances limit={count}>
      <planeGeometry args={[1, 0.004]} />
      <meshBasicMaterial ref={matRef} side={DoubleSide} blending={AdditiveBlending} opacity={0} transparent depthWrite={false} />
      <group ref={groupRef}>
        {instances.map((i) => (
          <Instance
            key={i}
            color="white"
            position={[initPos.current[i].x, initPos.current[i].y, initPos.current[i].z]}
            rotation-y={Math.PI / 2}
          />
        ))}
      </group>
    </Instances>
  );
}
