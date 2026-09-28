import type { CSSProperties } from 'react';
import type { Lang } from '@/lib/projects';

/**
 * Precato main landing page, PageSpeed Insights before and after (Feb 2025).
 * Drawn in code so it reads in both languages; values from the report captures.
 */
const ROWS = [
  { en: 'First Contentful Paint', pt: 'First Contentful Paint', before: 0.7, after: 0.4, unit: 's' },
  { en: 'Largest Contentful Paint', pt: 'Largest Contentful Paint', before: 3.7, after: 0.9, unit: 's' },
  { en: 'Speed Index', pt: 'Speed Index', before: 4.6, after: 1.0, unit: 's' },
  { en: 'Total Blocking Time', pt: 'Total Blocking Time', before: 5240, after: 20, unit: 'ms' },
];

function Gauge({ v, label }: { v: number; label: string }) {
  const C = 2 * Math.PI * 44;
  const tone = v >= 90 ? 'good' : v >= 50 ? 'mid' : 'bad';
  return <div className={`pm-gauge pm-${tone}`}>
    <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" className="t" /><circle cx="50" cy="50" r="44" className="v" strokeDasharray={C} strokeDashoffset={C * (1 - v / 100)} transform="rotate(-90 50 50)" /></svg>
    <b>{v}</b><span>{label}</span>
  </div>;
}

export function PrecatoMetrics({ lang }: { lang: Lang }) {
  const pt = lang === 'pt';
  const n = (x: number) => x.toLocaleString(pt ? 'pt-BR' : 'en-US');
  return <figure className="pm">
    <div className="pm-head">
      <Gauge v={40} label={pt ? 'Antes' : 'Before'} />
      <span className="pm-arrow" aria-hidden="true">→</span>
      <Gauge v={99} label={pt ? 'Depois' : 'After'} />
      <p className="pm-title">{pt ? 'Desempenho da página principal no PageSpeed Insights' : 'Main page performance in PageSpeed Insights'}</p>
    </div>
    <dl className="pm-rows">{ROWS.map(r => <div key={r.en}>
      <dt>{pt ? r.pt : r.en}</dt>
      <dd>
        <span className="pm-bar"><i style={{ '--w': 1 } as CSSProperties} /><i className="a" style={{ '--w': r.after / r.before } as CSSProperties} /></span>
        <span className="pm-v"><s>{n(r.before)} {r.unit}</s> {n(r.after)} {r.unit}</span>
      </dd>
    </div>)}</dl>
    <figcaption>{pt ? 'PageSpeed Insights, desktop, fevereiro de 2025. Barras relativas ao valor de antes; menor é melhor.' : 'PageSpeed Insights, desktop, February 2025. Bars relative to the before value; lower is better.'}</figcaption>
  </figure>;
}
