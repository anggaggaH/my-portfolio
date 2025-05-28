'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { scroller } from 'react-scroll';
import { X, Menu } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const handleClick = () => {
		if (pathname === '/') {
			// Already on homepage: just scroll
			scroller.scrollTo('about-section', {
				duration: 300,
				delay: 0,
				smooth: 'easeInOutQuart',
				offset: -60,
			});
		} else {
			router.push('/#about-section');
		}
		setIsOpen(false)
	};
	return (
		<header className='fixed top-0 left-0 w-full px-6 py-4 z-50 flex justify-between items-center bg-transparent text-black'>
			<Link href='/' className='text-xl font-bold'>
				AH
			</Link>
			{/* <button onClick={() => setIsOpen(true)} aria-label='Open Menu' className='text-black bg-transparent p-1'>
				<Menu size={28} />
			</button> */}

			<button onClick={() => setIsOpen(!isOpen)} aria-label='Toggle Menu' className='btn text-black bg-transparent p-1 relative z-50'>
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

			<AnimatePresence>
				{isOpen && (
					<>
						{/* RIGHT BACKDROP */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.3 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className='fixed right-0 top-0 h-full w-full bg-black z-40'
							onClick={() => setIsOpen(false)}
						/>

						{/* LEFT PANEL */}
						<motion.div
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ type: 'tween', duration: 0.4 }}
							className='fixed top-0 right-0 h-full w-full md:w-1/2 bg-white z-50 px-10 py-8 flex flex-col justify-between'
						>
							{/* Close Icon */}
							<button onClick={() => setIsOpen(false)} aria-label='Close Menu' className='btn absolute top-6 right-6 text-black'>
								<X size={28} />
							</button>

							{/* Content */}
							<div className='relative flex flex-col gap-4 w-full h-full p-0 py-6 md:py-0 md:p-12'>
								<div className='grid grid-cols-2 h-full w-full mx-auto gap-12 items-start'>
									{/* Social */}
									<div className='space-y-4'>
										<h4 className='text-sm text-gray-500'>Social</h4>
										<ul className='space-y-2'>
											<li>
												<a href='https://linkedin.com/in/angga-hermawan/' className='hover:text-blue-600' target='_blank'>
													LinkedIn
												</a>
											</li>
											<li>
												<a href='https://instagram.com/anggaggah_/' className='hover:text-blue-600' target='_blank'>
													Instagram
												</a>
											</li>
											<li>
												<a href='https://github.com/anggaggaH' className='hover:text-blue-600' target='_blank'>
													GitHub
												</a>
											</li>
										</ul>
									</div>

									{/* Main Navigation */}
									<div className='space-y-6'>
										<h4 className='text-sm text-gray-500'>Menu</h4>
										<ul className='space-y-4 text-2xl font-medium'>
											<li>
												<button
													onClick={handleClick}
													className='cursor-pointer text-2xl font-medium hover:text-blue-600'
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
												<Link href='/contact' className='hover:text-blue-600' onClick={() => setIsOpen(false)}>
													Contact
												</Link>
											</li>
										</ul>
									</div>

									{/* Contact */}
								</div>
								<div className='space-y-4'>
									<h4 className='text-sm text-gray-500'>Get in touch</h4>
									<a href='mailto:anggah.net@gmail.com' className='text-base'>
										anggah.net@gmail.com
									</a>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</header>
	);
}
