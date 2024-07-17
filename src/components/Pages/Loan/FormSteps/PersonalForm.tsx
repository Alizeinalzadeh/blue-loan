import Container from '@/components/Layout/Global/Container/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import SelectBox from '@/components/ui/SelectBox/SelectBox';
import { ILoanItem } from '@/interfaces/loan/loan';
import { useLoansContext } from '@/store/loan/LoanContext';
import { stringLengthValidation } from '@/utils/validations';
import {
	digitsFaToEn,
	phoneNumberValidator,
	verifyIranianNationalId,
} from '@persian-tools/persian-tools';
import { produce } from 'immer';

const PersonalForm = () => {
	const {
		loanForm,
		setLoanForm,
		loansList,
		loansStatus,
		selectedLoan,
		setSelectedLoan,
		handleGotoBankStep,
		errors,
		setErrors,
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
					name='name'
					label='نام'
					value={loanForm.name}
					placeholder='نام خود را وارد کنید'
					onChange={(e) => {
						setLoanForm({
							...loanForm,
							name: e.target.value,
						});
						if (errors.name) {
							setErrors(
								produce((draft) => {
									draft.name = !stringLengthValidation(
										e.target.value,
										2
									);
								})
							);
						}
					}}
					hasError={errors.name}
					errorMessage='لطفا نام خود را وارد کنید'
				/>
				<Input
					name='lastName'
					label='نام خانوادگی'
					value={loanForm.last_name}
					placeholder='نام خانوادگی خود را وارد کنید'
					onChange={(e) => {
						setLoanForm({
							...loanForm,
							last_name: e.target.value,
						});
						if (errors.last_name) {
							setErrors(
								produce((draft) => {
									draft.last_name = !stringLengthValidation(
										e.target.value,
										2
									);
								})
							);
						}
					}}
					hasError={errors.last_name}
					errorMessage='لطفا نام خانوادگی خود را وارد کنید'
				/>
				<Input
					name='nationalNumber'
					label='کد ملی'
					value={loanForm.national_number}
					placeholder='کد ملی خود را وارد کنید'
					inputMode='numeric'
					onChange={(e) => {
						setLoanForm({
							...loanForm,
							national_number: digitsFaToEn(e.target.value),
						});
						if (errors.national_number) {
							setErrors(
								produce((draft) => {
									draft.national_number =
										!verifyIranianNationalId(
											e.target.value
										)!;
								})
							);
						}
					}}
					hasError={errors.national_number}
					errorMessage='لطفا کد ملی خود را وارد کنید'
					ltr
				/>
				<Input
					name='phoneNumber'
					label='شماره تلفن'
					inputMode='numeric'
					value={loanForm.phone_number}
					placeholder='شماره تلفن خود را وارد کنید'
					ltr
					onChange={(e) => {
						setLoanForm({
							...loanForm,
							phone_number: digitsFaToEn(e.target.value),
						});
						if (errors.phone_number) {
							setErrors(
								produce((draft) => {
									draft.phone_number = !phoneNumberValidator(
										e.target.value
									);
								})
							);
						}
					}}
					hasError={errors.phone_number}
					errorMessage='لطفا شماره تلفن خود را وارد کنید'
				/>
				{/* TODO implement date picker (we could use native calendar or react date pickers but there is no enough time and it's just a demo) */}
				<Input
					name='birthDate'
					label='تاریخ تولد'
					value={loanForm.birth_date}
					placeholder='تاریخ تولد خود را وارد کنید'
					onChange={(e) => {
						setLoanForm({
							...loanForm,
							birth_date: digitsFaToEn(e.target.value),
						});
						if (errors.birth_date) {
							setErrors(
								produce((draft) => {
									draft.birth_date = !stringLengthValidation(
										e.target.value,
										8
									);
								})
							);
						}
					}}
					hasError={errors.birth_date}
					errorMessage='لطفا تاریخ تولد خود را وارد کنید'
				/>
			</div>
			<div className='p-4 fixed bottom-0 left-0 w-full bg-surface-main'>
				<Button label='مرحله بعدی' fluid onClick={handleGotoBankStep} />
			</div>
		</Container>
	);
};

export default PersonalForm;
