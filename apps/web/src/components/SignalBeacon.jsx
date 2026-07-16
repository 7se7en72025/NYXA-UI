import { MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide } from "three";

const RING_COUNT = 3;
const RING_IDS = ["ring-0", "ring-1", "ring-2"];

// an organically-morphing energy core with expanding radar-ping rings —
// reads as "transmitting", fitting the join/CTA moment
export default function SignalBeacon() {
  const core = useRef();
  const ringRefs = useRef([]);

  useFrame((state, dt) => {
    if (core.current) core.current.rotation.y += dt * 0.5;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < RING_COUNT; i++) {
      const ring = ringRefs.current[i];
      if (!ring) continue;
      const phase = (t * 0.32 + i / RING_COUNT) % 1;
      const scale = 0.55 + phase * 1.7;
      ring.scale.setScalar(scale);
      ring.material.opacity = Math.max(0, 0.55 * (1 - phase));
    }
  });

  return (
    <group>
      <mesh ref={core}>
        <sphereGeometry args={[0.5, 48, 48]} />
        <MeshDistortMaterial
          color="#0e5f74"
          emissive="#4de5fd"
          emissiveIntensity={1.15}
          distort={0.45}
          speed={2.4}
          roughness={0.22}
          metalness={0.6}
        />
      </mesh>

      {RING_IDS.map((id, i) => (
        <mesh
          key={id}
          ref={(el) => (ringRefs.current[i] = el)}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.58, 0.64, 48]} />
          <meshBasicMaterial
            color="#7cecff"
            transparent
            opacity={0.5}
            side={DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
