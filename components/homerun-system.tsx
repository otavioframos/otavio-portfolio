import type { Lang } from '@/lib/projects';

/**
 * HomeRunPet design system, from the Figma library tokens: Inter type scale,
 * orange/red palette and the four button tones with optional arrows.
 * Static on purpose: More-work pages stay light.
 */

const COLORS = [
  { n: 'Laranja primário', en: 'Primary orange', hex: '#FF5E20' },
  { n: 'Laranja secundário', en: 'Secondary orange', hex: '#F2371F' },
  { n: 'Laranja 04', en: 'Orange 04', hex: '#FFEDEA' },
  { n: 'Branco 01', en: 'White 01', hex: '#FAF8F5' },
  { n: 'Branco 02', en: 'White 02', hex: '#DEDEDE' },
  { n: 'Preto 01', en: 'Black 01', hex: '#303030' },
  { n: 'Preto 02', en: 'Black 02', hex: '#4E4E4E' },
  { n: 'Preto 03', en: 'Black 03', hex: '#818181' },
];

const TYPE: [string, number, number][] = [
  ['Display Large', 57, 64], ['Display Medium', 45, 52], ['Headline Large', 32, 40], ['Title Large', 22, 28], ['Body Large', 16, 24], ['Label Medium', 12, 16],
];

const TONES = ['primary', 'secondary', 'tertiary', 'disabled'] as const;
const Arrow = () => <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" /></svg>;

export function HomeRunSystem({ lang }: { lang: Lang }) {
  const pt = lang === 'pt';
  return <figure className="hr-ds" aria-label={pt ? 'Design system da HomeRunPet' : 'HomeRunPet design system'}>
    <div className="hr-cell hr-type">
      <p className="hr-k">{pt ? 'Tipografia · Inter' : 'Type · Inter'}</p>
      {TYPE.map(([name, size, lh]) => <p key={name} style={{ fontSize: `clamp(12px, ${size / 16}vw, ${size}px)`, lineHeight: `${lh / size}` }}>{name}<small>{size}/{lh}</small></p>)}
      <p className="hr-note">{pt ? '15 estilos em cinco famílias, do Display ao Label.' : '15 styles across five families, from Display to Label.'}</p>
    </div>
    <div className="hr-cell hr-colors">
      <p className="hr-k">{pt ? 'Cor' : 'Colour'}</p>
      <ul>{COLORS.map(c => <li key={c.hex}><span style={{ background: c.hex }} /><b>{pt ? c.n : c.en}</b><i>{c.hex}</i></li>)}</ul>
    </div>
    <div className="hr-cell hr-buttons">
      <p className="hr-k">{pt ? 'Botões · 4 tons × 4 variações' : 'Buttons · 4 tones × 4 variants'}</p>
      <div className="hr-grid">{TONES.map(t => [0, 1, 2, 3].map(v => <span key={t + v} className={`hr-btn hr-${t}`}>
        {(v === 1 || v === 2) && <Arrow />}Action Button{(v === 2 || v === 3) && <Arrow />}
      </span>))}</div>
    </div>
    <div className="hr-cell hr-compose">
      <p className="hr-k">{pt ? 'Composição · card de benefício' : 'Composed · benefit card'}</p>
      <div className="hr-card">
        <img src="/images/homerun-card.webp" alt={pt ? 'Tutora secando um cão com o soprador HomeRunPet' : 'Owner drying a dog with the HomeRunPet dryer'} width="282" height="272" loading="lazy" />
        <div>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          <p className="hr-card-t">{pt ? 'Silencioso de verdade' : 'Truly quiet'}</p>
          <p className="hr-card-d">{pt ? 'Seu pet fica mais calmo e cooperativo' : 'Your pet stays calmer and more cooperative'}</p>
        </div>
      </div>
      <p className="hr-note">{pt ? 'Branco 01, Preto 01 e 02, Headline Small e Body Large, com o check em laranja secundário.' : 'White 01, Black 01 and 02, Headline Small and Body Large, with the check in secondary orange.'}</p>
    </div>
    <figcaption className="hr-cap">{pt ? 'Tokens da biblioteca construída no Figma e espelhada em código.' : 'Tokens from the library built in Figma and mirrored in code.'}</figcaption>
  </figure>;
}
