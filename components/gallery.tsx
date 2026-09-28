import type { CoverSpec } from '@/lib/covers';

/** Case imagery on the 12-column grid; each item spans the columns it asks for. */
export function Gallery({ items, caption }: { items: NonNullable<CoverSpec['gallery']>; caption: string }) {
  return <figure className="grid gallery">
    {items.map(item => <div key={item.src} className="gallery-item" style={{ gridColumn: `span ${item.span}`, background: item.field }} data-reveal="">
      <img src={item.src} alt="" width={item.width} height={item.height} loading="lazy" decoding="async" />
    </div>)}
    <figcaption>{caption}</figcaption>
  </figure>;
}
