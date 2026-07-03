import { useMemo, useRef } from "react";
import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, DoubleSide } from "three";

const SPEED_MIN = 16;
const SPEED_MAX = 20;
const FADE = 0.2;

function SpeedLine() {
  const ref = useRef();
  const spd = useRef(0);
  const pos = useRef({ x: 0, y: 0, z: 0 });

  const reset = () => {
    pos.current = {
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 5,
      z: (Math.random() - 0.5) * 80 - 40,
    };
    spd.current = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
  };

  reset();

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.position.z += spd.current * dt;
    if (ref.current.position.z > 5) {
      reset();
      ref.current.position.z = pos.current.z;
    }
  });

  return (
    <Instance
      ref={ref}
      color="white"
      position={[pos.current.x, pos.current.y, pos.current.z]}
      rotation-y={Math.PI / 2}
    />
  );
}

export function SpeedLines({ count = 300, active = false }) {
  const mat = useRef();
  const indices = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);

  useFrame((_, dt) => {
    if (!mat.current) return;
    mat.current.opacity = active ? Math.max(0, mat.current.opacity - dt * FADE) : 0;
    if (active && mat.current.opacity < 0.75) mat.current.opacity = 0.75;
  });

  return (
    <Instances>
      <planeGeometry args={[1, 0.004]} />
      <meshBasicMaterial ref={mat} side={DoubleSide} blending={AdditiveBlending} opacity={0} transparent depthWrite={false} />
      {indices.map((i) => (
        <SpeedLine key={i} />
      ))}
    </Instances>
  );
}
