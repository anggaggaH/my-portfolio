'use client';

import { useEffect, useState } from 'react';

export function ScrollToTop() {
	const [showScrollButton, setShowScrollButton] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollThreshold = document.body.scrollHeight / 2;
			setShowScrollButton(window.scrollY > scrollThreshold);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		showScrollButton && (
			<div className='fixed z-50 bottom-6 right-6'>
				<button
					onClick={scrollToTop}
					className='bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition'
					aria-label='Back to top'
				>
					↑ Top
				</button>
			</div>
		)
	);
}
