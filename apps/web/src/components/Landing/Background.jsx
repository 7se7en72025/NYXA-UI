import { useMemo } from "react";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import TextureMap from "/images/nebula-new.jpg";

const SEGMENTS = 128;
const RADIUS = 200;
const BLEND_RATIO = 0.06;

function makeSeamless(img) {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const cvs = document.createElement("canvas");
  cvs.width = w;
  cvs.height = h;
  const ctx = cvs.getContext("2d");
  ctx.drawImage(img, 0, 0, w, h);

  const blend = Math.floor(w * BLEND_RATIO);
  const { data: px } = ctx.getImageData(0, 0, w, h);
  const orig = new Uint8ClampedArray(px);

  for (let y = 0; y < h; y++) {
    for (let bx = 0; bx < blend; bx++) {
      const t = (bx / blend) ** 2 * (3 - 2 * (bx / blend));
      const li = (y * w + bx) * 4;
      const ri = (y * w + (w - 1 - bx)) * 4;
      px[li] = Math.round(orig[ri] * (1 - t) + orig[li] * t);
      px[li + 1] = Math.round(orig[ri + 1] * (1 - t) + orig[li + 1] * t);
      px[li + 2] = Math.round(orig[ri + 2] * (1 - t) + orig[li + 2] * t);
    }
  }

  ctx.putImageData(new ImageData(px, w, h), 0, 0);
  const tex = new THREE.CanvasTexture(cvs);
  tex.needsUpdate = true;
  return tex;
}

export default function Background() {
  const bg = useLoader(THREE.TextureLoader, TextureMap);
  bg.anisotropy = 16;

  const tex = useMemo(() => (bg.image ? makeSeamless(bg.image) : bg), [bg]);

  return (
    <Sphere args={[RADIUS, SEGMENTS, SEGMENTS]} rotation={[2, -1, 0]}>
      <meshBasicMaterial attach="material" side={THREE.BackSide} map={tex} />
    </Sphere>
  );
}
