// placeholder/placeholderediting.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import './theme/placeholder.css';

import { toWidget, viewToModelPositionOutsideModelElement } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import Placeholder2Command from './placeholder2command';

export default class Placeholder2Editing extends Plugin {
	static get requires() { // ADDED
		return [ Widget ];
	}

	init() {
		console.log( 'Placeholder2Editing#init() got called' );

		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add( 'placeholder2', new Placeholder2Command( this.editor ) );

		this.editor.config.define( 'placeholder2.items' );

		this.editor.editing.mapper.on(
			'viewToModelPosition',
			viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'placeholder' ) )
		);

		// this.editor.config.define( 'placeholder2Config', { // ADDED
		// 	types: [ 'date', 'first name', 'surname' ]
		// } );
	}

	_defineSchema() { // ADDED
		const schema = this.editor.model.schema;

		schema.register( 'placeholder2', {
			// Allow wherever text is allowed:
			allowWhere: '$text',

			// The placeholder will act as an inline node:
			isInline: true,

			// The inline widget is self-contained so it cannot be split by the caret and can be selected:
			isObject: true,

			// The placeholder can have many types, like date, name, surname, etc:
			allowAttributes: [ 'name', 'type', 'border', 'borderWidth', 'borderColor', 'borderStyle', 'borderFillColor' ]
		} );
	}

	_defineConverters() {                                                      // ADDED
		const conversion = this.editor.conversion;

		conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'span',
				classes: [ 'placeholder' ]
			},
			model: ( viewElement, modelWriter ) => {
				// Extract the "name" from "{name}".
				const name = viewElement.getChild( 0 ).data.slice( 1, -1 );

				return modelWriter.createElement( 'placeholder2', { name } );
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'placeholder2',
			view: ( modelItem, viewWriter ) => {
				const widgetElement = createPlaceholderView( modelItem, viewWriter );

				// Enable widget handling on a placeholder element inside the editing view.
				return toWidget( widgetElement, viewWriter );
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'placeholder2',
			view: createPlaceholderView
		} );

		conversion.for( 'downcast' ).elementToElement( {
			model: 'placeholderFormat',
			view: function( modelItem, viewWriter ) {
				const containerElement = viewWriter.createContainerElement( 'span' );
				const text = viewWriter.createText( ' (' + modelItem.getAttribute( 'name' ) + ')' );
				containerElement._appendChild( text );

				return containerElement;
			}
		} );
		// Helper method for both downcast converters.
		function createPlaceholderView( modelItem, viewWriter ) {
			console.log('modelItem', modelItem, modelItem._children._nodes[0], modelItem._attrs, modelItem._attrs.get( 'name' ) );
			const placeholderView = viewWriter.createContainerElement( 'span', {
				class: 'placeholder2',
				key: modelItem._attrs.get( 'name' ),
				type: modelItem._attrs.get( 'type' )
			} );
			console.log( 'placeholderView:', placeholderView );
			console.log( 'placeholderView Child:', placeholderView.getChild(0) );
			return placeholderView;
		}
	}
}
