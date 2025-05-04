'use client';

import { useEffect, useState } from 'react';
import { HomeHero } from '@/components/HomeHero';
import { SkillsSection } from '@/components/SkillsSection';
import { AboutSection } from '@/components/AboutSection';
import { CareerTimeline } from '@/components/CareerTimeline';
import { FeaturedProjects } from '@/components/FeaturedProjects';
// import { CertificatesSection } from '@/components/CertificatesSection';
import { ContactCTA } from '@/components/ContactCTA';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import PageWrapper from '@/components/ui/PageWrapper';

export default function HomePage() {
	const [showScrollButton, setShowScrollButton] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// Show button when user scrolls past half the page height
			// Or use a specific pixel value if you prefer
			const scrollThreshold = document.body.scrollHeight / 2;
			if (window.scrollY > scrollThreshold) {
				setShowScrollButton(true);
			} else {
				setShowScrollButton(false);
			}
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
		<PageWrapper>
			<main className='relative flex flex-col space-y-24 pt-8'>
				<HomeHero />
				<div className='w-full border-t border-gray-200 my-16' />
				<SectionWrapper>
					<AboutSection />
				</SectionWrapper>
				<SectionWrapper>
					<CareerTimeline />
				</SectionWrapper>
				<SectionWrapper>
					<FeaturedProjects />
				</SectionWrapper>
				<SectionWrapper isLast={true}>
					<SkillsSection />
				</SectionWrapper>
				{/* <SectionWrapper background='white' isLast={true}>
					<CertificatesSection />
				</SectionWrapper> */}
				<ContactCTA />
			</main>
			{/* Scroll to top button - conditionally rendered */}
			{showScrollButton && (
				<div className='fixed z-50 bottom-6 right-6'>
					<button
						onClick={scrollToTop}
						className='bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition'
						aria-label='Back to top'
					>
						↑ Top
					</button>
				</div>
			)}
		</PageWrapper>
	);
}
