'use client';

import { useEffect, useSyncExternalStore } from 'react';
import type { Lang } from '@/lib/projects';

const KEY = 'case-depth';
type Depth = 'plain' | 'tech';

/* A tiny store outside React: the saved choice lives in localStorage, which the
   server cannot read, so the first paint is always plain and the store flips
   after mount. */
let current: Depth = 'plain';
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
const set = (next: Depth) => {
  current = next;
  document.getElementById('main')?.setAttribute('data-depth', next);
  listeners.forEach(fn => fn());
};

/**
 * Reading mode for a case: the same story in plain language or in technical
 * terms. Both registers are in the HTML; this only flips `data-depth` on the
 * case's <main>, so the page reads complete without JavaScript (plain mode).
 * The choice is remembered, and a link ending in #technical opens in that mode.
 */
export function DepthToggle({ lang }: { lang: Lang }) {
  const depth = useSyncExternalStore(subscribe, () => current, () => 'plain' as Depth);
  useEffect(() => {
    let saved: string | null = null;
    try { saved = window.localStorage.getItem(KEY); } catch {}
    set(window.location.hash === '#technical' || saved === 'tech' ? 'tech' : 'plain');
  }, []);
  const pick = (next: Depth) => {
    set(next);
    try { window.localStorage.setItem(KEY, next); } catch {}
  };
  const pt = lang === 'pt';
  return <fieldset className="depth">
    <legend className="label">{pt ? 'Modo de leitura' : 'Reading mode'}</legend>
    <span className="my-seg">
      <button type="button" aria-pressed={depth === 'plain'} onClick={() => pick('plain')}>{pt ? 'Linguagem simples' : 'Plain language'}</button>
      <button type="button" aria-pressed={depth === 'tech'} onClick={() => pick('tech')}>{pt ? 'Termos técnicos' : 'Technical terms'}</button>
    </span>
    <span className="depth-hint">{pt ? 'A mesma história, com mais ou menos detalhe.' : 'The same story, with more or less detail.'}</span>
  </fieldset>;
}
