'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { clipTransition, clipUpVariants, stagger, staggerContainer } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

type ClipRevealProps = {
	children: ReactNode;
	className?: string;
	as?: 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span';
	delay?: number;
};

export function ClipReveal({ children, className, as = 'div', delay = 0 }: ClipRevealProps) {
	const reducedMotion = usePrefersReducedMotion();
	const Component = motion[as];

	if (reducedMotion) {
		const Tag = as;
		return <Tag className={className}>{children}</Tag>;
	}

	return (
		<Component className={cn('overflow-hidden', className)} initial='hidden' animate='visible'>
			<motion.span className='block' variants={clipUpVariants} transition={clipTransition(delay)}>
				{children}
			</motion.span>
		</Component>
	);
}

type ClipRevealWordsProps = {
	text: string;
	className?: string;
	wordClassName?: string;
	delay?: number;
	as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
};

export function ClipRevealWords({ text, className, wordClassName, delay = 0, as = 'div' }: ClipRevealWordsProps) {
	const reducedMotion = usePrefersReducedMotion();
	const words = text.split(' ');
	const Component = motion[as];

	if (reducedMotion) {
		const Tag = as;
		return <Tag className={className}>{text}</Tag>;
	}

	return (
		<Component
			className={cn('flex flex-wrap', className)}
			variants={staggerContainer(stagger.default, delay)}
			initial='hidden'
			animate='visible'
		>
			{words.map((word, i) => (
				<span key={`${word}-${i}`} className='overflow-hidden inline-block'>
					<motion.span className={cn('inline-block', wordClassName)} variants={clipUpVariants} transition={clipTransition(0)}>
						{word}
						{i < words.length - 1 ? '\u00A0' : ''}
					</motion.span>
				</span>
			))}
		</Component>
	);
}
