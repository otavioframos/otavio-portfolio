import { moreProjects } from '@/lib/more-projects';
import type { Lang } from '@/lib/projects';
import { CompactWorkList } from '@/components/selected-work';

export function MoreWork({ lang }: { lang: Lang }) {
  const pt = lang === 'pt';
  return <section id="more-work" className="more-work" aria-labelledby="more-work-heading">
    <div className="more-work-heading"><h2 id="more-work-heading">{pt ? 'Outros projetos' : 'More work'}</h2><p>{pt ? 'E-commerce e experiências para a web.' : 'E-commerce and web experiences.'}</p></div>
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
