'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { scroller } from 'react-scroll';
import { Button } from '@/components/ui/button';
import { ClipReveal, ClipRevealWords } from '@/components/ui/ClipReveal';
import { Magnetic } from '@/components/ui/Magnetic';
import { heroContent } from '@/content/home';
import { clipTransition, duration, easeOut } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function HomeHero() {
	const reducedMotion = usePrefersReducedMotion();
	const [phraseIndex, setPhraseIndex] = useState(0);

	useEffect(() => {
		if (reducedMotion) return;

		const interval = setInterval(() => {
			setPhraseIndex((prev) => (prev + 1) % heroContent.rotatingPhrases.length);
		}, 3200);

		return () => clearInterval(interval);
	}, [reducedMotion]);

	const scrollToAbout = () => {
		scroller.scrollTo('about-section', {
			duration: 500,
			smooth: 'easeInOutQuart',
			offset: -80,
		});
	};

	return (
		<section className='relative min-h-[100svh] flex flex-col justify-center px-4 md:px-8 pt-24 pb-20 overflow-hidden bg-grain'>
			<div className='section-container w-full'>
				<div className='grid md:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-16 items-center'>
					{/* Copy — primary */}
					<div className='order-2 md:order-1 text-center md:text-left'>
						<ClipReveal as='p' delay={0} className='text-xs md:text-sm uppercase tracking-[0.22em] text-gray-400 mb-5'>
							{heroContent.eyebrow}
						</ClipReveal>

						<h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95]'>
							<ClipRevealWords text={heroContent.firstName} delay={0.08} as='span' className='block' />
							<ClipRevealWords
								text={heroContent.lastName}
								delay={0.2}
								as='span'
								className='block'
								wordClassName='text-blue-600'
							/>
						</h1>

						<ClipReveal as='p' delay={0.38} className='mt-6 text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed'>
							{heroContent.tagline}
						</ClipReveal>

						<motion.div
							initial={reducedMotion ? false : { opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ ...clipTransition(0.5), duration: duration.default }}
							className='mt-4 h-7 flex items-center justify-center md:justify-start gap-1.5 text-sm text-gray-500'
						>
							<span className='text-blue-600 font-medium'>→</span>
							<div className='overflow-hidden h-7 relative min-w-[200px]'>
								<AnimatePresence mode='wait'>
									<motion.span
										key={phraseIndex}
										initial={reducedMotion ? false : { opacity: 0, y: '100%' }}
										animate={{ opacity: 1, y: 0 }}
										exit={reducedMotion ? undefined : { opacity: 0, y: '-100%' }}
										transition={{ duration: 0.35, ease: easeOut }}
										className='italic absolute inset-0 flex items-center'
									>
										{heroContent.rotatingPhrases[phraseIndex]}
									</motion.span>
								</AnimatePresence>
							</div>
						</motion.div>

						<motion.div
							initial={reducedMotion ? false : { opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ ...clipTransition(0.62), duration: duration.default }}
							className='mt-9 flex flex-wrap justify-center md:justify-start gap-3'
						>
							<Magnetic>
								<Button href='/projects'>View Projects</Button>
							</Magnetic>
							<Magnetic>
								<Button href='/#get-in-touch' variant='outline'>
									Get In Touch
								</Button>
							</Magnetic>
						</motion.div>

						<motion.div
							initial={reducedMotion ? false : { opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.75, duration: 0.4 }}
							className='mt-6 flex flex-wrap justify-center md:justify-start gap-2'
						>
							{heroContent.stack.map((tech) => (
								<span key={tech} className='text-xs font-medium text-gray-500 bg-white/60 border border-gray-200/80 px-2.5 py-1 rounded-md'>
									{tech}
								</span>
							))}
						</motion.div>
					</div>

					{/* Photo — secondary */}
					<motion.div
						initial={reducedMotion ? false : { opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ ...clipTransition(0.7), duration: duration.slow }}
						className='order-1 md:order-2 flex justify-center md:justify-end'
					>
						<div className='relative w-full max-w-[240px] md:max-w-[300px] md:translate-x-4'>
							<div className='relative aspect-[4/5] rounded-2xl overflow-hidden border border-gray-200/80 shadow-md bg-gray-100'>
								<Image
									src={heroContent.profileImage}
									alt={`${heroContent.firstName} ${heroContent.lastName}`}
									fill
									priority
									sizes='(max-width: 768px) 60vw, 300px'
									className='object-cover'
								/>
							</div>
							<div className='absolute -bottom-3 -left-3 md:-left-5 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm'>
								<div className='flex items-center gap-2'>
									<span className='relative flex h-2 w-2'>
										{!reducedMotion && (
											<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75' />
										)}
										<span className='relative inline-flex rounded-full h-2 w-2 bg-green-500' />
									</span>
									<div>
										<p className='text-[10px] uppercase tracking-wider text-gray-400'>Currently</p>
										<p className='text-sm font-semibold text-gray-900'>Open to opportunities</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>

			<motion.button
				type='button'
				onClick={scrollToAbout}
				aria-label='Scroll to about section'
				initial={reducedMotion ? false : { opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 0.5 }}
				className='absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 hover:text-gray-600 transition-colors'
			>
				<motion.span
					animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
					transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
				>
					<ChevronDown size={28} />
				</motion.span>
			</motion.button>
		</section>
	);
}
