import { Edges, Environment, Float, Lightformer, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import { Box3, Color, Vector3 } from "three";

const SHARDS = [0, 1, 2, 3].map((i) => ({
  radius: 1.6,
  speed: 0.42 + i * 0.09,
  offset: (i / 4) * Math.PI * 2,
  yAmp: 0.34 + i * 0.06,
}));

const CORE_SIZE = 1.15;
const DRACO = "/draco/";

// CC0 "IridescenceSuzanne" (Khronos glTF sample assets) — an alien,
// oil-slick iridescent head standing in for the constellation's shared core.
function IridescentCore() {
  const { nodes } = useGLTF("/models/iridescence_suzanne.glb", DRACO);
  const inner = useRef();

  // brand-tinted clone so the core reads cyan at emblem scale instead of flat
  // white, while keeping the transmission/iridescence physical properties
  const mat = useMemo(() => {
    const m = nodes.Suzanne3.material.clone();
    m.emissive = new Color("#0e5f74");
    m.emissiveIntensity = 0.5;
    return m;
  }, [nodes]);

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
    const scale = CORE_SIZE / Math.max(size.x, size.y, size.z);
    el.scale.setScalar(scale);
    el.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }, []);

  return (
    <mesh
      ref={inner}
      geometry={nodes.Suzanne3.geometry}
      material={mat}
      frustumCulled={false}
    />
  );
}

// four shards (the "pillars") orbiting a shared iridescent core — a small
// system, not a single solid
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
      {/* procedural reflections for the iridescent + metal shard materials */}
      <Environment resolution={96}>
        <group rotation={[0, Math.PI / 2, 0]}>
          <Lightformer intensity={7} color="#9af0f4" position={[-2, 1, -3]} scale={[3, 3, 1]} />
          <Lightformer intensity={6} color="#c86bff" position={[2, -1, -2]} scale={[3, 3, 1]} />
          <Lightformer intensity={5} color="#ff8fd6" position={[0, 2, 2]} scale={[4, 2, 1]} />
          <Lightformer intensity={4} color="#ffe08a" position={[0, -2, -1]} scale={[4, 2, 1]} />
        </group>
      </Environment>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <IridescentCore />
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

useGLTF.preload("/models/iridescence_suzanne.glb", DRACO);
