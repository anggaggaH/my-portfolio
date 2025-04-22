import { defineField, defineType } from 'sanity';

export const project = defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
		}),
		defineField({
			name: 'overview',
			title: 'Overview',
			type: 'text',
		}),
		defineField({
			name: 'problem',
			title: 'Problem',
			type: 'text',
		}),
		defineField({
			name: 'solution',
			title: 'Solution',
			type: 'text',
		}),
		defineField({
			name: 'technologies',
			title: 'Technologies',
			type: 'array',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'features',
			title: 'Features',
			type: 'array',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'challenges',
			title: 'Challenges',
			type: 'text',
		}),
		defineField({
			name: 'result',
			title: 'Result',
			type: 'text',
		}),
		defineField({
			name: 'projectLink',
			title: 'Project Link',
			type: 'url',
		}),
		defineField({
			name: 'githubLink',
			title: 'GitHub Link',
			type: 'url',
		}),
		defineField({
			name: 'mainImage',
			title: 'Main Image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'gallery',
			title: 'Gallery',
			type: 'array',
			of: [{ type: 'image' }],
		}),
	],
});
