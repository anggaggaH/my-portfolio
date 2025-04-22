'use client';

import { motion } from 'framer-motion';

const skills = ['React', 'Next.js', 'TailwindCSS', 'Sanity.io', 'Firebase', 'Node.js', 'MySQL', 'Git'];

export function SkillsSection() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.2, duration: 0.5 }}
			className='text-center space-y-6'
		>
			<h2 className='text-3xl font-bold'>Skills</h2>
			<div className='flex flex-wrap justify-center gap-4'>
				{skills.map((skill) => (
					<div key={skill} className='px-4 py-2 bg-gray-100 rounded-full text-sm shadow hover:scale-105 transition'>
						{skill}
					</div>
				))}
			</div>
		</motion.section>
	);
}
