import { Canvas } from "@react-three/fiber";
import * as s from "@styles/HudEmblem.module.scss";
import { Suspense } from "react";
import ScrambleText from "./ScrambleText";

export default function HudEmblem({ tags, children }) {
  return (
    <div className={s.emblem}>
      <div className={s.stage}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          resize={{ scroll: false }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[4, 5, 6]}
              intensity={2.4}
              color="#c9f7ff"
            />
            <pointLight position={[-3, 2, 3]} intensity={2} color="#4de5fd" />
            {children}
          </Suspense>
        </Canvas>
      </div>

      <svg
        className={s.reticle}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <circle className={s.ringOuter} cx="50" cy="50" r="47" />
        <circle className={s.ringInner} cx="50" cy="50" r="38" />
        <path className={s.corner} d="M6 20 L6 6 L20 6" />
        <path className={s.corner} d="M94 20 L94 6 L80 6" />
        <path className={s.corner} d="M6 80 L6 94 L20 94" />
        <path className={s.corner} d="M94 80 L94 94 L80 94" />
      </svg>

      {tags?.tl && (
        <span className={`${s.hudTag} ${s.hudTL}`}>
          <ScrambleText as="span" text={tags.tl} />
        </span>
      )}
      {tags?.tr && (
        <span className={`${s.hudTag} ${s.hudTR}`}>
          <ScrambleText as="span" text={tags.tr} />
        </span>
      )}
    </div>
  );
}
