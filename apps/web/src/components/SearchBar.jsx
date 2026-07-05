import { memo } from "react";
import { useEffect, useRef } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: "0 28px 0 52px",
  pointerEvents: "all",
  userSelect: "none",
};

const svgStyle = { flexShrink: 0, marginRight: 10 };

const inputStyle = {
  flex: 1,
  background: "transparent",
  border: "none",
  outline: "none",
  color: "#9AF0F4",
  fontFamily: "'Orbitron', sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  letterSpacing: "0.02em",
  userSelect: "text",
  WebkitUserSelect: "text",
  MozUserSelect: "text",
  msUserSelect: "text",
  pointerEvents: "all",
  cursor: "text",
  caretColor: "#9AF0F4",
};

const kbdStyle = {
  display: "flex",
  gap: "3px",
  padding: "3px 6px",
  background: "rgba(23, 41, 42, 0.8)",
  border: "1px solid #3eb9cc",
  borderRadius: "3px",
  fontSize: "12px",
  fontFamily: "'Orbitron', sans-serif",
  fontWeight: 400,
  color: "#9af0f4",
  flexShrink: 0,
  marginRight: "24px",
  lineHeight: 1,
};

function SearchBarInner() {
  const inputRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div style={containerStyle}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9AF0F4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={svgStyle}
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <label htmlFor="site-search" className="sr-only">
        Search documentation
      </label>
      <input
        ref={inputRef}
        id="site-search"
        type="text"
        placeholder="SEARCH DOCS"
        aria-label="Search documentation"
        style={inputStyle}
      />

      <kbd style={kbdStyle} aria-hidden="true">
        <span>{"\u2318"}</span>
        <span>K</span>
      </kbd>
    </div>
  );
}

export default memo(SearchBarInner);
