import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AnimationWrapper from "./AnimationWrapper";
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AnimationWrapper />
  </StrictMode>
);
