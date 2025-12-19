'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Globe2 } from 'lucide-react';
import Link from 'next/link';

type FeaturedProjectCardProps = {
	title: string;
	imageUrl: string;
	slug?: {
		current: string;
	};
	country?: string;
	description?: string;
	features?: string[];
	tech?: string[];
	location?: string;
};

export function FeaturedProjectCard({
	title,
	imageUrl,
	country = 'Indonesia',
	// description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	features = [],
	tech = [],
	slug
}: FeaturedProjectCardProps) {
	return (
		<Link href={`/projects/${slug?.current}`} className='text-xl md:text-2xl font-medium'>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				whileHover={{ scale: 1.03 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				className='rounded-2xl border border-gray-200 shadow-md bg-white overflow-hidden'
			>
				<div className='relative w-full h-64'>
					<Image src={imageUrl} alt={title} fill className='rounded-t-2xl object-cover' />
				</div>

				<div className='p-6 space-y-4'>
					<div className='flex items-center justify-between'>
						<h3 className='text-xl font-semibold'>{title}</h3>
						<div className='flex items-center gap-1 text-sm text-gray-500'>
							<Globe2 className='w-4 h-4' />
							<span>{country}</span>
						</div>
					</div>

					{/* <p className='text-sm text-gray-600'>{description}</p> */}

					<ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
						{features.map((feat, i) => (
							<li key={i}>{feat}</li>
						))}
					</ul>

					<div className='flex flex-wrap gap-2 pt-2 border-t border-gray-100 mt-4'>
						{tech.map((tech, i) => (
							<span key={i} className='text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full'>
								{tech}
							</span>
						))}
					</div>
				</div>
			</motion.div>
		</Link>
	);
}
