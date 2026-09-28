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
 * A full-bleed project cover: one image or muted loop on a plain field, with a
 * single label row (name, kind, meta) that holds the middle of the screen while
 * the cover scrolls past, then slips under its edge.
 */
export function Cover({ spec, alt, name, kind, meta, href, priority = false, nameAs = 'h2' }: CoverProps) {
  const Name = nameAs;
  const style = { '--field': spec.field, '--ink': spec.ink } as CSSProperties;
  const className = `cover cover-${spec.fit}${href ? ' cover-link' : ''}`;
  const frame = spec.frame ? 'true' : undefined;
  const media = spec.video
    // Playback is started by RevealObserver only while the cover is on screen.
    ? <video src={spec.video} poster={spec.image} width={spec.width} height={spec.height} muted loop playsInline preload="none" aria-label={alt} data-autoplay="" data-frame={frame} />
    : <img src={spec.image} alt={alt} width={spec.width} height={spec.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" data-frame={frame} />;
  const body = <>
    <div className="cover-media">{media}</div>
    <div className="cover-track">
      <div className="grid cover-label">
        <Name className="cover-name" data-reveal="">{name}</Name>
        <span className="cover-kind">{kind}</span>
        <span className="cover-meta">{meta}</span>
      </div>
    </div>
  </>;
  return href
    ? <a className={className} style={style} href={href} data-reveal="">{body}</a>
    : <div className={className} style={style} data-reveal="">{body}</div>;
}
