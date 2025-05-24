import { getProjects } from '@/hooks/sanity/projectQueries';
import { FeaturedProjectsClient } from './FeaturedProjects.client';

export async function FeaturedProjects() {
	const projects = await getProjects({
		favoriteOnly: true,
		limit: 4,
		sort: 'desc',
	});

	return <FeaturedProjectsClient projects={projects} />;
}
