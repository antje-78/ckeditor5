import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import BorderFillColorCommand from './border-fill-color-command';
import { isDefault, isSupported, supportedOptions } from './utils';

export default class BorderFillColorEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		editor.config.define( 'borderFillColor', supportedOptions );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;

		// Filter out unsupported options.
		const enabledOptions = editor.config.get( 'borderFillColor.colors' );

		// Allow alignment attribute on all blocks.
		schema.extend( '$block', { allowAttributes: 'borderFillColor' } );
		editor.model.schema.setAttributeProperties( 'borderFillColor', { isFormatting: true } );
		editor.model.schema.addAttributeCheck( ( context, attributeName ) => {
			if ( context.endsWith( 'table' ) || context.endsWith( 'tableRow' ) || context.endsWith( 'tableCell' )) {
				return false;
			}
		} );
		const definition = _buildDefinition( enabledOptions.filter( option => !isDefault( option ) ) );

		// editor.conversion.attributeToAttribute( definition );
		editor.conversion.for( 'downcast' ).attributeToAttribute( {
			model: 'borderFillColor',
			view: function( modelAttributeValue ) {
				const _value = {};
				_value[ 'background-color' ] = modelAttributeValue;

				return { key: 'style', value: _value };
			}.bind(this)
		} );
		editor.commands.add( 'borderFillColor', new BorderFillColorCommand( editor ) );
	}
}

// Utility function responsible for building converter definition.
// @private
function _buildDefinition( options ) {
	const definition = {
		model: {
			key: 'borderFillColor',
			values: options.map( option => option.color )
		},
		view: {}
	};

	for ( const option of options ) {
		const _def = { key: 'style', value: {} };
		_def.value[ 'border-color' ] = option.color;
		definition.view[ option.color ] = _def;
	}

	return definition;
}
