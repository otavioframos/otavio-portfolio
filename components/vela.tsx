'use client';

import { useState, type CSSProperties } from 'react';
import type { Lang } from '@/lib/projects';

/**
 * Vela case figures: the five design principles, the job stories by frequency
 * and how the core metric changed. Content from the project's own process
 * docs; no personal financial data.
 */

const tr = (lang: Lang, en: string, pt: string) => (lang === 'pt' ? pt : en);

const PRINCIPLES = [
  { k: 'P1', en: 'Minimal logging friction', pt: 'Atrito mínimo no lançamento', ruleEn: 'Three seconds, three taps. The amount opens first; everything else sits behind “details”.', rulePt: 'Três segundos, três toques. O valor abre primeiro; o resto fica atrás de “detalhes”.', antiEn: 'A form that asks for category before amount.', antiPt: 'Um formulário que pede categoria antes do valor.' },
  { k: 'P2', en: 'Predictability over history', pt: 'Previsibilidade acima de histórico', ruleEn: 'Answer “how will I be” before “how was I”. The future is the product; the past is a by-product.', rulePt: 'Responder “como vou estar” antes de “como estive”. O futuro é o produto; o passado é subproduto.', antiEn: 'A dashboard of last month’s pie charts.', antiPt: 'Um painel com gráficos de pizza do mês passado.' },
  { k: 'P3', en: 'Optional granularity', pt: 'Granularidade opcional', ruleEn: 'Five macro types balance the books. A category is a suggestion after logging, never a gate.', rulePt: 'Cinco tipos macro fecham as contas. Categoria é sugestão depois do lançamento, nunca obrigação.', antiEn: 'Blocking a save until a category is chosen.', antiPt: 'Impedir o salvamento até escolher categoria.' },
  { k: 'P4', en: 'Desktop is home, mobile is companion', pt: 'Desktop é casa, celular é companhia', ruleEn: 'Plan and analyse on the big screen; capture and check status on the phone. Two products, one database.', rulePt: 'Planejar e analisar na tela grande; lançar e checar no celular. Dois produtos, um banco de dados.', antiEn: 'Squeezing the planning calendar onto a phone.', antiPt: 'Espremer o calendário de planejamento no celular.' },
  { k: 'P5', en: 'Conceptual and visual honesty', pt: 'Honestidade conceitual e visual', ruleEn: 'Red is red. No badges, streaks, celebrations or advice. Facts only.', rulePt: 'Vermelho é vermelho. Sem medalhas, sequências, comemorações ou conselhos. Só fatos.', antiEn: 'Confetti for staying under budget.', antiPt: 'Confete por ficar dentro do orçamento.' },
];

export function VelaPrinciples({ lang }: { lang: Lang }) {
  const [a, setA] = useState(1);
  const p = PRINCIPLES[a];
  return <figure className="my-chart vl-pr">
    <div className="my-chart-head"><p className="label">{tr(lang, 'Design principles · each with its anti-rule', 'Princípios de design · cada um com sua anti-regra')}</p></div>
    <div className="vl-pr-body">
      <ol className="vl-pr-list">{PRINCIPLES.map((x, i) => <li key={x.k}><button type="button" aria-pressed={i === a} onClick={() => setA(i)} onMouseEnter={() => setA(i)}><span>{x.k}</span>{tr(lang, x.en, x.pt)}</button></li>)}</ol>
      <div className="vl-pr-read" aria-live="polite" key={a}>
        <p className="vl-pr-k">{p.k}</p>
        <p className="vl-pr-rule">{tr(lang, p.ruleEn, p.rulePt)}</p>
        <p className="vl-pr-anti"><span>{tr(lang, 'Anti-rule', 'Anti-regra')}</span>{tr(lang, p.antiEn, p.antiPt)}</p>
      </div>
    </div>
  </figure>;
}

/* Frequencies are per the docs; bars use times per month on a log-ish scale. */
const JOBS = [
  { k: 'J1', en: 'Log a purchase on the go', pt: 'Lançar uma compra na rua', freqEn: '~5× a day', freqPt: '~5× por dia', perMonth: 150, pri: 'P0' },
  { k: 'J3', en: 'Morning check-in: where am I?', pt: 'Check-in da manhã: onde estou?', freqEn: '~1× a day', freqPt: '~1× por dia', perMonth: 30, pri: 'P0' },
  { k: 'J2', en: 'Decide a purchase knowing its impact', pt: 'Decidir uma compra sabendo o impacto', freqEn: '~2× a week', freqPt: '~2× por semana', perMonth: 8, pri: 'P0' },
  { k: 'J7', en: 'Understand exposure, depend less on salary', pt: 'Entender exposição e depender menos do salário', freqEn: '~1× a week', freqPt: '~1× por semana', perMonth: 4, pri: 'P0' },
  { k: 'J4', en: 'Close the month in my head', pt: 'Fechar o mês de cabeça', freqEn: '~1× a month', freqPt: '~1× por mês', perMonth: 1, pri: 'P1' },
  { k: 'J6', en: 'Find where the money went', pt: 'Descobrir para onde foi o dinheiro', freqEn: '~1× a month, when tight', freqPt: '~1× por mês, no aperto', perMonth: 1, pri: 'P2' },
  { k: 'J5', en: 'Set up recurring entries', pt: 'Configurar recorrências', freqEn: 'Once, then rarely', freqPt: 'Uma vez, depois raramente', perMonth: 0.3, pri: 'P1' },
];

export function VelaJobs({ lang }: { lang: Lang }) {
  const [a, setA] = useState(0);
  const w = (n: number) => Math.log10(n * 10 + 1) / Math.log10(1501);
  return <figure className="my-chart">
    <div className="my-chart-head"><p className="label">{tr(lang, 'Job stories by how often they happen', 'Job stories por frequência')}</p></div>
    <ol className="my-funnel">{JOBS.map((j, i) => <li key={j.k}>
      <button type="button" className={'my-frow vl-job' + (i === a ? ' is-active' : '')} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)}>
        <span className="my-fname"><small>{j.k} · {j.pri}</small>{tr(lang, j.en, j.pt)}</span>
        <span className="my-fbar"><span style={{ '--w': w(j.perMonth) } as CSSProperties} /></span>
        <span className="my-fr">{tr(lang, j.freqEn, j.freqPt)}</span>
      </button>
    </li>)}</ol>
    <figcaption className="my-chart-read">{a === 0
      ? tr(lang, 'Logging happens five times a day, so it gets the most care: the first screen is a number pad and a single button.', 'Lançar acontece cinco vezes por dia, então recebe o maior cuidado: a primeira tela é um teclado numérico e um botão.')
      : tr(lang, 'Frequency set the hierarchy: the more often a job happens, the closer it sits to the first screen.', 'A frequência definiu a hierarquia: quanto mais frequente a tarefa, mais perto da primeira tela.')}</figcaption>
  </figure>;
}

const METRIC = [
  { k: 'v1', en: 'Survival days', pt: 'Dias de sobrevivência', fEn: '(balance + reserve) ÷ daily cost', fPt: '(saldo + reserva) ÷ custo diário', readEn: 'Mathematically right, emotionally wrong: counting the reserve made a tight month look safe.', readPt: 'Matematicamente certo, emocionalmente errado: contar a reserva fazia um mês apertado parecer seguro.' },
  { k: 'v3', en: 'Autonomy', pt: 'Autonomia', fEn: '(balance − card bills due) ÷ daily cost', fPt: '(saldo − faturas a vencer) ÷ custo diário', readEn: 'Card debt already committed comes out first, and the reserve is shown apart. The number stopped lying.', readPt: 'A dívida já comprometida no cartão sai primeiro, e a reserva aparece separada. O número parou de mentir.' },
  { k: 'Live', en: 'Today’s allowance', pt: 'Limite de hoje', fEn: 'what is left this cycle, spread over the days ahead', fPt: 'o que resta no ciclo, distribuído pelos próximos dias', readEn: 'In the shipped app, days became a daily amount with an “on pace” signal: the question you actually ask at the till.', readPt: 'No app lançado, os dias viraram um valor diário com sinal de “no ritmo”: a pergunta que se faz de verdade no caixa.' },
];

export function VelaMetric({ lang }: { lang: Lang }) {
  const [a, setA] = useState(0);
  const m = METRIC[a];
  return <figure className="my-chart">
    <div className="my-chart-head">
      <p className="label">{tr(lang, 'The core metric, version by version', 'A métrica central, versão a versão')}</p>
      <fieldset className="my-seg" aria-label={tr(lang, 'Choose a version', 'Escolha uma versão')}>
        {METRIC.map((x, i) => <button key={x.k} type="button" aria-pressed={i === a} onClick={() => setA(i)}>{x.k}</button>)}
      </fieldset>
    </div>
    <div className="vl-metric" key={a}>
      <p className="vl-metric-name">{tr(lang, m.en, m.pt)}</p>
      <p className="vl-metric-f">{tr(lang, m.fEn, m.fPt)}</p>
    </div>
    <figcaption className="my-chart-read" aria-live="polite"><span className={'my-chip' + (a > 0 ? ' is-moved' : '')}>{a === 0 ? tr(lang, 'Rejected', 'Descartada') : a === 1 ? tr(lang, 'Kept', 'Mantida') : tr(lang, 'Shipped', 'No ar')}</span>{tr(lang, m.readEn, m.readPt)}</figcaption>
  </figure>;
}
