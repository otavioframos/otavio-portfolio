import type { CaseEvidence, Lang } from './projects';

/**
 * Evidence layer for the three main cases. Every field is optional and the case
 * page only renders a block when its data exists, so this file can be filled in
 * one case at a time. Keep numbers sourced (PostHog, Stripe, store reviews) and
 * name the instrument and window in `note`.
 */
export const caseEvidence: Record<string, Partial<Record<Lang, CaseEvidence>>> = {
  mindyoung: {
    en: {
      period: '2026',
      facts: { team: 'Me, a copywriter and a media buyer (quiz)', platform: 'Mobile web funnel + app' },
      results: [
        { value: '6,900+', label: 'assessments started in the first four weeks', note: 'First-party analytics, from launch on Aug 19 2026' },
        { value: '44%', label: 'of them finished all questions', note: 'Cross-checked in PostHog' },
        { value: '2×', label: 'purchase rate in a regular browser vs in-app', note: 'My finding, from segmenting live checkout data' },
        { value: '62', label: 'countries reached', note: 'About half of visits from the US' },
      ],
      learnings: [
        'Measure before polishing. Data moved my attention from screens that already worked to the moments around them.',
        'A null result is a result. Two clean tests at ~1,500 per arm saved weeks of arguing over details.',
        'The environment is part of the design. Where a screen opens can matter more than how it looks.',
      ],
      next: 'Get people out of the in-app browser before payment, and test price with the same traffic.',
    },
    pt: {
      period: '2026',
      facts: { team: 'Eu, um copywriter e um gestor de tráfego (quiz)', platform: 'Funil web mobile + app' },
      results: [
        { value: '6.900+', label: 'avaliações iniciadas nas quatro primeiras semanas', note: 'Analytics próprio, desde o lançamento em 19 ago 2026' },
        { value: '44%', label: 'delas responderam todas as questões', note: 'Conferido no PostHog' },
        { value: '2×', label: 'taxa de compra no navegador comum vs no do app', note: 'Descoberta minha, segmentando dados reais de checkout' },
        { value: '62', label: 'países alcançados', note: 'Cerca de metade das visitas dos EUA' },
      ],
      learnings: [
        'Medir antes de polir. Os dados tiraram meu foco de telas que já funcionavam e o levaram para os momentos em volta delas.',
        'Resultado nulo também é resultado. Dois testes limpos com ~1.500 por braço pouparam semanas de discussão sobre detalhes.',
        'O ambiente faz parte do design. Onde uma tela abre pode importar mais do que como ela é.',
      ],
      next: 'Tirar as pessoas do navegador do app antes do pagamento e testar preço com o mesmo tráfego.',
    },
  },
  'content-radar': {
    en: {
      period: '2025–2026',
      facts: { team: 'Me and a developer', platform: 'Web app + background worker' },
      results: [
        { value: '3', label: 'products researching with it', note: 'Shared workspace, one folder per product' },
        { value: '4', label: 'sources in one inbox', note: 'TikTok, Reels, Shorts, Meta Ad Library' },
        { value: '5 min', label: 'to 30 days: refresh on a schedule', note: 'Recurring runs per folder' },
      ],
      learnings: [
        'Prove the value with the cheapest version, then rebuild when the requirements change. Patching would have cost more.',
        'Trust comes from showing the path. People act on a finding faster when they can see why it was surfaced.',
        'Finite beats infinite. A queue you can clear gets used; another feed gets ignored.',
      ],
      next: 'Deliver the best new references to Telegram, so teams act on them without opening the tool.',
    },
    pt: {
      period: '2025–2026',
      facts: { team: 'Eu e um desenvolvedor', platform: 'Web app + worker em segundo plano' },
      results: [
        { value: '3', label: 'produtos pesquisando com ele', note: 'Workspace compartilhado, uma pasta por produto' },
        { value: '4', label: 'fontes numa só caixa', note: 'TikTok, Reels, Shorts, Biblioteca de Anúncios da Meta' },
        { value: '5 min', label: 'a 30 dias: atualização agendada', note: 'Rodadas recorrentes por pasta' },
      ],
      learnings: [
        'Provar o valor com a versão mais barata e reconstruir quando os requisitos mudam. Remendar teria custado mais.',
        'Confiança vem de mostrar o caminho. As pessoas agem mais rápido numa descoberta quando veem por que ela apareceu.',
        'Finito vence infinito. Uma fila que se esvazia é usada; mais um feed é ignorado.',
      ],
      next: 'Entregar as melhores referências novas no Telegram, para os times agirem sem abrir a ferramenta.',
    },
  },
  avela: {},
};
