'use client';

import { motion } from 'framer-motion';
import {
	SiReact,
	SiNextdotjs,
	SiTailwindcss,
	SiTypescript,
	SiVite,
	SiGithub,
	SiGatsby,
	SiElement,
	SiGitlab,
	SiMaterialdesign,
	SiSass,
} from 'react-icons/si';
import { FaBootstrap, FaPhp, FaVuejs } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const skills: Record<string, { name: string; icon: IconType }[]> = {
	Frontend: [
		{ name: 'React', icon: SiReact },
		{ name: 'Next.js', icon: SiNextdotjs },
		{ name: 'TypeScript', icon: SiTypescript },
		{ name: 'Vite', icon: SiVite },
		{ name: 'Vue.js', icon: FaVuejs },
		{ name: 'Gatsby.js', icon: SiGatsby },
	],
	Styling: [
		{ name: 'TailwindCSS', icon: SiTailwindcss },
		{ name: 'Bootstrap', icon: FaBootstrap },
		{ name: 'Element Plus', icon: SiElement },
		{ name: 'Material UI', icon: SiMaterialdesign },
		{ name: 'Sass', icon: SiSass },
	],
	'Backend / BaaS': [{ name: 'PHP', icon: FaPhp }],
	Tools: [
		{ name: 'GitLab', icon: SiGitlab },
		{ name: 'GitHub', icon: SiGithub },
	],
};

const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
};

export function SkillsSection() {
	const reducedMotion = usePrefersReducedMotion();

	return (
		<section id='skills' className='section-container scroll-mt-24'>
			<div className='grid md:grid-cols-2 gap-10 md:gap-14 items-start'>
				<div>
					<p className='text-xs uppercase tracking-[0.2em] text-gray-400 mb-3'>Skills</p>
					<h2 className='text-2xl md:text-3xl font-bold leading-tight tracking-tight text-gray-900'>
						Modern tools and proven stacks to ship fast, scalable interfaces.
					</h2>
					<p className='mt-4 text-sm text-gray-500'>Daily tooling: Cursor, VS Code, and AI assistants when they speed up the craft.</p>
				</div>

				<motion.div
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={{
						hidden: {},
						visible: reducedMotion ? {} : { transition: { staggerChildren: 0.04 } },
					}}
					className='space-y-8'
				>
					{Object.entries(skills).map(([group, items]) => (
						<div key={group}>
							<h3 className='text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3'>{group}</h3>
							<div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
								{items.map(({ name, icon: Icon }) => (
									<motion.div
										key={name}
										variants={reducedMotion ? undefined : itemVariants}
										whileHover={reducedMotion ? undefined : { y: -2 }}
										className='flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white px-2 py-3 text-center'
									>
										<Icon className='text-blue-500' size={22} />
										<span className='text-xs text-gray-700 leading-tight'>{name}</span>
									</motion.div>
								))}
							</div>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
