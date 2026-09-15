export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://work.otaviofr1.workers.dev').replace(/\/$/, '');
export const indexable = process.env.NEXT_PUBLIC_INDEXABLE === 'true';
export const alternatesFor = (enPath: string) => ({
  canonical: siteUrl + enPath,
  languages: { en: siteUrl + enPath, 'pt-BR': siteUrl + '/pt' + (enPath === '/' ? '' : enPath), 'x-default': siteUrl + enPath },
});
export const alternatesForPt = (enPath: string) => ({ ...alternatesFor(enPath), canonical: siteUrl + '/pt' + (enPath === '/' ? '' : enPath) });
