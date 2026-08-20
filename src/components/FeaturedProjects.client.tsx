'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types/project';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function TechTags({ tech }: { tech?: string[] }) {
	if (!tech?.length) return null;
	return (
		<div className='flex flex-wrap gap-1.5'>
			{tech.slice(0, 4).map((item) => (
				<span key={item} className='text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md'>
					{item}
				</span>
			))}
		</div>
	);
}

function SpotlightCard({ project }: { project: Project }) {
	return (
		<Link
			href={`/projects/${project.slug.current}`}
			className='group grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-colors'
		>
			<div className='relative aspect-[16/10] md:aspect-auto md:min-h-[280px] bg-gray-100 overflow-hidden'>
				{project.mainImage?.asset?.url && (
					<Image
						src={project.mainImage.asset.url}
						alt={project.title}
						fill
						sizes='(max-width: 768px) 100vw, 50vw'
						className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
					/>
				)}
			</div>
			<div className='flex flex-col justify-center p-6 md:p-8 space-y-4'>
				<div className='flex items-center gap-2 text-xs text-gray-500'>
					<span className='font-semibold text-blue-600 tracking-wide'>01 — Featured</span>
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
				<h3 className='text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight'>
					{project.title}
				</h3>
				{project.overview && <p className='text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3'>{project.overview}</p>}
				<TechTags tech={project.technologies} />
				<span className='inline-flex items-center gap-1 text-sm font-medium text-gray-900 pt-1'>
					View case study <ArrowUpRight className='w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
				</span>
			</div>
		</Link>
	);
}

function CompactCard({ project, index }: { project: Project; index: number }) {
	const label = String(index + 2).padStart(2, '0');

	return (
		<Link
			href={`/projects/${project.slug.current}`}
			className='group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors h-full'
		>
			<div className='relative aspect-[16/10] bg-gray-100 overflow-hidden'>
				{project.mainImage?.asset?.url && (
					<Image
						src={project.mainImage.asset.url}
						alt={project.title}
						fill
						sizes='(max-width: 768px) 100vw, 33vw'
						className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
					/>
				)}
			</div>
			<div className='p-4 space-y-2.5 flex-1 flex flex-col'>
				<div className='flex items-start justify-between gap-2'>
					<div>
						<p className='text-[11px] uppercase tracking-wider text-gray-400 mb-1'>{label}</p>
						<h3 className='text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>{project.title}</h3>
					</div>
					{project.location && <span className='text-xs text-gray-500 shrink-0'>{project.location}</span>}
				</div>
				<div className='mt-auto pt-1'>
					<TechTags tech={project.technologies} />
				</div>
			</div>
		</Link>
	);
}

export function FeaturedProjectsClient({ projects }: { projects: Project[] }) {
	const reducedMotion = usePrefersReducedMotion();
	const list = projects?.slice(0, 4) ?? [];
	const [spotlight, ...rest] = list;

	if (!spotlight) return null;

	return (
		<section id='featured-projects' className='section-container scroll-mt-24'>
			<div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10'>
				<div>
					<p className='text-xs uppercase tracking-[0.2em] text-gray-400 mb-2'>Selected Work</p>
					<h2 className='text-2xl md:text-3xl font-bold tracking-tight text-gray-900'>Featured Projects</h2>
				</div>
				<p className='text-sm text-gray-500 max-w-sm md:text-right'>A few recent builds — case studies with problem, solution, and results.</p>
			</div>

			<motion.div
				initial={reducedMotion ? false : { opacity: 0, y: 16 }}
				whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.45 }}
				className='space-y-5'
			>
				<SpotlightCard project={spotlight} />

				{rest.length > 0 && (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5'>
						{rest.map((project, i) => (
							<CompactCard key={project._id} project={project} index={i} />
						))}
					</div>
				)}
			</motion.div>

			<div className='flex justify-center mt-10'>
				<Button href='/projects'>View All Projects</Button>
			</div>
		</section>
	);
}
