'use client';

import LoanListItem from '../../LoanListItem/LoanListItem';
import useLoanList from './useLoanList';

const LoanList = () => {
	const { loansList, status } = useLoanList();
	return (
		<div className='flex flex-col gap-4'>
			{status === 'loading' && <>{/* shimmer loading */}</>}
			{status === 'success' && (
				<>
					{loansList?.map((loan) => {
						return <LoanListItem item={loan} key={loan.id} />;
					})}
				</>
			)}
		</div>
	);
};

export default LoanList;
