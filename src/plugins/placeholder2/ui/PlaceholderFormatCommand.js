import Command from '@ckeditor/ckeditor5-core/src/command';

export default class PlaceholderFormatCommand extends Command {
	execute( { value } ) {
		console.log( value );
		if ( value == '' )
			return;
		const editor = this.editor;
		const model = this.editor.model;
		const selection = model.document.selection;

		editor.model.change( writer => {
			// Create a <placeholderFormat> elment with the "name" attribute...
			const placeholderFormat = writer.createElement( 'placeholderFormat', { name: value } );
			// ... and insert it into the document.

			const selectedElement = selection.getSelectedElement();
			let currentPlaceholderFormat = null;
			for ( let i of selectedElement.getChildren()) {
				console.log( 'selectedElement.getChildren()', i );
				if ( i.name && i.name == 'placeholderFormat' )
					currentPlaceholderFormat = i;
			}
			if ( currentPlaceholderFormat )
				writer.remove( currentPlaceholderFormat );

			writer.insert( placeholderFormat, selectedElement, 'end' );
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;

		const isAllowed = model.schema.checkChild( selection.focus.parent, 'placeholder2' );

		this.isEnabled = isAllowed;
	}
}
