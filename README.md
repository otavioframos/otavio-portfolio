# otávio ramos — portfolio

Personal portfolio of Otávio Ramos, founding product designer at A3Lab. Live at **[work.otaviofr1.workers.dev](https://work.otaviofr1.workers.dev)**, in English and Portuguese.

I design and build this site myself. It is a small, hand-written React app rather than a template, so the interface studies on it run as real code.

## What's in it

- **Case studies** for MindYoung, Content Radar and Avela, plus shorter notes on earlier e-commerce and web work.
- **Hero field study**: a meadow photo processed at runtime into an ordered-dither texture on Canvas 2D, with an animated tracking overlay driven by GSAP springs. It pauses offscreen, in hidden tabs, with reduced motion, and from its own pause control.
- **Bilingual routing** with `hreflang`, canonical URLs and Open Graph cards for every page.

## Stack

- React 19 server components on vinext (Next.js App Router API on Vite), deployed as a Cloudflare Worker.
- Tailwind CSS 4, GSAP, a few Base UI primitives.
- Type-checked with TypeScript and linted with oxlint; CI runs both before every deploy.

## Run it

```bash
npm ci
npm run dev
```

`npm run build` produces the Worker bundle in `dist/`. Pushes to `main` deploy through GitHub Actions.

Optional environment variables: `NEXT_PUBLIC_SITE_URL` for canonical and social URLs, `NEXT_PUBLIC_INDEXABLE=true` to allow search indexing, and `NEXT_PUBLIC_CV_URL` to show a résumé link.

## Content

Product images come from shipped products and original case studies; captions say when a visual is a design exploration. When a case page shows a number, it comes with its source, time window and sample.

© 2026 Otávio Ramos. Code is shared for reference; images and case-study content are not licensed for reuse.
