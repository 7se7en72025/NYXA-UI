import Loader from "@components/Loader";
import App from "@routes/App.jsx";
import { Suspense } from "react";

const fallbackStyle = {
  width: "100vw",
  height: "100vh",
  background: "black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function AnimationWrapper() {
  return (
    <Suspense
      fallback={
        <div style={fallbackStyle}>
          <Loader />
        </div>
      }
    >
      <App />
    </Suspense>
  );
}
