import { memo } from "react";
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
  opacity: 0,
  transform: "translateY(-50%) scale(1.4) translateX(-60px)",
  transition: "opacity 0.6s ease-in-out 0.8s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
};

const imgStyle = { width: "100%", height: "auto" };

const visibleStyle = {
  ...containerStyle,
  opacity: 1,
  transform: "translateY(-50%) scale(1.4) translateX(0)",
};

function LeftPanelInner() {
  const show = useSectionVisibility(0);

  return (
    <div style={show ? visibleStyle : containerStyle}>
      <img draggable={false} src="/images/l1.svg" alt="" style={imgStyle} loading="lazy" />
    </div>
  );
}

export default memo(LeftPanelInner);
