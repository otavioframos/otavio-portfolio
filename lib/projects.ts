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
      "lead": "A3Lab was created to explore new consumer products within A3Media. MindYoung brings cognitive assessment and ongoing training into one product. As the team’s sole designer, I worked across its identity, interface, and acquisition experience alongside the developer.",
      "sections": [
        {
          "label": "01 / RESPONSIBILITY",
          "title": "One product. Many connected decisions.",
          "body": "My work covered MindYoung’s logo, design system, and screens. I also contributed to shaping features and evolving the product with development. Working across these surfaces meant considering how the acquisition experience introduces the product and how the app follows through on that introduction."
        },
        {
          "label": "02 / THE EXPERIENCE",
          "title": "From an assessment to an ongoing habit.",
          "body": "The public journey begins with a cognitive assessment, followed by an offer for the report and ongoing training. Inside the product, the experience includes daily exercises, a personal skill profile, and practice progress. My acquisition work and app design sit within this connected journey.",
          "points": [
            "Acquisition: introduce the product and guide people into the assessment.",
            "Product: organize training, skill profiles, and progress into understandable screens.",
            "System: establish a visual language that carries across features."
          ]
        },
        {
          "label": "03 / COLLABORATION",
          "title": "Design and development, in conversation.",
          "body": "I collaborated with the developer on features and implementation while remaining responsible for design across the product. The work continued beyond the initial screens through product evolution and refinement of the acquisition experience."
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
      "lead": "A A3Lab nasceu para explorar novos produtos B2C dentro da A3Media. O MindYoung reúne avaliação cognitiva e treino contínuo em um produto. Como único designer do time, trabalhei na identidade, na interface e na aquisição, junto ao desenvolvedor.",
      "sections": [
        {
          "label": "01 / RESPONSABILIDADE",
          "title": "Um produto. Muitas decisões conectadas.",
          "body": "Meu trabalho incluiu o logo, o design system e as telas do MindYoung. Também contribuí para a definição de funcionalidades e a evolução do produto com desenvolvimento. Atuar nessas frentes exigiu considerar como a aquisição apresenta o produto e como o app dá continuidade a essa experiência."
        },
        {
          "label": "02 / A EXPERIÊNCIA",
          "title": "Da avaliação a um hábito contínuo.",
          "body": "A jornada pública começa com uma avaliação cognitiva, seguida de uma oferta para acessar o relatório e continuar treinando. O produto inclui exercícios diários, perfil de habilidades e acompanhamento da prática. Meu trabalho de aquisição e de design do app faz parte dessa jornada.",
          "points": [
            "Aquisição: apresentar o produto e conduzir à avaliação.",
            "Produto: organizar treinos, habilidades e progresso em telas compreensíveis.",
            "Sistema: estabelecer uma linguagem visual consistente entre funcionalidades."
          ]
        },
        {
          "label": "03 / COLABORAÇÃO",
          "title": "Design e desenvolvimento em diálogo.",
          "body": "Colaborei com o desenvolvedor nas funcionalidades e na implementação, mantendo a responsabilidade pelo design do produto. O trabalho continuou além das primeiras telas, com a evolução do app e o refinamento da aquisição."
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
    "image": "/images/radar-overview.png",
    "extra": "/images/radar-detail.png",
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
    "image": "/images/avela-cover.png",
    "extra": "/images/avela-flow.png",
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
