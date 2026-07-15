import { Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const PLANET_POS = [0.75, -1.5, -2];
const PLANET_SCALE = 1.2;

export default function AlienPlanetGLTF() {
  const { nodes, materials } = useGLTF("/models/alien_planet_1k.glb");
  const ref = useRef();

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y -= dt * 0.08;
    ref.current.rotation.x -= dt * 0.03;
  });

  return (
    <>
      <directionalLight intensity={2} position={[-3, 2, -4]} color="#24dede" />
      <directionalLight intensity={0.8} position={[3, -1, 2]} color="#9af0f4" />
      <Float
        speed={0.4}
        rotationIntensity={0.3}
        floatIntensity={0.5}
        floatingRange={[-0.15, 0.15]}
      >
        <group
          ref={ref}
          position={PLANET_POS}
          scale={PLANET_SCALE}
          dispose={null}
          frustumCulled={false}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.Planet}
          />
          <mesh
            geometry={nodes.Object_6.geometry}
            material={materials.Clouds}
            scale={1.025}
          />
        </group>
      </Float>
    </>
  );
}

useGLTF.preload("/models/alien_planet_1k.glb");
