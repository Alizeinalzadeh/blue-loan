'use client';
import { IButtonProps } from './IButtonProps';
import classes from './Button.module.scss';

const Button: React.FC<IButtonProps> = ({
	label,
	onClick,
	loading,
	color = 'primary',
	variant = 'filled',
	helperIcon,
	helperIconPosition = 'left',
	className,
	size = 'md',
	leadingIcon,
	rounded = false,
	fluid = false,
	id,
	type = 'button',
	disabled = false,
}) => {
	const mainClass = `
    ${classes.button}
    ${variant ? classes[`${variant}-${color}`] : ''}
    ${size ? classes[size] : ''}
    ${leadingIcon ? classes[`${size}-leading`] : ''}
    ${helperIcon && helperIconPosition ? classes[helperIconPosition] : ''}
    ${fluid ? classes.fluid : ''}
    ${rounded ? classes.rounded : ''}
	${disabled ? classes.disabled : ''}
    ${className}
    `;

	const labelType = leadingIcon ? 'icon' : 'label';
	return (
		<button
			id={id}
			type={type}
			onClick={onClick}
			disabled={loading || disabled}
			className={mainClass}
			title={typeof label === 'string' ? label : ''}
			aria-disabled={loading || disabled}
			aria-label={typeof label === 'string' ? label : ''}
		>
			{labelType === 'icon' ? leadingIcon : label}
			{loading && (
				<div className={`${mainClass}  ${classes.loading}`}>
					<div
						className={`${leadingIcon ? classes['normal-loading'] : classes['leading-loading']}`}
					>
						{leadingIcon && <div></div>}
					</div>
				</div>
			)}
		</button>
	);
};

export default Button;
