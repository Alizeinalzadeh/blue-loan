import { ReactNode } from 'react';

export interface IButtonProps {
	id?: string;
	label?: string | ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	disabled?: boolean;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	loading?: boolean;
	type?: 'button' | 'submit';
	rounded?: boolean;
	color?: 'primary';
	variant?: 'outline' | 'filled' | 'inline';
	leadingIcon?: React.ReactNode;
	helperIcon?: React.ReactNode;
	helperIconPosition?: 'right' | 'left';
	fluid?: boolean;
}
