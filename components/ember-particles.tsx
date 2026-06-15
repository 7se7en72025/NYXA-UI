"use client";

import React, { useMemo } from "react";

interface EmberParticle {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  color: string;
}

export function EmberParticles() {
  const particles = useMemo(() => {
    const left: EmberParticle[] = [];
    const right: EmberParticle[] = [];
    const colors = ["#ff4500", "#ff6b2b", "#ff8c42", "#ffb366", "#ffd700", "#ff3300"];

    for (let i = 0; i < 40; i++) {
      const p: EmberParticle = {
        x: Math.random() * 120 - 60,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 3,
        drift: (Math.random() - 0.5) * 80,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      left.push(p);
      right.push({ ...p, x: -p.x, drift: -p.drift, delay: p.delay + 0.5 });
    }
    return { left, right };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ember-float {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) scale(1);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
            transform: translateY(-300px) translateX(var(--drift)) scale(0.3);
          }
        }

        .ember-cluster {
          position: absolute;
          top: 0;
          width: 150px;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .ember-cluster--left {
          left: -20px;
        }

        .ember-cluster--right {
          right: -20px;
        }

        .ember-particle {
          position: absolute;
          bottom: 0;
          border-radius: 50%;
          animation: ember-float var(--dur) ease-out infinite;
          animation-delay: var(--delay);
          --drift: 0px;
        }

        @media (max-width: 768px) {
          .ember-cluster {
            width: 80px;
            opacity: 0.5;
          }
        }
      `}} />

      <div className="ember-cluster ember-cluster--left">
        {particles.left.map((p, i) => (
          <div
            key={`l-${i}`}
            className="ember-particle"
            style={{
              left: `${50 + p.x * 0.5}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              "--drift": `${p.drift}px`,
              "--delay": `${p.delay}s`,
              "--dur": `${p.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="ember-cluster ember-cluster--right">
        {particles.right.map((p, i) => (
          <div
            key={`r-${i}`}
            className="ember-particle"
            style={{
              left: `${50 + p.x * 0.5}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              "--drift": `${p.drift}px`,
              "--delay": `${p.delay}s`,
              "--dur": `${p.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
