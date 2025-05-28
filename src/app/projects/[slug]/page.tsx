import { notFound } from 'next/navigation';
import ProjectDetailClientPage from './page.client';
import { getProject } from '@/hooks/sanity/projectQuery';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
	const project = await getProject({
		slug: params.slug,
	});
	if (!project) {
		notFound();
	}
	return <ProjectDetailClientPage project={project} />;
}
