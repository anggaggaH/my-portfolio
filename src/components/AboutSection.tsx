'use client';

import { Mail, Linkedin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { aboutContent } from '@/content/home';

export function AboutSection() {
	return (
		<section id='about-section' className='section-container scroll-mt-24'>
			<div className='grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-start'>
				<div>
					<p className='text-xs uppercase tracking-[0.2em] text-gray-400 mb-3'>{aboutContent.eyebrow}</p>
					<h2 className='text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900'>
						{aboutContent.headline}
					</h2>
				</div>

				<div className='space-y-5 text-gray-600'>
					{aboutContent.paragraphs.map((paragraph) => (
						<p key={paragraph} className='text-base md:text-lg leading-relaxed'>
							{paragraph}
						</p>
					))}

					<div className='flex flex-wrap gap-2 pt-1'>
						{aboutContent.focusAreas.map((area) => (
							<span key={area} className='text-xs font-medium text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-md'>
								{area}
							</span>
						))}
					</div>

					<div className='flex flex-wrap items-center gap-3 pt-3'>
						<Button href={`mailto:${aboutContent.email}`}>
							<Mail className='w-4 h-4' /> Email Me
						</Button>
						<a
							href={aboutContent.linkedin}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition min-h-11'
						>
							<Linkedin className='w-4 h-4' /> LinkedIn
						</a>
						<a href={`tel:${aboutContent.phone}`} className='inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition min-h-11'>
							<Phone className='w-4 h-4' /> Call
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
