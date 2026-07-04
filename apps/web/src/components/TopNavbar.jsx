import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ComingSoon from "./ComingSoon";

export default function TopNavbar() {
  const [ready, setReady] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <ComingSoon show={showComingSoon} onClose={() => setShowComingSoon(false)} />

      <div style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        width: "100%",
        maxWidth: "706px",
        pointerEvents: "none",
        opacity: ready ? 1 : 0,
        animation: ready ? "hudEntry 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none",
      }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "882 / 292" }}>
          <img
            draggable={false}
            src="/images/topnavbarhome.svg"
            alt="NYXA UI Navigation"
            style={{ width: "100%", height: "100%", display: "block", pointerEvents: "none" }}
          />

          <div style={{
            position: "absolute",
            left: "19.16%",
            top: "24.66%",
            width: "63.04%",
            height: "28.77%",
            pointerEvents: "all",
          }}>
            <SearchBar />
          </div>

          <button
            onClick={() => setShowComingSoon(true)}
            style={{
              position: "absolute",
              left: "21.9%",
              top: "3.1%",
              width: "18.7%",
              height: "11.3%",
              cursor: "pointer",
              background: "transparent",
              border: "none",
              outline: "none",
              pointerEvents: "all",
              color: "transparent",
              fontSize: "1rem",
            }}
          >
            TEMPLATES
          </button>

          <button
            onClick={() => setShowComingSoon(true)}
            style={{
              position: "absolute",
              left: "64.6%",
              top: "3.1%",
              width: "9.6%",
              height: "11.3%",
              cursor: "pointer",
              background: "transparent",
              border: "none",
              outline: "none",
              pointerEvents: "all",
              color: "transparent",
              fontSize: "1rem",
            }}
          >
            DOCS
          </button>

          <button
            onClick={() => window.open("https://github.com/7se7en72025/NYXA-UI", "_blank")}
            style={{
              position: "absolute",
              left: "38.2%",
              top: "80.9%",
              width: "22.6%",
              height: "12.2%",
              cursor: "pointer",
              background: "transparent",
              border: "none",
              outline: "none",
              pointerEvents: "all",
              color: "transparent",
              fontSize: "1rem",
            }}
          >
            VIEW GITHUB
          </button>
        </div>
      </div>
    </>
  );
}
