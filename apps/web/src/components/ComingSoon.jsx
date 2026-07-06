import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import ScrambleText from "./ScrambleText";

let _ctx = null;
function playTing() {
  try {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = _ctx.createOscillator();
    const gain = _ctx.createGain();
    osc.connect(gain);
    gain.connect(_ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(2400, _ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, _ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, _ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, _ctx.currentTime + 0.4);
    osc.start(_ctx.currentTime);
    osc.stop(_ctx.currentTime + 0.4);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  } catch (e) {}
}

const overlayStyle = {
  position: "fixed",
  bottom: "40px",
  left: "40px",
  zIndex: 30,
  pointerEvents: "all",
};

const imgWrapperStyle = { position: "relative", width: "320px" };
const imgStyle = { width: "100%", height: "auto", display: "block", pointerEvents: "none" };

const gotItBtnStyle = {
  position: "absolute",
  cursor: "pointer",
  background: "transparent",
  border: "none",
  outline: "none",
  pointerEvents: "all",
  color: "transparent",
  fontSize: "0.6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const variantConfig = {
  fullscreen: {
    src: "/images/fullscreensvg.svg",
    btn: { left: "59%", top: "53%", width: "49%", height: "11%" },
  },
  comingsoon: {
    src: "/images/comingsoonsvg.svg",
    btn: { left: "63%", top: "79%", width: "32%", height: "15%" },
  },
};

export default function ComingSoon({ show, onClose, variant = "fullscreen" }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const innerTimeout = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    return () => {
      if (innerTimeout.current) clearTimeout(innerTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!show) return;
    setExiting(false);
    setVisible(true);
    playTing();
    const t = setTimeout(() => {
      setExiting(true);
      innerTimeout.current = setTimeout(() => {
        setVisible(false);
        setExiting(false);
        onCloseRef.current();
      }, 300);
    }, 7700);
    return () => {
      clearTimeout(t);
      if (innerTimeout.current) clearTimeout(innerTimeout.current);
    };
  }, [show]);

  const handleClose = useCallback(() => {
    setExiting(true);
    if (innerTimeout.current) clearTimeout(innerTimeout.current);
    innerTimeout.current = setTimeout(() => {
      setVisible(false);
      setExiting(false);
      onCloseRef.current();
    }, 300);
  }, []);

  const wrapperStyle = useMemo(() => ({
    ...overlayStyle,
    opacity: exiting ? 0 : 1,
    transform: exiting ? "translateY(20px) scale(0.95)" : "translateY(0) scale(1)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  }), [exiting]);

  const config = variantConfig[variant] || variantConfig.fullscreen;
  const resolvedBtnStyle = useMemo(() => ({ ...gotItBtnStyle, ...config.btn }), [variant]);

  if (!visible) return null;

  return (
    <div style={wrapperStyle}>
      <div style={imgWrapperStyle}>
        <img draggable={false} src={config.src} alt="Best viewed fullscreen" style={imgStyle} loading="lazy" />
        <ScrambleText as="div" text="GOT IT" onClick={handleClose} style={resolvedBtnStyle} />
      </div>
    </div>
  );
}
