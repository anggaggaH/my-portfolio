'use client';

import { useProjects } from '@/hooks/useProjects';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function FeaturedProjects() {
	const { data: projects } = useProjects({ favoriteOnly: true, limit: 3, sort: 'desc' });

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.8, duration: 0.5 }}
			className='w-full max-w-5xl mx-auto'
		>
			<h2 className='text-3xl font-bold mb-8 text-center'>Featured Projects</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{projects?.slice(0, 3).map((project) => (
					<Link
						key={project._id}
						href={`/projects/${project.slug.current}`}
                        className="border rounded-lg overflow-hidden hover:scale-105 hover:shadow-lg transition-transform duration-300"
					>
						{project.mainImage && (
							<Image src={project.mainImage.asset.url} alt={project.title} width={600} height={400} className='w-full h-48 object-cover' />
						)}
						<div className='p-4'>
							<h3 className='text-xl font-bold'>{project.title}</h3>
							<p className='text-sm mt-2'>{project.overview}</p>
						</div>
					</Link>
				))}
			</div>
		</motion.section>
	);
}
