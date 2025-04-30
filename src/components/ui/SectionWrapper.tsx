'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type SectionWrapperProps = {
	children: ReactNode;
	className?: string;
    background?: 'white' | 'gray' | 'gradient';
    isLast?: boolean;
};

export function SectionWrapper({ children, className = '', background = 'white', isLast = false }: SectionWrapperProps) {
	const bgClass = {
		white: 'bg-white',
		gray: 'bg-gray-50',
		gradient: 'bg-gradient-to-br from-white to-blue-50',
	}[background];

	return (
		<>
			<motion.section
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				className={`py-8 md:py-4 px-8 ${bgClass} ${className}`}
			>
				{children}
            </motion.section>
			<div className={twMerge('w-full border-t border-gray-200', isLast ? 'mt-16 mb-0' : 'my-16' )} />
		</>
	);
}
