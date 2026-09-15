import { CaseStudy } from '@/components/portfolio';
import { ProjectNote } from '@/components/project-note';
import { projects } from '@/lib/projects';
import { moreProjects } from '@/lib/more-projects';
import { notFound } from 'next/navigation';
const allProjects = [...projects, ...moreProjects];
export function generateStaticParams() { return allProjects.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = allProjects.find(p => p.slug === slug);
  return { title: p ? p.name + ' — Otávio Ramos' : 'Project not found', description: p ? ('summary' in p.pt ? p.pt.summary : p.pt.contribution) : undefined };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = moreProjects.find(p => p.slug === slug);
  if (note) return <ProjectNote project={note} lang="pt"/>;
  if (!projects.some(p => p.slug === slug)) notFound();
  return <CaseStudy slug={slug} lang="pt"/>;
}
