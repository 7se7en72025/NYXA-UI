import { useState, useEffect } from "react";
import { useSectionVisibility } from "@hooks/useSectionVisibility";

const containerStyle = {
  position: "fixed",
  left: "4%",
  top: "60%",
  transformOrigin: "top left",
  zIndex: 10,
  pointerEvents: "none",
  width: "28vw",
  maxWidth: "400px",
  transition: "opacity 0.6s ease-in-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
};

const imgStyle = { width: "100%", height: "auto" };

export default function LeftPanel() {
  const [ready, setReady] = useState(false);
  const show = useSectionVisibility(0);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  const visible = ready && show;

  return (
    <div
      style={{
        ...containerStyle,
        transform: visible
          ? "translateY(-50%) scale(1.4) translateX(0)"
          : "translateY(-50%) scale(1.4) translateX(-60px)",
        opacity: visible ? 1 : 0,
      }}
    >
      <img draggable={false} src="/images/l1.svg" alt="" style={imgStyle} loading="lazy" />
    </div>
  );
}
