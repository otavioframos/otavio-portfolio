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
      "role": "Sole designer · Owned design, measurement and experiments",
      "scope": "Brand identity / UX & UI / Design system / Acquisition",
      "status": "Live product",
      "decision": "Use one visual system across acquisition and in-app training.",
      "why": "The first contact is a quiz opened from an ad; the relationship is daily training. If they looked like two products, the trust built in the assessment would reset at the paywall.",
      "lead": "A3Lab was created to explore new consumer products within A3Media. MindYoung brings cognitive assessment and ongoing training into one product. As the only designer, I owned its identity, interface and acquisition journey, and went past design: I measured the journey and designed the experiments that decided what changed.",
      "sections": [
        {
          "label": "01 / RESPONSIBILITY",
          "title": "One product. Many connected decisions.",
          "body": "MindYoung is a cognitive assessment that turns into daily training. I designed the logo, the design system and every screen, from the quiz people open from an ad to the app. On the quiz, the team was me, a copywriter and a media buyer: I defined the structure and pacing of the journey, the copy worked inside it, and traffic fed it."
        },
        {
          "label": "02 / THE SYSTEM",
          "title": "One language, from the ad to the app.",
          "body": "People meet MindYoung in a quiz opened from a social ad and stay for training inside the app. I built one system for both: a warm paper ground, deep ink, a single blue for action, and generous shapes that read as physical keys on a phone. The specimen below uses the production tokens.",
          "figure": "system"
        },
        {
          "label": "03 / THE ASSESSMENT",
          "title": "Built to be finished.",
          "body": "A 30-question test on a phone, opened from a social feed, competes with every notification. I paced it in short sections with progress, small rewards between them and matrices that load before they are needed. Once it went live, the journey could be measured end to end, and that measurement set the priorities for what came next.",
          "figure": "funnel"
        },
        {
          "label": "04 / TESTING",
          "title": "Two tests that settled a debate, and a finding that moved the number.",
          "body": "I designed two live A/B tests on details the team expected to matter: showing the score band before payment and the position of a hard question. At about 1,500 people per arm, neither moved, which ended the debate and freed the roadmap. Then I segmented checkout data by where it opened and found the real lever: in a regular browser, with wallets and autofill, people bought twice as often as inside Instagram and Facebook's in-app browsers. I proposed a way out, a prompt that reopens checkout in the phone's own browser, and it went live as its own A/B test.",
          "figure": "tests"
        },
        {
          "label": "05 / OWNERSHIP",
          "title": "From spec to result, one loop.",
          "body": "I wrote the specs, reviewed every implemented screen and adjusted the system when real content broke it. After launch, the loop was mine: read the data, propose the change, design the test, read the result."
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
      "role": "Único designer · Responsável por design, medição e experimentos",
      "scope": "Identidade / UX e UI / Design system / Aquisição",
      "status": "Produto no ar",
      "decision": "Usar um mesmo sistema visual na aquisição e no treino dentro do app.",
      "why": "O primeiro contato é um quiz aberto a partir de um anúncio; a relação é o treino diário. Se parecessem dois produtos, a confiança criada na avaliação se perderia no paywall.",
      "lead": "A A3Lab nasceu para explorar novos produtos B2C dentro da A3Media. O MindYoung reúne avaliação cognitiva e treino contínuo em um produto. Como único designer, fui responsável pela identidade, pela interface e pela jornada de aquisição, e fui além do design: medi a jornada e desenhei os experimentos que decidiram o que mudava.",
      "sections": [
        {
          "label": "01 / RESPONSABILIDADE",
          "title": "Um produto. Muitas decisões conectadas.",
          "body": "O MindYoung é uma avaliação cognitiva que vira treino diário. Desenhei o logo, o design system e todas as telas, do quiz aberto a partir de um anúncio até o app. No quiz, o time era eu, um copywriter e um gestor de tráfego: defini a estrutura e o ritmo da jornada, a copy trabalhou dentro dela e o tráfego a alimentou."
        },
        {
          "label": "02 / O SISTEMA",
          "title": "Uma linguagem, do anúncio ao app.",
          "body": "As pessoas conhecem o MindYoung num quiz aberto a partir de um anúncio e ficam pelo treino dentro do app. Criei um sistema para os dois: fundo papel quente, tinta profunda, um único azul para ação e formas generosas que parecem teclas físicas no celular. O espécime abaixo usa os tokens de produção.",
          "figure": "system"
        },
        {
          "label": "03 / A AVALIAÇÃO",
          "title": "Feita para ser terminada.",
          "body": "Um teste de 30 questões no celular, aberto a partir de um feed social, compete com todas as notificações. Organizei o ritmo em seções curtas com progresso, pequenas recompensas entre elas e matrizes que carregam antes de serem necessárias. Com o produto no ar, a jornada passou a ser medida de ponta a ponta, e essa medição definiu as prioridades seguintes.",
          "figure": "funnel"
        },
        {
          "label": "04 / TESTES",
          "title": "Dois testes que encerraram uma discussão, e uma descoberta que moveu o número.",
          "body": "Desenhei dois testes A/B em detalhes que o time achava decisivos: mostrar a faixa do resultado antes do pagamento e a posição de uma questão difícil. Com cerca de 1.500 pessoas por braço, nenhum moveu o número, o que encerrou a discussão e liberou o roadmap. Depois segmentei os dados de checkout por onde ele abria e encontrei a alavanca real: num navegador comum, com carteiras digitais e preenchimento automático, as pessoas compraram duas vezes mais do que dentro dos navegadores do Instagram e do Facebook. Propus uma saída, um aviso que reabre o checkout no navegador do próprio celular, e ela entrou no ar como um novo teste A/B.",
          "figure": "tests"
        },
        {
          "label": "05 / AUTORIA",
          "title": "Da especificação ao resultado, um ciclo só.",
          "body": "Escrevi as especificações, revisei cada tela implementada e ajustei o sistema quando o conteúdo real o quebrava. Depois do lançamento, o ciclo era meu: ler os dados, propor a mudança, desenhar o teste, ler o resultado."
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
      "role": "Product owner · Design · Architecture",
      "scope": "Discovery / Workflow design / Interface / Prototyping",
      "status": "Internal tool",
      "decision": "Replace the initial automation with Python collection and a browser interface as usage grew.",
      "why": "Patching n8n would have kept a one-product workaround alive. Other teams needed volume, control and a place to judge findings together, which only a product could give them.",
      "lead": "Content Radar began with a practical problem: researching relevant content for Avela, one video at a time, was difficult to sustain. I built an initial workflow to collect and analyze material, then evolved it into a product when other teams needed the same intelligence.",
      "sections": [
        {
          "label": "01 / THE PROBLEM",
          "title": "Research that depended on scrolling.",
          "body": "Finding references for Avela meant opening TikTok and Instagram and watching one video at a time. It was slow, impossible to share, and whatever someone found lived in their own head. I wanted to replace open-ended scrolling with a queue a team could review and clear."
        },
        {
          "label": "02 / FIRST ITERATION",
          "title": "Make the research repeatable.",
          "body": "I started with automation I could build in days: n8n collected videos, Airtable organised them, and an LLM read the captions to judge relevance and suggest content directions. It proved the value. When a second product asked for the same research, it also showed the limits: volume, control and a spreadsheet no one wanted to open.",
          "figure": "radar-evolution"
        },
        {
          "label": "03 / PRODUCT DECISION",
          "title": "Rebuild when the requirements change.",
          "body": "Instead of patching the automation, I rebuilt it as a product. With a developer, collection moved to Python and later to a durable worker; I designed the browser interface around three needs.",
          "points": [
            "Tell the system what to look for.",
            "Understand what to do with the findings.",
            "Inspect the evidence behind an insight."
          ]
        },
        {
          "label": "04 / THE LOOP",
          "title": "Explore without endless scrolling.",
          "body": "Today a team seeds a folder with a few examples. The radar walks outward to nearby creators, sounds and hashtags, but only a bounded distance, ranks what it finds for relevance and variety, and delivers a finite inbox. Every judgement from the team becomes a seed for the next run, so the radar gets sharper the more it is used.",
          "figure": "radar-loop"
        },
        {
          "label": "05 / INTERACTION DESIGN",
          "title": "Make the work visible.",
          "body": "Insights are written in plain language and organised by product. Each card shows the path that found it, so people can trust or discard it quickly. Findings appear as they arrive, so the work takes shape on screen while the rest of the analysis runs."
        },
        {
          "label": "06 / OWNERSHIP",
          "title": "From a workaround to shared infrastructure.",
          "body": "I owned the product: the problem framing, the architecture, the ranking logic people see and the interface. The developer and I built it with AI-assisted coding, which let a two-person team ship a durable system. It now runs with Jev, a frontier model built for high-volume judgement, alongside its own explainable ranking."
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
      "role": "Dono do produto · Design · Arquitetura",
      "scope": "Discovery / Fluxos / Interface / Prototipação",
      "status": "Ferramenta interna",
      "decision": "Substituir a automação inicial por coleta em Python e uma interface no navegador conforme o uso cresceu.",
      "why": "Remendar o n8n manteria vivo um improviso feito para um produto. Outros times precisavam de volume, controle e um lugar para avaliar descobertas juntos, e só um produto daria isso.",
      "lead": "O Content Radar nasceu de um problema prático: pesquisar conteúdo relevante para o Avela, vídeo a vídeo, era difícil de manter. Construí um fluxo de coleta e análise e o transformei em produto quando outros times passaram a precisar da mesma inteligência.",
      "sections": [
        {
          "label": "01 / O PROBLEMA",
          "title": "Uma pesquisa que dependia de rolar o feed.",
          "body": "Encontrar referências para o Avela significava abrir TikTok e Instagram e assistir um vídeo de cada vez. Era lento, impossível de compartilhar, e o que alguém encontrava ficava na cabeça dessa pessoa. Eu queria trocar a rolagem sem fim por uma fila que um time pudesse revisar e esvaziar."
        },
        {
          "label": "02 / PRIMEIRA VERSÃO",
          "title": "Tornar a pesquisa repetível.",
          "body": "Comecei com uma automação que eu conseguia montar em dias: o n8n coletava vídeos, o Airtable organizava e uma LLM lia as legendas para julgar a relevância e sugerir caminhos de conteúdo. Isso provou o valor. Quando um segundo produto pediu a mesma pesquisa, também mostrou os limites: volume, controle e uma planilha que ninguém queria abrir.",
          "figure": "radar-evolution"
        },
        {
          "label": "03 / DECISÃO DE PRODUTO",
          "title": "Reconstruir quando os requisitos mudam.",
          "body": "Em vez de remendar a automação, reconstruí como produto. Com um desenvolvedor, a coleta foi para Python e depois para um worker durável; desenhei a interface no navegador em torno de três necessidades.",
          "points": [
            "Dizer ao sistema o que procurar.",
            "Entender o que fazer com as descobertas.",
            "Ver as evidências por trás de cada insight."
          ]
        },
        {
          "label": "04 / O CICLO",
          "title": "Explorar sem rolagem infinita.",
          "body": "Hoje um time semeia uma pasta com alguns exemplos. O radar caminha para criadores, sons e hashtags próximos, mas só até uma distância limitada, ranqueia o que encontra por relevância e variedade e entrega uma caixa finita. Cada avaliação do time vira semente da próxima rodada, então o radar fica mais preciso quanto mais é usado.",
          "figure": "radar-loop"
        },
        {
          "label": "05 / DESIGN DE INTERAÇÃO",
          "title": "Tornar o trabalho visível.",
          "body": "Os insights são escritos em linguagem simples e organizados por produto. Cada card mostra o caminho que o encontrou, para que as pessoas confiem ou descartem rápido. As descobertas aparecem conforme chegam, então o trabalho ganha forma na tela enquanto o resto da análise continua."
        },
        {
          "label": "06 / AUTORIA",
          "title": "De um improviso a uma infraestrutura compartilhada.",
          "body": "Fui responsável pelo produto: o enquadramento do problema, a arquitetura, a lógica de ranking que as pessoas veem e a interface. Eu e o desenvolvedor construímos com código assistido por IA, o que permitiu a um time de duas pessoas entregar um sistema durável. Hoje ele roda com o Jev, um modelo de IA de ponta feito para julgamento em alto volume, ao lado do seu próprio ranking explicável."
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
