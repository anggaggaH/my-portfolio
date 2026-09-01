'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { ArrowUpRight, Globe2 } from 'lucide-react';

import { Project } from '@/types/project';
import PageWrapper from '@/components/ui/PageWrapper';
import { Button } from '@/components/ui/button';
import { projectsPageContent } from '@/content/home';
import { fadeUpVariants } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const PREVIEW_W = 256;
const PREVIEW_H = 160;
const PREVIEW_OFFSET = 24;
const PREVIEW_PAD = 16;

function projectYear(date?: string) {
	if (!date) return null;
	return date.slice(0, 4);
}

function excerpt(project: Project, max = 140) {
	const text = project.overview?.trim();
	if (!text) return null;
	return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}

function TechTags({ tech, limit = 3 }: { tech?: string[]; limit?: number }) {
	if (!tech?.length) return null;
	return (
		<div className='flex flex-wrap gap-1.5'>
			{tech.slice(0, limit).map((item) => (
				<span key={item} className='text-xs text-gray-600 bg-gray-100/80 px-2 py-0.5 rounded-md'>
					{item}
				</span>
			))}
		</div>
	);
}

function PageHeader({ count }: { count: number }) {
	return (
		<header className='mb-10 md:mb-14'>
			<p className='text-xs uppercase tracking-[0.2em] text-gray-400 mb-2'>{projectsPageContent.eyebrow}</p>
			<div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
				<h1 className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900'>{projectsPageContent.headline}</h1>
				{count > 0 && (
					<p className='text-sm text-gray-500 max-w-sm md:text-right'>
						{projectsPageContent.support}
						<span className='block mt-1 text-gray-400'>
							{count} {count === 1 ? 'case study' : 'case studies'}
						</span>
					</p>
				)}
			</div>
		</header>
	);
}

function MobileProjectCard({
	project,
	index,
	reducedMotion,
}: {
	project: Project;
	index: number;
	reducedMotion: boolean;
}) {
	const label = String(index + 1).padStart(2, '0');
	const year = projectYear(project.date);
	const text = excerpt(project, 160);

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
					<div className='flex flex-wrap items-center gap-2 text-xs text-gray-500'>
						<span className='font-semibold text-blue-600 tracking-wide'>{label}</span>
						{year && (
							<>
								<span>·</span>
								<span>{year}</span>
							</>
						)}
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
					<h2 className='text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors'>{project.title}</h2>
					{text && <p className='text-sm text-gray-600 leading-relaxed'>{text}</p>}
					<TechTags tech={project.technologies} limit={4} />
					<span className='inline-flex items-center gap-1 text-sm font-medium text-gray-900 pt-1'>
						View case study{' '}
						<ArrowUpRight className='w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
					</span>
				</div>
			</Link>
		</motion.article>
	);
}

function HoverPreview({
	project,
	x,
	y,
	reducedMotion,
}: {
	project: Project;
	x: MotionValue<number>;
	y: MotionValue<number>;
	reducedMotion: boolean;
}) {
	const url = project.mainImage?.asset?.url;
	if (!url) return null;

	return (
		<motion.div
			initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
			animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
			exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
			transition={{ duration: reducedMotion ? 0.15 : 0.2 }}
			className='pointer-events-none fixed left-0 top-0 z-50 hidden md:block'
			style={{ x, y, width: PREVIEW_W }}
			aria-hidden='true'
		>
			<div className='relative overflow-hidden rounded-lg bg-gray-100 shadow-xl ring-1 ring-black/5' style={{ height: PREVIEW_H }}>
				<Image src={url} alt='' fill sizes='256px' className='object-cover' />
			</div>
		</motion.div>
	);
}

function DesktopProjectRow({
	project,
	index,
	onHover,
}: {
	project: Project;
	index: number;
	onHover: (project: Project | null) => void;
}) {
	const label = String(index + 1).padStart(2, '0');
	const year = projectYear(project.date);
	const text = excerpt(project, 90);

	return (
		<li>
			<Link
				href={`/projects/${project.slug.current}`}
				onMouseEnter={() => onHover(project)}
				onMouseLeave={() => onHover(null)}
				className='group grid grid-cols-[auto_1fr_auto] items-start gap-4 md:gap-6 border-b border-gray-200 py-5 md:py-6 rounded-sm outline-none transition-colors hover:border-gray-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
			>
				<span className='text-gray-400 text-sm md:text-base font-medium tabular-nums pt-1'>{label}</span>
				<div className='min-w-0 space-y-2'>
					<h2 className='text-xl md:text-2xl font-medium text-gray-900 transition-colors group-hover:text-blue-600'>
						{project.title}
					</h2>
					{text && <p className='text-sm text-gray-500 leading-relaxed line-clamp-1'>{text}</p>}
					<TechTags tech={project.technologies} />
				</div>
				<div className='flex flex-col items-end gap-1 text-sm text-gray-500 shrink-0 pt-1'>
					{year && <span className='tabular-nums'>{year}</span>}
					{project.location && (
						<span className='inline-flex items-center gap-1'>
							<Globe2 className='w-3.5 h-3.5' />
							{project.location}
						</span>
					)}
					<ArrowUpRight className='mt-1 w-4 h-4 text-blue-600 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100' />
				</div>
			</Link>
		</li>
	);
}

export function ProjectsClient({ projects }: { projects: Project[] }) {
	const reducedMotion = usePrefersReducedMotion();
	const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const springX = useSpring(mouseX, { stiffness: 300, damping: 32, mass: 0.5 });
	const springY = useSpring(mouseY, { stiffness: 300, damping: 32, mass: 0.5 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const x = Math.min(Math.max(PREVIEW_PAD, e.clientX + PREVIEW_OFFSET), window.innerWidth - PREVIEW_W - PREVIEW_PAD);
			const y = Math.min(Math.max(PREVIEW_PAD, e.clientY + PREVIEW_OFFSET), window.innerHeight - PREVIEW_H - PREVIEW_PAD);
			mouseX.set(x);
			mouseY.set(y);
		};

		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [mouseX, mouseY]);

	const list = projects ?? [];
	const previewX = reducedMotion ? mouseX : springX;
	const previewY = reducedMotion ? mouseY : springY;

	return (
		<PageWrapper>
			<div className='min-h-screen bg-white'>
				<div className='container-page'>
					<PageHeader count={list.length} />

					{list.length === 0 ? (
						<div className='text-center py-16 space-y-5'>
							<p className='text-gray-600'>No projects published yet. Check back soon.</p>
							<Button href='/#get-in-touch' variant='outline'>
								Get in touch
							</Button>
						</div>
					) : (
						<>
							<div className='md:hidden space-y-6'>
								{list.map((project, i) => (
									<MobileProjectCard key={project._id} project={project} index={i} reducedMotion={reducedMotion} />
								))}
							</div>

							<ul className='hidden md:block relative z-10'>
								{list.map((project, i) => (
									<DesktopProjectRow key={project._id} project={project} index={i} onHover={setHoveredProject} />
								))}
							</ul>

							<AnimatePresence>
								{hoveredProject && (
									<HoverPreview
										key={hoveredProject._id}
										project={hoveredProject}
										x={previewX}
										y={previewY}
										reducedMotion={reducedMotion}
									/>
								)}
							</AnimatePresence>

							<div className='flex flex-col items-center text-center gap-3 mt-16 md:mt-20 pt-10 border-t border-gray-100'>
								<p className='text-sm text-gray-500'>Want something similar?</p>
								<Button href='/#get-in-touch'>Get in touch</Button>
							</div>
						</>
					)}
				</div>
			</div>
		</PageWrapper>
	);
}
