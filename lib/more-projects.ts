import type { Lang } from './projects';

type ProjectCopy = {
  category: string;
  contribution: string;
  context: string;
  approach: string;
  captions: [string, string];
  /** Render the coded design-system specimen instead of the second image. */
  specimen?: boolean;
  /** Post-launch outcomes, as reported in the original case study. */
  results?: { value: string; label: string }[];
  resultsNote?: string;
};
export type MoreProject = {
  slug: string;
  name: string;
  year: string;
  source: string;
  images: [string, string];
} & Record<Lang, ProjectCopy>;

export const moreProjects: MoreProject[] = [
  {
    slug: 'chilli-beans', name: 'Chilli Beans Australia', year: '2024',
    source: 'https://citrine-giraffe-448.notion.site/Chilli-Beans-AU-7bee62ee0f7f82bdac0581b7b05f6088',
    images: ['/images/chilli-cover.webp', '/images/chilli-detail.webp'],
    en: {
      category: 'E-commerce · UX/UI',
      contribution: 'Redesigned navigation, product discovery, and checkout for the Australian storefront.',
      context: 'Chilli Beans, Latin America’s largest eyewear and accessories brand, was entering Australia. The existing store had high cart abandonment, little of the brand’s personality, and a buying flow that did not fit how Australians shop.',
      approach: 'Stakeholder interviews and heatmaps pointed to three pain points: weak filters, too many checkout steps, and nothing to inspire a purchase. I redesigned navigation around cards, shortened checkout, reordered the product page around those pain points, and added small interactions to make the store feel less bureaucratic. I delivered high-fidelity prototypes, a modular UI kit and documentation for a Shopify/VTEX build, and followed the implementation with the development team.',
      captions: ['Mobile storefront and product-page mockups from the original case study.', 'Previous storefront alongside the proposed navigation and product categories.'],
      results: [{ value: '2.8% → 4.0%', label: 'mobile conversion after launch' }, { value: '−10%', label: 'cart abandonment' }],
      resultsNote: 'Post-launch tracking reported in the original case study.',
    },
    pt: {
      category: 'E-commerce · UX/UI',
      contribution: 'Redesign da navegação, descoberta de produtos e checkout da loja australiana.',
      context: 'A Chilli Beans, maior marca de óculos e acessórios da América Latina, estava entrando na Austrália. A loja existente tinha alto abandono de carrinho, pouco da personalidade da marca e um fluxo de compra que não combinava com o jeito australiano de comprar.',
      approach: 'Entrevistas com stakeholders e heatmaps apontaram três dores: filtros insuficientes, etapas demais no checkout e falta de conteúdo que inspirasse a compra. Redesenhei a navegação em cards, encurtei o checkout, reorganizei a página de produto em torno dessas dores e adicionei microinterações para a loja parecer menos burocrática. Entreguei protótipos de alta fidelidade, kit de UI modular e documentação para Shopify/VTEX, e acompanhei a implementação com o time de desenvolvimento.',
      captions: ['Mockups da loja mobile e da página de produto, do case original.', 'Loja anterior ao lado da proposta de navegação e categorias de produtos.'],
      results: [{ value: '2,8% → 4,0%', label: 'conversão mobile após o lançamento' }, { value: '−10%', label: 'abandono de carrinho' }],
      resultsNote: 'Acompanhamento pós-lançamento registrado no case original.',
    },
  },
  {
    slug: 'naluu', name: 'Naluu Activewear', year: '2024',
    source: 'https://citrine-giraffe-448.notion.site/Naluu-ActiveWear-021e62ee0f7f83c2bcf901964a787411',
    images: ['/images/naluu-cover.webp', '/images/naluu-detail.webp'],
    en: {
      category: 'E-commerce · Design system',
      contribution: 'Designed the first online store, its reusable components, and the development handoff.',
      context: 'Naluu, a Brazilian activewear brand, had no digital channel. It needed a first store that felt as young and sophisticated as its clothes, with room to grow the catalogue and campaigns without a designer on every page.',
      approach: 'I owned the whole store experience. Interviews with the founders and desk research on fitness e-commerce shaped a mobile-first structure with modular showcases and filters by collection. I mapped the shopping journeys, designed wireframes and responsive prototypes, defined colour, type, spacing and button tokens, and led the handoff in Figma with documentation for development.',
      captions: ['Product selection and cart flow from the original Naluu case study.', 'Design tokens, component studies, and reference research used in the project.'],
    },
    pt: {
      category: 'E-commerce · Design system',
      contribution: 'Design da primeira loja online, componentes reutilizáveis e handoff para desenvolvimento.',
      context: 'A Naluu, marca brasileira de moda fitness, não tinha canal digital. Precisava de uma primeira loja tão jovem e sofisticada quanto suas roupas, com espaço para crescer catálogo e campanhas sem depender de um designer em cada página.',
      approach: 'Fui responsável por toda a experiência da loja. Conversas com as fundadoras e desk research em e-commerces de moda fitness definiram uma estrutura mobile-first, com vitrines modulares e filtros por coleção. Mapeei jornadas de compra, criei wireframes e protótipos responsivos, defini tokens de cor, tipografia, espaçamento e botões e liderei o handoff no Figma com documentação para desenvolvimento.',
      captions: ['Seleção de produtos e fluxo de carrinho do case original da Naluu.', 'Design tokens, estudos de componentes e referências usados no projeto.'],
    },
  },
  {
    slug: 'homerunpet', name: 'HomeRunPet Brasil', year: '2024',
    source: 'https://citrine-giraffe-448.notion.site/HomeRunPet-c7de62ee0f7f83739ff301e3cc0e5071',
    images: ['/images/homerun-cover.webp', '/images/homerun-detail.webp'],
    en: {
      category: 'Brand launch · Design system',
      contribution: 'Researched, localised and systemised the Brazilian launch of a global pet-tech brand.',
      context: 'Tocca Pet, the only official HomeRunPet licensee in Brazil, sold only to businesses. It was launching the brand to consumers, starting with smart pet dryers, a product most Brazilian owners had never heard of.',
      approach: 'Interviews with pet owners and groomers showed little technical knowledge but deep frustration with ordinary dryers, so the page leads with the real pains, noise and drying time, not the spec sheet. I adapted the global brand to Brazilian habits and built its design system as a scalable library, in Figma and in code: a 15-style Inter type scale, an orange palette, buttons in four tones and four variants, icons and product cards the team recombines for new pages and A/B tests. I delivered the launch landing page, the localised UI kit, brand guidelines, campaign assets and the developer handoff.',
      captions: ['Launch landing page: the headline leads with noise and fear at bath time, the pains the research surfaced.', 'The design system: buttons, icons, product imagery and cards built as modular components for new pages and A/B tests.'],
      specimen: true,
      results: [{ value: '+41%', label: 'average time on page after launch' }],
      resultsNote: 'Post-launch analytics reported in the original case study, alongside more consumer leads.',
    },
    pt: {
      category: 'Lançamento de marca · Design system',
      contribution: 'Pesquisa, adaptação e design system para o lançamento no Brasil de uma marca global de tecnologia pet.',
      context: 'A Tocca Pet, única licenciada oficial da HomeRunPet no Brasil, vendia só para empresas. Estava lançando a marca para o consumidor final, começando pelos sopradores inteligentes, um produto que a maioria dos tutores brasileiros nem conhecia.',
      approach: 'Entrevistas com tutores e groomers mostraram pouco conhecimento técnico, mas grande frustração com sopradores comuns. Por isso a página abre com as dores reais, barulho e tempo de secagem, e não com a ficha técnica. Adaptei a marca global aos hábitos brasileiros e construí seu design system como uma biblioteca escalável, no Figma e em código: escala tipográfica Inter com 15 estilos, paleta laranja, botões em quatro tons e quatro variações, ícones e cards de produto que o time recombina em novas páginas e testes A/B. Entreguei a landing page de lançamento, o UI kit localizado, o guia de identidade, assets de campanha e o handoff para desenvolvimento.',
      captions: ['Landing page de lançamento: o título abre com barulho e medo na hora do banho, as dores que a pesquisa revelou.', 'O design system: botões, ícones, imagens de produto e cards como componentes modulares para novas páginas e testes A/B.'],
      specimen: true,
      results: [{ value: '+41%', label: 'tempo médio na página após o lançamento' }],
      resultsNote: 'Analytics pós-lançamento registrado no case original, junto com aumento de leads de consumidor final.',
    },
  },
  {
    slug: 'precato', name: 'Precato', year: '2024',
    source: 'https://citrine-giraffe-448.notion.site/Precato-3b4e62ee0f7f82129e8881c62acfac61',
    images: ['/images/precato-cover.webp', '/images/precato-detail.webp'],
    en: {
      category: 'Performance · Accessibility',
      contribution: 'Rebuilt the landing pages of Brazil’s leading court-debt buyer for speed and accessibility.',
      context: 'Precato’s landing pages scored 49 on PageSpeed and took almost five seconds to load. Analytics showed 62% of mobile visitors never saw the main content, leaving before the page finished loading on slow connections.',
      approach: 'Working from Google Analytics, PageSpeed Insights and GTmetrix, I reworked the front end: minified CSS and JavaScript, lazy-loaded and compressed images, reordered script loading and the rendering of key elements. I also redrew the visual hierarchy and contrast for accessibility, then delivered a before-and-after report, a metrics panel and best-practice documentation for the team.',
      captions: ['Results after the rebuild, drawn from the figures in the original case study.', 'Gains across the site and in organic traffic over the following three months.'],
      results: [{ value: '+109%', label: 'main landing page performance' }, { value: '95', label: 'accessibility score, out of 100' }, { value: '+39%', label: 'organic traffic in three months' }],
      resultsNote: 'Figures reported in the original case study.',
    },
    pt: {
      category: 'Performance · Acessibilidade',
      contribution: 'Reconstrução das landing pages da líder nacional em compra de precatórios, com foco em velocidade e acessibilidade.',
      context: 'As landing pages da Precato tinham nota 49 no PageSpeed e levavam quase cinco segundos para carregar. O analytics mostrou que 62% dos visitantes no celular nem viam o conteúdo principal, saindo antes de a página terminar de carregar em conexões lentas.',
      approach: 'A partir do Google Analytics, PageSpeed Insights e GTmetrix, refiz o front-end: minifiquei CSS e JavaScript, apliquei lazy load e compressão nas imagens e reorganizei o carregamento de scripts e a renderização dos elementos principais. Também redesenhei a hierarquia visual e o contraste para acessibilidade, e entreguei relatório de antes e depois, painel de métricas e documentação de boas práticas para o time.',
      captions: ['Resultados depois da reconstrução, a partir dos números do case original.', 'Ganhos no site como um todo e no tráfego orgânico nos três meses seguintes.'],
      results: [{ value: '+109%', label: 'performance da landing page principal' }, { value: '95', label: 'nota de acessibilidade, de 100' }, { value: '+39%', label: 'tráfego orgânico em três meses' }],
      resultsNote: 'Números registrados no case original.',
    },
  },
  {
    slug: 'wrk', name: 'WRK', year: '2024',
    source: 'https://citrine-giraffe-448.notion.site/WRK-9efe62ee0f7f83a2898f813e894e39ce',
    images: ['/images/wrk-cover.webp', '/images/wrk-detail.webp'],
    en: {
      category: 'Web design · Implementation',
      contribution: 'Redesigned and built a landing page for a mortgage consultancy using WordPress and Elementor.',
      context: 'WRK, a mortgage consultancy, was losing people on its lead form. Too many fields, technical language and no social proof pushed away even visitors with real credit potential, most of them first-time buyers on mobile.',
      approach: 'Heatmaps and Microsoft Clarity showed where people got lost in the layout and the credit steps. I cut and grouped the form fields, rewrote the microcopy in a plain, empathetic tone, added cards explaining each step and a FAQ, and built a mobile-first hierarchy. I designed the high-fidelity prototype and implemented the page myself in WordPress and Elementor, with a 100 performance score.',
      captions: ['Landing-page design and a performance report captured in the original project. The report is a historical snapshot.', 'Wireframes comparing the original copy and layout with the revised proposal.'],
      results: [{ value: '2.4% → 5.2%', label: 'lead conversion after go-live' }, { value: '2.5×', label: 'time on page' }, { value: '100', label: 'performance score' }],
      resultsNote: 'Post-launch figures reported in the original case study.',
    },
    pt: {
      category: 'Web design · Implementação',
      contribution: 'Redesign e implementação de uma landing page para consultoria de crédito imobiliário em WordPress e Elementor.',
      context: 'A WRK, consultoria de crédito imobiliário, perdia pessoas no formulário de captação. Campos demais, linguagem técnica e nenhuma prova social afastavam até visitantes com potencial real de crédito, em sua maioria compradores do primeiro imóvel no celular.',
      approach: 'Heatmaps e o Microsoft Clarity mostraram onde as pessoas se perdiam no layout e nas etapas do crédito. Reduzi e agrupei os campos do formulário, reescrevi o microcopy em tom simples e empático, adicionei cards explicando cada etapa e um FAQ, e montei uma hierarquia mobile-first. Desenhei o protótipo de alta fidelidade e implementei a página eu mesmo em WordPress e Elementor, com nota 100 de performance.',
      captions: ['Design da landing page e relatório de performance registrado no projeto original. O relatório é um registro daquele momento.', 'Wireframes comparando o texto e o layout originais com a proposta revisada.'],
      results: [{ value: '2,4% → 5,2%', label: 'conversão de leads após o lançamento' }, { value: '2,5×', label: 'tempo na página' }, { value: '100', label: 'nota de performance' }],
      resultsNote: 'Números pós-lançamento registrados no case original.',
    },
  },
];
