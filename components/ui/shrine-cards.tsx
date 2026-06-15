"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";

export interface ShrineCard {
  id: string;
  label: string;
}

export interface ShrineCardsProps {
  cards: ShrineCard[];
  defaultActiveIndex?: number;
  height?: number;
  expandedWidth?: number;
  collapsedWidth?: number;
  accentColor?: string;
  className?: string;
  onCardHover?: (id: string | null) => void;
}

export const ShrineCards = memo(function ShrineCards({
  cards,
  defaultActiveIndex = -1,
  height = 340,
  expandedWidth = 260,
  collapsedWidth = 80,
  accentColor = "160,0,255",
  className,
  onCardHover,
}: ShrineCardsProps) {
  const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex);
  const isMobile = false;

  const handleMouseEnter = React.useCallback(
    (index: number) => {
      setActiveIndex(index);
      onCardHover?.(cards[index]?.id ?? null);
    },
    [cards, onCardHover]
  );

  const handleMouseLeave = React.useCallback(() => {
    setActiveIndex(defaultActiveIndex);
    onCardHover?.(null);
  }, [defaultActiveIndex, onCardHover]);

  const handleTouchStart = React.useCallback(
    (index: number) => {
      setActiveIndex((prev) => (prev === index ? -1 : index));
      onCardHover?.(cards[index]?.id ?? null);
    },
    [cards, onCardHover]
  );

  return (
    <div
      className={cn(
        "flex items-center justify-center w-full",
        isMobile ? "flex-col gap-3" : "flex-row",
        className
      )}
      style={{ maxWidth: isMobile ? 400 : 1100, margin: "0 auto", gap: isMobile ? 12 : 4 }}
      onMouseLeave={handleMouseLeave}
    >
      {cards.map((card, i) => {
        const isActive = i === activeIndex;
        const svgIndex = (i % 7) + 1;

        return (
          <div
            key={card.id}
            className={cn(
              "shrink-0 cursor-pointer relative overflow-hidden",
              !isMobile && "transition-[width] duration-[500ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            )}
            style={{
              width: isMobile ? "100%" : isActive ? expandedWidth : collapsedWidth,
              height: isMobile ? (isActive ? 280 : 120) : height,
            }}
            onMouseEnter={() => handleMouseEnter(i)}
            onTouchStart={() => handleTouchStart(i)}
          >
            <div
              className="pointer-events-none absolute -inset-1 z-30"
              style={{
                filter: isActive
                  ? `drop-shadow(0 0 12px rgba(${accentColor},0.5)) drop-shadow(0 0 24px rgba(${accentColor},0.25))`
                  : "none",
                transition: "filter 0.4s ease",
              }}
            />

            <div
              className="pointer-events-none absolute inset-0 z-20 h-full w-full"
              style={{ opacity: isActive ? 0 : 1, transition: "opacity 0.35s ease" }}
            >
              <img
                src={`/shrine-cards/shrinecard${svgIndex}.svg`}
                alt={card.label}
                draggable={false}
                loading={i > 1 ? "lazy" : "eager"}
                decoding="async"
                className="h-full w-full object-contain"
              />
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-20 h-full w-full"
              style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.35s ease 0.1s" }}
            >
              <img
                src="/shrine-cards/shrinecardexpanded.svg"
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </div>

            <div
              className="pointer-events-none absolute bottom-[5%] z-50 whitespace-nowrap text-sm font-semibold tracking-wider"
              style={{
                fontFamily: "inherit",
                color: "rgba(255,255,255,0.95)",
                left: "46%",
                transform: `translateX(-50%) translateY(${isActive ? "0" : "10px"})`,
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s",
              }}
            >
              <span className="opacity-50">[</span>
              {card.label}
              <span className="opacity-50">]</span>
            </div>

            {!isMobile && (
              <div
                className="pointer-events-none absolute bottom-[3.5%] left-1/2 z-50 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full"
                style={{
                  border: "1px solid rgba(0,220,200,0.2)",
                  background: "rgba(0,0,0,0.2)",
                  color: "rgba(0,220,200,0.35)",
                  opacity: isActive ? 0 : 0.5,
                  transition: "opacity 0.2s ease",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7,7 17,7 17,17" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

export default ShrineCards;
