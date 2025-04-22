'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
	return (
		<motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='max-w-2xl mx-auto p-8 space-y-8'
		>
			<section className='text-center space-y-4'>
				<h1 className='text-5xl font-bold'>Get in Touch</h1>
				<p className='text-lg'>Have a project or opportunity? I&apos;d love to hear from you.</p>
			</section>

			{/* Contact Form */}
			<form className='space-y-6'>
				<div>
					<label className='block mb-2 font-medium' htmlFor='name'>
						Name
					</label>
					<input
						id='name'
						type='text'
						placeholder='Your name'
						className='w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				<div>
					<label className='block mb-2 font-medium' htmlFor='email'>
						Email
					</label>
					<input
						id='email'
						type='email'
						placeholder='Your email'
						className='w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				<div>
					<label className='block mb-2 font-medium' htmlFor='message'>
						Message
					</label>
					<textarea
						id='message'
						placeholder='Your message'
						rows={5}
						className='w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				<button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition'>
					Send Message
				</button>
			</form>

			{/* Alternative Contact Info */}
			<div className='text-center space-y-2 mt-8'>
				<p>or reach me directly:</p>
				<p className='font-semibold'>Email: anggah.net@gmail.com</p>
				<div className='flex justify-center space-x-6 mt-4'>
					<a href='https://github.com/yourgithub' target='_blank' className='hover:underline'>
						GitHub
					</a>
					<a href='https://linkedin.com/in/yourlinkedin' target='_blank' className='hover:underline'>
						LinkedIn
					</a>
				</div>
			</div>
		</motion.main>
	);
}
