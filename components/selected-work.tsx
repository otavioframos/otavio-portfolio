'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export type Work = { slug: string; name: string; category: string; summary: string; status: string; image: string; href: string };

/** A compact index for secondary work. Images appear in a small pointer-following window on desktop. */
export function CompactWorkList({ items, label }: { items: Work[]; label: string }) {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    const media = gsap.matchMedia();
    media.add({ fine: '(hover: hover) and (pointer: fine)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      if (!context.conditions?.fine) return;
      const reduced = Boolean(context.conditions.reduced);
      const rows = Array.from(list.querySelectorAll<HTMLAnchorElement>('.compact-work-row'));
      const slides = Array.from(preview.querySelectorAll<HTMLElement>('.work-preview-slide'));
      const xTo = gsap.quickTo(preview, 'x', { duration: .22, ease: 'power3.out' });
      const yTo = gsap.quickTo(preview, 'y', { duration: .22, ease: 'power3.out' });
      let active = -1;
      let width = 0;
      let height = 0;

      const position = (event: PointerEvent, immediate: boolean) => {
        if (reduced && !immediate) return;
        const gap = 24, edge = 16;
        const maxX = Math.max(edge, window.innerWidth - width - edge);
        const maxY = Math.max(edge, window.innerHeight - height - edge);
        const x = Math.max(edge, Math.min(maxX, event.clientX + gap + width > window.innerWidth - edge ? event.clientX - width - gap : event.clientX + gap));
        const y = Math.max(edge, Math.min(maxY, event.clientY + gap + height > window.innerHeight - edge ? event.clientY - height - gap : event.clientY + gap));
        if (immediate) {
          xTo.tween.pause(); yTo.tween.pause();
          gsap.set(preview, { x, y });
        } else { xTo(x); yTo(y); }
      };
      const show = (index: number, event: PointerEvent) => {
        if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        const entering = active === -1;
        if (active !== index) {
          active = index;
          slides.forEach((slide, i) => {
            slide.style.zIndex = i === index ? '1' : '0';
            gsap.to(slide, { autoAlpha: i === index ? 1 : 0, duration: reduced || entering ? 0 : .14, overwrite: true });
          });
        }
        if (entering) {
          width = preview.offsetWidth; height = preview.offsetHeight;
          position(event, true);
          gsap.to(preview, { autoAlpha: 1, duration: reduced ? 0 : .14, ease: 'power2.out', overwrite: 'auto' });
          gsap.to(preview, { scale: 1, duration: reduced ? 0 : .24, ease: 'back.out(1.15)', overwrite: 'auto' });
        } else position(event, false);
      };
      const hide = () => {
        active = -1;
        xTo.tween.pause(); yTo.tween.pause();
        gsap.to(preview, { autoAlpha: 0, scale: reduced ? 1 : .98, duration: reduced ? 0 : .1, overwrite: 'auto' });
      };
      const keyboard = (event: KeyboardEvent) => { if (event.key === 'Escape' || event.key === 'Tab') hide(); };
      const handlers = rows.map((row, index) => {
        const enter = (event: PointerEvent) => show(index, event);
        row.addEventListener('pointerenter', enter);
        row.addEventListener('pointermove', enter);
        row.addEventListener('click', hide);
        return () => {
          row.removeEventListener('pointerenter', enter);
          row.removeEventListener('pointermove', enter);
          row.removeEventListener('click', hide);
        };
      });
      list.addEventListener('pointerleave', hide);
      list.addEventListener('pointercancel', hide);
      window.addEventListener('scroll', hide, { passive: true, capture: true });
      window.addEventListener('resize', hide);
      window.addEventListener('blur', hide);
      window.addEventListener('keydown', keyboard);
      return () => {
        handlers.forEach(cleanup => cleanup());
        list.removeEventListener('pointerleave', hide);
        list.removeEventListener('pointercancel', hide);
        window.removeEventListener('scroll', hide, true);
        window.removeEventListener('resize', hide);
        window.removeEventListener('blur', hide);
        window.removeEventListener('keydown', keyboard);
        xTo.tween.kill(); yTo.tween.kill();
        gsap.killTweensOf([preview, ...slides]);
      };
    });
    return () => media.revert();
  }, [items]);

  return <div className="compact-work-list" ref={listRef}>
    {items.map(item => <a className="compact-work-row" href={item.href} key={item.slug} aria-labelledby={'compact-title-' + item.slug} aria-describedby={'compact-summary-' + item.slug}>
      <div className="compact-work-identity"><p>{item.category}</p><h3 id={'compact-title-' + item.slug}>{item.name}</h3></div>
      <p className="compact-work-summary" id={'compact-summary-' + item.slug}>{item.summary}</p>
      <span className="compact-work-action"><span className="compact-work-status">{item.status}</span><span className="compact-work-open"><span>{label}</span><span aria-hidden="true">↗</span></span></span>
    </a>)}
    <div ref={previewRef} className="work-pointer-preview" aria-hidden="true">
      {items.map(item => <div className={'work-preview-slide preview-' + item.slug} key={item.slug}>
        <div className="work-preview-image">
          {item.slug === 'mindyoung' && <img className="work-preview-owl" src="/images/mindyoung-owl.webp" width="512" height="512" alt="" decoding="async"/>}
          <img className="work-preview-art" src={item.image} alt="" decoding="async"/>
        </div>
        <div className="work-preview-caption"><span>{item.name}</span><span>{item.status}</span></div>
      </div>)}
    </div>
  </div>;
}

/** The flagship cases stay open so a recruiter can understand the work without an extra click. */
export function SelectedWork({ items, label }: { items: Work[]; label: string }) {
  return <div className="selected-work-features">
    {items.map((item, index) => <article className="selected-work-feature" key={item.slug}>
      <div className="selected-work-feature-head">
        <div>
          <p className="eyebrow">{String(index + 1).padStart(2, '0')} / {item.category}</p>
          <h3>{item.name}</h3>
        </div>
        <div className="selected-work-feature-context"><p className="selected-work-feature-status">{item.status}</p><p>{item.summary}</p></div>
      </div>
      <a className="selected-work-feature-link" href={item.href} aria-label={`${label}: ${item.name}`}>
        <figure className={'selected-work-feature-visual feature-' + item.slug}>
          {item.slug === 'mindyoung' && <div className="selected-mindyoung-brand"><span>A CURIOUS MIND</span><strong>Mind<br/>Young.</strong><img src="/images/mindyoung-owl.webp" width="512" height="512" alt=""/></div>}
          <img src={item.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} decoding="async"/>
        </figure>
        <span className="selected-work-feature-action">{label} <span aria-hidden="true">↗</span></span>
      </a>
    </article>)}
  </div>;
}
