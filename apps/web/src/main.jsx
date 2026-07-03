import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AnimationWrapper from "./AnimationWrapper";
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AnimationWrapper />
      <SpeedInsights includeLighthouse includePsi psiStrategy="mobile" lighthouseStrategy="mobile" />
    </BrowserRouter>
  </StrictMode>
);
