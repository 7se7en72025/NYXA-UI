import { useState, useEffect, useCallback, useMemo, memo } from "react";
import SearchBar from "./SearchBar";
import ComingSoon from "./ComingSoon";
import ScrambleText from "./ScrambleText";
import { isFullscreen } from "@utils/isFullscreen";

const navbarContainerStyle = {
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%) scale(0.9)",
  zIndex: 20,
  width: "100%",
  maxWidth: "706px",
  pointerEvents: "none",
};

const navbarInnerStyle = { position: "relative", width: "100%", aspectRatio: "882 / 292" };
const navbarImgStyle = { width: "100%", height: "100%", display: "block", pointerEvents: "none" };

const searchAreaStyle = {
  position: "absolute",
  left: "19.16%",
  top: "24.66%",
  width: "63.04%",
  height: "28.77%",
  pointerEvents: "all",
};

const scrambleBtnBase = {
  position: "absolute",
  cursor: "pointer",
  background: "transparent",
  border: "none",
  outline: "none",
  pointerEvents: "all",
  fontFamily: "'Orbitron', sans-serif",
  fontSize: "9px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  color: "transparent",
  transition: "color 0.15s ease",
};

const templatesBtnStyle = { ...scrambleBtnBase, left: "21.9%", top: "3.1%", width: "18.7%", height: "11.3%" };
const docsBtnStyle = { ...scrambleBtnBase, left: "64.6%", top: "3.1%", width: "9.6%", height: "11.3%" };
const githubBtnStyle = { ...scrambleBtnBase, left: "37.8%", top: "80.5%", width: "23.2%", height: "12.5%", fontSize: "8px" };

function TopNavbarInner() {
  const [ready, setReady] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  const handleFullscreenChange = useCallback(() => {
    if (!isFullscreen()) setShowComingSoon(true);
  }, []);

  useEffect(() => {
    if (!isFullscreen()) {
      const t = setTimeout(() => setShowComingSoon(true), 1500);
      return () => clearTimeout(t);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  const handleGithub = useCallback(() => {
    window.open("https://github.com/7se7en72025/NYXA-UI", "_blank");
  }, []);

  const handleOpenCS = useCallback(() => setShowComingSoon(true), []);
  const handleCloseCS = useCallback(() => setShowComingSoon(false), []);

  const navStyle = useMemo(() => ({
    ...navbarContainerStyle,
    opacity: ready ? 1 : 0,
    animation: ready ? "hudEntry 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none",
  }), [ready]);

  return (
    <>
      <ComingSoon show={showComingSoon} onClose={handleCloseCS} />

      <div style={navStyle}>
        <div style={navbarInnerStyle}>
          <img draggable={false} src="/images/topnavbarhome.svg" alt="NYXA UI Navigation" style={navbarImgStyle} />

          <div style={searchAreaStyle}>
            <SearchBar />
          </div>

          <ScrambleText text="TEMPLATES" style={templatesBtnStyle} onClick={handleOpenCS} />
          <ScrambleText text="DOCS" style={docsBtnStyle} onClick={handleOpenCS} />
          <ScrambleText text="VIEW GITHUB" style={githubBtnStyle} onClick={handleGithub} />
        </div>
      </div>
    </>
  );
}

export default memo(TopNavbarInner);
