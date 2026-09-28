import { CaseStudy } from '@/components/portfolio';
import { ProjectNote } from '@/components/project-note';
import { projects } from '@/lib/projects';
import { moreProjects } from '@/lib/more-projects';
import { notFound } from 'next/navigation';
import { alternatesFor } from '@/lib/site';
const allProjects = [...projects, ...moreProjects];
export function generateStaticParams() { return allProjects.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = allProjects.find(p => p.slug === slug);
  const title = p ? p.name + ' | Otávio Ramos' : 'Project not found';
  const description = p ? ('summary' in p.en ? p.en.summary : p.en.contribution) : undefined;
  return { title, description, alternates: alternatesFor('/work/' + slug), openGraph: { title, description, url: alternatesFor('/work/' + slug).canonical, images: p ? [{ url: 'image' in p ? p.image : p.images[0] }] : undefined } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = moreProjects.find(p => p.slug === slug);
  if (note) return <ProjectNote project={note} lang="en"/>;
  if (!projects.some(p => p.slug === slug)) notFound();
  return <CaseStudy slug={slug} lang="en"/>;
}
