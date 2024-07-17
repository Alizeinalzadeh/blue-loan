import { ILoanItem } from '@/interfaces/loan/loan';
import { IApiResponseStatuses } from '@/interfaces/share/api';
import { LoanService } from '@/services/loan/LoanService';
import { useEffect, useState } from 'react';

const useLoanList = () => {
	const loanServiceInstance = new LoanService();
	const [loansList, setLoansList] = useState<ILoanItem[] | null>(null);
	const [status, setStatus] = useState<IApiResponseStatuses>('loading');

	useEffect(() => {
		const controller = new AbortController();
		loanServiceInstance
			.readLoansList(controller.signal)
			.then((res) => {
				setLoansList(res.data);
			})
			.catch(() => {
				setStatus('error');
			})
			.finally(() => {
				setStatus('success');
			});
		return () => {
			controller.abort();
		};
	}, []);

	return { loansList, status };
};

export default useLoanList;
