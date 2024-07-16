export type variant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'span'
	| 'li'
	| 'label';
export type align = 'right' | 'left' | 'center' | 'justify';
export type weight =
	| 100
	| 200
	| 300
	| 400
	| 500
	| 600
	| 700
	| 800
	| 900
	| 950
	| 1000;
export type size =
	| 'xs'
	| 'sm'
	| 'base'
	| 'lg'
	| 'xl'
	| '2xl'
	| '3xl'
	| '4xl'
	| '5xl';

export interface ITextProps {
	children?: React.ReactNode;
	variant?: variant;
	align?: align;
	weight?: weight;
	size?: size;
	noWrap?: boolean;
	color?: string;
	className?: string;
	id?: string;
	htmlFor?: string;
	itemProp?: string;
}
