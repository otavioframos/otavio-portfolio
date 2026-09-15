import { moreProjects } from '@/lib/more-projects';
import type { Lang } from '@/lib/projects';

export function MoreWork({ lang }: { lang: Lang }) {
  const pt = lang === 'pt';
  return <section id="more-work" className="more-work" aria-labelledby="more-work-heading">
    <div className="more-work-heading"><h2 id="more-work-heading">{pt ? 'Outros projetos' : 'More work'}</h2><p>{pt ? 'E-commerce e experiências para a web.' : 'E-commerce and web experiences.'}</p></div>
    <div className="more-work-grid">{moreProjects.map(project => <article className="more-work-card" key={project.slug}>
      <a href={(pt ? '/pt' : '') + '/work/' + project.slug}>
        <div className="more-work-image"><img src={project.images[0]} width="1920" height="1080" loading="lazy" decoding="async" alt={project[lang].captions[0]} /></div>
        <div className="more-work-meta"><span>{project[lang].category}</span><span>{project.year}</span></div>
        <h3>{project.name}<span aria-hidden="true">↗</span></h3>
        <p>{project[lang].contribution}</p>
      </a>
    </article>)}</div>
  </section>;
}
