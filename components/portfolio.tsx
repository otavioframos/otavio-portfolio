import { Fragment } from 'react';
import { projects, type Lang } from '@/lib/projects';
import { caseEvidence } from '@/lib/case-evidence';
import { covers } from '@/lib/covers';
import { cvUrl } from '@/lib/site';
import { MoreWork } from '@/components/more-work';
import { Education } from '@/components/education';
import { RibbonGlow } from '@/components/ribbon-glow';
import { ActionLink } from '@/components/action-link';
import { Cover } from '@/components/cover';
import { RevealObserver } from '@/components/reveal';
import { SiteHeader } from '@/components/site-header';

const tr = (lang: Lang, en: string, pt: string) => (lang === 'pt' ? pt : en);
const path = (lang: Lang) => (lang === 'pt' ? '/pt' : '');
const EMAIL = 'otavio.fr1@gmail.com';

export function Header({ lang, slug }: { lang: Lang; slug?: string }) {
  return <>
    {lang === 'pt' && <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang='pt-BR'" }} />}
    <a className="skip-link" href="#main">{tr(lang, 'Skip to content', 'Pular para o conteúdo')}</a>
    <SiteHeader lang={lang} slug={slug} />
  </>;
}

export function Footer({ lang }: { lang: Lang }) {
  const base = path(lang);
  return <footer id="contact" className="foot">
    <div className="grid foot-cta ruled" data-reveal="">
      <p className="label">{tr(lang, 'Contact', 'Contato')}</p>
      <a className="foot-mail" href={`mailto:${EMAIL}`}>{tr(lang, 'Have something in mind?', 'Tem algo em mente?')}<span>{EMAIL}</span></a>
    </div>
    <div className="grid foot-cols">
      <p className="foot-name">Otávio Ramos</p>
      <nav className="foot-list" aria-label={tr(lang, 'Site map', 'Mapa do site')}>
        <p className="label">{tr(lang, 'Site', 'Site')}</p>
        <a href={base + '/#work'}>{tr(lang, 'Selected work', 'Projetos')}</a>
        <a href={base + '/#more-work'}>{tr(lang, 'More work', 'Outros projetos')}</a>
        <a href={base + '/#about'}>{tr(lang, 'About', 'Sobre')}</a>
      </nav>
      <div className="foot-list foot-social">
        <p className="label">{tr(lang, 'Elsewhere', 'Em outros lugares')}</p>
        <a href="https://www.linkedin.com/in/otaviofr/">LinkedIn</a>
        <a href="https://github.com/otavioframos">GitHub</a>
        {cvUrl && <a href={cvUrl}>{tr(lang, 'Résumé (PDF)', 'Currículo (PDF)')}</a>}
      </div>
    </div>
    <div className="grid foot-base">
      <p>© 2026 Otávio Ramos</p>
      <p className="foot-place">{tr(lang, 'Campinas, Brazil · GMT−3', 'Campinas, Brasil · GMT−3')}</p>
      <a className="foot-top" href={base + '/#main'}>{tr(lang, 'Back to top ↑', 'Voltar ao topo ↑')}</a>
    </div>
  </footer>;
}

export function Portfolio({ lang }: { lang: Lang }) {
  const base = path(lang);
  return <div className="page" lang={lang === 'pt' ? 'pt-BR' : 'en'}>
    <Header lang={lang} />
    <main id="main">
      <section className="hero">
        <RibbonGlow className="hero-field" />
        <div className="grid hero-grid">
          <div className="hero-id">
            <p className="hero-tag">FOUNDING PRODUCT DESIGNER</p>
            <h1>Otávio Ramos.</h1>
          </div>
          <div className="hero-copy">
            <p className="hero-lead">{tr(lang, 'Building the design practice at A3Lab. Consumer apps and internal tools, designed and shipped with AI and code.', 'Estruturando a prática de design na A3Lab. Apps B2C e ferramentas internas, desenhados e colocados no ar com IA e código.')}</p>
            <div className="hero-actions">
              <ActionLink href="#work" label={tr(lang, 'See my work', 'Ver projetos')} />
              <ActionLink href={`mailto:${EMAIL}`} label={tr(lang, 'Get in touch', 'Conversar')} secondary />
            </div>
            <p className="hero-meta">{tr(lang, 'CAMPINAS, BRAZIL · REMOTE-FIRST · GMT−3', 'CAMPINAS, BRASIL · REMOTE-FIRST · GMT−3')}</p>
          </div>
          <a className="hero-scroll" href="#work">{tr(lang, 'Scroll', 'Role')} ↓</a>
        </div>
      </section>

      <section id="work" className="work" aria-labelledby="work-title">
        <div className="grid shead ruled" data-reveal="">
          <h2 id="work-title" className="label">{tr(lang, 'Selected work', 'Projetos selecionados')}</h2>
          <p className="shead-note">{tr(lang, 'Consumer apps and internal tools where I owned the design direction.', 'Apps B2C e ferramentas internas em que conduzi a direção de design.')}</p>
          <p className="shead-meta label">({String(projects.length).padStart(2, '0')})</p>
        </div>
        {projects.map((p, i) => {
          const c = p[lang];
          const spec = covers[p.slug];
          const href = base + '/work/' + p.slug;
          return <article className="work-item" key={p.slug}>
            <Cover spec={spec} alt={c.caption} name={p.name} kind={spec.kind?.[lang] ?? c.category} meta={c.status} href={href} priority={i === 0} />
            <div className="grid work-overview">
              <p className="work-index label">{String(i + 1).padStart(2, '0')}</p>
              <p className="work-summary">{caseEvidence[p.slug]?.[lang]?.headline ?? c.summary}</p>
              <a className="work-open" href={href} aria-label={tr(lang, `View case: ${p.name}`, `Ver case: ${p.name}`)}>{tr(lang, 'View case', 'Ver case')} →</a>
            </div>
          </article>;
        })}
      </section>

      <MoreWork lang={lang} />

      <section id="about" className="about" aria-labelledby="about-title">
        <div className="grid block ruled about-top" data-reveal="">
          <h2 id="about-title" className="label">{tr(lang, 'About', 'Sobre')}</h2>
          <p className="about-statement">{tr(lang, 'Making things that are easy to understand and useful in everyday life.', 'Fazer coisas fáceis de entender e úteis no dia a dia.')}</p>
          <figure className="about-portrait"><img src="/images/otavio-portrait.webp" alt="Otávio Ramos" width="800" height="1000" loading="lazy" decoding="async" /></figure>
          <div className="about-text">
            <p>{tr(lang, 'I’m the founding product designer at A3Lab, A3Media’s consumer-app studio. I joined at its launch and remain the only designer on the team. My work includes the brand, our first two apps, and internal tools.', 'Sou Founding Product Designer na A3Lab, estúdio de apps B2C da A3Media. Entrei na criação do estúdio e continuo sendo o único designer do time. Trabalho na marca, nos dois primeiros apps e em ferramentas internas.')}</p>
            <p>{tr(lang, 'My background in UX/UI and acquisition connects how people discover a product with what happens when they use it. I also helped establish the team’s work-management process using Linear, Notion, Codex, and Fireflies.ai.', 'Minha experiência em UX/UI e aquisição conecta como as pessoas descobrem um produto ao que acontece quando o utilizam. Também ajudei a estruturar a gestão de tarefas do time com Linear, Notion, Codex e Fireflies.ai.')}</p>
            <p>{tr(lang, 'I’m studying Systems Analysis and Development at FIAP, bringing a deeper technical understanding into my design practice. Comfortable working in English; open to discussing international opportunities.', 'Curso Análise e Desenvolvimento de Sistemas na FIAP para aprofundar minha compreensão técnica. Tenho facilidade para trabalhar em inglês e interesse em oportunidades internacionais.')}</p>
            <p>{tr(lang, 'Outside product work, I like experimenting with motion, creative coding, and GSAP. This site is one place to try those ideas.', 'Além do trabalho com produto, gosto de experimentar com movimento, creative coding e GSAP. Este site é um lugar para testar essas ideias.')}</p>
            <a className="inline-link" href="https://www.linkedin.com/in/otaviofr/">{tr(lang, 'Experience & background', 'Experiência e formação')} ↗</a>
          </div>
        </div>
        <div className="grid block ruled" data-reveal="">
          <h3 className="label">{tr(lang, 'How I work', 'Como trabalho')}</h3>
          <dl className="rows">
            <div className="row"><dt>{tr(lang, 'Ownership', 'Responsabilidade')}</dt><dd>{tr(lang, 'Brand, product, and the connections between them.', 'Marca, produto e as conexões entre eles.')}</dd></div>
            <div className="row"><dt>{tr(lang, 'Collaboration', 'Colaboração')}</dt><dd>{tr(lang, 'Work through the details with development.', 'Resolver os detalhes junto a desenvolvimento.')}</dd></div>
            <div className="row"><dt>{tr(lang, 'Building', 'Construção')}</dt><dd>{tr(lang, 'Take an idea beyond the prototype.', 'Levar uma ideia além do protótipo.')}</dd></div>
            <div className="row"><dt>{tr(lang, 'Off the clock', 'Além do trabalho')}</dt><dd>{tr(lang, 'Coffee, creative coding, and the occasional late night in Figma.', 'Café, creative coding e uma ou outra noite até tarde no Figma.')}</dd></div>
          </dl>
        </div>
        <Education lang={lang} />
      </section>
    </main>
    <Footer lang={lang} />
    <RevealObserver />
  </div>;
}

export function CaseStudy({ slug, lang }: { slug: string; lang: Lang }) {
  const p = projects.find(item => item.slug === slug);
  if (!p) return null;
  const c = p[lang];
  const spec = covers[slug];
  const ev = caseEvidence[slug]?.[lang];
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const base = path(lang);
  const extraSize = p.slug === 'mindyoung' ? [512, 512] : p.slug === 'avela' ? [1920, 1080] : [1440, 1024];
  const facts: [string, string][] = [
    [tr(lang, 'Role', 'Papel'), c.role],
    ...(ev?.facts?.team ? [[tr(lang, 'Team', 'Time'), ev.facts.team] as [string, string]] : []),
    ...(ev?.facts?.timeline ? [[tr(lang, 'Timeline', 'Duração'), ev.facts.timeline] as [string, string]] : []),
    [tr(lang, 'Scope', 'Escopo'), c.scope],
    ...(ev?.facts?.platform ? [[tr(lang, 'Platform', 'Plataforma'), ev.facts.platform] as [string, string]] : []),
    ['Status', c.status],
  ];
  return <div className="page" lang={lang === 'pt' ? 'pt-BR' : 'en'}>
    <Header lang={lang} slug={slug} />
    <main id="main" className="case">
      <Cover spec={spec} alt={c.caption} name={p.name} kind={spec.kind?.[lang] ?? c.category} meta={ev?.period ?? '2026'} priority nameAs="p" />
      <div className="grid case-head">
        <div className="case-title">
          <a className="case-back" href={base + '/#work'}>← {tr(lang, 'Selected work', 'Projetos selecionados')}</a>
          <h1>{p.name}</h1>
          <p className="case-sub">{c.title}</p>
        </div>
        <dl className="case-facts">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        <p className="case-caption">{c.caption}</p>
      </div>

      <section className="grid block ruled" data-reveal="">
        <h2 className="label">{tr(lang, 'Context', 'Contexto')}</h2>
        <div className="prose">
          <p className="lead">{c.lead}</p>
          <div className="decision"><h3 className="label">{tr(lang, 'A key decision', 'Uma decisão importante')}</h3><p>{c.decision}</p></div>
        </div>
      </section>

      {c.sections.map((s, i) => <Fragment key={s.label}>
        <section className="grid block ruled" data-reveal="">
          <p className="label">{s.label}</p>
          <div className="prose">
            <h2>{s.title}</h2>
            <p>{s.body}</p>
            {'points' in s && <ul>{s.points.map(point => <li key={point}>{point}</li>)}</ul>}
          </div>
        </section>
        {i === 1 && <figure className="grid case-figure" data-reveal="">
          <div className="case-figure-media" style={{ background: spec.extraField ?? spec.field }}>
            <img src={p.extra} alt={c.extraCaption} width={extraSize[0]} height={extraSize[1]} loading="lazy" decoding="async" />
          </div>
          <figcaption>{c.extraCaption}</figcaption>
        </figure>}
      </Fragment>)}

      <section className="grid block ruled" data-reveal="">
        <h2 className="label">{tr(lang, 'Where it stands', 'Onde chegou')}</h2>
        <div className="prose">
          {ev?.results && ev.results.length > 0 && <dl className="case-results">{ev.results.map(r => <div key={r.label}><dt>{r.value}</dt><dd>{r.label}{r.note && <small>{r.note}</small>}</dd></div>)}</dl>}
          <p className="lead">{c.outcome}</p>
          {ev?.learnings && ev.learnings.length > 0 && <div className="case-list"><h3 className="label">{tr(lang, 'What I learned', 'O que aprendi')}</h3><ul>{ev.learnings.map(l => <li key={l}>{l}</li>)}</ul></div>}
          {ev?.next && <div className="case-list"><h3 className="label">{tr(lang, 'Next steps', 'Próximos passos')}</h3><p>{ev.next}</p></div>}
          {p.url && <a className="inline-link" href={p.url}>{tr(lang, 'Visit the product', 'Visitar o produto')} ↗</a>}
        </div>
      </section>

      <a className="grid next ruled" href={base + '/work/' + next.slug}>
        <span className="label">{tr(lang, 'Next project', 'Próximo projeto')}</span>
        <span className="next-name">{next.name}</span>
        <span className="next-arrow" aria-hidden="true">→</span>
      </a>
    </main>
    <Footer lang={lang} />
    <RevealObserver />
  </div>;
}
