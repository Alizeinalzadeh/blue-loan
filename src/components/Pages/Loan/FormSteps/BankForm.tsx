import Container from '@/components/Layout/Global/Container/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { useLoansContext } from '@/store/loan/LoanContext';
import { numberSeparator } from '@/utils/numberSeprator';
import { stringLengthValidation } from '@/utils/validations';
import { digitsFaToEn, isShebaValid } from '@persian-tools/persian-tools';
import { produce } from 'immer';

const BankForm = () => {
	const {
		loanForm,
		setLoanForm,
		handleGotoLoanStep,
		errors,
		setErrors,
		setStep,
	} = useLoansContext();
	return (
		<Container>
			<div className='flex flex-col gap-8'>
				<Input
					name='iban'
					label='شماره شبا'
					value={loanForm.iban}
					placeholder='شماره شبا خود را وارد کنید'
					ltr
					className='pl-14'
					helperIcon={
						<Text
							variant='span'
							color='content-secondary'
							className='-ml-3'
						>
							IR
						</Text>
					}
					helperIconPosition='left'
					onChange={(e) => {
						setLoanForm({
							...loanForm,
							iban: e.target.value,
						});
						if (errors.iban) {
							setErrors(
								produce((draft) => {
									draft.iban = !isShebaValid(
										`IR${e.target.value}`
									);
								})
							);
						}
					}}
					hasError={errors.iban}
					errorMessage='شماره شبا معتبر وارد کنید'
				/>
				<Input
					name='accountNumber'
					label='شماره حساب'
					value={loanForm.account_number}
					placeholder='شماره حساب خود را وارد کنید'
					hasError={errors.account_number}
					errorMessage='لطفا شماره حساب خود را وارد کنید'
					ltr
					onChange={(e) => {
						setLoanForm({
							...loanForm,
							account_number: digitsFaToEn(e.target.value),
						});
						if (errors.account_number) {
							setErrors(
								produce((draft) => {
									draft.account_number =
										!stringLengthValidation(
											loanForm.account_number,
											5
										);
								})
							);
						}
					}}
				/>
				{/* TODO add mask props to input to show currency inputs currectly */}
				<Input
					name='averageBalance'
					label='میانگین موجودی حساب'
					value={
						loanForm.averageBalance !== ''
							? numberSeparator(+loanForm.averageBalance!)
							: ''
					}
					placeholder='میانگین حساب خود را وارد کنید'
					hasError={errors.averageBalance}
					errorMessage='لطفا میانگین حساب خود را وارد کنید'
					ltr
					onChange={(e) => {
						setLoanForm({
							...loanForm,
							averageBalance: digitsFaToEn(
								e.target.value.replaceAll(',', '')
							),
						});
						if (errors.averageBalance) {
							setErrors(
								produce((draft) => {
									draft.averageBalance =
										!stringLengthValidation(
											loanForm.averageBalance,
											5
										);
								})
							);
						}
					}}
				/>
			</div>
			<div className='p-4 fixed bottom-0 left-0 w-full bg-surface-main grid grid-cols-2 gap-4'>
				<Button
					label='ویرایش اطلاعات شخصی'
					fluid
					variant='outline'
					onClick={() => {
						setStep('personal');
					}}
				/>
				<Button label='مرحله بعدی' fluid onClick={handleGotoLoanStep} />
			</div>
		</Container>
	);
};

export default BankForm;
