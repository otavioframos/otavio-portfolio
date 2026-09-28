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
      facts: { platform: 'Mobile web funnel + app' },
      results: [
        { value: '6,913', label: 'people started the assessment', note: 'First-party analytics, Aug 19 → Sep 16 2026' },
        { value: '44%', label: 'of them finished all questions', note: 'Cross-checked in PostHog' },
        { value: '5.8%', label: 'of offer views became members', note: 'n = 3,036 offer views' },
        { value: '62', label: 'countries reached', note: 'About half of visits from the US' },
      ],
      learnings: [
        'Measure before polishing. The screens I refined converted well; the losses were before the test and at payment.',
        'A null result is a result. Two clean tests at ~1,500 per arm saved weeks of arguing over details.',
        'The environment is part of the design. An in-app browser without wallets halves checkout, whatever the screen looks like.',
      ],
      next: 'Get people out of the in-app browser before payment, and test price with the same traffic.',
    },
    pt: {
      period: '2026',
      facts: { platform: 'Funil web mobile + app' },
      results: [
        { value: '6.913', label: 'pessoas começaram a avaliação', note: 'Analytics próprio, 19 ago → 16 set 2026' },
        { value: '44%', label: 'delas responderam todas as questões', note: 'Conferido no PostHog' },
        { value: '5,8%', label: 'de quem viu a oferta virou membro', note: 'n = 3.036 visualizações' },
        { value: '62', label: 'países alcançados', note: 'Cerca de metade das visitas dos EUA' },
      ],
      learnings: [
        'Medir antes de polir. As telas que refinei convertiam bem; as perdas estavam antes do teste e no pagamento.',
        'Resultado nulo também é resultado. Dois testes limpos com ~1.500 por braço pouparam semanas de discussão sobre detalhes.',
        'O ambiente faz parte do design. Um navegador de app sem carteiras digitais corta o checkout pela metade, seja qual for a tela.',
      ],
      next: 'Tirar as pessoas do navegador do app antes do pagamento e testar preço com o mesmo tráfego.',
    },
  },
  'content-radar': {},
  avela: {},
};
