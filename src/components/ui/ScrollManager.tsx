'use client';

import { useEffect } from 'react';
import { scroller } from 'react-scroll';

export default function ScrollManager() {
	useEffect(() => {
		const hash = window.location.hash.replace('#', '');
		if (hash) {
			setTimeout(() => {
				scroller.scrollTo(hash, {
					duration: 0,
					smooth: 'easeInOutQuart',
					offset: -80,
				});
			}, 100);
		}
	}, []);

	return null;
}
