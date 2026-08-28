'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { careerTimeline } from '@/content/home';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

export function CareerTimeline() {
	const reducedMotion = usePrefersReducedMotion();
	const sectionRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start 0.8', 'end 0.5'],
	});

	const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

	const handleInView = useCallback((index: number) => {
		setActiveIndex(index);
	}, []);

	return (
		<section id='career' className='section-container scroll-mt-24' ref={sectionRef}>
			<div className='grid md:grid-cols-2 gap-10 md:gap-14 items-start'>
				<div>
					<p className='text-xs uppercase tracking-[0.2em] text-gray-400 mb-3'>Career</p>
					<h2 className='text-2xl md:text-3xl font-bold leading-tight tracking-tight text-gray-900'>
						6+ years crafting digital interfaces for people, brands, and businesses.
					</h2>
				</div>

				<div className='relative'>
					<div className='absolute left-[7px] top-2 bottom-2 w-px bg-blue-100' aria-hidden />
					<motion.div
						className='absolute left-[7px] top-2 bottom-2 w-px bg-blue-400 origin-top'
						style={{ scaleY: reducedMotion ? 1 : lineScale }}
						aria-hidden
					/>

					<div className='space-y-8'>
						{careerTimeline.map((item, i) => (
							<CareerItem
								key={item.role + item.year}
								item={item}
								index={i}
								isActive={reducedMotion || activeIndex === i}
								onInView={handleInView}
								reducedMotion={reducedMotion}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function CareerItem({
	item,
	index,
	isActive,
	onInView,
	reducedMotion,
}: {
	item: (typeof careerTimeline)[number];
	index: number;
	isActive: boolean;
	onInView: (index: number) => void;
	reducedMotion: boolean;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (reducedMotion) return;
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) onInView(index);
			},
			{ threshold: 0.6 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [index, onInView, reducedMotion]);

	return (
		<motion.div
			ref={ref}
			initial={reducedMotion ? false : { opacity: 0, y: 12 }}
			whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: reducedMotion ? 0 : index * 0.08, duration: 0.4 }}
			className={cn('relative pl-8 transition-opacity duration-300', !isActive && !reducedMotion && 'opacity-45')}
		>
			<span
				className={cn(
					'absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 bg-white ring-4 ring-gray-50 transition-colors',
					isActive ? 'border-blue-500' : 'border-blue-200'
				)}
			/>

			<div className='flex flex-wrap items-center gap-2 mb-1'>
				<span className='text-xs font-medium text-gray-400'>{item.year}</span>
				<span
					className={cn(
						'text-xs font-medium px-2 py-0.5 rounded-md',
						item.type === 'freelance' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
					)}
				>
					{item.type === 'freelance' ? 'Freelance' : 'Full-Time'}
				</span>
			</div>
			<h3 className='text-base md:text-lg font-semibold text-gray-900'>{item.role}</h3>
			<p className='text-sm text-gray-600'>{item.company}</p>
			{item.outcome && <p className='mt-1.5 text-sm text-gray-500 leading-relaxed'>{item.outcome}</p>}
		</motion.div>
	);
}
