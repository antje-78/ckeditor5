/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module alignment/alignment
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import Borderediting from './borderediting';
import Borderui from './borderui';

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
export default class Border extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ Borderediting, Borderui ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Border';
	}
}

/**
 * The configuration of the {@link module:alignment/alignment~BorderColor alignment feature}.
 *
 * Read more in {@link module:alignment/alignment~AlignmentConfig}.
 *
 * @member {module:alignment/alignment~AlignmentConfig} module:core/editor/editorconfig~EditorConfig#alignment
 */

/**
 * The configuration of the {@link module:alignment/alignment~BorderColor alignment feature}.
 *
 *		ClassicEditor
 *			.create( editorElement, {
 *				alignment: {
 *					options: [ 'left', 'right' ]
 *				}
 *			} )
 *			.then( ... )
 *			.catch( ... );
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor configuration options}.
 *
 * @interface AlignmentConfig
 */

/**
 * Available alignment options.
 *
 * The available options are: `'left'`, `'right'`, `'center'` and `'justify'`. Other values are ignored.
 *
 * **Note:** It is recommended to always use `'left'` as it is the default value which the user should
 * normally be able to choose.
 *
 *		ClassicEditor
 *			.create( editorElement, {
 *				alignment: {
 *					options: [ 'left', 'right' ]
 *				}
 *			} )
 *			.then( ... )
 *			.catch( ... );
 *
 * See the demo of {@glink features/text-alignment#configuring-alignment-options custom alignment options}.
 *
 * @member {Array.<String>} module:alignment/alignment~AlignmentConfig#options
 */
