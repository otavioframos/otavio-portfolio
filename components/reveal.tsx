'use client';

import { useEffect } from 'react';

/**
 * Fades blocks in as they enter the viewport. Only elements that start below
 * the fold are hidden, and only after hydration, so nothing is ever invisible
 * without JavaScript and nothing above the fold flashes.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-reveal', 'in');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    const fold = window.innerHeight * 0.94;
    for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
      if (element.getBoundingClientRect().top < fold) continue;
      element.setAttribute('data-reveal', 'pending');
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);
  return null;
}
