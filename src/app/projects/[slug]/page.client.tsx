'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Link from 'next/link';
import 'yet-another-react-lightbox/styles.css';
import Head from 'next/head';

import PageWrapper from '@/components/ui/PageWrapper';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ProjectHero } from '@/components/ui/Card/ProjectHero';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Project } from '@/types/project';

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

export default function ProjectDetailClientPage({ project }: { project: Project }) {
	const [lightboxIndex, setLightboxIndex] = useState(-1); // -1 means closed

	// if (isLoading) return <LoadingSpinner />;
	if (!project) return notFound();

	return (
		<>
			<Head>
				<meta name='keywords' content={project.technologies?.join(', ') || 'portfolio, project, web developer'} />
			</Head>
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
				<div className='flex flex-col px-4 py-4 max-w-3xl mx-auto gap-10 pb-8'>
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
								{project.gallery.map((img: { asset: { url: string | StaticImport } }, idx: number) => (
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
								slides={project.gallery.map((img: { asset: { url: string }; alt: string }) => ({
									src: img.asset.url,
									alt: img.alt || '',
								}))}
							/>
						</SectionBlock>
					)}
				</div>
			</PageWrapper>
		</>
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
			<h2 className='text-xl md:text-2xl font-semibold'>{title}</h2>
			<div className='text-gray-700 leading-relaxed'>{children}</div>
		</motion.section>
	);
}
