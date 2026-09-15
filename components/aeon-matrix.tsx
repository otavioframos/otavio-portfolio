'use client';

import { useEffect, useRef } from 'react';

/** A small canvas study based on Aeon's configurable pixel field. */
export function AeonMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const columns = 32;
    const rows = 18;
    const pointer = { x: -1000, y: -1000, active: false };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let frame = 0;
    let running = false;
    let disposed = false;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (now: number) => {
      if (disposed) return;
      const time = reduced.matches ? 0 : now / 1000;
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#111512';
      context.fillRect(0, 0, width, height);
      const stepX = width / columns;
      const stepY = height / rows;
      const breathe = reduced.matches ? 0 : Math.sin(time * 1.1) * 0.12;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = (column + .5) * stepX;
          const y = (row + .5) * stepY;
          const distance = Math.hypot(x - pointer.x, y - pointer.y);
          const touch = pointer.active ? Math.max(0, 1 - distance / Math.min(width, height) * 2.1) : 0;
          const wave = Math.sin(column * .34 + row * .21 + time * 1.4) * .08;
          const value = .34 + breathe + wave + touch * .55;
          const size = Math.max(1.5, Math.min(stepX, stepY) * (.16 + value * .42));
          const alpha = Math.max(.12, Math.min(.82, .18 + value * .5));
          context.fillStyle = `rgba(134, 157, 148, ${alpha})`;
          context.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }

      if (!reduced.matches && running && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = event.pointerType !== 'mouse' || event.buttons > 0 || event.type === 'pointermove';
    };
    const leave = () => { pointer.active = false; pointer.x = -1000; pointer.y = -1000; };
    const sync = () => {
      if (reduced.matches) {
        running = false;
        cancelAnimationFrame(frame);
        draw(0);
      } else if (!running && !document.hidden) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    canvas.addEventListener('pointermove', move, { passive: true });
    canvas.addEventListener('pointerleave', leave, { passive: true });
    canvas.addEventListener('pointercancel', leave, { passive: true });
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
      canvas.removeEventListener('pointercancel', leave);
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return <canvas ref={canvasRef} className="aeon-matrix-canvas" aria-label="Interactive breathing pixel matrix"/>;
}
