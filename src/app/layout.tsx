import type { Metadata } from 'next';

import { ClientLayout } from './clientLayout';
import './globals.css';
import './styles.scss';

export const metadata: Metadata = {
	title: 'Angga Hermawan',
	description: `Multi-skilled web developer with 5+ years of experience designing, coding, testing, and maintaining web applications. Passionate about creating impactful solutions and building excellent platforms through collaboration and clean code`,
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
