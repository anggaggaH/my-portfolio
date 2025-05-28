'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function ContactCTA() {
	return (
		<motion.section
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			className='relative overflow-hidden py-20 px-6 bg-gradient-to-br from-blue-50 to-white border-t border-gray-200'
		>
			{/* Optional Blurred Accent */}
			<div className='absolute top-0 right-0 w-40 h-40 bg-blue-200 blur-3xl opacity-30 -z-10 rounded-full transform translate-x-1/2 -translate-y-1/2' />
			<div className='absolute bottom-0 left-0 w-32 h-32 bg-blue-100 blur-2xl opacity-25 -z-10 rounded-full transform -translate-x-1/2 translate-y-1/2' />

			<div className='max-w-2xl mx-auto text-center'>
				<h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>Let’s Build Something Together</h2>
				<p className='text-gray-600 text-lg mb-8'>
					I&apos;m currently open to new opportunities — freelance, remote or full-time. Feel free to reach out and start a conversation.
				</p>

				<Link
					href='contact'
					className='inline-block px-6 py-3 rounded-lg text-white bg-black hover:bg-gray-800 transition font-semibold text-sm'
				>
					Contact Me
				</Link>
			</div>
		</motion.section>
	);
}
