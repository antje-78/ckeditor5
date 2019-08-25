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
export const supportedOptions = {
	colors: [
		{
			color: 'hsl(0, 0%, 0%)',
			label: 'Black'
		},
		{
			color: 'hsl(0, 0%, 30%)',
			label: 'Dim grey'
		},
		{
			color: 'hsl(0, 0%, 60%)',
			label: 'Grey'
		},
		{
			color: 'hsl(0, 0%, 90%)',
			label: 'Light grey'
		},
		{
			color: 'hsl(0, 0%, 100%)',
			label: 'White',
			hasBorder: true
		},
		{
			color: 'hsl(0, 75%, 60%)',
			label: 'Red'
		},
		{
			color: 'hsl(30, 75%, 60%)',
			label: 'Orange'
		},
		{
			color: 'hsl(60, 75%, 60%)',
			label: 'Yellow'
		},
		{
			color: 'hsl(90, 75%, 60%)',
			label: 'Light green'
		},
		{
			color: 'hsl(120, 75%, 60%)',
			label: 'Green'
		},
		{
			color: 'hsl(150, 75%, 60%)',
			label: 'Aquamarine'
		},
		{
			color: 'hsl(180, 75%, 60%)',
			label: 'Turquoise'
		},
		{
			color: 'hsl(210, 75%, 60%)',
			label: 'Light blue'
		},
		{
			color: 'hsl(240, 75%, 60%)',
			label: 'Blue'
		},
		{
			color: 'hsl(270, 75%, 60%)',
			label: 'Purple'
		}
	],
	columns: 5
};

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
