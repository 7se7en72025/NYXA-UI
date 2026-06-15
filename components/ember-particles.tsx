"use client";

import React, { useMemo } from "react";

interface EmberParticle {
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  color: string;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function EmberParticles() {
  const particles = useMemo(() => {
    const count = 16;
    const left: EmberParticle[] = [];
    const right: EmberParticle[] = [];
    const colors = ["#ff4500", "#ff6b2b", "#ff8c42", "#ffb366", "#ffd700", "#ff3300"];

    for (let i = 0; i < count; i++) {
      const seed = i * 7.31;
      const p: EmberParticle = {
        x: seededRandom(seed) * 120 - 60,
        size: seededRandom(seed + 1) * 3 + 1,
        delay: seededRandom(seed + 2) * 5,
        duration: seededRandom(seed + 3) * 4 + 4,
        drift: (seededRandom(seed + 4) - 0.5) * 60,
        color: colors[Math.floor(seededRandom(seed + 5) * colors.length)],
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
          0% { opacity: 0; transform: translateY(0) translateX(0) scale(1); }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(-280px) translateX(var(--d)) scale(0.2); }
        }
        .ember-cluster {
          position: absolute; top: 0; width: 140px; height: 100%;
          pointer-events: none; z-index: 2;
          will-change: transform;
        }
        .ember-cluster--left { left: -20px; }
        .ember-cluster--right { right: -20px; }
        .ember-dot {
          position: absolute; bottom: 0; border-radius: 50%;
          will-change: transform, opacity;
          animation: ember-float var(--dur) ease-out infinite;
          animation-delay: var(--del);
        }
      `}} />
      <div className="ember-cluster ember-cluster--left">
        {particles.left.map((p, i) => (
          <div
            key={i}
            className="ember-dot"
            style={{
              left: `${50 + p.x * 0.5}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              "--d": `${p.drift}px`,
              "--del": `${p.delay}s`,
              "--dur": `${p.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="ember-cluster ember-cluster--right">
        {particles.right.map((p, i) => (
          <div
            key={i}
            className="ember-dot"
            style={{
              left: `${50 + p.x * 0.5}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              "--d": `${p.drift}px`,
              "--del": `${p.delay}s`,
              "--dur": `${p.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
