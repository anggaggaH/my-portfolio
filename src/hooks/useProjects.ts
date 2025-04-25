/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import client from '@/lib/sanity';

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  overview: string;
  technologies: string[];
  mainImage?: any;
};

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

      const filter = conditions.join(' && ');
      const ordering = `| order(date ${sort})`;
      const limitRange = limit ? `[0...${limit}]` : ``;

      const query = encodeURIComponent(`*[${filter}] ${ordering} ${limitRange} {_id, title, slug, overview, technologies, mainImage{asset->{url}}}`);

      const url = `?query=${query}&perspective=published`;
      const response = await client.get(url);
      return response.data.result;
    },
  });
};
