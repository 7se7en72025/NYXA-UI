"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";

interface ResizablePanelsProps {
  left: React.ReactNode;
  children: React.ReactNode;
  defaultLeftWidth?: number;
}

export function ResizablePanels({
  left,
  children,
  defaultLeftWidth = 260,
}: ResizablePanelsProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [dragging, setDragging] = useState<"left" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(() => {
    setDragging("left");
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = Math.min(Math.max(e.clientX - rect.left, 180), 360);
      setLeftWidth(newWidth);
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
      <div className="docs-sidebar-panel" style={{ width: leftWidth, flexShrink: 0, overflow: "auto", height: "100%" }}>
        {left}
      </div>

      {/* Left resize handle */}
      <div
        className="docs-resize-handle"
        onMouseDown={onMouseDown}
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
      <div style={{ flex: 1, minWidth: 0, overflow: "auto", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}
