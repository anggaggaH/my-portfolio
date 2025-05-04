'use client';

import { useProjects } from '@/hooks/useProjects';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/project';
import Image from 'next/image';
import PageWrapper from '@/components/ui/PageWrapper';

export default function ProjectsPage() {
	const { data: projects, isLoading, error } = useProjects({ sort: 'desc' });
	const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [showPreview, setShowPreview] = useState(false);
	const [distanceMoved, setDistanceMoved] = useState(0);
	const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
	// useEffect(() => {
	// 	const handleMouseMove = (e: MouseEvent) => {
	// 		setMousePos({ x: e.clientX, y: e.clientY });
	// 	};
	// 	window.addEventListener('mousemove', handleMouseMove);
	// 	return () => window.removeEventListener('mousemove', handleMouseMove);
	// }, []);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const dx = e.clientX - lastPos.x;
			const dy = e.clientY - lastPos.y;
			setDistanceMoved((prev) => prev + Math.sqrt(dx * dx + dy * dy));
			setLastPos({ x: e.clientX, y: e.clientY });
			setMousePos({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [lastPos]);

	// Delay showing preview until we have cursor position
	useEffect(() => {
		if (hoveredProject) {
			setShowPreview(true);
		} else {
			const timer = setTimeout(() => setShowPreview(false), 200); // Match exit animation duration
			return () => clearTimeout(timer);
		}
	}, [hoveredProject]);

	if (isLoading) return <div className='p-8'>Loading...</div>;
	if (error) return <div className='p-8'>Something went wrong!</div>;
	console.log('projects', projects)
	return (
		<PageWrapper>
			<div className='container-page'>
				<h1 className='text-3xl font-bold mb-12 text-center'>Selected Projects</h1>
				<ul className='space-y-6 relative z-10'>
					{projects?.map((project: Project, i) => (
						<li
							key={project._id}
							onMouseEnter={() => setHoveredProject(project)}
							onMouseLeave={() => setHoveredProject(null)}
							className='overflow-hidden group flex items-center justify-between border-b pb-4 hover:text-blue-600 transition relative cursor-pointer'
						>
							<div className='flex items-center gap-4'>
								<span className='text-gray-400 text-base'>{String(i + 1).padStart(2, '0')}</span>
								<Link href={`/projects/${project.slug.current}`} className='text-2xl font-medium'>
									{project.title}
								</Link>
							</div>
							<span className='text-sm text-gray-500'>{project.location || 'Web Development'}</span>
						</li>
					))}
				</ul>

				<AnimatePresence>
					{showPreview && distanceMoved > 10 && hoveredProject?.mainImage?.asset?.url && (
						<motion.div
							key={hoveredProject._id}
							initial={{ opacity: 0, scale: 0.95, left: mousePos.x + 20, top: mousePos.y + 20 }}
							animate={{
								opacity: 1,
								scale: 1,
								left: mousePos.x + 20,
								top: mousePos.y + 20,
								transition: { duration: 0.15 },
							}}
							exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
							className='fixed pointer-events-none z-50 w-64 h-auto'
							style={{
								transform: 'translate(-50%, -50%)',
							}}
							transition={{
								type: 'spring',
								stiffness: 300,
								damping: 30,
								mass: 0.5,
							}}
						>
							<Image
								src={hoveredProject.mainImage.asset.url}
								alt={hoveredProject.title}
								width={256} // matches your w-64 (64 * 4 = 256)
								height={144} // adjust based on your aspect ratio
								className='w-auto h-auto object-cover rounded-lg shadow-lg'
								priority={false}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</PageWrapper>
	);
}
