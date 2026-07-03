import { useSnapshot } from "valtio";
import state from "./state";

const SECTIONS = ["nav1", "nav2", "nav3", "nav4", "nav5", "nav6"];

export default function SideNav() {
  const snap = useSnapshot(state);

  const scrollTo = (i) => {
    const c = state.scrollContainer;
    if (!c) return;
    c.style.scrollSnapType = "none";
    c.scrollTop = i * window.innerHeight;
    requestAnimationFrame(() => {
      c.style.scrollSnapType = "";
    });
  };

  return (
    <div style={{
      position: "fixed",
      left: "3rem",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 20,
      pointerEvents: "none",
      display: "flex",
      flexDirection: "column",
      gap: "2.2rem",
    }}>
      {SECTIONS.map((name, i) => {
        const active = snap.targetSection === i;
        return (
          <div
            key={name}
            onClick={() => scrollTo(i)}
            style={{
              position: "relative",
              cursor: "pointer",
              pointerEvents: "all",
              paddingRight: "20px",
            }}
          >
            <span style={{
              fontFamily: "'Goldman', sans-serif",
              fontSize: active ? "1.5rem" : "1.15rem",
              fontWeight: active ? 700 : 400,
                color: active ? "#9af0f4" : "#5a7a7e",
                textShadow: active ? "0 0 14px rgba(154,240,244,0.7)" : "none",
              transition: "all 0.35s ease",
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}>
              {name}
            </span>
            <div style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: active ? "14px" : "12px",
              height: active ? "14px" : "12px",
              borderRadius: "50%",
              background: active ? "#9af0f4" : "#5a7a7e",
              boxShadow: active ? "0 0 10px rgba(154,240,244,0.7), 0 0 24px rgba(154,240,244,0.4)" : "none",
              transition: "all 0.35s ease",
            }} />
          </div>
        );
      })}
      <div style={{
        position: "absolute",
        right: "6px",
        top: "10px",
        bottom: "10px",
        width: "2px",
        background: "#3a5a5e",
        zIndex: -1,
      }} />
    </div>
  );
}
