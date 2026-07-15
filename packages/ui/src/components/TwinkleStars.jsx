import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
} from "three";

const DEFAULT_COUNT = 2000;

let sharedTwinkleTexture = null;

function circleTexture() {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.15, "rgba(255,255,255,0.8)");
  g.addColorStop(0.4, "rgba(255,255,255,0.3)");
  g.addColorStop(0.7, "rgba(255,255,255,0.05)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

/**
 * @param {object} props
 * @param {number} [props.count] - number of stars
 * @param {number} [props.size] - point size
 * @param {[number, number]} [props.radius] - min/max spawn radius from origin
 */
export function TwinkleStars({
  count = DEFAULT_COUNT,
  size = 0.4,
  radius = [15, 90],
}) {
  const ref = useRef();
  // shared across instances so we don't allocate a canvas per mount
  const tex = useMemo(() => {
    if (!sharedTwinkleTexture) sharedTwinkleTexture = circleTexture();
    return sharedTwinkleTexture;
  }, []);

  const { pos, phase, spd } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius[0] + Math.random() * (radius[1] - radius[0]);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      phase[i] = Math.random() * Math.PI * 2;
      spd[i] = 1 + Math.random() * 4;
    }
    return { pos, phase, spd };
  }, [count, radius]);

  const colors = useMemo(() => new Float32Array(count * 3).fill(1), [count]);

  const geo = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("color", new BufferAttribute(colors, 3));
    return g;
  }, [pos, colors]);

  useEffect(() => () => geo.dispose(), [geo]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const c = ref.current.geometry.attributes.color.array;
    for (let i = 0; i < count; i++) {
      const v = 0.1 + 0.9 * ((Math.sin(t * spd[i] + phase[i]) + 1) / 2);
      c[i * 3] = v;
      c[i * 3 + 1] = v;
      c[i * 3 + 2] = v;
    }
    ref.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        map={tex}
        size={size}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
