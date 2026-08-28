import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: process.env.NEXT_PUBLIC_MODE === 'production',
	perspective: 'published',
});
