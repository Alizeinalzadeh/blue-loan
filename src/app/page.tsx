import FormWrapper from '@/components/Pages/Loan/FormWrapper/FormWrapper';
import { LoansContextProvider } from '@/store/loan/LoanContext';

export default function Home() {
	return (
		<LoansContextProvider>
			<FormWrapper />
		</LoansContextProvider>
	);
}
