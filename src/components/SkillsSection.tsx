'use client';

import { motion } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTailwindcss, SiFirebase } from 'react-icons/si';

// const skills = ['React', 'Next.js', 'TailwindCSS', 'Sanity.io', 'Firebase', 'Node.js', 'MySQL', 'Git'];
const skills = [
	{ name: 'React', icon: SiReact },
	{ name: 'Next.js', icon: SiNextdotjs },
	{ name: 'TailwindCSS', icon: SiTailwindcss },
	{ name: 'Firebase', icon: SiFirebase },
];

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
				{skills.map(({ name, icon: Icon }) => (
					<div key={name} className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm shadow hover:scale-105 transition'>
						<Icon className='text-blue-500' /> {name}
					</div>
				))}
			</div>
		</motion.section>
	);
}
