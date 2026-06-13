"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";

interface ResizablePanelsProps {
  left: React.ReactNode;
  children: React.ReactNode;
  right: React.ReactNode;
  defaultLeftWidth?: number;
  defaultRightWidth?: number;
}

export function ResizablePanels({
  left,
  children,
  right,
  defaultLeftWidth = 260,
  defaultRightWidth = 220,
}: ResizablePanelsProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [rightWidth, setRightWidth] = useState(defaultRightWidth);
  const [dragging, setDragging] = useState<"left" | "right" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback((panel: "left" | "right") => {
    setDragging(panel);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (dragging === "left") {
        const newWidth = Math.min(Math.max(e.clientX - rect.left, 180), 360);
        setLeftWidth(newWidth);
      } else if (dragging === "right") {
        const newWidth = Math.min(Math.max(rect.right - e.clientX, 160), 300);
        setRightWidth(newWidth);
      }
    };

    const onMouseUp = () => setDragging(null);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "relative",
        userSelect: dragging ? "none" : "auto",
      }}
    >
      {/* Left Panel */}
      <div style={{ width: leftWidth, flexShrink: 0, overflow: "hidden" }}>
        {left}
      </div>

      {/* Left resize handle */}
      <div
        onMouseDown={() => onMouseDown("left")}
        style={{
          width: 5,
          cursor: "col-resize",
          background: dragging === "left" ? "#333" : "transparent",
          flexShrink: 0,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 2,
            width: 1,
            background: dragging === "left" ? "#555" : "#222",
            transition: dragging ? "none" : "background 0.15s ease",
          }}
        />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, minWidth: 0, overflow: "auto" }}>
        {children}
      </div>

      {/* Right resize handle */}
      <div
        onMouseDown={() => onMouseDown("right")}
        style={{
          width: 5,
          cursor: "col-resize",
          background: dragging === "right" ? "#333" : "transparent",
          flexShrink: 0,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 2,
            width: 1,
            background: dragging === "right" ? "#555" : "#222",
            transition: dragging ? "none" : "background 0.15s ease",
          }}
        />
      </div>

      {/* Right Panel */}
      <div style={{ width: rightWidth, flexShrink: 0, overflow: "hidden" }}>
        {right}
      </div>
    </div>
  );
}
