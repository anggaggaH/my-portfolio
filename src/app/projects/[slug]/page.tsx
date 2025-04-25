/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

import { useProject } from '@/hooks/useProject';


export default function ProjectDetailPage() {
	const params = useParams();
	const slug = params.slug as string;

	const { data: project, isLoading } = useProject(slug);

	if (isLoading) {
		return <div className='p-8'>Loading...</div>;
	}

	if (!project) {
		return notFound();
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='max-w-5xl mx-auto p-8 space-y-8'
		>
			<h1 className='text-4xl font-bold'>{project.title}</h1>
			{project.mainImage && (
				<Image src={project.mainImage.asset.url} alt={project.title} width={800} height={400} className='rounded-lg object-cover' />
			)}
			<div className='space-y-4'>
				<div>
					<h2 className='text-2xl font-semibold'>Overview</h2>
					<p>{project.overview}</p>
				</div>
				<div>
					<h2 className='text-2xl font-semibold'>Problem</h2>
					<p>{project.problem}</p>
				</div>
				<div>
					<h2 className='text-2xl font-semibold'>Solution</h2>
					<p>{project.solution}</p>
				</div>
				<div>
					<h2 className='text-2xl font-semibold'>Technologies Used</h2>
					<ul className='list-disc ml-6'>
						{project.technologies.map((tech: any) => (
							<li key={tech}>{tech}</li>
						))}
					</ul>
				</div>
				<div>
					<h2 className='text-2xl font-semibold'>Result</h2>
					<p>{project.result}</p>
				</div>
				{project.gallery && project.gallery.length > 0 && (
					<div>
						<h2 className='text-2xl font-semibold'>Gallery</h2>
						<div className='grid grid-cols-2 gap-4 mt-4'>
							{project.gallery.map((img: any, idx: any) => (
								<Image
									key={idx}
									src={img.asset.url}
									alt={`Gallery image ${idx + 1}`}
									width={400}
									height={300}
									className='rounded-lg object-cover'
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</motion.div>
	);
}
