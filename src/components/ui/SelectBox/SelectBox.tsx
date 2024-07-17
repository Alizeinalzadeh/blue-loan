import { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { ISelectBoxProps } from './ISelectBoxProps';
import { Text } from '../Text';
import { Icon } from '../Icon';
import OutsideClickHandler from 'react-outside-click-handler';

const SelectBox = <T extends object>({
	label,
	id,
	options,
	optionsComponent,
	placeholder,
	fluid,
	disabled,
	modalTitle,
	className,
	value,
	onChange,
	loading,
	keyLabel,
	valueLabel,
	hasError,
	errorMessage,
	customSelectedComponent,
	fullHeight,
}: ISelectBoxProps<T>) => {
	const [showModal, setShowModal] = useState(false);
	const [optionsList, setOptionsList] = useState(options);
	const [inputHasError, setInputHasError] = useState(hasError);

	useEffect(() => {
		setOptionsList(options);
	}, [options]);

	useEffect(() => {
		if (value) {
			setInputHasError(false);
		} else {
			setInputHasError(hasError);
		}
	}, [hasError, value]);

	useEffect(() => {
		if (showModal) {
			if (value) {
				setShowModal(false);
			}
		}
	}, [value]);

	const handleToggleShowModal = () => {
		setShowModal(!showModal);
	};

	return (
		<OutsideClickHandler
			onOutsideClick={() => {
				setShowModal(false);
			}}
		>
			<div
				className={`relative flex flex-col gap-2 ${fluid ? 'w-full' : 'w-fit'}`}
			>
				{label && (
					<>
						{typeof label === 'string' ? (
							<Text variant='label'>{label}</Text>
						) : (
							<>{label}</>
						)}
					</>
				)}
				<div
					id={id}
					onClick={handleToggleShowModal}
					className={`relative bg-surface-secondary h-12 px-4 rounded-lg border flex justify-between gap-4 items-center hover:border-primary-main ${fluid ? 'w-full' : 'w-fit'} ${disabled ? 'cursor-auto pointer-events-none opacity-50' : 'cursor-pointer'} ${inputHasError ? 'border-negative-main' : 'border-transparent'} ${className || ''}`}
				>
					{value ? (
						customSelectedComponent ? (
							<>{customSelectedComponent}</>
						) : (
							<Text variant='span'>
								{value[valueLabel] as string}
							</Text>
						)
					) : (
						<Text variant='span' color='content-secondary'>
							{placeholder}
						</Text>
					)}

					<Icon
						name={'arrow/chav-down'}
						color='content'
						colorWeight='primary'
						className={showModal ? 'rotate-180' : 'rotate-0'}
						size='12px'
					/>
				</div>

				<>
					<Modal
						visible={showModal}
						onHide={handleToggleShowModal}
						title={modalTitle || label}
						closeOnEscape
						closeOnOutside
						className={`${fullHeight ? 'min-h-dvh' : 'h-fit'} `}
					>
						{loading ? (
							<div className='min-h-[300px]'>
								{/* TODO show loading shimmer */}
							</div>
						) : (
							<>
								{optionsComponent ? (
									<>{optionsComponent}</>
								) : (
									<>
										{optionsList?.length > 0 ? (
											<div className='flex flex-col gap-2 -mt-4'>
												{optionsList?.map(
													(option: any) => {
														return (
															<div
																className={`px-4 flex justify-start items-center h-12 ${value && value[valueLabel] === option[valueLabel] ? 'text-primary-main' : 'text-content-primary'}`}
																key={
																	option[
																		keyLabel
																	]
																}
																id={
																	option[
																		valueLabel
																	]
																}
																onClick={() => {
																	onChange(
																		option
																	);
																	handleToggleShowModal();
																}}
															>
																{
																	option[
																		valueLabel
																	]
																}
															</div>
														);
													}
												)}
											</div>
										) : (
											<div
												className={`px-4 flex justify-start items-center h-12`}
											>
												نتیجه‌ای یافت نشد
											</div>
										)}
									</>
								)}
							</>
						)}
					</Modal>
				</>

				{inputHasError && (
					<Text variant='span' color='negative-main'>
						{errorMessage || 'لطفا یکی از گزینه‌ها را انتخاب کنید'}
					</Text>
				)}
			</div>
		</OutsideClickHandler>
	);
};

export default SelectBox;
