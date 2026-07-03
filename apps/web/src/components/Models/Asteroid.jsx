import { useState, useRef, useMemo, useCallback } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const rand = (min, max) => Math.random() * (max - min) + min;

export function Asteroid({ ...props }) {
  const { nodes, materials } = useGLTF("/models/asteroid3.glb");
  const ref = useRef();
  const dir = useRef(new THREE.Vector3());
  const [launched, setLaunched] = useState(false);

  const osc = useMemo(
    () => ({
      freq: [rand(0.1, 0.18), rand(0.1, 0.18), rand(0.1, 0.18)],
      amp: [rand(4, 10), rand(1, 3), rand(4, 10)],
      phase: [rand(0, Math.PI * 2), rand(0, Math.PI * 2), rand(0, Math.PI * 2)],
      drift: [rand(0.003, 0.015), rand(0.003, 0.015), rand(0.003, 0.015)],
      scale: rand(0.15, 0.5),
    }),
    []
  );

  const mat = useMemo(() => {
    const m = materials.Material.clone();
    m.color = new THREE.Color("#cc7733");
    m.roughness = 0.7;
    m.metalness = 0.1;
    return m;
  }, [materials]);

  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt;
    ref.current.rotation.x += dt;

    const t = state.clock.elapsedTime;
    if (launched) {
      ref.current.position.x += dir.current.x * osc.drift[0];
      ref.current.position.y += dir.current.y * osc.drift[1];
      ref.current.position.z += dir.current.z * osc.drift[2];
    } else {
      ref.current.position.x = osc.amp[0] * Math.sin(t * osc.freq[0] + osc.phase[0]);
      ref.current.position.y = osc.amp[1] * Math.cos(t * osc.freq[1] + osc.phase[1]);
      ref.current.position.z = osc.amp[2] * Math.cos(t * osc.freq[2] + osc.phase[2]);
    }
  });

  const onClick = useCallback((e) => {
    setLaunched(true);
    dir.current.copy(e.point);
    setTimeout(() => setLaunched(false), 7000);
  }, []);

  const onHover = useCallback(() => {}, []);
  const onUnhover = useCallback(() => {}, []);

  return (
    <group ref={ref} {...props} dispose={null} onClick={onClick} onPointerEnter={onHover} onPointerLeave={onUnhover}>
      <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} material={mat} scale={osc.scale} />
    </group>
  );
}

useGLTF.preload("/models/asteroid3.glb");
