import { useState, useEffect, useCallback } from "react";

function playTing() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(2400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}

function isFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
}

export default function ComingSoon({ show, onClose }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (show) {
      setExiting(false);
      setVisible(true);
      playTing();
      const t = setTimeout(() => handleClose(), 7700);
      return () => clearTimeout(t);
    }
  }, [show]);

  const handleClose = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        left: "40px",
        zIndex: 30,
        pointerEvents: "all",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "translateY(20px) scale(0.95)" : "translateY(0) scale(1)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <div style={{ position: "relative", width: "320px" }}>
        <img
          draggable={false}
          src="/images/fullscreensvg.svg"
          alt="Best viewed fullscreen"
          style={{ width: "100%", height: "auto", display: "block", pointerEvents: "none" }}
        />

        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            left: "63%",
            top: "82%",
            width: "26%",
            height: "10%",
            cursor: "pointer",
            background: "transparent",
            border: "none",
            outline: "none",
            pointerEvents: "all",
            color: "transparent",
            fontSize: "0.6rem",
          }}
        >
          GOT IT
        </button>
      </div>
    </div>
  );
}
