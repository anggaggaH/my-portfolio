'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteChangeTracker() {
	const pathname = usePathname();

	useEffect(() => {
		if (window.gtag) {
			window.gtag('config', 'G-51HCY01QZ4', {
				page_path: pathname,
			});
		}
	}, [pathname]);

	return null;
}
