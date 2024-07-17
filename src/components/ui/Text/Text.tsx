import { ITextProps } from './ITextProps';

const Text: React.FC<ITextProps> = ({
	variant = 'p',
	color = 'content-primary',
	align = 'right',
	weight = 400,
	size = 'sm',
	noWrap = false,
	className,
	id,
	htmlFor,
	children,
	itemProp,
}) => {
	const HTMLTAG: any = variant;

	const textClass = `
	${'text-' + color}
	${'text-[' + color + ']'}
    ${'font-[' + weight + ']'}
	${'text-' + align}
	${'text-' + size}
    ${noWrap ? 'text-nowrap' : 'text-wrap'}
	${className || ''}
	`;

	return (
		<HTMLTAG
			id={id}
			itemProp={itemProp}
			htmlFor={htmlFor}
			className={textClass}
		>
			{children}
		</HTMLTAG>
	);
};

export default Text;
