'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

type MagneticProps = {
	children: ReactNode;
	className?: string;
	strength?: number;
};

export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
	const reducedMotion = usePrefersReducedMotion();
	const ref = useRef<HTMLDivElement>(null);
	const [enabled, setEnabled] = useState(false);

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
	const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

	useEffect(() => {
		const finePointer = window.matchMedia('(pointer: fine)').matches;
		setEnabled(finePointer && !reducedMotion);
	}, [reducedMotion]);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!enabled || !ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const offsetX = e.clientX - (rect.left + rect.width / 2);
		const offsetY = e.clientY - (rect.top + rect.height / 2);
		x.set(offsetX * strength);
		y.set(offsetY * strength);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	if (!enabled) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			ref={ref}
			className={cn('inline-block', className)}
			style={{ x: springX, y: springY }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</motion.div>
	);
}
