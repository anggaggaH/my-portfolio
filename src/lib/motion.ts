import type { Transition, Variants } from 'framer-motion';

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const stagger = {
	fast: 0.04,
	default: 0.06,
	slow: 0.08,
} as const;

export const duration = {
	fast: 0.25,
	default: 0.5,
	slow: 0.7,
} as const;

export const clipUpVariants: Variants = {
	hidden: { y: '110%' },
	visible: { y: '0%' },
};

export const fadeUpVariants: Variants = {
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0 },
};

export const sectionEnterVariants: Variants = {
	hidden: { opacity: 0, y: 12 },
	visible: { opacity: 1, y: 0 },
};

export function clipTransition(delay = 0): Transition {
	return { duration: duration.default, ease: easeOut, delay };
}

export function fadeTransition(delay = 0): Transition {
	return { duration: duration.default, ease: easeOut, delay };
}

export function staggerContainer(staggerChildren = stagger.default, delayChildren = 0): Variants {
	return {
		hidden: {},
		visible: {
			transition: { staggerChildren, delayChildren },
		},
	};
}
