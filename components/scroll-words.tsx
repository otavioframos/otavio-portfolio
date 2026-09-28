'use client';

import { useEffect, useRef } from 'react';

/**
 * A statement that lights up word by word as it scrolls through the viewport.
 * Words start dim and reach full strength between 85% and 35% of the screen.
 */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const words = [...element.querySelectorAll<HTMLElement>('.sw')];
    element.dataset.lit = 'true';
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const start = window.innerHeight * 0.85, end = window.innerHeight * 0.35;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const lit = progress * words.length;
      words.forEach((word, index) => { word.style.opacity = String(0.22 + 0.78 * Math.min(1, Math.max(0, lit - index))); });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);

  return <p ref={ref} className={className} aria-label={text}>
    {text.split(' ').map((word, index) => <span className="sw" aria-hidden="true" key={index}>{word}{' '}</span>)}
  </p>;
}
