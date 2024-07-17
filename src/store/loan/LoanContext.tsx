'use client';
import useLoanList from '@/components/Pages/Loan/List/LoansList/useLoanList';
import {
	ILoanForm,
	ILoanItem,
	ILoanItemRepaymentType,
	ILoanSteps,
} from '@/interfaces/loan/loan';
import { IApiResponseStatuses } from '@/interfaces/share/api';
import { LoanService } from '@/services/loan/LoanService';
import { stringLengthValidation } from '@/utils/validations';
import {
	isShebaValid,
	phoneNumberValidator,
	verifyIranianNationalId,
} from '@persian-tools/persian-tools';
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { toast } from 'react-toastify';
import { useImmer } from 'use-immer';

interface LoansContextType {
	loansList: ILoanItem[] | null;
	loansStatus: IApiResponseStatuses;
	step: ILoanSteps;
	loanForm: ILoanForm;
	penaltyValue: number | null;
	installement: number | null;
	selectedLoan: ILoanItem | null;
	selectedRepaymentType: ILoanItemRepaymentType | null;
	setStep: React.Dispatch<React.SetStateAction<ILoanSteps>>;
	setLoanForm: React.Dispatch<React.SetStateAction<ILoanForm>>;
	setPenaltyValue: React.Dispatch<React.SetStateAction<number | null>>;
	setInstallement: React.Dispatch<React.SetStateAction<number | null>>;
	setSelectedLoan: React.Dispatch<React.SetStateAction<ILoanItem | null>>;
	setSelectedRepaymentType: React.Dispatch<
		React.SetStateAction<ILoanItemRepaymentType | null>
	>;

	handleGotoBankStep: () => void;
	handleGotoLoanStep: () => void;
	stepsLoading: boolean;
	errors: {
		[key: string]: boolean;
	};

	setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
	handleSubmitReqeust: () => void;
}

const LoansContext = createContext<LoansContextType | undefined>(undefined);

interface LoansContextProviderProps {
	children: React.ReactNode;
}

export const LoansContextProvider: React.FC<LoansContextProviderProps> = ({
	children,
}) => {
	const initialLoanForm: ILoanForm = {
		name: '',
		last_name: '',
		national_number: '',
		birth_date: '',
		phone_number: '',
		selectedLoan: '',
		selectedRepaymentType: '',
		amount: '',
		account_number: '',
		averageBalance: '',
		iban: '',
	};
	const initialErrors = {
		name: false,
		last_name: false,
		national_number: false,
		birth_date: false,
		phone_number: false,
		selectedLoan: false,
		selectedRepaymentType: false,
		amount: false,
		account_number: false,
		averageBalance: false,
		iban: false,
	};
	const loanServiceInstance = new LoanService();
	const { loansList, status: loansStatus } = useLoanList();
	const [step, setStep] = useState<ILoanSteps>('personal');
	const [stepsLoading, setStepsLoading] = useState(false);
	const [loanForm, setLoanForm] = useState<ILoanForm>(initialLoanForm);
	const [penaltyValue, setPenaltyValue] = useState<number | null>(null);
	const [installement, setInstallement] = useState<number | null>(null);
	const [selectedLoan, setSelectedLoan] = useState<ILoanItem | null>(null);
	const [selectedRepaymentType, setSelectedRepaymentType] =
		useState<ILoanItemRepaymentType | null>(null);

	const [errors, setErrors] = useImmer<{ [key: string]: boolean }>(
		initialErrors
	);

	useEffect(() => {
		const latestStep = window.localStorage.getItem('loan-step');
		const latestFormData = window.localStorage.getItem('form-data');
		if (latestStep) {
			setStep(latestStep as ILoanSteps);
		}

		if (latestFormData) {
			setLoanForm(JSON.parse(latestFormData));
			loansList?.map((loan) => {
				if (+loan.id === +loanForm.selectedLoan) {
					setSelectedLoan(loan);
				}
				loan.repaymentType.map((repaymentType) => {
					if (
						+repaymentType.value === +loanForm.selectedRepaymentType
					) {
						setSelectedRepaymentType(repaymentType);
					}
				});
			});
		}
	}, [loansList]);

	const handlePersonalFormValidation = () => {
		let hasFormError = false;
		if (!stringLengthValidation(loanForm.name, 2)) {
			setErrors((initial) => {
				initial.name = true;
			});
			hasFormError = true;
		}

		if (!stringLengthValidation(loanForm.last_name, 2)) {
			setErrors((initial) => {
				initial.last_name = true;
			});
			hasFormError = true;
		}

		if (!verifyIranianNationalId(loanForm.national_number)) {
			setErrors((initial) => {
				initial.national_number = true;
			});
			hasFormError = true;
		}

		if (!stringLengthValidation(loanForm.birth_date, 8)) {
			setErrors((initial) => {
				initial.birth_date = true;
			});
			hasFormError = true;
		}

		if (!phoneNumberValidator(loanForm.phone_number)) {
			setErrors((initial) => {
				initial.phone_number = true;
			});
			hasFormError = true;
		}
		if (!selectedLoan) {
			setErrors((initial) => {
				initial.selectedLoan = true;
			});
			hasFormError = true;
		}
		return !hasFormError;
	};

	const handleBankFormValidation = () => {
		let hasFormError = false;
		if (!stringLengthValidation(loanForm.account_number, 8)) {
			setErrors((initial) => {
				initial.account_number = true;
			});
			hasFormError = true;
		}
		if (!stringLengthValidation(loanForm.averageBalance, 1)) {
			setErrors((initial) => {
				initial.averageBalance = true;
			});
			hasFormError = true;
		}
		if (!isShebaValid(loanForm.iban!)) {
			setErrors((initial) => {
				initial.iban = true;
			});
			hasFormError = true;
		}

		return !hasFormError;
	};

	const handleLoanFormValidation = () => {
		let hasFormError = false;
		if (!selectedRepaymentType) {
			setErrors((initial) => {
				initial.selectedRepaymentType = true;
			});
			hasFormError = true;
		}
		return !hasFormError;
	};

	const handleGotoBankStep = () => {
		setStepsLoading(true);
		if (handlePersonalFormValidation()) {
			setStep('bank');
			window.localStorage.setItem('loan-step', 'bank');
			window.localStorage.setItem('form-data', JSON.stringify(loanForm));
		}
		setStepsLoading(false);
	};

	const handleGotoLoanStep = () => {
		setStepsLoading(true);
		if (handleBankFormValidation()) {
			setStep('loan');
			window.localStorage.setItem('loan-step', 'loan');
			window.localStorage.setItem('form-data', JSON.stringify(loanForm));
		}
		setStepsLoading(false);
	};

	const handleSubmitReqeust = () => {
		if (
			handleBankFormValidation() &&
			handlePersonalFormValidation() &&
			handleLoanFormValidation()
		) {
			setStepsLoading(true);
			loanServiceInstance
				.createLoanRequest(loanForm)
				.then((res) => {
					toast.success(res.message);
					setStep('personal');
					window.localStorage.removeItem('loan-step');
					window.localStorage.removeItem('form-data');
					setLoanForm(initialLoanForm);
					setErrors(initialErrors);
				})
				.catch((error) => {
					toast.error(
						error?.response?.data?.data?.message ||
							'خطایی رخ داده است'
					);
				});
		}
	};

	const calculatePenaltyAndInstallement = useCallback(() => {
		if (selectedLoan) {
			setPenaltyValue(
				(+selectedLoan.amount * +selectedLoan?.penaltyRate!) / 100
			);

			setInstallement(
				(+selectedLoan.amount +
					(+selectedLoan.amount * +selectedLoan?.interestRate!) /
						100) /
					+selectedRepaymentType?.value!
			);
		}
	}, [selectedLoan, selectedRepaymentType]);

	useEffect(() => {
		calculatePenaltyAndInstallement();
	}, [calculatePenaltyAndInstallement]);

	const loansContextValue: LoansContextType = {
		loansList,
		loansStatus,
		installement,
		loanForm,
		penaltyValue,
		selectedLoan,
		selectedRepaymentType,
		setInstallement,
		setLoanForm,
		setPenaltyValue,
		setSelectedLoan,
		setSelectedRepaymentType,
		setStep,
		step,
		handleGotoBankStep,
		handleGotoLoanStep,
		stepsLoading,
		errors,
		setErrors,
		handleSubmitReqeust,
	};

	return (
		<LoansContext.Provider value={loansContextValue}>
			{children}
		</LoansContext.Provider>
	);
};

export const useLoansContext = (): LoansContextType => {
	const context = useContext(LoansContext);
	if (!context) {
		throw new Error(
			'useLoansContext must be used within a LoansContextProvider'
		);
	}
	return context;
};
