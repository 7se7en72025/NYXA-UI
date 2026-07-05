import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  build: {
    target: "es2020",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          "animation-vendor": ["gsap"],
          "ui-vendor": ["valtio"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei", "gsap", "valtio"],
  },
});
