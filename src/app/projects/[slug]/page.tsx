import { notFound } from 'next/navigation';
import ProjectDetailClientPage from './page.client';
import { getProject } from '@/hooks/sanity/projectQuery';

type PageParams = {
	params: { slug: string };
};

export async function generateMetadata({ params }: PageParams) {
	const project = await getProject({ slug: params.slug });

	if (!project) return { title: 'Project Not Found' };

	return {
		title: `${project.title} – Projects | Angga Hermawan`,
		description: project.overview || `Details about the ${project.title} project.`,
		openGraph: {
			title: project.title,
			description: project.overview,
			images: project.mainImage.asset.url ? [project.mainImage.asset.url] : [],
		},
		twitter: {
			card: 'summary_large_image',
			title: project.title,
			description: project.overview,
			images: project.mainImage.asset.url ? [project.mainImage.asset.url] : [],
		},
	};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const project = await getProject({ slug: slug });

	if (!project) {
		notFound();
	}

	return <ProjectDetailClientPage project={project} />;
}
