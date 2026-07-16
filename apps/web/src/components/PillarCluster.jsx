import { Edges, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

const SHARDS = [0, 1, 2, 3].map((i) => ({
  radius: 1.55,
  speed: 0.42 + i * 0.09,
  offset: (i / 4) * Math.PI * 2,
  yAmp: 0.32 + i * 0.06,
}));

// four shards (the "pillars") orbiting a shared core — a small system,
// not a single solid
export default function PillarCluster() {
  const group = useRef();
  const shardRefs = useRef([]);
  const cfgs = useMemo(() => SHARDS, []);

  useFrame((state, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.12;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < cfgs.length; i++) {
      const ref = shardRefs.current[i];
      if (!ref) continue;
      const a = t * cfgs[i].speed + cfgs[i].offset;
      ref.position.set(
        Math.cos(a) * cfgs[i].radius,
        Math.sin(a * 1.3) * cfgs[i].yAmp,
        Math.sin(a) * cfgs[i].radius,
      );
      ref.rotation.x += dt * 0.6;
      ref.rotation.y += dt * 0.9;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh>
          <icosahedronGeometry args={[0.56, 0]} />
          <meshStandardMaterial
            color="#08222b"
            emissive="#0e5f74"
            emissiveIntensity={0.7}
            roughness={0.3}
            metalness={0.75}
            transparent
            opacity={0.92}
          />
          <Edges threshold={12} color="#7cecff" />
        </mesh>
      </Float>

      {cfgs.map((c, i) => (
        <mesh key={c.offset} ref={(el) => (shardRefs.current[i] = el)}>
          <octahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial
            color="#0a2a33"
            emissive="#4de5fd"
            emissiveIntensity={1}
            roughness={0.2}
            metalness={0.8}
          />
          <Edges threshold={12} color="#9af0f4" />
        </mesh>
      ))}
    </group>
  );
}
