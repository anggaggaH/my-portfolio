'use client';

import { motion } from 'framer-motion';
// import Image from 'next/image';

const certificates = [
	{ title: 'React Native - The Practical Guide', year: '2022' },
	{ title: 'Vue - The Complete Guide - Academind', year: '2022' },
	{ title: 'React - The Complete Guide - Academind', year: '2021' },
];

export function CertificatesSection() {
	return (
		<section className='px-6 max-w-6xl mx-auto' id='certificates'>
			<motion.h2
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				className='text-3xl font-bold mb-12 text-center'
			>
				Certificates
			</motion.h2>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{certificates.map((cert, i) => (
					<motion.div
						key={cert.title}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: i * 0.15, duration: 0.5 }}
						className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all'
					>
						{/* {cert.logo && <Image src={cert.logo} alt={cert.issuer} className='h-8 mb-4 object-contain' />} */}
						<h3 className='font-semibold text-lg text-gray-800'>{cert.title}</h3>
						{/* <p className='text-sm text-gray-500 mt-1'>{cert.issuer}</p> */}
						<span className='text-xs text-gray-400 mt-2 block'>{cert.year}</span>
					</motion.div>
				))}
			</div>
		</section>
	);
}
