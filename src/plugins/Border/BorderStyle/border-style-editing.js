/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module alignment/alignmentediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import BorderStyleCommand from './border-style-command';
import {isSupported, supportedOptions} from './utils';
import {BORDER, getSelectedBlocks} from '../utils';

/**
 * The alignment editing feature. It introduces the {@link module:alignment/alignmentcommand~BorderColorCommand command} and adds
 * the `alignment` attribute for block elements in the {@link module:engine/model/model~Model model}.
 * @extends module:core/plugin~Plugin
 */
export default class BorderStyleEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		editor.config.define( 'borderStyle', {
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
		const enabledOptions = editor.config.get( 'borderStyle.options' ).filter( isSupported );

		// Allow alignment attribute on all blocks.
		schema.extend( '$block', { allowAttributes: 'borderStyle' } );
		editor.model.schema.setAttributeProperties( 'borderStyle', { isFormatting: true } );
		editor.model.schema.addAttributeCheck( ( context, attributeName ) => {
			if ( context.endsWith( 'table' ) || context.endsWith( 'tableRow' ) || context.endsWith( 'tableCell' )) {
				return false;
			}
		} );

		editor.conversion.for( 'downcast' ).attributeToAttribute( {
			model: 'borderStyle',
			view: function( option ) {
				const selectedBlocks = getSelectedBlocks( this.editor );
				const borderAttribute = selectedBlocks[ 0 ].getAttribute( BORDER );

				if ( !borderAttribute )
					return { key: 'style', value: '' };

				const _value = {};
				const styleOption = borderAttribute.replace( '-tablerow', '' );
				_value[ 'border' + ( styleOption == 'all' ? '' : '-' + styleOption ) + '-style' ] = option ? option : 'solid';
				return { key: 'style', value: _value };
			}.bind( this )
		} );

		editor.commands.add( 'borderstyle', new BorderStyleCommand( editor ) );
	}
}
