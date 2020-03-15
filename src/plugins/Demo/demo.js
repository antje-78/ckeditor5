import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ContextualBalloon from '@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon';
import './demo.css';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import {getSelectedBlocks} from "../Border/utils";

const BORDER = "BORDER";
const BORDER_INLINE = "BORDER_INLINE";

export default class Demo extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ContextualBalloon ];
	}

	init() {
		const editor = this.editor;

		editor.model.schema.extend( '$block', { allowAttributes: BORDER, BORDER_INLINE } );
		editor.model.schema.extend( '$text', { allowAttributes: BORDER, BORDER_INLINE } );
		editor.model.schema.setAttributeProperties( BORDER_INLINE, {
			isFormatting: true,
			copyOnEnter: true
		} );
		const option = {
			model: 'border',
			view: 'h1',
			title: 'Border',
			style: {
				border: '1px solid black'
			}
		};

		// Build converter from model to view for data and editing pipelines.
		let definition = {
			model: {
				key: BORDER,
				values: ['normal']
			},
			view: {
				normal: {
					name: 'span',
					styles: {
						'border': '1px solid black'
					},
					priority: 7
				}
			},
			upcastAlso: {}
		};

		editor.conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'span',
				styles: {
					'border': /[\s\S ]+/
				}
			},
			model: {
				key: BORDER_INLINE,
				value: viewElement => {
					return '1px solid black';
				}
			},
			converterPriority: 'high'
		} );

		// Add a special converter for the font size feature to convert all (even not configured)
		// model attribute values.
		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: {
				key: BORDER_INLINE
			},
			view: ( modelValue, viewWriter ) => {
				return viewWriter.createAttributeElement( 'span', {
					style: 'border: 1px solid black'
				} );
			},
			converterPriority: 'high'
		} );

		editor.conversion.for( 'downcast' ).attributeToAttribute( {
			model: BORDER,
			view: function( option ) {
				// if (option == null)
				// 	return { key: 'style' };

				const _value = {};
				_value[ 'border' ] = '1px solid black';
				return { key: 'style', value: _value };
			}.bind(this)
		} );

		editor.ui.componentFactory.add( 'demo', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Insert image',
				icon: imageIcon,
				tooltip: true
			} );

			// Callback executed once the image is clicked.
			view.on( 'execute', () => {
				editor.model.change( writer => {
					let selection = editor.model.document.selection;
					if ( selection.isCollapsed ) {
						const ranges = selection.getSelectedBlocks();
						for ( const range of ranges ) {
							writer.setAttribute( BORDER, 'normal', range );
						}
					} else {
						const ranges = editor.model.schema.getValidRanges( selection.getRanges(), BORDER );

						for ( const range of ranges ) {
							writer.setAttribute( BORDER_INLINE, 'normal', range );
						}
					}
				} );
			} );

			return view;
		} );
	}

	_getSelectedPlaceholderElement() {
		const view = this.editor.editing.view;
		const selection = view.document.selection;

		return ( selection && selection.getSelectedElement() ) ? selection.getFirstRange() : selection.getSelectedBlocks();
	}
}
