'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
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
const CX = 450, CY = 290;

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

/** Metrics shown beside each step; the card updates as the story advances. */
const METRICS: { v: string; en: string; pt: string }[][] = [
  [{ v: '1', en: 'seed hashtag', pt: 'hashtag semente' }, { v: '4', en: 'platforms it can search', pt: 'plataformas onde pode buscar' }],
  [{ v: '10', en: 'videos carrying the seed', pt: 'vídeos com a semente' }, { v: '1', en: 'hop from the seed', pt: 'salto a partir da semente' }],
  [{ v: '12', en: 'co-occurring hashtags counted', pt: 'hashtags vizinhas contadas' }, { v: '×7', en: 'strongest co-occurrence', pt: 'coocorrência mais forte' }],
  [{ v: '6', en: 'paths followed', pt: 'caminhos seguidos' }, { v: '6', en: 'kept as evidence only', pt: 'mantidas só como evidência' }],
  [{ v: '43', en: 'paths from one seed, by default', pt: 'caminhos a partir de uma semente, no padrão' }, { v: '1,885', en: 'paths at the ceiling: 3 hops, 12 wide', pt: 'caminhos no limite: 3 saltos, 12 de largura' }],
];

export function RadarCluster({ lang }: { lang: Lang }) {
  const [step, setStep] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const fig = useRef<HTMLElement>(null);

  // The track is tall; the card sticks while scroll progress drives it. Layers
  // fade on continuous CSS variables, so the graph follows the finger instead
  // of jumping; React only re-renders when the step label changes.
  useEffect(() => {
    const el = track.current, f = fig.current;
    if (!el || !f) return;
    let frame = 0, last = -1;
    const ramp = (x: number, a: number) => Math.min(1, Math.max(0, (x - a) / 0.55));
    const read = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      const x = p * STEPS.length; // 0 → 5
      f.style.setProperty('--p', p.toFixed(4));
      f.style.setProperty('--l1', ramp(x, 0.7).toFixed(3));
      f.style.setProperty('--l2', ramp(x, 1.7).toFixed(3));
      f.style.setProperty('--l3', ramp(x, 2.7).toFixed(3));
      f.style.setProperty('--l4', ramp(x, 3.7).toFixed(3));
      const next = Math.min(STEPS.length - 1, Math.floor(x));
      if (next !== last) { last = next; setStep(next); }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + span * ((i + 0.5) / STEPS.length);
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const s = STEPS[step];
  const pt = lang === 'pt';
  return <div ref={track} className="rd-scrolly" style={{ '--steps': STEPS.length } as CSSProperties}>
    <figure ref={fig} className="my-chart rd-cluster">
      <div className="rd-progress" aria-hidden="true">{STEPS.map((_, i) => <span key={i} style={{ '--i': i } as CSSProperties} />)}</div>
      <div className="rd-cluster-stage">
    <svg className="rd-graph" viewBox="40 30 820 540" aria-hidden="true">
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
      </div>
      <div className="rd-cluster-side">
        <p className="label">{tr(lang, 'How a cluster is found · illustrative', 'Como um cluster é encontrado · ilustrativo')}</p>
        <ol className="rd-dots" aria-label={tr(lang, 'Steps', 'Etapas')}>
          {STEPS.map((x, i) => <li key={i}><button type="button" aria-current={i === step ? 'step' : undefined} className={i <= step ? 'is-done' : ''} onClick={() => go(i)}><span>{String(i + 1).padStart(2, '0')}</span>{tr(lang, x.en, x.pt)}</button></li>)}
        </ol>
        <p className="rd-now" key={'n' + step}><span>{String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}</span>{tr(lang, s.en, s.pt)}</p>
        <p className="rd-cluster-desc" aria-live="polite" key={step}>{tr(lang, s.dEn, s.dPt)}</p>
        <div className="rd-metrics decision"><div className="decision-card">
          {METRICS[step].map(m => <div key={m.en + step} className="rd-metric"><b>{pt ? m.v.replace(',', '.') : m.v}</b><span>{tr(lang, m.en, m.pt)}</span></div>)}
        </div></div>
      </div>
    </figure>
  </div>;
}

/* ───────────────────────── Inbox card ───────────────────────── */

type Status = 'new' | 'inspired' | 'used' | 'gone';
type Item = { id: string; handle: string; capEn: string; capPt: string; score: number; viral: string; views: string; path: string[]; hue: number };

/* Illustrative items in the production card layout (v3 tokens: paper, copper, dark card). */
const ITEMS: Item[] = [
  { id: 'a', handle: '@memorycoach', capEn: '3 memory tricks I wish I knew at 40', capPt: '3 truques de memória que eu queria saber aos 40', score: 86, viral: '3.4×', views: '412K', path: ['#braintraining', '#memory', '@memorycoach'], hue: 18 },
  { id: 'b', handle: '@focuslab', capEn: 'The 90-second focus reset', capPt: 'O reset de foco de 90 segundos', score: 79, viral: '2.1×', views: '128K', path: ['#braintraining', '#focus', '♫ lofi study'], hue: 210 },
  { id: 'c', handle: '@puzzleaday', capEn: 'Can you solve this before the timer?', capPt: 'Você resolve antes do cronômetro?', score: 71, viral: '1.6×', views: '64K', path: ['#braintraining', '#puzzle', '@puzzleaday'], hue: 140 },
];

const ACTIONS = [
  { key: 'inspire', en: 'Inspire me', pt: 'Inspirar', to: 'inspired' as Status, effEn: 'Moved to Inspired. It becomes a seed: the next run searches around it.', effPt: 'Foi para Inspirados. Vira semente: a próxima rodada busca em volta dele.' },
  { key: 'more', en: 'More like this', pt: 'Mais assim', to: 'inspired' as Status, effEn: 'Its path gains weight. Expect more from this corner of the graph.', effPt: 'O caminho dele ganha peso. Espere mais desse canto do grafo.' },
  { key: 'used', en: 'Used', pt: 'Usado', to: 'used' as Status, effEn: 'Marked as used and kept as a seed, so the team never re-reviews it.', effPt: 'Marcado como usado e mantido como semente, para o time nunca revisar de novo.' },
  { key: 'no', en: 'Not relevant', pt: 'Não relevante', to: 'gone' as Status, effEn: 'Removed from the inbox, and the path that found it stops counting.', effPt: 'Sai da caixa, e o caminho que o encontrou deixa de contar.' },
];

export function RadarCard({ lang }: { lang: Lang }) {
  const [status, setStatus] = useState<Record<string, Status>>({ a: 'new', b: 'new', c: 'new' });
  const [tab, setTab] = useState<Status>('new');
  const [sel, setSel] = useState('a');
  const [effect, setEffect] = useState<{ key: string; item: string } | null>(null);
  const list = ITEMS.filter(i => status[i.id] === tab);
  const it = ITEMS.find(i => i.id === sel) ?? ITEMS[0];
  const count = (s: Status) => ITEMS.filter(i => status[i.id] === s).length;
  const act = (a: typeof ACTIONS[number]) => {
    setStatus(st => ({ ...st, [it.id]: a.to }));
    setEffect({ key: a.key, item: it.id });
    const next = ITEMS.find(i => i.id !== it.id && status[i.id] === 'new');
    if (next) setSel(next.id);
  };
  const reset = () => { setStatus({ a: 'new', b: 'new', c: 'new' }); setTab('new'); setSel('a'); setEffect(null); };
  const eff = effect && ACTIONS.find(a => a.key === effect.key);
  const effItem = effect && ITEMS.find(i => i.id === effect.item);
  const tabs: [Status, string, string][] = [['new', 'New', 'Novos'], ['inspired', 'Inspired', 'Inspirados'], ['used', 'Used', 'Usados']];

  return <figure className="rc" aria-label={tr(lang, 'Content Radar inbox', 'Caixa do Content Radar')}>
    {/* eslint-disable-next-line @next/next/no-page-custom-font */}
    <link rel="stylesheet" precedence="default" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" />
    <div className="rc-inbox">
      <div className="rc-tabs" role="tablist">{tabs.map(([k, en, pt]) => <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{tr(lang, en, pt)}<span>{count(k)}</span></button>)}</div>
      <ul className="rc-list">
        {list.length === 0 && <li className="rc-empty">{tab === 'new' ? tr(lang, 'Inbox cleared.', 'Caixa zerada.') : tr(lang, 'Nothing here yet.', 'Nada aqui ainda.')}{tab === 'new' && <button type="button" onClick={reset}>{tr(lang, 'Reset demo', 'Reiniciar demo')}</button>}</li>}
        {list.map(i => <li key={i.id}><button type="button" className={'rc-row' + (i.id === sel ? ' is-sel' : '')} onClick={() => setSel(i.id)}>
          <span className="rc-thumb" style={{ '--h': i.hue } as CSSProperties} />
          <span className="rc-row-t"><b>{i.handle}</b>{tr(lang, i.capEn, i.capPt)}</span>
          <span className="rc-score">{i.score}</span>
        </button></li>)}
      </ul>
    </div>

    <div className="rc-detail" key={it.id}>
      <div className="rc-media" style={{ '--h': it.hue } as CSSProperties}><span>{it.handle}</span></div>
      <div className="rc-body">
        <p className="rc-cap">{tr(lang, it.capEn, it.capPt)}</p>
        <dl className="rc-scoreline">
          <div><dt>{tr(lang, 'Inspiration', 'Inspiração')}</dt><dd>{it.score}</dd></div>
          <div><dt>Viral</dt><dd>{it.viral}</dd></div>
          <div><dt>{tr(lang, 'Views', 'Views')}</dt><dd>{it.views}</dd></div>
        </dl>
        <div className="rc-why">
          <span>{tr(lang, 'Why it surfaced', 'Por que apareceu')}</span>
          <ol className={'rc-path' + (effect?.key === 'no' && effect.item === it.id ? ' is-cut' : '')}>{it.path.map((p, i) => <li key={p}>{i > 0 && <i aria-hidden="true">→</i>}<span>{p}</span></li>)}</ol>
        </div>
        <div className="rc-actions">{ACTIONS.map((a, i) => <button key={a.key} type="button" className={i < 2 ? '' : 'is-2'} disabled={status[it.id] !== 'new'} onClick={() => act(a)}>{tr(lang, a.en, a.pt)}</button>)}</div>
      </div>
    </div>

    <p className="rc-effect" aria-live="polite">{eff && effItem
      ? <><b>{effItem.handle}</b> · {tr(lang, eff.effEn, eff.effPt)}</>
      : tr(lang, 'Illustrative items in the production layout. Try an action: each one changes what the next run looks for.', 'Itens ilustrativos no layout de produção. Teste uma ação: cada uma muda o que a próxima rodada procura.')}</p>
  </figure>;
}
