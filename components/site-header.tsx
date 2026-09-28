'use client';

import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/lib/projects';

type HeaderProps = {
  lang: Lang;
  slug?: string;
  /** Home swaps the left label from the role to the name once the hero is gone. */
  home?: boolean;
  /** Case pages show reading progress at the right edge. */
  progress?: boolean;
};

/**
 * Text-only header on the page grid, with no background. The menu opens inline:
 * "Menu" becomes "Close" and the links appear one by one on the same line.
 */
export function SiteHeader({ lang, slug, home = false, progress = false }: HeaderProps) {
  const pt = lang === 'pt';
  const base = pt ? '/pt' : '';
  const alternate = (pt ? '' : '/pt') + (slug ? '/work/' + slug : '/');
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(!home);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (home) setPastHero(window.scrollY > window.innerHeight * 0.6);
      if (progressRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current.textContent = `${Math.round(max > 0 ? (window.scrollY / max) * 100 : 0)}%`;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [home]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { href: base + '/#work', label: pt ? 'Projetos' : 'Work' },
    { href: base + '/#more-work', label: pt ? 'Outros' : 'More work' },
    { href: base + '/#about', label: pt ? 'Sobre' : 'About' },
    { href: base + '/#contact', label: pt ? 'Contato' : 'Contact' },
  ];

  return <header className="grid top" data-open={open ? 'true' : 'false'}>
    <a className="top-name" href={base || '/'} aria-label={pt ? 'Otávio Ramos, início' : 'Otávio Ramos, home'}>
      <span className="top-swap" data-past={pastHero ? 'true' : 'false'}>
        <span>{pt ? 'Founding Product Designer' : 'Founding Product Designer'}</span>
        <span>Otávio Ramos</span>
      </span>
    </a>
    <nav className="top-nav" aria-label={pt ? 'Navegação principal' : 'Main navigation'}>
      <button type="button" className="top-menu" aria-expanded={open} aria-controls="top-links" onClick={() => setOpen(value => !value)}>
        {open ? (pt ? 'Fechar' : 'Close') : 'Menu'}
      </button>
      <span id="top-links" className="top-links" hidden={!open}>
        {links.map((link, index) => <a key={link.href} href={link.href} style={{ '--i': index } as React.CSSProperties} onClick={() => setOpen(false)}>{link.label}</a>)}
        {progress && <a href={alternate} hrefLang={pt ? 'en' : 'pt-BR'} lang={pt ? 'en' : 'pt-BR'} style={{ '--i': links.length } as React.CSSProperties}>{pt ? 'English' : 'Português'}</a>}
      </span>
    </nav>
    {progress
      ? <span ref={progressRef} className="top-end top-progress" aria-hidden="true">0%</span>
      : <a className="top-end" href={alternate} hrefLang={pt ? 'en' : 'pt-BR'} lang={pt ? 'en' : 'pt-BR'}>{pt ? 'English' : 'Português'}</a>}
  </header>;
}
