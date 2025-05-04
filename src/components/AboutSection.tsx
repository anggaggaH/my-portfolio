'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin } from 'lucide-react';

export function AboutSection() {
	return (
		<motion.section
			id="about-section"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.3, duration: 0.6 }}
			className='w-full max-w-5xl mx-auto px-4 py-20'
		>
			<div className='grid md:grid-cols-2 gap-12 items-start'>
				{/* LEFT COLUMN */}
				<div className='space-y-6'>
					<div className='flex items-center gap-4'>
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='w-auto h-full'>
							<Image
								src='/images/profile.jpeg' // 👈 change path if needed
								alt='Angga Hermawan'
								width={100}
								height={100}
								className='w-full h-full rounded-full object-cover shadow-md'
							/>
						</motion.div>
						<div className='text-gray-800'>
							<p className='text-sm italic text-gray-400'>This is me.</p>
							<h2 className='text-2xl font-semibold leading-tight tracking-tight'>
								I build websites with purpose and precision — clean, responsive, and human-centered.
							</h2>
						</div>
					</div>
				</div>

				{/* RIGHT COLUMN */}
				<div className='space-y-6 text-gray-700'>
					<p className='text-base leading-relaxed'>
						I&apos;m a multi-skilled web developer with 5+ years of experience designing, coding, testing, and maintaining web applications.
						Passionate about creating impactful solutions and building excellent platforms through collaboration and clean code.
					</p>

					<div className='flex flex-wrap gap-3 pt-4'>
						<a
							href='mailto:anggah.net@gmail.com'
							className='inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition'
						>
							<Mail className='w-4 h-4' /> Email Me
						</a>
						<a
							href='tel:+6285795281435'
							className='inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition'
						>
							<Phone className='w-4 h-4' /> Call Me
						</a>
						<a
							href='https://linkedin.com/in/angga-hermawan/'
							className='inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition'
							target='_blank'
						>
							<Linkedin className='w-4 h-4' /> LinkedIn
						</a>
					</div>
				</div>
			</div>
		</motion.section>
	);
}
