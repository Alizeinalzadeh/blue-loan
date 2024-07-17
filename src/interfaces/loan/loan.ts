export interface ILoanItemRepaymentType {
	name: string;
	value: number;
}
export interface ILoanItem {
	id: string;
	createdDate: string;
	name: string;
	repaymentType: ILoanItemRepaymentType[];
	amount: number;
	interestRate: number;
	penaltyRate: number;
}

export type ILoanSteps = 'personal' | 'bank' | 'loan';

export interface ILoanForm {
	name: string;
	last_name: string;
	national_number: string;
	birth_date: string;
	phone_number: string;
	selectedLoan: string;
	selectedRepaymentType: string;
	amount: string;
	account_number: string;
	iban: string;
	averageBalance: string;
}
