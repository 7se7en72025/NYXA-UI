import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, BufferAttribute, CanvasTexture, AdditiveBlending } from "three";

const COUNT = 1000;

function circleTexture() {
  const s = 64;
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

export default function TwinkleStars() {
  const ref = useRef();
  const tex = useMemo(circleTexture, []);

  const { pos, phase, spd } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const phase = new Float32Array(COUNT);
    const spd = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 15 + Math.random() * 75;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      phase[i] = Math.random() * Math.PI * 2;
      spd[i] = 5 + Math.random() * 20;
    }
    return { pos, phase, spd };
  }, []);

  const colors = useMemo(() => new Float32Array(COUNT * 3).fill(1), []);

  const geo = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("color", new BufferAttribute(colors, 3));
    return g;
  }, [pos, colors]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const c = ref.current.geometry.attributes.color.array;
    for (let i = 0; i < COUNT; i++) {
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
        size={0.4}
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
