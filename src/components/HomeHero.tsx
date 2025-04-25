'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function HomeHero() {
	return (
		<motion.section
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='text-center space-y-6'
		>
			<h1 className='text-5xl font-bold'>Hi, I&apos;m Angga Hermawan</h1>
			<p className='text-2xl'>Frontend Developer | 5+ Years of Experience</p>
			<div className='flex justify-center space-x-4 mt-4'>
				<Link
					href='/projects'
					className='px-6 py-3 bg-black text-white rounded-lg hover:scale-105 hover:bg-gray-800 transition-transform duration-200'
				>
					View Projects
				</Link>
				<Link href='/contact' className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:scale-105 hover:bg-blue-700'>
					Contact Me
				</Link>
			</div>
		</motion.section>
	);
}
