import Container from '@/components/Layout/Global/Container/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import SelectBox from '@/components/ui/SelectBox/SelectBox';
import { ILoanItem, ILoanItemRepaymentType } from '@/interfaces/loan/loan';
import { useLoansContext } from '@/store/loan/LoanContext';
import { Text } from '@/components/ui/Text';
import { produce } from 'immer';
import { numberSeparator } from '@/utils/numberSeprator';

const LoanForm = () => {
	const {
		loanForm,
		setLoanForm,
		loansList,
		loansStatus,
		selectedRepaymentType,
		setSelectedRepaymentType,
		selectedLoan,
		setSelectedLoan,
		handleSubmitReqeust,
		errors,
		setErrors,
		penaltyValue,
		installement,
		setStep,
	} = useLoansContext();
	return (
		<Container>
			<div className='flex flex-col gap-8'>
				<SelectBox<ILoanItem>
					options={loansList!}
					id='loan'
					keyLabel='id'
					valueLabel='name'
					value={selectedLoan}
					fluid
					loading={loansStatus === 'loading'}
					label='نوع تسهیلات'
					onChange={(e) => {
						setLoanForm({
							...loanForm,
							selectedLoan: e.id,
						});
						setSelectedLoan(e);
						if (errors.selectedLoan) {
							setErrors(
								produce((draft) => {
									draft.selectedLoan = true;
								})
							);
						}
					}}
					placeholder='نوع تسهیلات خود را انتخاب کنید'
					hasError={errors.selectedLoan}
					errorMessage='لطفا نوع تسهیلات خود را انتخاب کنید'
				/>
				<Input
					name='amount'
					label='مبلغ'
					value={`${numberSeparator(selectedLoan?.amount!)}`}
					disabled
				/>
				<SelectBox<ILoanItemRepaymentType>
					options={selectedLoan?.repaymentType!}
					id='loan'
					keyLabel='value'
					valueLabel='name'
					value={selectedRepaymentType}
					fluid
					loading={loansStatus === 'loading'}
					label='مدت بازپرداخت'
					onChange={(e) => {
						setLoanForm({
							...loanForm,
							selectedRepaymentType: e.name,
						});
						setSelectedRepaymentType(e);
						if (errors.selectedRepaymentType) {
							setErrors(
								produce((draft) => {
									draft.selectedRepaymentType = true;
								})
							);
						}
					}}
					placeholder='مدت بازپرداخت خود را انتخاب کنید'
					hasError={errors.selectedRepaymentType}
					errorMessage='لطفا مدت بازپرداخت خود را انتخاب کنید'
				/>

				<div className='px-4 flex flex-col border border-primary-main rounded-lg [&>div]:border-b [&>div]:border-b-surface-secondary [&>div]:flex [&>div]:justify-between [&>div]:items-center [&>div]:h-12'>
					<div>
						<Text variant='p' color='content-secondary'>
							جریمه دیرکرد (ریال):
						</Text>
						<Text variant='p' size='lg'>
							{penaltyValue
								? numberSeparator(penaltyValue!)
								: '-'}
						</Text>
					</div>
					<div>
						<Text variant='p' color='content-secondary'>
							اقساط (ریال):
						</Text>
						<Text variant='p' size='lg'>
							{installement
								? numberSeparator(installement!)
								: '-'}
						</Text>
					</div>
				</div>
			</div>

			<div className='p-4 fixed bottom-0 left-0 w-full bg-surface-main grid grid-cols-2 gap-4'>
				<Button
					label='ویرایش اطلاعات بانکی'
					fluid
					variant='outline'
					onClick={() => {
						setStep('bank');
					}}
				/>
				<Button
					label='ثبت درخواست'
					fluid
					onClick={handleSubmitReqeust}
				/>
			</div>
		</Container>
	);
};

export default LoanForm;
