import React, { useEffect, useState } from 'react';
import { IInputProps } from './IInputProps';
import classes from './Input.module.scss';
import Text from '@/components/ui/Text/Text';

const Input: React.FC<IInputProps> = ({
	label,
	type = 'text',
	inputMode = 'text',
	name,
	className,
	placeholder,
	value,
	ltr,
	helperIcon,
	helperIconPosition = 'right',
	size = 'md',
	rounded,
	disabled,
	readOnly,
	required,
	fluid,
	errorMessage,
	onChange,
	onBlur,
	id,
	autoFocus,
	parentCustomClass,
	labelCustomClass,
	errorCustomClass,
	hasError,
	style,
	regex,
	customRegexError,
}) => {
	const [inputValue, setInputValue] = useState(value);
	const [inputErrorMessage, setInputErrorMessage] = useState<string | null>(
		errorMessage!
	);
	const [inputHasError, setInputHasError] = useState(hasError);

	useEffect(() => {
		setInputHasError(hasError);
		setInputErrorMessage(errorMessage!);
	}, [hasError, errorMessage]);

	useEffect(() => {
		setInputValue(value);
		if (
			regex &&
			value &&
			value !== undefined &&
			value !== '' &&
			value !== 'null'
		) {
			if (!regex.test(`${value}`)) {
				if (customRegexError) {
					setInputErrorMessage(customRegexError);
				} else {
					setInputErrorMessage(
						errorMessage || 'مقدار وارد شده نامعتبر است'
					);
				}
				setInputHasError(true);
			} else {
				if (hasError) {
					setInputHasError(true);
				} else {
					setInputHasError(false);
				}
			}
		}
	}, [value]);

	const parentClass = `
	${classes.parent}
	${fluid ? classes.fluid : ''}
	${parentCustomClass || ''}
	`;

	const inputClass = `
	${classes.input}
	${rounded ? classes.rounded : ''}
	${fluid ? classes.fluid : ''}
	${ltr ? classes.ltr : ''}
	${size ? classes[size] : ''}
	${inputHasError ? classes.error : ''}
	${helperIcon ? classes['input-helper-' + helperIconPosition] : ''}
	${className || ''}
	`;

	const helperClass = `
	${classes.helper}
	${size ? classes[`helper-${size}`] : ''}
	${
		helperIconPosition
			? classes[`helper-${helperIconPosition}`]
			: classes['helper-right']
	}
	${hasError && errorMessage && 'bottom-[26px]'}`;

	return (
		<div className={parentClass}>
			{label && (
				<>
					{typeof label === 'string' ? (
						<Text
							variant='label'
							htmlFor={id}
							size='sm'
							className={`${labelCustomClass || ''}`}
						>
							{label}
							{required && (
								<Text
									variant='span'
									className='mr-1'
									color='negative-main'
								>
									*
								</Text>
							)}
						</Text>
					) : (
						<>{label}</>
					)}
				</>
			)}

			<input
				type={type}
				id={id}
				inputMode={inputMode}
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
				value={inputValue || ''}
				className={inputClass}
				disabled={disabled}
				readOnly={readOnly}
				required={required}
				autoFocus={autoFocus}
				style={style}
			/>

			{helperIcon && <div className={helperClass}>{helperIcon}</div>}
			{inputErrorMessage && inputHasError && (
				<Text
					variant='span'
					size='sm'
					color='negative-main'
					className={`${classes['error-message']} ${
						errorCustomClass || ''
					}`}
				>
					{inputErrorMessage}
				</Text>
			)}
		</div>
	);
};

export default Input;
