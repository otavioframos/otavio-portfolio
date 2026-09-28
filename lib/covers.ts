import type { Lang } from './projects';

/**
 * How each project's cover is staged. Every cover is one image on a plain
 * field: `phone` and `screen` sit centred on the field colour, `bleed` fills the
 * frame. Field colours match each image's own edge so the two read as one.
 */
export type CoverFit = 'phone' | 'screen' | 'bleed';

export type CoverSpec = {
  image: string;
  width: number;
  height: number;
  fit: CoverFit;
  /** Field colour behind the image. */
  field: string;
  /** Text colour for the label row that sits over the cover. */
  ink: string;
  /** Screenshots that need a visible edge get a radius and a shadow. */
  frame?: boolean;
  /** Short, sentence-case kind for the label row. */
  kind?: Record<Lang, string>;
  /** Field colour behind the case study's second image. */
  extraField?: string;
};

export const covers: Record<string, CoverSpec> = {
  mindyoung: {
    image: '/images/mindyoung-train.webp', width: 780, height: 1688, fit: 'phone', field: '#BFD0EC', ink: '#0B1640',
    kind: { en: 'Consumer app', pt: 'App B2C' }, extraField: '#BFD0EC',
  },
  'content-radar': {
    image: '/images/radar-overview.webp', width: 1440, height: 1024, fit: 'screen', field: '#0B1640', ink: '#EEF2FF', frame: true,
    kind: { en: 'AI research tool', pt: 'Ferramenta de pesquisa com IA' }, extraField: '#0B1640',
  },
  avela: {
    image: '/images/avela-cover.webp', width: 1920, height: 1080, fit: 'screen', field: '#0E1A16', ink: '#EEF2FF',
    kind: { en: 'AI nutrition app', pt: 'App de nutrição com IA' }, extraField: '#E8EDE0',
  },
  'chilli-beans': { image: '/images/chilli-cover.webp', width: 1920, height: 1080, fit: 'screen', field: '#E51D1C', ink: '#FFFFFF', extraField: '#E51D1C' },
  naluu: { image: '/images/naluu-cover.webp', width: 1920, height: 1080, fit: 'screen', field: '#81533E', ink: '#FFFFFF', extraField: '#F4E9D8' },
  wrk: { image: '/images/wrk-cover.webp', width: 1920, height: 1080, fit: 'screen', field: '#171742', ink: '#FFFFFF', extraField: '#171742' },
};
