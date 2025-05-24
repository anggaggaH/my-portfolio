/* eslint-disable @typescript-eslint/no-explicit-any */
export type Project = {
	_id: string;
	title: string;
	slug: { current: string };
	overview: string;
	technologies: string[];
	features: string[];
	mainImage?: any;
	location: string;
	problem: string;
	solution: string;
	gallery: any[];
	result: string;
};
