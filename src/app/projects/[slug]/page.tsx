/* eslint-disable @typescript-eslint/no-explicit-any */
import ProjectDetailClientPage from './page.client';
import { getProject } from '@/hooks/sanity/projectQuery';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
	const project: any = await getProject({
		slug: params.slug,
	});
	return <ProjectDetailClientPage project={project} />;
}
