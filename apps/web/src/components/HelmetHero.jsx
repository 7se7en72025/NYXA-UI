import { Float, Sparkles, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Box3, Color, Vector3 } from "three";

const TARGET_SIZE = 3.1;
const DRACO = "/draco/";

// CC0 SciFiHelmet (Khronos glTF sample assets), re-textured with a cyan rim
// so the PBR hero reads as part of the holographic HUD instead of fighting it.
function Helmet() {
  const { scene } = useGLTF("/models/scifi_helmet.glb", DRACO);
  const spin = useRef();
  const inner = useRef();

  // clone so repeated mounts don't mutate the cached scene
  const model = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      if (o.isMesh && o.material) {
        o.material = o.material.clone();
        o.material.emissive = new Color("#0a4a5a");
        o.material.emissiveIntensity = 0.35;
      }
    });
    return c;
  }, [scene]);

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
  }, [model]);

  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.3;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.6}>
      <group ref={spin} dispose={null}>
        <group ref={inner} frustumCulled={false}>
          <primitive object={model} />
        </group>
      </group>
    </Float>
  );
}

export default function HelmetHero() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      resize={{ scroll: false }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 5, 6]} intensity={2.4} color="#e8fbff" />
        <pointLight position={[-4, 1, 3]} intensity={2.6} color="#4de5fd" />
        <pointLight position={[3, -2, 2]} intensity={1.6} color="#2dc79f" />
        <Helmet />
        <Sparkles
          count={50}
          scale={[6, 6, 6]}
          size={2.5}
          speed={0.3}
          opacity={0.6}
          color="#9af0f4"
        />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/scifi_helmet.glb", DRACO);
