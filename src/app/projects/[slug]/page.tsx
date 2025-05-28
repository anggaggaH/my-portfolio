import { notFound } from 'next/navigation';
import ProjectDetailClientPage from './page.client';
import { getProject } from '@/hooks/sanity/projectQuery';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const project = await getProject({ slug: slug });

	if (!project) {
		notFound();
	}

	return <ProjectDetailClientPage project={project} />;
}
