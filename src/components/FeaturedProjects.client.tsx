'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types/project';
import { fadeUpVariants } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function TechTags({ tech }: { tech?: string[] }) {
	if (!tech?.length) return null;
	return (
		<div className='flex flex-wrap gap-1.5'>
			{tech.slice(0, 5).map((item) => (
				<span key={item} className='text-xs text-gray-600 bg-gray-100/80 px-2 py-0.5 rounded-md'>
					{item}
				</span>
			))}
		</div>
	);
}

function ProjectExcerpt({ project }: { project: Project }) {
	const parts = [project.overview, project.problem, project.result].filter(Boolean);
	const text = parts.join(' ').slice(0, 280);
	return <p className='text-sm md:text-base text-gray-600 leading-relaxed'>{text}{text.length >= 280 ? '…' : ''}</p>;
}

function MobileProjectCard({ project, index }: { project: Project; index: number }) {
	const reducedMotion = usePrefersReducedMotion();
	const label = String(index + 1).padStart(2, '0');

	return (
		<motion.article
			initial={reducedMotion ? false : 'hidden'}
			whileInView={reducedMotion ? undefined : 'visible'}
			viewport={{ once: true, amount: 0.2 }}
			variants={fadeUpVariants}
			transition={{ duration: 0.5 }}
		>
			<Link
				href={`/projects/${project.slug.current}`}
				className='group block overflow-hidden rounded-2xl border border-gray-200/80 bg-white'
			>
				<div className='relative aspect-[16/10] bg-gray-100 overflow-hidden'>
					{project.mainImage?.asset?.url && (
						<Image
							src={project.mainImage.asset.url}
							alt={project.title}
							fill
							sizes='100vw'
							className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
						/>
					)}
				</div>
				<div className='p-5 space-y-3'>
					<div className='flex items-center gap-2 text-xs text-gray-500'>
						<span className='font-semibold text-blue-600 tracking-wide'>{label} — Featured</span>
						{project.location && (
							<>
								<span>·</span>
								<span className='inline-flex items-center gap-1'>
									<Globe2 className='w-3.5 h-3.5' />
									{project.location}
								</span>
							</>
						)}
					</div>
					<h3 className='text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors'>{project.title}</h3>
					<ProjectExcerpt project={project} />
					<TechTags tech={project.technologies} />
					<span className='inline-flex items-center gap-1 text-sm font-medium text-gray-900 pt-1'>
						View case study <ArrowUpRight className='w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
					</span>
				</div>
			</Link>
		</motion.article>
	);
}

function DesktopReelPanel({
	project,
	index,
	onInView,
}: {
	project: Project;
	index: number;
	onInView: (index: number) => void;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const label = String(index + 1).padStart(2, '0');

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) onInView(index);
			},
			{ threshold: 0.45, rootMargin: '-20% 0px -20% 0px' }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [index, onInView]);

	return (
		<div ref={ref} className='min-h-[70vh] flex flex-col justify-center py-12 md:py-16'>
			<Link href={`/projects/${project.slug.current}`} className='group block space-y-4 max-w-lg'>
				<div className='flex items-center gap-2 text-xs text-gray-500'>
					<span className='font-semibold text-blue-600 tracking-wide'>{label} — Featured</span>
					{project.location && (
						<>
							<span>·</span>
							<span className='inline-flex items-center gap-1'>
								<Globe2 className='w-3.5 h-3.5' />
								{project.location}
							</span>
						</>
					)}
				</div>
				<h3 className='text-3xl md:text-4xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors'>
					{project.title}
				</h3>
				<ProjectExcerpt project={project} />
				<TechTags tech={project.technologies} />
				<span className='inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 pt-2 relative'>
					<span className='relative'>
						View case study
						<span className='absolute bottom-0 left-0 h-px w-0 bg-blue-600 transition-all duration-300 group-hover:w-full' />
					</span>
					<ArrowUpRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1' />
				</span>
			</Link>
		</div>
	);
}

function StickyImage({ projects, activeIndex, reducedMotion }: { projects: Project[]; activeIndex: number; reducedMotion: boolean }) {
	const project = projects[activeIndex];
	const imageUrl = project?.mainImage?.asset?.url;

	return (
		<div className='sticky top-24 h-[calc(100vh-8rem)] flex items-center'>
			<Link
				href={`/projects/${project.slug.current}`}
				className='group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/60'
			>
				<AnimatePresence mode='wait'>
					{imageUrl && (
						<motion.div
							key={project._id}
							initial={reducedMotion ? false : { opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={reducedMotion ? undefined : { opacity: 0 }}
							transition={{ duration: reducedMotion ? 0 : 0.4 }}
							className='absolute inset-0'
						>
							<Image
								src={imageUrl}
								alt={project.title}
								fill
								sizes='(max-width: 768px) 100vw, 50vw'
								className='object-cover transition-transform duration-700 group-hover:scale-[1.04]'
								priority={activeIndex === 0}
							/>
							<div className='absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/5 transition-colors duration-500' />
						</motion.div>
					)}
				</AnimatePresence>
			</Link>
		</div>
	);
}

export function FeaturedProjectsClient({ projects }: { projects: Project[] }) {
	const reducedMotion = usePrefersReducedMotion();
	const [activeIndex, setActiveIndex] = useState(0);
	const list = projects?.slice(0, 4) ?? [];

	const handleInView = useCallback((index: number) => {
		setActiveIndex(index);
	}, []);

	if (!list.length) return null;

	return (
		<section id='featured-projects' className='section-container scroll-mt-24'>
			<div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14'>
				<div>
					<p className='text-xs uppercase tracking-[0.2em] text-gray-400 mb-2'>Selected Work</p>
					<h2 className='text-2xl md:text-3xl font-bold tracking-tight text-gray-900'>Featured Projects</h2>
				</div>
				<p className='text-sm text-gray-500 max-w-sm md:text-right'>
					A few recent builds — case studies with problem, solution, and results.
				</p>
			</div>

			{/* Mobile: stacked cards */}
			<div className='md:hidden space-y-6'>
				{list.map((project, i) => (
					<MobileProjectCard key={project._id} project={project} index={i} />
				))}
			</div>

			{/* Desktop: sticky reel */}
			<div className='hidden md:grid md:grid-cols-2 gap-10 lg:gap-16'>
				<StickyImage projects={list} activeIndex={reducedMotion ? 0 : activeIndex} reducedMotion={reducedMotion} />
				<div>
					{list.map((project, i) => (
						<DesktopReelPanel key={project._id} project={project} index={i} onInView={handleInView} />
					))}
				</div>
			</div>

			<div className='flex justify-center mt-12'>
				<Button href='/projects'>View All Projects</Button>
			</div>
		</section>
	);
}
