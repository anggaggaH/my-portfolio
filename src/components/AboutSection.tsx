'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.4, duration: 0.5 }}
			className='max-w-3xl mx-auto text-center space-y-6'
		>
			<h2 className='text-3xl font-bold'>About Me</h2>
			<p className='text-lg'>
				I&apos;m a multi-skilled web developer with 5+ years of experience designing, coding, testing, and maintaining web applications.
				Passionate about creating impactful solutions and building excellent platforms through collaboration and clean code.
			</p>
		</motion.section>
	);
}
