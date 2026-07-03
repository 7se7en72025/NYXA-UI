import { Suspense } from "react";
import App from "@routes/App.jsx";
import Loader from "@components/Loader";

export default function AnimationWrapper() {
  return (
    <Suspense fallback={<div style={{ width: "100vw", height: "100vh", background: "black", display: "flex", alignItems: "center", justifyContent: "center" }}><Loader /></div>}>
      <App />
    </Suspense>
  );
}
