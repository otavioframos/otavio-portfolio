export type CaseEvidence = {
  /** Year or span shown in the case eyebrow, e.g. "2025–2026". Falls back to 2026. */
  period?: string;
  /** Answered before the visuals: what was yours, who else was there, how long. */
  facts?: { team?: string; timeline?: string; platform?: string };
  /** Measured outcomes. Keep each one falsifiable: instrument + window + sample. */
  results?: { value: string; label: string; note?: string }[];
  /** What you would do differently, or what the work taught you. */
  learnings?: string[];
  /** Where the work goes next. */
  next?: string;
  /** One-line result used as the link text on the home, before the click. */
  headline?: string;
};
export const projects = [
  {
    "slug": "mindyoung",
    "name": "MindYoung",
    "number": "01",
    "theme": "mindyoung",
    "image": "/images/mindyoung-train.webp",
    "extra": "/images/mindyoung-owl.webp",
    "url": "https://mindyoung.app/",
    "en": {
      "category": "CONSUMER PRODUCT",
      "title": "Identity, interface and daily cognitive training.",
      "summary": "Designed the identity, design system and app screens alongside development.",
      "role": "Sole designer · Partnered with development",
      "scope": "Brand identity / UX & UI / Design system / Acquisition",
      "status": "Live product",
      "decision": "Use one visual system across acquisition and in-app training.",
      "why": "The first contact is a quiz opened from an ad; the relationship is daily training. If they looked like two products, the trust built in the assessment would reset at the paywall.",
      "lead": "A3Lab was created to explore new consumer products within A3Media. MindYoung brings cognitive assessment and ongoing training into one product. As the team’s sole designer, I worked across its identity, interface, and acquisition experience alongside the developer.",
      "sections": [
        {
          "label": "01 / RESPONSIBILITY",
          "title": "One product. Many connected decisions.",
          "body": "MindYoung is a cognitive assessment that turns into daily training. As the only designer, I owned the logo, the design system and every screen, from the ad-driven quiz to the app, and shaped features with the developer as the product evolved."
        },
        {
          "label": "02 / THE SYSTEM",
          "title": "One language, from the ad to the app.",
          "body": "People meet MindYoung in a quiz opened from a social ad and stay for training inside the app. I built one system for both: a warm paper ground, deep ink, a single blue for action, and generous shapes that read as physical keys on a phone. The specimen below uses the production tokens.",
          "figure": "system"
        },
        {
          "label": "03 / THE FUNNEL",
          "title": "Where people actually stop.",
          "body": "Once it went live on August 19, 2026, the journey could be measured end to end. Most people finish the test once they start it, and almost everyone who finishes sees the offer. The steep drops are before the test and at payment, which moved my attention away from the screens I had been polishing.",
          "figure": "funnel"
        },
        {
          "label": "04 / TESTING",
          "title": "Two tests that changed nothing, and a finding that did.",
          "body": "I ran live A/B tests on details I expected to matter: showing the score band before payment and the position of a hard question. At about 1,500 people per arm, neither moved. The real gap was where checkout opens: inside Instagram and Facebook's in-app browsers, without Apple Pay or autofill, conversion is half of a regular browser.",
          "figure": "tests"
        },
        {
          "label": "05 / COLLABORATION",
          "title": "Design and development, in conversation.",
          "body": "I worked with the developer on features and implementation while staying responsible for design across the product. The work continued past the first release through experiments, pricing tests and refinement of the acquisition experience."
        }
      ],
      "outcome": "MindYoung is live. My contribution spans its identity, design system, screens, and acquisition experience.",
      "caption": "Sample training screen from the public MindYoung site.",
      "extraCaption": "MindYoung’s product mascot."
    },
    "pt": {
      "category": "PRODUTO B2C",
      "title": "Identidade, interface e treino cognitivo no dia a dia.",
      "summary": "Desenhei a identidade, o design system e as telas do app junto a desenvolvimento.",
      "role": "Único designer · Em parceria com desenvolvimento",
      "scope": "Identidade / UX e UI / Design system / Aquisição",
      "status": "Produto no ar",
      "decision": "Usar um mesmo sistema visual na aquisição e no treino dentro do app.",
      "why": "O primeiro contato é um quiz aberto a partir de um anúncio; a relação é o treino diário. Se parecessem dois produtos, a confiança criada na avaliação se perderia no paywall.",
      "lead": "A A3Lab nasceu para explorar novos produtos B2C dentro da A3Media. O MindYoung reúne avaliação cognitiva e treino contínuo em um produto. Como único designer do time, trabalhei na identidade, na interface e na aquisição, junto ao desenvolvedor.",
      "sections": [
        {
          "label": "01 / RESPONSABILIDADE",
          "title": "Um produto. Muitas decisões conectadas.",
          "body": "O MindYoung é uma avaliação cognitiva que vira treino diário. Como único designer, fui responsável pelo logo, pelo design system e por todas as telas, do quiz vindo de anúncios até o app, e defini funcionalidades com o desenvolvedor conforme o produto evoluía."
        },
        {
          "label": "02 / O SISTEMA",
          "title": "Uma linguagem, do anúncio ao app.",
          "body": "As pessoas conhecem o MindYoung num quiz aberto a partir de um anúncio e ficam pelo treino dentro do app. Criei um sistema para os dois: fundo papel quente, tinta profunda, um único azul para ação e formas generosas que parecem teclas físicas no celular. O espécime abaixo usa os tokens de produção.",
          "figure": "system"
        },
        {
          "label": "03 / O FUNIL",
          "title": "Onde as pessoas realmente param.",
          "body": "Com o produto no ar desde 19 de agosto de 2026, a jornada passou a ser medida de ponta a ponta. A maioria termina o teste depois de começar, e quase todos que terminam veem a oferta. As quedas fortes estão antes do teste e no pagamento, o que tirou meu foco das telas que eu vinha polindo.",
          "figure": "funnel"
        },
        {
          "label": "04 / TESTES",
          "title": "Dois testes que não mudaram nada, e uma descoberta que mudou.",
          "body": "Rodei testes A/B em detalhes que eu achava decisivos: mostrar a faixa do resultado antes do pagamento e a posição de uma questão difícil. Com cerca de 1.500 pessoas por braço, nenhum moveu o número. A diferença real estava em onde o checkout abre: dentro dos navegadores do Instagram e do Facebook, sem Apple Pay nem preenchimento automático, a conversão é metade da de um navegador comum.",
          "figure": "tests"
        },
        {
          "label": "05 / COLABORAÇÃO",
          "title": "Design e desenvolvimento em diálogo.",
          "body": "Trabalhei com o desenvolvedor nas funcionalidades e na implementação, mantendo a responsabilidade pelo design do produto. O trabalho seguiu depois do lançamento, com experimentos, testes de preço e refinamento da aquisição."
        }
      ],
      "outcome": "O MindYoung está no ar. Minha contribuição inclui identidade, design system, telas e experiência de aquisição.",
      "caption": "Tela de exemplo de treino publicada no site do MindYoung.",
      "extraCaption": "Mascote do MindYoung."
    }
  },
  {
    "slug": "content-radar",
    "name": "Content Radar",
    "number": "02",
    "theme": "radar",
    "image": "/images/radar-overview.webp",
    "extra": "/images/radar-detail.webp",
    "url": null,
    "en": {
      "category": "AI & INTERNAL TOOLING",
      "title": "From manual content research to a shared tool.",
      "summary": "Designed and built an internal tool for researching content across products.",
      "role": "Product design · Architecture · AI-assisted implementation",
      "scope": "Discovery / Workflow design / Interface / Prototyping",
      "status": "Internal tool",
      "decision": "Replace the initial automation with Python collection and a browser interface as usage grew.",
      "lead": "Content Radar began with a practical problem: researching relevant content for Avela, one video at a time, was difficult to sustain. I built an initial workflow to collect and analyze material, then evolved it into a product when other teams needed the same intelligence.",
      "sections": [
        {
          "label": "01 / FIRST ITERATION",
          "title": "Make the research repeatable.",
          "body": "The first version used n8n to collect videos and Airtable to organize them. A second process retrieved captions and used an LLM to assess how the content related to the product. Another layer turned the analysis into potential content directions."
        },
        {
          "label": "02 / PRODUCT DECISION",
          "title": "Rebuild when the requirements change.",
          "body": "As more products began using the workflow, collection volume and control became constraints. I rebuilt the collection layer in Python and designed a browser interface around three user needs.",
          "points": [
            "Tell the system what to look for.",
            "Understand what to do with the findings.",
            "Inspect the evidence behind an insight."
          ]
        },
        {
          "label": "03 / INTERACTION DESIGN",
          "title": "Make the work visible.",
          "body": "The interface presents insights in plain language and organizes the material by product. I designed the loading experience to reveal findings as they arrive. The user can see the work taking shape while the rest of the analysis continues."
        },
        {
          "label": "04 / IMPLEMENTATION",
          "title": "Use AI to bring the idea further.",
          "body": "I defined the system’s architecture and product experience, using AI to support coding. That let me build and iterate on a working tool while retaining responsibility for the decisions behind it."
        }
      ],
      "outcome": "The tool now supports content production across multiple products. An initial research workflow became a shared product capability.",
      "caption": "Interface design from the Content Radar case study; cards use illustrative content.",
      "extraCaption": "Evidence-view design organized by product and content type."
    },
    "pt": {
      "category": "IA E FERRAMENTAS INTERNAS",
      "title": "Da pesquisa manual de conteúdo a uma ferramenta compartilhada.",
      "summary": "Desenhei e construí uma ferramenta interna de pesquisa de conteúdo para múltiplos produtos.",
      "role": "Product design · Arquitetura · Implementação com IA",
      "scope": "Discovery / Fluxos / Interface / Prototipação",
      "status": "Ferramenta interna",
      "decision": "Substituir a automação inicial por coleta em Python e uma interface no navegador conforme o uso cresceu.",
      "lead": "O Content Radar nasceu de um problema prático: pesquisar conteúdo relevante para o Avela, vídeo a vídeo, era difícil de manter. Construí um fluxo de coleta e análise e o transformei em produto quando outros times passaram a precisar da mesma inteligência.",
      "sections": [
        {
          "label": "01 / PRIMEIRA VERSÃO",
          "title": "Tornar a pesquisa repetível.",
          "body": "A primeira versão usava n8n para coletar vídeos e Airtable para organizá-los. Um segundo processo buscava legendas e usava uma LLM para avaliar a relação do conteúdo com o produto. Outra camada transformava a análise em possíveis direções de conteúdo."
        },
        {
          "label": "02 / DECISÃO DE PRODUTO",
          "title": "Reconstruir quando os requisitos mudam.",
          "body": "Com a adoção por mais produtos, o volume e o controle da coleta passaram a ser limitações. Reconstruí essa camada em Python e desenhei uma interface no navegador em torno de três necessidades.",
          "points": [
            "Dizer ao sistema o que procurar.",
            "Entender o que fazer com os achados.",
            "Conferir a evidência por trás de um insight."
          ]
        },
        {
          "label": "03 / DESIGN DE INTERAÇÃO",
          "title": "Dar visibilidade ao trabalho.",
          "body": "A interface apresenta insights em linguagem simples e organiza o material por produto. Desenhei o carregamento para revelar achados conforme chegam. Assim, a pessoa vê o trabalho ganhar forma enquanto a análise continua."
        },
        {
          "label": "04 / IMPLEMENTAÇÃO",
          "title": "Usar IA para levar a ideia adiante.",
          "body": "Defini a arquitetura e a experiência do produto, usando IA como apoio à programação. Isso permitiu construir e iterar sobre uma ferramenta funcional, mantendo a responsabilidade pelas decisões do sistema."
        }
      ],
      "outcome": "Hoje a ferramenta apoia a produção de conteúdo de múltiplos produtos. Um fluxo inicial de pesquisa se tornou uma capacidade compartilhada.",
      "caption": "Design da interface do Content Radar; os cards usam conteúdo ilustrativo.",
      "extraCaption": "Design da visualização de evidências por produto e tipo de conteúdo."
    }
  },
  {
    "slug": "avela",
    "name": "Avela",
    "number": "03",
    "theme": "avela",
    "image": "/images/avela-cover.webp",
    "extra": "/images/avela-flow.webp",
    "url": null,
    "en": {
      "category": "AI & CONSUMER EXPERIENCE",
      "title": "Exploring an AI nutrition companion for perimenopause.",
      "summary": "Explored onboarding, meal-photo flows and a design system for an AI nutrition app.",
      "role": "Product design · UX & UI · Design system",
      "scope": "Discovery / Onboarding / Design system / Acquisition",
      "status": "Design exploration",
      "decision": "Use a supportive tone and everyday meal contexts to shape onboarding and feedback.",
      "lead": "Avela explores an AI nutrition experience for women navigating perimenopause. My design work centered on how the product should speak, respond, and fit into a person’s day. That direction shaped onboarding, the core flows, the design system, and the acquisition page.",
      "sections": [
        {
          "label": "01 / FRAMING",
          "title": "Name what is known. Expose the assumptions.",
          "body": "I used a certainties, assumptions, and doubts matrix to distinguish evidence from design hypotheses. That made open questions visible before they became embedded in the interface, including questions about clinical validation and repeat engagement."
        },
        {
          "label": "02 / DESIGN PRINCIPLE",
          "title": "Tone changes the structure.",
          "body": "I chose a supportive approach with less emphasis on weight-centered messaging. That decision shaped how onboarding introduces the product, how feedback is expressed, and how the experience responds to a disrupted routine. The intended experience makes room for imperfect days."
        },
        {
          "label": "03 / PRODUCT FLOWS",
          "title": "Meet the moment people are in.",
          "body": "I designed paths around photographing a meal, exploring options from a refrigerator, and understanding a restaurant menu. The onboarding builds a companion as the person answers questions, introducing personalization through the interaction itself.",
          "points": [
            "A guided onboarding experience.",
            "Photo-based flows for different everyday contexts.",
            "Shared tokens and components across the product."
          ]
        },
        {
          "label": "04 / TRADEOFF",
          "title": "Choose the scope of the first version.",
          "body": "For the MVP approach, I chose third-party vision APIs and data sources rather than developing a visual model. This traded control over the technology for a faster path to validation. I carried the same product positioning into the acquisition page."
        }
      ],
      "outcome": "A connected design direction across onboarding, core product flows, the design system, and acquisition. Clinical and behavioral hypotheses remain questions to validate.",
      "caption": "Avela product presentation from the original case study.",
      "extraCaption": "Onboarding design exploration. Embedded copy and testimonials are part of the design artifact, not verified outcome evidence."
    },
    "pt": {
      "category": "IA E EXPERIÊNCIA B2C",
      "title": "Explorando um assistente de nutrição com IA para a perimenopausa.",
      "summary": "Explorei onboarding, fluxos com fotos de refeições e um design system para um app de nutrição com IA.",
      "role": "Product design · UX e UI · Design system",
      "scope": "Discovery / Onboarding / Design system / Aquisição",
      "status": "Exploração de design",
      "decision": "Usar um tom acolhedor e situações reais de alimentação para orientar onboarding e feedbacks.",
      "lead": "O Avela explora uma experiência de nutrição com IA para mulheres na perimenopausa. Meu trabalho se concentrou em como o produto conversa, responde e se encaixa na rotina. Essa direção orientou onboarding, fluxos principais, design system e aquisição.",
      "sections": [
        {
          "label": "01 / ENQUADRAMENTO",
          "title": "Nomear certezas. Explicitar hipóteses.",
          "body": "Usei uma matriz de certezas, suposições e dúvidas para separar evidências de hipóteses de design. Isso tornou as questões abertas visíveis antes de entrarem na interface, incluindo validação clínica e engajamento recorrente."
        },
        {
          "label": "02 / PRINCÍPIO DE DESIGN",
          "title": "O tom muda a estrutura.",
          "body": "Escolhi uma abordagem acolhedora, com menos ênfase em mensagens centradas no peso. Essa decisão orientou a apresentação no onboarding, os feedbacks e a resposta a uma rotina interrompida. A experiência proposta abre espaço para dias imperfeitos."
        },
        {
          "label": "03 / FLUXOS",
          "title": "Encontrar a pessoa no seu contexto.",
          "body": "Desenhei caminhos para fotografar refeições, explorar opções com o que há na geladeira e entender um cardápio. No onboarding, um companheiro ganha forma conforme a pessoa responde, apresentando a personalização pela própria interação.",
          "points": [
            "Um onboarding guiado.",
            "Fluxos com fotos para diferentes contextos do dia a dia.",
            "Tokens e componentes compartilhados no produto."
          ]
        },
        {
          "label": "04 / ESCOLHA DE ESCOPO",
          "title": "Definir o que cabe na primeira versão.",
          "body": "Na abordagem de MVP, escolhi APIs de visão e bases de terceiros em vez de desenvolver um modelo visual. A decisão trocou controle sobre a tecnologia por um caminho mais rápido para validação. Levei o mesmo posicionamento à página de aquisição."
        }
      ],
      "outcome": "Uma direção de design conectada entre onboarding, fluxos principais, design system e aquisição. As hipóteses clínicas e de comportamento continuam sendo pontos de validação.",
      "caption": "Apresentação do Avela no case original.",
      "extraCaption": "Exploração de onboarding. Textos e depoimentos na imagem fazem parte do artefato de design e não são evidências verificadas de resultado."
    }
  }
] as const;
export type Lang = "en" | "pt";
/** Optional evidence per case and language. Fill in lib/case-evidence.ts; nothing renders until it exists. */
export { caseEvidence } from "./case-evidence";
