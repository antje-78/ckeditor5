import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import BorderColorCommand from './border-color-command';
import {supportedOptions} from './utils';
import {BORDER, getSelectedBlocks} from '../utils';

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
				return false;
			}
		} );

		editor.conversion.for( 'downcast' ).attributeToAttribute( {
			model: 'borderColor',
			view: function( option ) {
				const allSelectedBlocks = getSelectedBlocks( this.editor );
				const borderAttribute = allSelectedBlocks.length > 0 ? allSelectedBlocks[ 0 ].getAttribute( BORDER ) : null;
				if ( !borderAttribute || !option )
					return { key: 'style', value: '' };

				const _value = {};
				const styleOption = borderAttribute.replace( '-tablerow', '' );
				_value[ 'border' + ( styleOption == 'all' ? '' : '-' + styleOption ) + '-color' ] = option ? option : 'black';

				return { key: 'style', value: _value };
			}.bind( this )
		} );

		editor.commands.add( 'borderColor', new BorderColorCommand( editor ) );
	}
}
