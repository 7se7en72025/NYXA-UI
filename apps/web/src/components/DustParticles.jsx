import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, BufferAttribute, CanvasTexture, AdditiveBlending } from "three";

const COUNT = 250;

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

export default function DustParticles() {
  const ref = useRef();
  const tex = useMemo(circleTexture, []);

  const { pos, vel } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    return { pos, vel };
  }, []);

  const geo = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    return g;
  }, [pos]);

  useFrame(() => {
    if (!ref.current) return;
    const p = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] += vel[i * 3];
      p[i * 3 + 1] += vel[i * 3 + 1];
      p[i * 3 + 2] += vel[i * 3 + 2];
      if (Math.abs(p[i * 3]) > 30) vel[i * 3] *= -1;
      if (Math.abs(p[i * 3 + 1]) > 20) vel[i * 3 + 1] *= -1;
      if (Math.abs(p[i * 3 + 2]) > 30) vel[i * 3 + 2] *= -1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        map={tex}
        size={0.15}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
