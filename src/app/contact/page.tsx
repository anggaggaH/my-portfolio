'use client';

import { useEffect } from 'react';

/** Preserves hash: HTTP redirects drop `#` fragments. */
export default function ContactRedirectPage() {
	useEffect(() => {
		window.location.replace('/#get-in-touch');
	}, []);

	return (
		<div className='min-h-[40vh] flex items-center justify-center text-sm text-gray-500'>
			Redirecting to Get In Touch…
		</div>
	);
}
