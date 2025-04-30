'use client';

import { HomeHero } from '@/components/HomeHero';
import { SkillsSection } from '@/components/SkillsSection';
import { AboutSection } from '@/components/AboutSection';
import { CareerTimeline } from '@/components/CareerTimeline';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { CertificatesSection } from '@/components/CertificatesSection';
import { ContactCTA } from '@/components/ContactCTA';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export default function HomePage() {
	return (
		<>
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
        <SectionWrapper>
					<SkillsSection />
				</SectionWrapper>
				<SectionWrapper background='white' isLast={true}>
					<CertificatesSection />
				</SectionWrapper>
				<ContactCTA />
			</main>
			<div className='fixed z-50 bottom-6 right-6'>
				<button
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className='bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition'
					aria-label='Back to top'
				>
					↑ Top
				</button>
			</div>
		</>
	);
}
