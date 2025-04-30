'use client';

import { useProjects } from '@/hooks/useProjects';
import { motion } from 'framer-motion';
import { FeaturedProjectCard } from './ui/Card/FeaturedProjectCard';

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

export function FeaturedProjects() {
	const { data: projects } = useProjects({ favoriteOnly: true, limit: 4, sort: 'desc' });

	return (
		<section className='w-full max-w-5xl mx-auto px-4'>
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.5 }}
				className='text-3xl font-bold mb-8 text-center'
			>
				Featured Projects
			</motion.h2>

			{projects && projects.length > 0 && (
				<motion.div initial='hidden' whileInView='visible' viewport={{ once: true }} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{projects?.slice(0, 4).map((project, i) => (
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
			)}
			{!projects && <div className='text-center text-gray-400 py-10'>Loading featured projects...</div>}
		</section>
	);
}
