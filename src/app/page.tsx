'use client';

import { HomeHero } from '@/components/HomeHero';
import { SkillsSection } from '@/components/SkillsSection';
import { AboutSection } from '@/components/AboutSection';
import { CareerTimeline } from '@/components/CareerTimeline';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { CertificatesSection } from '@/components/CertificatesSection';
import { ContactCTA } from '@/components/ContactCTA';

export default function HomePage() {
  return (
    <main className="flex flex-col space-y-24 p-8">
      <HomeHero />
      <SkillsSection />
      <AboutSection />
      <CareerTimeline />
      <FeaturedProjects />
      <CertificatesSection />
      <ContactCTA />
    </main>
  );
}
