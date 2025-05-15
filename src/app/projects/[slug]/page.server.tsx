import { client } from '@/lib/sanity';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const query = `*[_type == "project" && slug.current == "${params.slug}"][0]{title, overview}`;
	const res = await client.fetch(query);
	const project = res.data.result;

	if (!project) {
		return {
			title: 'Project Not Found',
		};
	}

	return {
		title: `Angga Hermawan | Project: ${project.title}`,
		description: project.overview,
	};
}
