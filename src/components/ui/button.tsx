'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonProps = {
	children: React.ReactNode;
	href: string;
	variant?: 'primary' | 'outline';
	className?: string;
};

const baseClass = (variant: 'primary' | 'outline', className?: string) =>
	cn(
		'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition',
		variant === 'primary' && 'bg-black text-white hover:bg-gray-800',
		variant === 'outline' && 'border border-gray-300 text-gray-700 hover:bg-gray-100',
		className
	);

export function Button({ children, href, variant = 'primary', className }: ButtonProps) {
	const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

	if (isExternal) {
		return (
			<a href={href} className={baseClass(variant, className)} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
				{children}
			</a>
		);
	}

	return (
		<Link href={href} className={baseClass(variant, className)}>
			{children}
		</Link>
	);
}
