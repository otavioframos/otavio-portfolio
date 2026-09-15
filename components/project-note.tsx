import { Header, Footer } from '@/components/portfolio';
import type { MoreProject } from '@/lib/more-projects';
import type { Lang } from '@/lib/projects';

export function ProjectNote({ project, lang }: { project: MoreProject; lang: Lang }) {
  const pt = lang === 'pt';
  const copy = project[lang];
  return <div lang={pt ? 'pt-BR' : 'en'}><Header lang={lang} slug={project.slug} /><main id="main" className="project-note">
    <a className="back-link" href={(pt ? '/pt' : '') + '/#more-work'}>{pt ? '← Outros projetos' : '← More work'}</a>
    <header className="project-note-heading"><p className="eyebrow">{copy.category} / {project.year}</p><h1>{project.name}</h1><p>{copy.contribution}</p></header>
    <figure><img src={project.images[0]} alt={copy.captions[0]} width="1920" height="1080" /><figcaption>{copy.captions[0]}</figcaption></figure>
    <div className="project-note-context"><section><h2>{pt ? 'O projeto' : 'The project'}</h2><p>{copy.context}</p></section><section><h2>{pt ? 'Minha contribuição' : 'My contribution'}</h2><p>{copy.approach}</p></section></div>
    <figure><img src={project.images[1]} alt={copy.captions[1]} width="1920" height="1080" loading="lazy" /><figcaption>{copy.captions[1]}</figcaption></figure>
    <a className="text-link project-note-source" href={project.source}>{pt ? 'Ver case original' : 'Original case study (Portuguese)'} ↗</a>

  </main><Footer lang={lang}/></div>;
}
