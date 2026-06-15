"use client";

import React, { useRef, useState, useEffect } from "react";

export function LazySection({
  children,
  className,
  style,
  minHeight = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        minHeight: visible ? undefined : minHeight,
      }}
    >
      {visible ? children : null}
    </div>
  );
}
