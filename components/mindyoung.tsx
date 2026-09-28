'use client';

import { useState, type CSSProperties } from 'react';
import type { Lang } from '@/lib/projects';

/**
 * MindYoung case figures: the product's design system as a live specimen, the
 * acquisition funnel and the A/B reads. Numbers are first-party analytics,
 * Aug 19 → Sep 16 2026 (QA excluded). No revenue figures, by rule.
 */

const tr = (lang: Lang, en: string, pt: string) => (lang === 'pt' ? pt : en);
const fmt = (n: number, lang: Lang) => n.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US');
const pct = (v: number, lang: Lang, d = 1) => (v * 100).toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US', { maximumFractionDigits: d, minimumFractionDigits: d }) + '%';

/* ───────────────────────── Design system ───────────────────────── */

const COLORS = [
  { name: 'Ink', token: '--ink', hex: '#232048', en: 'Text and icons', pt: 'Texto e ícones' },
  { name: 'Muted', token: '--muted', hex: '#55536E', en: 'Secondary text', pt: 'Texto secundário' },
  { name: 'Accent', token: '--accent', hex: '#1D4ED8', en: 'Actions and focus', pt: 'Ações e foco' },
  { name: 'Accent soft', token: '--accent-soft', hex: '#F6F9FF', en: 'Selected surfaces', pt: 'Superfícies selecionadas' },
  { name: 'Line', token: '--line', hex: '#E9E5EC', en: 'Borders and rules', pt: 'Bordas e divisórias' },
  { name: 'Background', token: '--background', hex: '#FFFDFA', en: 'Warm paper ground', pt: 'Fundo papel quente' },
  { name: 'Danger', token: '--danger', hex: '#A23B55', en: 'Errors', pt: 'Erros' },
];

const RADII = [
  { token: 'control', v: 14 },
  { token: 'radius', v: 18 },
  { token: 'card', v: 20 },
  { token: 'pill', v: 999 },
];

export function MindYoungSystem({ lang }: { lang: Lang }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [weight, setWeight] = useState(500);
  const [opsz, setOpsz] = useState(48);
  const [picked, setPicked] = useState(1);
  const [pressed, setPressed] = useState(false);
  const [grid, setGrid] = useState(true);

  const copy = (hex: string) => {
    navigator.clipboard?.writeText(hex).catch(() => {});
    setCopied(hex);
    window.setTimeout(() => setCopied(c => (c === hex ? null : c)), 1400);
  };

  const options = [
    tr(lang, 'Sharper memory', 'Memória mais afiada'),
    tr(lang, 'Faster reasoning', 'Raciocínio mais rápido'),
    tr(lang, 'Better focus', 'Mais foco'),
  ];

  return <figure className="my-ds" aria-label={tr(lang, 'MindYoung design system', 'Design system do MindYoung')}>
    {/* eslint-disable-next-line @next/next/no-page-custom-font */}
    <link rel="stylesheet" precedence="default" href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;700&family=Google+Sans+Flex:opsz,wght@6..144,300..800&display=swap" />

    <div className="my-ds-cell my-ds-colors">
      <p className="my-ds-k">{tr(lang, 'Colour', 'Cor')}</p>
      <ul>{COLORS.map(c => <li key={c.hex}>
        <button type="button" onClick={() => copy(c.hex)} aria-label={tr(lang, `Copy ${c.name} ${c.hex}`, `Copiar ${c.name} ${c.hex}`)}>
          <span className="my-sw" style={{ background: c.hex }} />
          <span className="my-sw-name">{c.name}</span>
          <span className="my-sw-hex">{copied === c.hex ? tr(lang, 'Copied', 'Copiado') : c.hex}</span>
          <span className="my-sw-use">{tr(lang, c.en, c.pt)}</span>
        </button>
      </li>)}</ul>
    </div>

    <div className="my-ds-cell my-ds-type">
      <p className="my-ds-k">{tr(lang, 'Type', 'Tipografia')}</p>
      <p className="my-type-display" style={{ fontWeight: weight, fontVariationSettings: `'opsz' ${opsz}` }}>{tr(lang, 'Train the mind you have.', 'Treine a mente que você tem.')}</p>
      <p className="my-type-meta">Google Sans Flex · {tr(lang, 'display', 'títulos')} · {weight} / opsz {opsz}</p>
      <div className="my-sliders">
        <label>{tr(lang, 'Weight', 'Peso')}<input type="range" min={300} max={800} step={10} value={weight} onChange={e => setWeight(+e.target.value)} /></label>
        <label>{tr(lang, 'Optical size', 'Tamanho óptico')}<input type="range" min={6} max={144} value={opsz} onChange={e => setOpsz(+e.target.value)} /></label>
      </div>
      <p className="my-type-body">{tr(lang, 'Albert Sans carries the reading: questions, explanations and the report. Warm, open and steady at 15–17px on a phone.', 'Albert Sans cuida da leitura: perguntas, explicações e o relatório. Aberta, calorosa e estável entre 15 e 17px no celular.')}</p>
      <p className="my-type-meta">Albert Sans · {tr(lang, 'body', 'texto')} · 400 / 500 / 700</p>
      <dl className="my-scale">
        {[['Heading', '1.35–1.7rem', 500], ['Subtitle', '0.95rem', 400], ['Button', '1rem', 700]].map(([k, v, w]) => <div key={k as string}><dt style={{ fontWeight: w as number }}>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </div>

    <div className="my-ds-cell my-ds-shape">
      <p className="my-ds-k">{tr(lang, 'Shape', 'Forma')}</p>
      <ul className="my-radii">{RADII.map(r => <li key={r.token}><span style={{ borderRadius: Math.min(r.v, 40) }} /><b>{r.token}</b><i>{r.v === 999 ? '999' : r.v}px</i></li>)}</ul>
      <p className="my-ds-note">{tr(lang, 'Generous corners and a 3px step shadow that flattens on press: every tappable thing feels like a physical key.', 'Cantos generosos e uma sombra de 3px que achata ao pressionar: tudo que é tocável parece uma tecla física.')}</p>
    </div>

    <div className="my-ds-cell my-ds-grid">
      <div className="my-ds-row">
        <p className="my-ds-k">{tr(lang, 'Layout', 'Layout')}</p>
        <button type="button" className="my-toggle" aria-pressed={grid} onClick={() => setGrid(g => !g)}>{tr(lang, 'Grid', 'Grid')} {grid ? tr(lang, 'on', 'ligado') : tr(lang, 'off', 'desligado')}</button>
      </div>
      <div className={'my-phone' + (grid ? ' show-grid' : '')}>
        <div className="my-phone-col">
          <div className="my-progress"><span style={{ width: '62%' }} /></div>
          <p className="my-q">{tr(lang, 'What do you want to improve first?', 'O que você quer melhorar primeiro?')}</p>
          <div className="my-opts">
            {options.map((o, i) => <button key={o} type="button" aria-pressed={picked === i} className="my-opt" onClick={() => setPicked(i)}>
              <span className="my-radio" />{o}
            </button>)}
          </div>
          <button type="button" className={'my-cta' + (pressed ? ' is-pressed' : '')} onPointerDown={() => setPressed(true)} onPointerUp={() => setPressed(false)} onPointerLeave={() => setPressed(false)}>{tr(lang, 'Continue', 'Continuar')}</button>
        </div>
      </div>
      <p className="my-ds-note">{tr(lang, 'One 30rem column, 16px gutters, 56px+ touch targets. Tap the options and the button.', 'Uma coluna de 30rem, margens de 16px, alvos de toque acima de 56px. Toque nas opções e no botão.')}</p>
    </div>
  </figure>;
}

/* ───────────────────────── Funnel ───────────────────────── */

const FUNNEL = [
  { n: 34666, en: 'Landed', pt: 'Chegaram' },
  { n: 6913, en: 'Started the test', pt: 'Começaram o teste' },
  { n: 3070, en: 'Finished it', pt: 'Terminaram' },
  { n: 3036, en: 'Saw the offer', pt: 'Viram a oferta' },
  { n: 177, en: 'Became members', pt: 'Viraram membros' },
];

export function MindYoungFunnel({ lang }: { lang: Lang }) {
  const [mode, setMode] = useState<'top' | 'step'>('step');
  const [active, setActive] = useState(1);
  const top = FUNNEL[0].n;
  const rate = (i: number) => (mode === 'top' || i === 0 ? FUNNEL[i].n / top : FUNNEL[i].n / FUNNEL[i - 1].n);
  // Biggest relative loss: the step with the lowest step-to-step rate.
  const worst = FUNNEL.slice(1).reduce((w, s, i) => (s.n / FUNNEL[i].n < FUNNEL[w].n / FUNNEL[w - 1].n ? i + 1 : w), 1);
  const a = FUNNEL[active];

  return <figure className="my-chart">
    <div className="my-chart-head">
      <p className="label">{tr(lang, 'Acquisition funnel · Aug 19 → Sep 16 2026', 'Funil de aquisição · 19 ago → 16 set 2026')}</p>
      <fieldset className="my-seg" aria-label={tr(lang, 'Show rates as', 'Mostrar taxas como')}>
        <button type="button" aria-pressed={mode === 'step'} onClick={() => setMode('step')}>{tr(lang, 'Step to step', 'Etapa a etapa')}</button>
        <button type="button" aria-pressed={mode === 'top'} onClick={() => setMode('top')}>{tr(lang, 'Of landings', 'Das chegadas')}</button>
      </fieldset>
    </div>
    <ol className="my-funnel">{FUNNEL.map((s, i) => {
      const w = Math.max(0.012, s.n / top);
      return <li key={s.en}>
        <button type="button" className={'my-frow' + (i === active ? ' is-active' : '') + (i === worst ? ' is-worst' : '')} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
          <span className="my-fname">{tr(lang, s.en, s.pt)}</span>
          <span className="my-fbar"><span style={{ '--w': w } as CSSProperties} /></span>
          <span className="my-fn">{fmt(s.n, lang)}</span>
          <span className="my-fr">{i === 0 ? '100%' : pct(rate(i), lang)}</span>
        </button>
      </li>;
    })}</ol>
    <figcaption className="my-chart-read" aria-live="polite">
      {active === 0
        ? tr(lang, `${fmt(top, lang)} visits from paid social in 62 countries, about half from the US.`, `${fmt(top, lang)} visitas de mídia paga em 62 países, cerca de metade dos EUA.`)
        : tr(lang,
          active === 1 ? `${a.en}: ${fmt(a.n, lang)}, ${pct(a.n / top, lang)} of everyone who landed. Four in five leave before the first question.` : `${a.en}: ${fmt(a.n, lang)}. ${pct(a.n / FUNNEL[active - 1].n, lang)} of the step before, ${pct(a.n / top, lang, 2)} of everyone who landed.`,
          active === 1 ? `${a.pt}: ${fmt(a.n, lang)}, ${pct(a.n / top, lang)} de todos que chegaram. Quatro em cada cinco saem antes da primeira questão.` : `${a.pt}: ${fmt(a.n, lang)}. ${pct(a.n / FUNNEL[active - 1].n, lang)} da etapa anterior, ${pct(a.n / top, lang, 2)} de todos que chegaram.`)}
      {active === worst && <strong> {tr(lang, 'The largest relative drop sits here.', 'A maior queda relativa está aqui.')}</strong>}
    </figcaption>
  </figure>;
}

/* ───────────────────────── Experiments ───────────────────────── */

type Arm = { en: string; pt: string; rate: number; n?: number };
type Test = { key: string; en: string; pt: string; metricEn: string; metricPt: string; arms: [Arm, Arm]; verdictEn: string; verdictPt: string; moved: boolean };

const TESTS: Test[] = [
  {
    key: 'band', en: 'Score band label', pt: 'Rótulo da faixa', metricEn: 'Checkout → purchase', metricPt: 'Checkout → compra', moved: false,
    arms: [{ en: 'Shown', pt: 'Visível', rate: 0.056, n: 1487 }, { en: 'Hidden', pt: 'Oculto', rate: 0.061, n: 1532 }],
    verdictEn: 'Inside each other’s margin. No measurable effect.', verdictPt: 'Uma dentro da margem da outra. Sem efeito mensurável.',
  },
  {
    key: 'order', en: 'Item order', pt: 'Ordem das questões', metricEn: 'Completion per attempt', metricPt: 'Conclusão por tentativa', moved: false,
    arms: [{ en: 'Keep', pt: 'Manter', rate: 0.087 }, { en: 'Later', pt: 'Depois', rate: 0.09 }],
    verdictEn: 'A 0.3 point gap. No measurable effect.', verdictPt: 'Diferença de 0,3 ponto. Sem efeito mensurável.',
  },
  {
    key: 'webview', en: 'Where checkout opens', pt: 'Onde o checkout abre', metricEn: 'Checkout → purchase', metricPt: 'Checkout → compra', moved: true,
    arms: [{ en: 'In-app browser', pt: 'Navegador do app', rate: 0.03 }, { en: 'Real browser', pt: 'Navegador real', rate: 0.06 }],
    verdictEn: 'Twice the conversion outside Instagram and Facebook, and 94% of checkouts happen inside them.', verdictPt: 'O dobro de conversão fora do Instagram e do Facebook, e 94% dos checkouts acontecem dentro deles.',
  },
];

export function MindYoungTests({ lang }: { lang: Lang }) {
  const [k, setK] = useState(TESTS[0].key);
  const t = TESTS.find(x => x.key === k)!;
  const max = Math.max(...t.arms.map(x => x.rate)) * 1.35;
  return <figure className="my-chart">
    <div className="my-chart-head">
      <p className="label">{tr(lang, t.metricEn, t.metricPt)}</p>
      <fieldset className="my-seg" aria-label={tr(lang, 'Choose a comparison', 'Escolha uma comparação')}>
        {TESTS.map(x => <button key={x.key} type="button" aria-pressed={x.key === k} onClick={() => setK(x.key)}>{tr(lang, x.en, x.pt)}</button>)}
      </fieldset>
    </div>
    <div className="my-arms">{t.arms.map((arm, i) => {
      // 95% interval for a proportion, when the sample size is known.
      const ci = arm.n ? 1.96 * Math.sqrt((arm.rate * (1 - arm.rate)) / arm.n) : 0;
      return <div key={arm.en} className={'my-arm' + (t.moved && i === 1 ? ' is-win' : '')}>
        <div className="my-arm-track">
          <span className="my-arm-bar" style={{ '--h': arm.rate / max } as CSSProperties} />
          {ci > 0 && <span className="my-arm-ci" style={{ '--lo': (arm.rate - ci) / max, '--hi': (arm.rate + ci) / max } as CSSProperties} />}
        </div>
        <p className="my-arm-v">{pct(arm.rate, lang)}</p>
        <p className="my-arm-k">{tr(lang, arm.en, arm.pt)}{arm.n && <small>n = {fmt(arm.n, lang)}</small>}</p>
      </div>;
    })}</div>
    <figcaption className="my-chart-read">
      <span className={'my-chip' + (t.moved ? ' is-moved' : '')}>{t.moved ? tr(lang, 'Moves the number', 'Move o número') : tr(lang, 'No effect', 'Sem efeito')}</span>
      {tr(lang, t.verdictEn, t.verdictPt)}
    </figcaption>
  </figure>;
}

