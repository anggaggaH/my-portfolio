'use client'

import { AnimatePresence } from 'framer-motion'
import { ReactQueryClientProvider } from '@/providers/ReactQueryProvider'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { useEffect } from 'react'

export function ClientLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	useEffect(() => {
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual'
		}
	}, [])

	return (
		<AnimatePresence mode='wait' initial={false}>
			<ReactQueryClientProvider key={pathname}>
				<Header />
				{children}
			</ReactQueryClientProvider>
		</AnimatePresence>
	)
}
