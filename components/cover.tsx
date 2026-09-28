import type { CSSProperties } from 'react';
import type { CoverSpec } from '@/lib/covers';

type CoverProps = {
  spec: CoverSpec;
  alt: string;
  name: string;
  kind: string;
  meta: string;
  /** When set, the whole cover links to the case study. */
  href?: string;
  /** First cover on a page loads eagerly. */
  priority?: boolean;
  /** Heading level for the project name; case pages already have an h1. */
  nameAs?: 'h2' | 'h3' | 'p';
};

/**
 * A full-bleed project cover: one image on a plain field, with a single label
 * row (name, kind, meta) that holds the middle of the screen while it scrolls.
 */
export function Cover({ spec, alt, name, kind, meta, href, priority = false, nameAs = 'h2' }: CoverProps) {
  const Name = nameAs;
  const style = { '--field': spec.field, '--ink': spec.ink } as CSSProperties;
  const className = `cover cover-${spec.fit}${href ? ' cover-link' : ''}`;
  const body = <>
    <div className="cover-media">
      <img src={spec.image} alt={alt} width={spec.width} height={spec.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" data-frame={spec.frame ? 'true' : undefined} />
    </div>
    <div className="cover-track">
      <div className="grid cover-label">
        <Name className="cover-name">{name}</Name>
        <span className="cover-kind">{kind}</span>
        <span className="cover-meta">{meta}</span>
      </div>
    </div>
  </>;
  return href
    ? <a className={className} style={style} href={href} data-reveal="">{body}</a>
    : <div className={className} style={style} data-reveal="">{body}</div>;
}
