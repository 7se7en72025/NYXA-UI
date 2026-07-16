import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const LAYERS = [0, 1, 2, 3];
const COLORS = ["#4de5fd", "#9af0f4", "#4de5fd", "#9af0f4"];

// stacked hexagonal panes of real refractive glass — a literal "stack"
export default function GlassStack() {
  const group = useRef();

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.28;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.22, 0]} />
        <meshBasicMaterial color="#c9f7ff" />
      </mesh>

      {LAYERS.map((i) => (
        <mesh
          key={i}
          position={[0, (i - 1.5) * 0.4, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.9 - i * 0.06, 0.9 - i * 0.06, 0.1, 6]} />
          <MeshTransmissionMaterial
            thickness={0.35}
            roughness={0.06}
            transmission={1}
            ior={1.35}
            chromaticAberration={0.045}
            anisotropy={0.15}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            color={COLORS[i]}
            backside
          />
        </mesh>
      ))}
    </group>
  );
}
