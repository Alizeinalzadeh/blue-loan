import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Text from './Text';
import { ITextProps } from './ITextProps';

const defaultProps: ITextProps = {
	variant: 'p',
	color: 'text-content-primary',
	align: 'right',
	weight: 500,
	size: 'base',
	noWrap: false,
	className: 'custom-class',
	id: 'text-id',
	htmlFor: 'text-input',
	children: 'Hello, World!',
};

describe('Text Component', () => {
	it('renders text with specified props', () => {
		const { container } = render(<Text {...defaultProps} />);
		const textElement = container.querySelector('p')!;
		expect(textElement).toHaveClass('text-content-primary');
		expect(textElement).toHaveClass('custom-class');
		expect(textElement).toHaveAttribute('id', 'text-id');
		expect(textElement).toHaveAttribute('for', 'text-input');
		expect(textElement.textContent).toBe('Hello, World!');
		expect(textElement).toHaveClass('title-average');
		expect(textElement).toHaveClass('english');
	});

	it('renders a different HTML tag with the "variant" prop', () => {
		const { container } = render(<Text {...defaultProps} variant='h2' />);
		const h2Element = container.querySelector('h2');
		expect(h2Element).toBeInTheDocument();
	});
});
