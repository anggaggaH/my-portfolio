import { client } from '@/lib/sanity';
import { Project } from '@/types/project';

export async function getProject({
	slug,
}: {
	slug?: string;
} = {}): Promise<Project | null> {
	const query = `*[_type == "project" && slug.current == "${slug}"][0]{
        title, overview, problem, solution, technologies, result,
        mainImage{asset->{url}},
        gallery[]{asset->{url}}
      }`;

	return client.fetch(
		query,
		{},
		{
			cache: 'force-cache',
			next: { tags: [`project-${slug}`] },
		}
	);
}
