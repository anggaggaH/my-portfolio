'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type SectionWrapperProps = {
	children: ReactNode;
	className?: string;
	background?: 'white' | 'gray' | 'gradient';
	isLast?: boolean;
	showDivider?: boolean;
};

export function SectionWrapper({
	children,
	className = '',
	background = 'white',
	isLast = false,
	showDivider = true,
}: SectionWrapperProps) {
	const reducedMotion = usePrefersReducedMotion();

	const bgClass = {
		white: 'bg-white',
		gray: 'bg-gray-50',
		gradient: 'bg-gradient-to-br from-blue-50/80 via-white to-white',
	}[background];

	return (
		<>
			<motion.section
				initial={reducedMotion ? false : { opacity: 0, y: 24 }}
				whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.12 }}
				transition={{ duration: 0.45, ease: 'easeOut' }}
				className={twMerge('py-14 md:py-20 px-4 md:px-8', bgClass, className)}
			>
				{children}
			</motion.section>
			{showDivider && !isLast && <div className='w-full border-t border-gray-100' />}
		</>
	);
}
