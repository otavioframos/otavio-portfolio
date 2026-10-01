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
      "title": "People came for a number. The product sold a subscription.",
      "summary": "Designed the product end to end, then found the real problem was the promise, not the screens.",
      "role": "Sole designer · Design, measurement, experiments and product decisions",
      "scope": "Brand identity / UX & UI / Design system / Checkout and pricing / Emails and billing",
      "status": "Live product",
      "decision": "Stop polishing screens and redo the deal with the customer: deliver what was promised, make the offer easy to read, and be honest about charging.",
      "why": "People finished the test and left at the payment screen. The ones who paid kept writing the same thing: they only wanted their result. The screens were fine. The promise was not.",
      "lead": "MindYoung is an IQ-style test that turns into daily brain training. As the only designer, I created its identity, its design system and every screen. The product looked finished and people used it, but it cost more to bring in a buyer than a buyer paid back, and the team was losing heart. This is how I found where the problem really was, and what I changed.",
      "leadTech": "MindYoung is a cognitive self-assessment sold as a paid trial that renews weekly, acquired through social ads on mobile web. As the only designer, I owned identity, design system and every screen, then measurement and experiments. The unit economics did not close: about 5% of people who reached checkout paid, 37% of trials kept their first weekly charge, and acquiring a buyer cost roughly three times what a buyer returned. This case is the diagnosis and the redesign.",
      "sections": [
        {
          "label": "01 / THE SETUP",
          "title": "One language, from the ad to the app.",
          "body": "People meet MindYoung in a test opened from a social ad and stay for training inside the app. I designed the logo, the visual system and every screen so both moments feel like one product: a warm paper background, dark ink, a single blue for action, and large shapes that read as physical keys on a phone. On the test, the team was me, a copywriter and a media buyer.",
          "tech": "One token set serves the acquisition funnel (mobile web, mostly inside Instagram and Facebook's in-app browsers) and the app: a single 30rem column, 16px gutters, touch targets above 56px, one accent colour reserved for the primary action. The same system later carried emails, the PDF report and printable workbooks. The specimen below uses the production tokens.",
          "figure": "system"
        },
        {
          "label": "02 / THE ASSESSMENT",
          "title": "Built to be finished.",
          "body": "A 29-question test on a phone, opened from a social feed, competes with every notification. I paced it in short sections with visible progress, small rewards between them and puzzles that load before they are needed. People finish it.",
          "tech": "In the first four weeks, 44% of people who answered the first item answered all of them, and almost none dropped between the last item and the result. On paid traffic in the latest read, about 60% of starters reach the end (a different window and traffic mix, so not a like-for-like gain). Completion was never the constraint, which is what sent me looking further down the journey.",
          "figure": "funnel"
        },
        {
          "label": "03 / THE PROBLEM",
          "title": "It worked, and it did not pay for itself.",
          "body": "After the test, people saw a payment screen: a small price today, then a weekly charge. Out of every hundred, ninety-five left. Of the few who paid, most cancelled within days or had their card refused at the first weekly charge. Bringing in a buyer cost about three times what that buyer paid back. A product can be well made and still not work.",
          "tech": "Checkout view to purchase sat near 5% (6% submitted a card; 78% of cards were approved). Of trials, 37% kept the first weekly charge, 30% cancelled inside the trial and 32% were declined at renewal. Lifetime net per buyer was about a third of blended acquisition cost. Conversion varied four-fold by market: around 11% in the US against 3% on translated pages in euro markets."
        },
        {
          "label": "04 / THE WRONG TURNS",
          "title": "I looked for the problem in the screens. Then my own test proved me wrong.",
          "body": "First I tested details the team believed in: showing part of the result before payment, and moving a hard question. Neither changed anything. Then I found a strong signal: people who paid in a regular browser bought twice as often as people inside Instagram and Facebook. I designed a screen asking people to switch browsers and ran it as a test. It sold about half as much. The people in a regular browser had not bought because of the browser. They had arrived wanting it more.",
          "tech": "Two A/B tests at about 1,500 people per arm showed overlapping intervals: no measurable effect. The browser finding was observational, and the difference was selection: people already in a real browser reached us through different paths, with higher intent. The controlled test (50/50, iOS in-app visitors) put the gated arm at an index of 49 against control, with a third of people abandoning on the gate itself; small sample, so direction rather than proof. A second version with a visual guide closed the gap. The lesson was about method: a correlation is a reason to run a test, not a reason to ship.",
          "figure": "tests"
        },
        {
          "label": "05 / THE TURN",
          "title": "People who did not buy read more of the page than people who did.",
          "body": "I stopped asking which screen was wrong and looked at what people did. Buyers decided in about a minute, on the first screen. People who left scrolled further down the page, as if looking for a reason to pay. And the buyers who cancelled wrote the same sentence in several languages: I only wanted my result. They came for a number and found a subscription. The problem was the promise, not the page.",
          "tech": "A section-view funnel on the checkout: 90% see the payment block within five seconds and only 18% interact with it. Median time is 33 seconds for non-buyers and 64 seconds to purchase for buyers. Non-buyers reach the report preview at 53% against 29% for buyers, and the footer at 21% against 7%. Cancellation reasons (31 texts) and refund requests (13 cases) cluster on not wanting or not noticing the subscription. Those voices are buyers only; nobody who left unpaid was heard, which is the main gap in the evidence. In HCI terms: the person's mental model was a one-time purchase and the system's model was a subscription.",
          "figure": "reach"
        },
        {
          "label": "06 / THE NEW DEAL",
          "title": "Four moves to redo the deal.",
          "body": "If the problem was the promise, the fix was to keep it, and to be clear about everything around it.",
          "tech": "Each move has a before-and-after baseline saved at the time it went live. Delivery: 20 of the 33 buyers who never reached the app had stopped at one extra screen, which I removed; 78% of new buyers now reach the app, against 69% before (23 buyers so far). Offer: extras offered after payment were accepted zero times in more than 60 exposures, so I moved them into the checkout as a second plan, shown first and pre-selected (default, anchoring and order effects); a higher entry price returned about 2.5 times more per visitor in the first read, with few purchases per arm. Charging: off-cycle retries of failed renewals had recovered 7 of 104 members and triggered fraud disputes; I replaced them with an offer the person accepts or ignores, and added a notice about a day before the first charge. Offers by email had reached 11 of 723 buyers because of a consent gate; they now reach every buyer, with one-click unsubscribe.",
          "points": [
            "Deliver what was promised. A path from payment to the app with no dead ends, and the full report sent by email.",
            "Make the offer easy to read. The most complete plan comes first, what used to be offered after payment moved into the checkout, and the entry price is being tested.",
            "Be honest about charging. A notice the day before the first charge. When a card fails, an offer the person chooses instead of a surprise charge.",
            "Give a reason to stay. A home with tests, printables and a daily challenge, all included."
          ]
        },
        {
          "label": "07 / AUTHORSHIP",
          "title": "My decisions, shipped with AI.",
          "body": "The questions, the hypotheses and the decisions were mine, including the ones that went against my own ideas. I directed the implementation and the data analysis with AI coding tools, reviewed what came back and approved every change that reached production.",
          "tech": "Changes shipped as reviewed pull requests with tests and database migrations. Every change is logged with its go-live time and the numbers before it, so later reads can attribute movement instead of guessing. I set the questions, the stopping rules and what counts as evidence; the tooling did the querying and the code."
        }
      ],
      "outcome": "MindYoung is live in nine languages. The path from payment to the app works, charging is transparent and the offer is under test. Whether the product pays for itself is being read now, as the first buyers under the new deal reach their first weekly charge.",
      "outcomeTech": "Targets for the current read: first-charge retention from 37% to at least 42%, cancellation inside the trial from 30% to 25% or less, and card submission at checkout from 6% towards 10%. At those rates the product breaks even on its cheaper campaigns. The read is honest about sample size: nothing here is claimed as a result until the cohort matures.",
      "caption": "Sample training screen from the public MindYoung site.",
      "extraCaption": "MindYoung’s product mascot."
    },
    "pt": {
      "category": "PRODUTO B2C",
      "title": "As pessoas vinham buscar um número. O produto vendia uma assinatura.",
      "summary": "Desenhei o produto de ponta a ponta e descobri que o problema real era a promessa, não as telas.",
      "role": "Único designer · Design, medição, experimentos e decisões de produto",
      "scope": "Identidade / UX e UI / Design system / Checkout e preço / E-mails e cobrança",
      "status": "Produto no ar",
      "decision": "Parar de polir telas e refazer o acordo com o cliente: entregar o que foi prometido, deixar a oferta fácil de ler e ser honesto sobre a cobrança.",
      "why": "As pessoas terminavam o teste e saíam na tela de pagamento. Quem pagava repetia a mesma frase: só queria o resultado. As telas estavam boas. A promessa, não.",
      "lead": "O MindYoung é um teste no estilo de QI que vira treino diário para o cérebro. Como único designer, criei a identidade, o design system e todas as telas. O produto parecia pronto e as pessoas usavam, mas trazer um comprador custava mais do que ele pagava de volta, e o time foi desanimando. Esta é a história de como descobri onde o problema realmente estava, e do que mudei.",
      "leadTech": "O MindYoung é uma autoavaliação cognitiva vendida como trial pago com renovação semanal, adquirida por anúncios em redes sociais no celular. Como único designer, fui responsável por identidade, design system e todas as telas, e depois por medição e experimentos. A conta não fechava: cerca de 5% de quem chegava ao checkout pagava, 37% dos trials mantinham a primeira cobrança semanal, e adquirir um comprador custava perto de três vezes o que ele retornava. Este case é o diagnóstico e o redesenho.",
      "sections": [
        {
          "label": "01 / O COMEÇO",
          "title": "Uma linguagem, do anúncio ao app.",
          "body": "As pessoas conhecem o MindYoung num teste aberto a partir de um anúncio e ficam pelo treino dentro do app. Desenhei o logo, o sistema visual e todas as telas para que os dois momentos pareçam um produto só: fundo de papel quente, tinta escura, um único azul para ação e formas grandes que parecem teclas físicas no celular. No teste, o time era eu, um copywriter e um gestor de tráfego.",
          "tech": "Um único conjunto de tokens atende o funil de aquisição (web no celular, quase sempre dentro dos navegadores do Instagram e do Facebook) e o app: uma coluna de 30rem, margens de 16px, alvos de toque acima de 56px e uma cor de destaque reservada para a ação principal. O mesmo sistema depois passou a cobrir e-mails, o relatório em PDF e os materiais para imprimir. O espécime abaixo usa os tokens de produção.",
          "figure": "system"
        },
        {
          "label": "02 / A AVALIAÇÃO",
          "title": "Feita para ser terminada.",
          "body": "Um teste de 29 questões no celular, aberto a partir de um feed social, compete com todas as notificações. Organizei o ritmo em seções curtas, com progresso visível, pequenas recompensas entre elas e desafios que carregam antes de serem necessários. As pessoas terminam.",
          "tech": "Nas quatro primeiras semanas, 44% de quem respondeu a primeira questão respondeu todas, e quase ninguém desistiu entre a última questão e o resultado. No tráfego pago da leitura mais recente, cerca de 60% de quem começa chega ao fim (outra janela e outro perfil de tráfego, então não é um ganho comparável). A conclusão nunca foi o gargalo, e foi isso que me fez procurar mais adiante na jornada.",
          "figure": "funnel"
        },
        {
          "label": "03 / O PROBLEMA",
          "title": "Funcionava, e não se pagava.",
          "body": "Depois do teste, a pessoa via uma tela de pagamento: um valor pequeno hoje e depois uma cobrança semanal. De cada cem, noventa e cinco iam embora. Dos poucos que pagavam, a maioria cancelava em poucos dias ou tinha o cartão recusado na primeira cobrança semanal. Trazer um comprador custava cerca de três vezes o que ele pagava de volta. Um produto pode ser bem feito e ainda assim não funcionar.",
          "tech": "A conversão de checkout para compra ficava perto de 5% (6% enviavam o cartão; 78% dos cartões eram aprovados). Dos trials, 37% mantinham a primeira cobrança semanal, 30% cancelavam dentro do trial e 32% eram recusados na renovação. O retorno líquido por comprador era cerca de um terço do custo médio de aquisição. A conversão variava quatro vezes entre mercados: perto de 11% nos EUA contra 3% nas páginas traduzidas em mercados de euro."
        },
        {
          "label": "04 / OS CAMINHOS ERRADOS",
          "title": "Procurei o problema nas telas. Depois meu próprio teste mostrou que eu estava errado.",
          "body": "Primeiro testei detalhes em que o time acreditava: mostrar parte do resultado antes do pagamento e mudar uma questão difícil de lugar. Nenhum dos dois mudou nada. Depois achei um sinal forte: quem pagava num navegador comum comprava duas vezes mais do que quem estava dentro do Instagram e do Facebook. Desenhei uma tela pedindo para a pessoa trocar de navegador e coloquei no ar como teste. Ela vendeu cerca de metade. Quem estava no navegador comum não comprava por causa do navegador. Já chegava querendo mais.",
          "tech": "Dois testes A/B com cerca de 1.500 pessoas por braço tiveram intervalos sobrepostos: sem efeito mensurável. O achado do navegador era observacional, e a diferença era de seleção: quem já estava num navegador de verdade chegava por outros caminhos, com mais intenção. O teste controlado (50/50, visitantes de iPhone dentro dos apps) deixou o braço com a tela num índice de 49 contra o controle, com um terço das pessoas abandonando na própria tela; a amostra é pequena, então vale como direção, não como prova. Uma segunda versão com um guia visual fechou a diferença. A lição foi de método: correlação é motivo para rodar um teste, não para colocar no ar.",
          "figure": "tests"
        },
        {
          "label": "05 / A VIRADA",
          "title": "Quem não comprava lia mais a página do que quem comprava.",
          "body": "Parei de perguntar qual tela estava errada e fui olhar o que as pessoas faziam. Quem comprava decidia em cerca de um minuto, na primeira tela. Quem ia embora rolava a página mais para baixo, como quem procura um motivo para pagar. E os compradores que cancelavam escreviam a mesma frase em várias línguas: eu só queria o meu resultado. Vinham buscar um número e encontravam uma assinatura. O problema era a promessa, não a página.",
          "tech": "Um funil de seções vistas no checkout: 90% veem o bloco de pagamento em até cinco segundos e só 18% interagem com ele. O tempo mediano é de 33 segundos para quem não compra e de 64 segundos até a compra para quem compra. Quem não compra chega à prévia do relatório em 53% dos casos, contra 29% de quem compra, e ao rodapé em 21% contra 7%. Os motivos de cancelamento (31 textos) e os pedidos de reembolso (13 casos) se concentram em não querer ou não perceber a assinatura. Essas vozes são só de compradores; ninguém que saiu sem pagar foi ouvido, e essa é a principal lacuna da evidência. Em termos de IHC: o modelo mental da pessoa era uma compra única, e o modelo do sistema era uma assinatura.",
          "figure": "reach"
        },
        {
          "label": "06 / O NOVO ACORDO",
          "title": "Quatro movimentos para refazer o acordo.",
          "body": "Se o problema era a promessa, a solução era cumpri-la, e deixar claro tudo o que está em volta dela.",
          "tech": "Cada movimento tem uma base de antes e depois salva no momento em que entrou no ar. Entrega: 20 dos 33 compradores que nunca chegaram ao app tinham parado numa tela extra, que eu removi; 78% dos novos compradores chegam ao app, contra 69% antes (23 compradores até aqui). Oferta: os extras oferecidos depois do pagamento foram aceitos zero vezes em mais de 60 exibições, então levei esses itens para dentro do checkout como um segundo plano, mostrado primeiro e já selecionado (efeitos de padrão, ancoragem e ordem); um preço de entrada mais alto rendeu cerca de 2,5 vezes mais por visitante na primeira leitura, com poucas compras por braço. Cobrança: as novas tentativas fora do ciclo tinham recuperado 7 de 104 assinantes e geravam disputas de fraude; troquei por uma oferta que a pessoa aceita ou ignora, e incluí um aviso cerca de um dia antes da primeira cobrança. As ofertas por e-mail chegavam a 11 de 723 compradores por causa de uma trava de consentimento; hoje chegam a todos, com descadastro em um clique.",
          "points": [
            "Entregar o que foi prometido. Um caminho do pagamento até o app sem telas sem saída, e o relatório completo enviado por e-mail.",
            "Deixar a oferta fácil de ler. O plano mais completo aparece primeiro, o que era oferecido depois do pagamento foi para dentro do checkout, e o preço de entrada está em teste.",
            "Ser honesto sobre a cobrança. Um aviso um dia antes da primeira cobrança. Quando o cartão falha, uma oferta que a pessoa escolhe, e não uma cobrança surpresa.",
            "Dar motivo para ficar. Uma tela inicial com testes, materiais para imprimir e um desafio diário, tudo incluído."
          ]
        },
        {
          "label": "07 / AUTORIA",
          "title": "Decisões minhas, colocadas no ar com IA.",
          "body": "As perguntas, as hipóteses e as decisões foram minhas, inclusive as que contrariaram as minhas próprias ideias. Dirigi a implementação e a análise de dados com ferramentas de IA para código, revisei o que voltava e aprovei cada mudança que foi para produção.",
          "tech": "As mudanças entraram como pull requests revisados, com testes e migrações de banco. Cada mudança fica registrada com a hora em que entrou no ar e os números de antes, para que as leituras seguintes atribuam o efeito em vez de supor. Eu defino as perguntas, as regras de parada e o que conta como evidência; as ferramentas fazem as consultas e o código."
        }
      ],
      "outcome": "O MindYoung está no ar em nove idiomas. O caminho do pagamento até o app funciona, a cobrança é transparente e a oferta está em teste. Se o produto se paga é o que está sendo lido agora, à medida que os primeiros compradores do novo acordo chegam à primeira cobrança semanal.",
      "outcomeTech": "Metas da leitura atual: retenção na primeira cobrança de 37% para pelo menos 42%, cancelamento dentro do trial de 30% para 25% ou menos, e envio de cartão no checkout de 6% rumo a 10%. Com essas taxas o produto se paga nas campanhas mais baratas. A leitura é honesta sobre o tamanho da amostra: nada aqui é dado como resultado antes de a turma amadurecer.",
      "caption": "Tela de exemplo de treino publicada no site do MindYoung.",
      "extraCaption": "Mascote do MindYoung."
    }
  },
  {
    "slug": "vela",
    "name": "Vela",
    "number": "02",
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
  },
  {
    "slug": "content-radar",
    "name": "Content Radar",
    "number": "03",
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
    "number": "04",
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
  }
] as const;
export type Lang = "en" | "pt";
/** Optional evidence per case and language. Fill in lib/case-evidence.ts; nothing renders until it exists. */
export { caseEvidence } from "./case-evidence";
