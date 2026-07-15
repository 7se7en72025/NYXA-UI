import { Sphere } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { BackSide, CanvasTexture, TextureLoader } from "three";
import TextureMap from "/images/nebula-new.jpg";

const SEGMENTS = 32;
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
  const tex = new CanvasTexture(cvs);
  tex.needsUpdate = true;
  return tex;
}

let _cachedTex = null;

export default function Background() {
  const bg = useLoader(TextureLoader, TextureMap);

  const tex = useMemo(() => {
    bg.anisotropy = 16;
    if (_cachedTex) return _cachedTex;
    _cachedTex = bg.image ? makeSeamless(bg.image) : bg;
    return _cachedTex;
  }, [bg]);

  return (
    <Sphere args={[RADIUS, SEGMENTS, SEGMENTS]} rotation={[2, -1, 0]}>
      <meshBasicMaterial attach="material" side={BackSide} map={tex} />
    </Sphere>
  );
}
