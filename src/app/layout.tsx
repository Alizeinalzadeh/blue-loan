import LoanLayout from '@/components/Layout/Loan/LoanLayout';
import '@/styles/globals.css';
import '@/styles/typography.css';
import { Viewport } from 'next';

export const viewport: Viewport = {
	themeColor: '#75AAEB',
	maximumScale: 1,
	minimumScale: 1,
	initialScale: 1,
	width: 'device-width',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='fa'>
			<body className='bg-surface-main'>
				<LoanLayout>{children}</LoanLayout>
			</body>
		</html>
	);
}
