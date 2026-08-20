'use client';

import { useRef, useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from '@google-recaptcha/react';
import emailjs from '@emailjs/browser';

const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE;
const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE;
const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;
const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;

function ContactFormFields() {
	const formRef = useRef<HTMLFormElement>(null);
	const [isSent, setIsSent] = useState(false);
	const [error, setError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { executeV3 } = useGoogleReCaptcha();

	const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formRef.current || !executeV3 || isSubmitting) return;

		setIsSubmitting(true);
		try {
			const token = await executeV3('submit_form');
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
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form ref={formRef} onSubmit={sendEmail} className='flex flex-col gap-6'>
			<div>
				<label className='block mb-2 text-sm font-medium text-gray-800' htmlFor='name'>
					Name
				</label>
				<input
					id='name'
					name='name'
					type='text'
					required
					className='w-full border border-gray-200 bg-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30'
				/>
			</div>

			<div>
				<label className='block mb-2 text-sm font-medium text-gray-800' htmlFor='email'>
					Email
				</label>
				<input
					id='email'
					name='email'
					type='email'
					required
					className='w-full border border-gray-200 bg-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30'
				/>
			</div>

			<div>
				<label className='block mb-2 text-sm font-medium text-gray-800' htmlFor='message'>
					Message
				</label>
				<textarea
					id='message'
					name='message'
					rows={5}
					required
					className='w-full border border-gray-200 bg-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-y'
				/>
			</div>

			<button
				type='submit'
				disabled={isSubmitting}
				className='w-full bg-black hover:bg-gray-800 disabled:opacity-60 text-white py-3 rounded-lg transition font-semibold text-sm'
			>
				{isSubmitting ? 'Sending…' : 'Send Message'}
			</button>

			{isSent && <p className='text-green-600 text-center text-sm'>Message sent successfully!</p>}
			{error && <p className='text-red-600 text-center text-sm'>Failed to send message. Try again.</p>}
		</form>
	);
}

export function ContactForm() {
	if (!siteKey) {
		return <p className='text-sm text-gray-500 text-center'>Contact form is temporarily unavailable.</p>;
	}

	return (
		<GoogleReCaptchaProvider type='v3' siteKey={siteKey}>
			<ContactFormFields />
		</GoogleReCaptchaProvider>
	);
}
