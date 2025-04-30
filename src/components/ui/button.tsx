import clsx from 'clsx';

type ButtonProps = {
	children: React.ReactNode;
	href: string;
	variant?: 'primary' | 'outline';
	className?: string;
};

export function Button({ children, href, variant = 'primary', className }: ButtonProps) {
	return (
		<a
			href={href}
			className={clsx(
				'inline-block px-6 py-3 rounded-lg text-sm font-semibold transition',
				variant === 'primary' && 'bg-black text-white hover:bg-gray-800',
				variant === 'outline' && 'border border-gray-300 text-gray-700 hover:bg-gray-100',
				className
			)}
		>
			{children}
		</a>
	);
}
