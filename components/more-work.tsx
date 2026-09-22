import { moreProjects } from '@/lib/more-projects';
import type { Lang } from '@/lib/projects';
import { CompactWorkList } from '@/components/selected-work';

export function MoreWork({ lang }: { lang: Lang }) {
  const pt = lang === 'pt';
  return <section id="more-work" className="more-work" aria-labelledby="more-work-heading">
    <div className="more-work-heading"><h2 id="more-work-heading">{pt ? 'Outros projetos' : 'More work'}</h2><p>{pt ? 'Projetos pessoais, e-commerce e web.' : 'Personal projects, e-commerce, and web.'}</p></div>
    <a className="compact-work-row" href="https://otavioframos.github.io/aeon/" aria-labelledby="vela-title">
      <div className="compact-work-identity"><p>{pt ? 'Finanças pessoais · Design e desenvolvimento' : 'Personal finance · Design & development'}</p><h3 id="vela-title">Vela</h3></div>
      <p className="compact-work-summary">{pt ? 'App de planejamento financeiro que desenhei e desenvolvi sozinho para uso pessoal.' : 'A financial-planning app I designed and built solo for personal use.'}</p>
      <span className="compact-work-action"><span className="compact-work-status">{pt ? 'Projeto pessoal' : 'Personal project'}</span><span className="compact-work-open"><span>{pt ? 'Abrir app' : 'Open app'}</span><span aria-hidden="true">↗</span></span></span>
    </a>
    <CompactWorkList label={pt ? 'Ver projeto' : 'View project'} items={moreProjects.map(project => ({
      slug: project.slug,
      name: project.name,
      category: project[lang].category,
      summary: project[lang].contribution,
      status: project.year,
      image: project.images[0],
      href: (pt ? '/pt' : '') + '/work/' + project.slug,
    }))}/>
  </section>;
}
