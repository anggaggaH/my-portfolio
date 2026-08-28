'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClipRevealWords } from '@/components/ui/ClipReveal';
import { aboutContent, heroContent } from '@/content/home';
import { fadeUpVariants, staggerContainer } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function AboutSection() {
	const reducedMotion = usePrefersReducedMotion();

	return (
		<section id='about-section' className='section-container scroll-mt-24'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5'>
				{/* Headline — spans 2 cols */}
				<div className='md:col-span-2 rounded-2xl border border-gray-200/80 bg-white p-6 md:p-8'>
					<p className='text-xs uppercase tracking-[0.2em] text-gray-400 mb-3'>{aboutContent.eyebrow}</p>
					<ClipRevealWords
						text={aboutContent.headline}
						as='h2'
						className='text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900'
					/>
				</div>

				{/* Stats */}
				<motion.div
					variants={reducedMotion ? undefined : staggerContainer(0.06)}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className='grid grid-cols-1 gap-3'
				>
					{heroContent.stats.map((stat) => (
						<motion.div
							key={stat.label}
							variants={reducedMotion ? undefined : fadeUpVariants}
							className='rounded-2xl border border-gray-200/80 bg-white p-5 flex flex-col justify-center'
						>
							<p className='text-lg font-bold text-gray-900'>{stat.label}</p>
							<p className='text-xs text-gray-500 mt-0.5'>{stat.sublabel}</p>
						</motion.div>
					))}
				</motion.div>

				{/* Bio */}
				<div className='md:col-span-2 rounded-2xl border border-gray-200/80 bg-gray-50/50 p-6 md:p-8 space-y-4'>
					{aboutContent.paragraphs.map((paragraph) => (
						<p key={paragraph} className='text-base md:text-lg text-gray-600 leading-relaxed'>
							{paragraph}
						</p>
					))}
					<div className='flex flex-wrap gap-2 pt-1'>
						{aboutContent.focusAreas.map((area) => (
							<motion.span
								key={area}
								whileHover={reducedMotion ? undefined : { y: -2 }}
								transition={{ duration: 0.2 }}
								className='text-xs font-medium text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-md'
							>
								{area}
							</motion.span>
						))}
					</div>
				</div>

				{/* Contact rows */}
				<div className='rounded-2xl border border-gray-200/80 bg-white p-6 md:p-8 flex flex-col justify-between gap-6'>
					<div>
						<p className='text-xs uppercase tracking-[0.2em] text-gray-400 mb-2'>Availability</p>
						<p className='text-sm font-semibold text-gray-900'>Open to freelance, remote, or full-time</p>
					</div>
					<div className='space-y-3'>
						<Button href={`mailto:${aboutContent.email}`} className='w-full justify-center'>
							<Mail className='w-4 h-4' /> Email Me
						</Button>
						<a
							href={aboutContent.linkedin}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition min-h-11'
						>
							<Linkedin className='w-4 h-4' /> LinkedIn
						</a>
						<a
							href={`tel:${aboutContent.phone}`}
							className='flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition min-h-11'
						>
							<Phone className='w-4 h-4' /> Call
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
