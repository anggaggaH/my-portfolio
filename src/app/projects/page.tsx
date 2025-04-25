'use client';

import { useProjects } from '@/hooks/useProjects';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
	const { data: projects, isLoading, error } = useProjects({ sort: 'desc' });

	if (isLoading) return <div className='p-8'>Loading...</div>;
	if (error) return <div className='p-8'>Something went wrong!</div>;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
		>
			{projects?.map((project) => (
				<Link
					key={project._id}
					href={`/projects/${project.slug.current}`}
					className='border rounded-xl overflow-hidden shadow-md hover:scale-105 transition'
				>
					{project.mainImage && (
						<Image src={project.mainImage.asset.url} alt={project.title} width={500} height={300} className='w-full h-48 object-cover' />
					)}
					<div className='p-4'>
						<h2 className='text-xl font-bold'>{project.title}</h2>
						<p className='text-sm mt-2'>{project.overview}</p>
					</div>
				</Link>
			))}
		</motion.div>
	);
}
