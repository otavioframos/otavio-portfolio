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
