'use client';

import { useEffect, useRef } from 'react';
import type { Lang } from '@/lib/projects';

/** Text-only header on the page grid. Gains a quiet backdrop once the page scrolls. */
export function SiteHeader({ lang, slug }: { lang: Lang; slug?: string }) {
  const ref = useRef<HTMLElement>(null);
  const pt = lang === 'pt';
  const base = pt ? '/pt' : '';
  const alternate = (pt ? '' : '/pt') + (slug ? '/work/' + slug : '/');

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const sync = () => { header.dataset.scrolled = window.scrollY > 24 ? 'true' : 'false'; };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, []);

  return <header ref={ref} className="grid top" data-scrolled="false">
    <a className="top-name" href={base || '/'} aria-label={pt ? 'Otávio Ramos, início' : 'Otávio Ramos, home'}>Otávio Ramos</a>
    <nav className="top-nav" aria-label={pt ? 'Navegação principal' : 'Main navigation'}>
      <a href={base + '/#work'}>{pt ? 'Projetos' : 'Work'}</a>
      <a href={base + '/#about'}>{pt ? 'Sobre' : 'About'}</a>
      <a className="top-contact" href={base + '/#contact'}>{pt ? 'Contato' : 'Contact'}</a>
    </nav>
    <a className="top-lang" href={alternate} hrefLang={pt ? 'en' : 'pt-BR'} lang={pt ? 'en' : 'pt-BR'}>{pt ? 'English' : 'Português'}</a>
  </header>;
}
