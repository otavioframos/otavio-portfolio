import { Header, Footer } from '@/components/portfolio';
import { Cover } from '@/components/cover';
import { RevealObserver } from '@/components/reveal';
import { Gallery } from '@/components/gallery';
import { HomeRunSystem } from '@/components/homerun-system';
import { PrecatoMetrics } from '@/components/precato-metrics';
import { MoreWorks } from '@/components/more-works';
import { covers } from '@/lib/covers';
import type { MoreProject } from '@/lib/more-projects';
import type { Lang } from '@/lib/projects';

export function ProjectNote({ project, lang }: { project: MoreProject; lang: Lang }) {
  const pt = lang === 'pt';
  const copy = project[lang];
  const spec = covers[project.slug];
  return <div className="page" lang={pt ? 'pt-BR' : 'en'}>
    <Header lang={lang} slug={project.slug} progress />
    <main id="main" className="case note">
      <Cover slug={project.slug} spec={spec} alt={copy.captions[0]} name={project.name} kind={copy.category} meta={project.year} priority nameAs="p" />
      <div className="grid case-head">
        <div className="case-title">
          <a className="case-back" href={(pt ? '/pt' : '') + '/#more-work'}>← {pt ? 'Outros projetos' : 'More work'}</a>
          <h1><span className="mask-in">{project.name}</span></h1>
          <p className="case-sub">{copy.contribution}</p>
        </div>
        <dl className="case-facts">
          <div><dt>{pt ? 'Ano' : 'Year'}</dt><dd>{project.year}</dd></div>
          <div><dt>{pt ? 'Área' : 'Area'}</dt><dd>{copy.category}</dd></div>
          <div><dt>{pt ? 'Fonte' : 'Source'}</dt><dd><a className="inline-link" href={project.source}>{pt ? 'Case original' : 'Original case study (Portuguese)'} ↗</a></dd></div>
        </dl>
        <p className="case-caption">{copy.captions[0]}</p>
      </div>
      <section className="grid block ruled">
        <h2 className="label">{pt ? 'O projeto' : 'The project'}</h2>
        <div className="prose"><p className="lead">{copy.context}</p></div>
      </section>
      <section className="grid block ruled">
        <h2 className="label">{pt ? 'Minha contribuição' : 'My contribution'}</h2>
        <div className="prose"><p className="lead">{copy.approach}</p></div>
      </section>
      {copy.results && <section className="grid block ruled">
        <h2 className="label">{pt ? 'Resultado' : 'Outcome'}</h2>
        <div className="prose">
          <dl className="case-results">{copy.results.map(r => <div key={r.label}><dt>{r.value}</dt><dd>{r.label}</dd></div>)}</dl>
          {copy.resultsNote && <p className="note-source">{copy.resultsNote}</p>}
        </div>
      </section>}
      {copy.figure
        ? <div className="grid note-fig">{copy.figure === 'homerun' ? <HomeRunSystem lang={lang} /> : <PrecatoMetrics lang={lang} />}</div>
        : <Gallery items={[{ src: project.images[1], width: 1920, height: 1080, span: 12, field: spec.extraField }]} caption={copy.captions[1]} />}
      <MoreWorks current={project.slug} lang={lang} />
    </main>
    <Footer lang={lang} />
    <RevealObserver />
  </div>;
}
