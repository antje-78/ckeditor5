/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module alignment/alignmentediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import Bordercommand from './bordercommand';
import { isDefault, isSupported, supportedOptions } from './utils';

/**
 * The alignment editing feature. It introduces the {@link module:alignment/alignmentcommand~BorderColorCommand command} and adds
 * the `alignment` attribute for block elements in the {@link module:engine/model/model~Model model}.
 * @extends module:core/plugin~Plugin
 */
export default class Borderediting extends Plugin {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		editor.config.define( 'border', {
			options: [ ...supportedOptions ]
		} );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;

		// Filter out unsupported options.
		const enabledOptions = editor.config.get( 'border.options' ).filter( isSupported );

		// Allow alignment attribute on all blocks.
		schema.extend( '$block', { allowAttributes: 'border' } );
		editor.model.schema.setAttributeProperties( 'border', { isFormatting: true } );
		editor.model.schema.addAttributeCheck( ( context, attributeName ) => {
			if ( context.endsWith( 'table' ) || context.endsWith( 'tableRow' ) || context.endsWith( 'tableCell' )) {
				return true;
			}
		} );
		const definition = _buildDefinition( enabledOptions.filter( option => !isDefault( option ) ) );

		editor.conversion.attributeToAttribute( definition );

		editor.commands.add( 'border', new Bordercommand( editor ) );
	}
}

// Utility function responsible for building converter definition.
// @private
function _buildDefinition( options ) {
	const definition = {
		model: {
			key: 'border',
			values: options.slice()
		},
		view: {}
	};

	for ( const option of options ) {
		const value = {};
		const styleOption = option.replace( '-tablerow', '' );
		value[ 'border' + ( styleOption == 'all' ? '' : '-' + styleOption ) + '-style' ] = 'solid';
		// value[ 'border' + ( styleOption == 'all' ? '' : '-' + styleOption ) + '-color' ] = 'black';
		definition.view[ option ] = {
			key: 'style',
			value: value
		};
	}

	return definition;
}
