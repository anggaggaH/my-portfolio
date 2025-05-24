/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';

export function HomeHero() {
	const particlesInit = useCallback(async (engine: any) => {
		await loadSlim(engine);
	}, []);

	return (
		<section className='relative h-screen flex flex-col justify-center items-center text-center px-4'>
			<div className='absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 bg-blue-100 blur-[120px] opacity-20 -z-10' />

			{/* Particles Background */}
			<Particles
				id='tsparticles'
				init={particlesInit}
				options={{
					background: { color: { value: '#ffffff' } },
					particles: {
						number: { value: 25 },
						size: { value: 2 },
						move: { enable: true, speed: 0.4 },
						links: { enable: true, color: '#d1d5db' }, // Tailwind gray-300
						color: { value: '#a3a3a3' }, // gray-400
					},
					fullScreen: { enable: false },
				}}
				className='absolute inset-0 -z-10'
			/>

			{/* Hero Text */}
			<motion.h1
				initial={{ opacity: 0, y: -40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className='text-4xl md:text-6xl font-extrabold text-black'
			>
				Hi, I&apos;m <span className='text-blue-600'>Angga Hermawan</span>
			</motion.h1>

			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.8 }}
				className='mt-4 text-lg md:text-xl text-gray-600'
			>
				Web Developer | 5+ Years of Experience
			</motion.p>

			{/* Buttons */}
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.6, duration: 0.5 }}
				className='mt-8 flex gap-4'
			>
				<Button href='projects'>View Projects</Button>
				<Button href='contact' variant='outline'>
					Contact Me
				</Button>
			</motion.div>
		</section>
	);
}
