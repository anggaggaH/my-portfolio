'use client';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { aboutContent, getInTouchContent } from '@/content/home';

export function GetInTouchSection() {
	return (
		<section id='get-in-touch' className='section-container scroll-mt-24'>
			<div className='grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-start'>
				<div className='space-y-6'>
					<div>
						<p className='text-xs uppercase tracking-[0.2em] text-gray-400 mb-3'>{getInTouchContent.eyebrow}</p>
						<h2 className='text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900'>
							{getInTouchContent.headline}
						</h2>
						<p className='mt-4 text-gray-600 leading-relaxed'>{getInTouchContent.support}</p>
					</div>

					<div className='space-y-4 pt-2'>
						<a
							href={`mailto:${aboutContent.email}`}
							className='inline-flex items-center gap-2 text-base font-semibold text-gray-900 hover:text-blue-600 transition'
						>
							<Mail className='w-4 h-4' />
							{aboutContent.email}
						</a>
						<div className='flex gap-4'>
							<a
								href={aboutContent.github}
								target='_blank'
								rel='noopener noreferrer'
								aria-label='GitHub'
								className='text-gray-700 hover:text-blue-600 transition'
							>
								<FaGithub size={24} />
							</a>
							<a
								href={aboutContent.linkedin}
								target='_blank'
								rel='noopener noreferrer'
								aria-label='LinkedIn'
								className='text-gray-700 hover:text-blue-600 transition'
							>
								<FaLinkedin size={24} />
							</a>
						</div>
					</div>
				</div>

				<div className='rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm'>
					<ContactForm />
				</div>
			</div>
		</section>
	);
}
