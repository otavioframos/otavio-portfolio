'use client';

import { useState } from 'react';
import type { Lang } from '@/lib/projects';

/**
 * Content Radar case figures: how the architecture evolved across three
 * versions, and the discovery loop the current version runs.
 */

const tr = (lang: Lang, en: string, pt: string) => (lang === 'pt' ? pt : en);

type Node = { en: string; pt: string; tool: string };
type Version = { key: string; en: string; pt: string; nodes: Node[]; noteEn: string; notePt: string };

const VERSIONS: Version[] = [
  {
    key: 'v1', en: 'V1 · Automation', pt: 'V1 · Automação',
    nodes: [
      { en: 'Collect videos', pt: 'Coletar vídeos', tool: 'n8n' },
      { en: 'Organise', pt: 'Organizar', tool: 'Airtable' },
      { en: 'Read captions', pt: 'Ler legendas', tool: 'n8n' },
      { en: 'Judge relevance', pt: 'Julgar relevância', tool: 'LLM' },
      { en: 'Suggest directions', pt: 'Sugerir caminhos', tool: 'LLM' },
    ],
    noteEn: 'Enough for one product. Research became repeatable, but volume and control ran out as soon as a second team asked for it.',
    notePt: 'Suficiente para um produto. A pesquisa ficou repetível, mas volume e controle acabaram assim que um segundo time pediu.',
  },
  {
    key: 'v2', en: 'V2 · Product', pt: 'V2 · Produto',
    nodes: [
      { en: 'Tell it what to find', pt: 'Dizer o que buscar', tool: 'Browser UI' },
      { en: 'Collect at volume', pt: 'Coletar em volume', tool: 'Python' },
      { en: 'Analyse', pt: 'Analisar', tool: 'LLM' },
      { en: 'Read findings', pt: 'Ler descobertas', tool: 'Browser UI' },
      { en: 'Inspect evidence', pt: 'Ver evidências', tool: 'Browser UI' },
    ],
    noteEn: 'The rebuild. Collection moved to Python and the work moved to a browser interface designed around three questions: what to look for, what to do with it, and why to trust it.',
    notePt: 'A reconstrução. A coleta foi para Python e o trabalho foi para uma interface no navegador desenhada em torno de três perguntas: o que buscar, o que fazer com isso e por que confiar.',
  },
  {
    key: 'v3', en: 'V3 · Today', pt: 'V3 · Hoje',
    nodes: [
      { en: 'Seed a folder', pt: 'Semear uma pasta', tool: 'Inbox' },
      { en: 'Discover adjacent', pt: 'Descobrir o entorno', tool: 'Worker' },
      { en: 'Rank and diversify', pt: 'Ranquear e diversificar', tool: 'Ranking' },
      { en: 'Clear the inbox', pt: 'Zerar a caixa', tool: 'Inbox' },
      { en: 'Learn from feedback', pt: 'Aprender com feedback', tool: 'Seeds' },
    ],
    noteEn: 'A shared workspace for several products. A durable worker does the collecting, ranking is explainable, and every judgement from the team feeds the next run.',
    notePt: 'Um workspace compartilhado por vários produtos. Um worker durável faz a coleta, o ranking é explicável e cada avaliação do time alimenta a próxima rodada.',
  },
];

export function RadarEvolution({ lang }: { lang: Lang }) {
  const [k, setK] = useState('v1');
  const v = VERSIONS.find(x => x.key === k)!;
  return <figure className="my-chart rd-evo">
    <div className="my-chart-head">
      <p className="label">{tr(lang, 'Architecture, version by version', 'Arquitetura, versão a versão')}</p>
      <fieldset className="my-seg" aria-label={tr(lang, 'Choose a version', 'Escolha uma versão')}>
        {VERSIONS.map(x => <button key={x.key} type="button" aria-pressed={x.key === k} onClick={() => setK(x.key)}>{tr(lang, x.en, x.pt)}</button>)}
      </fieldset>
    </div>
    <ol className="rd-pipe" key={k}>{v.nodes.map((n, i) => <li key={n.en} style={{ animationDelay: `${i * 70}ms` }}>
      <span className="rd-tool">{n.tool}</span>
      <span className="rd-step">{tr(lang, n.en, n.pt)}</span>
      {k === 'v3' && i === v.nodes.length - 1 && <span className="rd-loopback" aria-hidden="true">↺</span>}
    </li>)}</ol>
    <figcaption className="my-chart-read" aria-live="polite">{tr(lang, v.noteEn, v.notePt)}</figcaption>
  </figure>;
}

const LOOP = [
  { en: 'Seed', pt: 'Semente', dEn: 'A few videos, creators, hashtags or search terms from the niche. TikTok, Instagram Reels, YouTube Shorts and the Meta Ad Library.', dPt: 'Alguns vídeos, criadores, hashtags ou buscas do nicho. TikTok, Instagram Reels, YouTube Shorts e a Biblioteca de Anúncios da Meta.' },
  { en: 'Expand', pt: 'Expandir', dEn: 'Creators, sounds, hashtags and topics around each seed become new paths, two hops deep and six wide, so it explores without turning into endless scrolling.', dPt: 'Criadores, sons, hashtags e temas em volta de cada semente viram novos caminhos, com dois saltos de profundidade e seis de largura, para explorar sem virar rolagem infinita.' },
  { en: 'Rank', pt: 'Ranquear', dEn: 'Relevance, momentum, engagement and novelty are fused, then reranked for diversity. Each card shows the path that found it.', dPt: 'Relevância, tração, engajamento e novidade são combinados e reordenados por diversidade. Cada card mostra o caminho que o encontrou.' },
  { en: 'Review', pt: 'Revisar', dEn: 'A finite inbox: New, Inspired, Used, All. The goal is a queue you can clear, not a feed you scroll.', dPt: 'Uma caixa finita: Novos, Inspirados, Usados, Todos. O objetivo é uma fila que se esvazia, não um feed que se rola.' },
  { en: 'Learn', pt: 'Aprender', dEn: '“Inspire”, “More like this” and “Used” become seeds for the next run; “Not relevant” removes the item and what led to it.', dPt: '“Inspirar”, “Mais assim” e “Usado” viram sementes da próxima rodada; “Não relevante” remove o item e o que levou até ele.' },
];

export function RadarLoop({ lang }: { lang: Lang }) {
  const [a, setA] = useState(0);
  const R = 150, cx = 200, cy = 190;
  const pos = LOOP.map((_, i) => {
    const t = -Math.PI / 2 + (i / LOOP.length) * Math.PI * 2;
    return { x: cx + Math.cos(t) * R, y: cy + Math.sin(t) * R };
  });
  return <figure className="my-chart rd-loop">
    <div className="my-chart-head"><p className="label">{tr(lang, 'The discovery loop', 'O ciclo de descoberta')}</p></div>
    <div className="rd-loop-body">
      <div className="rd-loop-stage">
      <svg viewBox="0 0 400 380" className="rd-loop-svg" aria-hidden="true">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--line)" strokeDasharray="2 6" strokeLinecap="round" className="dg-march" />
        <circle cx={cx} cy={cy} r={R - 40} fill="none" stroke="var(--line)" />
        <g className="dg-spin-slow" style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <path d={`M${cx} ${cy}L${cx} ${cy - R + 40}A${R - 40} ${R - 40} 0 0 1 ${cx + (R - 40) * Math.sin(0.6)} ${cy - (R - 40) * Math.cos(0.6)}Z`} fill="rgba(143,184,255,.12)" />
        </g>
        <circle cx={cx} cy={cy} r="4" fill="var(--fg)" />
      </svg>
      {LOOP.map((s, i) => <button key={s.en} type="button" className={'rd-node' + (i === a ? ' is-active' : '')} style={{ left: `${(pos[i].x / 400) * 100}%`, top: `${(pos[i].y / 380) * 100}%` }} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)}>
        <span>{String(i + 1).padStart(2, '0')}</span>{tr(lang, s.en, s.pt)}
      </button>)}
      </div>
      <p className="rd-loop-read" aria-live="polite"><b>{tr(lang, LOOP[a].en, LOOP[a].pt)}</b>{tr(lang, LOOP[a].dEn, LOOP[a].dPt)}</p>
    </div>
  </figure>;
}

/* ───────────────────────── Hashtag clusters ───────────────────────── */

/* Illustrative data: one seed hashtag, the videos that carry it, and how often
   other hashtags co-occur on those videos. Real runs use the same rule. */
const SEED = '#braintraining';
const TAGS = [
  { t: '#memory', f: 7 }, { t: '#focus', f: 6 }, { t: '#brainhealth', f: 5 }, { t: '#adhd', f: 5 },
  { t: '#studytips', f: 4 }, { t: '#neuroscience', f: 4 }, { t: '#puzzle', f: 3 }, { t: '#iqtest', f: 3 },
  { t: '#mindset', f: 2 }, { t: '#productivity', f: 2 }, { t: '#sudoku', f: 1 }, { t: '#chess', f: 1 },
];
const BEAM = 6;
const VIDEOS = 10;
const W = 900, H = 580, CX = 450, CY = 290;

// Deterministic video → tag edges that add up to each tag's frequency.
const EDGES: [number, number][] = TAGS.flatMap((tag, ti) => Array.from({ length: tag.f }, (_, k) => [(ti * 3 + k * 7) % VIDEOS, ti] as [number, number]));
const vPos = Array.from({ length: VIDEOS }, (_, i) => { const a = -Math.PI / 2 + (i / VIDEOS) * Math.PI * 2 + 0.2; return { x: CX + Math.cos(a) * 120, y: CY + Math.sin(a) * 96 }; });
// Followed tags take every other slot so the clusters spread around the seed.
const tPos = TAGS.map((_, i) => { const slot = i < BEAM ? i * 2 : (i - BEAM) * 2 + 1; const a = -Math.PI / 2 + (slot / TAGS.length) * Math.PI * 2; return { x: CX + Math.cos(a) * 320, y: CY + Math.sin(a) * 200, a }; });
// Second hop: each followed tag pulls its own small cluster of videos further out.
const HOP2 = TAGS.slice(0, BEAM).flatMap((_, ti) => Array.from({ length: 5 }, (_, k) => {
  const { a } = tPos[ti], spread = (k - 2) * 0.12, r = 58 + (k % 2) * 20;
  return { ti, x: tPos[ti].x + Math.cos(a + spread) * r, y: tPos[ti].y + Math.sin(a + spread) * r * 0.8 };
}));

const STEPS = [
  { en: 'Start with one hashtag.', pt: 'Comece com uma hashtag.', dEn: 'The team gives the radar a single seed from the niche.', dPt: 'O time dá ao radar uma única semente do nicho.' },
  { en: 'Pull the videos that use it.', pt: 'Puxe os vídeos que a usam.', dEn: 'Every video found carries the seed, plus the other hashtags its creator chose.', dPt: 'Cada vídeo encontrado carrega a semente e as outras hashtags que o criador escolheu.' },
  { en: 'Count what travels with it.', pt: 'Conte o que anda junto.', dEn: 'Each co-occurring hashtag is counted. The bigger the node, the more often it appears next to the seed.', dPt: 'Cada hashtag que aparece junto é contada. Quanto maior o nó, mais vezes ela aparece ao lado da semente.' },
  { en: 'Follow only the strongest six.', pt: 'Siga só as seis mais fortes.', dEn: 'The six most frequent become new paths. The rest stay as evidence but are not followed, so the search stays focused.', dPt: 'As seis mais frequentes viram novos caminhos. O resto fica como evidência mas não é seguido, e a busca continua focada.' },
  { en: 'Repeat, one hop further.', pt: 'Repita, um salto adiante.', dEn: 'Each path runs the same rule again. Clusters form around the seed: related content no one had to search for by hand.', dPt: 'Cada caminho roda a mesma regra de novo. Clusters se formam em volta da semente: conteúdo relacionado que ninguém precisou buscar à mão.' },
];

export function RadarCluster({ lang }: { lang: Lang }) {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  const nf = (n: number) => n.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US');
  return <figure className="my-chart rd-cluster" data-step={step}>
    <div className="my-chart-head">
      <p className="label">{tr(lang, 'How a cluster is found · illustrative', 'Como um cluster é encontrado · ilustrativo')}</p>
      <fieldset className="my-seg" aria-label={tr(lang, 'Step', 'Etapa')}>
        {STEPS.map((_, i) => <button key={i} type="button" aria-pressed={i === step} onClick={() => setStep(i)}>{i + 1}</button>)}
      </fieldset>
    </div>
    <svg className="rd-graph" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <g className="rd-l rd-l-hop2">
        {HOP2.map((p, i) => <line key={`h${i}`} x1={tPos[p.ti].x} y1={tPos[p.ti].y} x2={p.x} y2={p.y} className="rd-edge rd-edge-2" />)}
        {HOP2.map((p, i) => <rect key={`d${i}`} x={p.x - 4} y={p.y - 4} width="8" height="8" rx="2" className={`rd-vid2 c${p.ti % 3}`} />)}
      </g>
      <g className="rd-l rd-l-edges">
        {EDGES.map(([v, t], i) => <line key={i} x1={vPos[v].x} y1={vPos[v].y} x2={tPos[t].x} y2={tPos[t].y} className={'rd-edge' + (t < BEAM ? ' is-beam' : '')} />)}
      </g>
      <g className="rd-l rd-l-videos">
        {vPos.map((p, i) => <g key={i}><line x1={CX} y1={CY} x2={p.x} y2={p.y} className="rd-edge rd-edge-seed" /><rect x={p.x - 7} y={p.y - 7} width="14" height="14" rx="3" className="rd-vid" /></g>)}
      </g>
      <g className="rd-l rd-l-tags">
        {TAGS.map((tag, i) => { const r = 5 + tag.f * 2.4, p = tPos[i], below = p.y <= CY + 20; return <g key={tag.t} className={'rd-tag' + (i < BEAM ? ' is-beam' : '')}>
          <circle cx={p.x} cy={p.y} r={r} />
          {/* Label sits on the side facing the seed; the next hop grows outward. */}
          <text x={p.x} y={below ? p.y + r + 18 : p.y - r - 9} textAnchor="middle">{tag.t}<tspan className="rd-f"> ×{tag.f}</tspan></text>
        </g>; })}
      </g>
      <g className="rd-seed">
        <circle cx={CX} cy={CY} r="34" className="rd-seed-halo" />
        <circle cx={CX} cy={CY} r="9" />
        <text x={CX} y={CY + 56} textAnchor="middle">{SEED}</text>
      </g>
    </svg>
    <div className="rd-cluster-foot">
      <p className="rd-loop-read" aria-live="polite"><b>{tr(lang, s.en, s.pt)}</b>{tr(lang, s.dEn, s.dPt)}</p>
      <div className="rd-cluster-nav">
        <button type="button" className="my-toggle rd-btn" disabled={step === 0} onClick={() => setStep(v => v - 1)}>←</button>
        <button type="button" className="my-toggle rd-btn" onClick={() => setStep(v => (v + 1) % STEPS.length)}>{step === STEPS.length - 1 ? tr(lang, 'Restart', 'Recomeçar') : tr(lang, 'Next', 'Próximo')} →</button>
      </div>
    </div>
    <dl className="rd-capacity">
      <div><dt>{nf(43)}</dt><dd>{tr(lang, 'discovery paths from one seed, by default (1 → 6 → 36)', 'caminhos de descoberta a partir de uma semente, no padrão (1 → 6 → 36)')}</dd></div>
      <div><dt>{nf(1885)}</dt><dd>{tr(lang, 'paths at the ceiling: three hops, twelve wide', 'caminhos no limite máximo: três saltos, doze de largura')}</dd></div>
      <div><dt>4</dt><dd>{tr(lang, 'platforms searched with the same rule', 'plataformas buscadas com a mesma regra')}</dd></div>
    </dl>
  </figure>;
}
