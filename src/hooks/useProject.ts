'use client';

import { useQuery } from '@tanstack/react-query';
import client from '@/lib/sanity';

export const useProject = (slug: string) => {
	return useQuery({
		queryKey: ['project', slug],
		queryFn: async () => {
			const query = encodeURIComponent(`*[_type == "project" && slug.current == "${slug}"][0]{
        title, overview, problem, solution, technologies, result,
        mainImage{asset->{url}},
        gallery[]{asset->{url}}
      }`);
			const { data } = await client.get(`?query=${query}`);
			return data.result;
		},
	});
};
