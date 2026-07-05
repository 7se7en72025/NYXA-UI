import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, BufferAttribute, CanvasTexture, AdditiveBlending } from "three";

const DEFAULT_COUNT = 500;

function circleTexture() {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,0.6)");
  g.addColorStop(0.3, "rgba(255,255,255,0.2)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

export function DustParticles({ count = DEFAULT_COUNT, size = 0.15, opacity = 0.4, bounds = [[-30, 30], [-20, 20], [-30, 30]] }) {
  const ref = useRef();
  const tex = useMemo(circleTexture, []);

  const boundsRef = useRef(bounds);

  const { pos, vel } = useMemo(() => {
    const b = boundsRef.current;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * (b[0][1] - b[0][0]);
      pos[i * 3 + 1] = (Math.random() - 0.5) * (b[1][1] - b[1][0]);
      pos[i * 3 + 2] = (Math.random() - 0.5) * (b[2][1] - b[2][0]);
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    return { pos, vel };
  }, [count, bounds]);

  const geo = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    return g;
  }, [pos]);

  useFrame(() => {
    if (!ref.current) return;
    const b = boundsRef.current;
    const p = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      p[i * 3] += vel[i * 3];
      p[i * 3 + 1] += vel[i * 3 + 1];
      p[i * 3 + 2] += vel[i * 3 + 2];
      if (Math.abs(p[i * 3]) > b[0][1]) vel[i * 3] *= -1;
      if (Math.abs(p[i * 3 + 1]) > b[1][1]) vel[i * 3 + 1] *= -1;
      if (Math.abs(p[i * 3 + 2]) > b[2][1]) vel[i * 3 + 2] *= -1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        map={tex}
        size={size}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
