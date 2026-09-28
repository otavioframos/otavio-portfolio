'use client';

import { useEffect } from 'react';

/** Wrap each rendered line of a text-only element in a mask, so lines can rise out of it. */
function splitLines(element: HTMLElement): boolean {
  if ([...element.childNodes].some(node => node.nodeType !== Node.TEXT_NODE)) return false;
  const text = element.textContent ?? '';
  const words = text.split(/(\s+)/);
  element.textContent = '';
  const spans = words.map(word => {
    const span = document.createElement('span');
    span.textContent = word;
    element.appendChild(span);
    return span;
  });
  const lines: string[] = [];
  let top = Number.NaN;
  for (const span of spans) {
    if (!span.textContent?.trim()) { if (lines.length) lines[lines.length - 1] += span.textContent; continue; }
    const y = span.offsetTop;
    if (y !== top) { lines.push(''); top = y; }
    lines[lines.length - 1] += span.textContent;
  }
  element.textContent = '';
  lines.forEach((line, index) => {
    const mask = document.createElement('span');
    mask.className = 'line';
    mask.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.className = 'line-inner';
    inner.style.setProperty('--i', String(index));
    inner.textContent = line.trimEnd();
    mask.appendChild(inner);
    element.appendChild(mask);
  });
  element.setAttribute('aria-label', text);
  element.dataset.split = String(lines.length);
  element.dataset.text = text;
  return true;
}

/** Put the plain text back once the lines have landed, so it can reflow on resize. */
function unsplit(element: HTMLElement) {
  if (!element.dataset.text) return;
  element.textContent = element.dataset.text;
  element.removeAttribute('aria-label');
  delete element.dataset.split;
  delete element.dataset.text;
}

/**
 * Scroll behaviour shared by every page:
 * - titles below the fold rise line by line out of a mask as they enter;
 * - other marked blocks fade up;
 * - cover videos play only while on screen.
 * Nothing is hidden before hydration or for reduced motion.
 */
export function RevealObserver() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: (() => void)[] = [];

    const videos = [...document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]')];
    if (!reduced && videos.length && 'IntersectionObserver' in window) {
      const player = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) { video.preload = 'auto'; void video.play().catch(() => {}); }
          else video.pause();
        }
      }, { threshold: 0.15 });
      videos.forEach(video => player.observe(video));
      cleanups.push(() => player.disconnect());
    }

    if (!reduced && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.setAttribute('data-reveal', 'in');
          observer.unobserve(element);
          const lines = Number(element.dataset.split || 0);
          if (lines) window.setTimeout(() => unsplit(element), 950 + lines * 90);
        }
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
      const fold = window.innerHeight * 0.94;
      for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
        if (element.getBoundingClientRect().top < fold) continue;
        if (!element.classList.contains('cover')) splitLines(element);
        element.setAttribute('data-reveal', 'pending');
        observer.observe(element);
      }
      cleanups.push(() => observer.disconnect());
    }

    return () => cleanups.forEach(cleanup => cleanup());
  }, []);
  return null;
}
