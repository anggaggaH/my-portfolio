import type { Metadata } from 'next';

import { ClientLayout } from './clientLayout';
import './globals.css';
import './styles.scss';

export const metadata: Metadata = {
	title: {
		default: 'Angga Hermawan | Web Developer',
		template: '%s | Angga Hermawan',
	},
	description: `Angga Hermawan is a Multi-skilled web developer with 5+ years of experience designing, coding, testing, and maintaining web applications. Passionate about creating impactful solutions and building excellent platforms through collaboration and clean code`,
	keywords: ['Frontend Developer', 'Web Developer', 'Web Development', 'Jakarta', 'Desktop Applications', 'Websites'],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='font-sans antialiased'>
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
