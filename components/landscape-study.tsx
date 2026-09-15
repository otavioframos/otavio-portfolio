'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { detectRegions, type Region } from '@/lib/flow-tracking';
import { scanMarker } from '@/lib/tracking-motion';
import { ditherMeadow } from '@/lib/dither';

export function LandscapeStudy({ lang }: { lang: 'en' | 'pt' }) {
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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const photo = new Image();
    const processed = document.createElement('canvas');
    const pointer = { x: 0, y: 0 };
    const xTo = gsap.quickTo(pointer, 'x', { duration: 1.2, ease: 'power3.out' });
    const yTo = gsap.quickTo(pointer, 'y', { duration: 1.2, ease: 'power3.out' });
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 1, height = 1, ratio = 1, phase = 0, elapsed = 0;
    let scanTop = 0, scanBottom = 1;
    let loaded = false, visible = false, running = false, disposed = false;
    let regions: Region[] = [];
    const history = new Map<number, {x:number;y:number}[]>();
    const wave = (y: number) => Math.sin(y * 9 + phase * 0.25) * 2.5;

    const draw = (advance = false) => {
      if (!loaded) return;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const scale = Math.max(width / photo.width, height / photo.height) * 1.035;
      const dw = photo.width * scale, dh = photo.height * scale;
      const ox = (width - dw) / 2 + pointer.x * 7;
      const oy = (height - dh) / 2 + pointer.y * 4;
      // A restrained displacement gives the still meadow a gentle sense of motion.
      // The tracking coordinates use the same mapping as the underlying image.
      ctx.imageSmoothingEnabled = false;
      const slices = 32, slice = processed.height / slices;
      for (let i = 0; i < slices; i++) {
        const sy = i * slice;
        ctx.drawImage(processed, 0, sy, processed.width, slice, ox + wave((sy + slice / 2) / processed.height), oy + sy / processed.height * dh, dw, dh / slices + 1);
      }
      const anchors = regions.map(r => ({
        x: ox + r.cx * dw + wave(r.cy), y: oy + r.cy * dh,
        width: r.width * dw, height: r.height * dh,
      })).filter(r => r.x > 30 && r.x < width - 30);
      // Prefer actual visible subjects: markers now settle onto flowers instead
      // of repositioned points in a generic scan band.
      const targets = anchors.filter(a => a.y > scanTop && a.y < scanBottom);
      if (!targets.length) targets.push(...anchors.filter(a => a.y > height * .48 && a.y < height - 45));
      const shown = Array.from({ length: Math.min(targets.length, width < 600 ? 3 : 5) }, (_, i) => {
        const marker = scanMarker(targets, i, phase)!;
        return { id: 101 + i, px: marker.x, py: marker.y,
          bx: marker.x - marker.width / 2, by: marker.y - marker.height / 2,
          bw: marker.width, bh: marker.height, locked: marker.locked };
      });
      ctx.lineWidth = .65;
      for (const region of shown) {
        const { id, px, py, bx, by, bw, bh } = region;
        ctx.strokeStyle = region.locked ? 'rgba(255, 98, 76, 1)' : 'rgba(236, 222, 199, .7)';
        ctx.strokeRect(bx, by, bw, bh);
        ctx.lineWidth = 1.6; ctx.beginPath();
        const corner = 6;
        ctx.moveTo(bx, by + corner); ctx.lineTo(bx, by); ctx.lineTo(bx + corner, by);
        ctx.moveTo(bx + bw - corner, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by + bh - corner);
        ctx.stroke(); ctx.lineWidth = .65;
        ctx.strokeStyle = 'rgba(207, 229, 191, .24)';
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + bw, by + bh); ctx.stroke();
        ctx.fillStyle = 'rgba(230, 235, 210, .92)';
        ctx.font = '10px monospace';
        const label = `${id} / ${Math.round(px)},${Math.round(py)}`;
        const tx = Math.min(width - ctx.measureText(label).width - 10, Math.max(10, bx));
        ctx.fillText(label, tx, Math.max(height * .43, by - 6));
        ctx.fillStyle = '#ff624c'; ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
        const trail = history.get(id) ?? [];
        if (advance) { trail.push({ x: px, y: py }); if (trail.length > 36) trail.shift(); history.set(id, trail); }
        ctx.strokeStyle = 'rgba(255, 98, 76, .65)'; ctx.beginPath();
        trail.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); }); ctx.stroke();
      }
      // Connect nearby flowers sparingly, keeping the center clear for the introduction.
      ctx.strokeStyle = 'rgba(207, 229, 191, .18)'; ctx.beginPath();
      shown.forEach((r, i) => {
        const next = shown.slice(i + 1).find(s => Math.hypot(s.px - r.px, s.py - r.py) < width * .23);
        if (next) { ctx.moveTo(r.px, r.py); ctx.lineTo(next.px, next.py); }
      }); ctx.stroke();
    };
    const tick = (_t: number, delta: number) => {
      elapsed += delta;
      if (elapsed < 1000 / 30) return;
      phase += Math.min(elapsed, 90) / 1000; elapsed = 0; draw(true);
    };
    const sync = () => {
      const active = loaded && visible && !document.hidden && !media.matches && !pausedRef.current;
      if (active && !running) gsap.ticker.add(tick);
      if (!active && running) gsap.ticker.remove(tick);
      running = active;
      if (!active) { xTo.tween.pause(); yTo.tween.pause(); }
    };
    syncRef.current = sync;
    const resize = () => {
      const bounds = host.getBoundingClientRect(); width = bounds.width; height = bounds.height;
      const hero = host.closest('.nature-hero');
      const intro = hero?.querySelector('.hero-intro')?.getBoundingClientRect();

      scanTop = Math.min(height - 100, (intro ? intro.bottom - bounds.top : height * .52) + 55);
      scanBottom = height - 55;
      host.style.setProperty('--scan-top', `${scanTop}px`);
      ratio = Math.min(window.devicePixelRatio || 1, 1.25, 1600 / Math.max(width, 1));
      canvas.width = Math.max(1, Math.round(width * ratio)); canvas.height = Math.max(1, Math.round(height * ratio));
      history.clear(); draw();
    };
    photo.onload = () => {
      if (disposed) return;
      const sample = document.createElement('canvas'); sample.width = 192; sample.height = 108;
      const sampleContext = sample.getContext('2d', { willReadFrequently: true });
      if (sampleContext) {
        sampleContext.drawImage(photo, 0, 0, 192, 108);
        const rgba = sampleContext.getImageData(0, 0, 192, 108).data;
        const field = new Float32Array(192 * 108);
        for (let y = 44; y < 108; y++) for (let x = 0; x < 192; x++) {
          const i = y * 192 + x, r = rgba[i * 4], g = rgba[i * 4 + 1], b = rgba[i * 4 + 2];
          const red = r > 35 && r > g * 1.5 && r > b * 1.35;
          const bloom = Math.min(r, g, b) > 100 && Math.max(r, g, b) - Math.min(r, g, b) < 45;
          field[i] = red || bloom ? 1 : 0;
        }
        regions = detectRegions(field, 192, 108);
      }
      processed.width = 512; processed.height = Math.round(512 * photo.height / photo.width);
      const print = processed.getContext('2d');
      if (!print) return;
      print.drawImage(photo, 0, 0, processed.width, processed.height);
      const printData = print.getImageData(0, 0, processed.width, processed.height);
      ditherMeadow(printData.data, processed.width); print.putImageData(printData, 0, 0);
      loaded = true; resize(); setReady(true); sync();
    };
    const move = (event: PointerEvent) => {
      if (!running || event.pointerType === 'touch') return;
      const b = host.getBoundingClientRect();
      xTo(gsap.utils.clamp(-1, 1, (event.clientX - b.left) / b.width * 2 - 1));
      yTo(gsap.utils.clamp(-1, 1, (event.clientY - b.top) / b.height * 2 - 1));
    };
    const leave = () => { if (running) { xTo(0); yTo(0); } };
    const preference = () => { setReduced(media.matches); sync(); draw(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(host); sizeObserver.observe(host);
    const hero = host.closest('.nature-hero') || host;
    hero.addEventListener('pointermove', move as EventListener, { passive: true }); hero.addEventListener('pointerleave', leave);
    media.addEventListener('change', preference); document.addEventListener('visibilitychange', sync);
    preference(); photo.src = '/images/meadow.jpg';
    return () => {
      disposed = true; photo.onload = null; syncRef.current = null;
      observer.disconnect(); sizeObserver.disconnect(); gsap.ticker.remove(tick); gsap.killTweensOf(pointer);
      hero.removeEventListener('pointermove', move as EventListener); hero.removeEventListener('pointerleave', leave);
      media.removeEventListener('change', preference); document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return <div className="landscape-study">
    <div className="landscape-surface" ref={hostRef}>
      {/* The image remains visible if scripting or canvas is unavailable. */}
      <img src="/images/meadow.jpg" alt="" width="1672" height="941" fetchPriority="high" />
      <canvas ref={canvasRef} aria-hidden="true" data-ready={ready}/>
      <div className="landscape-shade"/>
    </div>
    <div className="landscape-caption"><span>{pt ? 'ESTUDO DE CAMPO / 001' : 'FIELD STUDY / 001'}</span>{ready && !reduced && <button type="button" onClick={() => { pausedRef.current = !pausedRef.current; setPaused(pausedRef.current); syncRef.current?.(); }} aria-label={paused ? (pt ? 'Retomar movimento' : 'Resume motion') : (pt ? 'Pausar movimento' : 'Pause motion')}>{paused ? '▶' : 'Ⅱ'} <span>{paused ? (pt ? 'Retomar' : 'Play') : (pt ? 'Pausar' : 'Pause')}</span></button>}</div>
  </div>;
}
