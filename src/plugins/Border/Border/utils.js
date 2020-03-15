/**
 * The list of supported alignment options:
 *
 * * `'left'`,
 * * `'right'`,
 * * `'center'`,
 * * `'justify'`
 */
export const supportedOptions = [
	'no-border',
	'all',
	'left',
	'right',
	'top',
	'bottom',
	'all-tablerow',
	'left-tablerow',
	'right-tablerow',
	'top-tablerow',
	'bottom-tablerow'
];

/**
 * Checks whether the passed option is supported by {@link module:alignment/alignmentediting~BorderColorEditing}.
 *
 * @param {String} option The option value to check.
 * @returns {Boolean}
 */
export function isSupported( option ) {
	return supportedOptions.includes( option );
}

/**
 * Checks whether border is the default one.
 *
 * @param {String} border The name of the border to check.
 * @returns {Boolean}
 */
export function isDefault( border ) {
	// Right now only LTR is supported so the 'left' value is always the default one.
	return border === 'no-border';
}
