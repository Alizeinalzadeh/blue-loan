import Layout from '@/components/Layout/Global/Layout';
import Header from '@/components/Pages/Loan/Header/Header';

const LoanLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<Layout>
			<div className='h-full w-full flex flex-col gap-4 pb-16'>
				<Header />
				<div>{children}</div>
			</div>
		</Layout>
	);
};

export default LoanLayout;
