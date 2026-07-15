import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.js"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  external: [
    "react",
    "react-dom",
    "@react-three/fiber",
    "@react-three/drei",
    "three",
    "framer-motion",
    "gsap",
  ],
});
