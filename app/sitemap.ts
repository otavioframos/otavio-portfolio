import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { moreProjects } from '@/lib/more-projects';
import { siteUrl } from '@/lib/site';

/** Every page in both languages, with hreflang pairs. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...[...projects, ...moreProjects.filter(p => !p.hidden)].map(p => '/work/' + p.slug)];
  return paths.map(path => {
    const pt = '/pt' + (path === '/' ? '' : path);
    return { url: siteUrl + path, changeFrequency: 'monthly', priority: path === '/' ? 1 : 0.8, alternates: { languages: { en: siteUrl + path, 'pt-BR': siteUrl + pt } } };
  });
}
