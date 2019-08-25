/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module alignment/alignmentui
 */

import ColorUI from '@ckeditor/ckeditor5-font/src/ui/colorui';

/**
 * The default alignment UI plugin.
 *
 * It introduces the `'alignment:left'`, `'alignment:right'`, `'alignment:center'` and `'alignment:justify'` buttons
 * and the `'alignment'` dropdown.
 *
 * @extends module:core/plugin~Plugin
 */
export default class BorderColorUi extends ColorUI {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		const t = editor.locale.t;

		super( editor, {
			commandName: 'borderColor',
			componentName: 'borderColor',
			dropdownLabel: t( 'Rahmenfarbe' )
		} );
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'BorderColorUI';
	}
}
