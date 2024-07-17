// @ts-nocheck
'use client';
import { ReactSVG } from 'react-svg';
import styled, { css } from 'styled-components';
import { IIconProps } from './IIconProps';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindFile from './../../../../tailwind.config';
const tailwindConfig = resolveConfig(tailwindFile);

const StyledSVGIconStroke = styled(ReactSVG)`
	svg {
		${({ size }) =>
			size &&
			css`
				width: ${size};
				height: ${size};
			`}
		path {
			${({ color }) =>
				color &&
				css`
					stroke: ${color};
				`}
		}
		g {
			path {
				${({ color }) =>
					color &&
					css`
						stroke: ${color};
					`}
			}
		}
	}
`;

const Icon: React.FC<IIconProps> = ({
	name,
	size = '24px',
	children,
	color,
	colorWeight,
	staticColor,
	className,
	id,
}) => {
	let tailwindColor = '';

	if (color && colorWeight) {
		tailwindColor =
			color && colorWeight
				? tailwindConfig.theme?.colors[color][colorWeight]
				: null;
	}

	if (staticColor) {
		tailwindColor = staticColor;
	}

	if (!staticColor && !color && !colorWeight) {
		return (
			<StyledSVGIconStroke
				wrapper='span'
				className={className || ''}
				src={`/icons/${name}.svg?type=svg`}
				size={size}
			>
				{children}
			</StyledSVGIconStroke>
		);
	}

	return (
		<StyledSVGIconStroke
			id={id}
			wrapper='span'
			className={className || ''}
			src={`/icons/${name}.svg?type=svg`}
			color={tailwindColor}
			size={size}
		>
			{children}
		</StyledSVGIconStroke>
	);
};

export default Icon;
