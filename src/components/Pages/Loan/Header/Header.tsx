'use client';

import { Text } from '@/components/ui/Text';
import { HEADER_ITEMS } from './content';
import Container from '@/components/Layout/Global/Container/Container';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
	const pathName = usePathname();
	return (
		<Container>
			<header className='flex justify-between items-center h-16 border-b border-b-surface-light w-full'>
				{HEADER_ITEMS.map((item) => {
					const active = pathName === item.href;
					return (
						<Link
							href={item.href}
							key={item.id}
							className={`w-1/2 h-full flex items-center justify-center ${active ? 'border-b-2 border-b-primary-main' : ''}`}
						>
							<Text
								variant='h3'
								align='center'
								size='base'
								noWrap
								color={
									active ? 'primary-main' : 'content-primary'
								}
							>
								{item.title}
							</Text>
						</Link>
					);
				})}
			</header>
		</Container>
	);
};

export default Header;
