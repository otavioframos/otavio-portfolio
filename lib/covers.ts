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
  /** Cover drawn and animated in code (components/cover-art.tsx) instead of an image or video. */
  art?: boolean;
  /** Muted loop that replaces the image; `image` must then be its first frame. */
  video?: string;
  /** Case-page gallery, laid out on the 12-column grid by `span`. */
  gallery?: { src: string; width: number; height: number; span: number; field?: string }[];
};

export const covers: Record<string, CoverSpec> = {
  mindyoung: {
    image: '/images/mindyoung-owl.webp', width: 512, height: 512, art: true, fit: 'phone', field: '#BFD0EC', ink: '#0B1640',
    kind: { en: 'Consumer app', pt: 'App B2C' }, extraField: '#BFD0EC',
    gallery: [
      { src: '/images/mindyoung-owl.webp', width: 512, height: 512, span: 5, field: '#BFD0EC' },
      { src: '/images/mindyoung-train.webp', width: 780, height: 1688, span: 7, field: '#DCE6F6' },
    ],
  },
  'content-radar': {
    image: '/images/radar-overview.webp', width: 1440, height: 1024, art: true, fit: 'screen', field: '#0B1640', ink: '#EEF2FF', frame: true,
    kind: { en: 'AI research tool', pt: 'Ferramenta de pesquisa com IA' }, extraField: '#0B1640',
    gallery: [{ src: '/images/radar-detail.webp', width: 1440, height: 1024, span: 12, field: '#0B1640' }],
  },
  vela: {
    image: '/images/vela-cover.webp', width: 1600, height: 1000, fit: 'screen', field: '#0F1F19', ink: '#EEF2FF', extraField: '#0F1F19',
    kind: { en: 'Personal finance app', pt: 'App de finanças pessoais' },
  },
  avela: {
    image: '/images/avela-mark.webp', width: 360, height: 360, art: true, fit: 'screen', field: '#0E1A16', ink: '#EEF2FF',
    kind: { en: 'AI nutrition app', pt: 'App de nutrição com IA' }, extraField: '#E8EDE0',
    gallery: [{ src: '/images/avela-flow.webp', width: 1920, height: 1080, span: 12, field: '#E8EDE0' }],
  },
  'chilli-beans': { image: '/videos/chilli-beans-poster.webp', width: 1600, height: 900, video: '/videos/chilli-beans.mp4', fit: 'screen', field: '#E51D1C', ink: '#FFFFFF', extraField: '#E51D1C' },
  naluu: { image: '/videos/naluu-poster.webp', width: 1600, height: 900, video: '/videos/naluu.mp4', fit: 'screen', field: '#81533E', ink: '#FFFFFF', extraField: '#F4E9D8' },
  homerunpet: { image: '/images/homerun-cover.webp', width: 1600, height: 1361, fit: 'screen', field: '#D9361E', ink: '#FFFFFF', extraField: '#D9361E' },
  precato: { image: '/images/precato-cover.webp', width: 1600, height: 1120, fit: 'screen', field: '#0E2F5A', ink: '#FFFFFF', extraField: '#0E2F5A' },
  wrk: { image: '/videos/wrk-poster.webp', width: 1600, height: 900, video: '/videos/wrk.mp4', fit: 'screen', field: '#171742', ink: '#FFFFFF', extraField: '#171742' },
};
