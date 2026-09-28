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
import { ScrollWords } from '@/components/scroll-words';
import { MoreWorks } from '@/components/more-works';
import { Gallery } from '@/components/gallery';
import { MindYoungSystem, MindYoungFunnel, MindYoungTests } from '@/components/mindyoung';
import { RadarEvolution, RadarCluster, RadarCard } from '@/components/radar';
import { AvelaMatrix, AvelaQuiz, AvelaOnboarding, AvelaSystem } from '@/components/avela';
import { VelaPrinciples, VelaJobs, VelaMetric } from '@/components/vela';
import { OwnershipDiagram, CollaborationDiagram, BuildingDiagram, OffClockDiagram } from '@/components/diagrams';

const tr = (lang: Lang, en: string, pt: string) => (lang === 'pt' ? pt : en);
const path = (lang: Lang) => (lang === 'pt' ? '/pt' : '');
const EMAIL = 'otavio.fr1@gmail.com';

export function Header({ lang, slug, home, progress }: { lang: Lang; slug?: string; home?: boolean; progress?: boolean }) {
  return <>
    {lang === 'pt' && <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang='pt-BR'" }} />}
    <a className="skip-link" href="#main">{tr(lang, 'Skip to content', 'Pular para o conteúdo')}</a>
    <SiteHeader lang={lang} slug={slug} home={home} progress={progress} />
  </>;
}

export function Footer({ lang }: { lang: Lang }) {
  const base = path(lang);
  return <footer id="contact" className="foot">
    <div className="grid foot-cta ruled">
      <p className="label">{tr(lang, 'Contact', 'Contato')}</p>
      <a className="foot-mail" href={`mailto:${EMAIL}`} data-reveal="">{tr(lang, 'Have something in mind?', 'Tem algo em mente?')}<span>{EMAIL}</span></a>
    </div>
    <div className="grid foot-base">
      <p className="foot-copy">© 2026 Otávio Ramos</p>
      <nav className="foot-links" aria-label={tr(lang, 'Elsewhere', 'Em outros lugares')}>
        <a href="https://www.linkedin.com/in/otaviofr/">LinkedIn</a>
        <a href="https://github.com/otavioframos">GitHub</a>
        {cvUrl && <a href={cvUrl}>{tr(lang, 'Résumé', 'Currículo')}</a>}
        <a href={`mailto:${EMAIL}`}>Email</a>
      </nav>
      <a className="foot-top" href={base + '/#main'}>{tr(lang, 'Back to top ↑', 'Voltar ao topo ↑')}</a>
    </div>
  </footer>;
}

export function Portfolio({ lang }: { lang: Lang }) {
  const base = path(lang);
  return <div className="page" lang={lang === 'pt' ? 'pt-BR' : 'en'}>
    <Header lang={lang} home />
    <main id="main">
      <section className="hero">
        <RibbonGlow className="hero-field" />
        <div className="grid hero-grid">
          <div className="hero-id">
            <p className="hero-tag">FOUNDING PRODUCT DESIGNER</p>
            <h1><span className="mask-in">Otávio Ramos</span></h1>
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

      <section id="work" className="work" aria-label={tr(lang, 'Selected work', 'Projetos selecionados')}>
        {projects.map((p, i) => {
          const c = p[lang];
          const spec = covers[p.slug];
          return <Cover key={p.slug} slug={p.slug} spec={spec} alt={c.caption} name={p.name} kind={spec.kind?.[lang] ?? c.category} meta={c.status} href={base + '/work/' + p.slug} priority={i === 0} />;
        })}
      </section>

      <MoreWork lang={lang} />

      <section id="about" className="about" aria-labelledby="about-title">
        <div className="grid block ruled about-top">
          <h2 id="about-title" className="label">{tr(lang, 'My ethos', 'Meu ethos')}</h2>
          <ScrollWords className="about-statement" text={tr(lang, 'Making things that are easy to understand and useful in everyday life.', 'Fazer coisas fáceis de entender e úteis no dia a dia.')} />
          <figure className="about-portrait"><img src="/images/otavio-portrait.webp" alt="Otávio Ramos" width="800" height="1000" loading="lazy" decoding="async" /></figure>
          <div className="about-text">
            <p>{tr(lang, 'I’m the founding product designer at A3Lab, A3Media’s consumer-app studio. I joined at its launch and remain the only designer on the team. My work includes the brand, our first two apps, and internal tools.', 'Sou Founding Product Designer na A3Lab, estúdio de apps B2C da A3Media. Entrei na criação do estúdio e continuo sendo o único designer do time. Trabalho na marca, nos dois primeiros apps e em ferramentas internas.')}</p>
            <details className="about-more">
              <summary><span className="more-closed">{tr(lang, 'Read more', 'Ler mais')}</span><span className="more-open">{tr(lang, 'Read less', 'Ler menos')}</span></summary>
              <div className="about-more-body">
                <p>{tr(lang, 'My background in UX/UI and acquisition connects how people discover a product with what happens when they use it. I also helped establish the team’s work-management process using Linear, Notion, Codex, and Fireflies.ai.', 'Minha experiência em UX/UI e aquisição conecta como as pessoas descobrem um produto ao que acontece quando o utilizam. Também ajudei a estruturar a gestão de tarefas do time com Linear, Notion, Codex e Fireflies.ai.')}</p>
                <p>{tr(lang, 'I’m studying Systems Analysis and Development at FIAP, bringing a deeper technical understanding into my design practice. Comfortable working in English; open to discussing international opportunities.', 'Curso Análise e Desenvolvimento de Sistemas na FIAP para aprofundar minha compreensão técnica. Tenho facilidade para trabalhar em inglês e interesse em oportunidades internacionais.')}</p>
                <p>{tr(lang, 'Outside product work, I like experimenting with motion, creative coding, and GSAP. This site is one place to try those ideas.', 'Além do trabalho com produto, gosto de experimentar com movimento, creative coding e GSAP. Este site é um lugar para testar essas ideias.')}</p>
                <a className="inline-link" href="https://www.linkedin.com/in/otaviofr/">{tr(lang, 'Experience & background', 'Experiência e formação')} ↗</a>
              </div>
            </details>
          </div>
        </div>
        <div className="hw">
          <div className="grid hw-head"><h2 data-reveal="">{tr(lang, 'How I work', 'Como trabalho')}</h2></div>
          <HowIWork lang={lang} />
        </div>
        <Education lang={lang} />
      </section>
    </main>
    <Footer lang={lang} />
    <RevealObserver />
  </div>;
}

function HowIWork({ lang }: { lang: Lang }) {
  const cards = [
    { Art: OwnershipDiagram, t: tr(lang, 'Ownership', 'Responsabilidade'), d: tr(lang, 'Brand, product, and the connections between them.', 'Marca, produto e as conexões entre eles.') },
    { Art: CollaborationDiagram, t: tr(lang, 'Collaboration', 'Colaboração'), d: tr(lang, 'Work through the details with development.', 'Resolver os detalhes junto a desenvolvimento.') },
    { Art: BuildingDiagram, t: tr(lang, 'Building', 'Construção'), d: tr(lang, 'Take an idea beyond the prototype.', 'Levar uma ideia além do protótipo.') },
    { Art: OffClockDiagram, t: tr(lang, 'Off the clock', 'Além do trabalho'), d: tr(lang, 'Coffee, creative coding, and the occasional late night in Figma.', 'Café, creative coding e uma ou outra noite até tarde no Figma.') },
  ];
  const list = <ul className="hw-list">{cards.map(({ Art, t, d }) => <li className="hw-card" key={t}>
    <div className="hw-media"><Art /></div>
    <h3>{t}</h3>
    <p>{d}</p>
  </li>)}</ul>;
  return <section className="marquee hw-scroll" aria-label={tr(lang, 'How I work', 'Como trabalho')}><div className="marquee-set">{list}</div></section>;
}

const FIGURES = { system: MindYoungSystem, funnel: MindYoungFunnel, tests: MindYoungTests, 'radar-evolution': RadarEvolution, 'radar-cluster': RadarCluster, 'radar-card': RadarCard, 'avela-matrix': AvelaMatrix, 'avela-quiz': AvelaQuiz, 'avela-onboarding': AvelaOnboarding, 'avela-system': AvelaSystem, 'vela-principles': VelaPrinciples, 'vela-jobs': VelaJobs, 'vela-metric': VelaMetric };

export function CaseStudy({ slug, lang }: { slug: string; lang: Lang }) {
  const p = projects.find(item => item.slug === slug);
  if (!p) return null;
  const c = p[lang];
  const spec = covers[slug];
  const ev = caseEvidence[slug]?.[lang];
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
    <Header lang={lang} slug={slug} progress />
    <main id="main" className="case">
      <Cover slug={slug} spec={spec} alt={c.caption} name={p.name} kind={spec.kind?.[lang] ?? c.category} meta={ev?.period ?? '2026'} priority nameAs="p" />
      <div className="grid case-head">
        <div className="case-title">
          <a className="case-back" href={base + '/#work'}>← {tr(lang, 'Selected work', 'Projetos selecionados')}</a>
          <h1><span className="mask-in">{p.name}</span></h1>
          <p className="case-sub">{c.title}</p>
        </div>
        <dl className="case-facts">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        <p className="case-caption">{c.caption}</p>
      </div>

      {ev?.headline && <p className="grid case-statement"><span data-reveal="">{ev.headline}</span></p>}

      <section className="grid block ruled">
        <h2 className="label">{tr(lang, 'Context', 'Contexto')}</h2>
        <div className="prose">
          <p className="lead">{c.lead}</p>
          <aside className="decision">
            <div className="decision-card">
              <p className="decision-head">
                <svg className="decision-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 16V9.5a3.5 3.5 0 0 1 3.5-3.5H15" /><path d="M12 3l3 3-3 3" /><circle cx="4" cy="16" r="1.4" /></svg>
                <span>{tr(lang, 'Key decision', 'Decisão-chave')}</span>
              </p>
              <p className="decision-v">{c.decision}</p>
              {'why' in c && <p className="decision-why"><span className="decision-chip">{tr(lang, 'Why', 'Por quê')}</span>{c.why}</p>}
            </div>
          </aside>
        </div>
      </section>

      {c.sections.map((s, i) => <Fragment key={s.label}>
        <section className="grid block ruled">
          <p className="label">{s.label}</p>
          <div className="prose">
            <h2 data-reveal="">{s.title}</h2>
            <p>{s.body}</p>
            {'points' in s && <ul>{s.points.map(point => <li key={point}>{point}</li>)}</ul>}
          </div>
          {'figure' in s && String(s.figure).split(' ').map(key => { const F = FIGURES[key as keyof typeof FIGURES]; return F ? <div className="case-fig" key={key}><F lang={lang} /></div> : null; })}
        </section>
        {i === (slug === 'mindyoung' ? 0 : 1) && <Gallery items={spec.gallery ?? [{ src: p.extra, width: extraSize[0], height: extraSize[1], span: 12, field: spec.extraField }]} caption={c.extraCaption} />}
      </Fragment>)}

      <section className="grid block ruled">
        <h2 className="label">{tr(lang, 'Where it stands', 'Onde chegou')}</h2>
        <div className="prose">
          {ev?.results && ev.results.length > 0 && <dl className="case-results">{ev.results.map(r => <div key={r.label}><dt>{r.value}</dt><dd>{r.label}{r.note && <small>{r.note}</small>}</dd></div>)}</dl>}
          <p className="lead">{c.outcome}</p>
          {ev?.learnings && ev.learnings.length > 0 && <aside className="decision">
            <div className="decision-card">
              <h3 className="decision-head">
                <svg className="decision-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 14.5h5M8 17h4" /><path d="M10 3a5 5 0 0 0-3 9c.6.5 1 1.2 1 2h4c0-.8.4-1.5 1-2a5 5 0 0 0-3-9Z" /></svg>
                <span>{tr(lang, 'What I learned', 'O que aprendi')}</span>
              </h3>
              <ol className="learn-list">{ev.learnings.map((l, i) => <li key={l}><span className="decision-chip">{String(i + 1).padStart(2, '0')}</span><p>{l}</p></li>)}</ol>
            </div>
          </aside>}
          {ev?.next && <div className="case-list"><h3 className="label">{tr(lang, 'Next steps', 'Próximos passos')}</h3><p>{ev.next}</p></div>}
          {p.url && <a className="inline-link" href={p.url}>{tr(lang, 'Visit the product', 'Visitar o produto')} ↗</a>}
        </div>
      </section>

      <MoreWorks current={slug} lang={lang} />
    </main>
    <Footer lang={lang} />
    <RevealObserver />
  </div>;
}
