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
          "figure": "radar-cluster"
        },
        {
          "label": "05 / INTERACTION DESIGN",
          "figure": "radar-card",
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
          "figure": "radar-cluster"
        },
        {
          "label": "05 / DESIGN DE INTERAÇÃO",
          "figure": "radar-card",
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
      "status": "App in design · Web funnel live-tested",
      "decision": "Use a supportive tone and everyday meal contexts to shape onboarding and feedback.",
      "why": "This audience already carries guilt about food and the body. A coach that scolds loses people on the first imperfect day, so support had to shape the flow, not just the wording.",
      "lead": "Avela explores an AI nutrition experience for women navigating perimenopause. My design work centered on how the product should speak, respond, and fit into a person’s day. That direction shaped onboarding, the core flows, the design system, and the acquisition page.",
      "sections": [
        {
          "label": "01 / FRAMING",
          "title": "Name what is known. Expose the assumptions.",
          "body": "Before drawing screens, I sorted what we knew from what we hoped. A certainties, assumptions and doubts matrix kept design hypotheses from quietly becoming product claims, and kept open questions, like clinical validation and repeat use, out of the interface until they had answers.",
          "figure": "avela-matrix"
        },
        {
          "label": "02 / DESIGN PRINCIPLE",
          "title": "Tone changes the structure.",
          "body": "I chose a supportive voice with less weight-centred messaging. It was not only copy: it decided what onboarding asks first, how feedback is phrased, and how the product responds to a disrupted routine. The experience makes room for imperfect days."
        },
        {
          "label": "03 / THE QUIZ",
          "title": "Fix the promise, not just the screen.",
          "body": "Paid traffic arrived at a web quiz and most people left on the first question. I rebuilt the quiz around one idea people could picture, their eating window, and read the data by ad. The same quiz performed eighteen times better behind ads that promised it, so the fix was matching the message end to end, from ad to first screen.",
          "figure": "avela-quiz"
        },
        {
          "label": "04 / ONBOARDING",
          "title": "Earn the hard questions.",
          "body": "For the app, I reviewed the onboarding against 31 flows from 26 products and redesigned the order. The First Session opens by reconstructing her day, shows a pattern she recognises within about ninety seconds, checks safety before asking for any number, and ends on a plan she can edit.",
          "figure": "avela-onboarding"
        },
        {
          "label": "05 / PRODUCT FLOWS",
          "figure": "avela-system",
          "title": "Meet the moment people are in.",
          "body": "I designed paths around photographing a meal, exploring options from a refrigerator, and understanding a restaurant menu. Personalisation arrives through the interaction itself, not a settings page.",
          "points": [
            "A guided onboarding experience.",
            "Photo-based flows for different everyday contexts.",
            "Shared tokens and components across the product."
          ]
        },
        {
          "label": "06 / TRADEOFF",
          "title": "Choose the scope of the first version.",
          "body": "For the MVP, I chose third-party vision APIs and data sources over building a visual model. That traded control for a faster path to validation, and let the team spend its effort on the experience around the photo."
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
      "status": "App em design · Funil web testado ao vivo",
      "decision": "Usar um tom acolhedor e situações reais de alimentação para orientar onboarding e feedbacks.",
      "why": "Esse público já carrega culpa sobre comida e corpo. Um coach que dá bronca perde as pessoas no primeiro dia imperfeito, então o acolhimento precisava moldar o fluxo, não só as palavras.",
      "lead": "O Avela explora uma experiência de nutrição com IA para mulheres na perimenopausa. Meu trabalho se concentrou em como o produto conversa, responde e se encaixa na rotina. Essa direção orientou onboarding, fluxos principais, design system e aquisição.",
      "sections": [
        {
          "label": "01 / ENQUADRAMENTO",
          "title": "Nomear o que se sabe. Expor as suposições.",
          "body": "Antes de desenhar telas, separei o que sabíamos do que esperávamos. Uma matriz de certezas, suposições e dúvidas impediu que hipóteses de design virassem promessas do produto e manteve perguntas abertas, como validação clínica e uso recorrente, fora da interface até terem resposta.",
          "figure": "avela-matrix"
        },
        {
          "label": "02 / PRINCÍPIO DE DESIGN",
          "title": "O tom muda a estrutura.",
          "body": "Escolhi uma voz acolhedora, com menos ênfase em peso. Não era só texto: decidiu o que o onboarding pergunta primeiro, como os feedbacks são escritos e como o produto responde a uma rotina fora do eixo. A experiência abre espaço para dias imperfeitos."
        },
        {
          "label": "03 / O QUIZ",
          "title": "Corrigir a promessa, não só a tela.",
          "body": "O tráfego pago chegava a um quiz na web e a maioria saía na primeira pergunta. Refiz o quiz em torno de uma ideia que as pessoas conseguiam visualizar, a janela de alimentação, e li os dados por anúncio. O mesmo quiz rendeu dezoito vezes mais atrás de anúncios que o prometiam, então a correção foi alinhar a mensagem de ponta a ponta, do anúncio à primeira tela.",
          "figure": "avela-quiz"
        },
        {
          "label": "04 / ONBOARDING",
          "title": "Merecer as perguntas difíceis.",
          "body": "Para o app, revisei o onboarding comparando com 31 fluxos de 26 produtos e redesenhei a ordem. A Primeira Sessão começa reconstruindo o dia dela, mostra em cerca de noventa segundos um padrão que ela reconhece, checa segurança antes de pedir qualquer número e termina num plano que ela pode editar.",
          "figure": "avela-onboarding"
        },
        {
          "label": "05 / FLUXOS DO PRODUTO",
        "figure": "avela-system",
          "title": "Encontrar as pessoas no momento em que estão.",
          "body": "Desenhei caminhos para fotografar uma refeição, explorar opções a partir da geladeira e entender um cardápio de restaurante. A personalização chega pela própria interação, não por uma tela de configurações.",
          "points": [
            "Uma experiência de onboarding guiada.",
            "Fluxos com fotos para diferentes situações do dia a dia.",
            "Tokens e componentes compartilhados no produto."
          ]
        },
        {
          "label": "06 / TRADE-OFF",
          "title": "Definir o escopo da primeira versão.",
          "body": "Para o MVP, escolhi APIs de visão e fontes de dados de terceiros em vez de construir um modelo visual. Isso trocou controle por um caminho mais rápido para validar e deixou o time investir na experiência em volta da foto."
        }
      ],
      "outcome": "Uma direção de design conectada entre onboarding, fluxos principais, design system e aquisição. As hipóteses clínicas e de comportamento continuam sendo pontos de validação.",
      "caption": "Apresentação do Avela no case original.",
      "extraCaption": "Exploração de onboarding. Textos e depoimentos na imagem fazem parte do artefato de design e não são evidências verificadas de resultado."
    }
  },
  {
    "slug": "vela",
    "name": "Vela",
    "number": "04",
    "theme": "vela",
    "image": "/images/vela-cover.webp",
    "extra": "/images/vela-desktop.webp",
    "url": "https://otavioframos.github.io/aeon/",
    "en": {
      "category": "PERSONAL FINANCE · DESIGN & CODE",
      "title": "A finance app that answers “how will I be?”, not “what did I spend?”.",
      "summary": "Researched, designed and built a personal finance app around forecasting instead of history.",
      "role": "Sole designer and developer",
      "scope": "Research / Product definition / UX & UI / Front end",
      "status": "Live PWA + Android app",
      "decision": "Turn money into time: lead with how long today’s balance lasts, not with where it went.",
      "why": "The pain behind every abandoned finance tool was not knowing how today’s choices affect next month. A list of expenses answers the wrong question.",
      "lead": "Vela started from a spreadsheet thousands of people pay for: a day-by-day calendar that projects your balance forward. People loved the forecast and hated the manual work around it. I researched why, defined what a better tool should and should not do, then designed and built it myself.",
      "sections": [
        {
          "label": "01 / RESEARCH",
          "title": "The forecast was the product. Everything else was friction.",
          "body": "I studied the original spreadsheet and app, their positioning and screenshots, a Reddit investing thread and comments from users with two to five months of use. The value was clear: one user no longer made a decision without checking it. So were the limits: everything typed by hand, one cell per day, no categories, and a phone app that was a cut-down spreadsheet. Existing apps each answered one question: what did I spend, how much do I have, or what will my balance be. None did all three lightly."
        },
        {
          "label": "02 / DEFINITION",
          "title": "Designing for one, on purpose.",
          "body": "I was the user, so I wrote that down as a method and a risk. Five principles came out of it, each paired with an anti-rule so they could settle arguments later.",
          "figure": "vela-principles"
        },
        {
          "label": "03 / PRIORITIES",
          "title": "Frequency decides the hierarchy.",
          "body": "Seven job stories, each with how often it happens. Logging a purchase happens about five times a day; setting up recurring entries happens once. That gap set the structure: the most frequent jobs live on the first screen, the rare ones two taps away.",
          "figure": "vela-jobs"
        },
        {
          "label": "04 / THE METRIC",
          "title": "A number can be right and still mislead.",
          "body": "The whole app hangs on one figure. The first version counted the reserve and made tight months look safe. The next subtracted card bills already committed. In the shipped app it became a daily allowance with an “on pace” signal, the question people actually ask before paying.",
          "figure": "vela-metric"
        },
        {
          "label": "05 / WHAT I LEFT OUT",
          "title": "Saying no is part of the design.",
          "body": "The definition listed anti-jobs as firmly as jobs: no advice, no gamification, no social feed, no celebration. I cut an AI assistant because it would break the tone of plain facts, and removed a “postpone an instalment” lever because nobody can actually do that in real life.",
          "points": [
            "No badges, streaks or confetti: red is red.",
            "No investment advice or AI coach.",
            "Categories are optional, never a gate."
          ]
        },
        {
          "label": "06 / BUILD",
          "title": "From documents to a working app.",
          "body": "I built Vela as an installable web app with two faces: Flux, the phone companion for logging and today’s allowance, and Aeon, the long view with projection, pace and yearly rhythm. An Android build adds a home-screen widget. The hardest part turned out not to be the interface but trustworthy calculation, so the app stores source facts and derives every figure from them."
        }
      ],
      "outcome": "Vela is live as an installable web app and an Android build, used daily by its first user.",
      "caption": "Flux and Aeon on the phone, shown with sample data.",
      "extraCaption": "Flux on desktop, shown with sample data."
    },
    "pt": {
      "category": "FINANÇAS PESSOAIS · DESIGN E CÓDIGO",
      "title": "Um app de finanças que responde “como vou estar?”, não “quanto gastei?”.",
      "summary": "Pesquisei, desenhei e construí um app de finanças pessoais centrado em previsão, não em histórico.",
      "role": "Único designer e desenvolvedor",
      "scope": "Pesquisa / Definição de produto / UX e UI / Front-end",
      "status": "PWA no ar + app Android",
      "decision": "Transformar dinheiro em tempo: começar por quanto o saldo de hoje dura, não por onde ele foi.",
      "why": "A dor por trás de toda ferramenta abandonada era não saber como as escolhas de hoje afetam o mês que vem. Uma lista de gastos responde à pergunta errada.",
      "lead": "O Vela nasceu de uma planilha pela qual milhares de pessoas pagam: um calendário dia a dia que projeta o saldo para frente. As pessoas amavam a previsão e odiavam o trabalho manual em volta dela. Pesquisei o porquê, defini o que uma ferramenta melhor deveria e não deveria fazer, e depois desenhei e construí eu mesmo.",
      "sections": [
        {
          "label": "01 / PESQUISA",
          "title": "A previsão era o produto. O resto era atrito.",
          "body": "Estudei a planilha e o app originais, seu posicionamento e telas, uma discussão no Reddit sobre investimentos e comentários de usuários com dois a cinco meses de uso. O valor era claro: um usuário não tomava mais nenhuma decisão sem consultá-la. Os limites também: tudo digitado à mão, uma célula por dia, sem categorias e um app de celular que era uma planilha cortada. Os apps existentes respondiam cada um a uma pergunta: quanto gastei, quanto tenho ou quanto vou ter. Nenhum fazia as três de forma leve."
        },
        {
          "label": "02 / DEFINIÇÃO",
          "title": "Desenhar para um, de propósito.",
          "body": "Eu era o usuário, então registrei isso como método e como risco. Daí saíram cinco princípios, cada um com uma anti-regra, para resolver discussões depois.",
          "figure": "vela-principles"
        },
        {
          "label": "03 / PRIORIDADES",
          "title": "A frequência decide a hierarquia.",
          "body": "Sete job stories, cada uma com a frequência em que acontece. Lançar uma compra acontece cerca de cinco vezes por dia; configurar recorrências, uma vez. Essa diferença definiu a estrutura: as tarefas mais frequentes ficam na primeira tela, as raras a dois toques.",
          "figure": "vela-jobs"
        },
        {
          "label": "04 / A MÉTRICA",
          "title": "Um número pode estar certo e ainda enganar.",
          "body": "O app inteiro depende de um número. A primeira versão contava a reserva e fazia meses apertados parecerem seguros. A seguinte descontava as faturas já comprometidas. No app lançado virou um limite diário com sinal de “no ritmo”, a pergunta que as pessoas fazem de verdade antes de pagar.",
          "figure": "vela-metric"
        },
        {
          "label": "05 / O QUE FICOU DE FORA",
          "title": "Dizer não também é design.",
          "body": "A definição listava anti-tarefas com a mesma firmeza das tarefas: sem conselhos, sem gamificação, sem feed social, sem comemoração. Cortei um assistente de IA porque quebraria o tom de fatos simples, e removi a opção de “adiar uma parcela” porque ninguém consegue fazer isso na vida real.",
          "points": [
            "Sem medalhas, sequências ou confete: vermelho é vermelho.",
            "Sem conselho de investimento nem coach de IA.",
            "Categorias opcionais, nunca obrigatórias."
          ]
        },
        {
          "label": "06 / CONSTRUÇÃO",
          "title": "Dos documentos a um app funcionando.",
          "body": "Construí o Vela como um web app instalável com duas faces: Flux, a companhia no celular para lançar e ver o limite do dia, e Aeon, a visão longa com projeção, ritmo e o ano todo. Uma versão Android adiciona um widget na tela inicial. A parte mais difícil não foi a interface, mas um cálculo confiável, então o app guarda os fatos de origem e deriva cada número deles."
        }
      ],
      "outcome": "O Vela está no ar como web app instalável e versão Android, usado todos os dias pelo seu primeiro usuário.",
      "caption": "Flux e Aeon no celular, com dados de exemplo.",
      "extraCaption": "Flux no desktop, com dados de exemplo."
    }
  }
] as const;
export type Lang = "en" | "pt";
/** Optional evidence per case and language. Fill in lib/case-evidence.ts; nothing renders until it exists. */
export { caseEvidence } from "./case-evidence";
