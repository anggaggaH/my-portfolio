// app/home/HomeWrapper.tsx
import { HomeHero } from '@/components/HomeHero';
import { SkillsSection } from '@/components/SkillsSection';
import { AboutSection } from '@/components/AboutSection';
import { CareerTimeline } from '@/components/CareerTimeline';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { GetInTouchSection } from '@/components/GetInTouchSection';
// import { CertificatesSection } from '@/components/CertificatesSection';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import ScrollManager from './ui/ScrollManager';

export default async function HomeWrapper() {
	return (
		<main className='relative flex flex-col'>
			<ScrollManager />
			<HomeHero />
			<SectionWrapper background='white' showDivider={false}>
				<AboutSection />
			</SectionWrapper>
			<SectionWrapper background='gray' showDivider={false}>
				<FeaturedProjects />
			</SectionWrapper>
			<SectionWrapper background='white' showDivider={false}>
				<SkillsSection />
			</SectionWrapper>
			<SectionWrapper background='gray' showDivider={false}>
				<CareerTimeline />
			</SectionWrapper>
			{/* <SectionWrapper background='white'>
					<CertificatesSection />
				</SectionWrapper> */}
			<SectionWrapper background='gradient' isLast showDivider={false}>
				<GetInTouchSection />
			</SectionWrapper>
		</main>
	);
}
