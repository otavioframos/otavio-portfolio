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
      facts: { team: 'Me, a copywriter and a media buyer (quiz); developers and AI coding tools', platform: 'Mobile web funnel + app' },
      results: [
        { value: '9', label: 'languages, two currencies, one visual system', note: 'From the ad to the app, emails and the PDF report' },
        { value: '78%', label: 'of new buyers reach the app, up from 69%', note: 'After removing a dead-end screen; 23 buyers so far' },
        { value: '3', label: 'live tests read, one of them against my own hypothesis', note: 'About 1,500 people per arm on the first two' },
        { value: '2.5×', label: 'more upfront return per visitor with a higher entry price', note: 'First read, few purchases per arm' },
      ],
      learnings: [
        'Measure before polishing. Data moved my attention from screens that already worked to the moments around them.',
        'A test that proves you wrong is worth more than one that agrees with you. It cost two days instead of two months.',
        'What people do beats what the team believes. Behaviour showed the problem was the promise, not the page.',
        'Honesty is a design decision. Warn before charging, and ask before charging less.',
      ],
      next: 'Read first-charge retention for buyers under the new deal, decide whether the browser screen stays, and run the next checkout test with the copy team.',
    },
    pt: {
      period: '2026',
      facts: { team: 'Eu, um copywriter e um gestor de tráfego (quiz); desenvolvedores e ferramentas de IA para código', platform: 'Funil web mobile + app' },
      results: [
        { value: '9', label: 'idiomas, duas moedas, um sistema visual', note: 'Do anúncio ao app, aos e-mails e ao relatório em PDF' },
        { value: '78%', label: 'dos novos compradores chegam ao app, contra 69% antes', note: 'Depois de remover uma tela sem saída; 23 compradores até aqui' },
        { value: '3', label: 'testes lidos no ar, um deles contra a minha própria hipótese', note: 'Cerca de 1.500 pessoas por braço nos dois primeiros' },
        { value: '2,5×', label: 'mais retorno imediato por visitante com preço de entrada maior', note: 'Primeira leitura, poucas compras por braço' },
      ],
      learnings: [
        'Medir antes de polir. Os dados tiraram meu foco de telas que já funcionavam e o levaram para os momentos em volta delas.',
        'Um teste que prova que você está errado vale mais do que um que concorda com você. Custou dois dias em vez de dois meses.',
        'O que as pessoas fazem vale mais do que o que o time acredita. O comportamento mostrou que o problema era a promessa, não a página.',
        'Honestidade é decisão de design. Avisar antes de cobrar, e perguntar antes de cobrar menos.',
      ],
      next: 'Ler a retenção na primeira cobrança dos compradores do novo acordo, decidir se a tela do navegador fica e rodar o próximo teste de checkout com o time de copy.',
    },
  },
  'content-radar': {
    en: {
      period: '2025–2026',
      headline: 'From a single example, it finds up to ~1,300 videos in about 3 minutes and catalogues them into an inbox the team can review.',
      facts: { team: 'Me and a developer', platform: 'Web app + background worker' },
      results: [
        { value: '~1,300', label: 'videos found and catalogued from one seed', note: 'In about 3 minutes, with Jev' },
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
      headline: 'A partir de um único exemplo, busca até ~1.300 vídeos em cerca de 3 minutos e os cataloga numa caixa pronta para o time revisar.',
      facts: { team: 'Eu e um desenvolvedor', platform: 'Web app + worker em segundo plano' },
      results: [
        { value: '~1.300', label: 'vídeos encontrados e catalogados a partir de uma semente', note: 'Em cerca de 3 minutos, com o Jev' },
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
  vela: {
    en: {
      period: '2026',
      facts: { platform: 'Installable web app + Android' },
      results: [
        { value: '5', label: 'design principles, each with an anti-rule' },
        { value: '7', label: 'job stories ranked by frequency' },
        { value: '3', label: 'versions of the core metric' },
        { value: '2', label: 'surfaces from one data model: Flux and Aeon' },
      ],
      learnings: [
        'A metric can be mathematically correct and semantically wrong. Test what a number makes people feel, not only what it computes.',
        'Designing for one needs guardrails. Writing principles and anti-rules down kept my own preferences honest.',
        'The hardest part of a finance app is trustworthy calculation, not the interface.',
      ],
      next: 'Test Flux with a few people who already track money, to see where designing for one does not travel.',
    },
    pt: {
      period: '2026',
      facts: { platform: 'Web app instalável + Android' },
      results: [
        { value: '5', label: 'princípios de design, cada um com anti-regra' },
        { value: '7', label: 'job stories ordenadas por frequência' },
        { value: '3', label: 'versões da métrica central' },
        { value: '2', label: 'superfícies a partir de um modelo de dados: Flux e Aeon' },
      ],
      learnings: [
        'Uma métrica pode estar matematicamente certa e semanticamente errada. Teste o que o número faz a pessoa sentir, não só o que ele calcula.',
        'Desenhar para um precisa de limites. Escrever princípios e anti-regras manteve minhas preferências honestas.',
        'A parte mais difícil de um app de finanças é um cálculo confiável, não a interface.',
      ],
      next: 'Testar o Flux com algumas pessoas que já controlam o dinheiro, para ver onde o desenho para um não se sustenta.',
    },
  },
  avela: {
    en: {
      period: '2026',
      facts: { platform: 'Web quiz funnel + iOS app' },
      results: [
        { value: '7×', label: 'quiz completion after the rebuild', note: 'Same paid traffic, June vs July 2026' },
        { value: '4×', label: 'people passing the first question', note: 'PostHog, same window' },
        { value: '18×', label: 'engagement behind ads that promised the quiz', note: 'Same quiz, compared by ad' },
        { value: '48/55', label: 'review score for the new onboarding', note: 'vs 34/55 for the previous order' },
      ],
      learnings: [
        'The first screen is decided before it loads. Most of the drop was the ad not promising what the page delivered.',
        'Order is a design decision. Asking for weight before safety was a structural problem no copy could fix.',
        'Separate what you know from what you hope. The matrix kept unvalidated claims out of the product.',
      ],
      next: 'Ship the First Session onboarding in the app and test its opening against a goals-first version.',
    },
    pt: {
      period: '2026',
      facts: { platform: 'Quiz web + app iOS' },
      results: [
        { value: '7×', label: 'conclusão do quiz depois da reconstrução', note: 'Mesmo tráfego pago, junho vs julho de 2026' },
        { value: '4×', label: 'pessoas passando da primeira pergunta', note: 'PostHog, mesma janela' },
        { value: '18×', label: 'engajamento com anúncios que prometiam o quiz', note: 'Mesmo quiz, comparado por anúncio' },
        { value: '48/55', label: 'nota de revisão do novo onboarding', note: 'vs 34/55 da ordem anterior' },
      ],
      learnings: [
        'A primeira tela é decidida antes de carregar. A maior parte da queda era o anúncio não prometer o que a página entregava.',
        'Ordem é decisão de design. Pedir peso antes da segurança era um problema estrutural que nenhum texto resolveria.',
        'Separar o que se sabe do que se espera. A matriz manteve promessas não validadas fora do produto.',
      ],
      next: 'Lançar o onboarding da Primeira Sessão no app e testar sua abertura contra uma versão que começa pelos objetivos.',
    },
  },
};
