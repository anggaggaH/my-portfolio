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

export const useProjects = () => {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const query = encodeURIComponent(`*[_type == "project"]{_id, title, slug, overview, technologies, mainImage{asset->{url}}}`);
      const url = `?query=${query}&perspective=published`;
      const response = await client.get(url);
      return response.data.result;
    },
  });
};
