'use client';

import { motion } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTailwindcss, SiFirebase, SiTypescript, SiVite, SiGithub, SiGatsby, SiElement, SiGitlab } from 'react-icons/si';
import { DiVisualstudio  } from 'react-icons/di';
import { FaBootstrap, FaPhp, FaVuejs } from 'react-icons/fa';
import { BsFillChatDotsFill } from "react-icons/bs";

const skills = {
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
		{ name: 'Element Plus', icon: SiElement }
	],
	'Backend / BaaS': [
		{ name: 'Firebase', icon: SiFirebase },
		{ name: 'PhP', icon: FaPhp },
	],
	Tools: [
		{ name: 'VS Code', icon: DiVisualstudio },
		{ name: 'GitLab', icon: SiGitlab },
		{ name: 'GitHub', icon: SiGithub },
		{ name: 'ChatGPT', icon: BsFillChatDotsFill },
	],
};

const itemVariants = {
	hidden: { opacity: 0, y: 15 },
	visible: { opacity: 1, y: 0 },
};

export function SkillsSection() {
	return (
		<motion.section
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={{
				hidden: {},
				visible: { transition: { staggerChildren: 0.08 } },
			}}
			className='w-full max-w-5xl mx-auto px-4 py-20'
		>
			<div className='grid md:grid-cols-2 gap-12 items-start'>
				{/* LEFT COLUMN */}
				<div>
					<p className='text-sm italic text-gray-400 mb-2'>What I Use</p>
					<h2 className='text-4xl font-bold leading-tight tracking-tight'>
						I combine modern technologies and proven tools to ship scalable, fast, and beautiful interfaces.
					</h2>
				</div>

				{/* RIGHT COLUMN */}
				<div className='space-y-6'>
					{Object.entries(skills).map(([group, items]) => (
						<div key={group}>
							<h3 className='text-sm font-semibold text-gray-500 mb-2'>{group}</h3>
							<div className='flex flex-wrap gap-3'>
								{items.map(({ name, icon: Icon }) => (
									<motion.div
										key={name}
										variants={itemVariants}
										whileHover={{ scale: 1.07 }}
										transition={{ type: 'spring', stiffness: 300 }}
										className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-600 hover:shadow-md text-sm text-gray-800 cursor-default transition-all'
									>
										<Icon className='text-blue-500' /> {name}
									</motion.div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
