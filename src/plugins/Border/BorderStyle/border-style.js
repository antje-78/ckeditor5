/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module alignment/alignment
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import BorderStyleEditing from './border-style-editing';
import BorderStyleUi from './border-style-ui';

/**
 * The text alignment plugin.
 *
 * For a detailed overview, check the {@glink features/text-alignment Text alignment feature documentation}
 * and the {@glink api/alignment package page}.
 *
 * This is a "glue" plugin which loads the {@link module:alignment/alignmentediting~BorderColorEditing} and
 * {@link module:alignment/alignmentui~BorderColorUi} plugins.
 *
 * @extends module:core/plugin~Plugin
 */
export default class BorderStyle extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ BorderStyleEditing, BorderStyleUi ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'BorderStyle';
	}
}
