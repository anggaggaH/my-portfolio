import { client } from '@/lib/sanity';
import { Project } from '@/types/project';

export async function getProjects({
	favoriteOnly,
	limit,
	sort = 'desc',
}: {
	favoriteOnly?: boolean;
	limit?: number;
	sort?: 'asc' | 'desc';
} = {}): Promise<Project[]> {
	const conditions = [`_type == "project"`];
	if (favoriteOnly) conditions.push(`favorite == true`);

	const query = `*[${conditions.join(' && ')}] | order(date ${sort})${limit ? `[0...${limit}]` : ''} {
    _id,
    title,
    slug,
    overview,
    technologies,
    features,
    location,
    mainImage{
      asset->{
        url,
        metadata {
          dimensions
        }
      }
    }
  }`;

	return client.fetch(
		query,
		{},
		{
			cache: 'force-cache',
			next: { tags: ['projects'] }, // For on-demand revalidation
		}
	);
}
