/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module alignment/alignmentediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import BorderColorCommand from './border-color-command';
import { isDefault, isSupported, supportedOptions } from './utils';

/**
 * The alignment editing feature. It introduces the {@link module:alignment/alignmentcommand~BorderColorCommand command} and adds
 * the `alignment` attribute for block elements in the {@link module:engine/model/model~Model model}.
 * @extends module:core/plugin~Plugin
 */
export default class BorderColorEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		editor.config.define( 'borderColor', supportedOptions );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;

		// Filter out unsupported options.
		const enabledOptions = editor.config.get( 'borderColor.colors' );

		// Allow alignment attribute on all blocks.
		schema.extend( '$block', { allowAttributes: 'borderColor' } );
		editor.model.schema.setAttributeProperties( 'borderColor', { isFormatting: true } );
		editor.model.schema.addAttributeCheck( ( context, attributeName ) => {
			if ( context.endsWith( 'table' ) || context.endsWith( 'tableRow' ) || context.endsWith( 'tableCell' )) {
				return true;
			}
		} );
		const definition = _buildDefinition( enabledOptions.filter( option => !isDefault( option ) ) );

		editor.conversion.attributeToAttribute( definition );

		editor.commands.add( 'borderColor', new BorderColorCommand( editor ) );
	}
}

// Utility function responsible for building converter definition.
// @private
function _buildDefinition( options ) {
	const definition = {
		model: {
			key: 'borderColor',
			values: options.slice()
		},
		view: {}
	};

	for ( const option of options ) {
		const _def = { key: 'style', value: {} };
		_def.value[ 'border-color' ] = option.color;
		definition.view[ option ] = _def;
	}

	return definition;
}
