import ContactPageClient from "./contactPageClient";

export const metadata = {
	title: 'Contact',
	description:
		'Reach out to Angga Hermawan, a seasoned frontend developer with over 5 years of experience, for freelance, remote, or full-time opportunities.',
	keywords: ['Contact', 'Angga Hermawan', 'Frontend Developer', 'Web Developer', 'Freelance Opportunities', 'Remote Work'],
	openGraph: {
		title: 'Contact - Angga Hermawan',
		description:
			'Reach out to Angga Hermawan, a seasoned frontend developer with over 5 years of experience, for freelance, remote, or full-time opportunities.',
		url: 'https://anggahermawan.com/contact',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Contact - Angga Hermawan',
		description:
			'Reach out to Angga Hermawan, a seasoned frontend developer with over 5 years of experience, for freelance, remote, or full-time opportunities.',
	},
};

export default function ContactPage() {
	return (
		<ContactPageClient />
	);
}
