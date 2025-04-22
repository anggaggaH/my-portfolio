'use client';

import { motion } from 'framer-motion';

const certificates = [
	{ title: 'React Native - The Practical Guide', year: '2022' },
	{ title: 'Vue - The Complete Guide - Academind', year: '2022' },
	{ title: 'React - The Complete Guide - Academind', year: '2021' },
];

export function CertificatesSection() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 1.0, duration: 0.5 }}
			className='text-center space-y-6'
		>
			<h2 className='text-3xl font-bold'>Certificates</h2>
			<div className='flex flex-wrap justify-center gap-6'>
				{certificates.map((cert) => (
					<div key={cert.title} className='p-4 border rounded-lg shadow-md hover:scale-105 transition'>
						<h4 className='font-bold'>{cert.title}</h4>
						<p className='text-sm text-gray-500'>{cert.year}</p>
					</div>
				))}
			</div>
		</motion.section>
	);
}
