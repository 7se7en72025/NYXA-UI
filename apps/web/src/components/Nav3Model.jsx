import { Float, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Box3, Color, Vector3 } from "three";

const TARGET_SIZE = 3.1; // fit the model into this world-space box

function makeCrystalMaterial(base) {
  const mat = base.clone();
  mat.color = new Color("#5fe0f5");
  mat.emissive = new Color("#1c8fb0");
  mat.emissiveIntensity = 0.9;
  mat.roughness = 0.18;
  mat.metalness = 0.85;
  return mat;
}

function Crystal() {
  const { nodes, materials } = useGLTF("/models/asteroid3.glb");
  const spin = useRef();
  const inner = useRef();

  const mat = useMemo(
    () => makeCrystalMaterial(materials.Material),
    [materials],
  );
  const geometry = nodes.Cube.geometry;

  // auto-center + auto-scale the mesh so it always sits nicely framed
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
    spin.current.rotation.y += dt * 0.45;
    spin.current.rotation.x += dt * 0.16;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group ref={spin} dispose={null}>
        <mesh
          ref={inner}
          geometry={geometry}
          material={mat}
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
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 6]} intensity={3} color="#c9f7ff" />
        <directionalLight
          position={[-5, -2, -2]}
          intensity={2}
          color="#24dede"
        />
        <pointLight position={[-3, 2, 3]} intensity={2.2} color="#9af0f4" />
        <pointLight position={[0, 0, 5]} intensity={1.4} color="#5fe0f5" />
        <Crystal />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/asteroid3.glb");
