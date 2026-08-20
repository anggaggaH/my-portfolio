'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function PageWrapper({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const reducedMotion = usePrefersReducedMotion();

	return (
		<motion.div
			initial={reducedMotion ? false : { opacity: 0, y: 8 }}
			animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
			exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
			transition={{ duration: 0.25, ease: 'easeInOut' }}
		>
			{children}
		</motion.div>
	);
}
