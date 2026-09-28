import { moreProjects } from '@/lib/more-projects';
import type { Lang } from '@/lib/projects';

/** Secondary work as a typographic index on the same three-point grid as the covers. */
export function MoreWork({ lang }: { lang: Lang }) {
  const pt = lang === 'pt';
  const rows = [
    { key: 'vela', name: 'Vela', kind: pt ? 'Finanças pessoais · Design e código' : 'Personal finance · Design & code', meta: pt ? 'App no ar' : 'Live app', href: 'https://otavioframos.github.io/aeon/', external: true },
    ...moreProjects.map(project => ({ key: project.slug, name: project.name, kind: project[lang].category, meta: project.year, href: (pt ? '/pt' : '') + '/work/' + project.slug, external: false })),
  ];
  return <section id="more-work" className="more" aria-labelledby="more-work-title">
    <div className="grid shead ruled" data-reveal="">
      <h2 id="more-work-title" className="label">{pt ? 'Outros projetos' : 'More work'}</h2>
      <p className="shead-note">{pt ? 'Projetos pessoais, e-commerce e web.' : 'Personal projects, e-commerce, and web.'}</p>
      <p className="shead-meta label">({String(rows.length).padStart(2, '0')})</p>
    </div>
    <ul className="more-list" data-reveal="">
      {rows.map(row => <li key={row.key}>
        <a className="grid more-row" href={row.href} {...(row.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          <span className="more-name">{row.name}</span>
          <span className="more-kind">{row.kind}</span>
          <span className="more-meta">{row.meta} <span aria-hidden="true">{row.external ? '↗' : '→'}</span></span>
        </a>
      </li>)}
    </ul>
  </section>;
}
