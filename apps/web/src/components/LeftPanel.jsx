import { useState, useEffect } from "react";
import state from "@components/state";
import { subscribe } from "valtio";

export default function LeftPanel() {
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const unsub = subscribe(state, () => {
      setShow(state.targetSection === 0);
    });
    setShow(state.targetSection === 0);
    return unsub;
  }, []);

  const visible = ready && show;

  return (
    <div style={{
      position: "fixed",
      left: "4%",
      top: "60%",
      transform: visible
        ? "translateY(-50%) scale(1.4) translateX(0)"
        : "translateY(-50%) scale(1.4) translateX(-60px)",
      transformOrigin: "top left",
      zIndex: 10,
      pointerEvents: "none",
      width: "28vw",
      maxWidth: "400px",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease-in-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <img
        draggable={false}
        src="/images/l1.svg"
        alt=""
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}
