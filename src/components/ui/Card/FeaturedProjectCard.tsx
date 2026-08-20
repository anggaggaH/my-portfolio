'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Globe2 } from 'lucide-react';
import Link from 'next/link';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

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

/** Compact card — kept for reuse outside the homepage spotlight layout. */
export function FeaturedProjectCard({
	title,
	imageUrl,
	country = 'Indonesia',
	tech = [],
	slug,
}: FeaturedProjectCardProps) {
	const reducedMotion = usePrefersReducedMotion();

	return (
		<Link href={`/projects/${slug?.current}`} className='group block h-full'>
			<motion.article
				whileHover={reducedMotion ? undefined : { y: -3 }}
				transition={{ duration: 0.25 }}
				className='h-full overflow-hidden border border-gray-200 bg-white rounded-xl hover:border-gray-300 transition-colors'
			>
				<div className='relative w-full aspect-[16/10] overflow-hidden bg-gray-100'>
					<Image
						src={imageUrl}
						alt={title}
						fill
						sizes='(max-width: 768px) 100vw, 50vw'
						className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
					/>
				</div>

				<div className='p-5 space-y-3'>
					<div className='flex items-start justify-between gap-3'>
						<h3 className='text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>{title}</h3>
						<div className='flex items-center gap-1 text-xs text-gray-500 shrink-0 pt-1'>
							<Globe2 className='w-3.5 h-3.5' />
							<span>{country}</span>
						</div>
					</div>

					{tech.length > 0 && (
						<div className='flex flex-wrap gap-1.5 pt-1'>
							{tech.slice(0, 4).map((item) => (
								<span key={item} className='text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded-md'>
									{item}
								</span>
							))}
						</div>
					)}
				</div>
			</motion.article>
		</Link>
	);
}
