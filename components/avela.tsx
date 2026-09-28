'use client';

import { useState, type CSSProperties } from 'react';
import type { Lang } from '@/lib/projects';

/**
 * Avela case figures: the framing matrix, the quiz entry rebuild and the
 * onboarding re-order. Funnel effects are shown relative to the old version
 * (= 100); no absolute volumes, purchases or revenue.
 */

const tr = (lang: Lang, en: string, pt: string) => (lang === 'pt' ? pt : en);

/* ───────────────────────── Framing matrix ───────────────────────── */

const MATRIX = [
  {
    key: 'c', en: 'Certainties', pt: 'Certezas', hintEn: 'Build on these.', hintPt: 'Construir sobre elas.',
    items: [
      { en: 'Perimenopause changes appetite, sleep and energy week to week.', pt: 'A perimenopausa muda apetite, sono e energia de uma semana para outra.' },
      { en: 'Taking a photo is the lowest-effort way to log a meal.', pt: 'Tirar uma foto é o jeito de menor esforço para registrar uma refeição.' },
      { en: 'Weight-first messaging carries guilt for this audience.', pt: 'Mensagens centradas em peso carregam culpa para esse público.' },
    ],
  },
  {
    key: 'a', en: 'Assumptions', pt: 'Suposições', hintEn: 'Design for them, then test.', hintPt: 'Desenhar para elas e testar.',
    items: [
      { en: 'A supportive tone keeps people through imperfect days.', pt: 'Um tom acolhedor mantém as pessoas nos dias imperfeitos.' },
      { en: 'Recognising their own pattern early earns the harder questions.', pt: 'Reconhecer o próprio padrão cedo dá licença para as perguntas difíceis.' },
      { en: 'Fridge and menu flows matter as much as the plate.', pt: 'Os fluxos de geladeira e cardápio importam tanto quanto o prato.' },
    ],
  },
  {
    key: 'd', en: 'Doubts', pt: 'Dúvidas', hintEn: 'Keep out of the interface until answered.', hintPt: 'Manter fora da interface até ter resposta.',
    items: [
      { en: 'Which guidance needs clinical validation before it ships?', pt: 'Que orientação precisa de validação clínica antes de ir ao ar?' },
      { en: 'Will people come back after the first week?', pt: 'As pessoas voltam depois da primeira semana?' },
      { en: 'How accurate is third-party vision on home-cooked food?', pt: 'Quão precisa é a visão de terceiros com comida caseira?' },
    ],
  },
];

export function AvelaMatrix({ lang }: { lang: Lang }) {
  const [k, setK] = useState('a');
  return <figure className="my-chart av-matrix">
    <div className="my-chart-head">
      <p className="label">{tr(lang, 'Certainties, assumptions and doubts', 'Certezas, suposições e dúvidas')}</p>
    </div>
    <div className="av-cols">{MATRIX.map(col => <button key={col.key} type="button" className={'av-col' + (col.key === k ? ' is-active' : '')} aria-pressed={col.key === k} onClick={() => setK(col.key)} onMouseEnter={() => setK(col.key)}>
      <span className="av-col-head"><b>{tr(lang, col.en, col.pt)}</b><small>{tr(lang, col.hintEn, col.hintPt)}</small></span>
      <ul>{col.items.map(it => <li key={it.en}>{tr(lang, it.en, it.pt)}</li>)}</ul>
    </button>)}</div>
  </figure>;
}

/* ───────────────────────── Quiz rebuild ───────────────────────── */

const QUIZ = [
  {
    key: 'complete', en: 'Completion', pt: 'Conclusão', metricEn: 'Quiz completion per start · old quiz = 100', metricPt: 'Conclusão por início · quiz antigo = 100',
    arms: [{ en: 'Old quiz · June', pt: 'Quiz antigo · junho', idx: 100 }, { en: 'Rebuilt quiz · July', pt: 'Quiz refeito · julho', idx: 740 }],
    readEn: 'Same paid traffic, new quiz: over seven times as many people who started went on to finish.', readPt: 'Mesmo tráfego pago, quiz novo: mais de sete vezes mais pessoas que começaram chegaram ao fim.',
  },
  {
    key: 'entry', en: 'First step', pt: 'Primeira etapa', metricEn: 'Passing the first question · old quiz = 100', metricPt: 'Passagem pela primeira pergunta · quiz antigo = 100',
    arms: [{ en: 'Old quiz · June', pt: 'Quiz antigo · junho', idx: 100 }, { en: 'Rebuilt quiz · July', pt: 'Quiz refeito · julho', idx: 420 }],
    readEn: 'The first screen stopped being a wall. Four times as many people moved past it.', readPt: 'A primeira tela deixou de ser uma parede. Quatro vezes mais pessoas passaram por ela.',
  },
  {
    key: 'ads', en: 'Ad promise', pt: 'Promessa do anúncio', metricEn: 'Passing the first question, by ad · montage = 100', metricPt: 'Passagem pela primeira pergunta, por anúncio · montagem = 100',
    arms: [{ en: 'Montage, no quiz promise', pt: 'Montagem, sem promessa de quiz', idx: 100 }, { en: 'Invites to take the quiz', pt: 'Convida a fazer o quiz', idx: 1800 }],
    readEn: 'Same quiz, different ads. When the ad promised the quiz, eighteen times more people engaged with it. The fix was message match, not another screen.', readPt: 'Mesmo quiz, anúncios diferentes. Quando o anúncio prometia o quiz, dezoito vezes mais pessoas se engajaram. A correção era alinhar a mensagem, não mais uma tela.',
  },
];

export function AvelaQuiz({ lang }: { lang: Lang }) {
  const [k, setK] = useState(QUIZ[0].key);
  const t = QUIZ.find(x => x.key === k)!;
  const max = Math.max(...t.arms.map(a => a.idx)) * 1.12;
  const mult = t.arms[1].idx / t.arms[0].idx;
  return <figure className="my-chart">
    <div className="my-chart-head">
      <p className="label">{tr(lang, t.metricEn, t.metricPt)}</p>
      <fieldset className="my-seg" aria-label={tr(lang, 'Choose a comparison', 'Escolha uma comparação')}>
        {QUIZ.map(x => <button key={x.key} type="button" aria-pressed={x.key === k} onClick={() => setK(x.key)}>{tr(lang, x.en, x.pt)}</button>)}
      </fieldset>
    </div>
    <div className="my-arms">{t.arms.map((arm, i) => <div key={arm.en} className={'my-arm' + (i === 1 ? ' is-win' : '')}>
      <div className="my-arm-track"><span className="my-arm-bar" style={{ '--h': arm.idx / max } as CSSProperties} /></div>
      <p className="my-arm-v">{i === 1 ? `${mult.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US', { maximumFractionDigits: 1 })}×` : '1×'}</p>
      <p className="my-arm-k">{tr(lang, arm.en, arm.pt)}</p>
    </div>)}</div>
    <figcaption className="my-chart-read"><span className="my-chip is-moved">{tr(lang, 'Moves the number', 'Move o número')}</span>{tr(lang, t.readEn, t.readPt)}</figcaption>
  </figure>;
}

/* ───────────────────────── Onboarding order ───────────────────────── */

type Mark = { key: string; at: number; en: string; pt: string };
const ORDER: Record<'before' | 'after', { total: number; marks: Mark[] }> = {
  before: { total: 27, marks: [
    { key: 'payoff', at: 3, en: 'First payoff', pt: 'Primeira recompensa' },
    { key: 'weight', at: 7, en: 'Weight', pt: 'Peso' },
    { key: 'target', at: 9, en: 'Target weight', pt: 'Peso-alvo' },
    { key: 'pattern', at: 16, en: 'Your pattern', pt: 'Seu padrão' },
    { key: 'safety', at: 20, en: 'Safety check', pt: 'Checagem de segurança' },
    { key: 'reveal', at: 25, en: 'Plan (static)', pt: 'Plano (fixo)' },
  ] },
  after: { total: 24, marks: [
    { key: 'pattern', at: 6, en: 'Your pattern', pt: 'Seu padrão' },
    { key: 'safety', at: 8, en: 'Safety check', pt: 'Checagem de segurança' },
    { key: 'payoff', at: 11, en: 'Calibration', pt: 'Calibração' },
    { key: 'weight', at: 13, en: 'Weight', pt: 'Peso' },
    { key: 'target', at: 15, en: 'Target weight', pt: 'Peso-alvo' },
    { key: 'reveal', at: 22, en: 'Plan (editable)', pt: 'Plano (editável)' },
  ] },
};

export function AvelaOnboarding({ lang }: { lang: Lang }) {
  const [v, setV] = useState<'before' | 'after'>('after');
  const o = ORDER[v];
  return <figure className="my-chart av-order">
    <div className="my-chart-head">
      <p className="label">{tr(lang, 'Onboarding, screen by screen', 'Onboarding, tela a tela')}</p>
      <fieldset className="my-seg" aria-label={tr(lang, 'Choose a flow', 'Escolha um fluxo')}>
        <button type="button" aria-pressed={v === 'before'} onClick={() => setV('before')}>{tr(lang, 'Before', 'Antes')}</button>
        <button type="button" aria-pressed={v === 'after'} onClick={() => setV('after')}>{tr(lang, 'The First Session', 'A Primeira Sessão')}</button>
      </fieldset>
    </div>
    <div className="av-track" style={{ '--n': o.total } as CSSProperties}>
      <div className="av-screens">{Array.from({ length: 27 }, (_, i) => <span key={i} className={i < o.total ? '' : 'is-gone'} />)}</div>
      {ORDER.after.marks.map(m => {
        const at = o.marks.find(x => x.key === m.key)!;
        return <div key={m.key} className={`av-mark av-${m.key}`} style={{ '--x': (at.at - 0.5) / 27 } as CSSProperties}>
          <span className="av-pin" /><span className="av-name">{tr(lang, at.en, at.pt)}<small>{at.at}</small></span>
        </div>;
      })}
    </div>
    <figcaption className="my-chart-read" aria-live="polite">
      <span className={'my-chip' + (v === 'after' ? ' is-moved' : '')}>{v === 'after' ? '48 / 55' : '34 / 55'}</span>
      {v === 'before'
        ? tr(lang, 'Weight and target weight came eleven screens before the safety check, and the plan arrived as a fixed answer.', 'Peso e peso-alvo vinham onze telas antes da checagem de segurança, e o plano chegava como uma resposta fixa.')
        : tr(lang, 'Open with the day she recognises, check safety before any number, and end on a plan she can edit. Scored 48 of 55 on the review rubric, against 34.', 'Abrir com o dia que ela reconhece, checar segurança antes de qualquer número e terminar num plano que ela pode editar. Nota 48 de 55 na rubrica de revisão, contra 34.')}
    </figcaption>
  </figure>;
}

/* ───────────────────────── Design system ───────────────────────── */

/* Production tokens from the app (src/design/tokens.js). */
const AV_COLORS = [
  { name: 'Charcoal', hex: '#24312E', en: 'Text', pt: 'Texto' },
  { name: 'Olive', hex: '#66736F', en: 'Muted text', pt: 'Texto secundário' },
  { name: 'Sage', hex: '#5E8C83', en: 'Brand and actions', pt: 'Marca e ações' },
  { name: 'Sage light', hex: '#E8F0EE', en: 'Coach and selection', pt: 'Coach e seleção' },
  { name: 'Coral', hex: '#D98B73', en: 'Warmth and cravings', pt: 'Acolhimento e vontades' },
  { name: 'Gold', hex: '#D6A24A', en: 'Fibre and gentle warnings', pt: 'Fibras e alertas leves' },
  { name: 'Sand', hex: '#EADFCF', en: 'Borders and tracks', pt: 'Bordas e trilhas' },
  { name: 'Cream', hex: '#FAF7F2', en: 'Paper ground', pt: 'Fundo papel' },
];

const FEELINGS = [
  { en: 'Satisfied', pt: 'Satisfeita', score: 82, coachEn: 'Nice balance. The fibre here will carry you to the afternoon.', coachPt: 'Bom equilíbrio. As fibras daqui te levam até a tarde.' },
  { en: 'Still hungry', pt: 'Ainda com fome', score: 64, coachEn: 'Good to know. Tomorrow we can add a little more protein at lunch.', coachPt: 'Bom saber. Amanhã podemos colocar um pouco mais de proteína no almoço.' },
  { en: 'Too full', pt: 'Cheia demais', score: 71, coachEn: 'That happens. A lighter dinner will balance the day, no need to skip it.', coachPt: 'Acontece. Um jantar mais leve equilibra o dia, sem precisar pular.' },
];

export function AvelaSystem({ lang }: { lang: Lang }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [weight, setWeight] = useState(500);
  const [soft, setSoft] = useState(100);
  const [feel, setFeel] = useState(0);
  const [pressed, setPressed] = useState(false);
  const f = FEELINGS[feel];
  const C = 2 * Math.PI * 27;

  const copy = (hex: string) => {
    navigator.clipboard?.writeText(hex).catch(() => {});
    setCopied(hex);
    window.setTimeout(() => setCopied(c => (c === hex ? null : c)), 1400);
  };

  return <figure className="my-ds av-ds" aria-label={tr(lang, 'Avela design system', 'Design system do Avela')}>
    {/* eslint-disable-next-line @next/next/no-page-custom-font */}
    <link rel="stylesheet" precedence="default" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..800,0..100&family=Manrope:wght@400;500;600;700&display=swap" />

    <div className="my-ds-cell my-ds-colors">
      <p className="my-ds-k">{tr(lang, 'Colour', 'Cor')}</p>
      <ul>{AV_COLORS.map(c => <li key={c.hex}>
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
      <p className="my-type-display" style={{ fontWeight: weight, fontVariationSettings: `'SOFT' ${soft}, 'opsz' 96` }}>{tr(lang, 'Room for imperfect days.', 'Espaço para dias imperfeitos.')}</p>
      <p className="my-type-meta">Fraunces · {tr(lang, 'display', 'títulos')} · {weight} / SOFT {soft}</p>
      <div className="my-sliders">
        <label>{tr(lang, 'Weight', 'Peso')}<input type="range" min={300} max={800} step={10} value={weight} onChange={e => setWeight(+e.target.value)} /></label>
        <label>{tr(lang, 'Softness', 'Suavidade')}<input type="range" min={0} max={100} value={soft} onChange={e => setSoft(+e.target.value)} /></label>
      </div>
      <p className="my-type-body">{tr(lang, 'Manrope carries everything you read and tap: clear at small sizes, friendly without being cute. Fraunces, soft and warm, is saved for the moments that should feel human.', 'Manrope cuida de tudo que se lê e toca: clara em tamanhos pequenos, simpática sem ser infantil. A Fraunces, suave e calorosa, fica para os momentos que devem soar humanos.')}</p>
      <p className="my-type-meta">Manrope · {tr(lang, 'body', 'texto')} · 400 / 500 / 600 / 700</p>
    </div>

    <div className="my-ds-cell my-ds-shape">
      <p className="my-ds-k">{tr(lang, 'Shape', 'Forma')}</p>
      <ul className="my-radii">{[{ t: 'bubble', v: 18 }, { t: 'card', v: 20 }, { t: 'option', v: 20 }, { t: 'pill', v: 999 }].map(r => <li key={r.t}><span style={{ borderRadius: Math.min(r.v, 40) }} /><b>{r.t}</b><i>{r.v}px</i></li>)}</ul>
      <p className="my-ds-note">{tr(lang, 'One 20px radius for everything you hold, flat surfaces with a hairline of sand instead of shadows, and the coach set apart in sage.', 'Um raio de 20px para tudo que se segura, superfícies planas com um fio de areia no lugar de sombras e o coach destacado em sálvia.')}</p>
    </div>

    <div className="my-ds-cell my-ds-grid">
      <p className="my-ds-k">{tr(lang, 'Components', 'Componentes')}</p>
      <div className="my-phone">
        <div className="my-phone-col">
          <div className="av-meal">
            <svg className="av-ring" viewBox="0 0 64 64" aria-hidden="true">
              <circle className="t" cx="32" cy="32" r="27" />
              <circle className="v" cx="32" cy="32" r="27" strokeDasharray={C} strokeDashoffset={C * (1 - f.score / 100)} transform="rotate(-90 32 32)" />
              <text x="32" y="39" textAnchor="middle">{f.score}</text>
            </svg>
            <div className="av-meal-k"><b>{tr(lang, 'Lunch · grain bowl', 'Almoço · bowl de grãos')}</b>
              <div className="av-bars">
                {[{ k: tr(lang, 'Protein', 'Proteína'), w: feel === 1 ? 38 : 62, c: '#5E8C83' }, { k: tr(lang, 'Fibre', 'Fibras'), w: 78, c: '#D6A24A' }].map(b => <span key={b.k} className="av-bar">{b.k}<i><span style={{ width: `${b.w}%`, background: b.c }} /></i></span>)}
              </div>
            </div>
          </div>
          <p className="av-bubble" aria-live="polite">{tr(lang, f.coachEn, f.coachPt)}</p>
          <p className="my-q">{tr(lang, 'How did it feel?', 'Como você se sentiu?')}</p>
          <div className="my-opts">
            {FEELINGS.map((o, i) => <button key={o.en} type="button" aria-pressed={feel === i} className="my-opt" onClick={() => setFeel(i)}><span className="my-radio" />{tr(lang, o.en, o.pt)}</button>)}
          </div>
          <button type="button" className={'my-cta' + (pressed ? ' is-pressed' : '')} onPointerDown={() => setPressed(true)} onPointerUp={() => setPressed(false)} onPointerLeave={() => setPressed(false)}>{tr(lang, 'Save meal', 'Salvar refeição')}</button>
        </div>
      </div>
      <p className="my-ds-note">{tr(lang, 'Pick how the meal felt: the score, the bars and the coach respond, never with a warning.', 'Escolha como a refeição foi: a nota, as barras e o coach respondem, nunca com uma bronca.')}</p>
    </div>
  </figure>;
}
