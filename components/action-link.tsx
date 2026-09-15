'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function ActionLink({ href, label, secondary = false }: { href: string; label: string; secondary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const link = ref.current, icon = link?.querySelector('.action-icon');
    if (!link || !icon) return;
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const xTo = gsap.quickTo(icon, 'x', { duration: .3, ease: 'power3.out' });
      const yTo = gsap.quickTo(icon, 'y', { duration: .3, ease: 'power3.out' });
      const move = (event: PointerEvent) => {
        const box = link.getBoundingClientRect();
        xTo(((event.clientX - box.left) / box.width - .5) * 9);
        yTo(((event.clientY - box.top) / box.height - .5) * 9);
      };
      const reset = () => { xTo(0); yTo(0); };
      link.addEventListener('pointermove', move);
      link.addEventListener('pointerleave', reset);
      return () => { link.removeEventListener('pointermove', move); link.removeEventListener('pointerleave', reset); };
    });
    return () => media.revert();
  }, []);
  return <a ref={ref} className={'action-link' + (secondary ? ' action-secondary' : '')} href={href}>
    <span className="action-label"><span>{label}</span><span aria-hidden="true">{label}</span></span>
    <span className="action-icon" aria-hidden="true"><span>↗</span></span>
  </a>;
}
