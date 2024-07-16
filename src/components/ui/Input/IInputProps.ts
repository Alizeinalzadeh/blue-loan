import React, { ReactNode } from 'react';

export interface IInputProps {
	name: string;
	label?: string | ReactNode;
	type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'search';
	inputMode?:
		| 'decimal'
		| 'email'
		| 'none'
		| 'numeric'
		| 'search'
		| 'tel'
		| 'text'
		| 'url';
	className?: string;
	placeholder?: string;
	value?: string;
	ltr?: boolean;
	helperIcon?: React.ReactNode;
	helperIconPosition?: 'left' | 'right';
	size?: 'sm' | 'md' | 'lg' | 'xl';
	rounded?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	required?: boolean;
	hasError?: boolean;
	fluid?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	id?: string;
	errorMessage?: string;
	autoFocus?: boolean;
	parentCustomClass?: string;
	labelCustomClass?: string;
	errorCustomClass?: string;
	style?: React.CSSProperties;
	regex?: RegExp;
	customRegexError?: string;
}
