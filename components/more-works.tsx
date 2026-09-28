import type { CSSProperties } from 'react';
import { projects, type Lang } from '@/lib/projects';
import { moreProjects } from '@/lib/more-projects';
import { covers } from '@/lib/covers';
import { CoverArt } from '@/components/cover-art';

type Item = { slug: string; name: string; kind: string; meta: string };

/** Three small covers that close every case page, continuing from the current one. */
export function MoreWorks({ current, lang }: { current: string; lang: Lang }) {
  const pt = lang === 'pt';
  const all: Item[] = [
    ...projects.map(p => ({ slug: p.slug, name: p.name, kind: covers[p.slug].kind?.[lang] ?? p[lang].category, meta: p[lang].status })),
    ...moreProjects.filter(p => !p.hidden).map(p => ({ slug: p.slug, name: p.name, kind: p[lang].category, meta: p.year })),
  ];
  const at = all.findIndex(item => item.slug === current);
  const picks = [1, 2, 3].map(step => all[(at + step) % all.length]);
  return <section className="mw" aria-labelledby="more-works-title">
    <div className="grid mw-head"><h2 id="more-works-title" data-reveal="">{pt ? 'Mais projetos' : 'More works'}</h2></div>
    <ul className="grid mw-list">
      {picks.map(item => {
        const spec = covers[item.slug];
        return <li key={item.slug} className="mw-card">
          <a href={(pt ? '/pt' : '') + '/work/' + item.slug} aria-label={item.name}>
            <div className={`mw-media ${spec.art ? 'cover-art' : 'cover-' + spec.fit}`} style={{ '--field': spec.field } as CSSProperties}>
              {spec.art ? <CoverArt slug={item.slug} /> : <img src={spec.image} alt="" width={spec.width} height={spec.height} loading="lazy" decoding="async" data-frame={spec.frame ? 'true' : undefined} />}
            </div>
            <div className="mw-row"><span className="mw-name">{item.name}</span><span className="mw-kind">{item.kind}</span></div>
          </a>
        </li>;
      })}
    </ul>
  </section>;
}
