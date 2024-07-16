import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

const mockOnClick = jest.fn();

const defaultProps = {
	label: 'کلیک کنید',
	onClick: mockOnClick,
};

describe('Button Component', () => {
	it('renders the button with the provided label', () => {
		render(<Button {...defaultProps} />);
		const buttonElement = screen.getByText('کلیک کنید');
		expect(buttonElement).toBeInTheDocument();
	});

	it('calls the onClick callback when clicked', () => {
		render(<Button {...defaultProps} />);
		const buttonElement = screen.getByText('کلیک کنید');
		fireEvent.click(buttonElement);
		expect(mockOnClick).toHaveBeenCalled();
	});

	it('disables the button when loading is true', () => {
		render(<Button {...defaultProps} loading={true} />);
		const buttonElement = screen.getByText('کلیک کنید');
		expect(buttonElement).toBeDisabled();
	});

	it('applies the provided CSS classes', () => {
		render(<Button {...defaultProps} className='custom-class' />);
		const buttonElement = screen.getByText('کلیک کنید');
		expect(buttonElement).toHaveClass('custom-class');
	});

	it('displays a helper icon when provided', () => {
		render(
			<Button {...defaultProps} helperIcon={<div>Helper Icon</div>} />
		);
		const helperIconElement = screen.getByText('Helper Icon');
		expect(helperIconElement).toBeInTheDocument();
	});

	it('displays a leading icon when provided', () => {
		render(
			<Button {...defaultProps} leadingIcon={<div>Leading Icon</div>} />
		);
		const leadingIconElement = screen.getByText('Leading Icon');
		expect(leadingIconElement).toBeInTheDocument();
	});

	it('renders as a fluid button when fluid is true', () => {
		render(<Button {...defaultProps} fluid={true} />);
		const buttonElement = screen.getByText('کلیک کنید');
		expect(buttonElement).toHaveClass('fluid');
	});

	it('sets the title attribute', () => {
		render(<Button {...defaultProps} label='Button Label' />);
		const buttonElement = screen.getByText('Button Label');
		expect(buttonElement).toHaveAttribute('title', 'Button Label');
	});

	it('renders a loading indicator when loading is true', () => {
		render(<Button {...defaultProps} loading={true} />);
		const buttonElement = screen.getByText('کلیک کنید');
		expect(buttonElement).toBeDisabled();
	});

	it('displays the button in the specified size', () => {
		render(<Button {...defaultProps} size='sm' />);
		const buttonElement = screen.getByText('کلیک کنید');
		expect(buttonElement).toHaveClass('sm');
	});

	it('renders a rounded button when rounded is true', () => {
		render(<Button {...defaultProps} rounded={true} />);
		const buttonElement = screen.getByText('کلیک کنید');
		expect(buttonElement).toHaveClass('rounded');
	});

	it('changes the button type when type is provided', () => {
		render(<Button {...defaultProps} type='submit' />);
		const buttonElement = screen.getByText('کلیک کنید');
		expect(buttonElement).toHaveAttribute('type', 'submit');
	});

	it('disables the button when disabled is true', () => {
		render(<Button {...defaultProps} disabled={true} />);
		const buttonElement = screen.getByText('کلیک کنید');
		expect(buttonElement).toBeDisabled();
	});
});
