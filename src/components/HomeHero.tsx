'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { scroller } from 'react-scroll';
import { Button } from '@/components/ui/button';
import { heroContent } from '@/content/home';
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

	const fade = (delay = 0) =>
		reducedMotion
			? {}
			: {
					initial: { opacity: 0, y: 20 },
					animate: { opacity: 1, y: 0 },
					transition: { delay, duration: 0.55, ease: 'easeOut' as const },
				};

	const scrollToAbout = () => {
		scroller.scrollTo('about-section', {
			duration: 500,
			smooth: 'easeInOutQuart',
			offset: -80,
		});
	};

	return (
		<section className='relative min-h-[100svh] flex flex-col justify-center px-4 md:px-8 pt-24 pb-20 overflow-hidden'>
			{/* Background */}
			<div className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]' />
			<div className='absolute top-1/4 right-0 w-[420px] h-[420px] bg-blue-200/30 blur-[120px] rounded-full -z-10 pointer-events-none' />
			<div className='absolute bottom-0 left-0 w-[320px] h-[320px] bg-blue-100/40 blur-[100px] rounded-full -z-10 pointer-events-none' />

			<div className='section-container w-full'>
				<div className='grid md:grid-cols-2 gap-10 md:gap-14 items-center'>
					{/* Profile — first on mobile */}
					<motion.div {...fade(0.15)} className='order-1 md:order-2 flex justify-center md:justify-end'>
						<div className='relative w-full max-w-[320px] md:max-w-[380px]'>
							<div className='absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue-100/80 to-white border border-blue-100/60' />
							<div className='relative aspect-[4/5] rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-gray-100'>
								<Image
									src={heroContent.profileImage}
									alt={`${heroContent.firstName} ${heroContent.lastName}`}
									fill
									priority
									sizes='(max-width: 768px) 80vw, 380px'
									className='object-cover'
								/>
							</div>
							<div className='absolute -bottom-4 -left-4 md:-left-6 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-md'>
								<p className='text-xs text-gray-500'>Currently</p>
								<p className='text-sm font-semibold text-gray-900'>Open to opportunities</p>
							</div>
						</div>
					</motion.div>

					{/* Copy */}
					<div className='order-2 md:order-1 text-center md:text-left'>
						<motion.p {...fade(0)} className='text-xs md:text-sm uppercase tracking-[0.22em] text-gray-400 mb-4'>
							{heroContent.eyebrow}
						</motion.p>

						<motion.h1
							{...fade(0.08)}
							className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]'
						>
							{heroContent.firstName}{' '}
							<span className='text-blue-600'>{heroContent.lastName}</span>
						</motion.h1>

						<motion.p {...fade(0.18)} className='mt-5 text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed'>
							{heroContent.tagline}
						</motion.p>

						<motion.div {...fade(0.26)} className='mt-3 h-7 flex items-center justify-center md:justify-start gap-1 text-sm text-gray-500'>
							<span className='text-blue-600 font-medium'>→</span>
							<AnimatePresence mode='wait'>
								<motion.span
									key={phraseIndex}
									initial={reducedMotion ? false : { opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
									transition={{ duration: 0.35 }}
									className='italic'
								>
									{heroContent.rotatingPhrases[phraseIndex]}
								</motion.span>
							</AnimatePresence>
						</motion.div>

						<motion.div {...fade(0.34)} className='mt-8 flex flex-wrap justify-center md:justify-start gap-3'>
							<Button href='/projects'>View Projects</Button>
							<Button href='/#get-in-touch' variant='outline'>
								Get In Touch
							</Button>
						</motion.div>

						{/* Proof strip */}
						<motion.div
							{...fade(0.42)}
							className='mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto md:mx-0'
						>
							{heroContent.stats.map((stat) => (
								<div key={stat.label} className='rounded-xl border border-gray-200 bg-white/80 px-3 py-3 text-center md:text-left'>
									<p className='text-sm font-semibold text-gray-900'>{stat.label}</p>
									<p className='text-xs text-gray-500'>{stat.sublabel}</p>
								</div>
							))}
						</motion.div>

						<motion.div {...fade(0.5)} className='mt-4 flex flex-wrap justify-center md:justify-start gap-2'>
							{heroContent.stack.map((tech) => (
								<span key={tech} className='text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md'>
									{tech}
								</span>
							))}
						</motion.div>
					</div>
				</div>
			</div>

			{/* Scroll cue */}
			<motion.button
				type='button'
				onClick={scrollToAbout}
				aria-label='Scroll to about section'
				initial={reducedMotion ? false : { opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8, duration: 0.5 }}
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
