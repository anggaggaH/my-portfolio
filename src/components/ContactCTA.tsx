'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function ContactCTA() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 1.2, duration: 0.5 }}
			className='text-center space-y-6'
		>
			<h2 className='text-3xl font-bold'>Let&apos;s Work Together!</h2>
			<p className='text-lg'>Interested in working with me? Let&apos;s build something amazing!</p>
			<div className='flex justify-center space-x-4'>
				<Link href='/projects' className='px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800'>
					View Projects
				</Link>
				<Link href='/contact' className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
					Contact Me
				</Link>
			</div>
		</motion.section>
	);
}
