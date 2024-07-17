/**
 * Formats a number with a separator for thousands and optionally for decimal places.
 *
 * @param {number} number - The number to be formatted.
 * @param {number} decimal - The number of decimal places (default: 0).
 * @return {string} The formatted number as a string.
 */
export const numberSeparator = (
	number: number,
	decimal: number = 0
): string => {
	if (isNaN(number)) {
		return `${number}`;
	}

	const options: any = {
		minimumFractionDigits: 0,
		maximumFractionDigits: decimal,
		style: 'decimal',
		roundingMode: 'floor',
	};

	return number.toLocaleString(undefined, options);
};
