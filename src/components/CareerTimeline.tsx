'use client';

import { motion } from 'framer-motion';

const timeline = [
	{ year: '2017-2019', role: 'IT Web & Multimedia', company: 'PT Netmediatama Televisi' },
	{ year: '2019-Now', role: 'Web Developer', company: 'PT Baezeni Digital Services' },
];

export function CareerTimeline() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.6, duration: 0.5 }}
			className='max-w-3xl mx-auto'
		>
			<h2 className='text-3xl font-bold text-center mb-8'>Career Timeline</h2>
			<div className='flex flex-col space-y-6'>
				{timeline.map((item) => (
					<div key={item.year} className='border-l-2 border-blue-500 pl-4'>
						<h3 className='text-xl font-semibold'>{item.role}</h3>
						<p className='text-sm text-gray-500'>{item.company}</p>
						<p className='text-sm'>{item.year}</p>
					</div>
				))}
			</div>
		</motion.section>
	);
}
