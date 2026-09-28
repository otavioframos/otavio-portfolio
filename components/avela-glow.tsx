'use client';

import { useEffect, useRef } from 'react';

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);
const CELL = 3;
const SIZE = 540;

/** Peaks around the rim; each one pushes out and pulls back into the circle on its own rhythm. */
const PEAKS = Array.from({ length: 7 }, (_, i) => ({
  angle: (i / 7) * Math.PI * 2 + Math.sin(i * 7.3) * 0.4,
  reach: 0.1 + ((i * 37) % 10) / 60,
  width: 0.16 + ((i * 13) % 5) / 40,
  speed: 0.35 + ((i * 29) % 7) / 20,
  phase: i * 1.7,
}));

/**
 * Avela's glow: concentric dithered rings whose rim morphs like a blob, peaks
 * swelling outward and sinking back inside. Drawn on a canvas at 3px dots,
 * only while on screen; reduced motion gets a single still frame.
 */
export function AvelaGlow({ color = 'rgb(120,176,160)', className = 'art-avela-dither' }: { color?: string; className?: string } = {}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const half = SIZE / 2;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = color;
      const breath = 0.5 + 0.5 * Math.sin(t * 0.6);
      for (let y = 0; y < SIZE; y += CELL) for (let x = 0; x < SIZE; x += CELL) {
        const dx = x - half, dy = y - half;
        const r = Math.hypot(dx, dy) / half;
        if (r > 1) continue;
        const a = Math.atan2(dy, dx);
        let rim = 0.74 + 0.04 * breath + 0.03 * Math.sin(a * 3 + t * 0.4);
        for (const p of PEAKS) {
          let d = Math.abs(a - p.angle);
          d = Math.min(d, Math.PI * 2 - d);
          // Positive swell pushes the rim out; negative pulls it inside the circle.
          rim += p.reach * Math.sin(t * p.speed + p.phase) * Math.exp(-(d * d) / (p.width * p.width));
        }
        const core = Math.max(0, 1 - r / rim);
        if (core <= 0) continue;
        const rings = 0.5 + 0.5 * Math.cos((r / rim) * Math.PI * 7 - t * 0.8);
        const v = core ** 1.1 * (0.5 + 0.5 * rings);
        if (v > BAYER[((y / CELL) % 4) * 4 + ((x / CELL) % 4)]) ctx.fillRect(x, y, CELL - 1, CELL - 1);
      }
    };

    if (reduced) { draw(0); return; }
    let frame = 0, visible = false, last = 0;
    const start = performance.now();
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < 1000 / 30) return;
      last = now;
      draw((now - start) / 1000);
    };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);
    draw(0);
    frame = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(frame); io.disconnect(); };
  }, [color]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
