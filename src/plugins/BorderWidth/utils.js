/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module alignment/utils
 */

/**
 * The list of supported alignment options:
 *
 * * `'left'`,
 * * `'right'`,
 * * `'center'`,
 * * `'justify'`
 */
export const supportedOptions = [
	'',
	'1px',
	'2px',
	'3px',
	'4px',
	'5px',
	'10px'
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
	return border == '';
}
