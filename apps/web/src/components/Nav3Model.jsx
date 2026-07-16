import { Environment, Float, Lightformer, Sparkles, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useRef } from "react";
import { Box3, Vector3 } from "three";

const TARGET_SIZE = 2.6;
const DRACO = "/draco/";

// CC0 "DragonAttenuation" (Khronos glTF sample assets) — a KHR_materials_
// transmission + volume dragon that reads as a glowing amber glass relic
// under the scanner reticle.
function Artifact() {
  const { nodes } = useGLTF("/models/dragon_attenuation.glb", DRACO);
  const spin = useRef();
  const inner = useRef();

  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    el.scale.setScalar(1);
    el.position.set(0, 0, 0);
    const box = new Box3().setFromObject(el);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    const scale = TARGET_SIZE / Math.max(size.x, size.y, size.z);
    el.scale.setScalar(scale);
    el.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }, []);

  useFrame((_, dt) => {
    if (!spin.current) return;
    spin.current.rotation.y += dt * 0.3;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.6}>
      <group ref={spin} dispose={null}>
        <mesh
          ref={inner}
          geometry={nodes.Dragon.geometry}
          material={nodes.Dragon.material}
          frustumCulled={false}
        />
      </group>
    </Float>
  );
}

export default function Nav3Model() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      resize={{ scroll: false }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        {/* procedural light rig — the transmission material needs an
            environment to refract through; no external HDRI fetch */}
        <Environment resolution={128}>
          <group rotation={[0, Math.PI / 2, 0]}>
            <Lightformer intensity={4} color="#4de5fd" position={[-3, 2, -3]} scale={[4, 4, 1]} />
            <Lightformer intensity={3} color="#e6a34a" position={[3, -1, -2]} scale={[3, 3, 1]} />
            <Lightformer intensity={2.5} color="#9af0f4" position={[0, 3, 3]} scale={[5, 2, 1]} />
          </group>
        </Environment>

        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 6]} intensity={1.8} color="#c9f7ff" />
        <pointLight position={[-3, 2, 3]} intensity={1.6} color="#e6a34a" />
        <pointLight position={[0, -2, 4]} intensity={1.2} color="#4de5fd" />
        <Artifact />
        <Sparkles
          count={45}
          scale={[6, 6, 6]}
          size={3}
          speed={0.3}
          opacity={0.7}
          color="#9af0f4"
        />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/dragon_attenuation.glb", DRACO);
