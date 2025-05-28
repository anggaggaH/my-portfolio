/* eslint-disable @typescript-eslint/no-explicit-any */
import ProjectDetailClientPage from './page.client';
import { getProject } from '@/hooks/sanity/projectQuery';

export default async function ProjectDetailPage({ params }: { params: { slug: any } }) {
	const project: any = await getProject({
		slug: params.slug,
	});
	return <ProjectDetailClientPage project={project} />;
}
