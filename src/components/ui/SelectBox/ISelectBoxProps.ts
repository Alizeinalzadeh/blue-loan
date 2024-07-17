import { ReactNode } from 'react';
export interface ISelectBoxProps<T> {
	label?: string | ReactNode;
	id: string;
	placeholder?: string | ReactNode;
	fluid?: boolean;
	className?: string;
	options: T[];
	optionsComponent?: ReactNode;
	customSelectedComponent?: ReactNode;
	disabled?: boolean;
	modalTitle?: string;
	hasError?: boolean;
	errorMessage?: string;
	value: T | null;
	onChange: (value: T) => void;
	loading?: boolean;
	keyLabel: keyof T;
	valueLabel: keyof T;
	fullHeight?: boolean;
}
