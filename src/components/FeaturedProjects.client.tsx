// components/FeaturedProjects.client.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FeaturedProjectCard } from './ui/Card/FeaturedProjectCard';
import type { Project } from '@/types/project';

const cardVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.15,
			duration: 0.6,
			ease: 'easeOut',
		},
	}),
};

export function FeaturedProjectsClient({ projects }: { projects: Project[] }) {
	return (
		<section className='section-container'>
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.5 }}
				className='text-2xl md:text-3xl font-bold mb-8 text-center'
			>
				Featured Projects
			</motion.h2>

			{projects && projects.length > 0 && (
				<>
					<AnimatePresence>
						<motion.div initial='hidden' whileInView='visible' viewport={{ once: true }} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{projects.slice(0, 4).map((project, i) => (
								<motion.div key={project._id} custom={i} variants={cardVariants}>
									<FeaturedProjectCard
										title={project.title}
										imageUrl={project.mainImage.asset.url}
										country={project.location}
										features={project.features}
										tech={project.technologies}
									/>
								</motion.div>
							))}
						</motion.div>
					</AnimatePresence>
					<div className='flex justify-center items-center m-auto mt-8'>
						<Link
							href='projects'
							className='inline-block px-6 py-3 rounded-lg text-white bg-black hover:bg-gray-800 transition font-semibold text-sm'
						>
							View All Projects
						</Link>
					</div>
				</>
			)}
		</section>
	);
}
