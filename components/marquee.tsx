'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * A real horizontal scroller that drifts on its own. The content is rendered
 * twice so the drift can loop; the first touch, drag, wheel or key press hands
 * control to the person and the drift stops for good. Hover pauses it.
 * Reduced motion: no drift, no duplicate.
 */
export function Marquee({ children, copy, label, speed = 32 }: { children: ReactNode; copy: ReactNode; label: string; speed?: number }) {
  const ref = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = ref.current;
    if (!scroller) return;
    // Under reduced motion the copy is hidden by CSS and nothing drifts.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0, last = 0, stopped = false, hovering = false, visible = true, position = scroller.scrollLeft;
    const loopWidth = () => (copyRef.current?.offsetLeft ?? 0) - (scroller.firstElementChild as HTMLElement | null)!.offsetLeft;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (stopped || hovering || !visible || document.hidden) return;
      position += speed * dt;
      const width = loopWidth();
      if (width > 0 && position >= width) position -= width;
      scroller.scrollLeft = position;
    };
    const stop = () => {
      if (stopped) return;
      stopped = true;
      scroller.dataset.manual = 'true';
    };
    const wheel = (event: WheelEvent) => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) stop(); };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(scroller);
    scroller.addEventListener('pointerdown', stop);
    scroller.addEventListener('touchstart', stop, { passive: true });
    scroller.addEventListener('wheel', wheel, { passive: true });
    scroller.addEventListener('keydown', stop);
    const enter = () => { hovering = true; }, leave = () => { hovering = false; last = 0; position = scroller.scrollLeft; };
    scroller.addEventListener('mouseenter', enter);
    scroller.addEventListener('mouseleave', leave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      scroller.removeEventListener('pointerdown', stop);
      scroller.removeEventListener('touchstart', stop);
      scroller.removeEventListener('wheel', wheel);
      scroller.removeEventListener('keydown', stop);
      scroller.removeEventListener('mouseenter', enter);
      scroller.removeEventListener('mouseleave', leave);
    };
  }, [speed]);

  return <section ref={ref} className="marquee" aria-label={label}>
    <div className="marquee-set">{children}</div>
    <div ref={copyRef} className="marquee-set" aria-hidden="true" inert>{copy}</div>
  </section>;
}
