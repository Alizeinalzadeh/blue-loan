'use client';
import { useLoansContext } from '@/store/loan/LoanContext';
import PersonalForm from '../FormSteps/PersonalForm';
import BankForm from '../FormSteps/BankForm';
import LoanForm from '../FormSteps/LoanForm';
import Toast from '@/components/ui/Toast/Toast';

const FormWrapper = () => {
	const { step } = useLoansContext();
	return (
		<div className='mb-10'>
			<Toast />
			{step === 'personal' && <PersonalForm />}
			{step === 'bank' && <BankForm />}
			{step === 'loan' && <LoanForm />}
		</div>
	);
};

export default FormWrapper;
