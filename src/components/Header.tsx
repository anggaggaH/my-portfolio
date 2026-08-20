'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { scroller } from 'react-scroll';
import { X, Menu } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { aboutContent } from '@/content/home';
import { cn } from '@/lib/utils';

export function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [mounted, setMounted] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsOpen(false);
		};

		window.addEventListener('keydown', onKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen]);

	const scrollToSection = (id: string) => {
		if (pathname === '/') {
			scroller.scrollTo(id, {
				duration: 400,
				delay: 0,
				smooth: 'easeInOutQuart',
				offset: -80,
			});
		} else {
			router.push(`/#${id}`);
		}
		setIsOpen(false);
	};

	const menu = mounted
		? createPortal(
				<AnimatePresence>
					{isOpen && (
						<div className='fixed inset-0 z-[9999] isolate'>
							<motion.button
								type='button'
								aria-label='Close menu overlay'
								initial={{ opacity: 0 }}
								animate={{ opacity: 0.4 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.25 }}
								className='absolute inset-0 bg-black'
								onClick={() => setIsOpen(false)}
							/>

							<motion.aside
								initial={{ x: '100%' }}
								animate={{ x: 0 }}
								exit={{ x: '100%' }}
								transition={{ type: 'tween', duration: 0.35 }}
								className='absolute top-0 right-0 h-full w-full md:w-1/2 bg-white px-6 py-6 md:px-10 md:py-8 flex flex-col justify-between overflow-hidden shadow-2xl'
							>
								<div className='relative flex flex-col gap-6 w-full flex-1 overflow-y-auto pt-14'>
									<div className='grid grid-cols-1 md:grid-cols-2 w-full mx-auto gap-8 md:gap-12 items-start'>
										<div className='space-y-4'>
											<h4 className='text-sm text-gray-500'>Social</h4>
											<ul className='space-y-2'>
												<li>
													<a href={aboutContent.linkedin} className='hover:text-blue-600' target='_blank' rel='noopener noreferrer'>
														LinkedIn
													</a>
												</li>
												<li>
													<a
														href='https://instagram.com/anggaggah_/'
														className='hover:text-blue-600'
														target='_blank'
														rel='noopener noreferrer'
													>
														Instagram
													</a>
												</li>
												<li>
													<a href={aboutContent.github} className='hover:text-blue-600' target='_blank' rel='noopener noreferrer'>
														GitHub
													</a>
												</li>
											</ul>
										</div>

										<div className='space-y-6'>
											<h4 className='text-sm text-gray-500'>Menu</h4>
											<ul className='space-y-4 text-xl md:text-2xl font-medium'>
												<li>
													<button
														onClick={() => scrollToSection('about-section')}
														className='cursor-pointer text-xl md:text-2xl font-medium hover:text-blue-600'
													>
														About Me
													</button>
												</li>
												<li>
													<Link href='/projects' className='hover:text-blue-600' onClick={() => setIsOpen(false)}>
														Projects
													</Link>
												</li>
												<li>
													<button
														onClick={() => scrollToSection('get-in-touch')}
														className='cursor-pointer text-xl md:text-2xl font-medium hover:text-blue-600'
													>
														Get In Touch
													</button>
												</li>
											</ul>
										</div>
									</div>
								</div>

								<div className='space-y-4 pt-6 border-t border-gray-100'>
									<h4 className='text-sm text-gray-500'>Get in touch</h4>
									<a href={`mailto:${aboutContent.email}`} className='text-base'>
										{aboutContent.email}
									</a>
								</div>
							</motion.aside>
						</div>
					)}
				</AnimatePresence>,
				document.body
			)
		: null;

	return (
		<>
			<header
				className={cn(
					'fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center text-black transition-colors duration-300',
					isOpen ? 'z-[10001] bg-transparent pointer-events-none' : 'z-[100]',
					scrolled && !isOpen && 'bg-white/90 backdrop-blur-md border-b border-gray-100'
				)}
			>
				<Link
					href='/'
					className={cn(
						'text-xl font-bold relative z-10 transition-opacity duration-200',
						isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
					)}
				>
					AH
				</Link>

				<button
					onClick={() => setIsOpen(!isOpen)}
					aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
					className='btn text-black bg-transparent p-1 relative z-10 pointer-events-auto'
				>
					<AnimatePresence mode='wait' initial={false}>
						{isOpen ? (
							<motion.div
								key='close'
								initial={{ rotate: -90, opacity: 0 }}
								animate={{ rotate: 0, opacity: 1 }}
								exit={{ rotate: 90, opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								<X size={28} />
							</motion.div>
						) : (
							<motion.div
								key='menu'
								initial={{ rotate: 90, opacity: 0 }}
								animate={{ rotate: 0, opacity: 1 }}
								exit={{ rotate: -90, opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								<Menu size={28} />
							</motion.div>
						)}
					</AnimatePresence>
				</button>
			</header>
			{menu}
		</>
	);
}
