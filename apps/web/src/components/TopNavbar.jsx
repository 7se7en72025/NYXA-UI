import { isFullscreen } from "@utils/isFullscreen";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import ComingSoon from "./ComingSoon";
import ScrambleText from "./ScrambleText";
import SearchBar from "./SearchBar";

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

const navbarInnerStyle = {
  position: "relative",
  width: "100%",
  aspectRatio: "882 / 292",
};
const navbarImgStyle = {
  width: "100%",
  height: "100%",
  display: "block",
  pointerEvents: "none",
};

const searchAreaStyle = {
  position: "absolute",
  left: "25%",
  top: "28%",
  width: "50%",
  height: "20%",
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

const templatesBtnStyle = {
  ...scrambleBtnBase,
  left: "21%",
  top: "6%",
  width: "22%",
  height: "18%",
};
const docsBtnStyle = {
  ...scrambleBtnBase,
  left: "60%",
  top: "6%",
  width: "14%",
  height: "18%",
};
const githubBtnStyle = {
  ...scrambleBtnBase,
  left: "47%",
  top: "57%",
  width: "8%",
  height: "12%",
  fontSize: "0px",
};
const exploreBtnStyle = {
  ...scrambleBtnBase,
  left: "37%",
  top: "79%",
  width: "26%",
  height: "14%",
};

function TopNavbarInner() {
  const [ready, setReady] = useState(false);
  const [csVariant, setCsVariant] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  const handleFullscreenChange = useCallback(() => {
    if (!isFullscreen()) setCsVariant("fullscreen");
  }, []);

  useEffect(() => {
    if (!isFullscreen()) {
      const t = setTimeout(() => setCsVariant("fullscreen"), 1500);
      return () => clearTimeout(t);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
    };
  }, [handleFullscreenChange]);

  const handleGithub = useCallback(() => {
    window.open("https://github.com/7se7en72025/NYXA-UI", "_blank");
  }, []);

  const handleOpenCS = useCallback(() => setCsVariant("comingsoon"), []);
  const handleCloseCS = useCallback(() => setCsVariant(null), []);

  const navStyle = useMemo(
    () => ({
      ...navbarContainerStyle,
      opacity: ready ? 1 : 0,
      animation: ready
        ? "hudEntry 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        : "none",
    }),
    [ready],
  );

  return (
    <>
      {csVariant && (
        <ComingSoon show={true} onClose={handleCloseCS} variant={csVariant} />
      )}

      <div style={navStyle}>
        <div style={navbarInnerStyle}>
          <img
            draggable={false}
            src="/images/topnavbarhome.svg"
            alt="NYXA UI Navigation"
            style={navbarImgStyle}
          />

          <div style={searchAreaStyle}>
            <SearchBar />
          </div>

          <ScrambleText
            text="TEMPLATES"
            style={templatesBtnStyle}
            onClick={handleOpenCS}
          />
          <ScrambleText
            text="DOCS"
            style={docsBtnStyle}
            onClick={handleOpenCS}
          />
          <ScrambleText
            text="GITHUB"
            style={githubBtnStyle}
            onClick={handleGithub}
          />
          <ScrambleText
            text="EXPLORE BLOCKS"
            style={exploreBtnStyle}
            onClick={handleOpenCS}
          />
        </div>
      </div>
    </>
  );
}

export default memo(TopNavbarInner);
