'use client';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const skillGroups: Record<string, string[]> = {
	Frontend: ['React', 'Next.js', 'TypeScript', 'Vite', 'Vue.js', 'Gatsby.js'],
	Styling: ['TailwindCSS', 'Bootstrap', 'Element Plus', 'Material UI', 'Sass'],
	'Backend / BaaS': ['PHP'],
	Tools: ['GitLab', 'GitHub', 'Cursor', 'VS Code'],
};

const row1 = [...skillGroups.Frontend, ...skillGroups.Styling];
const row2 = [...skillGroups['Backend / BaaS'], ...skillGroups.Tools, ...skillGroups.Frontend.slice(0, 3)];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
	const doubled = [...items, ...items];

	return (
		<div className='overflow-hidden'>
			<div className={reverse ? 'marquee-track-reverse' : 'marquee-track'}>
				{doubled.map((name, i) => (
					<span
						key={`${name}-${i}`}
						className='inline-flex items-center mx-6 md:mx-10 text-2xl md:text-3xl font-semibold text-gray-300 whitespace-nowrap select-none'
					>
						{name}
					</span>
				))}
			</div>
		</div>
	);
}

function StaticSkillList() {
	const all = Object.entries(skillGroups);

	return (
		<div className='space-y-6'>
			{all.map(([group, items]) => (
				<div key={group}>
					<h3 className='text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3'>{group}</h3>
					<p className='text-base text-gray-700 leading-relaxed'>{items.join(' · ')}</p>
				</div>
			))}
		</div>
	);
}

export function SkillsSection() {
	const reducedMotion = usePrefersReducedMotion();

	return (
		<section id='skills' className='section-container scroll-mt-24'>
			<div className='grid md:grid-cols-2 gap-10 md:gap-14 items-start'>
				<div>
					<p className='text-xs uppercase tracking-[0.2em] text-gray-400 mb-3'>Skills</p>
					<h2 className='text-2xl md:text-3xl font-bold leading-tight tracking-tight text-gray-900'>
						Modern tools and proven stacks to ship fast, scalable interfaces.
					</h2>
					<p className='mt-4 text-sm text-gray-500'>Daily tooling: Cursor, VS Code, and AI assistants when they speed up the craft.</p>
				</div>

				<div className='space-y-4 py-2'>
					{reducedMotion ? (
						<StaticSkillList />
					) : (
						<>
							<MarqueeRow items={row1} />
							<MarqueeRow items={row2} reverse />
						</>
					)}
				</div>
			</div>
		</section>
	);
}
