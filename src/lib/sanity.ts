// import axios from 'axios';

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
// const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

// const client = axios.create({
//   // baseURL: process.env.NEXT_PUBLIC_SANITY_PROJECT_URL, // we’ll store it in .env
//   baseURL: `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}`,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default client;

import { createClient } from '@sanity/client';

export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
	useCdn: process.env.NEXT_PUBLIC_MODE === 'production', // CDN for production
	perspective: 'published',
});
