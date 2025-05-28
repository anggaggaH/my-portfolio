'use client';

import { useRef, useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from '@google-recaptcha/react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import PageWrapper from '@/components/ui/PageWrapper';

const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE;
const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE;
const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;
const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;

function ContactForm() {
	const formRef = useRef<HTMLFormElement>(null);
	const [isSent, setIsSent] = useState(false);
	const [error, setError] = useState(false);

	const { executeV3 } = useGoogleReCaptcha();

	const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formRef.current || !executeV3) return;

		try {
			const token = await executeV3('submit_form'); // action name
			if (!token) {
				setError(true);
				return;
			}

			await emailjs.sendForm(serviceId!, templateId!, formRef.current, publicKey);

			setIsSent(true);
			setError(false);
			formRef.current?.reset();
		} catch {
			setError(true);
		}
	};

	return (
		<form ref={formRef} onSubmit={sendEmail} className='flex flex-col gap-6'>
			<div>
				<label className='block mb-2 font-medium' htmlFor='name'>
					Name
				</label>
				<input id='name' name='name' type='text' required className='w-full border p-3 rounded-lg' />
			</div>

			<div>
				<label className='block mb-2 font-medium' htmlFor='email'>
					Email
				</label>
				<input id='email' name='email' type='email' required className='w-full border p-3 rounded-lg' />
			</div>

			<div>
				<label className='block mb-2 font-medium' htmlFor='message'>
					Message
				</label>
				<textarea id='message' name='message' rows={5} required className='w-full border p-3 rounded-lg' />
			</div>

			<button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition'>
				Send Message
			</button>

			{isSent && <p className='text-green-600 mt-4 text-center'>Message sent successfully!</p>}
			{error && <p className='text-red-600 mt-4 text-center'>Failed to send message. Try again.</p>}
		</form>
	);
}

export default function ContactPage() {
	return (
		<PageWrapper>
			<GoogleReCaptchaProvider type='v3' siteKey={siteKey!}>
				<motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className='container-page'>
					<section className='text-center space-y-4 mb-8'>
						<h1 className='text-2xl md:text-3xl font-bold'>Get in Touch</h1>
						<p className='text-lg'>Have a project or opportunity? I&apos;d love to hear from you.</p>
					</section>

					{/* Contact Form */}
					<ContactForm />

					{/* Alternative Contact Info */}
					<div className='flex flex-col text-center gap-4 mt-8'>
						<div className=''>
							<p>or reach me directly:</p>
							<a href='mailto:anggah.net@gmail.com' className='font-semibold'>
								Email: anggah.net@gmail.com
							</a>
						</div>
						<div className='flex justify-center gap-6'>
							<a href='https://github.com/anggaggaH/' target='_blank' rel='noopener noreferrer'>
								<FaGithub size={32} className='hover:scale-110 transition' />
							</a>
							<a href='https://linkedin.com/in/angga-hermawan/' target='_blank' rel='noopener noreferrer'>
								<FaLinkedin size={32} className='hover:scale-110 transition' />
							</a>
						</div>
					</div>
				</motion.main>
			</GoogleReCaptchaProvider>
		</PageWrapper>
	);
}
