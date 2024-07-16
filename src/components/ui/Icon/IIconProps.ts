import { ReactNode } from 'react';

export interface IIconProps {
	name: string;
	size?: string;
	children?: ReactNode;
	color?: string;
	colorWeight?: string;
	staticColor?: string;
	className?: string;
	id?: string;
}
