/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Link from 'next/link';
import 'yet-another-react-lightbox/styles.css';

import { useProject } from '@/hooks/useProject';
import PageWrapper from '@/components/ui/PageWrapper';

const BackButton = () => (
	<motion.div
		initial={{ opacity: 0, y: 10 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: 10 }}
		transition={{ duration: 0.4, ease: 'easeOut' }}
		className='fixed bottom-6 left-6 z-40'
	>
		<Link href='/projects' passHref>
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className='px-4 py-2 rounded-full bg-white/90 text-gray-800 shadow-md backdrop-blur-md border border-gray-200 hover:bg-white transition'
				aria-label='Back to Projects'
			>
				← Back to Projects
			</motion.button>
		</Link>
	</motion.div>
);

export function ProjectHero({ title, imageUrl }: { title: string; imageUrl: string }) {
	return (
		<div className='relative h-[65vh] w-full overflow-hidden text-white'>
			{/* Background Layer */}
			<div className='absolute inset-0 z-0'>
				<Image src={imageUrl} alt='Project Hero Background' fill className='object-cover blur-xl scale-110 opacity-50' priority />
				<div className='absolute inset-0 bg-gradient-to-b from-black/40 to-black/80' />
			</div>

			{/* Foreground Content */}
			<div className='relative z-10 max-w-5xl mx-auto h-full flex items-end justify-center pt-12 pb-20 px-4'>
				<div className='flex flex-col items-center space-y-6'>
					{/* Animated Image */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
					>
						<Image
							src={imageUrl}
							alt={title}
							width={800}
							height={500}
							className='object-contain max-h-[320px] w-auto rounded-lg shadow-lg'
							priority
						/>
					</motion.div>

					{/* Animated Title */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
						className='text-4xl md:text-5xl font-bold text-center drop-shadow-md'
					>
						{title}
					</motion.h1>
				</div>
			</div>
		</div>
	);
}

export default function ProjectDetailPage() {
	const params = useParams();
	const slug = params.slug as string;
	const { data: project, isLoading } = useProject(slug);

	const [lightboxIndex, setLightboxIndex] = useState(-1); // -1 means closed

	if (isLoading) return <div className='p-8'>Loading...</div>;
	if (!project) return notFound();

	return (
		<PageWrapper>
			<BackButton />

			{/* Hero */}
			<ProjectHero title={project.title} imageUrl={project.mainImage.asset.url} />
			{/* <div className='relative w-full h-[50vh] rounded-xl overflow-hidden mb-8'>
				<Image src={project.mainImage.asset.url} alt={project.title} fill priority className='object-contain' />
				<div className='absolute inset-0 bg-black/50 flex items-center justify-center px-4 text-center'>
					<h1 className='text-white text-4xl md:text-5xl font-bold'>{project.title}</h1>
				</div>
			</div> */}

			{/* Content */}
			<div className='flex flex-col px-4 py-4 max-w-3xl mx-auto gap-10'>
				<SectionBlock title='Overview'>
					<p>{project.overview}</p>
				</SectionBlock>
				<SectionBlock title='Problem'>
					<p>{project.problem}</p>
				</SectionBlock>
				<SectionBlock title='Solution'>
					<p>{project.solution}</p>
				</SectionBlock>

				<SectionBlock title='Technologies Used'>
					<div className='flex flex-wrap gap-2'>
						{project.technologies.map((tech: string) => (
							<span key={tech} className='px-3 py-1 bg-gray-100 text-sm rounded-full border'>
								{tech}
							</span>
						))}
					</div>
				</SectionBlock>

				<SectionBlock title='Result'>
					<p>{project.result}</p>
				</SectionBlock>

				{project.gallery?.length > 0 && (
					<SectionBlock title='Gallery'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
							{project.gallery.map((img: any, idx: number) => (
								<motion.div
									key={idx}
									whileHover={{ scale: 1.03 }}
									onClick={() => setLightboxIndex(idx)}
									className='overflow-hidden rounded-lg shadow-md cursor-pointer'
								>
									<Image
										src={img.asset.url}
										alt={`Gallery image ${idx + 1}`}
										width={500}
										height={300}
										className='object-cover w-full h-auto'
									/>
								</motion.div>
							))}
						</div>

						{/* Lightbox */}
						<Lightbox
							open={lightboxIndex >= 0}
							index={lightboxIndex}
							close={() => setLightboxIndex(-1)}
							slides={project.gallery.map((img: any) => ({
								src: img.asset.url,
								alt: img.alt || '',
							}))}
						/>
					</SectionBlock>
				)}
			</div>
		</PageWrapper>
	);
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			className='space-y-3'
		>
			<h2 className='text-2xl font-semibold'>{title}</h2>
			<div className='text-gray-700 leading-relaxed'>{children}</div>
		</motion.section>
	);
}
