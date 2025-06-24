import { ProjectsClient } from '@/components/Projects.client';
import { getProjects } from '@/hooks/sanity/projectQueries';

export const metadata = {
	title: 'Projects',
	description:
		'A showcase of selected projects by Angga Hermawan, highlighting his work in web development across various industries and technologies.',
	keywords: ['Web Projects', 'Portfolio', 'Web Developer', 'Web Development', 'Frontend Developer', 'Angga Hermawan'],
	openGraph: {
		title: 'Projects - Angga Hermawan',
		description:
			'A showcase of selected projects by Angga Hermawan, highlighting his work in web development across various industries and technologies.',
		url: 'https://anggahermawan.com/projects',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Projects - Angga Hermawan',
		description:
			'A showcase of selected projects by Angga Hermawan, highlighting his work in web development across various industries and technologies.',
	},
};

export default async function ProjectsPage() {
	const projects = await getProjects({
		sort: 'desc',
	});

	return <ProjectsClient projects={projects} />;
}
