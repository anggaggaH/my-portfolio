 
import { notFound } from 'next/navigation';
import ProjectDetailClientPage from './page.client';
import { getProject } from '@/hooks/sanity/projectQuery';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
	const project = await getProject({
		slug: params.slug,
	});
	if (!project) {
    	notFound()
	}
	return <ProjectDetailClientPage project={project} />;
}
