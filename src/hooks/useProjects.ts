
import { useQuery } from '@tanstack/react-query';
import { Project } from '@/types/project';
import { client } from '@/lib/sanity';

type UseProjectsParams = {
  favoriteOnly?: boolean;
  limit?: number;
  sort?: 'asc' | 'desc';
};

export const useProjects = ({ favoriteOnly, limit, sort = 'desc' }: UseProjectsParams = {}) => {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const conditions = [`_type == "project"`];
      if (favoriteOnly) conditions.push(`favorite == true`);

      // const filter = conditions.join(' && ');
      // const ordering = `| order(date ${sort})`;
      // const limitRange = limit ? `[0...${limit}]` : ``;

      // const query = encodeURIComponent(`*[${filter}] ${ordering} ${limitRange} {_id, title, slug, overview, technologies, features, location, mainImage{asset->{url}}}`);
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

      const response = await client.fetch(query);
      return response;
    },
  });
};
