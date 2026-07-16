import { Float, Sparkles, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Box3, Vector3 } from "three";

const TARGET_SIZE = 3.2;

// A foreground instance of the alien planet — the "giant" the stack stands on.
function Planet() {
  const { nodes, materials } = useGLTF("/models/alien_planet_1k.glb");
  const spin = useRef();
  const inner = useRef();

  const cloudMat = useMemo(() => {
    const m = materials.Clouds.clone();
    m.transparent = true;
    m.opacity = 0.85;
    return m;
  }, [materials]);

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
    if (spin.current) spin.current.rotation.y += dt * 0.12;
  });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={spin} dispose={null}>
        <group ref={inner} frustumCulled={false}>
          <mesh geometry={nodes.Object_4.geometry} material={materials.Planet} />
          <mesh
            geometry={nodes.Object_6.geometry}
            material={cloudMat}
            scale={1.02}
          />
        </group>
      </group>
    </Float>
  );
}

export default function GiantPlanet() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      resize={{ scroll: false }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[-4, 2, 5]} intensity={2.6} color="#24dede" />
        <directionalLight position={[3, -1, 2]} intensity={1} color="#9af0f4" />
        <pointLight position={[0, 0, 5]} intensity={1.4} color="#4de5fd" />
        <Planet />
        <Sparkles
          count={40}
          scale={[7, 7, 7]}
          size={2.5}
          speed={0.25}
          opacity={0.6}
          color="#9af0f4"
        />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/alien_planet_1k.glb");
