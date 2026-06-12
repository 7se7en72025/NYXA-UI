import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 0 32px rgba(255,255,255,0.04)"
      }
    }
  },
  plugins: []
};

export default config;
