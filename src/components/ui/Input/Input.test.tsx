import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';
import { IInputProps } from './IInputProps';

const defaultProps: IInputProps = {
	label: 'Username',
	type: 'text',
	name: 'username',
	placeholder: 'Enter your username',
	value: '',
	ltr: false,
	helperIcon: <span>🛈</span>,
	size: 'md',
	rounded: true,
	disabled: false,
	readOnly: false,
	required: false,
	hasError: false,
	fluid: false,
	errorMessage: 'This field is required',
	onChange: jest.fn(),
	onBlur: jest.fn(),
	id: 'username-input',
	autoFocus: false,
	parentCustomClass: 'custom-parent-class',
	labelCustomClass: 'custom-label-class',
	errorCustomClass: 'custom-error-class',
};

describe('Input Component', () => {
	it('renders the input with label and helper icon', () => {
		render(<Input {...defaultProps} />);
		const inputElement = screen.getByPlaceholderText('Enter your username');
		const labelElement = screen.getByText('Username');
		const helperIconElement = screen.getByText('🛈');
		expect(inputElement).toBeInTheDocument();
		expect(labelElement).toBeInTheDocument();
		expect(helperIconElement).toBeInTheDocument();
	});

	it('calls the onChange callback when the input changes', () => {
		render(<Input {...defaultProps} />);
		const inputElement = screen.getByPlaceholderText('Enter your username');
		fireEvent.change(inputElement, { target: { value: 'test' } });
		expect(defaultProps.onChange).toHaveBeenCalled();
	});

	it('disables the input when disabled is true', () => {
		render(<Input {...defaultProps} disabled={true} />);
		const inputElement = screen.getByPlaceholderText('Enter your username');
		expect(inputElement).toBeDisabled();
	});

	it('applies the provided CSS classes', () => {
		render(<Input {...defaultProps} className='custom-class' />);
		const inputElement = screen.getByPlaceholderText('Enter your username');
		expect(inputElement).toHaveClass('custom-class');
	});

	it('displays a helper icon when provided', () => {
		render(<Input {...defaultProps} helperIcon={<span>🛈</span>} />);
		const helperIconElement = screen.getByText('🛈');
		expect(helperIconElement).toBeInTheDocument();
	});
});
