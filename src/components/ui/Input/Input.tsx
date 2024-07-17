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
}) => {
	const [inputError, setInputError] = useState(hasError);
	useEffect(() => {
		setInputError(hasError);
	}, [hasError]);

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
	${inputError ? classes.error : ''}
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
	${inputError && errorMessage && 'bottom-[30px]'}`;

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
				defaultValue={value || ''}
				className={inputClass}
				disabled={disabled}
				readOnly={readOnly}
				required={required}
				autoFocus={autoFocus}
				style={style}
				aria-label={typeof label === 'string' ? label : name}
				aria-disabled={disabled}
				aria-required={required}
				aria-invalid={inputError}
				aria-readonly={readOnly}
			/>

			{helperIcon && <div className={helperClass}>{helperIcon}</div>}
			{errorMessage && inputError && (
				<Text
					variant='span'
					size='sm'
					color='negative-main'
					className={`${classes['error-message']} ${
						errorCustomClass || ''
					}`}
				>
					{errorMessage}
				</Text>
			)}
		</div>
	);
};

export default Input;
