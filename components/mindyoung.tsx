'use client';

import { useState, type CSSProperties } from 'react';
import type { Lang } from '@/lib/projects';

/**
 * MindYoung case figures: the product's design system as a live specimen, the
 * assessment journey, the A/B reads and how far people read the checkout.
 * Shares and relative effects only: no traffic volumes or revenue.
 */

const tr = (lang: Lang, en: string, pt: string) => (lang === 'pt' ? pt : en);
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

/* ───────────────────────── Assessment journey ───────────────────────── */

/* Shares only: what happens once someone starts the assessment. No acquisition
   volumes, purchase rates or revenue, by rule. */
const JOURNEY = [
  { v: 1, en: 'Started the assessment', pt: 'Começaram a avaliação', noteEn: 'Every person who answered the first question.', notePt: 'Todas as pessoas que responderam a primeira questão.' },
  { v: 0.444, en: 'Answered every question', pt: 'Responderam todas as questões', noteEn: 'A 29-question battery, taken on a phone, mostly from a social feed.', notePt: 'Uma bateria de 29 questões, feita no celular, quase sempre vinda de um feed social.' },
  { v: 0.439, en: 'Reached their result', pt: 'Chegaram ao resultado', noteEn: 'Almost no one who finishes drops before seeing the result page.', notePt: 'Quase ninguém que termina desiste antes de ver a página de resultado.' },
];

export function MindYoungFunnel({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(1);
  const a = JOURNEY[active];
  return <figure className="my-chart">
    <div className="my-chart-head">
      <p className="label">{tr(lang, 'Inside the assessment · first four weeks live', 'Dentro da avaliação · primeiras quatro semanas no ar')}</p>
    </div>
    <ol className="my-funnel">{JOURNEY.map((s, i) => <li key={s.en}>
      <button type="button" className={'my-frow' + (i === active ? ' is-active' : '')} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
        <span className="my-fname">{tr(lang, s.en, s.pt)}</span>
        <span className="my-fbar"><span style={{ '--w': s.v } as CSSProperties} /></span>
        <span className="my-fn" />
        <span className="my-fr">{i === 0 ? '100%' : pct(s.v, lang, 0)}</span>
      </button>
    </li>)}</ol>
    <figcaption className="my-chart-read" aria-live="polite">{tr(lang, a.noteEn, a.notePt)}</figcaption>
  </figure>;
}

/* ───────────────────────── Experiments ───────────────────────── */

/* Relative to the control arm (= 100), so the chart shows effect size without
   publishing absolute conversion rates. */
type Arm = { en: string; pt: string; idx: number; ci?: number };
type Test = { key: string; en: string; pt: string; metricEn: string; metricPt: string; arms: [Arm, Arm]; verdictEn: string; verdictPt: string; moved: boolean; chipEn?: string; chipPt?: string };

const TESTS: Test[] = [
  {
    key: 'band', en: 'Score band label', pt: 'Rótulo da faixa', metricEn: 'Purchase at checkout · control = 100', metricPt: 'Compra no checkout · controle = 100', moved: false,
    arms: [{ en: 'Shown', pt: 'Visível', idx: 100, ci: 21 }, { en: 'Hidden', pt: 'Oculto', idx: 109, ci: 21 }],
    verdictEn: 'About 1,500 people per arm; the intervals overlap. No measurable effect.', verdictPt: 'Cerca de 1.500 pessoas por braço; os intervalos se sobrepõem. Sem efeito mensurável.',
  },
  {
    key: 'order', en: 'Item order', pt: 'Ordem das questões', metricEn: 'Completion · control = 100', metricPt: 'Conclusão · controle = 100', moved: false,
    arms: [{ en: 'Keep', pt: 'Manter', idx: 100 }, { en: 'Later', pt: 'Depois', idx: 103 }],
    verdictEn: 'Moving a hard question later changed completion by a rounding error.', verdictPt: 'Mover uma questão difícil para depois mudou a conclusão por um erro de arredondamento.',
  },
  {
    key: 'browser', en: 'Asking people to switch browser', pt: 'Pedir para trocar de navegador', metricEn: 'Purchases per person who finished the test · control = 100', metricPt: 'Compras por pessoa que terminou o teste · controle = 100', moved: false,
    chipEn: 'My hypothesis lost', chipPt: 'Minha hipótese perdeu',
    arms: [{ en: 'Straight to checkout', pt: 'Direto ao checkout', idx: 100 }, { en: 'Asked to switch first', pt: 'Pedido para trocar antes', idx: 49 }],
    verdictEn: 'The screen that sent people to their own browser sold about half as much, and a third left on it. Small sample: direction, not proof.', verdictPt: 'A tela que mandava as pessoas para o próprio navegador vendeu cerca de metade, e um terço saiu nela. Amostra pequena: direção, não prova.',
  },
];

export function MindYoungTests({ lang }: { lang: Lang }) {
  const [k, setK] = useState(TESTS[0].key);
  const t = TESTS.find(x => x.key === k)!;
  const max = Math.max(...t.arms.map(x => x.idx + (x.ci ?? 0))) * 1.12;
  return <figure className="my-chart">
    <div className="my-chart-head">
      <p className="label">{tr(lang, t.metricEn, t.metricPt)}</p>
      <fieldset className="my-seg" aria-label={tr(lang, 'Choose a comparison', 'Escolha uma comparação')}>
        {TESTS.map(x => <button key={x.key} type="button" aria-pressed={x.key === k} onClick={() => setK(x.key)}>{tr(lang, x.en, x.pt)}</button>)}
      </fieldset>
    </div>
    <div className="my-arms">{t.arms.map((arm, i) => <div key={arm.en} className={'my-arm' + (t.moved && i === 1 ? ' is-win' : '')}>
      <div className="my-arm-track">
        <span className="my-arm-bar" style={{ '--h': arm.idx / max } as CSSProperties} />
        {arm.ci && <span className="my-arm-ci" style={{ '--lo': (arm.idx - arm.ci) / max, '--hi': (arm.idx + arm.ci) / max } as CSSProperties} />}
      </div>
      <p className="my-arm-v">{arm.idx}</p>
      <p className="my-arm-k">{tr(lang, arm.en, arm.pt)}</p>
    </div>)}</div>
    <figcaption className="my-chart-read">
      <span className={'my-chip' + (t.moved ? ' is-moved' : '')}>{t.chipEn ? tr(lang, t.chipEn, t.chipPt ?? t.chipEn) : t.moved ? tr(lang, 'Moves the number', 'Move o número') : tr(lang, 'No effect', 'Sem efeito')}</span>
      {tr(lang, t.verdictEn, t.verdictPt)}
    </figcaption>
  </figure>;
}

/* ───────────────────────── How far people read the checkout ───────────────────────── */

/* Share of people who saw each section of the checkout page, split by whether
   they bought. Section-view events, once per visit; not a tap heatmap. */
const REACH = [
  { en: 'Headline and what you get', pt: 'Título e o que você recebe', no: 1, yes: 1 },
  { en: 'Payment block', pt: 'Bloco de pagamento', no: 0.89, yes: 1 },
  { en: 'Comparison', pt: 'Comparação', no: 0.66, yes: 0.49 },
  { en: 'Report preview', pt: 'Prévia do relatório', no: 0.53, yes: 0.29 },
  { en: 'What the test measures', pt: 'O que o teste mede', no: 0.42, yes: 0.17 },
  { en: 'Questions and answers', pt: 'Perguntas e respostas', no: 0.27, yes: 0.1 },
  { en: 'Footer', pt: 'Rodapé', no: 0.21, yes: 0.07 },
];

export function MindYoungReach({ lang }: { lang: Lang }) {
  return <figure className="my-chart">
    <div className="my-chart-head">
      <p className="label">{tr(lang, 'Share who saw each part of the payment page', 'Quantos viram cada parte da página de pagamento')}</p>
      <p className="my-reach-key"><span className="is-no" />{tr(lang, 'Did not buy', 'Não compraram')}<span className="is-yes" />{tr(lang, 'Bought', 'Compraram')}</p>
    </div>
    <ol className="my-reach">{REACH.map(r => <li key={r.en}>
      <span className="my-fname">{tr(lang, r.en, r.pt)}</span>
      <span className="my-reach-bars">
        <span className="my-reach-bar is-no" style={{ '--w': r.no } as CSSProperties}><i>{pct(r.no, lang, 0)}</i></span>
        <span className="my-reach-bar is-yes" style={{ '--w': r.yes } as CSSProperties}><i>{pct(r.yes, lang, 0)}</i></span>
      </span>
    </li>)}</ol>
    <figcaption className="my-chart-read">{tr(lang, 'Buyers decide near the top. People who leave keep reading, as if looking for a reason to pay.', 'Quem compra decide perto do topo. Quem vai embora continua lendo, como quem procura um motivo para pagar.')}</figcaption>
  </figure>;
}
