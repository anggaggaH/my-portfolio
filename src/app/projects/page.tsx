import { ProjectsClient } from '@/components/Projects.client';
import { getProjects } from '@/hooks/sanity/projectQueries';

export default async function ProjectsPage() {
	const projects = await getProjects({
		sort: 'desc',
	});

	return <ProjectsClient projects={projects} />;
}
