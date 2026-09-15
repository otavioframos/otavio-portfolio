import type { Lang } from './projects';

type ProjectCopy = {
  category: string;
  contribution: string;
  context: string;
  approach: string;
  captions: [string, string];
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
      context: 'The project focused on adapting the shopping experience to the Australian market while keeping Chilli Beans’ visual identity. Finding products and moving through checkout were the main areas of work.',
      approach: 'I worked on the home page, category filters, product cards, and product-page hierarchy. The delivery included high-fidelity prototypes, a modular UI kit, and documentation for development.',
      captions: ['Mobile storefront and product-page mockups from the original case study.', 'Previous storefront alongside the proposed navigation and product categories.'],
    },
    pt: {
      category: 'E-commerce · UX/UI',
      contribution: 'Redesign da navegação, descoberta de produtos e checkout da loja australiana.',
      context: 'O projeto buscava adaptar a experiência de compra ao mercado australiano, mantendo a identidade visual da Chilli Beans. Encontrar produtos e avançar pelo checkout foram os principais focos do trabalho.',
      approach: 'Trabalhei na home, nos filtros de categoria, nos cards e na hierarquia da página de produto. A entrega incluiu protótipos de alta fidelidade, kit de UI modular e documentação para desenvolvimento.',
      captions: ['Mockups da loja mobile e da página de produto, do case original.', 'Loja anterior ao lado da proposta de navegação e categorias de produtos.'],
    },
  },
  {
    slug: 'naluu', name: 'Naluu Activewear', year: '2024',
    source: 'https://citrine-giraffe-448.notion.site/Naluu-ActiveWear-021e62ee0f7f83c2bcf901964a787411',
    images: ['/images/naluu-cover.webp', '/images/naluu-detail.webp'],
    en: {
      category: 'E-commerce · Design system',
      contribution: 'Designed the first online store, its reusable components, and the development handoff.',
      context: 'Naluu needed its first online store. I structured the shopping experience around its activewear catalog and translated the brand’s visual identity into layouts and components for the web.',
      approach: 'I mapped shopping journeys, made wireframes and responsive prototypes, and defined color, typography, spacing, and button tokens. I organized the Figma files and documentation for the development handoff.',
      captions: ['Product selection and cart flow from the original Naluu case study.', 'Design tokens, component studies, and reference research used in the project.'],
    },
    pt: {
      category: 'E-commerce · Design system',
      contribution: 'Design da primeira loja online, componentes reutilizáveis e handoff para desenvolvimento.',
      context: 'A Naluu precisava de sua primeira loja online. Estruturei a experiência de compra em torno do catálogo de moda fitness e traduzi a identidade visual da marca em layouts e componentes para a web.',
      approach: 'Mapeei jornadas de compra, criei wireframes e protótipos responsivos e defini tokens de cor, tipografia, espaçamento e botões. Organizei os arquivos no Figma e a documentação para o handoff.',
      captions: ['Seleção de produtos e fluxo de carrinho do case original da Naluu.', 'Design tokens, estudos de componentes e referências usados no projeto.'],
    },
  },
  {
    slug: 'wrk', name: 'WRK', year: '2024',
    source: 'https://citrine-giraffe-448.notion.site/WRK-9efe62ee0f7f83a2898f813e894e39ce',
    images: ['/images/wrk-cover.webp', '/images/wrk-detail.webp'],
    en: {
      category: 'Web design · Implementation',
      contribution: 'Redesigned and built a landing page for a mortgage consultancy using WordPress and Elementor.',
      context: 'WRK’s landing page needed to explain the mortgage process more clearly and help visitors take the first step. The work focused on page structure, plain-language copy, and the inquiry form.',
      approach: 'I explored layouts and simplified the information and form flow, then produced the high-fidelity prototype and implemented the page in WordPress and Elementor.',
      captions: ['Landing-page design and a performance report captured in the original project. The report is a historical snapshot.', 'Wireframes comparing the original copy and layout with the revised proposal.'],
    },
    pt: {
      category: 'Web design · Implementação',
      contribution: 'Redesign e implementação de uma landing page para consultoria de crédito imobiliário em WordPress e Elementor.',
      context: 'A landing page da WRK precisava explicar o processo de crédito imobiliário com mais clareza e ajudar o visitante a dar o primeiro passo. O trabalho focou na estrutura da página, na linguagem e no formulário de contato.',
      approach: 'Explorei layouts e simplifiquei a organização das informações e do formulário. Depois, produzi o protótipo de alta fidelidade e implementei a página em WordPress e Elementor.',
      captions: ['Design da landing page e relatório de performance registrado no projeto original. O relatório é um registro daquele momento.', 'Wireframes comparando o texto e o layout originais com a proposta revisada.'],
    },
  },
];
