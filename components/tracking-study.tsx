'use client';

import { useEffect, useRef } from 'react';

export type TrackingSettings = {
  speed: number;
  lockTime: number;
  squares: number;
  permanence: number;
  lineWidth: number;
  stability: number;
};

type Point = { x: number; y: number };

/** A small, deterministic motion-tracking sketch for the playground. */
export function TrackingStudy({ settings }: { settings: TrackingSettings }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef(settings);
  useEffect(() => { settingsRef.current = settings; }, [settings]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const image = new Image();
    image.src = '/images/meadow.jpg';
    let frame = 0;
    let width = 0;
    let height = 0;
    let time = 0;
    let reduced = false;
    const trails: Point[][] = Array.from({ length: 8 }, () => []);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = () => {
      const current = settingsRef.current;
      time += .016 * (.25 + current.speed / 100 * 2);
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#101413';
      context.fillRect(0, 0, width, height);
      if (image.complete && image.naturalWidth) {
        context.save();
        context.globalAlpha = .34;
        const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
        const iw = image.naturalWidth * scale, ih = image.naturalHeight * scale;
        context.drawImage(image, (width - iw) / 2, (height - ih) / 2, iw, ih);
        context.restore();
      }
      const count = Math.max(1, Math.min(8, Math.round(current.squares)));
      const trailLength = Math.max(2, Math.round(3 + current.permanence / 100 * 44));
      const jitter = (1 - current.stability / 100) * 16;
      for (let i = 0; i < count; i += 1) {
        const phase = i * .91;
        const progress = (time * (.22 + i * .015) + i * .17) % 1;
        const x = width * (.08 + progress * .84) + Math.sin(time * 1.7 + phase) * jitter;
        const y = height * (.27 + .42 * ((Math.sin(progress * Math.PI * 2 + phase) + 1) / 2)) + Math.cos(time * 1.4 + phase) * jitter * .55;
        const trail = trails[i];
        trail.push({ x, y });
        while (trail.length > trailLength) trail.shift();
        if (trail.length > 1) {
          context.beginPath();
          trail.forEach((point, pointIndex) => pointIndex === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y));
          context.strokeStyle = i % 2 ? '#79d7a2a8' : '#ff624cb0';
          context.lineWidth = Math.max(1, current.lineWidth);
          context.lineJoin = 'round';
          context.stroke();
        }
        const locked = ((time * (.15 + current.speed / 300) + i * .37) % 1) > 1 - current.lockTime / 100 * .42;
        const size = locked ? 34 : 28;
        context.strokeStyle = locked ? '#ff624c' : '#79d7a2';
        context.lineWidth = 1;
        context.strokeRect(x - size / 2, y - size / 2, size, size);
        context.fillStyle = locked ? '#ff624c' : '#d6e4d9';
        context.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
        context.fillText(`${String(101 + i).padStart(3, '0')} / ${Math.round(x)},${Math.round(y)}`, x + size / 2 + 6, y - size / 2 + 4);
      }
      if (!reduced) frame = window.requestAnimationFrame(draw);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced = media.matches;
    resize();
    draw();
    return () => { observer.disconnect(); window.cancelAnimationFrame(frame); };
  }, []);

  return <canvas ref={canvasRef} className="tracking-study-canvas" aria-label="Animated motion tracking study"/>;
}
