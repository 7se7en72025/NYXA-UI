import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, DoubleSide } from "three";

const SPEED_MIN = 16;
const SPEED_MAX = 20;
const FADE = 0.2;
const SPREAD_X = 8;
const SPREAD_Y = 5;
const SPREAD_Z = 80;
const RESET_Z = 5;

function initData(count) {
  const pos = [];
  const spd = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos.push({
      x: (Math.random() - 0.5) * SPREAD_X,
      y: (Math.random() - 0.5) * SPREAD_Y,
      z: (Math.random() - 0.5) * SPREAD_Z - 40,
    });
    spd[i] = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
  }
  return { pos, spd };
}

/**
 * @param {object} props
 * @param {number} [props.count] - number of streak lines
 * @param {boolean} [props.active] - whether the streak effect is fading in
 */
export function SpeedLines({ count = 300, active = false }) {
  const matRef = useRef();
  const groupRef = useRef();
  const data = useRef(initData(count));
  const prevCount = useRef(count);

  if (prevCount.current !== count) {
    data.current = initData(count);
    prevCount.current = count;
  }

  const instances = useMemo(
    () => Array.from({ length: count }, (_, i) => i),
    [count],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: count isn't read directly, but data.current is reset synchronously above whenever count changes, so count is what should retrigger this memo
  const posArray = useMemo(() => {
    return data.current.pos.map((p) => [p.x, p.y, p.z]);
  }, [count]);

  useFrame((_, dt) => {
    if (!matRef.current) return;

    const target = active ? 0.75 : 0;
    const cur = matRef.current.opacity;
    matRef.current.opacity = active
      ? cur < target
        ? cur + dt * 3
        : cur - dt * FADE
      : Math.max(0, cur - dt * FADE);

    if (!groupRef.current) return;
    const { spd } = data.current;
    const children = groupRef.current.children;
    for (let i = 0; i < count; i++) {
      const child = children[i];
      if (!child) continue;
      child.position.z += spd[i] * dt;
      if (child.position.z > RESET_Z) {
        child.position.x = (Math.random() - 0.5) * SPREAD_X;
        child.position.y = (Math.random() - 0.5) * SPREAD_Y;
        child.position.z = (Math.random() - 0.5) * SPREAD_Z - 40;
        spd[i] = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
      }
    }
  });

  return (
    <Instances limit={count}>
      <planeGeometry args={[1, 0.004]} />
      <meshBasicMaterial
        ref={matRef}
        side={DoubleSide}
        blending={AdditiveBlending}
        opacity={0}
        transparent
        depthWrite={false}
      />
      <group ref={groupRef}>
        {instances.map((i) => (
          <Instance
            key={i}
            color="white"
            position={posArray[i]}
            rotation-y={Math.PI / 2}
          />
        ))}
      </group>
    </Instances>
  );
}
