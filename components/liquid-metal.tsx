"use client";

import { useState, useEffect, useRef, useCallback, memo, forwardRef } from "react";
import { LiquidMetal as LiquidMetalShader } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

export interface LiquidMetalProps {
  colorBack?: string;
  colorTint?: string;
  speed?: number;
  repetition?: number;
  distortion?: number;
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const LiquidMetal = memo(function LiquidMetal({
  colorBack = "#aaaaac",
  colorTint = "#ffffff",
  speed = 0.5,
  repetition = 4,
  distortion = 0.1,
  scale = 1,
  className,
  style,
}: LiquidMetalProps) {
  const [angle, setAngle] = useState(45);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setAngle(x * 360);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <div
      className={cn("absolute inset-0 z-0 overflow-hidden", className)}
      style={style}
    >
      <LiquidMetalShader
        colorBack={colorBack}
        colorTint={colorTint}
        speed={speed}
        repetition={repetition}
        distortion={distortion}
        softness={0}
        shiftRed={0.3}
        shiftBlue={-0.3}
        angle={angle}
        shape="none"
        scale={scale}
        fit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});

LiquidMetal.displayName = "LiquidMetal";

export interface LiquidMetalBadgeProps {
  children: React.ReactNode;
  metalConfig?: Omit<LiquidMetalProps, "className" | "style">;
  className?: string;
}

export const LiquidMetalBadge = forwardRef<
  HTMLDivElement,
  LiquidMetalBadgeProps
>(({ children, metalConfig, className, ...props }, ref) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const updateTheme = () => {
      const html = document.documentElement;
      const currentTheme = html.getAttribute("data-theme") as "dark" | "light";
      setTheme(currentTheme || "dark");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative inline-block", className)}
      style={{ zIndex: 10 }}
    >
      <div
        className="relative rounded-full overflow-hidden"
        style={{ padding: 3, background: theme === "dark" ? "#1a1a1a" : "#e0e0e0" }}
      >
        <LiquidMetal
          colorBack={metalConfig?.colorBack ?? (theme === "dark" ? "#1a1a1a" : "#e8e8e8")}
          colorTint={metalConfig?.colorTint ?? (theme === "dark" ? "#444" : "#fff")}
          speed={metalConfig?.speed ?? 0.3}
          repetition={metalConfig?.repetition ?? 3}
          distortion={metalConfig?.distortion ?? 0.1}
          scale={metalConfig?.scale ?? 1}
          className="absolute inset-0 z-0 rounded-full"
        />

        <div
          className={cn(
            "relative z-10 rounded-full flex items-center gap-2 px-4 py-2",
            "transition-colors duration-200",
            theme === "dark" ? "bg-[#0a0a0a]" : "bg-[#f5f5f5]"
          )}
        >
          <span
            className="text-sm font-medium"
            style={{
              fontFamily: "inherit",
              color: theme === "dark" ? "#888" : "#666",
            }}
          >
            {children}
          </span>
        </div>
      </div>
    </div>
  );
});

LiquidMetalBadge.displayName = "LiquidMetalBadge";

export default LiquidMetalBadge;
