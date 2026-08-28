'use client';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { ClipRevealWords } from '@/components/ui/ClipReveal';
import { Magnetic } from '@/components/ui/Magnetic';
import { aboutContent, getInTouchContent } from '@/content/home';

export function GetInTouchSection() {
	return (
		<section id='get-in-touch' className='section-container scroll-mt-24'>
			<div className='grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-start'>
				<div className='space-y-8'>
					<div>
						<p className='text-xs uppercase tracking-[0.2em] text-gray-400 mb-4'>{getInTouchContent.eyebrow}</p>
						<ClipRevealWords
							text={getInTouchContent.headline}
							as='h2'
							className='text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-gray-900'
						/>
						<p className='mt-5 text-gray-600 leading-relaxed text-base md:text-lg'>{getInTouchContent.support}</p>
					</div>

					<div className='space-y-5 pt-2'>
						<Magnetic>
							<a
								href={`mailto:${aboutContent.email}`}
								className='group inline-flex items-center gap-2 text-xl md:text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors'
							>
								<Mail className='w-5 h-5 shrink-0' />
								<span className='relative'>
									{aboutContent.email}
									<span className='absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full' />
								</span>
							</a>
						</Magnetic>
						<div className='flex gap-4'>
							<a
								href={aboutContent.github}
								target='_blank'
								rel='noopener noreferrer'
								aria-label='GitHub'
								className='text-gray-700 hover:text-blue-600 transition min-h-11 min-w-11 flex items-center justify-center'
							>
								<FaGithub size={24} />
							</a>
							<a
								href={aboutContent.linkedin}
								target='_blank'
								rel='noopener noreferrer'
								aria-label='LinkedIn'
								className='text-gray-700 hover:text-blue-600 transition min-h-11 min-w-11 flex items-center justify-center'
							>
								<FaLinkedin size={24} />
							</a>
						</div>
					</div>
				</div>

				<div className='rounded-2xl border border-gray-200/80 bg-white p-6 md:p-8 shadow-sm'>
					<ContactForm />
				</div>
			</div>
		</section>
	);
}
