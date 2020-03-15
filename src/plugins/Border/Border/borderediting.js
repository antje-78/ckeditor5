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
import { getSelectedBlocks } from '../utils';

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
		editor.model.schema.setAttributeProperties( 'border', { isFormatting: true, copyOnEnter: true } );
		editor.model.schema.addAttributeCheck( ( context, attributeName ) => {
			if ( context.endsWith( 'table' ) || context.endsWith( 'tableRow' ) || context.endsWith( 'tableCell' ))
				return false;
			if (context.endsWith('image'))
				return true;
			// console.log('Context:', context);
		} );

		editor.conversion.for( 'downcast' ).attributeToAttribute( {
			model: 'border',
			view: function( option ) {
				if (option == null)
					return { key: 'style' };

				const selectedBlocks = getSelectedBlocks( this.editor );
				const _value = {};
				const styleOption = option.replace( '-tablerow', '' );
				const borderStyle = selectedBlocks[0].getAttribute( 'borderStyle' );
				// _value[ 'border' + ( styleOption == 'all' ? '' : '-' + styleOption ) + '-style' ] = borderStyle ? borderStyle : 'solid';

				const borderColor = selectedBlocks[0].getAttribute( 'borderColor' );
				// if ( borderColor || !( borderStyle == 'inset' || borderStyle == 'outset' ) )
				// 	_value[ 'border' + ( styleOption == 'all' ? '' : '-' + styleOption ) + '-color' ] = borderColor ? borderColor : 'black';

				const borderWidth = selectedBlocks[0].getAttribute( 'borderWidth' );
				// if ( borderWidth || !( borderStyle == 'inset' || borderStyle == 'outset' ) )
				// 	_value[ 'border' + ( styleOption == 'all' ? '' : '-' + styleOption ) + '-width' ] = borderWidth ? borderWidth : 'black';

				if ( styleOption == 'no-border' )
					return { key: 'style', value: '' };

				_value[ 'border' + ( styleOption == 'all' ? '' : '-' + styleOption ) ] =
						( borderWidth ? borderWidth : '1px' ) + ' ' +
						( borderStyle ? borderStyle : 'solid' ) + ' ' +
						( borderColor ? borderColor : 'black' );
				return { key: 'style', value: _value };
			}.bind(this)
		} );
		editor.commands.add( 'border', new Bordercommand( editor ) );
	}
}

