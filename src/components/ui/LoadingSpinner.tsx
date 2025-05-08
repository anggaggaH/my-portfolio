'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function LoadingSpinner({ className, size = 24 }: { className?: string; size?: number }) {
	return (
		<div className={clsx('flex justify-center items-center py-10', className)}>
			<motion.div
				className='animate-spin rounded-full border-4 border-t-transparent border-black/80 dark:border-white/80'
				style={{ width: size, height: size }}
			/>
		</div>
	);
}
