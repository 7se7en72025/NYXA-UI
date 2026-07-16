import { Edges, Float, Sparkles, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Box3, Color, Vector3 } from "three";

const TARGET_SIZE = 3.0; // fit the model into this world-space box

function makeHoloMaterial(base) {
  const mat = base.clone();
  mat.color = new Color("#08222b");
  mat.emissive = new Color("#0e5f74");
  mat.emissiveIntensity = 0.55;
  mat.roughness = 0.32;
  mat.metalness = 0.7;
  mat.transparent = true;
  mat.opacity = 0.94;
  return mat;
}

function Artifact() {
  const { nodes, materials } = useGLTF("/models/asteroid3.glb");
  const spin = useRef();
  const inner = useRef();

  const mat = useMemo(() => makeHoloMaterial(materials.Material), [materials]);
  const geometry = nodes.Cube.geometry;

  // auto-center + auto-scale so the artifact always sits perfectly framed
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
    spin.current.rotation.y += dt * 0.35;
    spin.current.rotation.x += dt * 0.12;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.7}>
      <group ref={spin} dispose={null}>
        <mesh
          ref={inner}
          geometry={geometry}
          material={mat}
          frustumCulled={false}
        >
          {/* glowing wireframe overlay — the "holographic scan" look */}
          <Edges threshold={14} color="#7cecff" />
        </mesh>
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
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[4, 5, 6]}
          intensity={2.6}
          color="#c9f7ff"
        />
        <pointLight position={[-3, 2, 3]} intensity={2.2} color="#4de5fd" />
        <pointLight position={[0, -2, 4]} intensity={1.3} color="#2dc79f" />
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

useGLTF.preload("/models/asteroid3.glb");
