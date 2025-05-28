import Image from 'next/image';
import { motion } from 'framer-motion';

export function ProjectHero({ title, imageUrl }: { title: string; imageUrl: string }) {
	return (
		<div className='relative h-[65vh] w-full overflow-hidden text-white'>
			{/* Background Layer */}
			<div className='absolute inset-0 z-0'>
				<Image src={imageUrl} alt={title} fill className='object-cover blur-xl scale-110 opacity-50' priority />
				<div className='absolute inset-0 bg-gradient-to-b from-black/40 to-black/80' />
			</div>

			{/* Foreground Content */}
			<div className='relative z-10 max-w-5xl mx-auto h-full flex items-end justify-center pt-12 pb-20 px-4'>
				<div className='flex flex-col items-center space-y-6'>
					{/* Animated Image */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
					>
						<Image
							src={imageUrl}
							alt={title}
							width={800}
							height={500}
							className='object-contain max-h-[320px] w-auto rounded-lg shadow-lg'
							priority
						/>
					</motion.div>

					{/* Animated Title */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
						className='text-2xl md:text-3xl font-bold text-center drop-shadow-md'
					>
						{title}
					</motion.h1>
				</div>
			</div>
		</div>
	);
}
