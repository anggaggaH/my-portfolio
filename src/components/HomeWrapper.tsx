// app/home/HomeWrapper.tsx
import { HomeHero } from '@/components/HomeHero';
import { SkillsSection } from '@/components/SkillsSection';
import { AboutSection } from '@/components/AboutSection';
import { CareerTimeline } from '@/components/CareerTimeline';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { ContactCTA } from '@/components/ContactCTA';
// import { CertificatesSection } from '@/components/CertificatesSection';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export default async function HomeWrapper() {
	return (
		// <main className='relative flex flex-col [&>*:not(:last-child)]:space-y-24 pt-8'>
		<main className='relative flex flex-col pt-8'>
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
	);
}
