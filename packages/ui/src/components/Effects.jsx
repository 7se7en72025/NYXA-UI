import {
  Bloom,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

/**
 * @param {object} props
 * @param {number} [props.bloomIntensity] - strength of the bloom effect
 * @param {number} [props.bloomThreshold] - luminance threshold above which bloom kicks in
 * @param {number} [props.bloomSmoothing] - luminance smoothing for the bloom threshold
 */
export function Effects({
  bloomIntensity = 2.4,
  bloomThreshold = 0.8,
  bloomSmoothing = 0.6,
}) {
  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={bloomThreshold}
        luminanceSmoothing={bloomSmoothing}
        mipmapBlur
        kernelSize={3}
      />
      <ToneMapping mode={ToneMappingMode.OPTIMIZED_CINEON} />
    </EffectComposer>
  );
}
