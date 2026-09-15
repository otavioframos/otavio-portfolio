'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { associateRegions, detectRegions, flowField, type Track } from '@/lib/flow-tracking';

export function LiquidStudy({ lang }: { lang: 'en' | 'pt' }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const syncRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const pt = lang === 'pt';

  useEffect(() => {
    const host = hostRef.current, canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const texture = document.createElement('canvas');
    const tx = texture.getContext('2d', { alpha: false });
    if (!ctx || !tx) return;
    const columns = 112, rows = 124;
    texture.width = columns; texture.height = rows;
    const pixels = tx.createImageData(columns, rows);
    const field = new Float32Array(columns * rows);
    const motion = { x: 0.5, y: 0.5 };
    const xTo = gsap.quickTo(motion, 'x', { duration: 1, ease: 'power3.out' });
    const yTo = gsap.quickTo(motion, 'y', { duration: 1, ease: 'power3.out' });
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false, running = false, elapsed = 0, phase = 3.7, counter = 100;
    let tracks: Track[] = [];
    let width = 1, height = 1, ratio = 1, frame = 0;

    const render = (advance = false) => {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          field[y * columns + x] = flowField(x / columns, y / rows, phase, motion.x, motion.y);
        }
      }
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const index = y * columns + x, value = field[index];
          const dx = field[y * columns + Math.min(x + 1, columns - 1)] - field[y * columns + Math.max(x - 1, 0)];
          const dy = field[Math.min(y + 1, rows - 1) * columns + x] - field[Math.max(y - 1, 0) * columns + x];
          const normal = 1 / Math.sqrt(dx * dx * 1100 + dy * dy * 1100 + 1);
          const light = Math.max(0, (-dx * 24 - dy * 30 + 0.7) * normal);
          const highlight = Math.pow(Math.max(0, light - 0.15), 7) * 0.18;
          const ridge = Math.exp(-Math.pow((value - 0.61) * 34, 2)) * 0.27;
          const shade = Math.min(1, 0.07 + value * 0.23 + light * 0.28 + highlight + ridge);
          const vignette = 1 - 0.25 * Math.hypot(x / columns - 0.5, y / rows - 0.5);
          const offset = index * 4;
          pixels.data[offset] = Math.min(255, shade * 238 * vignette);
          pixels.data[offset + 1] = Math.min(255, shade * 239 * vignette);
          pixels.data[offset + 2] = Math.min(255, shade * 212 * vignette);
          pixels.data[offset + 3] = 255;
        }
      }
      tx.putImageData(pixels, 0, 0);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(texture, 0, 0, width, height);

      // Marching-square edge intersections trace the same threshold as the boxes.
      ctx.lineWidth = 0.55;
      ctx.strokeStyle = 'rgba(210, 231, 153, .48)';
      ctx.beginPath();
      const threshold = 0.73;
      for (let y = 0; y < rows - 2; y += 2) {
        for (let x = 0; x < columns - 2; x += 2) {
          const corners = [field[y * columns + x], field[y * columns + x + 2], field[(y + 2) * columns + x + 2], field[(y + 2) * columns + x]];
          if (corners.every(v => v < threshold) || corners.every(v => v >= threshold)) continue;
          const positions = [[x, y], [x + 2, y], [x + 2, y + 2], [x, y + 2]];
          const crossings: number[][] = [];
          for (let e = 0; e < 4; e++) {
            const next = (e + 1) % 4;
            if ((corners[e] < threshold) === (corners[next] < threshold)) continue;
            const t = (threshold - corners[e]) / (corners[next] - corners[e]);
            crossings.push([(positions[e][0] + (positions[next][0] - positions[e][0]) * t) / columns * width,
              (positions[e][1] + (positions[next][1] - positions[e][1]) * t) / rows * height]);
          }
          for (let e = 0; e + 1 < crossings.length; e += 2) {
            ctx.moveTo(crossings[e][0], crossings[e][1]); ctx.lineTo(crossings[e + 1][0], crossings[e + 1][1]);
          }
        }
      }
      ctx.stroke();
      if (advance || tracks.length === 0) tracks = associateRegions(detectRegions(field, columns, rows), tracks, () => ++counter);

      // A restrained network connects nearby measured region centroids.
      ctx.strokeStyle = 'rgba(219, 232, 191, .22)'; ctx.lineWidth = 0.6; ctx.beginPath();
      tracks.forEach((track, i) => {
        const near = tracks.slice(i + 1).find(other => Math.hypot(other.cx - track.cx, other.cy - track.cy) < 0.28);
        if (near) { ctx.moveTo(track.cx * width, track.cy * height); ctx.lineTo(near.cx * width, near.cy * height); }
      });
      ctx.stroke();
      tracks.forEach((track, i) => {
        const bx = track.x * width, by = track.y * height, bw = track.width * width, bh = track.height * height;
        ctx.lineWidth = 0.7; ctx.strokeStyle = i < 3 ? '#c8f0bb' : 'rgba(212, 235, 193, .65)';
        ctx.strokeRect(bx, by, bw, bh);
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + bw, by + bh); ctx.strokeStyle = 'rgba(212, 235, 193, .24)'; ctx.stroke();
        ctx.fillStyle = '#ff7547';
        ctx.beginPath(); ctx.arc(track.cx * width, track.cy * height, 2, 0, Math.PI * 2); ctx.fill();
        if (i < 4) {
          ctx.strokeStyle = 'rgba(255, 117, 71, .85)'; ctx.lineWidth = 1.1; ctx.beginPath();
          track.trail.forEach((p, j) => { if (j === 0) ctx.moveTo(p.x * width, p.y * height); else ctx.lineTo(p.x * width, p.y * height); });
          ctx.stroke();
        }
        const label = `${track.id}  ${Math.round(track.cx * 1000)},${Math.round(track.cy * 1000)}`;
        ctx.font = '9px monospace';
        const labelWidth = ctx.measureText(label).width + 7;
        const lx = Math.max(2, Math.min(bx, width - labelWidth - 2));
        const ly = Math.max(12, by - 3);
        ctx.fillStyle = 'rgba(16, 23, 20, .78)'; ctx.fillRect(lx - 2, ly - 10, labelWidth, 13);
        ctx.fillStyle = '#e3efd4'; ctx.fillText(label, lx + 1, ly);
      });
      ctx.fillStyle = 'rgba(16, 23, 20, .8)'; ctx.fillRect(12, height - 30, 153, 18);
      ctx.fillStyle = '#d9e5c9'; ctx.font = '9px monospace';
      ctx.fillText(`REGIONS ${String(tracks.length).padStart(2, '0')}  /  T ${phase.toFixed(2)}`, 18, height - 18);
    };
    const tick = (_time: number, delta: number) => {
      elapsed += delta;
      if (elapsed < 1000 / 24) return;
      phase += Math.min(elapsed, 90) / 1000;
      elapsed = 0; frame++;
      render(frame % 2 === 0);
    };
    const sync = () => {
      const active = visible && !document.hidden && !media.matches && !pausedRef.current;
      if (active && !running) gsap.ticker.add(tick);
      if (!active && running) gsap.ticker.remove(tick);
      running = active;
      if (!active) { xTo.tween.pause(); yTo.tween.pause(); }
    };
    syncRef.current = sync;
    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width); height = Math.max(1, bounds.height);
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      render();
    };
    const move = (event: PointerEvent) => {
      if (!running || event.pointerType === 'touch') return;
      const bounds = host.getBoundingClientRect();
      xTo(gsap.utils.clamp(0, 1, (event.clientX - bounds.left) / bounds.width));
      yTo(gsap.utils.clamp(0, 1, (event.clientY - bounds.top) / bounds.height));
    };
    const leave = () => { if (running) { xTo(0.5); yTo(0.5); } };
    const preference = () => { setReduced(media.matches); sync(); render(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(host); sizeObserver.observe(host);
    host.addEventListener('pointermove', move, { passive: true });
    host.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', sync);
    media.addEventListener('change', preference);
    preference(); resize(); setReady(true);
    return () => {
      syncRef.current = null;
      observer.disconnect(); sizeObserver.disconnect();
      gsap.ticker.remove(tick); gsap.killTweensOf(motion);
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', sync);
      media.removeEventListener('change', preference);
    };
  }, []);

  return <figure className="liquid-study tracking-study">
    <div className="study-topline"><span>BLOB TRACKING / 001</span><span aria-hidden="true">↙</span></div>
    <div ref={hostRef} className="liquid-stage" data-ready={ready}>
      <svg className="tracking-fallback" viewBox="0 0 400 440" aria-hidden="true">
        <path d="M-30 60C170-40 80 200 300 60S220 240 440 190M-20 190C170 40 120 370 420 250M-10 310C180 170 130 490 430 350" fill="none" stroke="#657567" strokeWidth="48"/>
        <path d="M-30 60C170-40 80 200 300 60S220 240 440 190M-20 190C170 40 120 370 420 250M-10 310C180 170 130 490 430 350" fill="none" stroke="#cee4b2" strokeWidth="1"/>
        <g fill="none" stroke="#c8f0bb" strokeWidth="1"><rect x="45" y="70" width="72" height="85"/><rect x="210" y="175" width="90" height="60"/><rect x="90" y="285" width="70" height="90"/><path d="M80 110L255 205L125 330"/></g>
        <g fill="#ff7547"><circle cx="80" cy="110" r="3"/><circle cx="255" cy="205" r="3"/><circle cx="125" cy="330" r="3"/></g>
      </svg>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
    <figcaption className="study-caption">
      <div><span>{pt ? 'Um estudo de fluxo e rastreamento.' : 'A study in flow and tracking.'}</span><p className="study-pointer-hint">{pt ? 'Mova o cursor para alterar o fluxo' : 'Move your cursor to shift the flow'}</p></div>
      {ready && !reduced && <button type="button" aria-label={paused ? (pt ? 'Retomar animação' : 'Resume animation') : (pt ? 'Pausar animação' : 'Pause animation')} onClick={() => {
        pausedRef.current = !pausedRef.current; setPaused(pausedRef.current); syncRef.current?.();
      }}>{paused ? '▶' : 'Ⅱ'}</button>}
    </figcaption>
  </figure>;
}
